import ReportPage, { type ReportConfig } from "./ReportPage";

const steveReport: ReportConfig = {
  client: { name: "Premier Partners", businessName: "Premier Partners" },
  clientLogo: {
    src: "/portfolio/premier-partners-logo.png",
    printSrc: "/portfolio/premier-partners-report-print.png",
    alt: "Premier Partners",
    maxHeightClass: "max-h-20 md:max-h-24",
  },
  currentMonth: {
    month: "May 2026",
    headline: "53 customer leads · organic now your #1 source · 40% share of the paver ad market",

    headlineMetrics: [
      {
        value: "53",
        label: "customer leads in May",
        wide: true,
        breakdown: [
          { count: 27, label: "Organic / SEO", cpl: "$0 / lead" },
          { count: 16, label: "Pavers — Search Ads", cpl: "$127 / lead" },
          { count: 7, label: "Power Washing — Google LSA", cpl: "$36 / lead" },
          { count: 2, label: "Power Washing — Search Ads (new)", cpl: "$288 / lead" },
          { count: 1, label: "CGP forwarded", cpl: "$0 / lead" },
        ],
      },
      { value: "1,275", label: "people who saw your business on Google", sublabel: "profile views across your 5 Business Profiles" },
      { value: "+33%", label: "more leads than April", sublabel: "up 49% on your core channels (excluding CGP)" },
    ],

    leadTransparency: {
      intro:
        "Clean month — every lead was a real customer, no spam or tests to filter out. The only adjustment was two duplicate inquiries.",
      math: {
        rows: [
          { operator: "+", value: 55, label: "leads logged across forms, search ads & LSA", tone: "muted" },
          { operator: "−", value: 2, label: "duplicate inquiries (same person submitted twice)", tone: "warning" },
        ],
        total: { value: 53, label: "unique customer leads in May" },
      },
      measurementNote:
        "These 53 are exactly what I can count — website forms, ad leads, and LSA calls. On top of those, your sites and Google profiles logged about 40 tap-to-calls in May. Those are real, but a phone call can't be tied back to a specific job, so I don't count it in the 53.",
    },

    gbpProfiles: [
      { name: "Power Washing", views: 399, calls: 11, directions: 60, websiteClicks: 30, newReviews: 0 },
      { name: "Paver Restoration", views: 283, calls: 5, directions: 43, websiteClicks: 30, newReviews: 0 },
      { name: "Auto Spa (Detailing)", views: 427, calls: 3, directions: 40, websiteClicks: 29, newReviews: 0 },
      { name: "Holiday Lighting", views: 111, calls: 0, directions: 46, websiteClicks: 6, newReviews: 0, note: "foundation-building — trending up YoY" },
      { name: "Snow Removal", views: 55, calls: 0, directions: 0, websiteClicks: 0, newReviews: 0, note: "deep off-season" },
    ],

    reviews: {
      total: 0,
      note:
        "No new reviews in May, and one false 1-star on Power Washing — already reported to Google for removal. Getting reviews is the single biggest lever on your map ranking, and it's the #1 thing I need from you this month (below).",
    },

    websiteTraffic: {
      paid: 255,
      organic: 452,
      totalSessions: 707,
      paidPercent: "36%",
      organicPercent: "64%",
      intro:
        "Across your 5 service sites, here's where May's visits came from. (Your main Premier hub site — the front door that routes people to the right service — added another 4,200 page views on top of these.)",
      closing:
        "64% of visits came from non-paid sources — nearly 2x your paid traffic, at $0 per click. Ads bring the in-season volume while organic keeps compounding underneath it.",
    },

    seoIntro:
      "All organic — earned, not paid for. Rankings are holding at the top across your money sites, and the foundation pages are already showing on the others. Note: several of these #1 spots sit just under the Google map pack, so the clicks go to whoever's in the map.",

    seoWins: [
      { query: "power washing", rank: "#1", site: "Power Washing site", detail: "#1 for the main \"power washing\" term across your service area — the biggest term in the category. This is the average across local searches; the exact spot shifts depending on which city someone's searching from." },
      { query: "power wash house near me", rank: "#1", site: "Power Washing site" },
      { query: "concrete driveway cleaning near me", rank: "#1", site: "Power Washing site" },
      { query: "home power washing", rank: "#1", site: "Power Washing site" },
      { query: "patio restoration near me", rank: "#1", site: "Paver site" },
      { query: "paver cleaning and sealing near me", rank: "#1", site: "Paver site" },
      { query: "paver restoration near me", rank: "#3", site: "Paver site", detail: "Your most valuable paver search term — sitting in the top 3." },
      { query: "paver installation near me", rank: "#3", site: "Paver site" },
      { query: "permanent christmas lights installation near me", rank: "#1", site: "Lighting site", detail: "Holiday lighting already ranking #1 — in the off-season." },
      { query: "[suburb] permanent roofline lighting", rank: "#7–9", site: "Lighting site", detail: "6 Chicago suburbs already on page 1 — months before fall demand." },
      { query: "interior car cleaning near me", rank: "#1", site: "Auto Spa site" },
    ],

    adsCampaigns: [
      {
        name: "Power Washing — Google LSA",
        spend: "$251",
        leads: 7,
        cpl: "$36 / lead",
        status: "active",
        detail:
          "Your most efficient channel — you only pay when a real customer connects. CPL dropped from $43 to $36.",
      },
      {
        name: "Paver Restoration — Search Ads",
        spend: "$2,030",
        leads: 16,
        cpl: "$127 / lead",
        status: "active",
        detail:
          "40% share of the paver auction (nearest competitor 25%). At ~2.5% of a $5,000+ job, strong ROI. CPL rose from $87 because spend doubled into peak season — expected, worth it.",
      },
      {
        name: "Power Washing — Search Ads (new)",
        spend: "$577",
        leads: 2,
        cpl: "$288 / lead",
        status: "active",
        detail:
          "Brand-new, so you're paying more per lead right now. As the auction catches up and the budget settles, the cost comes down — exactly how it worked for pavers. Already winning ~65% of its auction.",
      },
    ],

    deliverables: [
      {
        title: "Split Power Washing into dedicated service pages",
        status: "done",
        detail:
          "6 new pages — driveway, house washing, deck & patio, fence, gutter, commercial — so each service ranks on its own. Site's now 55 pages, all submitted to Google.",
      },
      {
        title: "Website editing dashboard — live",
        status: "done",
        detail: "Your Sanity dashboard is live across the sites — edit photos, services, and gallery from your phone anytime.",
      },
      {
        title: "Added Microsoft Clarity",
        status: "done",
        detail: "Heatmaps and session recordings show how visitors use your pages, so I can sharpen the path to a quote.",
      },
      {
        title: "Launched a Power Washing search campaign",
        status: "done",
        detail: "New campaign live and ramping — already winning ~65% of its auction.",
      },
      {
        title: "Managed all three ad campaigns",
        status: "done",
        detail: "25 paid leads across the month — each campaign's cost broken out above.",
      },
      {
        title: "Fixed bugs across the sites",
        status: "done",
        detail: "Cleaned up issues across the 6 sites and kept everything indexed.",
      },
    ],

    bonuses: [
      {
        title: "Email campaign to your customer list",
        highlight: "26% avg open",
        detail:
          "Ran a 6-part email campaign to your ~290 past customers — 26% average open (first send hit 55%, industry norm is ~20%). This wasn't in the scope; I did it as an extra.",
      },
    ],

    actionItems: {
      heading: "What I need from you this month",
      intro: "Two things — both bigger levers on your Google ranking than anything I can do from my end:",
      items: [
        {
          title: "Reviews",
          detail:
            "Ask every customer for a Google review right after the job. None came in this month, and it's the #1 driver of your map ranking — even a couple a month moves it.",
        },
        {
          title: "During-the-work photos",
          detail:
            "The paver pics you've been sending are great — keep them coming, plus a few mid-job action shots. Fresh photos rank, and in-progress shots build the most trust.",
        },
      ],
    },

    nextSteps: [
      {
        heading: "Where the focus stays",
        items: [
          {
            title: "Power Washing + Pavers",
            detail: "Your money makers — full attention through peak season.",
          },
          {
            title: "Lighting — building the foundation",
            detail:
              "Already ranking page 1 in 6 suburbs (above). Keep building so fall demand lands on pages that are ready, not a cold start.",
          },
          {
            title: "Detailing + Snow",
            detail: "Just holding their rankings so you don't lose traction.",
          },
        ],
      },
    ],

    outlook: {
      heading: "What's coming next",
      intro:
        "Leads are up 33% and organic is now your biggest source. The next couple months are about the new service and city pages climbing in search, and getting your review count moving.",
    },
  },
  priorMonths: [
    {
      month: "April 2026",
      headline: "40 customer leads · 18 new reviews · #1 cited by Google AI Overview in Volo",

      headlineMetrics: [
        {
          value: "40",
          label: "customer leads in April",
          wide: true,
          breakdown: [
            { count: 19, label: "Organic / SEO", cpl: "$0 / lead" },
            { count: 12, label: "Pavers — Google Search Ads", cpl: "$87 / lead" },
            { count: 4, label: "Power Washing — Google LSA", cpl: "$43 / lead" },
            { count: 5, label: "CGP forwarded", cpl: "$0 / lead" },
          ],
        },
        { value: "18", label: "new Google reviews", sublabel: "17 five-star · 1 fake one-star (disputed)" },
        { value: "9,129", label: "people who saw your business in search" },
      ],

      leadTransparency: {
        intro:
          "April was a demonstration month before formal partnership scope kicks in. March was setup-only. Premier was not billed at full partnership rates for either month.",
        math: {
          rows: [
            { operator: "+", value: 37, label: "form submissions in April", tone: "muted" },
            { operator: "−", value: 6, label: "not customers (4 tests, 1 vendor spam, 1 business-buyer pitch)", tone: "negative" },
            { operator: "−", value: 4, label: "duplicate submissions (3 customers submitted multiple times)", tone: "warning" },
            { operator: "+", value: 4, label: "Google Search Ads phone-call leads (Pavers)" },
            { operator: "+", value: 4, label: "Google LSA leads (1 missed — called back, no answer)" },
            { operator: "+", value: 5, label: "forwarded leads (CGP channel)", tone: "positive" },
          ],
          total: { value: 40, label: "unique customer leads in April" },
        },
      },

      revenueBreakdown: {
        intro:
          "Here's what those 40 leads turned into — paid jobs and signed estimates already booked for May.",
        buckets: [
          {
            label: "Organic SEO + CGP",
            value: "$8,303",
            percent: "96%",
            detail: "from 9 closed leads",
            type: "organic",
          },
          {
            label: "Paid Ads (Google Search + LSA)",
            value: "$375",
            percent: "4%",
            detail: "from 1 closed lead",
            type: "paid",
          },
        ],
        total: {
          value: "$8,678",
          label: "Total April lead revenue",
          detail: "10 of 40 leads closed (25% close rate)",
        },
        adSpend: {
          spent: "$1,159",
          pipeline: "~$16,960",
          note: "Pavers take 2–4 weeks to close. April pipeline lands in May.",
        },
      },

      gbpProfiles: [
        { name: "Power Washing", views: 382, calls: 11, directions: 36, websiteClicks: 36, newReviews: 9 },
        { name: "Paver Restoration", views: 260, calls: 6, directions: 55, websiteClicks: 13, newReviews: 8 },
        { name: "Auto Spa (Detailing)", views: 275, calls: 2, directions: 32, websiteClicks: 29, newReviews: 1 },
        { name: "Holiday Lighting", views: 129, calls: 0, directions: 25, websiteClicks: 5, newReviews: 0, note: "off-season" },
        { name: "Snow Removal", views: 96, calls: 0, directions: 0, websiteClicks: 1, newReviews: 0, note: "deep off-season" },
      ],

      reviews: {
        total: 18,
        fiveStar: 17,
        breakdown: [
          "Power Washing: 9 reviews (8 five-star + 1 fake one-star — appeal filed with Google)",
          "Paver Restoration: 8 five-star reviews",
          "Auto Spa: 1 five-star review",
        ],
        note: "Real-customer rating across April: 5.0 stars. The single one-star is fake and a removal request is in with Google.",
      },

      websiteTraffic: {
        paid: 233,
        organic: 737,
        totalSessions: 970,
        paidPercent: "24%",
        organicPercent: "76%",
        intro:
          "Across all 6 Premier sites combined, here's where this month's website visits came from:",
        closing:
          "76% of April visits came from non-paid sources — 3x more than from paid ads, at $0 per click. SEO is compounding.",
      },

      seoIntro:
        "All rankings below are organic — earned, not paid for. Reaching page 1 on competitive terms within 30 days is unusually fast for SEO.",

      seoWins: [
        { query: "power washing", rank: "#1", site: "Power Washing site", detail: "Top of Google for the generic, highest-volume term in the category." },
        { query: "paver repair", rank: "#1", site: "Paver site" },
        { query: "brick paver installation", rank: "#1", site: "Paver site" },
        { query: "paver driveway contractor", rank: "#1", site: "Paver site" },
        { query: "soft washing service", rank: "#1", site: "Power Washing site" },
        { query: "roof cleaning services near me", rank: "#1", site: "Power Washing site" },
        { query: "car detailing near me", rank: "#4", site: "Auto Spa site", detail: "11 clicks, 20% click-through rate" },
        { query: "paver restoration near me", rank: "#3", site: "Paver site", detail: "high-intent local term" },
      ],

      aiOverview: [
        {
          query: "power washing volo",
          detail:
            "Listed first in Google's AI Overview when anyone searches for this. Name, address, phone, and services all pulled in by Google's AI.",
        },
      ],

      adsCampaigns: [
        {
          name: "Google Search Ads — Paver Restoration",
          spend: "$1,030",
          leads: 12,
          cpl: "$87 / lead",
          status: "active",
          detail: "8 form leads + 4 phone calls = 12 paver leads. CPL is under 2% of a $5,000+ paver job — your strongest ROI channel.",
        },
        {
          name: "Google LSA — Power Washing",
          spend: "$129",
          leads: 4,
          cpl: "$43 / lead",
          status: "active",
          detail:
            "4 leads delivered. Google billed for 3 connected calls at $43 each. 1 missed — called back with no answer (not charged). Pay-per-lead means you're only billed when a real customer connects.",
          note: "House wash leads at ~14% of ticket size. Healthy margin.",
        },
        {
          name: "Google Search Ads — Power Washing",
          spend: "$153",
          leads: 0,
          cpl: "—",
          status: "paused",
          detail:
            "$153 spent across 2 campaigns (North Shore + Northwest Corner). 0 leads. Paused mid-April once Google LSA proved it could deliver power washing leads at half the cost. No further spend going forward.",
          note: "Test, measure, redirect.",
        },
      ],

      deliverables: [
        {
          title: "Tracking across all 6 Premier sites",
          status: "done",
          detail:
            "Every visitor across all 6 sites (5 service brands + the hub) is now tracked — organic, paid, direct. You can see where each lead came from instead of guessing.",
        },
        {
          title: "Search Console — see what people type to find you",
          status: "done",
          detail:
            "All 6 sites verified. April delivered 75 clicks and 9,129 people who saw a Premier site in search results across the network.",
        },
        {
          title: "All 5 Google Business Profiles optimized",
          status: "partial",
          detail:
            "Categories and service areas corrected on all 5 profiles. Photo refresh and posting cadence finalizing for May rollout (research shows photo + review velocity move map rankings more than posts).",
        },
        {
          title: "Website editing dashboard",
          status: "done",
          detail:
            "Built and ready — edit photos, gallery, and content from your phone. Access handoff pending the new agreement signing.",
        },
        {
          title: "New service pages behind the scenes",
          status: "done",
          detail:
            "47 city URLs deployed on the Power Washing site. 5 already ranking on page 1 (Lincolnshire, Fox Lake, Gages Lake, Vernon Hills, Mettawa). Google is also indexing additional pages across the network we didn't manually submit — a sign the sites are technically clean. Remaining 42 climbing — typical 3–6 month ramp.",
        },
        {
          title: "Promotional content rotation",
          status: "done",
          detail:
            "10% off power washing callout currently live on the Power Washing site. Will rotate offers across sites as new specials come up each season.",
        },
        {
          title: "Monthly reporting",
          status: "in-progress",
          detail: "This report is the first one — same format every month going forward.",
        },
        {
          title: "Bing Places",
          status: "done",
          detail: "Set up and live. Catches the older homeowner audience your competitors miss.",
        },
      ],

      bonuses: [
        {
          title: "Paver Restoration website",
          highlight: "12 leads",
          detail:
            "Built and deployed at no charge — paver wasn't in the original proposal. Drove 12 of April's 40 leads on its own.",
        },
        {
          title: "Wix subscription cleanup",
          highlight: "$5,241+",
          detail:
            "Audited and removed unused Wix subscriptions. $385.60/month in recurring fees eliminated, plus $614 in yearly subscriptions removed. Total savings in year one — plus additional GoDaddy cleanup on top.",
        },
        {
          title: "Nextdoor consolidation",
          detail:
            "3 separate Nextdoor pages merged into 1 main page. When neighbors recommend Premier, they all land in the same place. (Holiday Lighting page merge finishing in May — held up by an attached ad account.)",
        },
        {
          title: "The Playbook — yours to keep",
          detail:
            "28-page custom playbook built specifically for Premier. 9 practical systems covering missed calls, past-customer wakeup, photo workflow, getting reviews, and more. Permanent reference, yours to use whenever needed.",
        },
        {
          title: "Email signature setup",
          detail: "Done for you and Danielle. Branded, links work, looks professional on every email.",
        },
        {
          title: "Estimate & invoice footers",
          detail: "Footer copy added to estimates and invoices — every customer touchpoint now reinforces the brand.",
        },
      ],

      nextSteps: [
        {
          heading: "May Operations",
          items: [
            { detail: "Photo refresh + posting cadence rolling out across all 5 GBPs" },
            { detail: "Holiday Lighting Nextdoor merge — should finish early May" },
            { detail: "May 1 sit-down — walk through this report together and talk through what comes next" },
          ],
        },
        {
          heading: "SEO Expansion (May–July rollout)",
          intro:
            "The Power Washing site's 47 city pages are proving the strategy works — 5 already ranking, and Google is indexing additional pages on its own. New pages rolling out across the other sites should ramp the same way.",
          items: [
            {
              title: "Paver Restoration site",
              detail:
                "Currently ranks #1 for 12+ paver keywords on the homepage alone. Adding city-specific landing pages and service-detail pages (full restoration, re-leveling, sealing, repair) lets it rank for hundreds of long-tail variations. In-season priority. Part of ongoing partnership scope — no separate cost.",
            },
            {
              title: "Auto Spa site",
              detail:
                "Already ranks #4 for \"car detailing near me\" with a 20% click-through rate. Adding city pages and service pages (ceramic coating, paint correction, full detail) expands the same pattern.",
            },
            {
              title: "Snow Plowing + Holiday Lighting sites",
              detail:
                "Off-season is the right time to plant programmatic SEO. Pages take 3–6 months to fully rank, so deploying in May–June means they'll be ranking by the time fall demand returns. Goal: enter peak season with these sites already indexed and visible across 20+ suburb-specific queries each.",
            },
            {
              title: "Power Washing site",
              detail:
                "Let the existing 47 city URLs finish indexing before adding more (Google indexes selectively, and more pages right now would dilute priority). Add service-detail pages instead (house washing, deck/patio, driveway, gutter cleaning, roof cleaning, soft washing) to capture service-specific intent.",
            },
            {
              title: "Ongoing SEO maintenance",
              detail:
                "Alongside new page rollouts, older pages will be monitored and refreshed regularly. SEO that's set-and-forgotten goes stale — Google's ranking criteria shift, competitors update, content drifts. Active monitoring keeps the existing rankings holding while new pages are deployed.",
            },
          ],
        },
        {
          heading: "LSA Optimization",
          items: [
            { detail: "Campaign is still in its learning window" },
            { detail: "One missed call early April hurt the response-rate score" },
            { detail: "The next 3 calls were answered, so the score should recalibrate" },
            { detail: "Lead volume will likely grow naturally over 30–60 days" },
            { detail: "$450/week budget has plenty of headroom — no change needed" },
          ],
        },
      ],

      outlook: {
        intro:
          "Right now, ads do the heavy lifting while SEO ramps. As city pages and service pages roll out across May–July and start ranking, organic search will take over as the primary lead source.",
        goalsIntro: "By end of Q3 / Q4, the goal is:",
        goals: [
          {
            highlight: "LSA + search ads",
            detail:
              "kept at low maintenance budgets for brand visibility and tactical pushes (promotions, peak-season demand spikes, geographic gaps)",
          },
          {
            highlight: "Organic SEO",
            detail: "covering the bulk of demand across all 5 services + 20+ Chicago suburbs each",
          },
          {
            highlight: "Lower total ad spend, more leads",
            detail:
              "paying once for SEO pages that compound rather than paying every month for clicks that reset to zero",
          },
        ],
        closing:
          "The goal isn't to kill ads — it's to shift them from primary lead engine to tactical layer on top of dominant organic presence. Same lead volume (or more), at a fraction of the cost.",
      },
    },
  ],
};

export default function SteveReportPage() {
  return <ReportPage config={steveReport} />;
}
