# Lilydale Bowmen App — Claude Context

**Project ID:** PROJ-001
**Origin:** None (onboarded existing project — 2026-05-23)

---

## Project

| Item | Detail |
|------|--------|
| **Name** | Lilydale Bowmen App |
| **Type** | Single-file HTML/CSS/JS Progressive Web App (PWA) |
| **Stack** | Vanilla HTML, CSS, JavaScript — no framework, no build step |
| **Hosting** | GitHub Pages (HTTPS) |
| **Live URL** | https://glensanders-gdev.github.io/LilydaleBowmen/ |
| **Repository** | https://github.com/glensanders-gdev/LilydaleBowmen |
| **Current version** | v0.78 (local, not yet pushed) |
| **Database** | Supabase — device-based silent sync, no user accounts |
| **Supabase project** | https://cciculdqvujdanemeocf.supabase.co |
| **Primary target** | iPhone Safari as installed PWA |

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Primary working file and deployed file (GitHub Pages) |
| `lilydale-bowmen-app_vX_XX.html` | Versioned saves — local only, one per meaningful change, never overwritten |
| `PROJECT_INSTRUCTIONS.md` | Full dev framework, session rules, architecture, backlog |
| `DEVLOG.md` | Session-by-session development log |
| `README.md` | Public-facing project overview |
| `manifest.json` | PWA manifest |
| `sw.js` | Cache-first service worker |
| `docs/CONTEXT.md` | Domain terms and architecture notes (Forge) |
| `docs/kanban.md` | Active ticket backlog (Forge) |
| `docs/adr/` | Architecture Decision Records (Forge) |

## Architecture Summary

Single HTML file — all HTML, CSS, and JS in one file. No build step. External deps: Google Fonts + Supabase JS client (CDN only).

**Data:** localStorage primary, Supabase background sync (fire-and-forget, fails gracefully offline). Device identified by auto-generated UUID (`lb_device_id`). No user accounts.

**PWA:** Service worker (cache-first), manifest.json, designed for Add to Home Screen on iOS Safari.

**Error handling:** Three-layer system — pre-DOM capture, init-time per-step try/catch, runtime handler. Custom confirm dialog replaces native `confirm()` / `alert()` (banned in iOS PWA context).

**Security:** Anon key in member app only. Service_role key reserved for admin.html (not yet built). RLS enabled on all Supabase tables. Practice rounds hidden from committee (`category IN ('Club', 'Official')`).

## Session Conventions

- Read `PROJECT_INSTRUCTIONS.md` at session start — it contains session rules, versioning rules, pre-change protocol, and rollback policy
- Version format: `vX_XX` — bump after every verified working change
- Save to both `index.html` AND a versioned save `lilydale-bowmen-app_vX_XX.html`
- One logical change at a time — verify before moving to next
- Tag every change: `[UI]` `[DATA]` `[LOGIC]` `[SYNC]` `[INFRA]`
- `syncToSupabase()` is always fire-and-forget — never awaited in UI path

## Forge Docs

| File | Purpose |
|------|---------|
| `docs/kanban.md` | Active backlog tickets |
| `docs/kanban-archive.md` | Completed / closed tickets |
| `docs/CONTEXT.md` | Domain glossary and system notes |
| `docs/DEVLOG.md` | Forge session log |
| `docs/adr/` | Architecture Decision Records |
| `docs/prd/active/` | Active PRDs |
| `docs/sprints/` | Sprint plans |
| `docs/releases/` | Release notes |
