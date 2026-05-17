# 🏹 Lilydale Bowmen Archery App

A mobile-first Progressive Web App (PWA) for members of the **Lilydale Bowmen** archery club, Montrose, Victoria. Built as a single HTML file — no install, no server, no dependencies.

**Live app:** `https://YOUR-USERNAME.github.io/lilydale-bowmen-app/`

---

## Features

### 🎯 Scoring
- **Individual scoring** for all five round types:
  - ABA 3-Arrow Round
  - ABA 1-Arrow Round
  - IFAA Indoor Round
  - IFAA Outdoor Round
  - ABA Outdoor 3D Round
- **Group scoring** for up to 5 archers simultaneously — add saved Profiles, named Members, or Guests
- **IFAA Indoor** supports both Arrow Plotting (tap the target face) and Number Entry, with Single Spot and 5-Spot face options
- Mid-round save — close the app and resume later
- Round type selector: Practice / Club Comp / Official
- Optional tracking (toggleable per preference): Course Colour, Starting Target, Division, Bow Setup, Archer & Club

### 👤 Profiles
- Multiple archer profiles on one device
- Per-profile bow setups with full specification forms (Barebow, Olympic, Compound, Longbow)
- Division eligibility hints based on recorded equipment
- Per-profile scoring history, membership details, and extra club memberships

### 📊 Stats
- Personal best, year average, last score per round type
- Course breakdown for outdoor rounds
- Recent history bar chart
- Filter by bow setup and round category

### 📅 Events & Calendar
- 2026 Lilydale Bowmen event calendar with filter chips
- Wednesday indoor training nights auto-generated
- Add, edit, and delete custom events
- Link saved scores to past events
- Export to `.ics` (Apple Calendar, Outlook) or Google Calendar

### 🎯 Targets Reference
- Full ABA animal target group reference (Groups 1–5) with distances and zone scoring
- IFAA Indoor target face diagrams (Single Spot and 5-Spot) with scoring rules

### 🪪 Memberships
- Lilydale Bowmen and ABA membership number and expiry tracking
- Expiry status with visual warnings
- Additional club memberships

---

## Getting Started

### iPhone / iPad (Recommended)

1. Open the app URL in **Safari**
2. Tap the **Share** button (box with arrow)
3. Tap **Add to Home Screen**
4. Name it (e.g. `LB Archery`) and tap **Add**

The app installs as a full-screen PWA with a home screen icon. No App Store required.

### Android

1. Open the URL in **Chrome**
2. Tap the three-dot menu → **Add to Home screen**

### Desktop

Just open the URL in any browser. Works in Chrome, Safari, Firefox, and Edge.

---

## Deployment

This app is a single `index.html` file. To update:

1. Upload the new `index.html` to the GitHub repository
2. GitHub Pages redeploys automatically within ~60 seconds

No build step, no framework, no dependencies — just upload and go.

---

## Privacy & Data

**All data is stored locally on your device.** Nothing is sent to any server.

| Storage key | Contents |
|-------------|----------|
| `lb_profiles` | Archer profiles |
| `lb_score_history` | Completed round scores (max 50) |
| `lb_scoring_progress` | Mid-round save state |
| `lb_bow_setups__<id>` | Bow setup specs per archer |
| `lb_user_events` | Custom calendar events |
| `lb_event_scores` | Event–score links |
| `lb_event_filters` | Filter preferences |
| `lb_scoring_prefs` | Tracking options toggles |
| `lb_extra_clubs__<id>` | Additional club memberships |

Clearing your browser's site data will erase all saved information. There is no cloud backup.

---

## Round Scoring Reference

### ABA Animal Rounds (3-Arrow, 1-Arrow, 3D)

| Zone | 1st Arrow | 2nd Arrow | 3rd Arrow |
|------|-----------|-----------|-----------|
| A (Kill) | 20 | 14 | 8 |
| B (Outer Kill) | 18 | 12 | 6 |
| C (Wound) | 16 | 10 | 4 |
| Miss | 0 | 0 | 0 |

20 targets · Max score **400 pts**

### IFAA Indoor Round

| Zone | Score |
|------|-------|
| X-Ring / White spot | 5 |
| All black rings | 4 |
| Miss | 0 |

12 ends × 5 arrows · 20 yards · Max score **300 pts**

### IFAA Outdoor Round

| Zone | Score |
|------|-------|
| Spot | 5 |
| Mid | 4 |
| Outer | 3 |
| Miss | 0 |

28 targets × 4 arrows · Max score **560 pts**

---

## Target Groups (ABA)

