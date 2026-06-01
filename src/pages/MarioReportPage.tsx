import ReportPage, { type ReportConfig, type MonthReport } from "./ReportPage";

const aprilReport: MonthReport = {
  month: "April 2026",
  headline:
    "14 customer leads · $0 ad spend · 40 reviews preserved through migration + 4 new in April",

  headlineMetrics: [
    {
      value: "14",
      label: "customer leads in April",
      wide: true,
      breakdown: [
        { count: 10, label: "C&G channel", cpl: "$0 / lead" },
        { count: 2, label: "Organic / Google Search", cpl: "$0 / lead" },
        { count: 2, label: "Direct / Referral", cpl: "$0 / lead" },
      ],
    },
    { value: "44", label: "Google reviews", sublabel: "40 baseline preserved + 4 new in April" },
    { value: "278", label: "people who saw your business on Google" },
  ],

  leadTransparency: {
    intro:
      "April was a demonstration month — no billing. March 16–31 was the kickoff at $150 (foot-in-the-door, not full pricing). The ongoing partnership tier hasn't been set yet. Here's what came in across the demo period.",
    math: {
      rows: [
        { operator: "+", value: 5, label: "form submissions on marioscape.com", tone: "muted" },
        { operator: "−", value: 1, label: "internal test (excluded)", tone: "negative" },
        { operator: "+", value: 10, label: "forwarded leads from the Clean & Green channel", tone: "positive" },
      ],
      total: { value: 14, label: "real customer leads in April" },
    },
  },

  gbpProfiles: [
    {
      name: "MarioScape",
      views: 278,
      calls: 3,
      directions: "no data yet",
      websiteClicks: 5,
      newReviews: 4,
      note: "newly renamed from Clean & Green — first month under the new brand",
    },
  ],

  reviews: {
    total: 4,
    fiveStar: 1,
    breakdown: [
      "1 real five-star review from Daniel Villa: \"Great company. Great work 👍🏼\"",
      "3 fake one-star reviews flagged and reported to Google (all 3 hit the same day with generic negative-template language — appears to be a coordinated attempt)",
    ],
    note: "The 40 baseline reviews preserved through the Clean & Green → MarioScape migration are stable — those are reviews you'd already earned over years, just now under your own brand. April added 1 real five-star and 3 fakes on top. Real customer rating across April: 5.0 stars. Once Google removes the 3 fakes (typical 5–14 day resolution), displayed rating returns to 5.0 across 41 real reviews.",
  },

  websiteTraffic: {
    paid: 0,
    organic: 123,
    totalSessions: 123,
    paidPercent: "0%",
    organicPercent: "100%",
    intro:
      "marioscape.com is brand-new and has no ads running. Every visit this month was earned organically.",
    closing:
      "70% of these visits came directly (people typing the URL after meeting you or being referred). 24% came from Google search. Even though Search Console wasn't verified until April 30, Google was already sending organic search traffic to the site — that data backfills in the May report.",
  },

  deliverables: [
    {
      title: "Google Business Profile migration",
      status: "done",
      detail:
        "The Clean & Green profile was renamed to MarioScape — all 40 of the five-star reviews you'd already earned carried over with it. The migration goal was 40+ reviews on launch — hit on day one, plus 4 new in April on top. Ownership transfer to your account happens at the May 1 sit-down.",
    },
    {
      title: "Tracking installed",
      status: "done",
      detail:
        "Google Analytics live on the site as of April 6. You can see how many visits the site is getting, where visitors are coming from (Google search, direct, social), and what they're doing on the site.",
    },
    {
      title: "Lead routing live — leads come straight to you",
      status: "done",
      detail:
        "Every form submission on marioscape.com routes to your inbox. You own the lead data directly. It's the technical version of the proposal's \"what you own\" promise.",
    },
    {
      title: "Bing Places",
      status: "in-progress",
      detail:
        "Submitted and awaiting Bing's publish step. Reaches the older homeowner audience your competitors miss — over a billion searches a month.",
    },
    {
      title: "Business email (info@marioscape.com)",
      status: "in-progress",
      detail:
        "Ready to launch. Pending your decision: keep marioscapellc@gmail.com running, or stand up info@marioscape.com on Google Workspace ($8/mo, your account). Either choice is fine — just need a yes or no.",
    },
    {
      title: "Website editing dashboard",
      status: "in-progress",
      detail:
        "Build started — change your photos, services, and gallery from your phone whenever you want. Launching alongside the ongoing partnership once the tier is set.",
    },
    {
      title: "Monthly reporting",
      status: "in-progress",
      detail: "This report is the first one. Same format every month going forward — same numbers, same sections, so you can track trend lines as the months stack.",
    },
  ],

  bonuses: [
    {
      title: "C&G channel sending leads your way",
      highlight: "10 leads in April",
      detail:
        "Every inbound lead that comes through the legacy Clean & Green channel — phone calls, texts, emails — gets forwarded straight to you. No referral fee. No markup. 10 of April's 14 leads came through this channel.",
    },
    {
      title: "You own the entire pipeline",
      detail:
        "Website code, domain, GBP, lead inbox, analytics — all in your accounts. If you ever decide to leave, every piece goes with you. No contracts. No lock-in. The proposal's \"what you own\" promise made real.",
    },
  ],

  nextSteps: [
    {
      heading: "May Operations",
      items: [
        { detail: "May 1 sit-down — walk through this report together and set the ongoing partnership scope" },
        { detail: "info@marioscape.com — keep Gmail or launch the professional email (your call)" },
        { detail: "Bing Places verification publish (already submitted)" },
        { detail: "Fake review escalation with Google — typical 5–14 day resolution. Once removed, displayed rating returns to 5.0." },
        { detail: "Search Console — first full month of organic search query data lands in the May report" },
      ],
    },
    {
      heading: "SEO Expansion (May–July rollout)",
      intro:
        "marioscape.com is live with a strong SEO foundation — schema markup, service-area coverage for 13 North Shore cities, sitemap, social-sharing tags, all in place. Next phase: build out service pages and city pages so Google can rank you for specific service+city searches.",
      items: [
        {
          title: "Service pages",
          detail:
            "One page per service — lawn care, landscaping, snow removal, gutter cleaning, mulch, spring/fall cleanups. Each page targets the service-specific search intent so \"gutter cleaning Wilmette\" finds your gutter page, not your homepage.",
        },
        {
          title: "City pages",
          detail:
            "One page per priority North Shore city — Wilmette, Winnetka, Highland Park, Deerfield, Glencoe, and the rest of the corridor. Captures \"landscaper [city]\" search intent. Pages take 3–6 months to fully rank, so the earlier they go live the better.",
        },
        {
          title: "Review push to 50+",
          detail:
            "Outreach to past snow-removal clients already started in April — fresh reviews already coming in. Continue pushing through May. Goal: cross 50 before next snow season. Review velocity is one of the strongest signals Google uses to rank a profile in map results.",
        },
        {
          title: "GBP photo refresh + posting cadence",
          detail:
            "Photo velocity and review velocity move map rankings more than posts do. Photo refresh and posting rhythm rolling out in May — fresh before/after shots, completed jobs, seasonal work.",
        },
      ],
    },
  ],

  outlook: {
    intro:
      "Right now, MarioScape is in foundation mode. The site is live with full SEO setup. The GBP migration preserved your 40 reviews under the new name. The C&G channel is delivering steady volume. The next three months are about turning that foundation into a real local-search presence across the North Shore.",
    goalsIntro: "By end of Q3, the goal is:",
    goals: [
      {
        highlight: "Service + city pages live and ranking",
        detail:
          "page 1 on Google for \"landscaper [city]\" and \"[service] [city]\" across the North Shore — one page doing the work of dozens of search queries",
      },
      {
        highlight: "50+ Google reviews",
        detail:
          "snowballing your map ranking — Google rewards profiles with steady review velocity, and you're already sitting at 41 real reviews (40 from years of work, plus 1 new in April)",
      },
      {
        highlight: "Organic search becomes a primary lead source",
        detail:
          "alongside the C&G channel — together delivering steady weekly volume without paying for a single click",
      },
    ],
    closing:
      "No ad spend needed yet. The plan: drive demand through search dominance first, then layer in paid promotion only if there's a specific seasonal push or geographic gap worth covering.",
  },
};

