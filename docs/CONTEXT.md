# Lilydale Bowmen App — Domain Context

## Club

**Lilydale Bowmen Inc.**
Pavitt Ln, The Basin VIC 3765
[lilydalebowmen.com.au](https://lilydalebowmen.com.au)

| Item | Value |
|------|-------|
| Muster time | 9:30am on shoot days |
| Indoor nights | Wednesdays at 7pm (IFAA Indoor Round rules) |
| New member fee | $120 (pro-rata, excl. ABA fees) |
| Annual renewal | $75 (due January) |
| ABA membership | $110 (12-month rolling) |

## Governing Bodies

| Acronym | Full name | Context |
|---------|-----------|---------|
| ABA | Australian Bowhunters Association | Governs animal and 3D rounds |
| IFAA | International Field Archery Association | Governs indoor and outdoor field rounds |

## Round Types

| Round | Targets | Arrows per target | Max score |
|-------|---------|-------------------|-----------|
| ABA 3-Arrow | 20 | 3 | 400 |
| ABA 1-Arrow | 20 | 1 | 400 (linked to 3-Arrow) |
| IFAA Indoor | 12 ends | 5 per end | 300 |
| IFAA Outdoor | 28 | 4 | 560 |
| ABA 3D | 20 | 3 | 400 |

## Scoring Zones

### ABA Animal Rounds (3-Arrow, 1-Arrow, 3D)

| Zone | 1st Arrow | 2nd Arrow | 3rd Arrow |
|------|-----------|-----------|-----------|
| A — Kill | 20 | 14 | 8 |
| B — Outer Kill | 18 | 12 | 6 |
| C — Wound | 16 | 10 | 4 |
| Miss | 0 | 0 | 0 |

### IFAA Indoor Round

| Zone | Score |
|------|-------|
| X-Ring / White Spot | 5 |
| All black rings | 4 |
| Miss | 0 |

Target faces: **Single Spot** or **5-Spot** (5 mini faces on one card).
Scoring methods: **Arrow Plotting** (tap target face) or **Number Entry**.

### IFAA Outdoor Round

| Zone | Score |
|------|-------|
| Spot | 5 |
| Mid | 4 |
| Outer | 3 |
| Miss | 0 |

## ABA Animal Target Groups

| Group | Size | Senior Distance |
|-------|------|-----------------|
| 1 | Small | 5.6–14 m |
| 2 | Medium-Small | 8–19 m |
| 3 | Medium | 11–26 m |
| 4 | Large | 16–35 m |
| 5 | Extra Large | 24–48 m |

All distances are unmarked — competitors estimate range.

## Key Domain Terms

| Term | Definition |
|------|-----------|
| LB | Lilydale Bowmen — club abbreviation used throughout codebase |
| Category | Practice / Club / Official — determines committee visibility. Practice rounds are never visible to committee |
| Peg Colour | Red / Green / Yellow — archer's designated start position on the range. Mandatory for Club and Official rounds |
| Scoring Division | Full ABA/IFAA competitive division (e.g. Recurve Senior Gent). Separate from Membership Grade |
| Membership Grade | A / B / C — club grade level |
| Group scoring | Up to 5 archers scored simultaneously on one device |
| Individual scoring | Standard single-archer scoring mode |
| Seed data | Pre-loaded example bow setups and scores populated on first install |
| lb_device_id | Auto-generated UUID stored in localStorage — anonymous device identity for Supabase sync. No user account required |
| X-Ring | Inner scoring ring on IFAA Indoor target (scores 5, same as White Spot — used for tie-breaking in competition) |
| Course colour | Optional tracking field — range/course identifier |
| Starting Target | Which target number the archer begins at (for staggered starts) |

## localStorage Keys

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
| `lb_bow_seed_version` | Current: 2 — bumping resets bow seed data |
| `lb_score_seed_version` | Current: 3 — bumping adds new seed scores |
| `lb_filter_prefs_version` | Current: 2 — bumping resets filter defaults |
| `lb_extra_clubs` | Additional club memberships |
| `lb_last_backup` | ISO timestamp of last export |
| `lb_device_id` | Silent device identity for Supabase sync |

## Supabase Tables

`devices`, `profiles`, `bow_setups`, `score_history`, `user_events`, `preferences`

RLS enabled — `USING (true) WITH CHECK (true)`. Device_id enforced at query level. Anon key in member app. Service_role key reserved for admin.html only (not yet built).

## Known Dependency Risks

- `.course-btn` selector must be scoped to `#course-selector-wrap` — global selection bleeds into group scoring
- `scoring-new-view` wrapper must exist for `setScoringMode()` to function
- `_confirmCallback` must be captured to local variable before `closeConfirmDialog()` nulls it
- Seed version constants — bumping resets user data, do not bump casually
- `syncToSupabase()` must never throw — always fire-and-forget, always wrapped in try/catch
