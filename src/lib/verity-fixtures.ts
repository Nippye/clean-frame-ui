// RevTether mock fixtures — used across Event Detail, Dashboard, Command Palette.
// No backend yet; this is the single source of truth for in-memory data.

export type SystemKey =
  | "stripe"
  | "hubspot"
  | "salesforce"
  | "auth0"
  | "firebase"
  | "postgres"
  | "sendgrid"
  | "entitlements";

export type Tone = "ok" | "bad" | "pending";

export type VerificationRow = {
  system: SystemKey;
  name: string;
  check: string;
  expectedTone: Tone;
  expectedTitle: string;
  expectedSub: string;
  actualTone: Tone;
  actualTitle: string;
  actualSub: string;
};

export type TimelineEntry = {
  time: string;
  title: string;
  system: string;
  tone: Tone;
};

export type RecoveryStep = {
  id: string;
  title: string;
  description: string;
  confidence: number; // 0-100
  blastRadius: "Low" | "Medium" | "High";
  rollback: boolean;
  estimate: string;
  system: SystemKey;
};

export type EventFixture = {
  id: string;
  type: string;
  impact: "HIGH" | "MEDIUM" | "LOW";
  status: "Succeeded" | "Failed" | "Pending";
  source: string;
  customer: string;
  amount: string;
  environment: "Production" | "Staging" | "Sandbox";
  receivedAt: string;
  receivedAtIso: string;
  revenueAtRisk: number;
  verificationId: string;
  verifier: string;
  hash: string;
  certificateStatus: "Verified" | "Divergent" | "Pending";
  systemsChecked: number;
  divergenceCount: number;
  rows: VerificationRow[];
  timeline: TimelineEntry[];
  recovery: RecoveryStep[];
};

