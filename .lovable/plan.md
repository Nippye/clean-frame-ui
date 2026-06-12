# Critical fixes: CTAs, logo, stub pages

Three targeted fixes. No new routes, no design system changes.

## 1. Wire marketing CTAs to real destinations

All `href="#"` in the marketing surface get routed to `/auth` (primary signup CTAs and Log in) or `/onboarding` where the audit explicitly suggested. Switch from `<a href>` to `<Link to>` so TanStack handles preload + type safety.

Files & mappings:
- `src/components/site/Navbar.tsx`
  - "Verify Revenue Flow" → `<Link to="/auth">`
  - "Log in" → `<Link to="/auth">`
  - Product / Solutions / Resources / Pricing / Integrations dropdowns: **remove from the navbar** (no real pages). Keep only `How It Works` → `<Link to="/how-it-works">`.
- `src/components/site/Hero.tsx`
  - "Verify Revenue Flow" → `<Link to="/auth">`
  - "See Demo" → `<Link to="/onboarding">`
  - "Investigate" pill in the Investigation card → `<Link to="/app/incidents">`
- `src/components/site/CtaBanner.tsx`
  - "Verify Revenue Flow" → `<Link to="/auth">`
- `src/components/site/Footer.tsx`
  - Trim footer nav to links that resolve: `How It Works` → `/how-it-works`. Remove Pricing/Security/Privacy/Terms/Contact (no routes). Keep the copyright + tagline block.

Out of scope: building Pricing/Security/Privacy/Terms/Contact pages.

## 2. Fix the broken logo

Per your choice, standardize on a single `<Logo />` component and stop depending on the CDN PNG that 404s.

- Rewrite `src/components/site/Logo.tsx` to render the same inline mark used in `AppSidebar.tsx` — `ShieldCheck` lucide icon in a small rounded indigo tile + "RevTether" wordmark in Inter semibold. Accepts an optional `className` and a `showWordmark` prop (defaults true) so existing call sites keep working.
- Delete the asset pointer `src/assets/revtether-logo.png.asset.json` via `assets--delete_asset` so the broken reference can't be reintroduced.
- No changes needed at call sites — `Navbar`, `Footer`, `auth.tsx`, `onboarding.tsx` already import `<Logo />`; they'll just render the new inline version.

This removes the broken-image flash on `/auth` and `/onboarding` and guarantees parity across every surface.

## 3. Mark the three stub /app pages as "Coming soon"

Keep the routes and sidebar links, but make the state explicit instead of shipping a lonely "BATCH B" placeholder.

- `src/components/app/AppSidebar.tsx`: add a small `Coming soon` badge (zinc pill, `text-[10px]`) next to the menu labels for `Proof timeline`, `Verification rules`, `Connectors`. Add `aria-label="Coming soon"` for SR users.
- `src/routes/app.proof.tsx`, `src/routes/app.rules.tsx`, `src/routes/app.connectors.tsx`: replace the current `VerificationSurface` body with a centered empty state:
  - lucide icon (`ScrollText` / `ListChecks` / `Plug`) in a muted ring
  - H2 page title (matching other /app pages' sans H1 style)
  - one-sentence description of what the surface will do (use the existing copy, stripped of the internal "Batch B" label)
  - "Coming soon" pill + secondary `<Link to="/app">Back to dashboard</Link>`
- Remove the user-facing string `"Batch B"` from these three files.

Out of scope: actually building Proof / Rules / Connectors functionality.

## Verification

After edits:
1. `bun run build` exits 0.
2. Click-through each marketing CTA in preview → lands on `/auth` or `/onboarding`.
3. `/auth` and `/onboarding` top-left shows the new inline logo (no broken image).
4. `/app/proof`, `/app/rules`, `/app/connectors` show the new empty state, sidebar shows the `Coming soon` badge.

## Explicitly NOT in this plan

- Mobile hamburger nav
- Incidents H1 font / dashboard metric rebalance / Events timestamp + ID cleanup
- Hero copy tightening, landing back-half trims
- New Pricing/Security/etc pages

(You opted into "Critical only" — happy to follow up with any of the above in a separate pass.)
