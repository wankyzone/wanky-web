alter table wanky_newsletter.subscriptions
add column welcome_status text not null default 'not_ready'
    check (welcome_status in ('not_ready', 'pending', 'sending', 'sent')),
  add column welcome_claimed_at timestamptz,
  add column welcome_sent_at timestamptz,
  add column welcome_attempts integer not null default 0
    check (welcome_attempts >= 0);

create or replace function wanky_newsletter.confirm_subscription(
  p_confirmation_token_hash text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_status text;
  token_expires_at timestamptz;
begin
  select status, confirmation_expires_at
  into current_status, token_expires_at
  from wanky_newsletter.subscriptions
  where confirmation_token_hash = p_confirmation_token_hash
  for update;

  if not found then return 'invalid'; end if;
  if current_status = 'confirmed' then return 'confirmed'; end if;

  if current_status <> 'pending' or token_expires_at <= pg_catalog.now() then
    return 'invalid';
  end if;

  update wanky_newsletter.subscriptions
  set status = 'confirmed',
      welcome_status = 'pending',
      confirmation_expires_at = null,
      consent_at = pg_catalog.now(),
      confirmed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where confirmation_token_hash = p_confirmation_token_hash;

  return 'confirmed';
end;
$$;

create index subscriptions_welcome_retry_idx
  on wanky_newsletter.subscriptions (welcome_status, welcome_claimed_at)
  where status = 'confirmed';

create or replace function wanky_newsletter.claim_welcome_delivery(
  p_confirmation_token_hash text,
  p_unsubscribe_token_hash text
)
returns table(email text, delivery_key text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_subscription wanky_newsletter.subscriptions%rowtype;
  v_now timestamptz := pg_catalog.now();
begin
  if p_confirmation_token_hash !~ '^[0-9a-f]{64}$'
    or p_unsubscribe_token_hash !~ '^[0-9a-f]{64}$'
  then
    return;
  end if;

  select * into current_subscription
  from wanky_newsletter.subscriptions
  where confirmation_token_hash = p_confirmation_token_hash
    and unsubscribe_token_hash = p_unsubscribe_token_hash
    and status = 'confirmed'
  for update;

  if not found then
    return;
  end if;

  if current_subscription.welcome_status = 'pending' then
    null;
  elsif current_subscription.welcome_status = 'sending'
    and (
      current_subscription.welcome_claimed_at is null
      or current_subscription.welcome_claimed_at <= v_now - interval '10 minutes'
    )
  then
    null;
  else
    return;
  end if;

  update wanky_newsletter.subscriptions
  set welcome_status = 'sending',
      welcome_claimed_at = v_now,
      welcome_attempts = welcome_attempts + 1,
      updated_at = v_now
  where confirmation_token_hash = p_confirmation_token_hash
    and unsubscribe_token_hash = p_unsubscribe_token_hash
    and status = 'confirmed';

  return query
    select current_subscription.email,
      'wanky-newsletter-welcome-' || p_confirmation_token_hash;
end;
$$;

create or replace function wanky_newsletter.finish_welcome_delivery(
  p_confirmation_token_hash text,
  p_unsubscribe_token_hash text,
  p_success boolean
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_confirmation_token_hash !~ '^[0-9a-f]{64}$'
    or p_unsubscribe_token_hash !~ '^[0-9a-f]{64}$'
  then
    return false;
  end if;

  update wanky_newsletter.subscriptions
  set welcome_status = case when p_success then 'sent' else 'pending' end,
      welcome_sent_at = case when p_success then pg_catalog.now() else null end,
      welcome_claimed_at = null,
      updated_at = pg_catalog.now()
  where confirmation_token_hash = p_confirmation_token_hash
    and unsubscribe_token_hash = p_unsubscribe_token_hash
    and status = 'confirmed'
    and welcome_status = 'sending';

  return found;
end;
$$;

revoke all on function
  wanky_newsletter.claim_welcome_delivery(text, text)
  from public, anon, authenticated;

revoke all on function
  wanky_newsletter.finish_welcome_delivery(text, text, boolean)
  from public, anon, authenticated;

grant execute on function
  wanky_newsletter.claim_welcome_delivery(text, text)
  to service_role;

grant execute on function
  wanky_newsletter.finish_welcome_delivery(text, text, boolean)
  to service_role;