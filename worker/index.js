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
    ogImage: "https://thekhan.io/websites-og.png",
    ogType: "website",
  },
  "/marketing": {
    title: "Marketing for Home Service & Local Businesses | TheKhan",
    description: "SEO, Google Ads, and Google Business Profile that get you found by people already searching — for home service and local businesses across Chicago. You do the work. I make sure people find you.",
    canonical: "https://thekhan.io/marketing",
    ogImage: "https://thekhan.io/og-image.png",
    ogType: "website",
  },
  "/portfolio": {
    title: "Portfolio — Custom Websites for Small Businesses | TheKhan",
    description: "Custom websites and marketing for small businesses across Chicago — home services and local services.",
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
    ogImage: "https://thekhan.io/og-image.png",
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
          sameAs: ["https://www.linkedin.com/company/thekhanio", "https://www.instagram.com/thekhanio", "https://www.facebook.com/profile.php?id=61584909881446"],
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
      founder: { "@type": "Person", name: "Omair Khan" },
      sameAs: ["https://www.linkedin.com/company/thekhanio", "https://www.instagram.com/thekhanio", "https://www.facebook.com/profile.php?id=61584909881446"],
    },
  ],
  "/websites": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/websites#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Websites", item: "https://thekhan.io/websites" }] },
    { "@context": "https://schema.org", "@type": "Service", "@id": "https://thekhan.io/websites#service", name: "Custom Website Design & Development", description: "Custom-coded websites built from scratch for small businesses and growing companies. Three site options (Brochure, Standard, Custom), or the Foundation when you want ongoing marketing too. Mobile-responsive, SEO-optimized, owner-controlled — no template platforms, no required retainer.", provider: { "@id": "https://thekhan.io/#localbusiness" }, areaServed: ["Chicago metropolitan area", "United States"], offers: [{ "@type": "Offer", name: "Brochure Site", price: "750", priceCurrency: "USD" }, { "@type": "Offer", name: "Standard Site", price: "1500", priceCurrency: "USD" }, { "@type": "Offer", name: "The Foundation", price: "2100", priceCurrency: "USD" }, { "@type": "Offer", name: "Website Care", price: "50", priceCurrency: "USD" }] },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://thekhan.io/websites#faq",
      mainEntity: [
        { "@type": "Question", name: "Do I need my own domain?", acceptedAnswer: { "@type": "Answer", text: "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again." } },
        { "@type": "Question", name: "Where will my site be hosted?", acceptedAnswer: { "@type": "Answer", text: "On modern hosting that's free for small business sites. Your only ongoing cost is your domain renewal — about $12 a year." } },
        { "@type": "Question", name: "Can you migrate my existing Wix or Squarespace site?", acceptedAnswer: { "@type": "Answer", text: "I'll use your existing copy, photos, and content — anything that's yours, I move over. But the site itself gets built from scratch on custom code, which gives you a faster, cleaner result than dragging an old template along. Priced like any new build — Brochure, Standard, or Custom, depending on what you need." } },
        { "@type": "Question", name: "What if my content isn't ready yet?", acceptedAnswer: { "@type": "Answer", text: "That's normal. Most people don't have polished copy or photos lined up before they hire me. I'll write the copy from what you tell me — you just review it. For photos, I'll tell you exactly what I need and help you figure out how to source it." } },
        { "@type": "Question", name: "What if I want changes after launch?", acceptedAnswer: { "@type": "Answer", text: "Two options. Grab Website Care ($50/mo) and edit your own photos, hours, and text in a few clicks. Or text me for one-off updates — I'll quote each one upfront before I start. If you're going to be making changes regularly, Website Care usually makes more sense." } },
        { "@type": "Question", name: "Do I sign a long-term contract?", acceptedAnswer: { "@type": "Answer", text: "No. Site-only builds (Brochure, Standard, or Custom) are one-time projects — 50% paid Day 1 to start the build, 50% on launch, no retainer, no cancellation fee. The Foundation includes The Partnership — my monthly marketing — which begins Day 31 at $950/mo, billed month-to-month, cancel any month with 72 hours notice before your next bill. Website Care ($50/mo) is also month-to-month with the same 72-hour cancel." } },
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
        { "@type": "Question", name: "How much does your marketing cost?", acceptedAnswer: { "@type": "Answer", text: "The Partnership is $950/mo — flat, month-to-month, cancel any month with 72 hours notice. It covers your website, Google Business Profile, and ongoing SEO under one brand. The build that starts it, the Foundation, is a one-time $2,100. Want leads right away? Ad Management runs from $500/mo on top, and your ad spend goes straight to Google. Day 31, the monthly plan begins." } },
        { "@type": "Question", name: "How long before I see more calls or bookings?", acceptedAnswer: { "@type": "Answer", text: "Google Ads can start driving calls shortly after launch. SEO is the long game — it compounds over time. You'll usually start seeing some results around 3 months, real movement by 6 months, and the full payoff around the 1-year mark. That's why most businesses run both: ads bring leads right away while SEO builds for the long haul. I'll tell you which fits your timeline and budget up front, not after." } },
        { "@type": "Question", name: "Do I own my Google Ads account, or do you?", acceptedAnswer: { "@type": "Answer", text: "You own it. Always. I run your ads under your own Google Ads account with your card on file. If we ever part ways, everything stays with you. Nothing of yours is locked behind me." } },
        { "@type": "Question", name: "What happens if the marketing doesn't work?", acceptedAnswer: { "@type": "Answer", text: "Month-to-month means you're never locked in. Cancel any month with 72 hours notice before your next bill. I cap myself at a handful of clients so I can pay attention to each one — if something isn't working, I find out fast and fix it, not 90 days later when your next invoice hits. Everything stays in your name, so canceling doesn't cost you what we've built." } },
        { "@type": "Question", name: "What Chicago suburbs do you serve?", acceptedAnswer: { "@type": "Answer", text: "I work with home service and local businesses across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits." } },
        { "@type": "Question", name: "Do you offer exclusive territory protection?", acceptedAnswer: { "@type": "Answer", text: "By default, I won't take on a direct competitor in your service area — that's just how I run. Want it locked in writing? Territory exclusivity is an add-on from $150/city/mo, so a competitor in those cities can't sign with me no matter what they offer." } },
        { "@type": "Question", name: "Do you work with businesses running multiple brands?", acceptedAnswer: { "@type": "Answer", text: "Yes. The Partnership covers one brand — one site, one Google profile, one set of reviews. A second brand under a different name gets its own site and profile for +$700/mo. The build for the extra brand is quoted separately based on scope. Running multiple brands? Tell me upfront and I'll lay out what makes sense." } },
      ],
    },
  ],
  "/portfolio": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/portfolio#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "The Work", item: "https://thekhan.io/portfolio" }] },
    {
      "@context": "https://schema.org", "@type": "CollectionPage", "@id": "https://thekhan.io/portfolio#collectionpage",
      name: "Portfolio — Custom Websites for Small Businesses | TheKhan",
      description: "Custom websites and marketing for small businesses across Chicago — home services and local services.",
      url: "https://thekhan.io/portfolio",
      isPartOf: { "@id": "https://thekhan.io/#website" },
      mainEntity: {
        "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderAscending", numberOfItems: 5,
        itemListElement: [
          { "@type": "ListItem", position: 1, item: { "@type": "WebSite", name: "Premier Partners", url: "https://servicesfrompremier.com", about: "Multi-brand home service company serving Cook County, Lake County, and McHenry County" } },
          { "@type": "ListItem", position: 2, item: { "@type": "WebSite", name: "MarioScape", url: "https://marioscape.com", about: "Landscaping and removal company serving Chicago's North Shore" } },
          { "@type": "ListItem", position: 3, item: { "@type": "WebSite", name: "Shifa Home Care", url: "https://shifahomecareservices.com", about: "Non-medical home care services serving Will County, Kane County, Cook County, and DuPage County" } },
          { "@type": "ListItem", position: 4, item: { "@type": "WebSite", name: "Nour's Barbershop", url: "https://noursbarbershop.com", about: "Local barbershop in Morton Grove, IL" } },
          { "@type": "ListItem", position: 5, item: { "@type": "WebSite", name: "WAF Chicago", url: "https://wafchicago.org", about: "Nonprofit serving Cook County, based in Des Plaines" } },
        ],
      },
    },
  ],
  "/about": [
    {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "BreadcrumbList", "@id": "https://thekhan.io/about#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "About", item: "https://thekhan.io/about" }] },
        { "@type": "AboutPage", "@id": "https://thekhan.io/about#aboutpage", url: "https://thekhan.io/about", name: "About Omair Khan — Founder of TheKhan", description: "The founder story behind TheKhan — how Omair Khan built and scaled his own home service company before pivoting to help other contractors and small businesses grow.", isPartOf: { "@id": "https://thekhan.io/#website" }, mainEntity: { "@id": "https://thekhan.io/about#omair" } },
        {
          "@type": "Person", "@id": "https://thekhan.io/about#omair", name: "Omair Khan", url: "https://thekhan.io/about", image: "https://thekhan.io/omair-portrait.webp", jobTitle: "Founder",
          description: "Founder of TheKhan, an independent web design and digital marketing studio in Deerfield, Illinois. Before TheKhan, Omair built and scaled his own home service company to 84 clients before pivoting to help other contractors and small businesses grow.",
          worksFor: { "@id": "https://thekhan.io/#localbusiness" },
          address: { "@type": "PostalAddress", addressLocality: "Deerfield", addressRegion: "IL", addressCountry: "US" },
          knowsAbout: ["Web design", "Web development", "SEO", "Google Ads", "Local SEO", "Home service marketing", "Small business marketing"],
          sameAs: ["https://www.linkedin.com/in/omair-khan-64088a357"],
        },
      ],
    },
  ],
  "/why-intent": [
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": "https://thekhan.io/why-intent#breadcrumb", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" }, { "@type": "ListItem", position: 2, name: "Why Intent", item: "https://thekhan.io/why-intent" }] },
    { "@context": "https://schema.org", "@type": "Article", "@id": "https://thekhan.io/why-intent#article", headline: "Intent Marketing vs Interruption Marketing", description: "Why I market to people already searching — Google, Maps, and AI like ChatGPT — instead of interrupting them on Facebook.", author: { "@id": "https://thekhan.io/about#omair" }, publisher: { "@id": "https://thekhan.io/#localbusiness" }, isPartOf: { "@id": "https://thekhan.io/#website" }, about: ["Intent marketing", "Demand capture", "Local SEO", "Answer Engine Optimization", "Generative Engine Optimization"] },
    {
      "@context": "https://schema.org", "@type": "FAQPage", "@id": "https://thekhan.io/why-intent#faq",
      mainEntity: [
        { "@type": "Question", name: "What is intent marketing?", acceptedAnswer: { "@type": "Answer", text: "Intent marketing means reaching people who are already searching for what you sell — on Google, Google Maps, and AI search like ChatGPT — at the exact moment they want it. The industry term is demand capture. It's the opposite of interruption marketing (demand generation), which puts ads in front of people who weren't looking, like Facebook and Instagram feed ads." } },
        { "@type": "Question", name: "What's the difference between intent marketing and interruption marketing?", acceptedAnswer: { "@type": "Answer", text: "Intent (pull) marketing catches people who are already looking — a search for 'plumber near me' is someone ready to call. Interruption (push) marketing pushes a message at people who weren't looking, hoping to create demand. Seth Godin framed this as permission vs interruption. Both can work, but for local service businesses the people actively searching convert far better — so that's the lane TheKhan specializes in." } },
        { "@type": "Question", name: "What are AEO and GEO?", acceptedAnswer: { "@type": "Answer", text: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) mean getting your business cited when people ask AI tools — ChatGPT, Google's AI Overviews, Perplexity — instead of typing a search. It's the same goal as SEO (being found), applied to AI answers." } },
        { "@type": "Question", name: "Does intent marketing convert better than social media ads?", acceptedAnswer: { "@type": "Answer", text: "For most local service businesses, yes. People who find a business through organic search convert at about 2.7%, nearly double social media's 1.5% (Ruler Analytics, 2025). And for home services, Google Search ads convert roughly 40% higher than Facebook ads — 7.3% vs 5.2% (LocaliQ/WordStream, 2025)." } },
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
