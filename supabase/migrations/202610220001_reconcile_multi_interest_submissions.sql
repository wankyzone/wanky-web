-- Reconcile the multi-interest onboarding API with the original submissions table.
-- Existing submissions retain their primary product as their initial interest.
alter table public.wanky_interest_submissions
  add column if not exists interests jsonb;

do $$
declare
  interests_type text;
begin
  select format_type(a.atttypid, a.atttypmod)
    into interests_type
  from pg_catalog.pg_attribute a
  where a.attrelid = 'public.wanky_interest_submissions'::regclass
    and a.attname = 'interests'
    and not a.attisdropped;

  if interests_type <> 'jsonb' then
    raise exception 'Expected wanky_interest_submissions.interests to be jsonb, found %', interests_type;
  end if;
end;
$$;

update public.wanky_interest_submissions
set interests = jsonb_build_array(product)
where interests is null or jsonb_typeof(interests) <> 'array' or interests = '[]'::jsonb;

alter table public.wanky_interest_submissions
  alter column interests set default '[]'::jsonb,
  alter column interests set not null;

alter table public.wanky_interest_submissions
  drop constraint if exists wanky_interest_submissions_product_check;

alter table public.wanky_interest_submissions
  add constraint wanky_interest_submissions_product_check
  check (product in (
    'ers', 'wanky-cloud', 'wanky-ai', 'wanky-protect',
    'software-services', 'partnership', 'investment',
    'careers', 'classroom', 'other'
  ));

alter table public.wanky_interest_submissions
  drop constraint if exists wanky_interest_submissions_interests_check;

alter table public.wanky_interest_submissions
  add constraint wanky_interest_submissions_interests_check
  check (
    jsonb_typeof(interests) = 'array'
    and jsonb_array_length(interests) between 1 and 10
    and (
      interests
        - 'ers'
        - 'wanky-cloud'
        - 'wanky-ai'
        - 'wanky-protect'
        - 'software-services'
        - 'partnership'
        - 'investment'
        - 'careers'
        - 'classroom'
        - 'other'
    ) = '[]'::jsonb
  );

create index if not exists wanky_interest_submissions_interests_idx
  on public.wanky_interest_submissions using gin (interests);
