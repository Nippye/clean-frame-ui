## RevTether homepage — final plan (information architecture + visual direction locked)

**Order:** Hero → Product shot → Finding example → Silent failures → How it works → Security → CTA
**Narrative:** Problem → Proof → Evidence → Categories → Process → Trust → Action

### Global design philosophy

RevTether should feel like infrastructure software, not a startup landing page. Communicate: reliability, operational clarity, financial trust, technical competence. Every component must justify its existence. If a visual element does not improve comprehension, remove it. Whitespace is a primary design element.

**Layout rules**
- Max content width: 1200–1280px
- Vertical spacing between sections: 96–144px
- No decorative illustrations, floating cards, oversized gradients, glowing blobs, parallax, animated backgrounds
- Emphasis comes from typography, spacing, composition

**Typography (Inter throughout)**
- Hero headline: 64–72px desktop, weight 700, tight tracking, tight line height
- Section headlines: 36–48px, weight 600–700
- Body: 18px, comfortable line height, max width ~600px
- Short sentences. No marketing copy blocks.

**Motion**
- Fade + slight translate only, 300–500ms
- No bounce, float, dramatic scale, parallax. Motion should feel invisible.

**Tie-breakers**
- Believable over beautiful · Clear over feature-rich · Less UI over more UI

### Sections

1. **Hero** (~70–80vh, centered hierarchy)
   - Eyebrow: `REVENUE INTEGRITY PLATFORM`
   - H1: "Know when revenue breaks. Before finance does."
   - Sub: "Continuously verify payments, billing, webhooks, and downstream systems."
   - Buttons: `Verify Revenue Flow`, `See Demo`
   - Nothing else.

2. **Product shot** — single **investigation surface**, no browser chrome, no fake charts, no KPI grid, no marketing overlay. Quiet and credible. Issue #1 with Expected/Actual, Revenue at risk: $1,200, `View investigation`.

3. **Finding example** — looks like evidence (incident report / audit record).
   - Label/value rows, strong alignment, minimal color:
     - Expected event — Invoice paid
     - Actual downstream result — Customer record missing
     - Affected system — HubSpot
     - Revenue at risk — $1,200
     - Detected — 2 minutes ago

4. **Silent failures** — three equal-width cards. Title + one sentence. No icons-as-illustrations, no gradients, no animation. Almost boring.
   - Missing payouts — "Revenue settled incorrectly, delayed, or never received."
   - Broken webhooks — "Critical events fail silently between systems."
   - Reconciliation gaps — "Expected records don't match actual records."

5. **How it works** — diagrammatic, single horizontal row on desktop, four steps, one sentence each. No large cards, no feature lists.
   - Connect — "Read-only access to Stripe, Shopify, PayPal, and more."
   - Verify — "Validate historical and real-time event flow."
   - Monitor — "Continuously check for divergence and failures."
   - Act — "Investigate findings before they impact finance."

6. **Security** — single horizontal strip, compact, utility-focused.
   - ✓ Read-only access · ✓ Encrypted data flow · ✓ Complete audit trail · ✓ SOC 2 readiness

7. **CTA** — keep existing `CtaBanner`, reduce surrounding clutter. One decision, one action.

### Removed from homepage

Trust row, integration logo strip, feature grid, large dashboard mockup, and the full Environment → Connect Stripe → Initial Scan → Divergence → Investigation → Dashboard product-tour strip.

### Moved, not deleted

Product-tour sequence relocates to a new `/how-it-works` page (visual, product-heavy — users opted in). Hero's `See Demo` links here.

### Files

- edit `src/components/site/Hero.tsx` — strip to text + 2 buttons; keep `DashboardMockup` export for reuse on `/how-it-works`
- edit `src/routes/index.tsx` — new section order; drop `LogoStrip` and `FeatureGrid` from homepage
- edit `src/styles.css` — ensure Inter is the base font, define spacing scale tokens if needed
- edit `src/routes/__root.tsx` — `<link>` for Inter if not already loaded
- new `src/components/site/ProductShot.tsx` — investigation surface
- new `src/components/site/FindingExample.tsx` — evidence-style label/value rows
- new `src/components/site/SilentFailures.tsx` — 3 plain cards
- new `src/components/site/HowItWorks.tsx` — 4 diagrammatic steps, single row
- new `src/components/site/Security.tsx` — 1-row, 4 items
- new `src/routes/how-it-works.tsx` — full product-tour sequence with own SEO metadata

### Notes

- Dark theme, existing design tokens only.
- `LogoStrip` and `FeatureGrid` files left in place, unlinked from homepage.
- 10-second test: What is this? · What does it catch? · What happens when something breaks?
- Benchmarks: Stripe, Mercury, Linear, Vercel, Supabase. Not generic SaaS templates.
