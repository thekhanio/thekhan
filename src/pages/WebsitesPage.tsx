import { useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Eyebrow, DisplayH1, DisplayH2, MonoNum, PullQuote } from "@/components/editorial";
import { TldrStrip } from "@/components/ui/tldr-strip";
import { TextMarquee } from "@/components/ui/text-marquee";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { IconPhone, IconMail, IconCheck, IconChevronDown, IconArrowRight } from "@tabler/icons-react";

const faqs = [
  { q: "Do I need my own domain?", a: "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again." },
  { q: "Where will my site be hosted?", a: "On modern hosting that's free for small business sites. Your only ongoing cost is your domain renewal — about $12 a year." },
  { q: "Can you migrate my existing Wix or Squarespace site?", a: "I'll use your existing copy, photos, and content — anything that's yours, I move over. But I rebuild the site fresh, which gets you a faster, cleaner result than dragging an old template along. Priced like any new build — Starter, Full, or Authority Site, depending on what you need." },
  { q: "What if my content isn't ready yet?", a: "That's normal. Most people don't have polished copy or photos lined up before they hire me. I'll write the copy from what you tell me — you just review it. For photos, I'll tell you exactly what I need and help you figure out how to source it." },
  { q: "What if I want changes after launch?", a: "Two options. Grab the optional dashboard ($59/mo) and edit anything yourself in a few clicks. Or text me for one-off updates — I'll quote each one upfront before I start. If you're going to be making changes regularly, the dashboard usually makes more sense." },
  { q: "Do I sign a long-term contract?", a: "No. Site-only builds (Starter, Full, or Authority Site) are one-time projects — 50% paid Day 1 to start the build, 50% on launch, no monthly fee, no cancellation fee. The Marketing Bundle includes a monthly marketing tier that kicks in Day 31, billed month-to-month — cancel any month with 72 hours notice before your next bill. The optional dashboard ($59/mo) is also month-to-month with the same 72-hour cancel." },
  { q: "How and when do I pay?", a: "Site-only builds: 50% paid Day 1 to start the build, 50% on launch. Marketing Bundle: build + setup paid Day 1, non-refundable. Either way — card or Zelle, your call. Invoiced upfront, no hidden fees, no surprise invoices." },
];

const PAGE_TITLE = "Custom Web Design — Deerfield, IL | Sites You Own";
const PAGE_DESC = "Custom websites built from scratch in about 30 days. You own every file, the domain, the logins. No retainer, no lock-in. Deerfield, IL.";
const PAGE_URL = "https://thekhan.io/websites";
const OG_IMAGE = "https://thekhan.io/websites-og.jpg";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/websites#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "Websites", "item": "https://thekhan.io/websites" },
  ],
};

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thekhan.io/websites#service",
  "name": "Custom Website Design & Development",
  "description": "Custom-coded websites built from scratch for small businesses and growing companies.",
  "provider": { "@id": "https://thekhan.io/#localbusiness" },
  "areaServed": ["Chicago metropolitan area", "United States"],
  "offers": [
    { "@type": "Offer", "name": "Starter Site Build", "price": "750", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Full Site Build", "price": "1200", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Authority Site Build", "price": "1800", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Marketing Bundle", "price": "1699", "priceCurrency": "USD" }
  ]
};

const FAQ_SCHEMA_FOR_HEAD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/websites#faq",
  "mainEntity": faqs.map((f) => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } })),
};

interface TierProps {
  name: string;
  price: string;
  was: string;
  blurb: string;
  features: React.ReactNode[];
  inheritsFrom?: string;
  ctaLabel: string;
  featured?: boolean;
}