export const events: EventFixture[] = [
  {
    id: "evt_1N7X9A2eZvKYIo2C",
    type: "payment_intent.succeeded",
    impact: "HIGH",
    status: "Succeeded",
    source: "Stripe",
    customer: "acme.com · cus_QzL08fK21",
    amount: "$1,200.00 USD",
    environment: "Production",
    receivedAt: "May 12, 2026 at 10:42:31 AM",
    receivedAtIso: "2026-05-12T10:42:31Z",
    revenueAtRisk: 18240,
    verificationId: "ver_01J7X9A2EWK1Q2CA887",
    verifier: "RevTether Engine v2.4.1",
    hash: "a3f2b6c1d4e5f78901234567abcd9d7c1e",
    certificateStatus: "Divergent",
    systemsChecked: 5,
    divergenceCount: 3,
    rows: [
      {
        system: "stripe",
        name: "Stripe Payment",
        check: "Payment Intent",
        expectedTone: "ok",
        expectedTitle: "Succeeded",
        expectedSub: "Amount: $1,200.00 USD",
        actualTone: "ok",
        actualTitle: "Succeeded",
        actualSub: "Amount: $1,200.00 USD",
      },
      {
        system: "hubspot",
        name: "CRM (HubSpot)",
        check: "Subscription Stage",
        expectedTone: "ok",
        expectedTitle: "Customer",
        expectedSub: "Stage: Paid",
        actualTone: "bad",
        actualTitle: "Trial",
        actualSub: "Stage: Trial",
      },
      {
        system: "entitlements",
        name: "Entitlements (API)",
        check: "Access Level",
        expectedTone: "ok",
        expectedTitle: "Active",
        expectedSub: "Plan: Pro",
        actualTone: "bad",
        actualTitle: "Inactive",
        actualSub: "Plan: Pro",
      },
      {
        system: "postgres",
        name: "Database (Users)",
        check: "Subscription Status",
        expectedTone: "ok",
        expectedTitle: "active",
        expectedSub: "Renews: Jun 12, 2026",
        actualTone: "ok",
        actualTitle: "active",
        actualSub: "Renews: Jun 12, 2026",
      },
      {
        system: "sendgrid",
        name: "Welcome Email",
        check: "Customer Onboarding",
        expectedTone: "ok",
        expectedTitle: "Sent",
        expectedSub: "Template: welcome_pro",
        actualTone: "bad",
        actualTitle: "Failed",
        actualSub: "Error: SMTP 550",
      },
    ],
    timeline: [
      { time: "10:42:31", title: "Payment succeeded", system: "Stripe", tone: "ok" },
      { time: "10:42:32", title: "CRM update failed", system: "HubSpot", tone: "bad" },
      { time: "10:42:33", title: "Entitlement not activated", system: "API", tone: "bad" },
      { time: "10:42:34", title: "Email delivery failed", system: "SendGrid", tone: "bad" },
      { time: "10:42:40", title: "Verification complete", system: "RevTether", tone: "ok" },
    ],
    recovery: [
      {
        id: "rec_crm_sync",
        title: "Resync subscription stage to HubSpot",
        description: "Push cus_QzL08fK21 to stage = Paid via HubSpot CRM API.",
        confidence: 98,
        blastRadius: "Low",
        rollback: true,
        estimate: "8s",
        system: "hubspot",
      },
      {
        id: "rec_entitlement",
        title: "Activate Pro entitlement",
        description: "POST /entitlements/activate with plan=pro for the affected customer.",
        confidence: 96,
        blastRadius: "Low",
        rollback: true,
        estimate: "6s",
        system: "entitlements",
      },
      {
        id: "rec_email_replay",
        title: "Replay welcome_pro email",
        description: "Reissue welcome_pro template via SendGrid with retry policy.",
        confidence: 88,
        blastRadius: "Low",
        rollback: false,
        estimate: "9s",
        system: "sendgrid",
      },
    ],
  },
  {
    id: "evt_2P8YQ3bJxLn4Tr9F",
    type: "invoice.payment_failed",
    impact: "MEDIUM",
    status: "Failed",
    source: "Stripe",
    customer: "northwind.io · cus_RA118KbB2",
    amount: "$420.00 USD",
    environment: "Production",
    receivedAt: "May 12, 2026 at 10:38:02 AM",
    receivedAtIso: "2026-05-12T10:38:02Z",
    revenueAtRisk: 4200,
    verificationId: "ver_01J7X8Y9MB22A0CZ110",
    verifier: "RevTether Engine v2.4.1",
    hash: "b71c44e09a0caa3d2f6b8e0a7c11d2ea88",
    certificateStatus: "Divergent",
    systemsChecked: 4,
    divergenceCount: 1,
    rows: [
      {
        system: "stripe",
        name: "Stripe Invoice",
        check: "Invoice Status",
        expectedTone: "ok",
        expectedTitle: "open",
        expectedSub: "Attempt: 2",
        actualTone: "ok",
        actualTitle: "open",
        actualSub: "Attempt: 2",
      },
      {
        system: "postgres",
        name: "Database (Subscriptions)",
        check: "Past Due Flag",
        expectedTone: "ok",
        expectedTitle: "past_due = true",
        expectedSub: "Updated within 60s",
        actualTone: "bad",
        actualTitle: "past_due = false",
        actualSub: "Stale 12m",
      },
    ],
    timeline: [
      { time: "10:38:02", title: "Invoice payment failed", system: "Stripe", tone: "bad" },
      { time: "10:38:05", title: "Verification started", system: "RevTether", tone: "ok" },
      { time: "10:38:08", title: "Database flag stale", system: "Postgres", tone: "bad" },
    ],
    recovery: [
      {
        id: "rec_flag_pastdue",
        title: "Set past_due = true on subscription row",
        description: "Update subscriptions where stripe_id = sub_xxx; emit downstream webhook.",
        confidence: 99,
        blastRadius: "Low",
        rollback: true,
        estimate: "3s",
        system: "postgres",
      },
    ],
  },
  {
    id: "evt_3M2LK7eRfQp8Cn1A",
    type: "customer.subscription.updated",
    impact: "LOW",
    status: "Succeeded",
    source: "Stripe",
    customer: "globex.app · cus_S22Aj0PpQ",
    amount: "—",
    environment: "Production",
    receivedAt: "May 12, 2026 at 10:31:14 AM",
    receivedAtIso: "2026-05-12T10:31:14Z",
    revenueAtRisk: 0,
    verificationId: "ver_01J7X7K4QYR4F0CD908",
    verifier: "RevTether Engine v2.4.1",
    hash: "9e44a07712dcab1f0998fe6b0c3344aa19",
    certificateStatus: "Verified",
    systemsChecked: 3,
    divergenceCount: 0,
    rows: [
      {
        system: "stripe",
        name: "Stripe Subscription",
        check: "Plan",
        expectedTone: "ok",
        expectedTitle: "Pro",
        expectedSub: "Quantity: 1",
        actualTone: "ok",
        actualTitle: "Pro",
        actualSub: "Quantity: 1",
      },
      {
        system: "entitlements",
        name: "Entitlements (API)",
        check: "Plan",
        expectedTone: "ok",
        expectedTitle: "Pro",
        expectedSub: "Active",
        actualTone: "ok",
        actualTitle: "Pro",
        actualSub: "Active",
      },
    ],
    timeline: [
      { time: "10:31:14", title: "Subscription updated", system: "Stripe", tone: "ok" },
      { time: "10:31:18", title: "Verification complete", system: "RevTether", tone: "ok" },
    ],
    recovery: [],
  },
];