| Group | Size | Animals | Senior Distance |
|-------|------|---------|-----------------|
| 1 | Small | Rabbit, Hare, Feral Cat, Feral Fox | 5.6–14 m |
| 2 | Medium-Small | Hog Deer (hind), Chital, Feral Goat, Fox, Dingo | 8–19 m |
| 3 | Medium | Hog Deer (stag), Chital, Sambar, Feral Goat, Feral Pig | 11–26 m |
| 4 | Large | Feral Pig, Red Deer, Sambar, Feral Goat | 16–35 m |
| 5 | Extra Large | Buffalo, Sambar, Red Deer, Rusa, Camel | 24–48 m |

All distances are **unmarked** — competitors estimate range.

---

## Club Information

**Lilydale Bowmen Inc.**
Pavitt Ln, The Basin VIC 3765
[lilydalebowmen.com.au](https://lilydalebowmen.com.au)

Disciplines: Target · Field · 3D · Bowhunting

---

## Version History

> **Note:** Detailed changelog tracking began at v0.22. Earlier versions are reconstructed from development session records.

### Recent (v0.22 onwards)

| Version | Notes |
|---------|-------|
| v0.42 | Group scoring: Add Member / Profile / Guest; bow type toggle sliders in profile |
| v0.41 | Bow type selector converted to toggle rows; confirm dialog for archer deletion |
| v0.40 | Custom confirm dialog replacing iOS-blocked native `confirm()` |
| v0.39 | IFAA Indoor: scoring method chooser (Arrow Plotting / Number Entry), Single Spot / 5-Spot |
| v0.38 | Compact pill-style round and category buttons; fixed saved round card layout |
| v0.37 | Improved error trap with full stack traces; group course selector scoped fix |
| v0.36 | Group course selector bug fixed; individual course listener scoped |
| v0.35 | Filter defaults: Indoor and Intro Course off by default; filter version reset |
| v0.34 | Tracking Options panel; optional fields hidden by default; default page → Scoring |
| v0.33 | Permanent error trap; round selector restored; error banner added |
| v0.32 | Scoring-new-view wrapper added; IFAA Indoor target fix |
| v0.30 | Link 1-Arrow to 3-Arrow for combined score |
| v0.28 | Weather section removed; combined round removal; iOS error trapping |
| v0.26 | Group scoring; calendar export (.ics / Google Calendar) |
| v0.24 | Multi-archer profile system; per-profile data isolation |
| v0.22 | iOS Safari compatibility fixes; PWA test build |

### Early development (v0.0 – v0.21, March 2026)

| Version | Notes |
|---------|-------|
| v0.21 | Optional chaining fixes; element null-safety throughout |
| v0.20 | Bow profile recorded on all saved rounds; back-fill via edit sheet |
| v0.19 | Bow filter in Stats tab; rounds filterable by bow setup |
| v0.18 | Calendar rendering cleanup; orphaned render calls removed |
| v0.17 | Event filters independent per section (Upcoming / Past / Calendar) |
| v0.16 | Per-archer filter preferences; filter row refreshes on profile switch |
| v0.15 | Past events month navigation; No Intro Course entries handled correctly |
| v0.14 | Score linking on past events; gold border on shoot/competition events |
| v0.13 | Past events section on Home tab with month navigation |
| v0.12 | Add / edit / delete custom calendar events |
| v0.11 | Upcoming events filter chips (ABA Comp, Club ABA, IFAA, 3D, Working Bee, Meetings) |
| v0.10 | Home tab upcoming events list; date badges; event type tags |
| v0.9 | IFAA Indoor end-by-end arrow plotting with save-as-PNG |
| v0.8 | Stats tab: PB, year average, course breakdown, history bar chart |
| v0.7 | Seed scoring history; seed bow setups with example profiles |
| v0.6 | Training journal removed; tab renamed Stats |
| v0.5 | Multi-profile system; per-profile localStorage isolation; profile migration |
| v0.4 | Responsive layout; mobile-first breakpoints; button and input styling |
| v0.3 | Logo embedded as base64; membership fee details |
| v0.2 | PWA support (manifest, service worker); group scoring initial implementation |
| v0.1 | Group scoring patch; logo upload; multi-profile refactor (later rolled back) |
| v0.0 | Initial build: all tabs, scoring logic, ABA/IFAA rounds, target reference, training journal, weather/fire API |

---

## Development Notes

- **Single-file architecture** — all HTML, CSS, and JavaScript in one `index.html`
- **No frameworks or build tools** — vanilla JS, CSS custom properties, SVG
- **Fonts** loaded from Google Fonts (Playfair Display + Outfit)
- **PWA** — service worker and manifest for offline capability and home screen install
- **iOS compatibility** — native `confirm()` and `alert()` avoided in favour of custom in-app dialogs

---

*Built for Lilydale Bowmen Inc. · Not an official ABA or IFAA product*
