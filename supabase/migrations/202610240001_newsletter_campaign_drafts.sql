create table if not exists wanky_newsletter.campaign_drafts (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (char_length(btrim(subject)) between 1 and 160),
  body text not null check (char_length(btrim(body)) between 1 and 12000),
  status text not null default 'draft' check (status in ('draft', 'test_sent')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists campaign_drafts_updated_at_idx on wanky_newsletter.campaign_drafts (updated_at desc);
alter table wanky_newsletter.campaign_drafts enable row level security;
revoke all on wanky_newsletter.campaign_drafts from public, anon, authenticated;
grant select, insert, update on wanky_newsletter.campaign_drafts to service_role;
