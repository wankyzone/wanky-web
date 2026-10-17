create schema if not exists wanky_newsletter;

revoke all on schema wanky_newsletter from public, anon, authenticated;
grant usage on schema wanky_newsletter to service_role;

create table wanky_newsletter.subscriptions (
  email text primary key,
  status text not null check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token_hash text unique,
  confirmation_expires_at timestamptz,
  unsubscribe_token_hash text not null unique,
  consent_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (email = lower(btrim(email))),
  check (confirmation_token_hash is null or confirmation_token_hash ~ '^[0-9a-f]{64}$'),
  check (unsubscribe_token_hash ~ '^[0-9a-f]{64}$'),
  check (
    (status = 'pending' and confirmed_at is null)
    or (status = 'confirmed' and confirmed_at is not null and consent_at is not null)
    or (status = 'unsubscribed' and unsubscribed_at is not null)
  )
);

create index subscriptions_confirmed_email_idx
  on wanky_newsletter.subscriptions (email)
  where status = 'confirmed';

create table wanky_newsletter.request_limits (
  key_hash text primary key check (key_hash ~ '^[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  expires_at timestamptz not null
);

create index request_limits_expiry_idx
  on wanky_newsletter.request_limits (expires_at);

alter table wanky_newsletter.subscriptions enable row level security;
alter table wanky_newsletter.request_limits enable row level security;
revoke all on wanky_newsletter.subscriptions from public, anon, authenticated;
revoke all on wanky_newsletter.request_limits from public, anon, authenticated;
grant select on wanky_newsletter.subscriptions to service_role;

create or replace function wanky_newsletter.consume_rate_limit(
  p_key_hash text,
  p_limit integer
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_time timestamptz := pg_catalog.now();
  existing_limit wanky_newsletter.request_limits%rowtype;
begin
  if p_key_hash !~ '^[0-9a-f]{64}$' or p_limit < 1 or p_limit > 1000 then
    return false;
  end if;

  delete from wanky_newsletter.request_limits
  where expires_at <= current_time;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(p_key_hash));

  select * into existing_limit
  from wanky_newsletter.request_limits
  where key_hash = p_key_hash
  for update;

  if not found then
    insert into wanky_newsletter.request_limits (
      key_hash, window_started_at, request_count, expires_at
    ) values (
      p_key_hash, current_time, 1, current_time + interval '1 hour'
    );
    return true;
  end if;

  if existing_limit.window_started_at <= current_time - interval '1 hour' then
    update wanky_newsletter.request_limits
    set window_started_at = current_time,
        request_count = 1,
        expires_at = current_time + interval '1 hour'
    where key_hash = p_key_hash;
    return true;
  end if;

  update wanky_newsletter.request_limits
  set request_count = request_count + 1
  where key_hash = p_key_hash
  returning request_count into existing_limit.request_count;

  return existing_limit.request_count <= p_limit;
end;
$$;

create or replace function wanky_newsletter.request_subscription(
  p_email text,
  p_confirmation_token_hash text,
  p_unsubscribe_token_hash text,
  p_confirmation_expires_at timestamptz
)
returns table(state text)
language plpgsql
security definer
set search_path = ''
as $$
declare
  normalized_email text := pg_catalog.lower(pg_catalog.btrim(p_email));
  existing_subscription wanky_newsletter.subscriptions%rowtype;
begin
  if pg_catalog.length(normalized_email) > 254
    or p_confirmation_token_hash !~ '^[0-9a-f]{64}$'
    or p_unsubscribe_token_hash !~ '^[0-9a-f]{64}$'
    or p_confirmation_expires_at <= pg_catalog.now()
    or p_confirmation_expires_at > pg_catalog.now() + interval '25 hours'
  then
    raise exception 'invalid newsletter request';
  end if;

  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(normalized_email));

  select * into existing_subscription
  from wanky_newsletter.subscriptions
  where email = normalized_email
  for update;

  if not found then
    insert into wanky_newsletter.subscriptions (
      email, status, confirmation_token_hash, confirmation_expires_at,
      unsubscribe_token_hash
    ) values (
      normalized_email, 'pending', p_confirmation_token_hash,
      p_confirmation_expires_at, p_unsubscribe_token_hash
    );
    return query select 'confirmation_required'::text;
    return;
  end if;

  if existing_subscription.status = 'unsubscribed'
    or (
      existing_subscription.status = 'pending'
      and (
        existing_subscription.confirmation_token_hash is null
        or existing_subscription.confirmation_expires_at <= pg_catalog.now()
      )
    )
  then
    update wanky_newsletter.subscriptions
    set status = 'pending',
        confirmation_token_hash = p_confirmation_token_hash,
        confirmation_expires_at = p_confirmation_expires_at,
        unsubscribe_token_hash = p_unsubscribe_token_hash,
        consent_at = null,
        confirmed_at = null,
        updated_at = pg_catalog.now()
    where email = normalized_email;

    return query select 'confirmation_required'::text;
    return;
  end if;

  return query select 'no_email'::text;
end;
$$;

create or replace function wanky_newsletter.clear_failed_confirmation(
  p_confirmation_token_hash text
)
returns void
language sql
security definer
set search_path = ''
as $$
  update wanky_newsletter.subscriptions
  set confirmation_token_hash = null,
      confirmation_expires_at = null,
      updated_at = pg_catalog.now()
  where confirmation_token_hash = p_confirmation_token_hash
    and status = 'pending';
$$;

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
      confirmation_expires_at = null,
      consent_at = pg_catalog.now(),
      confirmed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where confirmation_token_hash = p_confirmation_token_hash;

  return 'confirmed';
end;
$$;

create or replace function wanky_newsletter.unsubscribe(
  p_unsubscribe_token_hash text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_status text;
begin
  select status into current_status
  from wanky_newsletter.subscriptions
  where unsubscribe_token_hash = p_unsubscribe_token_hash
  for update;

  if not found then return 'invalid'; end if;
  if current_status = 'unsubscribed' then return 'already_unsubscribed'; end if;

  update wanky_newsletter.subscriptions
  set status = 'unsubscribed',
      confirmation_token_hash = null,
      confirmation_expires_at = null,
      unsubscribed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where unsubscribe_token_hash = p_unsubscribe_token_hash;

  return 'unsubscribed';
end;
$$;

revoke all on function wanky_newsletter.consume_rate_limit(text, integer) from public, anon, authenticated;
revoke all on function wanky_newsletter.request_subscription(text, text, text, timestamptz) from public, anon, authenticated;
revoke all on function wanky_newsletter.clear_failed_confirmation(text) from public, anon, authenticated;
revoke all on function wanky_newsletter.confirm_subscription(text) from public, anon, authenticated;
revoke all on function wanky_newsletter.unsubscribe(text) from public, anon, authenticated;
grant execute on function wanky_newsletter.consume_rate_limit(text, integer) to service_role;
grant execute on function wanky_newsletter.request_subscription(text, text, text, timestamptz) to service_role;
grant execute on function wanky_newsletter.clear_failed_confirmation(text) to service_role;
grant execute on function wanky_newsletter.confirm_subscription(text) to service_role;
grant execute on function wanky_newsletter.unsubscribe(text) to service_role;