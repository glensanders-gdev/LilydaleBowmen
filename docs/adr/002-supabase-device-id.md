# ADR-002 — Supabase backend with device-based identity

**Date:** 2026-05-17 (implemented v0.47)
**Status:** Active

## Context

The app needed silent background sync so member data survives device loss and allows future committee reporting. The solution had to work from a single static HTML file with no backend server.

## Options Considered

1. No backend — localStorage only, backup/restore via JSON export
2. Firebase — real-time, but Google dependency and more complex pricing
3. Supabase — PostgreSQL-backed, generous free tier, JS client loadable from CDN, RLS built in
4. Custom REST API — requires a server to maintain

## Decision

Supabase with device-based identity. Anon key embedded in client (safe by design — RLS enforces access). Each device writes only its own rows, filtered by `device_id` in every query.

## Consequences

- Sync is silent, fire-and-forget, fails gracefully offline
- Anon key is visible in source (acceptable — Supabase anon keys are designed to be public)
- Service_role key must never appear in the member app
- All tables require RLS — see [ADR-004](004-rls-policy.md)

## Related

- [ADR-001](001-no-user-accounts.md) — identity approach
- [ADR-003](003-committee-admin-separate.md) — service_role key separation
- [ADR-004](004-rls-policy.md) — RLS policy design
