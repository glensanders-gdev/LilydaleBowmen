# Lilydale Bowmen App — Development Log

*Newest entries at top. Older session logs also stored in /mnt/transcripts/journal.txt*

---

## Session — 21 May 2026 (v0.76 → v0.77)

### Summary
Short session focusing on offline capability. Service worker rewritten with cache-first strategy, Supabase CDN added to cached assets, manifest.json created, deployment issues identified and resolved.

### Changes

| Version | Change |
|---------|--------|
| v0.77 | Service worker rewritten (cache-first for app shell, CDN assets cached); manifest.json created; sw.js registration updated |

### Bugs Fixed
- Service worker was network-first — app failed to load offline even when previously visited
- Supabase JS CDN not in cache list — could fail on first offline load
- manifest.json missing from repo — PWA install incomplete
- sw.js and manifest.json referenced wrong filename (`lilydale-bowmen-app.html`) — repo serves `index.html`

### Deployment Checklist
Files required in GitHub repo root:
- `index.html` (rename from lilydale-bowmen-app.html)
- `sw.js` (new — cache-first strategy v2)
- `manifest.json` (new)
- `icon192.png` (check exists)
- `icon512.png` (check exists)

After push: visit live URL on mobile with data on, wait for full load, then test offline.

### Current Backlog

| # | Feature | Priority |
|---|---------|----------|
| 1 | Committee admin view (admin.html) — password protected, service_role key | **High** |
| 2 | Verify group scoring course selector on device | Medium |
| 3 | Animal/group stats breakdown in Stats tab | Medium |
| 4 | Club results leaderboard | Low |
| 5 | Multi-device sync via LB member number — preview-first, Accept/Reject | Low |
| 6 | Push events from admin to member calendar | Low |
| 7 | Fix native confirm() in clear history | Low |
| 8 | Report Issue / Request Feature → GitHub via Supabase relay | Low |
| 9 | Initial setup guide | Low |
| 10 | Capacitor native wrapper | Deferred |
| 11 | AI image scoring | Deferred |
| 12 | ABA 2-day shoot support | Low |
| 13 | Competition registration | Low |
| 14 | Local Wi-Fi score upload | Low |
| 15 | Committee admin — registration retrieval + AI archer pre-grouping | Low |
| 16 | Bluetooth | Long-term |

---

## Session — 20 May 2026 (v0.61 → v0.76)

### Summary
Large session covering group scoring fixes, profile field expansion, membership UI restructure, and multiple bug fixes from user testing.

### Changes

| Version | Change |
|---------|--------|
| v0.76 | Group scoring: stop after first scoring arrow (ABA rule); smaller archer cards |
| v0.75 | Group scoring: buttons now show score values per arrow slot matching individual scorer |
| v0.74 | Memberships: unified inline card system — all three types in one list, collapsed summary shows num + expiry, Add Club inline, bottom sheet removed |
| v0.73 | Bow types wrapped in collapsible dropdown; Add Club button moved to section header |
| v0.72 | Score boxes (Total/Done/Max) now update correctly as ends are confirmed |
| v0.71 | IFAA Indoor num mode: target face no longer shown after end completes |
| v0.70 | Bow profile name revert bug fixed — readFormData/populateForm scoped to modal container |
| v0.69 | IFAA Indoor: Course, Starting Target, Peg hidden from Tracking Options |
| v0.68 | Profile: Scoring Division + Peg added; individual scoring auto-fills from profile; Club/Official mandatory validation |
| v0.67 | Peg Colour (Red/Green/Yellow) added to individual Tracking Options and group roster; mandatory for Club/Official |
| v0.66 | Bow edit now opens as centred floating modal instead of inline at bottom |
| v0.65 | Age Category removed as enum, defaults to Adult silently |
| v0.64 | Grade (A/B/C) added to profile and group roster |
| v0.63 | Division renamed Membership Grade; Scoring Division added to group roster with full ABA/IFAA list |
| v0.62 | Gender + Age Category added to profile and group roster; Club/Official mandatory validation |

### Bugs Fixed
- Bow profile name reverting — readFormData/populateForm using document.getElementById picked first DOM match (inline form), not modal
- IFAA Indoor num mode showing empty target face after end complete
- Score boxes (Total/Done/Max) never updating — functions existed but were never called
- Group scoring ABA buttons showing A/B/C without values — zoneDefs used abstract values, now actual per-slot values passed at render time
- Group scoring allowing all 3 arrows to score — ABA rule: stop after first scoring arrow

### Decisions
- Age Category hidden (always Adult) — reduces UI noise, ABA uses Red/Green/Yellow peg for age differentiation
- Grade always optional — never mandatory for any round type
- Bow edit as floating modal — breaks bottom sheet pattern but justified by UX (eligible divisions visible behind modal)
- Group scoring cards compacted — padding, slot size, button size all reduced

