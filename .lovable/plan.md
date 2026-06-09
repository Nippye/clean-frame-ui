# Rebuild SilentFailures as a Failure Chain

Replace the current headline + subheadline + checklist with a single, premium visual artifact: a vertical cause-and-effect chain showing how one silent revenue failure cascades, with a RevTether detection marker inserted at the break point.

## Section structure

1. **Headline (kept)**
   `Most revenue failures don't look like outages.`
   No subheadline. No paragraph. Let the visual carry the weight.

2. **The failure chain** — a vertical stack of 5 nodes connected by thin vertical lines, centered, max-width ~560px.

   ```text
   ┌──────────────────────────────────────┐
   │  01  Payment succeeds                │
   │      Stripe charge captured · $1,200 │
   └──────────────────────────────────────┘
                    │
   ┌──────────────────────────────────────┐
   │  02  CRM update missing              │
   │      HubSpot contact never created   │
   └──────────────────────────────────────┘
                    │
        ┌───────────────────────────┐
        │  ● RevTether detected     │
        │    the break here         │
        │    2 min after payment    │
        └───────────────────────────┘
                    │  (dimmed below — what would have happened)
   ┌──────────────────────────────────────┐
   │  03  Onboarding never triggered      │
   └──────────────────────────────────────┘
                    │
   ┌──────────────────────────────────────┐
   │  04  Customer never activates        │
   └──────────────────────────────────────┘
                    │
   ┌──────────────────────────────────────┐
   │  05  Finance discovers it 23 days    │
   │      later, at month-end recon       │
   └──────────────────────────────────────┘
   ```

   - Nodes 01–02: full opacity, normal border (`border-white/[0.08]`)
   - **Detection marker**: highlighted — primary-colored left border or ring, small filled dot, eyebrow-style label "REVTETHER DETECTED THE BREAK HERE", supporting line "2 minutes after payment"
   - Nodes 03–05: dimmed (`opacity-40`) to read as "what would have happened without detection" — the counterfactual cascade

3. **No CTA, no extra copy.** The chain is the story.

## Visual details

- Card surface: same token palette already in use (`bg-white/[0.02]`, `border-white/[0.08]`, rounded-lg, generous padding)
- Step numbers in `text-zinc-500 text-xs tabular-nums`
- Primary line in `text-zinc-100`
- Supporting line in `text-zinc-500 text-sm`
- Connector lines: 1px `bg-white/[0.08]`, ~24px tall between nodes
- Detection marker uses existing `--primary` token (the orange/amber currently used elsewhere in the site)
- Section padding consistent with neighbors: `py-24 lg:py-28`
- Fully responsive: chain narrows on mobile but layout stays vertical (no horizontal scroll)

## Files

- **Edit** `src/components/site/SilentFailures.tsx` — full rewrite. Remove the Check-icon list. Remove the subheadline. Build the headline + 5-node chain with the detection marker between nodes 02 and 03.

No other files change. No new dependencies. No new routes.

## Out of scope

- No icon grid revival
- No checklist
- No additional sections, CTAs, or testimonials
- No changes to neighboring sections (Hero, IntegrationEcosystem, HowItWorks)
