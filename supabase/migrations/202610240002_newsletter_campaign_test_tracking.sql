alter table wanky_newsletter.campaign_drafts
  add column if not exists last_test_sent_to text,
  add column if not exists last_test_sent_at timestamptz,
  add column if not exists last_test_provider_id text;
