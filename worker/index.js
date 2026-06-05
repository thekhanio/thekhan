// Cloudflare Worker — meta tag + schema injection for crawlers.
//
// TheKhan is a React SPA. Social crawlers (LinkedIn, Facebook, Twitter,
// iMessage, WhatsApp, Slack) don't run JS, so they see an empty <head>
// and generate blank preview cards. AI crawlers (Perplexity, ChatGPT,
// Bing Chat) also vary in JS execution, missing structured data.
//
// This Worker fetches the static HTML from the assets binding and uses
// HTMLRewriter to inject per-route title + description + og:* + twitter:*
// meta tags AND JSON-LD schema blocks before the response ships.
//
// Real users: no change. React still boots and runs the SPA.
// Crawlers: get real meta tags + structured data in the initial HTML.
// Private routes: get noindex,nofollow injected.

const DEFAULT_OG_IMAGE = "https://thekhan.io/og-image.png";

const ROUTE_META = {
  "/": {
    title: "Custom Websites & Marketing for Growing Businesses | TheKhan",
    description: "Custom websites and marketing that actually bring in business. One point of contact, start to finish.",
    canonical: "https://thekhan.io/",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
  },
  "/websites": {
    title: "Custom Web Design — Deerfield, IL | Sites You Own",
    description: "Custom websites built from scratch in about 30 days. You own every file, the domain, the logins. No retainer, no lock-in. Deerfield, IL.",
    canonical: "https://thekhan.io/websites",
    ogImage: "https://thekhan.io/websites-og.jpg",
    ogType: "website",
  },
  "/marketing": {
    title: "Marketing for Home Service & Local Businesses | TheKhan",
    description: "SEO, Google Ads, and Google Business Profile that get you found by people already searching — for home service and local businesses across Chicago. You do the work. I make sure people find you.",
    canonical: "https://thekhan.io/marketing",
    ogImage: "https://thekhan.io/marketing-og.jpg",
    ogType: "website",
  },
  "/portfolio": {
    title: "Portfolio — Custom Websites for Small Businesses | TheKhan",
    description: "Custom websites I've built for small businesses across Chicago and beyond — home service companies, local shops, and nonprofits. Every one is live right now.",
    canonical: "https://thekhan.io/portfolio",
    ogImage: "https://thekhan.io/portfolio-og.png",
    ogType: "website",
  },
  "/about": {
    title: "About Omair Khan — Founder of TheKhan | Web Design & Marketing",
    description: "One-man shop. Before this I built my own home service company to 84 clients. Now I build websites and run marketing for others.",
    canonical: "https://thekhan.io/about",
    ogImage: "https://thekhan.io/about-og.png",
    ogType: "profile",
  },
  "/why-intent": {
    title: "Intent Marketing vs Interruption Marketing | TheKhan",
    description: "Why I market to people already searching — Google, Maps, and AI like ChatGPT — instead of interrupting them on Facebook. The idea behind everything I do, plus the numbers.",
    canonical: "https://thekhan.io/why-intent",
    ogImage: "https://thekhan.io/why-intent-og.jpg",
    ogType: "article",
  },
};

