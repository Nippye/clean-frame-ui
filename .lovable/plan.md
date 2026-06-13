# Onboarding Step 5 polish + post-launch report card

Tighten the Results step around a single CTA (`Set up monitoring`) with three narrative additions, and surface the Revenue Integrity Report as a reward on first `/app` load.

## Step 5 — Results (additions, single CTA preserved)

Order inside the step:

```
KPI bar  →  Timestamps  →  Affected Systems  →  Problem Stories  →  What Happens Next  →  [ Set up monitoring ]
```

1. **Timestamps** — appended to the existing "3 mismatches found — $4,180 at risk" headline as a muted sub-line:
   ```
   Detected in 2m 14s · Earliest issue dates back 23 days
   ```
   `text-sm text-zinc-500`, single line, tabular-nums on the durations.

2. **Affected Systems** — new compact panel below the Expected vs Actual card. Reuses `VerificationSurface` + `SystemIcon` from `src/components/verity/primitives.tsx`:
   | System | Role | Status |
   |---|---|---|
   | Stripe | Source | `✓` emerald |
   | HubSpot | CRM sync | `✕ Missing update` rose |
   | Internal App | Entitlements | `✕ Missing entitlement` rose |
   | QuickBooks | Finance | `✓ Healthy` emerald |
   Establishes that RevTether checks propagation across systems, not just Stripe.

3. **What Happens Next** — checklist block placed directly above the CTA. Bridges problem → monitoring:
   ```
   What happens next?
   ✓ We'll monitor invoice.paid
   ✓ We'll monitor subscription.updated
   ✓ Alerts arrive within minutes
   ✓ No code changes required
   ```
   Inline subcomponent, emerald check icons, no surface chrome — keeps it light.

CTA stays exactly one button: `Set up monitoring`. No share, no download, no secondary action in onboarding.

## Step 6 — Monitoring

Unchanged. Slack / Email / Both + live preview + `Launch RevTether ✅`.

## /app first-load — Revenue Integrity Report card

New dismissible card pinned at the top of `src/routes/app.index.tsx`, shown only on the first visit after onboarding completion. Frames the report as a reward for activation.

Layout:
```
✓ Monitoring active     ✓ First scan complete

Revenue Integrity Report Ready
847 events analyzed · 21 verified flows · 3 mismatches detected · $4,180 at risk

[ Download PDF ]   [ Share Summary ]                              ✕ dismiss
```

- Visual: emerald top border, `VerificationSurface` shell, KPI row uses the same tokens as Step 5 so the user recognizes the artifact.
- Dismiss: `localStorage.setItem("rt_report_card_dismissed", "1")` — card hidden on subsequent loads.
- Trigger: shown when `localStorage.getItem("rt_onboarded") === "1"` AND not dismissed. The Launch CTA in Step 6 sets `rt_onboarded` right before `navigate({ to: "/app" })` + toast.
- Buttons are stubs for now (`Download PDF` → `toast.info("Report download coming soon")`, `Share Summary` → copies a plain-text summary to clipboard via `navigator.clipboard.writeText`). No PDF generation, no backend.

## Out of scope

- Real PDF generation, share links, email delivery.
- Persisting onboarding state server-side (localStorage only — acceptable for the demo).
- Any change to Steps 1–4 or Step 6.

## Files touched

- `src/routes/onboarding.tsx` — Step 5 body: add timestamps sub-line, Affected Systems panel, What Happens Next block. Step 6: set `localStorage` flag on Launch.
- `src/routes/app.index.tsx` — render dismissible Revenue Integrity Report card at top when flag is set.
