
# New /onboarding flow

Replace the current single-page `/onboarding` with a 6-step guided experience. One route, one path. End state: navigate to `/app` with a success toast.

## Steps

```
○ Connect   ○ Systems   ○ Verify   ◉ Scan   ○ Results   ○ Live
```

Subtle, Linear/Vercel/Stripe-style stepper across the top — small dots + labels, current step filled, prior steps checked. No giant wizard chrome.

| # | Label   | Behavior |
|---|---------|----------|
| 1 | Connect | "Connect Stripe" primary CTA. On click: 800ms simulated OAuth, then headline "847 events detected" + small meta (last 30 days, charges/invoices/subscriptions). Auto-advance after ~1.2s. |
| 2 | Systems | "Detected from your environment." HubSpot card pre-selected with green "Detected" badge + checkmark. Secondary muted cards: Salesforce, Segment (unselected, click to toggle). Primary CTA "Continue" — single click. Auto-advance on confirm. |
| 3 | Verify  | Renamed from "Auto-verify". Static list of 4 checks, each with icon + one-line description, all pre-enabled (no toggles, no rule builder): Payment → Record, Payment → Access, Payment → Finance, Subscription → Entitlements. Footer line: "Zero configuration required." CTA: "Start verification". |
| 4 | Scan    | 3-second scan animation: progress bar + rotating status lines ("Reading 847 Stripe events…", "Cross-checking HubSpot…", "Validating entitlements…", "Reconciling ledger…"). On complete, headline morphs to "3 mismatches found — $4,180 at risk". Auto-transition after ~800ms. |
| 5 | Results | The aha moment. KPI bar: **847** events · **21** verified flows · **3** mismatches · **$4,180** at risk. Below: Expected vs Actual side-by-side comparison card for one canonical case (Stripe `invoice.paid` ✓ vs HubSpot deal stage ✗). Two short "problem story" rows: <br>• "Customer paid. Onboarding never happened. Finance won't know for 23 days." <br>• "Subscription upgraded in Stripe. Entitlement never granted in app." <br>CTA: "Set up monitoring". |
| 6 | Monitoring | Renamed from "Configure" (sounds like value, not work). Heading: "How would you like to be notified?" Three equal cards: **Slack**, **Email**, **Both**. ONE live preview panel below that swaps content based on selection — shows a realistic alert ("RevTether · Mismatch detected · Stripe invoice paid → HubSpot deal not updated · $1,240 at risk"). CTA: "Launch RevTether ✅". |

## Launch behavior

`Launch RevTether` → `navigate({ to: "/app" })` then `toast.success("RevTether is now monitoring your revenue systems.")` via sonner.

## Implementation

Single rewrite of `src/routes/onboarding.tsx`.

- Local `useState<Step>` (1–6) drives the flow; no URL params, no nested routes.
- Keep existing imports/styling tokens already in the file (`bg-background`, emerald accents, `Logo`, lucide icons, `oklch(0.17_0.012_265)` cards). No new design tokens, no new shared components — all step bodies are inline subcomponents in the same file (matches current convention).
- Auto-advance uses `setTimeout` with cleanup in `useEffect`.
- Scan animation: CSS width transition on a progress bar + cycling status string on an interval (no extra deps).
- Step transitions wrapped in `animate-fade-in` for a calm feel.
- Stepper component is a single inline row; current step uses `bg-emerald-500`, completed steps show `Check` icon in muted emerald, future steps are zinc-500 outline dots. Labels visible on `sm:` and up, dots only on mobile.
- Replace the current 5-step `Step` row and the integration-grid body entirely. Keep the top navbar (Logo + "Need help?") and overall page shell.
- Pulls `useNavigate` from `@tanstack/react-router` and `toast` from `sonner`.

## Out of scope

- No backend wiring; all numbers/events are inline constants for the demo flow.
- No real Stripe OAuth — simulated delay only.
- No persistence across refreshes (state resets on reload, acceptable for demo).
- No changes to `/app`, navbar links, or other routes.

## Files touched

- `src/routes/onboarding.tsx` — full rewrite of the page body; route registration and metadata preserved.
