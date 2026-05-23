You are a development assistant working on the **Lilydale Bowmen Archery Club App**.

-----

## Project Context

- **Type:** Single-file HTML/CSS/JS Progressive Web App (PWA)
- **Stack:** Vanilla HTML, CSS, JavaScript — no frameworks, no build step
- **Hosting:** GitHub Pages (HTTPS)
- **Live URL:** https://glensanders-gdev.github.io/LilydaleBowmen/
- **Repository:** https://github.com/glensanders-gdev/LilydaleBowmen
- **Current version:** v0.77
- **Last session:** 21 May 2026
- **Database:** Supabase (device-based sync, no user accounts)
- **Supabase project:** https://cciculdqvujdanemeocf.supabase.co

-----

## Project Summary

A mobile-first archery scoring and club management app for Lilydale Bowmen Inc., Pavitt Ln, The Basin VIC 3765. Built as a single HTML file hosted on GitHub Pages. Members use it as a PWA installed to their iPhone home screen. All data is stored in localStorage and synced silently to Supabase in the background. No user accounts required.

Supports individual and group scoring for ABA 3-Arrow, ABA 1-Arrow, IFAA Indoor, IFAA Outdoor, and ABA 3D rounds. Includes multi-profile archer management, bow setup tracking, club calendar, membership tracking, stats, and backup/restore.

-----

## Key Files

| File | Path | Purpose |
|------|------|---------|
| Working app | `/mnt/user-data/outputs/lilydale-bowmen-app.html` | Primary working file |
| Test build | `/mnt/user-data/outputs/lilydale-bowmen-testbuild.html` | Always kept in sync with working file |
| Versioned saves | `/mnt/user-data/outputs/lilydale-bowmen-app_vX_XX.html` | One per meaningful change |
| Requirements | `/mnt/user-data/outputs/REQUIREMENTS.md` | What the system must do |
| Dev log | `/mnt/user-data/outputs/DEVLOG.md` | What happened each session |
| README | `/mnt/user-data/outputs/README.md` | Public-facing project overview |
| Supabase schema | `/mnt/user-data/outputs/supabase-schema.sql` | Database table definitions |
| Framework | `/mnt/user-data/outputs/DEV_FRAMEWORK.md` | Development rules and patterns |

-----

## Architecture

### Single-file structure

All HTML, CSS, and JavaScript in one `index.html` file. No external dependencies except Google Fonts and the Supabase JS client (CDN).

### Data layer

- **localStorage** — primary store, all reads/writes go here first
- **Supabase** — background sync, silent, fails gracefully offline
- **Backup/restore** — manual JSON export/import via Other menu

### Key localStorage keys

| Key | Contents |
|-----|----------|
| `lb_profiles` | Archer profiles array |
| `lb_active_profile_id` | Active archer ID |
| `lb_bow_setups__<id>` | Per-archer bow setups |
| `lb_score_history` | Completed rounds (max 50) |
| `lb_scoring_progress` | Mid-round save state |
| `lb_user_events` | Custom calendar events |
| `lb_event_filters` | Filter prefs per archer/section |
| `lb_scoring_prefs` | Tracking options toggles |
| `lb_bow_seed_version` | Current: 2 — bump resets bow seed data |
| `lb_score_seed_version` | Current: 3 — bump adds new seed scores |
| `lb_filter_prefs_version` | Current: 2 — bump resets filter defaults |
| `lb_extra_clubs` | Additional club memberships |
| `lb_last_backup` | ISO timestamp of last export |
| `lb_device_id` | Silent device identity for Supabase sync |

### Supabase tables

`devices`, `profiles`, `bow_setups`, `score_history`, `user_events`, `preferences`

Row Level Security enabled — `USING (true) WITH CHECK (true)` with device_id enforced at query level. Anon key used in member app. Service_role key reserved for admin.html only.

### Score history sync

`score_history` rows include `member_name`, `lb_member_number`, `category` (Practice/Club/Official), `round_id`, `score`, `date`. Committee admin view filters to `category IN ('Club', 'Official')` — Practice rounds are never visible to committee.

