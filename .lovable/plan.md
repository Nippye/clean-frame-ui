## Change

In `src/routes/index.tsx`:
- Remove `<IntegrationEcosystem />` from the homepage render order
- Remove its import

This drops the entire "Built to verify workflows across" logo/strap band that currently sits between the Hero and the "Most revenue failures don't look like outages." section. With it gone, `RevenueFailures` naturally moves up directly under the Hero — no spacing changes needed since each section owns its own vertical padding.

The `IntegrationEcosystem.tsx` component file is left in place (not deleted) in case it's wanted elsewhere later.

## Out of scope
- No changes to `HowItWorks`, `RevenueFailures`, or any other section.
- No styling, copy, or layout edits beyond the removal.