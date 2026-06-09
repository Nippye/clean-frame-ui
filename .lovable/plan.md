# HowItWorks refinement plan

Goal: push the section from "process grid" to "complete story" — Event → Verification → Finding.

## Changes to `src/components/site/HowItWorks.tsx`

### 1. Asymmetric hierarchy (1 < 2 > 3)
- Grid changes from `[1fr_28px_1.15fr_28px_1fr]` to roughly `[0.75fr_24px_1.4fr_24px_0.95fr]`.
- Shrink `SideCard` internals: padding `p-8 → p-6`, icon area height `120px → 84px`, title `18px → 16px`, body `13.5px → 13px`, max-width `260px → 220px`.
- Keep `VerificationCard` at current scale (it's the hero of the section).

### 2. Delete the bottom benefits strip
Remove the entire "Real-time detection / Complete visibility / Protect revenue" block and its `FeatureItem` component. The Security section downstream already carries that weight; repeating it here flattens the narrative.

### 3. Stronger connection inside VerificationCard
Make the center column read as a literal pipe rather than two rows of decorative tiles:
- Top row label: small uppercase "Sources" caption above Stripe/Shopify/PayPal tiles.
- Vertical dashed arrow down into the central "R" hub (replace the current horizontal dashed line — verification flows top→bottom, not left→right).
- Hub stays as the green "R" pill but slightly larger with a subtle ring pulse (static CSS, no JS).
- Vertical dashed arrow down into the bottom row.
- Bottom row label: small uppercase "Destinations" caption above HubSpot / Salesforce / Segment / GA tiles (4 across instead of 3 + "& more"; drop the &more tile — it weakens the visual).
- Add PayPal to top row using `SiPaypal` from react-icons/si for parity with the user's spec.

### 4. Replace step 3 "Break detected" with a real finding artifact
New `FindingCard` (still positioned as step 3, same outer slot):
```
┌─────────────────────────┐
│  ● CRM update missing   │   ← rose dot + title
│                         │
│  EXPECTED               │
│  HubSpot contact created│
│                         │
│  ACTUAL                 │
│  No contact record found│
│                         │
│  REVENUE AT RISK        │
│  $1,200 / mo            │
│                         │
│  Detected 2 min after   │
│  payment                │
└─────────────────────────┘
```
- Uses `divide-y divide-white/[0.06]` rows, mono for the dollar amount, rose accent on title dot only.
- Keeps the `StepNum n={3}` badge floating at top.
- Reuses the visual language of `FindingExample.tsx` so the section previews the investigation surface that appears elsewhere on the page.

### 5. Reduce vertical height (~15–20%)
- Section padding `py-16 lg:py-20` → `py-12 lg:py-16`.
- Heading→grid gap `mt-14` → `mt-10`.
- Grid→logo strip gap: after removing benefits strip, set `mt-10` directly on the logo strip block.
- Logo strip top label `mt-10` stays; tighten internal `mt-5 → mt-4`.

### 6. Logo strip touch-up
- Add PayPal to the logo strip for consistency with the new top row.
- Keep "& more" in the strip (it's contextually fine there, just not inside the verification card).

## Files touched
- `src/components/site/HowItWorks.tsx` — all changes above.
- No other files. No new packages (PayPal icon already exists in `react-icons/si`).

## Out of scope
- No changes to surrounding sections, spacing of the page, or routes.
- No motion library work — any "pulse" is pure CSS.

Result: the section reads Event → Verification → Finding, with a clear primary (center) and two supporting beats, ending on a concrete artifact instead of a generic alert.