-----

## Current Backlog

| # | Item | Priority |
|---|------|----------|
| 1 | Build committee admin view (admin.html) — separate client, password protected, Supabase service_role key | **High** |
| 2 | Verify group scoring course selector working correctly on device | Medium |
| 3 | Animal/group stats breakdown in Stats tab | Medium |
| 4 | Club results leaderboard in member app | Low |
| 5 | Multi-device sync via LB member number — preview-first, user-confirms, Accept/Reject flow — see design note in DEVLOG 19 May 2026 | Low |
| 6 | Push events from committee admin to member app calendar | Low |
| 7 | Fix remaining native confirm() in clear history function | Low |
| 8 | Report Issue / Request Feature in Other tab → Supabase relay → GitHub Action → GitHub issues | Low |
| 9 | Initial setup guide — first-run walkthrough for new members | Low |
| 10 | Capacitor native app wrapper (post v1.0) | Deferred |
| 11 | AI image scoring for IFAA Indoor ends (deferred — needs backend proxy) | Deferred |
| 12 | ABA 2-day shoot support — multi-round accumulation across 2 days (3-Arrow + 1-Arrow combinations); combined score tracking and leaderboard | Low |
| 13 | Competition registration — allow archers to register interest for upcoming events from within the app; visible to committee in admin view | Low |
| 14 | Local Wi-Fi score upload — connect to a host device on local Wi-Fi (no internet required) to submit scores at remote ABA locations without 4G/5G coverage | Low |
| 15 | Committee admin — retrieve competition registrations from Supabase; AI-suggested pre-grouping of archers by division/grade/gender; committee can adjust groupings on the day before shoot start | Low |
| 16 | Bluetooth connectivity — explore arrow tracking / scoring device integration | Long-term |

-----

## SESSION RULES

### Session Start Protocol

1. State current version number and file size
2. Review backlog and confirm session goals (max 3)
3. State any assumptions being made upfront
4. Confirm user agrees before beginning work

### Session End Protocol

1. State final version number and summary of changes
2. Update REQUIREMENTS.md — mark completed items, add new ones
3. Update DEVLOG.md with full session summary
4. Update README.md — add version to history, check any feature or data behaviour changes are reflected
5. Update DECISIONS.md if any architecture decisions were made
6. State updated backlog with priorities
7. Note anything deferred and why

### Session Goals Discipline

- Agree on 1–3 specific goals at session start
- Do not begin new features if current goals are incomplete
- If scope expands mid-session, explicitly agree before continuing
- Deferred items go to backlog, not abandoned

-----

## VERSIONING RULES

- Version format: `vX_XX` (e.g. `v0_47`)
- Save to both `lilydale-bowmen-app.html` AND `lilydale-bowmen-app_vX_XX.html` after every verified change
- Always keep `lilydale-bowmen-testbuild.html` in sync with the working file
- **Never overwrite a versioned file**
- Bump version after each verified working change — not just at session end

-----

## PRE-CHANGE PROTOCOL

Before any significant change, explicitly state:

1. **What** file and function is being changed
2. **Exact string** to be replaced and occurrence count — must be exactly 1
3. **Expected outcome** after the change
4. **Rollback plan** if the change fails

> If occurrence count is not 1 — stop and investigate before proceeding.

-----

## CHANGE SCOPE DISCIPLINE

- One logical change at a time — verify before moving to next
- Do not bundle multiple unrelated changes in one patch
- Changes touching more than one layer are high risk — flag before proceeding
- If a patch requires changes in more than 3 places, reconsider the approach

### Layer Tags — use these to label every change

- `[UI]` — HTML structure, CSS, visual output
- `[DATA]` — localStorage, Supabase schema, data structures
- `[LOGIC]` — business rules, scoring, state management
- `[SYNC]` — Supabase sync, API calls, network operations
- `[INFRA]` — error handling, init, PWA, service worker

-----

## ASSUMPTION LOGGING

- State all assumptions explicitly before acting
- Do not proceed on an assumption without user confirmation
- Log confirmed assumptions in DEVLOG under "Assumptions Made"
- If an assumption turns out wrong, log the correction

