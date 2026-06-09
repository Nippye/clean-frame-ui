export function IntegrationEcosystem() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-24">
      {/* Eyebrow */}
      <div className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        Built to verify workflows across
      </div>

      {/* Logo row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:gap-x-16">
        <StripeLogo />
        <HubSpotLogo />
        <SalesforceLogo />
        <ShopifyLogo />
        <SegmentLogo />
        <MixpanelLogo />
        <GALogo />
      </div>

      {/* Supporting caption */}
      <p className="mx-auto mt-12 max-w-[640px] text-center text-[13.5px] leading-relaxed text-zinc-400">
        RevTether verifies that critical revenue events propagate correctly between billing, CRM, provisioning, analytics, and finance systems.
      </p>
    </section>
  );
}

function StripeLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm4.5 18c-1.5 0-2.5-.8-2.5-2.2V14c0-1.3.9-2 2.3-2 .6 0 1 .1 1.4.2v-1.3c-.4-.1-.9-.2-1.5-.2-2.3 0-3.8 1.3-3.8 3.8v3.7c0 2.5 1.3 3.7 3.6 3.7.7 0 1.3-.1 1.7-.2v-1.4c-.4.1-.9.2-1.4.2-.9 0-1.8-.4-1.8-1.9V16c0-1.6.8-2 1.8-2 .5 0 1 .1 1.4.2v3.7c.1.3.1.6.1.8h1.6v-.1c0-.2-.1-.5-.2-.7z" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Stripe</span>
    </div>
  );
}

function HubSpotLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect x="2" y="2" width="28" height="28" rx="6" fill="currentColor" />
        <circle cx="13" cy="13" r="2.5" fill="#05070A" />
        <circle cx="19" cy="13" r="2.5" fill="#05070A" />
        <circle cx="13" cy="19" r="2.5" fill="#05070A" />
        <circle cx="19" cy="19" r="2.5" fill="#05070A" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">HubSpot</span>
    </div>
  );
}

function SalesforceLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 2C9.4 2 4 7.4 4 14c0 6.6 5.4 12 12 12s12-5.4 12-12S22.6 2 16 2zm-4 18c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm8 0c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Salesforce</span>
    </div>
  );
}

function ShopifyLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M25.5 6.5l-1.8-.3c-.1 0-.2.1-.3.2l-1.1 2.6c-.4-.1-.9-.2-1.4-.2-.9 0-1.6.3-2.1.8-.6-.2-1.3-.4-2-.5-.1-.7-.2-1.4-.3-2 0-.1-.1-.2-.2-.3-.1 0-.2-.1-.3-.1-.4.1-.9.3-1.3.4-.3-1-.7-1.8-1.4-2.4-.8-.7-1.8-.9-2.8-.5-1.5.5-2.6 2-3.1 4-.3 1-.4 2-.3 3-.8.2-1.5.5-2.2.8-.1 0-.2.1-.3.2 0 .1-.1.2-.1.3.1.7.2 1.4.3 2.1 0 .1.1.2.2.3.1 0 .2.1.3 0 .6-.2 1.2-.4 1.8-.6.2 1.6.5 3.3.8 4.9 0 .1.1.2.2.3.1.1.2.1.3.1l5.6 1.1c.1 0 .2 0 .3-.1.1-.1.2-.2.2-.3.2-1.2.5-2.4.7-3.6.5.1 1 .1 1.5.1 1.2 0 2.2-.3 3-.8.8-.5 1.4-1.2 1.7-2 .4-.9.4-1.9.1-2.9.3-.1.5-.2.8-.3.1 0 .2-.1.3-.2 0-.1.1-.2.1-.3l-.2-2.4z" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Shopify</span>
    </div>
  );
}

function SegmentLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-3 18c-1.7 0-3-1.3-3-3s1.3-3 3-3h3v6h-3zm6-6c1.7 0 3 1.3 3 3s-1.3 3-3 3h-3v-6h3z" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Segment</span>
    </div>
  );
}

function MixpanelLogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M4 14h4v12H4V14zm6-4h4v16h-4V10zm6-2h4v18h-4V8zm6 6h4v12h-4V14z" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Mixpanel</span>
    </div>
  );
}

function GALogo() {
  return (
    <div className="flex items-center gap-2 opacity-[0.6] transition hover:opacity-[0.85]">
      <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path d="M16 2C8.3 2 2 8.3 2 16s6.3 14 14 14 14-6.3 14-14S23.7 2 16 2zm-2 20c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="currentColor" />
        <circle cx="16" cy="16" r="3" fill="currentColor" />
      </svg>
      <span className="text-[15px] font-semibold tracking-tight text-zinc-300">Google Analytics</span>
    </div>
  );
}