// Canonical mock event used by the dashboard verification feed.
events.push({
  id: "evt_mock_123",
  type: "invoice.payment_succeeded",
  impact: "HIGH",
  status: "Succeeded",
  source: "Stripe",
  customer: "acme.com · cus_QzL08fK21",
  amount: "$1,200.00 USD",
  environment: "Production",
  receivedAt: "May 31, 2026 at 09:14:02 UTC",
  receivedAtIso: "2026-05-31T09:14:02Z",
  revenueAtRisk: 1200,
  verificationId: "ver_01J7XMOCK00000000123",
  verifier: "RevTether Engine v2.4.1",
  hash: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
  certificateStatus: "Verified",
  systemsChecked: 6,
  divergenceCount: 0,
  rows: [
    {
      system: "stripe",
      name: "Stripe Invoice",
      check: "Payment status",
      expectedTone: "ok",
      expectedTitle: "paid",
      expectedSub: "Amount: $1,200.00 USD",
      actualTone: "ok",
      actualTitle: "paid",
      actualSub: "Amount: $1,200.00 USD",
    },
    {
      system: "postgres",
      name: "Database (Invoices)",
      check: "Ledger entry",
      expectedTone: "ok",
      expectedTitle: "settled",
      expectedSub: "Posted within 2s",
      actualTone: "ok",
      actualTitle: "settled",
      actualSub: "Posted within 1.4s",
    },
    {
      system: "entitlements",
      name: "Entitlements (API)",
      check: "Plan access",
      expectedTone: "ok",
      expectedTitle: "Active",
      expectedSub: "Plan: Pro",
      actualTone: "ok",
      actualTitle: "Active",
      actualSub: "Plan: Pro",
    },
  ],
  timeline: [
    { time: "09:14:02", title: "Invoice paid", system: "Stripe", tone: "ok" },
    { time: "09:14:03", title: "Ledger row inserted", system: "Postgres", tone: "ok" },
    { time: "09:14:04", title: "Entitlement reaffirmed", system: "API", tone: "ok" },
    { time: "09:14:05", title: "Certificate sealed", system: "RevTether", tone: "ok" },
  ],
  recovery: [],
});

export function getEvent(id: string) {
  return events.find((e) => e.id === id);
}

export const trustKpis = {
  verifiedToday: { value: "1,240,891", delta: "+12%", sub: "Last 24h · 6 connectors" },
  divergencesPrevented: { value: "14", delta: "Alert", sub: "Auto-quarantined" },
  recoveredRevenue: { value: "$42,105.00", delta: "+$8.2k", sub: "Auto-recovered today" },
  certifiedEvents: { value: "99.998%", delta: "+0.002%", sub: "Sealed verifications" },
};

export type FeedItem = {
  id: string;
  type: string;
  customer: string;
  receivedAt: string;
  status: "Verified" | "Divergent" | "Pending";
  systemsChecked: number;
  divergenceCount: number;
  amount?: string;
};

export const verificationFeed: FeedItem[] = [
  {
    id: "evt_1N7X9A2eZvKYIo2C",
    type: "invoice.payment_succeeded",
    customer: "acme.com · cus_QzL08fK21",
    receivedAt: "09:14:02 UTC",
    status: "Verified",
    systemsChecked: 6,
    divergenceCount: 0,
    amount: "$1,200.00",
  },
  {
    id: "evt_2P8YQ3bJxLn4Tr9F",
    type: "charge.refunded",
    customer: "northwind.io · cus_RA118KbB2",
    receivedAt: "09:12:48 UTC",
    status: "Divergent",
    systemsChecked: 5,
    divergenceCount: 2,
    amount: "$420.00",
  },
  {
    id: "evt_3M2LK7eRfQp8Cn1A",
    type: "customer.subscription.updated",
    customer: "globex.app · cus_S22Aj0PpQ",
    receivedAt: "09:11:30 UTC",
    status: "Verified",
    systemsChecked: 3,
    divergenceCount: 0,
  },
  {
    id: "evt_4Q9ZR4cKyMo5Us0G",
    type: "payment_intent.succeeded",
    customer: "initech.co · cus_T33Bk1QqR",
    receivedAt: "09:10:11 UTC",
    status: "Verified",
    systemsChecked: 4,
    divergenceCount: 0,
    amount: "$3,499.00",
  },
  {
    id: "evt_5R0AS5dLzNp6Vt1H",
    type: "invoice.payment_failed",
    customer: "umbrella.dev · cus_U44Cl2RrS",
    receivedAt: "09:08:55 UTC",
    status: "Divergent",
    systemsChecked: 4,
    divergenceCount: 1,
    amount: "$89.00",
  },
  {
    id: "evt_6S1BT6eM0Oq7Wu2I",
    type: "customer.subscription.created",
    customer: "hooli.ai · cus_V55Dm3SsT",
    receivedAt: "09:07:21 UTC",
    status: "Verified",
    systemsChecked: 5,
    divergenceCount: 0,
  },
  {
    id: "evt_7T2CU7fN1Pr8Xv3J",
    type: "checkout.session.completed",
    customer: "soylent.corp · cus_W66En4TtU",
    receivedAt: "09:05:09 UTC",
    status: "Pending",
    systemsChecked: 2,
    divergenceCount: 0,
    amount: "$249.00",
  },
];