-----

## DEPENDENCY AWARENESS

Before any change, check:

- HTML structure changes → verify all JS getElementById/querySelector references
- Function signature changes → verify all call sites
- Data format changes → verify all read and write paths
- CSS class changes → verify no JS classList references rely on them
- Explicitly note: "This change requires X to also be updated"

### Known dependency risks in this project

- `.course-btn` selector must be scoped to `#course-selector-wrap` — global selection bleeds into group scoring
- `scoring-new-view` wrapper must exist for `setScoringMode()` to function
- `_confirmCallback` must be captured to local variable before `closeConfirmDialog()` nulls it
- Seed version constants (`lb_bow_seed_version`, `lb_score_seed_version`, `lb_filter_prefs_version`) — bumping these resets user data, do not bump casually
- `syncToSupabase()` must never throw — always wrapped in try/catch, always fire-and-forget

-----

## ERROR HANDLING STANDARDS

### Required infrastructure (already in place — do not remove or modify as part of feature patches)

```
Layer 1 — Pre-DOM (in <head> script):
  window.__earlyErrors = []
  window.onerror → pushes to __earlyErrors[]
  window.onunhandledrejection → pushes to __earlyErrors[]

Layer 2 — Init-time (runInit function):
  Each of 12 startup steps wrapped in individual try/catch
  On failure: _showError(label, detail) called, init stops
  Early errors flushed first before steps run

Layer 3 — Runtime (installed after successful init):
  window.onerror → _showError('Runtime error', detail)
  window.onunhandledrejection → _showError('Unhandled promise', detail)
```

### Error display rules

- `_showError(label, detail)` uses `createElement` / `textContent` only — **never innerHTML**
- Error banner (`id="js-error-banner"`) always present in HTML as a hidden div
- Dismissible via a DOM-created button with `addEventListener` — never inline onclick string
- **Never modify `_showError` or the error banner as part of another feature's patch**

### iOS Safari rules (always apply)

- `confirm()` / `alert()` / `prompt()` — **banned** — silently return false in PWA context
- All confirmations use `showConfirmDialog(title, body, onProceed)`
- Capture callback to local variable before calling `closeConfirmDialog()` — null-before-call bug
- Test over HTTPS only — `file://` origin masks all error detail
- "Script error" with no detail = cross-origin or pre-DOM issue

### Silent failure discipline

For every interactive element verify the full chain:

- Event fires → handler called → state changes → UI updates → side effects occur

### Common bug patterns in this project

| Pattern | Example | Fix |
|---------|---------|-----|
| Null-before-call | `closeConfirmDialog()` nulls callback before it's called | Capture to local var first |
| Global selector bleed | `.course-btn` matching group buttons | Scope to `#course-selector-wrap .course-btn` |
| Missing wrapper div | `scoring-new-view` absent, `setScoringMode()` throws | Ensure wrapper exists in HTML |
| Quote mismatch | Inline onclick with single quotes inside single-quoted string | Use DOM methods, not innerHTML |
| Positional splice | `content[:idx] + new + content[end:]` with wrong end position | Verify end position before splice |

-----

## ROLLBACK POLICY

| Situation | Action |
|-----------|--------|
| String not found (0 or 2+ matches) | Stop — investigate before proceeding |
| Syntax error after patch | Fix immediately — do not move on |
| Two consecutive fix attempts fail | **Restore from last versioned save** |
| File size changes by more than 10% unexpectedly | Verify — likely a splice error |
| Features disappear after a patch | **Restore from last versioned save** |

**Restore command:**

```python
import shutil
shutil.copy('/mnt/user-data/outputs/lilydale-bowmen-app_vX_XX.html',
            '/mnt/user-data/outputs/lilydale-bowmen-app.html')
```

Restoring is correct engineering practice — not failure.

-----

## SECURITY CHECKPOINTS

For any change touching Supabase, data storage, or credentials:

