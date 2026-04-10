// Cloudflare Worker — meta tag injection for social share cards.
//
// TheKhan is a React SPA. Social crawlers (LinkedIn, Facebook, Twitter,
// iMessage, WhatsApp, Slack) don't run JS, so they see an empty <head>
// and generate blank preview cards. This Worker fetches the static HTML
// from the assets binding, and uses HTMLRewriter to inject per-route
// title + description + og:* + twitter:* tags before the response ships.
//
// Real users: no change. React still boots and runs the SPA.
// Crawlers: get real meta tags in the initial HTML.
// Private routes: get noindex,nofollow injected.

const DEFAULT_OG_IMAGE = "https://thekhan.io/og-image.jpg";

const ROUTE_META = {
  "/": {
    title: "Custom Websites & Marketing for Growing Businesses | TheKhan",
    description: "Custom websites and marketing that actually bring in business. One point of contact, start to finish.",
    canonical: "https://thekhan.io/",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
  },
  "/websites": {
    title: "Custom Web Design — Deerfield, IL | One Payment, You Own It",
    description: "Custom websites built from scratch in 1–6 weeks. One-time payment, no retainer, no lock-in. You walk away with every file. Deerfield, IL.",
    canonical: "https://thekhan.io/websites",
    ogImage: "https://thekhan.io/websites-og.jpg",
    ogType: "website",
  },
  "/contractors": {
    title: "Marketing for Home Service Contractors in Chicago | TheKhan",
    description: "Websites, Google Ads, and SEO for Chicago home service contractors. Get your phone ringing every week. You do the work. I make people find you.",
    canonical: "https://thekhan.io/contractors",
    ogImage: "https://thekhan.io/contractors-og.jpg",
    ogType: "website",
  },
  "/portfolio": {
    title: "Portfolio — Custom Websites for Small Businesses | TheKhan",
    description: "Omair is an independent web designer at TheKhan who builds custom-coded websites for home service businesses across the Chicago area.",
    canonical: "https://thekhan.io/portfolio",
    ogImage: "https://thekhan.io/portfolio-og.jpg",
    ogType: "website",
  },
  "/about": {
    title: "About Omair Khan — Founder of TheKhan | Web Design & Marketing",
    description: "One-man shop. Before this I built my own home service company to 84 clients. Now I build websites and run marketing for others.",
    canonical: "https://thekhan.io/about",
    ogImage: "https://thekhan.io/about-og.jpg",
    ogType: "profile",
  },
};

const NOINDEX_ROUTES = new Set([
  "/packages",
  "/start",
  "/premierpartners",
  "/marioscape",
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

    // Fetch the static asset from the assets binding.
    const assetResponse = await env.ASSETS.fetch(request);

    // Only rewrite HTML responses. Static assets (images, CSS, JS) pass through.
    const contentType = assetResponse.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return assetResponse;
    }

    const meta = ROUTE_META[pathname];
    const isNoindex = NOINDEX_ROUTES.has(pathname);

    // If this route doesn't need injection, return the asset as-is.
    if (!meta && !isNoindex) {
      return assetResponse;
    }

    // Build the HTML snippet to inject into <head>.
    let injection = "";
    if (meta) injection += buildMetaHtml(meta);
    if (isNoindex) injection += `\n${NOINDEX_HTML}`;

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
