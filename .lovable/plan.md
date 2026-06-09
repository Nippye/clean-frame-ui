## Objective
Rebuild the detection card in `src/components/site/SilentFailures.tsx` as an investigation artifact — the visual hero of the section — with evidence-style fields, a breakout width, and dimmed counterfactual cascade.

## File
`src/components/site/SilentFailures.tsx` only.

## Detection card layout

```
DETECTED BY REVTETHER                 (eyebrow • mono uppercase • primary • pulsing dot)

CRM update missing                    (headline • larger, white)

Expected                Actual        (two-column on desktop, stacked on mobile)
HubSpot contact         No contact
created                 record found

Detected
2 minutes after payment

────────────────────────────────────  (subtle divider)

WITHOUT DETECTION                     (small mono uppercase label, muted)

Onboarding never triggered            (stacked, generous spacing, no bullets)

Customer never activated

Finance discovers issue
23 days later

────────────────────────────────────  (subtle divider)

Affected system: HubSpot · Event: invoice.paid · Revenue at risk: $1,200/mo
                                      (single muted metadata row)
```

## Visual treatment
- Breakout width: `-mx-8 lg:-mx-16` so the card visibly extends past the chain nodes.
- Padding: `p-6 sm:p-8`.
- Background: `bg-primary/[0.04]`, border `border-primary/40`, `ring-1 ring-primary/15`.
- Pulsing dot beside the eyebrow (keep existing animation).
- Expected/Actual: CSS grid `grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4`; labels in muted mono uppercase, values in `text-zinc-200`.
- Impact lines: stacked, `space-y-3`, no glyphs, `text-zinc-300`.
- Metadata row: `text-[11px] text-zinc-500`, single line on desktop, wraps on mobile.

## Contrast hierarchy
- Upstream nodes 01–02: opacity 100%.
- Detection card: opacity 100%, full primary accent.
- "WITHOUT DETECTION" label and downstream nodes 03–05: drop downstream node opacity from 40% to 25%.
- Connector lines into/within downstream chain: `bg-white/[0.03]`.

## Copy rules
- Use "DETECTED BY REVTETHER" — never "intervened" or any remediation language.
- Keep the section headline unchanged: "Most revenue failures don't look like outages."

## Out of Scope
- No changes to upstream/downstream `Node` markup beyond opacity tweak.
- No changes to other sections, routes, or dependencies.