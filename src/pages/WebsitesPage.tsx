import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Accordion } from "@/components/Accordion";
import { Eyebrow, DisplayH1, DisplayH2, MonoNum } from "@/components/editorial";
import { TldrStrip } from "@/components/ui/tldr-strip";
import { TextMarquee } from "@/components/ui/text-marquee";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { IconPhone, IconMail, IconCheck, IconArrowRight } from "@tabler/icons-react";

const faqs = [
  { q: "Do I need my own domain?", a: "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again." },
  { q: "Where will my site be hosted?", a: "Your call. If you just want the site built, I set it up on your own account, in your name — you own it outright. If you'd rather I keep it running, that's Website Care ($50/mo): I host it, keep it fast and secure, and you edit it yourself anytime. Either way, every file is yours — move it whenever you want." },
  { q: "Can you migrate my existing Wix or Squarespace site?", a: "I'll use your existing copy, photos, and content — anything that's yours, I move over. But I rebuild the site fresh, which gets you a faster, cleaner result than dragging an old template along. Priced like any new build — Brochure, Standard, or Custom, depending on what you need." },
  { q: "Why not just use Wix or Squarespace?", a: "Two reasons. First, speed — builders like Wix carry a lot of extra weight, so they load slower; yours is built lean, so it's fast. Second, and bigger: with most builders you can't really take your site with you — you're stuck on their platform, and leaving means rebuilding from scratch. A custom site is different — every file is yours, text and images and all, so you can host it anywhere or hand it to any developer, anytime." },
  { q: "What if my content isn't ready yet?", a: "That's normal. Most people don't have polished copy or photos lined up before they hire me. I'll write the copy from what you tell me — you just review it. For photos, I'll tell you exactly what I need and help you figure out how to source it." },
  { q: "What do I need to provide?", a: "I write all the copy — and the form I send lets you flag any direction or specifics you want. Photos, your logo, and any brand materials are on you. No logo yet? I can put together something basic for a small added fee — just mention it when you reach out." },
  { q: "What if I want changes after launch?", a: "Two ways. Website Care ($50/mo) lets you update your own photos, hours, prices, and text anytime — no tech skills needed. Without it, the site's still yours; a bigger change down the road is a quick separate quote. Most small business sites barely change, so plenty of people start without the dashboard and add it later if they need it." },
  { q: "Do I sign a long-term contract?", a: "No. Site-only builds (Brochure, Standard, or Custom) are one-time projects — 50% paid Day 1 to start the build, 50% on launch, no monthly fee. The Foundation includes The Partnership — my monthly marketing — which begins after the first month at $950/mo, billed month-to-month, cancel any month with 72 hours notice before your next bill. Website Care ($50/mo) is also month-to-month with the same 72-hour cancel." },
  { q: "How and when do I pay?", a: "Site-only builds: 50% paid Day 1 to start the build, 50% on launch. The Foundation: paid Day 1, non-refundable. Either way — card or Zelle, your call. Invoiced upfront, no hidden fees, no surprise invoices." },
];

const PAGE_TITLE = "Custom Web Design — Deerfield, IL | Sites You Own";
const PAGE_DESC = "Custom websites built from scratch in about 30 days. You own every file, the domain, the logins. No retainer, no lock-in. Deerfield, IL.";
const PAGE_URL = "https://thekhan.io/websites";
const OG_IMAGE = "https://thekhan.io/websites-og.png";

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
    { "@type": "Offer", "name": "Brochure Site", "price": "750", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Standard Site", "price": "1500", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "The Foundation", "price": "2100", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Website Care", "price": "50", "priceCurrency": "USD" }
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
  was?: string;
  priceNote?: string;
  blurb: string;
  features: React.ReactNode[];
  revisions?: string;
  inheritsFrom?: string;
  ctaLabel: string;
  featured?: boolean;
}

