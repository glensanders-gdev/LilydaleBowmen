# Lilydale Bowmen App — Kanban

_Last updated: 2026-05-23 (Forge onboard)_

---

## In Progress

_None — last session ended cleanly at v0.77 (v0.78 local, unpushed)._

---

## Backlog

### High

| ID | Item | Notes |
|----|------|-------|
| LB-01 | Committee admin view (admin.html) | Password protected, Supabase service_role key, separate client. Filters scores to Club and Official only. Never shares anon key path. |

### Medium

| ID | Item | Notes |
|----|------|-------|
| LB-02 | Verify group scoring course selector on device | Known to work in browser — needs physical device confirmation |
| LB-03 | Animal/group stats breakdown in Stats tab | Per-animal-group performance data |

### Low

| ID | Item | Notes |
|----|------|-------|
| LB-04 | Club results leaderboard | Visible in member app — draws from Supabase Club/Official scores |
| LB-05 | Multi-device sync via LB member number | Preview-first, user-confirms, Accept/Reject flow. Design note in DEVLOG 19 May 2026. Post v1.0. |
| LB-06 | Push events from admin to member calendar | Committee-pushed events appear in member app calendar |
| LB-07 | Fix native confirm() in clear history | Last remaining native confirm() call — replace with showConfirmDialog() |
| LB-08 | Report Issue / Request Feature (Other tab) | Supabase relay → GitHub Action → GitHub Issues |
| LB-09 | Initial setup guide | First-run walkthrough for new members |
| LB-10 | ABA 2-day shoot support | Multi-round accumulation across 2 days (3-Arrow + 1-Arrow combos); combined score and leaderboard |
| LB-11 | Competition registration | Archers register interest for events from app; visible to committee in admin view |
| LB-12 | Local Wi-Fi score upload | Submit scores at remote ABA locations without 4G/5G (connect to host device on local Wi-Fi) |
| LB-13 | Admin: competition registrations + AI archer grouping | Retrieve registrations; AI-suggested pre-grouping by division/grade/gender; committee adjustable |

### Deferred

| ID | Item | Reason |
|----|------|--------|
| LB-14 | Capacitor native app wrapper | Post v1.0 — no benefit until feature set is stable |
| LB-15 | AI image scoring (IFAA Indoor) | Needs backend proxy for API key — cannot expose key in single-file client |

### Long-term

| ID | Item | Notes |
|----|------|-------|
| LB-16 | Bluetooth arrow tracking / scoring device integration | Exploratory — no target hardware identified yet |

---

## Done

_Tickets moved here when closed. Use `docs/kanban-archive.md` for older completed work._