// JSON-LD schemas per route — mirrors what React renders client-side.
// Injected server-side so non-JS crawlers (AI engines, Bing) see structured data.
const ROUTE_SCHEMAS = {
  "/": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://thekhan.io/#website",
          url: "https://thekhan.io",
          name: "TheKhan",
          description: "Independent web design and digital marketing studio founded by Omair Khan in Deerfield, IL.",
          publisher: { "@id": "https://thekhan.io/#localbusiness" },
        },
        {
          "@type": ["LocalBusiness", "ProfessionalService"],
          "@id": "https://thekhan.io/#localbusiness",
          name: "TheKhan",
          description: "TheKhan is an independent web design and digital marketing studio founded by Omair Khan in Deerfield, Illinois. Serving home service and local businesses, and growing companies, across Chicagoland and remote clients nationwide, TheKhan builds custom websites and runs the marketing that drives real leads.",
          url: "https://thekhan.io",
          logo: "https://thekhan.io/portfolio/logo-white.png",
          image: "https://thekhan.io/og-image.png",
          telephone: "+18472208550",
          email: "omair@thekhan.io",
          priceRange: "$$",
          openingHours: "Mo-Su 10:30-22:00",
          founder: { "@id": "https://thekhan.io/about#omair" },
          address: { "@type": "PostalAddress", streetAddress: "655 Deerfield Rd, Suite 100, Unit 404", addressLocality: "Deerfield", addressRegion: "IL", postalCode: "60015", addressCountry: "US" },
          geo: { "@type": "GeoCoordinates", latitude: "42.1711", longitude: "-87.8445" },
          areaServed: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: "42.1711", longitude: "-87.8445" }, geoRadius: "80000", description: "Chicagoland area and Chicago suburbs" },
          sameAs: ["https://www.linkedin.com/company/thekhanio", "https://www.instagram.com/thekhanio", "https://x.com/thekhanio", "https://www.facebook.com/profile.php?id=61584909881446"],
          hasOfferCatalog: {
            "@type": "OfferCatalog", name: "Digital Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Website Design & Development", description: "Custom-coded responsive websites built from scratch for small businesses, home service and local businesses, and growing companies. Mobile-friendly, SEO-optimized, owner-controlled — no template platforms or page builders." } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Monthly Marketing Retainers for Home Service & Local Businesses", description: "Ongoing marketing for home service and local businesses including SEO, Google Ads, Local Service Ads (LSA), Google Business Profile management, and lead generation. Built for plumbers, HVAC, roofing, and landscaping, plus dentists, salons, auto shops, and other local businesses." } },
            ],
          },
        },
        {
          "@type": "FAQPage",
          "@id": "https://thekhan.io/#faq",
          mainEntity: [
            { "@type": "Question", name: "What services does TheKhan offer?", acceptedAnswer: { "@type": "Answer", text: "TheKhan offers two main services: custom-coded website design and development for small businesses, plus monthly marketing retainers for home service and local businesses. Marketing retainers include SEO, Google Ads, Local Service Ads, Google Business Profile management, and lead generation." } },
            { "@type": "Question", name: "Where is TheKhan located?", acceptedAnswer: { "@type": "Answer", text: "TheKhan is based in Deerfield, Illinois on Chicago's North Shore. Founded by Omair Khan, the studio serves businesses throughout Chicagoland and works with remote clients nationwide." } },
            { "@type": "Question", name: "Does TheKhan work with small businesses?", acceptedAnswer: { "@type": "Answer", text: "Yes — TheKhan is built specifically for small and growing businesses. Every client works directly with founder Omair Khan, not an account manager or sales rep. TheKhan caps at a handful of clients per year to keep that direct relationship." } },
            { "@type": "Question", name: "How can I get started with TheKhan?", acceptedAnswer: { "@type": "Answer", text: "Get started by filling out the contact form at thekhan.io, calling or texting (847) 220-8550, or emailing omair@thekhan.io. Omair reads every message himself and usually replies within a few hours." } },
            { "@type": "Question", name: "What areas does TheKhan serve?", acceptedAnswer: { "@type": "Answer", text: "TheKhan serves businesses throughout Chicagoland — including Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, and the broader Chicago metropolitan area. Remote clients welcome nationwide." } },
          ],
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://thekhan.io/#organization",
      name: "TheKhan",
      url: "https://thekhan.io",
      logo: "https://thekhan.io/portfolio/logo-white.png",
      description: "TheKhan is the web design and marketing partner for home service contractors and small businesses — building custom websites and running local marketing (SEO, Local SEO, Google Ads, and Google Business Profile) that brings in more calls and jobs.",
      knowsAbout: ["Web design", "Web development", "SEO", "Local SEO", "Google Ads", "Google Business Profile", "Home service marketing", "Small business marketing"],
      areaServed: { "@type": "Country", name: "United States" },
      founder: { "@type": "Person", name: "Omair Khan" },
      sameAs: ["https://www.linkedin.com/company/thekhanio", "https://www.instagram.com/thekhanio", "https://x.com/thekhanio", "https://www.facebook.com/profile.php?id=61584909881446"],
    },
  ],
  "/websites": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/websites#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Websites", item: "https://thekhan.io/websites" }] },
    { "@context": "https://schema.org", "@type": "Service", "@id": "https://thekhan.io/websites#service", name: "Custom Website Design & Development", description: "Custom-coded websites built from scratch for small businesses and growing companies. Three site options (Brochure, Standard, Custom), or the Foundation when you want ongoing marketing too. Mobile-responsive, SEO-optimized, owner-controlled — no template platforms, no required retainer.", provider: { "@id": "https://thekhan.io/#localbusiness" }, areaServed: ["Chicago metropolitan area", "United States"], offers: [{ "@type": "Offer", name: "Brochure Site", price: "750", priceCurrency: "USD" }, { "@type": "Offer", name: "Standard Site", price: "1500", priceCurrency: "USD" }, { "@type": "Offer", name: "The Foundation", price: "2100", priceCurrency: "USD" }, { "@type": "Offer", name: "Website Care", price: "50", priceCurrency: "USD" }] },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://thekhan.io/websites#faq",
      mainEntity: [
        { "@type": "Question", name: "Do I need my own domain?", acceptedAnswer: { "@type": "Answer", text: "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again." } },
        { "@type": "Question", name: "Where will my site be hosted?", acceptedAnswer: { "@type": "Answer", text: "Your call. If you just want the site built, I set it up on your own account, in your name — you own it outright. If you'd rather I keep it running, that's Website Care ($50/mo): I host it, keep it fast and secure, and you edit it yourself anytime. Either way, every file is yours — move it whenever you want." } },
        { "@type": "Question", name: "Can you migrate my existing Wix or Squarespace site?", acceptedAnswer: { "@type": "Answer", text: "I'll use your existing copy, photos, and content — anything that's yours, I move over. But I rebuild the site fresh, which gets you a faster, cleaner result than dragging an old template along. Priced like any new build — Brochure, Standard, or Custom, depending on what you need." } },
        { "@type": "Question", name: "Why not just use Wix or Squarespace?", acceptedAnswer: { "@type": "Answer", text: "Two reasons. First, speed — builders like Wix carry a lot of extra weight, so they load slower; yours is built lean, so it's fast. Second, and bigger: with most builders you can't really take your site with you — you're stuck on their platform, and leaving means rebuilding from scratch. A custom site is different — every file is yours, text and images and all, so you can host it anywhere or hand it to any developer, anytime." } },
        { "@type": "Question", name: "What if my content isn't ready yet?", acceptedAnswer: { "@type": "Answer", text: "That's normal. Most people don't have polished copy or photos lined up before they hire me. I'll write the copy from what you tell me — you just review it. For photos, I'll tell you exactly what I need and help you figure out how to source it." } },
        { "@type": "Question", name: "What do I need to provide?", acceptedAnswer: { "@type": "Answer", text: "I write all the copy — and the form I send lets you flag any direction or specifics you want. Photos, your logo, and any brand materials are on you. No logo yet? I can put together something basic for a small added fee — just mention it when you reach out." } },
        { "@type": "Question", name: "What if I want changes after launch?", acceptedAnswer: { "@type": "Answer", text: "Two ways. Website Care ($50/mo) lets you update your own photos, hours, prices, and text anytime — no tech skills needed. Without it, the site's still yours; a bigger change down the road is a quick separate quote. Most small business sites barely change, so plenty of people start without the dashboard and add it later if they need it." } },
        { "@type": "Question", name: "Do I sign a long-term contract?", acceptedAnswer: { "@type": "Answer", text: "No. Site-only builds (Brochure, Standard, or Custom) are one-time projects — 50% paid Day 1 to start the build, 50% on launch, no monthly fee. The Foundation includes The Partnership — my monthly marketing — which begins after the first month at $950/mo, billed month-to-month, cancel any month with 72 hours notice before your next bill. Website Care ($50/mo) is also month-to-month with the same 72-hour cancel." } },
        { "@type": "Question", name: "How and when do I pay?", acceptedAnswer: { "@type": "Answer", text: "Site-only builds: 50% paid Day 1 to start the build, 50% on launch. The Foundation: paid Day 1, non-refundable. Either way — card or Zelle, your call. Invoiced upfront, no hidden fees, no surprise invoices." } },
      ],
    },
  ],
  "/marketing": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/marketing#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Marketing", item: "https://thekhan.io/marketing" }] },
    {
      "@context": "https://schema.org", "@type": "Service", "@id": "https://thekhan.io/marketing#service",
      name: "Local Marketing — SEO & Google Ads",
      description: "Websites, Google Ads, and SEO that get home service and local businesses found by the people already searching — across the Chicago area.",
      provider: { "@id": "https://thekhan.io/#localbusiness" },
      serviceType: ["Local Business Marketing", "Home Service Business Marketing", "Website Design", "Google Ads Management", "Local SEO", "Answer Engine Optimization", "Marketing for Contractors", "Marketing for Home Services", "Marketing for Dentists", "Marketing for Med Spas", "Marketing for Salons and Barbers", "Marketing for Real Estate Agents", "Marketing for Restaurants", "Marketing for Gyms", "Marketing for Auto Shops", "Marketing for Law Firms"],
    },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://thekhan.io/marketing#faq",
      mainEntity: [
        { "@type": "Question", name: "How much does your marketing cost?", acceptedAnswer: { "@type": "Answer", text: "The Partnership is $950/mo — flat, month-to-month, cancel any month with 72 hours notice before your next bill. It covers your website, Google Business Profile, and ongoing SEO under one brand. The build that starts it, the Foundation, is a one-time $2,100. Want leads right away? Ad Management runs from $500/mo on top, and your ad spend goes straight to Google. Then the monthly plan begins." } },
        { "@type": "Question", name: "Can you guarantee me more leads?", acceptedAnswer: { "@type": "Answer", text: "No — honestly, nobody can guarantee a number. How many leads you get depends on your market, your competition, the season, and your budget — none of which any marketer controls, and anyone promising a specific number is overpromising. What I promise is the work and a real strategy. You're month-to-month the whole way, so give it real time — and if you're not getting the results you wanted, you can walk away, no hard feelings." } },
        { "@type": "Question", name: "How long until I start seeing results?", acceptedAnswer: { "@type": "Answer", text: "Ads are the fast lane — leads within weeks, though they take a couple weeks to a month to settle in. SEO is the long game — some results around 3 months, real movement by 6, the full payoff around a year. Most do both: ads bring leads now while SEO builds." } },
        { "@type": "Question", name: "How much should I budget for ads?", acceptedAnswer: { "@type": "Answer", text: "Depends what you're running — Local Services Ads (LSA) are only offered for certain services, so we'll check if your service qualifies. For both, most start around $1,500/mo (about $1,000 for Search ads and $500 for LSA), paid straight to Google, separate from my fee." } },
        { "@type": "Question", name: "Do I own my Google Ads account, or do you?", acceptedAnswer: { "@type": "Answer", text: "You own it. Always. I run your ads under your own Google Ads account with your card on file. If we ever part ways, everything stays with you. Your ad account's never locked behind me." } },
        { "@type": "Question", name: "What if it's not working?", acceptedAnswer: { "@type": "Answer", text: "I cap myself at a handful of clients, so I catch problems fast — you're not a number lost in a big agency. If something's off, I find it and fix it. And you're month-to-month the whole way, so you're never stuck." } },
        { "@type": "Question", name: "If I cancel, do I keep everything?", acceptedAnswer: { "@type": "Answer", text: "Everything's yours — your site, your domain, your content. Want to just take the files and run with them yourself? No problem at all — I'll send it all over and you can get it live on your own. Rather I handle it? That's where a one-time migration service comes in — I'll set everything up on your own hosting and accounts so you're good to go." } },
        { "@type": "Question", name: "What Chicago suburbs do you serve?", acceptedAnswer: { "@type": "Answer", text: "I work with home service and local businesses across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits." } },
        { "@type": "Question", name: "Do you work with businesses running multiple brands?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Partnership covers one brand — one site, one Google profile, one set of reviews. Just running multiple services under one name? That's all included — one brand, one price. A second brand under a different name gets its own site and profile for +$700/mo. The build for the extra brand is quoted separately based on scope. Running multiple brands? Tell me upfront and I'll lay out what makes sense." } },
      ],
    },
  ],
  "/portfolio": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/portfolio#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://thekhan.io/portfolio" }] },
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://thekhan.io/portfolio#collectionpage",
      name: "Portfolio — Custom Websites for Small Businesses | TheKhan",
      description: "Custom websites I've built for small businesses across Chicago and beyond — home service companies, local shops, and nonprofits. Every one is live right now.",
      url: "https://thekhan.io/portfolio",
      isPartOf: { "@id": "https://thekhan.io/#website" },
      mainEntity: {
        "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: 11,
        itemListElement: [
          { "@type": "ListItem", position: 1, item: { "@type": "WebSite", name: "Premier Partners", url: "https://servicesfrompremier.com" } },
          { "@type": "ListItem", position: 2, item: { "@type": "WebSite", name: "Premier Power Washing", url: "https://powerwashingfrompremier.com" } },
          { "@type": "ListItem", position: 3, item: { "@type": "WebSite", name: "Premier Holiday Lighting", url: "https://lightingfrompremier.com" } },
          { "@type": "ListItem", position: 4, item: { "@type": "WebSite", name: "Premier Auto Spa", url: "https://detailingfrompremier.com" } },
          { "@type": "ListItem", position: 5, item: { "@type": "WebSite", name: "Premier Plowing", url: "https://plowingfrompremier.com" } },
          { "@type": "ListItem", position: 6, item: { "@type": "WebSite", name: "Premier Paver Restoration", url: "https://paversfrompremier.com" } },
          { "@type": "ListItem", position: 7, item: { "@type": "WebSite", name: "MarioScape", url: "https://marioscape.com" } },
          { "@type": "ListItem", position: 8, item: { "@type": "WebSite", name: "Simpli Clock", url: "https://simpliclock.com" } },
          { "@type": "ListItem", position: 9, item: { "@type": "WebSite", name: "Nour's Barbershop", url: "https://noursbarbershop.com" } },
          { "@type": "ListItem", position: 10, item: { "@type": "WebSite", name: "WAF Chicago", url: "https://wafchicago.org" } },
          { "@type": "ListItem", position: 11, item: { "@type": "WebSite", name: "Clean Green Property", url: "https://cleangreenproperty.com" } },
        ],
      },
    },
  ],
  "/about": [
    {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", "@id": "https://thekhan.io/about#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "About", item: "https://thekhan.io/about" }] },
        { "@type": "AboutPage", "@id": "https://thekhan.io/about#aboutpage", url: "https://thekhan.io/about", name: "About Omair Khan — Founder of TheKhan", description: "The founder story behind TheKhan — how Omair Khan built and grew his own home service company before pivoting to help other contractors and small businesses grow.", isPartOf: { "@id": "https://thekhan.io/#website" }, mainEntity: { "@id": "https://thekhan.io/about#omair" } },
        {
          "@type": "Person", "@id": "https://thekhan.io/about#omair", name: "Omair Khan", url: "https://thekhan.io/about", image: "https://thekhan.io/omair-portrait.webp", jobTitle: "Founder",
          description: "Founder of TheKhan, an independent web design and digital marketing studio in Deerfield, Illinois. Before TheKhan, Omair built and grew his own home service company to 84 clients before pivoting to help other contractors and small businesses grow.",
          worksFor: { "@id": "https://thekhan.io/#localbusiness" },
          address: { "@type": "PostalAddress", addressLocality: "Deerfield", addressRegion: "IL", addressCountry: "US" },
          knowsAbout: ["Web design", "Web development", "SEO", "Google Ads", "Local SEO", "Home service marketing", "Small business marketing"],
          sameAs: ["https://www.linkedin.com/in/omair-khan-64088a357", "https://www.instagram.com/thekhanio", "https://x.com/thekhanio"],
        },
      ],
    },
  ],
  "/why-intent": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/why-intent#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Why Intent", item: "https://thekhan.io/why-intent" }] },
    { "@context": "https://schema.org", "@type": "Article", "@id": "https://thekhan.io/why-intent#article", headline: "Intent Marketing vs Interruption Marketing", description: "Why I market to people already searching — Google, Maps, and AI like ChatGPT — instead of interrupting them on Facebook.", datePublished: "2026-05-25", dateModified: "2026-05-26", author: { "@id": "https://thekhan.io/about#omair" }, publisher: { "@id": "https://thekhan.io/#localbusiness" }, isPartOf: { "@id": "https://thekhan.io/#website" }, about: ["Intent marketing", "Demand capture", "Local SEO", "Answer Engine Optimization", "Generative Engine Optimization"] },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://thekhan.io/why-intent#faq",
      mainEntity: [
        { "@type": "Question", name: "What is intent marketing?", acceptedAnswer: { "@type": "Answer", text: "Intent marketing means reaching people who are already searching for what you sell — on Google, Google Maps, and AI search like ChatGPT — at the exact moment they want it. The industry term is demand capture. It's the opposite of interruption marketing (demand generation), which puts ads in front of people who weren't looking, like Facebook and Instagram feed ads." } },
        { "@type": "Question", name: "What's the difference between intent marketing and interruption marketing?", acceptedAnswer: { "@type": "Answer", text: "Intent (pull) marketing catches people who are already looking — a search for 'plumber near me' is someone ready to call. Interruption (push) marketing pushes a message at people who weren't looking, hoping to create demand. Seth Godin framed this as permission vs interruption. Both can work, but for local service businesses the people actively searching convert far better — so that's what TheKhan focuses on." } },
        { "@type": "Question", name: "What are AEO and GEO?", acceptedAnswer: { "@type": "Answer", text: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) mean getting your business cited when people ask AI — ChatGPT, Google's AI Overviews, Perplexity — instead of typing a search. It's the same goal as SEO (being found), applied to AI answers. As more customers ask AI 'who's the best [service] near me,' showing up in those answers matters as much as ranking on Google." } },
        { "@type": "Question", name: "Does intent marketing convert better than social media ads?", acceptedAnswer: { "@type": "Answer", text: "For most local service businesses, yes. People who find a business through organic search convert at about 2.7% — nearly double social media's 1.5%. Paid search ads do even better at about 3.2%, more than double. Both come from the same study (Ruler Analytics, 2025). The reason is simple: searchers already want the service." } },
      ],
    },
  ],
};

