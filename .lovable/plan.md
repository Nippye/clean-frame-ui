
# /app Dashboard Redesign

Anchor the dashboard on one question: **"Is revenue breaking right now?"** The signature moat is the **Expected vs Actual** outcome view nobody else shows.

## Final structure

```text
┌──────────────────────────────────────────────────────────────┐
│  Revenue Integrity              [Run audit] [Report] [+ Sys] │
│  $5,980 at risk · 3 active divergences · 287 days verified   │
├──────────────────────────────────────────────────────────────┤
│  HERO — Highest Impact Incident                              │
│  Stripe payment_succeeded · 17 min ago · $3,140              │
│                                                              │
│  Expected             Actual                                 │
│  ✓ CRM contact        ✕ CRM missing                          │
│  ✓ Access granted     ✓ Access granted                       │
│  ✓ Invoice synced     ✕ Invoice not synced                   │
│                                            [ Investigate ]   │
├────────────────────────────┬─────────────────────────────────┤
│  Active incidents (3)      │  Impact by system               │
│  compact list              │  bars: Stripe / HubSpot / QB    │
├────────────────────────────┴─────────────────────────────────┤
│  Why this matters                                            │
│  • Onboarding blocked                                        │
│  • Entitlements missing                                      │
│  • Finance reconciliation delayed                            │
├──────────────────────────────────────────────────────────────┤
│  Correctness timeline · 30 days                              │
├──────────────────────────────────────────────────────────────┤
│  Recent verification evidence                                │
└──────────────────────────────────────────────────────────────┘
```

## Sections

1. **Header** — "Revenue Integrity" title; single-line subhead `$5,980 at risk · 3 active divergences · 287 days verified` (lock-in stated plainly, no "retained"). Quick actions (`Run audit`, `Generate report`, `Add system`) demoted to small ghost buttons top-right.

2. **Expected vs Actual hero (the moat)** — Two-column checklist for the top divergent event with revenue impact, detection age, source event, single `Investigate` CTA. Only section permitted to use red emphasis. Replaces the current `FlowDiagram`.

3. **Active incidents** + **Impact by system** — Side-by-side. Left: compact 3-row list of unresolved divergences (source → target, $ at risk, age) linking to `/app/incidents`. Right: horizontal bars per system (Stripe, HubSpot, Auth0, QuickBooks) showing $ verified vs $ at risk — answers "where is the leak concentrated?"

4. **Why this matters** — Three muted bullets, no card chrome, placed between the incident grid and the timeline. Translates technical drift into business consequences:
   - Onboarding blocked
   - Entitlements missing
   - Finance reconciliation delayed

5. **Correctness timeline** — Lightweight 30-day daily bars (verified vs divergent), no chart library.

6. **Recent verification evidence** — Quiet table of last ~8 events. "Evidence" language, not "Events".

## Visual language (premium restraint)

- Remove ~70% of visible borders; lean on 2–4% background tone lifts and spacing.
- Only **one** red element on screen at a time (the hero ✕ rows / $ impact).
- No colored card backgrounds, no neon, no glows. Near-black surfaces, zinc text scale.
- Typography does hierarchy: tighter tracking on numbers, larger hero number, chrome labels in `uppercase tracking-[0.16em] text-zinc-500`.
- Strip the post-onboarding `ReportCard` to one neutral line so it doesn't compete with the hero.

## Navigation update (`AppSidebar`)

Final items: **Dashboard, Incidents, Evidence, Rules, Resolution, Systems**.
- Rename `Events` label → `Evidence` (route stays `/app/events`).
- Rename `Recovery` label → `Resolution` (route stays `/app/recovery`).
- Add `Rules` (`/app/rules`) and `Systems` (`/app/connectors`) back into the nav.

## Files to change

- `src/routes/app.index.tsx` — full restructure per layout above; remove `FlowDiagram`, add `ExpectedVsActual` hero, `ActiveIncidents`, `ImpactBySystem`, `WhyThisMatters`, `CorrectnessTimeline`, `RecentEvidence` sections. Quiet `ReportCard`.
- `src/components/app/AppSidebar.tsx` — relabel + reorder nav items.
- `src/lib/verity-fixtures.ts` — read-only; derive expected/actual checks, per-system totals, 30-day series from existing `events`. No schema changes.

## Out of scope

- Backend / data model changes.
- New routes or dependencies.
- Real timeline chart library — plain divs only.
