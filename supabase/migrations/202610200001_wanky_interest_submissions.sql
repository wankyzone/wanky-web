create extension if not exists pgcrypto;

create table if not exists public.wanky_interest_submissions (
  id uuid primary key default gen_random_uuid(),
  product text not null check (product in ('ers', 'wanky-cloud', 'wanky-ai', 'wanky-protect', 'software-services', 'partnership')),
  name text not null,
  email text not null,
  organization text,
  role text,
  goal text not null,
  details text,
  timeline text,
  budget text,
  updates_consent boolean not null default false,
  source_path text not null default '/interest',
  status text not null default 'new' check (status in ('new', 'reviewing', 'contacted', 'qualified', 'closed', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists wanky_interest_submissions_created_at_idx
  on public.wanky_interest_submissions (created_at desc);
create index if not exists wanky_interest_submissions_product_status_idx
  on public.wanky_interest_submissions (product, status);
create index if not exists wanky_interest_submissions_email_idx
  on public.wanky_interest_submissions (lower(email));

alter table public.wanky_interest_submissions enable row level security;

-- No public table policies: public submissions are accepted only through the server
-- route using the server-only service-role key. Never expose that key in the browser.
revoke all on table public.wanky_interest_submissions from anon, authenticated;
grant all on table public.wanky_interest_submissions to service_role;