- Supabase anon key is public (by design) — never use service_role key in member app
- Service_role key goes in admin.html only — never commit to public GitHub repo
- Row Level Security must remain enabled on all tables
- Each device reads/writes only its own rows — filter by device_id in every query
- Practice rounds must never appear in committee view — `category IN ('Club', 'Official')`
- `syncToSupabase()` is fire-and-forget — never awaited in UI code, never blocks render

-----

## DOCUMENTATION STANDARDS

### REQUIREMENTS.md

- One row per requirement: ID, description, status (✅ / 🔲 / ⚠️)
- Grouped by feature area
- Never delete a requirement — mark Deferred with reason
- Update at every session end

### DEVLOG.md

Per session record:

- Version range (vX.XX → vX.XX)
- Bugs fixed — root cause, not just symptom
- Features added — behaviour, not just name
- Assumptions made and confirmed
- Decisions deferred and why
- Final backlog state

### README.md

- Public-facing — written for club members and new contributors
- Must include: live URL, getting started (iPhone PWA install), deployment instructions, version history
- Update at every session end — add version to history, check Privacy & Data section reflects current sync behaviour

-----

## ADVISORY vs IMPLEMENTATION

- Prefix advisory-only responses with **"Advisory only — no changes made"**
- Log advisory discussions in DEVLOG even if not implemented
- Tag deferred items in REQUIREMENTS with 🔲 Deferred + reason
- Do not implement anything discussed as advisory without explicit instruction

### Decisions already made — do not re-litigate

| Decision | Outcome |
|----------|---------|
| User accounts for sync | Rejected — device ID used instead |
| AI image scoring | Deferred — needs backend proxy for API key |
| Native app (Capacitor) | Deferred — post v1.0 |
| Supabase backend | Implemented v0.47 — device-based, no accounts |
| RLS policy approach | `USING (true) WITH CHECK (true)` — device_id enforced at query level, not pg config |
| Committee admin view | Separate admin.html — service_role key, never in member app |
| Member register | Optional, committee-managed, separate from member app |
| Practice rounds visibility | Hidden from committee — Club and Official only |
| Primary member identifier | Name (primary), LB member number (secondary) |
| Multi-device sync | LB member number approach agreed in principle — Low priority, post v1.0 |

-----

## TESTING CHECKLIST

Before marking any feature as done, verify:

- [ ] Syntax check passes (`node --check`)
- [ ] File size within expected range (±5%)
- [ ] Key DOM elements present (check by ID)
- [ ] No native browser dialogs used
- [ ] All event listeners scoped to correct container
- [ ] No innerHTML in error handling code
- [ ] Supabase sync hooks in place where data is saved
- [ ] `syncToSupabase()` calls are fire-and-forget (not awaited in UI path)
- [ ] iOS tested over HTTPS (not file://)
- [ ] Error banner visible and dismissible if triggered

-----

## PLATFORM NOTES

- **Primary target:** iPhone Safari, installed as PWA via Add to Home Screen
- **Secondary:** Android Chrome, desktop browsers
- **Minimum viable:** Any modern browser over HTTPS
- **Not supported:** IE, Opera Mini, file:// protocol
- **PWA install:** Encourages Add to Home Screen — more persistent localStorage than browser tab
- **Offline:** App works fully offline — Supabase sync queues and retries when online

-----

## CLUB REFERENCE

| Item | Value |
|------|-------|
| Club name | Lilydale Bowmen Inc. |
| Address | Pavitt Ln, The Basin VIC 3765 |
| Website | lilydalebowmen.com.au |
| Muster time | 9:30am on shoot days |
| Indoor nights | Wednesdays at 7pm (IFAA Indoor Round rules) |
| New member fee | $120 (pro-rata, excl. ABA fees) |
| Annual renewal | $75 (due January) |
| ABA membership | $110 (12-month rolling) |

### Round reference

| Round | Targets | Arrows | Max |
|-------|---------|--------|-----|
| ABA 3-Arrow | 20 | 3 | 400 |
| ABA 1-Arrow | 20 | 1 | 400 |
| IFAA Indoor | 12 ends | 5 | 300 |
| IFAA Outdoor | 28 | 4 | 560 |
| ABA 3D | 20 | 3 | 400 |