### Backlog Changes
- Item 7a (bow edit position) — resolved in v0.66, removed from backlog
- Items 12–16 added (ABA 2-day, competition registration, local Wi-Fi, admin pre-grouping, Bluetooth)

### Current Backlog

| # | Feature | Priority |
|---|---------|----------|
| 1 | Committee admin view (admin.html) — password protected, service_role key | **High** |
| 2 | Verify group scoring course selector on device | Medium |
| 3 | Animal/group stats breakdown in Stats tab | Medium |
| 4 | Club results leaderboard | Low |
| 5 | Multi-device sync via LB member number — preview-first, Accept/Reject | Low |
| 6 | Push events from admin to member calendar | Low |
| 7 | Fix native confirm() in clear history | Low |
| 8 | Report Issue / Request Feature → GitHub via Supabase relay | Low |
| 9 | Initial setup guide | Low |
| 10 | Capacitor native wrapper | Deferred |
| 11 | AI image scoring | Deferred |
| 12 | ABA 2-day shoot support | Low |
| 13 | Competition registration | Low |
| 14 | Local Wi-Fi score upload | Low |
| 15 | Committee admin — registration retrieval + AI archer pre-grouping | Low |
| 16 | Bluetooth | Long-term |

---

## Design Note — Report Issue / Request Feature via GitHub (19 May 2026)

### Approach agreed
- Supabase relay — app writes to a `feedback` table (anon key, safe), GitHub Action picks up rows and creates issues
- GitHub Action preferred over Supabase Edge Function — simpler, no extra deployment
- Open to all members — no PIN code
- Delay: up to 1 hour (GitHub Action schedule)

### Implementation plan
1. Supabase: create `feedback` table (SQL in dashboard)
2. App: add Report Issue / Request Feature to Other sheet — form with type toggle, title, description; auto-fills device_id, app version
3. App: `submitFeedback()` function — writes to Supabase feedback table, shows toast
4. GitHub: PAT with Issues: Read & Write on LilydaleBowmen repo, stored as repository secret
5. GitHub Action YAML: scheduled hourly, reads unprocessed feedback rows, creates issues with bug/enhancement label, marks rows processed

### Schema needed
```sql
CREATE TABLE feedback (
  id          BIGSERIAL PRIMARY KEY,
  device_id   TEXT,
  type        TEXT,
  title       TEXT,
  description TEXT,
  app_version TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  processed   BOOLEAN DEFAULT FALSE
);
```

### Deferred pending
- User to create GitHub PAT (Settings → Developer settings → Fine-grained tokens → Issues: Read & Write on LilydaleBowmen repo)
- GitHub Action agreed as relay mechanism
- Implementation to proceed next session

---

## Design Note — Multi-device Sync via LB Member Number (19 May 2026)

### Background
Current sync uses a random device UUID. Two phones owned by the same member have completely separate Supabase datasets. LB member number is the agreed approach for linking them.

### Key design decision: preview-first, user-confirms
Silent merge on LB number match was rejected in favour of a preview-and-confirm flow. Reasons:
- Wrong LB number entry would otherwise silently import a stranger's data
- Member getting a new phone may not want all historical data
- Accept/Reject gives the member control and prevents accidental data corruption

### User flow
1. Member enters LB number in Profile and saves
2. App queries Supabase for other devices with matching `lb_member_number`
3. No match → saves silently, nothing else changes
4. Match found → show Sync Preview screen (summary, date range selector, Review & Accept / Skip)
5. Review screen shows category-level breakdown — member can toggle categories off
6. On Accept → merge locally, push to Supabase under both device IDs
7. On Reject → LB number cleared locally, nothing written to Supabase (read-only until Accept)

### Wrong LB number protection
- Preview is read-only — no writes until Accept is tapped
- Reject clears the LB field locally with no trace
- Legitimate owner's data cannot be corrupted by a wrong entry

### Schema changes required
```sql
ALTER TABLE devices ADD COLUMN lb_member_number TEXT;
CREATE INDEX idx_devices_lb_number ON devices(lb_member_number);

ALTER TABLE score_history ADD COLUMN lb_member_number TEXT;
CREATE INDEX idx_score_history_lb_number ON score_history(lb_member_number);
```

### Merge strategy
| Data | Strategy |
|---|---|
| Score history | Union by record_id — last write wins per record |
| Bow setups | Last write wins per profile |
| Linked events | Union — no conflicts possible |
| Profiles | LB-number device treated as master |

### Deferred until
Committee admin view is complete and Supabase schema is confirmed stable.

---

