# ADR-001 — No user accounts for member sync

**Date:** 2026-05-17
**Status:** Active

## Context

Supabase sync required a way to identify devices and associate data without forcing members to create accounts or log in. The app targets non-technical club members who install it as a PWA — any sign-up friction would cause drop-off.

## Options Considered

1. Email/password accounts — rejected, too much friction
2. Magic link login — rejected, still requires an email address
3. Silent device ID — auto-generated UUID stored in localStorage, zero friction
4. LB member number as sync key — optional enhancement for Phase 2

## Decision

Silent device ID (option 3). Device identity is a UUID generated on first launch and stored in `lb_device_id`. LB member number matching (option 4) remains on the backlog as a low-priority enhancement for multi-device sync.

## Consequences

- Data belongs to a device, not a person
- Multi-device sync (e.g. new phone) requires manual backup/restore until LB number matching is built
- Committee sees scores by member name and LB number, not by account
- No password reset, no email verification, no auth infrastructure to maintain

## Related

- [ADR-002](002-supabase-device-id.md) — Supabase backend implementation
- Backlog: LB-05 — Multi-device sync via LB member number
