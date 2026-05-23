# ADR-003 — Committee admin as separate admin.html

**Date:** 2026-05-17
**Status:** Active (admin.html not yet built — Backlog LB-01)

## Context

The committee needs to view Club and Official scores across all members, and eventually manage registrations and push events. This requires the Supabase `service_role` key, which bypasses RLS and can read all rows. This key must never be exposed in the member-facing app.

## Options Considered

1. Admin features embedded in the member app behind a password — service_role key would be in the same file as the anon key, visible to any member who inspects source
2. Separate admin.html — completely separate file, different key, not deployed to the public GitHub Pages URL
3. Separate web app — full separate repo and deployment

## Decision

Separate `admin.html`. Same single-file architecture as the member app. Deployed privately (not to the public GitHub Pages path). Contains the service_role key. Never committed to the public repo.

## Consequences

- service_role key is isolated from the member app
- admin.html is maintained separately and deployed manually
- Committee accesses it via a private URL (not the public GitHub Pages URL)
- Any accidental push of admin.html to the public repo would expose the service_role key — this is the critical risk to manage

## Related

- [ADR-002](002-supabase-device-id.md) — Supabase backend
- Backlog: LB-01 — build admin.html
