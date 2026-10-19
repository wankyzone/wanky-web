create schema if not exists wanky_product_interest;

revoke all on schema wanky_product_interest from public, anon, authenticated;
grant usage on schema wanky_product_interest to service_role;

create or replace function wanky_product_interest.is_valid_ers_answers(
  p_interest_type text,
  p_answers jsonb
)
returns boolean
language plpgsql
immutable
set search_path = ''
as $$
declare
  allowed_keys text[];
  required_keys text[];
  answer_key text;
  answer_value jsonb;
  answer_length integer;
begin
  if pg_catalog.jsonb_typeof(p_answers) is distinct from 'object' then
    return false;
  end if;

  case p_interest_type
    when 'errands_completed' then
      allowed_keys := array['errandDetails', 'cityArea'];
      required_keys := array['errandDetails'];
    when 'runner_interest' then
      allowed_keys := array['runnerMotivation', 'cityArea'];
      required_keys := array['runnerMotivation'];
    when 'business_partnership' then
      allowed_keys := array['businessType', 'partnershipInterest', 'cityArea'];
      required_keys := array['businessType', 'partnershipInterest'];
    when 'other' then
      allowed_keys := array['otherInterest', 'cityArea'];
      required_keys := array['otherInterest'];
    else
      return false;
  end case;

  for answer_key, answer_value in
    select entry.key, entry.value
    from pg_catalog.jsonb_each(p_answers) as entry
  loop
    if not answer_key = any (allowed_keys)
      or pg_catalog.jsonb_typeof(answer_value) is distinct from 'string'
      or pg_catalog.btrim(answer_value #>> '{}') = ''
    then
      return false;
    end if;

    answer_length := pg_catalog.length(answer_value #>> '{}');
    if answer_length > case
      when answer_key = 'businessType' then 160
      when answer_key = 'cityArea' then 100
      else 500
    end then
      return false;
    end if;
  end loop;

  foreach answer_key in array required_keys
  loop
    if not p_answers ? answer_key then
      return false;
    end if;
  end loop;

  return true;
end;
$$;

create table wanky_product_interest.ers_interest_submissions (
  id bigint generated always as identity primary key,
  product_id text not null check (product_id = 'ers'),
  form_version text not null check (form_version = 'ers-v1'),
  name text not null check (
    name = pg_catalog.btrim(name)
    and pg_catalog.length(name) between 1 and 120
  ),
  email text not null check (
    email = pg_catalog.lower(pg_catalog.btrim(email))
    and pg_catalog.length(email) <= 254
    and pg_catalog.length(pg_catalog.split_part(email, '@', 1)) <= 64
    and email ~ '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$'
  ),
  interest_type text not null check (
    interest_type in (
      'errands_completed',
      'runner_interest',
      'business_partnership',
      'other'
    )
  ),
  answers jsonb not null check (
    wanky_product_interest.is_valid_ers_answers(interest_type, answers)
  ),
  contact_consent boolean not null check (contact_consent),
  contact_consent_text text not null check (
    contact_consent_text =
      'I agree that Wanky Technologies may use the information I provide to respond to my ERS interest request and follow up with me about it. This does not sign me up for the Wanky newsletter.'
  ),
  consent_at timestamptz not null default pg_catalog.statement_timestamp(),
  created_at timestamptz not null default pg_catalog.statement_timestamp()
);

alter table wanky_product_interest.ers_interest_submissions enable row level security;
revoke all on wanky_product_interest.ers_interest_submissions
  from public, anon, authenticated, service_role;

create or replace function wanky_product_interest.record_ers_interest_submission(
  p_product_id text,
  p_form_version text,
  p_name text,
  p_email text,
  p_interest_type text,
  p_answers jsonb,
  p_contact_consent boolean,
  p_contact_consent_text text
)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  submission_id bigint;
begin
  if p_product_id is distinct from 'ers'
    or p_form_version is distinct from 'ers-v1'
    or p_name is null
    or pg_catalog.length(pg_catalog.btrim(p_name)) not between 1 and 120
    or p_email is null
    or p_email <> pg_catalog.lower(pg_catalog.btrim(p_email))
    or pg_catalog.length(p_email) > 254
    or pg_catalog.length(pg_catalog.split_part(p_email, '@', 1)) > 64
    or p_email !~ '^[A-Za-z0-9.!#$%&''*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$'
    or p_interest_type not in (
      'errands_completed',
      'runner_interest',
      'business_partnership',
      'other'
    )
    or not wanky_product_interest.is_valid_ers_answers(
      p_interest_type,
      p_answers
    )
    or p_contact_consent is distinct from true
    or p_contact_consent_text is distinct from
      'I agree that Wanky Technologies may use the information I provide to respond to my ERS interest request and follow up with me about it. This does not sign me up for the Wanky newsletter.'
  then
    raise exception 'invalid ERS interest submission';
  end if;

  insert into wanky_product_interest.ers_interest_submissions (
    product_id,
    form_version,
    name,
    email,
    interest_type,
    answers,
    contact_consent,
    contact_consent_text
  )
  values (
    p_product_id,
    p_form_version,
    pg_catalog.btrim(p_name),
    p_email,
    p_interest_type,
    p_answers,
    p_contact_consent,
    p_contact_consent_text
  )
  returning id into submission_id;

  return submission_id;
end;
$$;

revoke all on function
  wanky_product_interest.is_valid_ers_answers(text, jsonb)
  from public, anon, authenticated, service_role;
revoke all on function
  wanky_product_interest.record_ers_interest_submission(
    text, text, text, text, text, jsonb, boolean, text
  )
  from public, anon, authenticated;
grant execute on function
  wanky_product_interest.record_ers_interest_submission(
    text, text, text, text, text, jsonb, boolean, text
  )
  to service_role;