const NOINDEX_ROUTES = new Set([
  "/start",
  "/intake",
  "/premierpartners",
  "/marioscape",
  "/crystalclear",
  "/proposal-temp-multi",
  "/proposal-temp-single",
]);

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normalizePath(pathname) {
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

function buildMetaHtml(meta) {
  const title = escapeHtml(meta.title);
  const description = escapeHtml(meta.description);
  const canonical = escapeHtml(meta.canonical);
  const ogImage = escapeHtml(meta.ogImage);
  const ogType = escapeHtml(meta.ogType || "website");

  return `
    <title>${title}</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${canonical}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:site_name" content="TheKhan">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@thekhanio">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${ogImage}">
  `.trim();
}

const NOINDEX_HTML = `<meta name="robots" content="noindex, nofollow">`;

class HeadInjector {
  constructor(html) {
    this.html = html;
  }
  element(element) {
    element.append(this.html, { html: true });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = normalizePath(url.pathname);

    // 301 redirects → /marketing. Consolidated the two audience pages into one
    // hub 2026-05-25; /contractors was renamed 2026-05-10. Worker hits before
    // React routing, so this preserves equity from any existing backlinks.
    if (pathname === "/contractors" || pathname === "/home-services" || pathname === "/local-services") {
      const target = new URL("/marketing" + url.search + url.hash, url.origin);
      return Response.redirect(target.toString(), 301);
    }

    // Fetch the static asset from the assets binding.
    const assetResponse = await env.ASSETS.fetch(request);

    // Only rewrite HTML responses. Static assets (images, CSS, JS) pass through.
    const contentType = assetResponse.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return assetResponse;
    }

    const meta = ROUTE_META[pathname];
    const schemas = ROUTE_SCHEMAS[pathname];
    const isNoindex = NOINDEX_ROUTES.has(pathname);

    // If this route doesn't need injection, return the asset as-is.
    if (!meta && !schemas && !isNoindex) {
      return assetResponse;
    }

    // Build the HTML snippet to inject into <head>.
    let injection = "";
    if (meta) injection += buildMetaHtml(meta);
    if (isNoindex) injection += `\n${NOINDEX_HTML}`;

    // Inject JSON-LD schema blocks so non-JS crawlers see structured data.
    if (schemas) {
      for (const schema of schemas) {
        injection += `\n<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
      }
    }

    // Stream-rewrite the HTML response and inject into <head>.
    const transformed = new HTMLRewriter()
      .on("head", new HeadInjector(injection))
      .transform(assetResponse);

    // Prevent Cloudflare edge caching of transformed HTML so every request
    // runs through the Worker fresh. Without this, stale pre-injection HTML
    // from the edge cache can be served and bypass the transformation.
    const headers = new Headers(transformed.headers);
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
    headers.set("CDN-Cache-Control", "no-store");

    return new Response(transformed.body, {
      status: transformed.status,
      statusText: transformed.statusText,
      headers,
    });
  },
};