function Tier({ name, price, was, blurb, features, inheritsFrom, ctaLabel, featured }: TierProps) {
  return (
    <a
      href="#contact"
      aria-label={`${ctaLabel} — go to contact form`}
      className={`lift relative h-full flex flex-col p-10 md:p-12 border ${featured ? "border-accent border-2" : "border-line"} bg-bg-raised cursor-pointer transition-colors`}
    >
      {featured && (
        <p className="absolute -top-3 left-10 bg-accent text-bg px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
          Most common
        </p>
      )}
      <Eyebrow accent className="mb-4">{name}</Eyebrow>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="display-h2 text-5xl md:text-6xl text-ink">{price}</span>
        <span className="font-mono text-sm text-ink-faint line-through">{was}</span>
      </div>
      <p className="text-ink-quiet text-sm italic mb-8">{blurb}</p>
      {inheritsFrom && (
        <p className="font-mono text-[11px] tracking-widest uppercase text-accent mb-4">
          Everything in {inheritsFrom}, plus:
        </p>
      )}
      <ul className="space-y-3 mb-10 flex-1">
        {features.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-ink-muted text-sm leading-relaxed">
            <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <span className={featured ? "btn-primary text-sm" : "btn-ghost text-sm"}>
        {ctaLabel}
      </span>
    </a>
  );
}

export default function WebsitesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout activePath="/websites" contactHref="#contact">
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        canonical={PAGE_URL}
        ogImage={OG_IMAGE}
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, SERVICE_SCHEMA, FAQ_SCHEMA_FOR_HEAD]}
      />

      {/* ==================== HERO ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-20 md:pb-28 px-6 lg:px-12 overflow-hidden">
        <div className="gradient-drift" aria-hidden="true" />
        <div className="relative max-w-[1600px] mx-auto">
          <Eyebrow accent className="mb-8">Websites</Eyebrow>
          <ClipReveal trigger="load">
            <DisplayH1 className="max-w-6xl">
              A site you own.
              <br />
              <span className="text-accent">Built to rank.</span>
            </DisplayH1>
          </ClipReveal>
          <p className="lede mt-12 max-w-2xl">
            Live in about <MonoNum>30</MonoNum> days. The site is yours — move it anywhere you want. No monthly fees.
          </p>

          <TldrStrip
            bullets={[
              <>A site built just for you, ready in about 30 days</>,
              <>3 tiers: <MonoNum>$750</MonoNum>, <MonoNum>$1,200</MonoNum>, or <MonoNum>$1,800</MonoNum> (one-time, Spring 2026 launch pricing)</>,
              <>You own the code &mdash; no contracts, no lock-in</>,
            ]}
            links={[
              { label: "Pricing", href: "#pricing" },
              { label: "Process", href: "#process" },
              { label: "FAQ", href: "#faq" },
            ]}
          />

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a href="#contact" className="btn-primary">Start your build &rarr;</a>
            <a href="#pricing" className="text-accent-light hover:text-ink text-sm tracking-wide underline underline-offset-4 decoration-accent-line hover:decoration-ink transition-colors">
              See pricing &darr;
            </a>
          </div>
          <p className="mt-10">
            <Link to="/portfolio" className="link text-sm">
              See more work I&apos;ve shipped &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ==================== TEXT MARQUEE — outlined, slower ==================== */}
      <section className="section-deep py-8 md:py-10 border-y border-line overflow-hidden">
        <TextMarquee
          variant="outlined"
          durationSec={90}
          items={[
            "Built Just for You",
            "Found on Google",
            "Brings In Calls",
            "Loads Fast",
            "Looks Sharp on Phones",
            "Easy to Edit Yourself",
            "You Own It",
            "No Contracts",
          ]}
        />
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-12 max-w-3xl">
            <Eyebrow accent className="mb-8">What it costs</Eyebrow>
            <DisplayH2 className="mb-8">Pick what fits.</DisplayH2>
            <p className="lede">
              Same build on every tier. The more pages, the more services people can find you for.
            </p>
          </div>

          <p className="font-mono text-[11px] tracking-widest uppercase text-accent mb-8">
            Spring 2026 launch pricing — locked through June 30, 2026
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <Tier
              name="Starter Site"
              price="$750"
              was="$1,200"
              blurb="For a small business that needs a real site, built right, owned in full."
              features={[
                <>5 pages — <strong className="text-ink font-semibold">home, about, services, contact, plus one more (gallery or FAQ)</strong></>,
                <>Fast loading. <strong className="text-ink font-semibold">No template, no monthly platform fee.</strong></>,
                <>Contact form, click-to-call, map on every page — <strong className="text-ink font-semibold">three ways to reach you.</strong></>,
                <>Built to rank — <strong className="text-ink font-semibold">pages structured to show up when people search for your services.</strong></>,
                <>Tracking installed — <strong className="text-ink font-semibold">you see where visitors came from and what they did on the site</strong></>,
                <>2 rounds of revisions — <strong className="text-ink font-semibold">change what you want, no hourly billing.</strong></>,
                <>Site, domain, and logins — <strong className="text-ink font-semibold">yours, day one.</strong></>,
              ]}
              ctaLabel="Start a Starter Site →"
            />
            <Tier
              name="Full Site"
              price="$1,200"
              was="$1,800"
              blurb="For a business with multiple services, locations, or audiences to cover."
              inheritsFrom="Starter Site"
              featured
              features={[
                <>7–8 pages — <strong className="text-ink font-semibold">2–3 more pages so you show up for more of the searches your customers run</strong></>,
                <>Expanded copywriting on every page — <strong className="text-ink font-semibold">written to convert visitors, not just fill space</strong></>,
                <>More design depth on every page — <strong className="text-ink font-semibold">testimonials, FAQs, custom sections that earn the visitor&apos;s trust</strong></>,
                <>3 rounds of revisions — <strong className="text-ink font-semibold">more time to dial it in before launch</strong></>,
              ]}
              ctaLabel="Start a Full Site →"
            />
            <Tier
              name="Authority Site"
              price="$1,800"
              was="$2,300"
              blurb="For a business with a deep service catalog, multiple locations, or both."
              inheritsFrom="Full Site"
              features={[
                <>10+ pages — <strong className="text-ink font-semibold">each service or location gets its own page, built for the search that matches it</strong></>,
                <>Page-by-page plan up front — <strong className="text-ink font-semibold">I map out which pages earn their keep before building.</strong></>,
                <>More design depth — <strong className="text-ink font-semibold">custom layouts on each page, no two pages feel the same</strong></>,
                <>4 rounds of revisions — <strong className="text-ink font-semibold">the biggest scope deserves the most refinement before launch</strong></>,
              ]}
              ctaLabel="Start an Authority Site →"
            />
          </div>

          <p className="mt-8 font-mono text-[11px] tracking-widest uppercase text-accent">
            Need just one page? Landing pages from $300 (was $750).
          </p>

          {/* Marketing Bundle */}
          <div className="mt-24">
            <div className="ed-card max-w-3xl">
              <Eyebrow accent className="mb-4">Marketing Bundle</Eyebrow>
              <div className="flex items-baseline gap-3 mb-8 flex-wrap">
                <span className="display-h2 text-5xl md:text-6xl text-ink">$1,699</span>
                <span className="font-mono text-sm text-ink-faint line-through">$2,400</span>
                <span className="text-ink-quiet text-sm italic">after June 30, 2026</span>
              </div>
              <ul className="space-y-3">
                {[
                  <>Full Site (7–8 pages) — <strong className="text-ink font-semibold">fast, mobile, built to rank</strong></>,
                  <>Google Business Profile set up — <strong className="text-ink font-semibold">you show up on the map for your services and area</strong></>,
                  <>Tracking installed — <strong className="text-ink font-semibold">you see where every call and click is coming from</strong></>,
                  <>Listed where it counts for local search — <strong className="text-ink font-semibold">so customers find you when they&apos;re looking nearby.</strong></>,
                  <>First SEO pages built and submitted to Google from day one — <strong className="text-ink font-semibold">the foundation that gets you found for the services you offer.</strong></>,
                  <>Dashboard set up at yourdomain.com/admin — <strong className="text-ink font-semibold">edit anything yourself, anytime</strong></>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-ink-quiet text-sm italic">
                Build + setup paid Day 1, non-refundable. Day 31, your monthly tier kicks in.
              </p>
              <Link to="/contractors" className="btn-primary text-sm mt-8">
                See marketing tiers &rarr;
              </Link>
            </div>
          </div>

          <div className="max-w-3xl mt-24 pt-16 border-t border-line">
            <DisplayH2 className="text-3xl md:text-4xl mb-8">The terms, plain.</DisplayH2>
            <div className="space-y-6 text-ink-muted text-base md:text-lg leading-relaxed">
              <p>
                <span className="text-ink font-semibold">Site-only build (Starter, Full, or Authority Site).</span>{" "}
                50% paid Day 1 to start the build, 50% on launch. Live in about 30 days. One-time project — no monthly fee, no cancellation fee.
              </p>
              <p>
                <span className="text-ink font-semibold">Marketing Bundle.</span>{" "}
                Build + setup paid Day 1, non-refundable — that covers the 30-day foundation work. Day 31, your monthly tier kicks in. Then month-to-month — cancel any month with 72 hours notice before your next bill.
              </p>
              <p>
                <span className="text-ink font-semibold">Either way.</span>{" "}
                The site is yours at launch. <strong className="text-accent-light font-semibold">Optional</strong> dashboard ($59/mo, further down) is month-to-month — cancel any month with 72 hours notice before your next bill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ON PLATFORMS ==================== */}
      <section className="section-deep py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">On platforms</Eyebrow>
            <DisplayH2 className="mb-8">Why I won&apos;t build you a Wix site.</DisplayH2>
            <p className="lede">
              Faster pages, real ownership, no lock-in.
            </p>
          </div>

          <div className="border-t border-line">
            {[
              { num: "01", title: "Faster pages, ranked for YOUR services.", body: <>Template builders cram in code your site doesn&apos;t need. Custom sites load only what&apos;s used — they&apos;re faster, and the pages get built to rank for the searches that bring YOUR customers, not the generic version every Wix user gets.</> },
              { num: "02", title: "You can't actually own a platform site.", body: <><span>Wix&apos;s own support docs say a Wix site can only run on Wix — you can&apos;t take it anywhere else. Squarespace exports are partial — most content won&apos;t transfer. GoDaddy has no way to export your site&apos;s pages, content, or design. Webflow lets you export HTML/CSS but not your content database.</span><span className="block mt-3">When I build you a custom site, every file is yours — text, images, code, structure. You can leave anytime, take it to any developer, or host it anywhere.</span><span className="block mt-3">Most of your competitors are locked into a platform like Wix or Squarespace. They can&apos;t leave without rebuilding from scratch. With a custom site, you don&apos;t have that problem.</span></> },
            ].map((item) => (
              <div key={item.num} className="grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-14 gap-y-3 py-12 border-b border-line">
                <p className="font-mono text-sm text-accent tracking-widest pt-2">{item.num}</p>
                <h3 className="display-h2 text-2xl md:text-3xl text-ink">{item.title}</h3>
                <div className="col-start-2 text-ink-muted leading-relaxed text-base md:text-lg">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== OPTIONAL DASHBOARD ==================== */}
      <section className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">Optional dashboard</Eyebrow>
            <DisplayH2 className="mb-8">Edit your site yourself.</DisplayH2>
            <p className="lede">
              Update text, photos, hours, prices — anything — from any device. No code, no HTML, no tech background. Click, change, save.
            </p>
          </div>

          <div className="ed-card space-y-8">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="display-h2 text-5xl md:text-6xl text-ink">$59</span>
              <span className="text-ink-muted">/month</span>
              <span className="text-ink-quiet text-sm italic ml-2">
                <strong className="text-accent-light font-semibold not-italic">Optional.</strong>{" "}
                Month-to-month — cancel any month with 72 hours notice before your next bill.
              </span>
            </div>

            <div className="border-l-2 border-accent pl-6">
              <p className="text-ink font-semibold mb-2">What makes this different from a Wix subscription:</p>
              <p className="text-ink-muted leading-relaxed">
                Cancel the dashboard, your site keeps running. The site is still yours, still live — only the edit tool goes away. After that, just text me for changes.
              </p>
              <p className="text-ink-muted leading-relaxed mt-3">
                Cancel Wix or Squarespace? Your site disappears the same day.
              </p>
            </div>

            <p className="text-ink-quiet leading-relaxed">
              <span className="text-ink font-semibold">Skip it if</span>{" "}
              you set it up once and never touch it. Most small business sites fit that — hours don&apos;t change, services stay the same. Save the $59 and text me when something needs updating.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section id="process" className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">The process</Eyebrow>
            <DisplayH2>From first call to live site, in four steps.</DisplayH2>
          </div>

          <div className="border-t border-line">
            {[
              { n: "01", title: "Discovery — Day 1", body: "A quick call. Tell me about your business and what you need the site to do. No pitch, just questions.", arrow: "Clear picture of what I'm building." },
              { n: "02", title: "Proposal — Within 48 hours", body: "Exact scope, timeline, and price — no surprises. Once you approve, I send an intake form. Anything outside the tier, I'll quote separately.", arrow: "Locked plan and start date." },
              { n: "03", title: "Build — about 30 days", body: "You see progress along the way. I test everything before it goes live. Nothing hidden.", arrow: "Working site, tested and ready." },
              { n: "04", title: "Launch — Day of", body: "I hand off the site. By launch, every account is in your name — domain, hosting, analytics.", arrow: "Your site, live and yours." },
            ].map((step) => (
              <div key={step.n} className="grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-14 gap-y-3 py-12 border-b border-line">
                <p className="font-mono text-sm text-accent tracking-widest pt-2">{step.n}</p>
                <h3 className="display-h2 text-2xl md:text-3xl text-ink">{step.title}</h3>
                <div className="col-start-2 text-ink-muted leading-relaxed text-base md:text-lg">
                  <p>{step.body}</p>
                  <p className="mt-3 font-mono text-xs uppercase tracking-widest text-accent">→ {step.arrow}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-l-2 border-accent pl-6 my-12 max-w-2xl">
            <p className="text-ink italic leading-relaxed text-lg">
              Prefer not to get on a call? Same process, just over text. I&apos;ll send you a form that covers everything I&apos;d ask on a call — fill it out on your own time, and we go from there.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WHAT'S NOT INCLUDED — relocated to position 6 ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">Honest scope</Eyebrow>
            <DisplayH2 className="mb-8">What I don&apos;t do — on purpose.</DisplayH2>
            <p className="lede">
              What&apos;s on your tier&apos;s list is what I build. Everything else is a separate conversation — priced up front, no surprise invoices.
            </p>
          </div>

          <div className="border-t border-line">
            {[
              { num: "01", title: "Ongoing marketing.", body: <>No ongoing SEO, ads, social, or Google Business Profile management. I build the site. I don&apos;t run your marketing. Want that handled monthly? <Link to="/contractors" className="link">See the monthly tiers &rarr;</Link></> },
              { num: "02", title: "Photos and brand assets.", body: <>I&apos;ll write the copy — just tell me anything specific you want included and I&apos;ll draft the rest. Photos, logos, and existing brand materials are on you. If you don&apos;t have a logo yet and need something basic to get started, let me know when you reach out — I can help with that separately.</> },
              { num: "03", title: "Post-launch edits.", body: <>Once the site goes live, it&apos;s yours. Ongoing edits aren&apos;t part of the one-time build — but the optional dashboard (more below) lets you update anything yourself in a few clicks.</> },
              { num: "04", title: "Custom systems.", body: <>Custom systems aren&apos;t part of the base tiers — things like e-commerce backends, booking systems, membership logins, and payment processors. But if you already use something like Stripe, Booksy, or Calendly, I can embed the link on your site for free — quick to set up. Need a custom system built from scratch? Tell me upfront and I&apos;ll quote it as its own project.</> },
            ].map((item) => (
              <div key={item.num} className="grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-14 gap-y-3 py-12 border-b border-line">
                <p className="font-mono text-sm text-accent tracking-widest pt-2">{item.num}</p>
                <h3 className="display-h2 text-2xl md:text-3xl text-ink">{item.title}</h3>
                <div className="col-start-2 text-ink-muted leading-relaxed text-base md:text-lg">{item.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STICKY PULL-QUOTE — anchors trust between scope & FAQ ==================== */}
      <section className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 min-h-[60vh]">
          <div className="md:col-span-7 md:col-start-1">
            <div className="sticky-pullquote">
              <Eyebrow accent className="mb-6">What clients say</Eyebrow>
              <PullQuote attribution="Mario Reyes · MarioScape Landscaping">
                Code beats a template. The site loads fast, ranks fast, and the calls keep coming in.
              </PullQuote>
            </div>
          </div>
          <div className="md:col-span-5 md:pt-2 space-y-7 text-ink-muted leading-relaxed text-base md:text-lg max-w-xl">
            <p>
              Every site I ship is built from scratch — written by hand, line by line, for the business in front of me.
            </p>
            <p>
              That&apos;s why the pages load faster than templated sites. It&apos;s why Google ranks them. It&apos;s why your competitors can&apos;t copy them.
            </p>
            <p>
              And when launch day comes, every file is yours.
            </p>
            <p>
              <Link to="/portfolio" className="link">See the work &rarr;</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="section-deep py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-20">
            <Eyebrow accent className="mb-8">Common questions</Eyebrow>
            <DisplayH2>What people ask before we start working together.</DisplayH2>
          </div>

          <div className="border-t border-line">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-line">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:text-accent transition-colors"
                >
                  <span className="text-ink font-medium text-lg md:text-xl">{faq.q}</span>
                  <IconChevronDown
                    className={`w-5 h-5 text-accent flex-shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-ink-muted leading-relaxed text-base md:text-lg">{faq.a}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">Ready to build?</Eyebrow>
            <DisplayH2 className="mb-8">Let&apos;s start your site.</DisplayH2>
            <p className="lede">
              Tell me about your business. I&apos;ll send a proposal — scope, timeline, price — within 48 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <a href="tel:8472208550" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconPhone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Call or Text</span>
                    <span className="text-ink mt-1.5 text-lg group-hover:text-accent transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1.5 text-lg group-hover:text-accent transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-10 border-t border-line">
                <Eyebrow accent className="mb-8">What happens next</Eyebrow>
                <ol className="space-y-6">
                  {[
                    "I read your message myself — usually within a few hours.",
                    "I'll reach back out by call or text.",
                    "I send a proposal with scope, timeline, and price — usually within 48 hours.",
                    "If you approve, I send a one-page agreement and the intake form, then I start the build.",
                  ].map((text, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-5 items-start">
                      <span className="font-mono text-xs text-accent pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-ink-quiet text-base leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-10">
                  <a href="tel:8472208550" className="cta-orbit">
                    Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-ink-faint text-xs italic mt-6 leading-relaxed">
                  Prefer the form? Fill it out — same inbox.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="ed-card-dark">
                <ContactForm
                  source="websites-page"
                  subjectPrefix="[/websites] New build inquiry"
                  showProjectTypeDropdown
                  showPhoneField
                />
              </div>
            </div>
          </div>

          <p className="mt-20 max-w-3xl text-ink-quiet text-base italic leading-relaxed">
            P.S. — If you only need a one-page site, I&apos;ll tell you. I&apos;m not going to talk you into more than you need.
          </p>
        </div>
      </section>
    </Layout>
  );
}