function Tier({ name, price, was, priceNote, blurb, features, revisions, inheritsFrom, ctaLabel, featured }: TierProps) {
  return (
    <a
      href="#contact"
      aria-label={`${ctaLabel} — go to contact form`}
      className={`lift relative h-full flex flex-col p-10 md:p-12 border ${featured ? "border-accent border-2" : "border-line"} bg-bg-raised cursor-pointer transition-colors`}
    >
      {featured && (
        <p className="absolute -top-3 left-10 bg-accent text-ink px-3 py-1 font-mono text-[10px] tracking-widest uppercase">
          Most common
        </p>
      )}
      <Eyebrow accent className="mb-4">{name}</Eyebrow>
      <div className="flex items-baseline gap-3 mb-3">
        <span className="display-h2 text-5xl md:text-6xl text-ink">{price}</span>
        {was && <span className="font-mono text-sm text-ink-faint line-through">{was}</span>}
        {priceNote && <span className="font-mono text-xs tracking-widest uppercase text-ink-quiet">{priceNote}</span>}
      </div>
      <p className="text-ink-quiet text-sm italic mb-8">{blurb}</p>
      {inheritsFrom && (
        <p className="font-mono text-[11px] tracking-widest uppercase text-accent mb-4">
          Everything in {inheritsFrom}, plus:
        </p>
      )}
      <ul className="space-y-3 mb-6">
        {features.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-ink-muted text-sm leading-relaxed">
            <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {revisions && (
        <p className="flex items-start gap-3 text-ink-muted text-sm leading-relaxed mb-10">
          <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <span>{revisions}</span>
        </p>
      )}
      <span className={`mt-auto ${featured ? "btn-primary text-sm" : "btn-ghost text-sm"}`}>
        {ctaLabel}
      </span>
    </a>
  );
}

export default function WebsitesPage() {
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
              <span className="text-accent">Built to work for you.</span>
            </DisplayH1>
          </ClipReveal>
          <p className="lede mt-12 max-w-2xl">
            A fast, clean site built to guide people toward reaching out — yours to keep, no monthly fees.
          </p>

          <TldrStrip
            bullets={[
              <>A site built just for you, ready in about 30 days</>,
              <><strong className="text-ink font-semibold">Brochure</strong> <MonoNum>$750</MonoNum><span className="text-ink-faint mx-2" aria-hidden="true">&#9474;</span><strong className="text-ink font-semibold">Standard</strong> <MonoNum>$1,500</MonoNum><span className="text-ink-faint mx-2" aria-hidden="true">&#9474;</span><strong className="text-ink font-semibold">Custom</strong> quoted</>,
              <>Yours to own, not rent &mdash; take it anywhere</>,
            ]}
            links={[
              { label: "Pricing", href: "#pricing" },
              { label: "Process", href: "#process" },
              { label: "FAQ", href: "#faq" },
            ]}
          />

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a href="#contact" className="btn-primary">Start your build &rarr;</a>
          </div>
          <p className="mt-10">
            <Link to="/portfolio" className="link text-sm">
              See the sites I&apos;ve built &rarr;
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
              One-time website builds. A single page can only do a job or two well, so the Brochure stays focused — the essentials, plus an easy way to reach out. But one page only holds so much before it feels crammed, so the more services and details you want prospects and customers to see, the more pages it&apos;ll take. That&apos;s where the Standard Site comes in.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Tier
              name="Brochure Site"
              price="$750"
              blurb="For a business that needs a real, findable home online — one strong page doing all the work."
              features={[
                <>One custom page — <strong className="text-ink font-semibold">services, about, and contact in one clean scroll</strong></>,
                <>Fast loading, mobile-first — <strong className="text-ink font-semibold">no template, no monthly platform fee.</strong></>,
                <>Contact form, click-to-call, and map — <strong className="text-ink font-semibold">easy ways to reach you.</strong></>,
                <>Built to be found — <strong className="text-ink font-semibold">structured so Google can find and understand it.</strong></>,
                <>The page, domain, and logins — <strong className="text-ink font-semibold">yours from day one.</strong></>,
              ]}
              revisions="2 rounds of revisions before launch"
              ctaLabel="Start a Brochure Site →"
            />
            <Tier
              name="Standard Site"
              price="$1,500"
              blurb="The recommended option — room for your services, your proof, and the searches your customers run."
              inheritsFrom="Brochure Site"
              featured
              features={[
                <>5 pages — <strong className="text-ink font-semibold">home, about, services, contact, plus one more (gallery or FAQ)</strong></>,
                <>Copywriting on every page — <strong className="text-ink font-semibold">written to turn visitors into calls, not just fill space</strong></>,
                <>Testimonials and FAQ sections — <strong className="text-ink font-semibold">your real reviews, set up to build trust before they reach out</strong></>,
                <>Booking, payment, or scheduling buttons — <strong className="text-ink font-semibold">send me the link and I&apos;ll build it right into the site</strong></>,
              ]}
              revisions="3 rounds of revisions before launch"
              ctaLabel="Start a Standard Site →"
            />
          </div>

          {/* Custom — demoted to a strip below the two cards (not a 3rd equal tier) */}
          <div className="mt-6 border border-line bg-bg-raised p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-accent mb-2">Custom</p>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
                Need something custom? More pages, multiple locations, or something special &mdash; let&apos;s scope it together.
              </p>
            </div>
            <a href="#contact" className="btn-ghost text-sm whitespace-nowrap flex-shrink-0">Reach out &rarr;</a>
          </div>

          {/* Site-vs-marketing split — make it unmissable */}
          <p className="max-w-2xl mx-auto mt-20 text-center text-ink-muted text-base md:text-lg leading-relaxed">
            These are just sites &mdash; built once, yours to keep. Getting online is the easy part; showing up when people search, month after month, is marketing &mdash; that&apos;s where the Foundation comes in.
          </p>

          {/* The Foundation — where marketing starts */}
          <div className="mt-8">
            <div className="ed-card max-w-3xl">
              <Eyebrow accent className="mb-4">Where the marketing starts</Eyebrow>
              <h3 className="display-h2 text-3xl md:text-4xl text-ink mb-3">The Foundation</h3>
              <div className="flex items-baseline gap-3 mb-4 flex-wrap">
                <span className="display-h2 text-5xl md:text-6xl text-ink">$2,100</span>
                <span className="text-ink-quiet text-sm italic">one-time</span>
              </div>
              <p className="text-ink-muted text-base leading-relaxed mb-6">
                If you want more than a website &mdash; the ongoing marketing that gets you found &mdash; this is it. A custom site plus the setup that starts The Partnership, my month-to-month marketing.
              </p>
              <ul className="space-y-3">
                {[
                  <>A custom site, about 8 pages — <strong className="text-ink font-semibold">fast, mobile, built to rank</strong></>,
                  <>Your Google Business Profile set up and optimized — <strong className="text-ink font-semibold">you show up on the map for your services and area</strong></>,
                  <>Tracking installed — <strong className="text-ink font-semibold">you see where every call and click is coming from</strong></>,
                  <>Listed across the directories local search trusts — <strong className="text-ink font-semibold">so customers find you when they&apos;re looking nearby.</strong></>,
                  <>Your first service pages built and submitted to Google from day one — <strong className="text-ink font-semibold">the foundation that gets you found for what you do.</strong></>,
                  <>A simple dashboard — <strong className="text-ink font-semibold">swap your own photos and update your hours anytime.</strong></>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-ink-quiet text-sm italic">
                Paid Day 1, non-refundable. Day 31, the Partnership begins — $950/mo, month-to-month.
              </p>
              <Link to="/marketing" className="btn-primary text-sm mt-8">
                See how the marketing works &rarr;
              </Link>
            </div>
          </div>

          <div className="max-w-3xl mt-24 pt-16 border-t border-line">
            <DisplayH2 className="text-3xl md:text-4xl mb-8">How payment works.</DisplayH2>
            <div className="space-y-6 text-ink-muted text-base md:text-lg leading-relaxed">
              <p>
                <span className="text-ink font-semibold">Site-only build (Brochure, Standard, or Custom).</span>{" "}
                50% paid Day 1 to start the build, 50% on launch. Live in about 30 days. One-time project — no monthly fee.
              </p>
              <p>
                <span className="text-ink font-semibold">The Foundation.</span>{" "}
                Month one is where I build your site and set up the foundation to start the ongoing marketing. After that, the Partnership begins — $950/mo, month-to-month, cancel any month with 72 hours notice before your next bill.
              </p>
              <p>
                <span className="text-ink font-semibold">Either way.</span>{" "}
                The site is yours at launch. <strong className="text-accent-light font-semibold">Optional</strong> Website Care ($50/mo, further down) is month-to-month.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== WEBSITE CARE ==================== */}
      <section className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">Website Care</Eyebrow>
            <DisplayH2 className="mb-8">Edit your site yourself.</DisplayH2>
            <p className="lede">
              Update your own photos, hours, prices, and text anytime — from your phone or computer, no tech skills needed. Tell me what you want to be able to edit, and I&apos;ll set your dashboard up around that.
            </p>
          </div>

          <div className="ed-card space-y-8">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="display-h2 text-5xl md:text-6xl text-ink">$50</span>
              <span className="text-ink-muted">/month</span>
              <span className="text-ink-quiet text-sm italic ml-2">
                <strong className="text-accent-light font-semibold not-italic">Optional.</strong>{" "}
                Month-to-month — cancel any month with 72 hours notice before your next bill.
              </span>
            </div>

            <p className="text-ink-muted leading-relaxed">
              I keep it hosted, fast, secure, and online — and if anything ever breaks, I fix it.
            </p>

            <div className="border-l-2 border-accent pl-6">
              <p className="text-ink font-semibold mb-2">How this is different from Wix:</p>
              <p className="text-ink-muted leading-relaxed">
                You own your whole site. Cancel anytime and you keep every file — take it and host it anywhere. Cancel Wix or Squarespace and your site&apos;s gone the same day; you&apos;d start over from scratch.
              </p>
            </div>

            <p className="text-ink-quiet leading-relaxed">
              <span className="text-ink font-semibold">Don&apos;t need it?</span>{" "}
              Most small business sites barely change — hours and services stay put. If yours is set-and-forget, you may not need this at all.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== PROCESS — sage numbered timeline, 2-col ==================== */}
      <section id="process" className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Left — heading + the prefer-text note */}
          <div className="md:col-span-5">
            <Eyebrow accent className="mb-8">The process</Eyebrow>
            <DisplayH2 className="mb-10">First call to live site, in four steps.</DisplayH2>
            <div className="border-l-2 border-accent pl-6 max-w-md">
              <p className="text-ink-muted leading-relaxed">
                Prefer not to hop on a call? Same process by text — I&apos;ll send a form covering everything I&apos;d ask, fill it out whenever.
              </p>
            </div>
          </div>

          {/* Right — numbered sage timeline */}
          <div className="md:col-span-6 md:col-start-7">
            {[
              { n: "01", title: "Discovery (Day 1)", body: "A quick call: what your business does, what the site needs to do. No pitch." },
              { n: "02", title: "Proposal (48–72 hours)", body: "Exact scope, timeline, and price. Approve it, and we're on." },
              { n: "03", title: "Build (~30 days)", body: "You see progress as it comes together; I test everything before launch." },
              { n: "04", title: "Launch (day of)", body: "I hand it off — every account in your name: domain, hosting, analytics." },
            ].map((step, i, arr) => (
              <ScrollReveal key={step.n} direction="up" delay={i * 0.06}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0">
                      {step.n}
                    </div>
                    {i < arr.length - 1 && <AnimatedUnderline vertical className="flex-1 min-h-[36px] my-2" />}
                  </div>
                  <div className="pb-10 pt-1.5">
                    <p className="text-ink font-semibold text-lg md:text-xl mb-1.5">{step.title}</p>
                    <p className="text-ink-muted leading-relaxed">{step.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HONEST SCOPE — single callout ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-3xl mx-auto">
          <Eyebrow accent className="mb-8">Honest scope</Eyebrow>
          <p className="text-ink text-xl md:text-2xl leading-relaxed">
            What&apos;s on your tier is what I build. Anything else &mdash; ongoing marketing, custom systems, post-launch changes &mdash; is a separate conversation, priced up front. No surprise invoices.
          </p>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="section-deep py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="mb-20">
            <Eyebrow accent className="mb-8">Common questions</Eyebrow>
            <DisplayH2>What people ask before getting started.</DisplayH2>
          </div>

          <Accordion items={faqs.map((faq) => ({ title: faq.q, content: faq.a }))} />
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-20 max-w-3xl">
            <Eyebrow accent className="mb-8">Ready to build?</Eyebrow>
            <DisplayH2 className="mb-8">Let&apos;s start your site.</DisplayH2>
            <p className="lede">
              Tell me about your business. I&apos;ll send a proposal — scope, timeline, price — within 48–72 hours.
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
                    <span className="text-ink mt-1.5 text-lg group-hover:text-accent-light transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1.5 text-lg group-hover:text-accent-light transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-10 border-t border-line">
                <Eyebrow accent className="mb-8">What happens next</Eyebrow>
                <ol className="space-y-6">
                  {[
                    "I read your message myself — usually within a few hours.",
                    "I'll reach back out by call or text.",
                    "I send a proposal with scope, timeline, and price — usually within 48–72 hours.",
                    "If you approve, I send a one-page agreement and a form, then I start the build.",
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
                  Prefer the form? Fill it out — it comes straight to me.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="ed-card-dark">
                <ContactForm
                  source="websites-page"
                  subjectPrefix="[Websites form]"
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
