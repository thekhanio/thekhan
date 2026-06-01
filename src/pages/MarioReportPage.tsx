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
      intro:
        "May was the first month your own website carried its weight — all 3 of your direct leads came straight from Google search, no forwarding needed. Two more came in through the CGP channel on top. No junk, no duplicates this month. Here's the full count.",
      math: {
        rows: [
          { operator: "+", value: 3, label: "leads from your own site (all from Google search)", tone: "positive" },
          { operator: "+", value: 2, label: "leads forwarded from the CGP channel", tone: "positive" },
        ],
        total: { value: 5, label: "customer leads in May" },
      },
    },

    gbpProfiles: [
      {
        name: "MarioScape",
        views: 171,
        calls: 0,
        directions: "no data yet",
        websiteClicks: 0,
        newReviews: 0,
        note: "Google now reports a single combined \"interactions\" total instead of splitting calls, clicks, and directions — May logged 2 total interactions. Profile views (171) is the number that stays comparable month to month (it was 278 in April). Months bounce around this early; the new service and city pages just went live, and they're what compound your visibility from here.",
      },
    ],

    reviews: {
      total: 0,
      fiveStar: 0,
      breakdown: [
        "No new reviews came in during May — none positive, none negative.",
        "April's 3 fake one-stars are still flagged with Google pending removal.",
      ],
      note: "Your 40 migrated reviews plus April's real five-star hold steady — 41 real reviews at 5.0 stars. May was quiet on reviews because outreach paused while the site rebuild took priority. The review push to past clients restarts in June, aiming to cross 50 before next snow season — review velocity is the single strongest signal Google uses to rank you in the map.",
    },

    websiteTraffic: {
      paid: 0,
      organic: 126,
      totalSessions: 126,
      paidPercent: "0%",
      organicPercent: "100%",
      intro:
        "126 visits in May, every one of them earned — still zero ad spend.",
      closing:
        "70% came direct (people typing the URL after meeting you or a referral), 25% from Google search, 6% from social. Nearly identical to April's 123 visits — steady and all organic. The new service and city pages went live late May, so the search share should start climbing as Google indexes them over the summer.",
    },

    deliverables: [
      {
        title: "Your site went from 1 page to 14",
        status: "done",
        detail:
          "The biggest piece of the month. Every service now has its own dedicated page — Landscape Design, Lawn Care, Seasonal Cleanups, Landscaping & Installation, Drainage & Ground Work, Tree & Shrub Care, Hauling & Delivery, Outdoor Lighting, and Snow Removal. Each one targets the exact search a homeowner types, so \"snow removal Wilmette\" lands on your snow page instead of a generic homepage.",
      },
      {
        title: "4 city pages submitted to Google",
        status: "done",
        detail:
          "Dedicated pages for your priority North Shore cities, submitted to Google for indexing. These take 3–6 months to climb the rankings — getting them live now means they're working for you by peak season.",
      },
      {
        title: "Website editing dashboard — live",
        status: "done",
        detail:
          "Finished and in your hands. You can change your photos, services, and gallery right from your phone whenever you want, no need to go through me.",
      },
      {
        title: "Bing Places — approved",
        status: "done",
        detail:
          "Approved and live as of May 6. Reaches the older homeowner audience Google misses — over a billion searches a month, and most competitors ignore it.",
      },
      {
        title: "Microsoft Clarity installed",
        status: "done",
        detail:
          "Shows exactly how visitors move through your site — what they click, how far they scroll. Helps me fine-tune the pages that turn visitors into calls.",
      },
      {
        title: "Business email — decided",
        status: "done",
        detail:
          "You opted to keep marioscapellc@gmail.com rather than stand up a branded info@marioscape.com. Closed out — no action needed.",
      },
    ],

    bonuses: [
      {
        title: "CGP channel still sending leads your way",
        highlight: "2 leads in May",
        detail:
          "Every inbound lead through the legacy CGP channel still gets forwarded straight to you — no referral fee, no markup. 2 came through in May, on top of the 3 your own site earned.",
      },
      {
        title: "Markate transfer handled",
        detail:
          "Moved your Markate account over — a real lift that took some back-and-forth to get right. Your customer and job data is now where it should be, fully yours.",
      },
      {
        title: "Digital Guide delivered",
        detail:
          "Your self-serve guide for posting to Facebook, Instagram, and Nextdoor — sent over so you can keep your social presence active on your own schedule, no extra cost.",
      },
    ],

    nextSteps: [
      {
        heading: "What I need from you this month",
        intro:
          "Two things — and they're the two only you can do. Everything else below, I handle.",
        items: [
          {
            title: "More Google reviews",
            detail:
              "When a customer's happy on the job, ask them to leave a quick Google review. This is the single biggest lever for your map ranking — every review pushes you up ahead of snow season. Even one or two a month adds up fast.",
          },
          {
            title: "Keep sending photos",
            detail:
              "Before/after shots and completed jobs, straight from your phone. They feed your gallery and your Google profile — fresh photos move rankings, and they're what makes a homeowner pick you over the next guy.",
          },
        ],
      },
      {
        heading: "What I'm handling next",
        items: [
          { detail: "Review push restarts — outreach to past clients to start climbing toward 50 before snow season" },
          { detail: "GBP photo refresh + posting rhythm — fresh before/after shots and completed jobs (photo and review velocity move map rankings more than anything else)" },
          { detail: "Watch the new service + city pages index — first ranking movement should show in the June/July reports" },
          { detail: "Google search-query data should finally populate now that the profile's been active a full month" },
        ],
      },
      {
        heading: "SEO Expansion (summer rollout)",
        intro:
          "The foundation is now built — 14 pages live, 4 city pages submitted. Next phase is depth: more cities, internal linking, and watching the rankings climb.",
        items: [
          {
            title: "More city pages",
            detail:
              "Expand beyond the first 4 to cover the rest of the North Shore corridor — Winnetka, Highland Park, Glencoe, and out. One page per city, each capturing \"landscaper [city]\" searches.",
          },
          {
            title: "Service + city ranking watch",
            detail:
              "As Google indexes the new pages, track which service+city combos start ranking and double down on the ones gaining traction.",
          },
          {
            title: "Review velocity to 50+",
            detail:
              "Keep the review engine running — it's the single strongest signal Google uses to rank you in the map results, and it matters most heading into snow season.",
          },
        ],
      },
    ],

    outlook: {
      intro:
        "May was the build month. Your site went from a single page to a real 14-page presence with service pages and city pages submitted to Google — the foundation that turns \"a website\" into \"a site that ranks.\" Bing's live, the editing dashboard is in your hands, and your own site is already producing organic leads without leaning on forwarding. The next three months are about ranking that foundation and stacking reviews.",
      goalsIntro: "By end of summer, the goal is:",
      goals: [
        {
          highlight: "Service + city pages ranking on page 1",
          detail:
            "for \"landscaper [city]\" and \"[service] [city]\" across the North Shore — one page doing the work of dozens of searches",
        },
        {
          highlight: "50+ Google reviews",
          detail:
            "snowballing your map ranking ahead of snow season — you're sitting at 41 real reviews now",
        },
        {
          highlight: "Organic search as your primary lead source",
          detail:
            "May proved it works — all 3 of your own leads came from search. The goal is steady weekly volume from search alone, with CGP forwarding as a bonus on top",
        },
      ],
      closing:
        "Still zero ad spend. The plan holds: win on search first, layer in paid only if there's a specific seasonal push worth it.",
    },
  },
  priorMonths: [aprilReport],
};

export default function MarioReportPage() {
  return <ReportPage config={marioReport} />;
}
