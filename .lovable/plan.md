# Add Integrations and Solutions pages

Skip Pricing for now (waiting on your numbers). Skip Resources entirely.

## New routes

### `src/routes/integrations.tsx` → `/integrations`
Matches `/how-it-works` layout (Navbar, centered eyebrow + H1 + sub, grid section, `CtaBanner`, `Footer`).

Sections:
1. **Hero** — eyebrow "Integrations", H1 "Every system your revenue touches.", sub explaining read-only connectors.
2. **Payment processors** — card grid: Stripe (live), Adyen, Braintree, Paddle, Chargebee, Recurly. Each card: name, one-line role, status badge (Live / Beta / Roadmap).
3. **Databases & warehouses** — Postgres, MySQL, Snowflake, BigQuery, Redshift.
4. **Downstream systems** — Salesforce, HubSpot, NetSuite, QuickBooks, Segment, internal webhooks.
5. **"Don't see yours?"** — short block pointing to custom connector + contact CTA.
6. `CtaBanner` + `Footer`.

### `src/routes/solutions.tsx` → `/solutions`
Same chrome. Audience-segmented use cases.

Sections:
1. **Hero** — eyebrow "Solutions", H1 "Built for teams where every event is revenue.", sub.
2. **Three audience cards** (large, stacked on mobile, 3-col on lg):
   - **FinTech & Payments** — drift detection across processor ↔ ledger ↔ core banking. Sample findings.
   - **SaaS Billing** — invoice paid but entitlement not granted; subscription state drift.
   - **Marketplaces** — split payments, payouts, and seller balance reconciliation.
   Each: icon, headline, 3 bullet "what you catch" items, 2 sample finding rows.
3. **Outcomes strip** — 3 stats (placeholder copy: "$X recovered in first 30 days" etc., clearly generic so you can swap).
4. **Role-based fit** — short row: CFO / CTO / Platform Eng — one line each.
5. `CtaBanner` + `Footer`.

## Navbar update (`src/components/site/Navbar.tsx`)
Restore link list, keeping it minimal and aligned with built routes only:

```
How It Works · Solutions · Integrations
```

No dropdowns (every link goes to a real page). Pricing intentionally omitted until numbers arrive.

## SEO
Each route's `head()` sets unique `title`, `description`, `og:title`, `og:description` per `tanstack-route-architecture` rules. No `og:image` (no hero image asset for these pages).

## Style/tokens
Reuse existing semantic tokens (`bg-background`, `text-foreground`, `text-zinc-300/400/500`, `border-white/[0.04]`, `bg-primary`) and the same typography scale used in `how-it-works.tsx` and `Hero.tsx`. No new colors, no new components beyond simple cards built inline (consistent with how `how-it-works` does it).

## Out of scope
- Pricing page (waiting on numbers).
- Docs/Blog/Changelog.
- Backend wiring — all CTAs continue to point at `/auth`.
