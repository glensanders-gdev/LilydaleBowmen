# ADR-004 — RLS policy: USING (true) WITH CHECK (true), device_id at query level

**Date:** 2026-05-17 (implemented v0.46)
**Status:** Active

## Context

Supabase Row Level Security (RLS) needed to be enabled on all tables to prevent devices from reading each other's data. The design question was whether to enforce device isolation at the PostgreSQL policy level or at the application query level.

## Options Considered

1. RLS policy uses `USING (device_id = auth.uid())` — ties device identity to Supabase Auth, which requires accounts
2. RLS policy uses `USING (true) WITH CHECK (true)` — permits all rows at the pg level; application enforces `WHERE device_id = ?` in every query
3. No RLS — all rows readable by any client with the anon key

## Decision

Option 2: `USING (true) WITH CHECK (true)` on all tables. Device isolation is enforced by including `device_id = <stored_uuid>` in every Supabase query in the application code. RLS is enabled (option 3 rejected) but the filtering logic lives in the JS client.

## Consequences

- No dependency on Supabase Auth (consistent with no-accounts decision in ADR-001)
- Application code is responsible for correct `device_id` filtering — a missing WHERE clause would expose other devices' rows via the anon key
- Every query must include a device_id filter — this is a code convention, not a database guarantee
- Service_role key bypasses RLS entirely — reinforces ADR-003 requirement to keep it out of the member app

## Related

- [ADR-001](001-no-user-accounts.md) — no auth accounts
- [ADR-002](002-supabase-device-id.md) — device identity
- [ADR-003](003-committee-admin-separate.md) — service_role key separation
