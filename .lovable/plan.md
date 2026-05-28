# Verity Product Architecture — Batch A (revised)

Build Verity as one continuous audit workflow. Primitives first, then pages. Every screen reinforces: **event → verification → divergence → proof → recovery → verified**.

The landing page at `/` stays untouched. The product lives under `/app/*`.

## Guiding rules (non-negotiable)

- **Proof density over information density.** Timestamps, hashes, verification IDs, lineage — not charts and widgets.
- **Custom surfaces for verification, proof, incident, recovery flows.** Shadcn `Card` is reserved for dialogs, dropdowns, inputs, low-level primitives only. Verity surfaces use a dedicated `VerificationSurface` shell.
- **Mono everywhere it matters:** IDs, hashes, event types, timestamps.
- **No generic dashboard tone.** If a section feels like analytics, replace with a verification artifact.

## Phase 1 — Primitives (`src/components/verity/`)

Core trust primitives:

- `VerificationSurface` — the universal panel shell (subtle border, panel bg, header slot, optional footer). Replaces ad-hoc `Card` usage across all Verity pages. Variants: `default`, `inset`, `ledger`.
- `CorrectnessCertificate` — **the signature object.** Renders verification id, timestamp, systems checked count, divergence count, verifier (e.g. "Verity Engine v2.4.1"), verification hash (mono, truncated, copyable), status seal (Verified / Divergent / Pending). Compact + full variants. Designed to feel like an enterprise certificate, not a card.
- `VerificationDiff` — Expected vs Actual table (the centerpiece, extracted from current `DashboardMockup`).
- `ExpectedState` / `ActualState` — single state cell with tone, title, sub.
- `DivergencePanel` — highlighted mismatch summary (system + delta + severity).
- `VerifyDot` + `CorrectnessBadge` — Match / Mismatch / Pending semantics.
- `SystemIcon` — Stripe / HubSpot / Salesforce / Auth0 / Firebase / Postgres / SendGrid icon chip with consistent tone.
- `ProofTimeline` — vertical event log with tone dots, mono timestamps, system sublabel.
- `ProofRecord` — verification id / hash / verifier dl block (used inside `CorrectnessCertificate` full variant too).
- `RecoveryAction` — single suggested action with **confidence %**, **blast radius** (Low/Med/High), **rollback available** (Yes/No), estimated time, preview + execute buttons.
- `RecoveryPlan` — ordered list of `RecoveryAction`s with aggregate confidence + approval state.
- `RevenueImpact` — "$ at risk / recovered / net exposure" stat block.
- `PageHeader` — back link, impact badge (HIGH/MED/LOW), mono title, meta row, right-aligned actions.
- **Trust metrics** (renamed from MetricTile, no generic naming):
  - `TrustMetric` — base primitive (label, value, delta, sublabel). No charts.
  - `ReliabilityMetric`, `VerificationMetric`, `IntegrityMetric` — semantic wrappers with appropriate iconography and tone.

The existing landing-page `DashboardMockup` is refactored to consume these primitives so marketing and product never drift visually.

## Phase 1 — App shell

Route-level layout at `src/routes/app.tsx` (`<Outlet />` parent). Contains:

- `AppSidebar` — shadcn `Sidebar` (`collapsible="icon"`), groups: Workflow (Dashboard, Events, Incidents), Trust (Proof, Recovery, Rules), Surfaces (Connectors). Active route via `useRouterState`.
- `AppTopbar` — `SidebarTrigger`, breadcrumb, environment switcher (Production / Staging / Sandbox), `CommandPaletteTrigger` showing `⌘K`.
- `CommandPalette` — shadcn `Command` in a `Dialog`, opened via `⌘K` / `Ctrl+K`. Actions:
  - Search event IDs (fixtures)
  - Jump to incidents
  - Open recovery actions
  - Jump to proof records by verification id / hash
  - Navigate to any Tier-1 page
- Page content area renders only workflow content — no chrome duplication.

## Phase 1 — Event Detail page (`/app/events/$eventId`)

The page that defines the product. Composition top-to-bottom:

```text
PageHeader (back · HIGH IMPACT · payment_intent.succeeded · evt id · View in Stripe)
EventMetadata (type · source · customer · amount · environment · received at)
VerificationSurface » VerificationDiff (Expected vs Actual, 5 systems)
VerificationSurface » DivergencePanel (3 mismatches)
RevenueImpact ($18,240 at risk)
VerificationSurface » ProofTimeline
CorrectnessCertificate (full variant — id, hash, verifier, systems checked, status seal)
VerificationSurface » RecoveryPlan (confidence, blast radius, rollback availability, preview + execute)
```

Reference feel: GitHub PR diff + Stripe dispute + Sentry issue + Datadog trace.

## Phase 1 — Minimal Dashboard stub (`/app/`)

Just enough to validate primitive reuse and KPI naming. Not the full dashboard (that's Batch B).

Trust KPI row (no charts):

- `VerificationMetric` — Verified Today
- `IntegrityMetric` — Divergences Prevented
- `ReliabilityMetric` — Recovered Revenue
- `TrustMetric` — Certified Events

Below: link list to recent events (each row = mini `CorrectnessBadge` + event type + timestamp), pointing to Event Detail. Full Dashboard sections (Reliability Score, Recovery Queue, Correctness Timeline, Verification Feed) come in Batch B.

## Out of scope for Batch A (deferred to Batch B)

Incident Detail, full Dashboard, Proof Timeline ledger, Recovery Center, Verification Rules editor, Connectors page. All will compose from Batch A primitives — zero new ad-hoc components expected.

## Technical notes

- TanStack Start file-based routing, dot-notation: `src/routes/app.tsx`, `src/routes/app.index.tsx`, `src/routes/app.events.$eventId.tsx`.
- Each route sets distinct `head()` (title + description).
- Mock fixtures in `src/lib/verity-fixtures.ts`: a handful of events (incl. the `payment_intent.succeeded` from the landing mockup), connectors, verifier metadata. No backend yet.
- Dynamic route uses `Route.useParams()` + fixture lookup; unknown id → `notFoundComponent`.
- Tokens: keep OKLCH palette; add semantic aliases `--match`, `--mismatch`, `--pending`, `--certificate-seal` mapped to existing emerald/rose/zinc/indigo so primitives never hardcode colors.
- Sidebar wrapped in `SidebarProvider` inside `app.tsx`; `min-h-screen flex w-full` shell.
- Command palette: `cmdk` is already bundled via shadcn `Command`; no new deps.
- Typography: Inter for UI, `font-mono` for IDs, hashes, timestamps, event-type names.

## Deliverable

Batch A optimizes for **fidelity**, not page count: app shell + command palette + complete `verity/` primitive set + refactored landing mockup + perfect Event Detail page + minimal Dashboard stub with the four trust KPIs. Batch B (the other six pages) follows once you've signed off on Batch A's visual language.