## Session — 19 May 2026 continued (v0.59 → v0.61)

### Summary
Short continuation fixing Indoor Training Nights not appearing in past events. Required two patches.

### Changes

| Version | Change |
|---------|--------|
| v0.61 | Bug fix: added Indoor Training Night entry to PAST_TRACK — events were generated but immediately discarded |
| v0.60 | Added Wednesday indoor night generation to getPastEventsForMonth() |

### Bugs Fixed
- Indoor Training Nights missing from past events — two-part fix:
  1. getPastEventsForMonth() was not calling getWednesdayIndoorEvents() at all
  2. PAST_TRACK had no entry for 'Indoor Training Night' so events hit `if (!track) return` and were dropped
  - Root cause: UPCOMING_TRACK and PAST_TRACK were out of sync

### Notes
- Indoor filter remains off by default (FILTER_DEFAULT_OFF) — intentional, 4-5 events per month
- Users enable via filter chips on Events tab

---

## Session — 19 May 2026 continued (v0.54 → v0.59)

### Summary
UI polish, bug fixes from user testing, two new features. App tested on device — user confirmed they like it and would use it.

### Changes

| Version | Change |
|---------|--------|
| v0.59 | Past events starts at current month; "Didn't attend" button with undo |
| v0.58 | Bug fix: bow types not persisting on profile switch |
| v0.57 | Active arrow slot highlight (gold pulse animation) + larger arrow label |
| v0.56 | Bug fix: logo click made logo huge — inline style removed |
| v0.55 | Logo click navigates to Scoring tab (home) |

### Bugs Fixed
- Logo oversized — inline style was overriding CSS size constraints
- Bow types not persisting — toggleBowType() writing to legacy `lb_profile` key instead of active profile in `lb_profiles`

### User Testing Feedback
- Arrow 2/3 appeared unselectable — arrow label was 11px/45% opacity; fixed with larger label + active slot pulse
- Bow types not persisting — fixed v0.58
- User confirmed app is usable and they would use it

---

## Session — 19 May 2026 (v0.47 → v0.54)

### Summary
Supabase sync, profile/membership restructure, UI cleanups, tab navigation restructure.

### Changes

| Version | Change |
|---------|--------|
| v0.54 | Bug fix: cal-prev/cal-next addEventListener null error |
| v0.53 | Tab restructure: Profile · Events · Scoring · Stats · Other; calendar grid removed |
| v0.52 | Club logo on membership dropdown rows |
| v0.51 | Header location corrected to The Basin, Victoria |
| v0.50 | Annual Fee field removed from Club Membership sheet |
| v0.49 | Membership cards → compact collapsible dropdowns; bow toggle rows smaller |
| v0.48 | Profile and Memberships pages combined; deleteExtraClub iOS confirm() fix |
| v0.47 | Supabase sync module: device ID, syncToSupabase(), hooks in all five save functions |

### Bugs Fixed
- cal-prev/cal-next addEventListener null — DOM elements removed in v0.53 restructure
- deleteExtraClub() using native confirm() — replaced with showConfirmDialog()

### Documents Updated
- README.md, DEV_FRAMEWORK.md, PROJECT_INSTRUCTIONS.md (created)

---

## Session — 18 May 2026 (v0.46 → v0.47)

### Summary
Implemented Supabase silent background sync. RLS policies patched for anon key compatibility.

### Changes

| Version | Change |
|---------|--------|
| v0.47 | Supabase sync module: device ID, client init, syncToSupabase(), hooks in all five save functions |

### Assumptions Made
- RLS `USING (true) WITH CHECK (true)` acceptable at club scale
- Fire-and-forget sync with no retry queue — acceptable for v1 scope

---

## Session: 17 May 2026 (v0.33 → v0.45)

**Live URL:** https://glensanders-gdev.github.io/LilydaleBowmen/

### Bug Fixes
- Script error on load — scoring-new-view wrapper missing
- Individual scoring round buttons missing
- Group course selector not selectable — scoped to #course-selector-wrap
- Confirm dialog Proceed not working — null callback bug
- Archer deletion not working — iOS native confirm() banned
- Reset button no effect after confirm — same null callback pattern

### Features Added
- Tracking Options panel (5 toggles, lb_scoring_prefs)
- App opens to Scoring tab by default
- IFAA Indoor method/face chooser
- Compact UI pass
- Bow type toggle rows
- Group scoring three roster buttons (Member / Profile / Guest)
- Custom confirm dialog (showConfirmDialog)
- Backup & restore
- 2026 calendar updated; address corrected to The Basin VIC 3765
- README.md generated

### Version History

| Version | Key change |
|---------|-----------|
| v0_33–v0_45 | See original session log above for full detail |
