create table if not exists wanky_newsletter.campaign_recipients (
  campaign_id uuid not null references wanky_newsletter.campaign_drafts(id) on delete cascade,
  email text not null,
  unsubscribe_token_hash text not null unique check (unsubscribe_token_hash ~ '^[0-9a-f]{64}$'),
  delivery_status text not null default 'pending'
    check (delivery_status in ('pending', 'sending', 'sent', 'failed', 'unknown', 'unsubscribed', 'skipped')),
  provider_message_id text,
  attempted_at timestamptz,
  sent_at timestamptz,
  last_error_code text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (campaign_id, email),
  check (email = lower(btrim(email)))
);

create index if not exists campaign_recipients_email_idx
  on wanky_newsletter.campaign_recipients (email);

alter table wanky_newsletter.campaign_recipients enable row level security;
revoke all on wanky_newsletter.campaign_recipients from public, anon, authenticated;
grant select, insert, update on wanky_newsletter.campaign_recipients to service_role;

create or replace function wanky_newsletter.unsubscribe_campaign_recipient(
  p_unsubscribe_token_hash text
)
returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  recipient_email text;
  current_status text;
begin
  if p_unsubscribe_token_hash !~ '^[0-9a-f]{64}$' then return 'invalid'; end if;

  select email into recipient_email
  from wanky_newsletter.campaign_recipients
  where unsubscribe_token_hash = p_unsubscribe_token_hash
  for update;

  if not found then return 'invalid'; end if;

  select status into current_status
  from wanky_newsletter.subscriptions
  where email = recipient_email
  for update;

  if not found then return 'invalid'; end if;
  if current_status = 'unsubscribed' then
    update wanky_newsletter.campaign_recipients
    set delivery_status = 'unsubscribed', updated_at = pg_catalog.now()
    where email = recipient_email;
    return 'already_unsubscribed';
  end if;

  update wanky_newsletter.subscriptions
  set status = 'unsubscribed',
      confirmation_token_hash = null,
      confirmation_expires_at = null,
      unsubscribed_at = pg_catalog.now(),
      updated_at = pg_catalog.now()
  where email = recipient_email;

  update wanky_newsletter.campaign_recipients
  set delivery_status = 'unsubscribed', updated_at = pg_catalog.now()
  where email = recipient_email;

  return 'unsubscribed';
end;
$$;

revoke all on function wanky_newsletter.unsubscribe_campaign_recipient(text) from public, anon, authenticated;
grant execute on function wanky_newsletter.unsubscribe_campaign_recipient(text) to service_role;
