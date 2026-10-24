# Newsletter Broadcast Delivery: Engineering Plan

## Current state verified on `main`

- Founder newsletter UI supports composing, previewing, and saving campaign drafts.
- `POST /api/founder/newsletter/campaigns` validates founder session and request origin before saving a draft.
- The audience endpoint returns a count of confirmed subscribers without exposing recipient addresses to the UI.
- The newsletter service supports confirmation, unsubscribe tokens, and idempotency keys for confirmation/welcome messages.
- The campaign draft schema stores subject, body, draft status, and test-send metadata.
- No campaign broadcast endpoint or per-recipient campaign delivery ledger was found in the reviewed `main` tree.
- The composer deliberately disables the broadcast button.

## Required design before enabling broadcast

1. **Campaign lifecycle:** Draft -> test sent -> approved/queued -> sending -> completed/partial failure. A campaign must not be sent merely because a draft exists.
2. **Recipient snapshot:** At queue time, create a durable recipient record only for currently confirmed subscribers. Do not include interest-form leads or ERS waitlist contacts.
3. **Unsubscribe:** Generate a distinct, cryptographically random unsubscribe token per recipient; persist only its hash where feasible; render an absolute, HTTPS unsubscribe link in every campaign.
4. **Idempotency:** Use a stable campaign+recipient key and a database uniqueness constraint. A repeated request or worker retry must not create another logical delivery.
5. **Delivery ledger:** Track pending, sending, accepted, failed, and ambiguous outcomes per recipient, including provider message ID, attempt count, timestamps, and sanitized error category.
6. **Ambiguous outcomes:** If the provider request times out after submission, reconcile before retrying. Never blindly resend an uncertain delivery.
7. **Security:** Require a valid founder session and valid origin on state-changing routes; validate campaign IDs and input lengths; keep service-role and Resend secrets server-only; rate-limit send initiation.
8. **Test mode:** Send only to an explicitly supplied, verified test recipient, with visible test-mode labeling and no access to the broadcast audience.
9. **Observability:** Provide counts for queued, accepted, failed, and unresolved deliveries without exposing email addresses in routine dashboard responses.
10. **Rollout:** Run unit/integration tests, apply migrations to staging, send a test message, verify unsubscribe and duplicate-submit behaviour, and review logs before enabling any production campaign.

## Acceptance tests

- Unauthenticated request is rejected.
- Invalid origin is rejected.
- Draft with empty/oversized subject or body is rejected.
- Test mode can only target an explicitly permitted test recipient.
- Broadcast excludes pending, unsubscribed, and non-newsletter contacts.
- Two simultaneous send requests produce one campaign run.
- A retry does not duplicate a recipient delivery.
- An unsubscribe processed before dispatch prevents that recipient from being sent.
- Provider rejection is recorded as failed.
- Provider timeout creates a reconcilable ambiguous state rather than an automatic blind resend.
- Duplicate provider webhook events do not corrupt counts.
- No real broadcast can start when the feature flag is off or required configuration is missing.

## Release guardrail

Do not enable production broadcast, apply production migrations, or send to the full list until the above controls are implemented and verified in staging. A passing build alone is not evidence that external email delivery is safe.
