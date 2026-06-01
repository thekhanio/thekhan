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
        "Every May lead checked out as a real customer — no test submissions or spam to filter out this month, unlike April. The only adjustment was collapsing two duplicate inquiries where the same person reached out twice.",
      math: {
        rows: [
          { operator: "+", value: 55, label: "leads logged across forms, search ads & LSA", tone: "muted" },
          { operator: "−", value: 2, label: "duplicate inquiries (same person submitted twice)", tone: "warning" },
        ],
        total: { value: 53, label: "unique customer leads in May" },
      },
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
        "No new reviews came in this May, and one false 1-star landed on the Power Washing profile — I've already filed the removal request with Google. Reviews are the one area that needs your team, not mine: I can drive the leads, but the 5-star reviews come from your crew asking each customer right after the job. With 53 leads worth of completed work this month, that's the single biggest missed opportunity — and reviews move your Google map ranking more than almost anything else. It's the #1 priority in the next-steps section below.",
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
      "All organic — earned, not paid for. Rankings are holding strong at the top across your money sites, and the foundation work is already showing on the others. One thing hiding in these numbers: several of your #1 organic spots sit just below the Google map pack, so the clicks go to whoever's in the map. That's won with reviews — which is exactly why reviews are the June priority below.",

    seoWins: [
      { query: "power washing", rank: "#1", site: "Power Washing site", detail: "Still #1 for the biggest, highest-volume term in the whole category — 452 impressions in May." },
      { query: "power wash house near me", rank: "#1", site: "Power Washing site" },
      { query: "concrete driveway cleaning near me", rank: "#1", site: "Power Washing site" },
      { query: "home power washing", rank: "#1", site: "Power Washing site" },
      { query: "patio restoration near me", rank: "#1", site: "Paver site" },
      { query: "paver cleaning and sealing near me", rank: "#1", site: "Paver site" },
      { query: "paver restoration near me", rank: "#3", site: "Paver site", detail: "Your most valuable paver search term — sitting in the top 3." },
      { query: "paver installation near me", rank: "#3", site: "Paver site" },
      { query: "permanent christmas lights installation near me", rank: "#1", site: "Lighting site", detail: "Holiday lighting already ranking #1 — in the off-season." },
      { query: "[suburb] permanent roofline lighting", rank: "#7–9", site: "Lighting site", detail: "6 Chicago suburbs (Lake Bluff, Crystal Lake, Schaumburg, Hawthorne Woods, Hoffman Estates + more) already on page 1 for permanent lighting — months before fall demand. The foundation you asked for is already taking root." },
      { query: "interior car cleaning near me", rank: "#1", site: "Auto Spa site", detail: "The service you're not even focused on, ranking #1 on its own." },
    ],

    adsCampaigns: [
      {
        name: "Power Washing — Google LSA",
        spend: "$251",
        leads: 7,
        cpl: "$36 / lead",
        status: "active",
        detail:
          "Your most efficient paid channel. 7 leads (5 phone + 2 message), and you only pay when a real customer connects. CPL dropped from $43 in April to $36 — more leads, lower cost.",
        note: "Plenty of budget headroom. No change needed.",
      },
      {
        name: "Paver Restoration — Search Ads",
        spend: "$2,030",
        leads: 16,
        cpl: "$127 / lead",
        status: "active",
        detail:
          "16 paver leads and a 40% share of the paver ad auction — your nearest competitor sits at 25%, with Angi, Unilock, and Amazon all under 10%. At ~2.5% of a $5,000+ paver job, this is strong ROI. CPL rose from $87 because spend doubled into peak season when clicks cost more — expected, and worth it for the volume.",
      },
      {
        name: "Power Washing — Search Ads (new)",
        spend: "$577",
        leads: 2,
        cpl: "$288 / lead",
        status: "active",
        detail:
          "Brand-new campaign, launched end of April. It's still in Google's learning window, so the cost per lead is high right now — that's completely normal for a fresh campaign and it settles as the data builds. Already winning ~65% of its auction. I'm watching it closely.",
        note: "Don't read into the $288 — it's a starting number, not a steady-state one.",
      },
    ],

    deliverables: [
      {
        title: "Launched a Power Washing search campaign",
        status: "done",
        detail:
          "New 'NW Corridor' Google Search campaign for power washing went live and ramped through May — 852 impressions, 40 clicks, and roughly a 65% share of its auction (every competitor under 10%). Still in its learning window, so cost per lead will come down as it optimizes.",
      },
      {
        title: "Managed all three ad campaigns daily",
        status: "done",
        detail:
          "Paver Search, Power Washing Search, and Power Washing LSA — monitored spend, keywords, and lead flow across the month. 25 paid leads delivered at a blended $114, but broken out so you can see each one: LSA $36, Paver $127, new PW Search $288 (learning).",
      },
      {
        title: "Kept all 5 profiles + 6 sites live and tracked",
        status: "done",
        detail:
          "Every Business Profile and website stayed live, tracked, and indexed across the network — 1,275 profile views and 53 leads flowed through in May. Detailing and Snow held their rankings in the background with no extra spend.",
      },
      {
        title: "Monthly reporting",
        status: "done",
        detail: "This report — same format every month.",
      },
    ],

    nextSteps: [
      {
        heading: "What I need from you in June",
        intro:
          "Everything on the marketing side is running. Two things only your team can supply — and they're the two biggest levers on your Google map rankings:",
        items: [
          {
            title: "Reviews — the #1 priority",
            detail:
              "No new reviews came in this month, and reviews move your map ranking more than anything I can do from my end. The fix is simple: ask every customer for a Google review right after the job's done. With 53 leads worth of completed work in May, even a fraction saying yes changes where you rank. The ask system is already built into your Playbook.",
          },
          {
            title: "During-the-work photos",
            detail:
              "The paver restoration pics you've been sending are great — keep those coming. What'd help even more: a few during-the-work action shots (crew mid-job, before/during/after). Google rewards fresh photos, and in-progress shots build the most trust with the person deciding who to call.",
          },
        ],
      },
      {
        heading: "Where the focus stays",
        items: [
          {
            title: "Power Washing + Pavers",
            detail:
              "Your money makers stay front and center — full ad and SEO attention through peak season. That's where the leads and the dollars are.",
          },
          {
            title: "Lighting — building the foundation",
            detail:
              "It's already working: 6 Chicago suburbs are ranking page 1 for permanent roofline lighting, and \"permanent christmas lights installation near me\" is already #1 — all in the dead off-season. The profile's also the only one trending up year over year (views +12%, directions +77%). The plan is simple — keep building so fall demand lands on pages that are already ranking, instead of scrambling to start in October.",
          },
          {
            title: "Detailing + Snow — running in the background",
            detail:
              "Detailing pulled 6 free organic leads and your single biggest profile-view jump (427) with zero ad spend. Snow sits idle off-season. Both holding their rankings for whenever you want them — no extra cost, no wasted effort.",
          },
        ],
      },
      {
        heading: "Ads — where each dollar is going",
        intro:
          "Broken out so you can see exactly which campaign is efficient and which is still ramping — no blended average hiding the picture:",
        items: [
          {
            title: "Power Washing LSA — $36 / lead",
            detail:
              "Your most efficient paid channel, and pay-only-when-a-customer-connects. 7 leads in May. Budget has room to grow.",
          },
          {
            title: "Paver Search — $127 / lead",
            detail:
              "16 leads and a 40% share of the paver auction (nearest competitor 25%). At ~2.5% of a paver job's value, strong ROI. In-season priority.",
          },
          {
            title: "Power Washing Search — $288 / lead (new)",
            detail:
              "Just launched, still in Google's learning window, so the cost is high for now — totally normal for a new campaign. It'll settle as the data builds. The number to watch over the next 30–60 days, not to worry about today.",
          },
        ],
      },
    ],

    outlook: {
      intro:
        "Leads are up 33% over April, and organic search is now your single biggest source — 27 of 53 leads at $0 each. The SEO is doing exactly what it's built to do: take pressure off the ad budget. The one gap this month is reviews, and that's the lever we turn next.",
      goalsIntro: "Heading into summer, the goals are:",
      goals: [
        {
          highlight: "Get the review engine running",
          detail:
            "turn completed jobs into a steady stream of 5-star reviews — the #1 driver of map-pack ranking, and the one thing the marketing can't manufacture on its own",
        },
        {
          highlight: "Power Washing + Pavers as the lead engine",
          detail:
            "keep both fully funded and optimized through peak season, where the volume and the dollars are",
        },
        {
          highlight: "Lighting foundation ranking by fall",
          detail:
            "site and profile indexed and climbing now, so fall lighting demand lands on a page that's already on page 1",
        },
      ],
      closing:
        "Strong month on leads. Get the review flow going and the map rankings follow — that's the whole game heading into summer.",
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