const marioReport: ReportConfig = {
  client: { name: "MarioScape", businessName: "MarioScape" },
  clientLogo: {
    src: "/portfolio/marioscape-logo.png",
    alt: "MarioScape",
    maxHeightClass: "max-h-48 md:max-h-64",
  },
  currentMonth: {
    month: "May 2026",
    headline:
      "5 customer leads · your site grew from 1 page to 14 · Bing Places now live",

    headlineMetrics: [
      {
        value: "5",
        label: "customer leads in May",
        wide: true,
        breakdown: [
          { count: 3, label: "from your own site (organic search)", cpl: "$0 / lead" },
          { count: 2, label: "forwarded from CGP", cpl: "$0 / lead" },
        ],
      },
      { value: "14", label: "pages now live on your site", sublabel: "up from 1 in April" },
      { value: "171", label: "people who saw your business on Google" },
    ],

    leadTransparency: {
      math: {
        rows: [
          { operator: "+", value: 3, label: "leads from your own site (all from Google search)", tone: "positive" },
          { operator: "+", value: 2, label: "leads forwarded from the CGP channel", tone: "positive" },
        ],
        total: { value: 5, label: "customer leads in May" },
      },
      measurementNote:
        "these 5 are the leads I can confirm — website forms and forwarded leads. A call to your phone, even one from your Google listing, can't be tied back to a lead, so it's not counted here.",
    },

    gbpProfiles: [
      {
        name: "MarioScape",
        views: 171,
        interactions: 2,
        newReviews: 0,
        note: "This is your Google listing — separate from your website below. \"Interactions\" is anyone who tapped to call, get directions, or visit your site straight from Google. A call to your phone from your listing counts here, not on your website. (171 views in May, 278 in April.)",
      },
    ],

    reviews: {
      total: 0,
      note: "No new Google reviews in May. Your rating holds at a clean 5.0 across 41 reviews.",
    },

    websiteTraffic: {
      paid: 0,
      organic: 126,
      totalSessions: 126,
      paidPercent: "0%",
      organicPercent: "100%",
      intro:
        "126 visits in May — right in line with April's 123, still no ad spend.",
      closing:
        "70% came direct, 25% from Google search, 6% from social. The new service and city pages should start showing up in search results over the next 60 days as Google indexes them.",
    },

    deliverables: [
      {
        title: "Your site went from 1 page to 14 pages",
        status: "done",
        detail:
          "9 SEO service pages — one for each service you offer — so people searching a specific service land on the right page.",
      },
      {
        title: "4 city pages created for SEO and submitted to Google",
        status: "done",
        detail:
          "One page per priority North Shore city, submitted to Google for indexing.",
      },
      {
        title: "Website editing dashboard — live",
        status: "done",
        detail:
          "Change your photos, services, and gallery from your phone anytime.",
      },
      {
        title: "Bing Places — approved",
        status: "done",
        detail:
          "Live as of May 6 — reaches the older homeowners Google misses.",
      },
      {
        title: "Microsoft Clarity installed",
        status: "done",
        detail:
          "Shows how visitors use your site so I can sharpen the pages.",
      },
      {
        title: "Got April's 3 fake reviews removed",
        status: "done",
        detail:
          "Flagged and escalated them with Google last month — got all 3 taken down. Your rating's back to a clean 5.0.",
      },
    ],

    bonuses: [
      {
        title: "CGP channel still sending leads your way",
        highlight: "2 leads in May",
        detail:
          "Leads through the legacy CGP channel still get forwarded straight to you — no fee, no markup.",
      },
      {
        title: "Markate transfer handled",
        detail:
          "Moved your Markate account over — your customer and job data is now fully yours.",
      },
      {
        title: "Digital Guide delivered",
        detail:
          "Your self-serve guide for posting to Facebook, Instagram, and Nextdoor.",
      },
    ],

    actionItems: {
      heading: "What I need from you this month",
      intro: "Two things:",
      items: [
        {
          title: "More Google reviews",
          detail:
            "When a customer's happy on the job, ask them to leave a quick Google review. It's the single biggest lever for your map ranking — even one or two a month adds up.",
        },
        {
          title: "Keep sending photos",
          detail:
            "Before/after shots and completed jobs from your phone. They feed your gallery and your Google profile, and fresh photos move rankings.",
        },
      ],
    },

    outlook: {
      heading: "What's coming next",
      intro:
        "May built the foundation — 14 pages and 4 city pages, all submitted to Google. The next couple months are about those pages climbing in search and your review count growing ahead of snow season.",
    },
  },
  priorMonths: [aprilReport],
};

export default function MarioReportPage() {
  return <ReportPage config={marioReport} />;
}
