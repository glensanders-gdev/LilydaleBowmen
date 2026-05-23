# ADR-005 — Practice rounds hidden from committee

**Date:** 2026-05-17
**Status:** Active

## Context

Members record scores in one of three categories: Practice, Club, or Official. Practice rounds are personal training records. Members should be able to practice freely without those scores appearing in club results or being visible to the committee.

## Decision

The `category` field on every score row is set by the member at round start. The committee admin view filters to `category IN ('Club', 'Official')` — Practice rows are never queried. This is enforced at the application query level (not RLS policy).

## Consequences

- Members can practice without affecting their official record
- The committee sees only results the member intended to submit as club or official
- A member who accidentally records a round as Club instead of Practice cannot retroactively hide it from the committee (no edit-after-save on category)
- The distinction must be preserved in any future export, leaderboard, or reporting feature — never aggregate Practice into club results

## Related

- [ADR-002](002-supabase-device-id.md) — Supabase backend
- [ADR-003](003-committee-admin-separate.md) — admin view
- Backlog: LB-01 — admin.html implementation
- Backlog: LB-04 — club results leaderboard (must respect this rule)
