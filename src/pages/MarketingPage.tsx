import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { Accordion } from "@/components/Accordion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { TldrStrip } from "@/components/ui/tldr-strip";
import { TextMarquee } from "@/components/ui/text-marquee";
import { CountUp } from "@/components/ui/count-up";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Eyebrow, DisplayH1, MonoNum } from "@/components/editorial";
import {
  IconCheck,
  IconX,
  IconPhone,
  IconMail,
  IconArrowRight,
} from "@tabler/icons-react";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/marketing#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "Marketing", "item": "https://thekhan.io/marketing" },
  ],
};

const MARKETING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thekhan.io/marketing#service",
  "name": "Local Marketing — SEO & Google Ads",
  "description": "Websites, Google Ads, and SEO that get home service and local businesses found by the people already searching — across the Chicago area.",
  "provider": { "@id": "https://thekhan.io/#localbusiness" },
  "areaServed": [
    { "@type": "City", "name": "Deerfield", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Highland Park", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Lake Forest", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Lake Bluff", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Northbrook", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Glencoe", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Winnetka", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Wilmette", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Kenilworth", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Bannockburn", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Riverwoods", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Lincolnshire", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Glenview", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Evanston", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Skokie", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Morton Grove", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Niles", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Park Ridge", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Arlington Heights", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Palatine", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Mount Prospect", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Des Plaines", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Buffalo Grove", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Wheeling", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Schaumburg", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Hoffman Estates", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Oak Park", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Elmhurst", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Oak Brook", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Naperville", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Downers Grove", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Orland Park", "containedInPlace": { "@type": "State", "name": "Illinois" } },
    { "@type": "City", "name": "Chicago", "containedInPlace": { "@type": "State", "name": "Illinois" } },
  ],
  "serviceType": [
    "Local Business Marketing",
    "Home Service Business Marketing",
    "Website Design",
    "Google Ads Management",
    "Local SEO",
    "Answer Engine Optimization",
    "Marketing for Contractors",
    "Marketing for Home Services",
    "Marketing for Dentists",
    "Marketing for Med Spas",
    "Marketing for Salons and Barbers",
    "Marketing for Real Estate Agents",
    "Marketing for Restaurants",
    "Marketing for Gyms",
    "Marketing for Auto Shops",
    "Marketing for Law Firms",
  ],
};

// Single source of truth: this array drives BOTH the FAQPage schema below AND
// the visible accordion near the bottom of the page, so they can never drift.
// Worker (worker/index.js) mirrors this text verbatim — update both together.
const faqs = [
  {
    q: "How much does your marketing cost?",
    a: "The Partnership is $950/mo — flat, month-to-month, cancel any month with 72 hours notice before your next bill. It covers your website, Google Business Profile, and ongoing SEO under one brand. The build that starts it, the Foundation, is a one-time $2,100. Want leads right away? Ad Management runs from $500/mo on top, and your ad spend goes straight to Google. Then the monthly plan begins.",
  },
  {
    q: "Can you guarantee me more leads?",
    a: "No — honestly, nobody can guarantee a number. How many leads you get depends on your market, your competition, the season, and your budget — none of which any marketer controls, and anyone promising a specific number is overpromising. What I promise is the work and a real strategy. You're month-to-month the whole way, so give it real time — and if you're not getting the results you wanted, you can walk away, no hard feelings.",
  },
  {
    q: "How long until I start seeing results?",
    a: "Ads are the fast lane — leads within weeks, though they take a couple weeks to a month to settle in. SEO is the long game — some results around 3 months, real movement by 6, the full payoff around a year. Most do both: ads bring leads now while SEO builds.",
  },
  {
    q: "How much should I budget for ads?",
    a: "Depends what you're running — Local Services Ads (LSA) are only offered for certain services, so we'll check if your service qualifies. For both, most start around $1,500/mo (about $1,000 for Search ads and $500 for LSA), paid straight to Google, separate from my fee.",
  },
  {
    q: "Do I own my Google Ads account, or do you?",
    a: "You own it. Always. I run your ads under your own Google Ads account with your card on file. If we ever part ways, everything stays with you. Your ad account's never locked behind me.",
  },
  {
    q: "What if it's not working?",
    a: "I cap myself at a handful of clients, so I catch problems fast — you're not a number lost in a big agency. If something's off, I find it and fix it. And you're month-to-month the whole way, so you're never stuck.",
  },
  {
    q: "If I cancel, do I keep everything?",
    a: "Everything's yours — your site, your domain, your content. Want to just take the files and run with them yourself? No problem at all — I'll send it all over and you can get it live on your own. Rather I handle it? That's where a one-time migration service comes in — I'll set everything up on your own hosting and accounts so you're good to go.",
  },
  {
    q: "What Chicago suburbs do you serve?",
    a: "I work with home service and local businesses across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits.",
  },
  {
    q: "Do you work with businesses running multiple brands?",
    a: "Yes. The Partnership covers one brand — one site, one Google profile, one set of reviews. Just running multiple services under one name? That's all included — one brand, one price. A second brand under a different name gets its own site and profile for +$700/mo. The build for the extra brand is quoted separately based on scope. Running multiple brands? Tell me upfront and I'll lay out what makes sense.",
  },
];

const MARKETING_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/marketing#faq",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export default function MarketingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const painPoints = [
    {
      title: "Your competitor shows up first — you're on page two.",
      body: "Same service, same area, similar reviews. But they're at the top of the map getting the calls that should be yours.",
    },
    {
      title: "You've got a website. It's just not bringing in work.",
      body: "It's online — but the calls and bookings aren't coming. It's not doing its job.",
    },
    {
      title: "You pay for ads, but can't tell if they're working.",
      body: "A monthly report full of numbers nobody explains — you just know it's expensive.",
    },
  ];

  return (
    <Layout activePath="/marketing" contactHref="#contact">
      <SEO
        title="Marketing for Home Service & Local Businesses | TheKhan"
        description="SEO, Google Ads, and Google Business Profile that get you found by people already searching — for home service and local businesses across Chicago. You do the work. I make sure people find you."
        canonical="https://thekhan.io/marketing"
        ogImage="https://thekhan.io/marketing-og.jpg"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, MARKETING_SCHEMA, MARKETING_FAQ_SCHEMA]}
      />

      {/* ==================== HERO (includes micro-strips) ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="gradient-drift" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Eyebrow accent className="mb-8">
              Marketing
            </Eyebrow>

            <ClipReveal trigger="load">
              <DisplayH1 className="max-w-5xl">
                You do the work.
                <br />
                <span className="text-accent">I make sure people find you.</span>
              </DisplayH1>
            </ClipReveal>

            <p className="lede mt-10 max-w-2xl">
              I get you in front of the people already searching for exactly what you do &mdash; and turn those searches into calls and booked work.
            </p>

            <TldrStrip
              bullets={[
                <>Site, Google profile, SEO + AI search, reports &mdash; I handle all of it</>,
                <>The Partnership: <MonoNum>$2,100</MonoNum> one-time &rarr; <MonoNum>$950</MonoNum>/mo, month-to-month</>,
                <>Want leads now? Ads from <MonoNum>$500</MonoNum>/mo on top</>,
              ]}
              links={[
                { label: "Pricing", href: "#pricing" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Are we a fit?", href: "#fit" },
              ]}
            />

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
              <a href="#contact" className="btn-primary">See if it&apos;s a fit &rarr;</a>
              <a href="#pricing" className="btn-outline-accent">See pricing &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEXT MARQUEE — breadth signal: home trades (solid) + local verticals (outlined) ==================== */}
      <section className="section-deep py-8 md:py-10 border-y border-line overflow-hidden space-y-2 md:space-y-3">
        <TextMarquee
          variant="solid"
          durationSec={110}
          items={[
            "Pressure Washing",
            "Window Cleaning",
            "Landscaping",
            "Roofing",
            "HVAC",
            "Plumbing",
            "Electrical",
            "Painting",
            "Gutter Cleaning",
            "Snow Removal",
          ]}
        />
        <TextMarquee
          variant="outlined"
          durationSec={130}
          items={[
            "Dentists",
            "Med Spas",
            "Salons & Barbers",
            "Real Estate",
            "Restaurants",
            "Gyms & Fitness",
            "Auto",
            "Chiropractors",
            "Law Offices",
            "Pet Services",
          ]}
        />
      </section>

      {/* ==================== PAIN GRID ==================== */}
      <section className="section-base py-16 md:py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                Sound familiar?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="max-w-3xl mx-auto">
            {painPoints.map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className={`py-5 md:py-7 ${i > 0 ? "border-t border-accent-line/40" : ""}`}>
                  <h3 className="display-h2 text-2xl md:text-3xl text-ink leading-snug mb-5">
                    {p.title}
                  </h3>
                  <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl">
                    {p.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHY THIS WORKS — intent vs interruption ==================== */}
      <section className="section-deep py-20 md:py-28 px-6 relative z-10 border-t border-line">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <p className="text-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-5">
                Why this works
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold text-ink display-h2 leading-tight">
                I catch people already looking for you.
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.05}>
            <p className="text-ink-muted text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto mb-12">
              When someone types &ldquo;[your service] near me,&rdquo; they&apos;re not browsing &mdash; they&apos;re ready to reach out. That&apos;s who I get you in front of.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="h-full rounded-2xl border border-line p-7 bg-bg-raised/40">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet mb-3">Interrupted scrolling</p>
                <p className="text-ink-muted leading-relaxed">Someone scrolling Facebook who sees your ad wasn&apos;t looking for you. They might glance. They rarely reach out.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="h-full rounded-2xl border-2 border-accent p-7 bg-bg-raised">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-3">Already searching</p>
                <p className="text-ink-muted leading-relaxed">Someone who just searched your exact service already wants it &mdash; they&apos;re only deciding who to pick. That&apos;s the lane I specialize in.</p>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={0.18}>
            <div className="max-w-2xl mx-auto mb-10 rounded-2xl border border-line bg-bg-raised/40 px-6 py-6 md:px-8">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-4">Here&apos;s where you show up</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                  <span className="text-ink-muted text-sm md:text-base leading-relaxed"><strong className="text-ink font-semibold">On Google</strong> &mdash; search your service, and you&apos;re in the results.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                  <span className="text-ink-muted text-sm md:text-base leading-relaxed"><strong className="text-ink font-semibold">On the map</strong> &mdash; your profile, with reviews, photos, tap-to-call.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                  <span className="text-ink-muted text-sm md:text-base leading-relaxed"><strong className="text-ink font-semibold">In AI answers</strong> &mdash; ask ChatGPT &ldquo;best [service] in [town],&rdquo; and your name&apos;s there.</span>
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-center text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              Feed ads have their place. But for most local businesses, the work comes from people actively searching &mdash; and I know firsthand. Before TheKhan, I built my own home service company to <CountUp to={84} className="font-mono text-accent-light" /> clients, and the jobs came from people already looking, not ads I pushed at strangers. So that&apos;s where I put you.
            </p>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link to="/why-intent" className="link">Why I focus on intent &rarr;</Link>
              <Link to="/about" className="text-accent hover:text-ink text-sm tracking-wide underline underline-offset-4 transition-colors">How I got here &rarr;</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="section-raised py-24 md:py-36 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-5">
                What It Costs
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
                The long game &mdash; and leads now.
              </h2>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                I grow your business two ways &mdash; showing up in search over time, and ads for leads right now. Do one, or both.
              </p>
            </ScrollReveal>
          </div>

          {/* ===== LANE 1 — The long game (organic): Step 1 → Step 2 ===== */}
          <ScrollReveal direction="up" delay={0.04}>
            <div className="max-w-4xl mx-auto mb-6 text-center">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-2">The long game &middot; organic</p>
              <p className="text-ink-muted text-sm md:text-base max-w-xl mx-auto">Show up in search and on the map, month after month. Built once, then grown over time.</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 md:items-stretch mb-6 max-w-4xl mx-auto">
            {/* Step 1 — The Foundation (on-ramp) */}
            <ScrollReveal direction="up" delay={0.06}>
              <a href="#contact" aria-label="Start with The Foundation — go to contact form" className="lift h-full bg-bg-raised rounded-2xl border border-line p-8 flex flex-col cursor-pointer hover:border-accent-line transition-colors">
                <h3 className="text-sm tracking-[0.25em] uppercase text-ink-muted font-semibold mb-3">
                  Step 1 &middot; The Foundation
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1">
                  $2,100<span className="text-base font-medium text-ink-quiet"> one-time</span>
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mt-3 mb-5">
                  Your website build plus the SEO foundation to start the Partnership &mdash; my month-to-month marketing.
                </p>
                <ul className="space-y-3">
                  {[
                    <>A custom site, about 8 pages &mdash; <strong className="text-ink font-semibold">fast, mobile, built to rank</strong></>,
                    <>Your Google Business Profile set up and optimized &mdash; <strong className="text-ink font-semibold">so customers can find you on the map when they&apos;re searching nearby</strong></>,
                    <>Tracking installed &mdash; <strong className="text-ink font-semibold">see how people find your site and what they do once they&apos;re there</strong></>,
                    <>Listed across the directories local search trusts &mdash; <strong className="text-ink font-semibold">so your business shows up consistent and correct everywhere people look you up</strong></>,
                    <>A page for each of your top services, submitted to Google as soon as the site is live &mdash; <strong className="text-ink font-semibold">so you can show up for each service people search; one page can&apos;t rank for them all</strong></>,
                    <>A simple dashboard &mdash; <strong className="text-ink font-semibold">swap your own photos and update your hours anytime</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 pt-5 border-t border-line text-ink-muted text-sm italic">
                  Then the Partnership begins &mdash; $950/mo, month-to-month.
                </p>
              </a>
            </ScrollReveal>

            {/* Step 2 — The Partnership (anchor / destination) */}
            <ScrollReveal direction="up" delay={0.1}>
              <a href="#contact" aria-label="Start with The Partnership — go to contact form" className="lift relative h-full bg-bg-raised rounded-2xl border-2 border-accent p-8 flex flex-col cursor-pointer transition-colors">
                <h3 className="text-sm tracking-[0.25em] uppercase text-accent font-semibold mb-3">
                  Step 2 &middot; The Partnership
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-ink mb-1">
                  $950<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">Month-to-month &middot; cancel any month with 72 hours notice before your next bill</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Own your market.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  You show up when people search for what you do, and you own the site for good. The rankings are a spot I hold by keeping the work going.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Your site hosted and kept running &mdash; <strong className="text-ink font-semibold">fast, secure, online, and fixed if anything ever breaks</strong></>,
                    <>Your Google Business Profile actively managed &mdash; <strong className="text-ink font-semibold">reviews replied to, photos and posts kept fresh</strong></>,
                    <>New pages every month &mdash; <strong className="text-ink font-semibold">so people can find you for more services, across more of your area</strong></>,
                    <>A plain-English monthly report &mdash; <strong className="text-ink font-semibold">what you&apos;re ranking for, the leads coming in, and what I&apos;m doing next</strong></>,
                    <>A direct line to me by text or email &mdash; <strong className="text-ink font-semibold">answered within a business day</strong></>,
                    <>You own all of it &mdash; <strong className="text-ink font-semibold">your site, your domain, every file. Yours to own, not rent</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </ScrollReveal>
          </div>

          {/* Another brand — lives in the organic lane */}
          <ScrollReveal direction="up" delay={0.13}>
            <div className="max-w-4xl mx-auto mb-14 md:mb-16">
              <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                <span className="text-ink font-semibold">Another brand</span> &mdash; +$700/mo. A separate brand with its own name, website, and Google profile gets its own marketing, run right alongside your main one (its build quoted separately). Just running more services under one name? Those are all included &mdash; no extra charge.
              </p>
            </div>
          </ScrollReveal>

          {/* Results-timeline strip — bridges organic (slow) and ads (fast) */}
          <ScrollReveal direction="up" delay={0.14}>
            <div className="max-w-3xl mx-auto mb-14 md:mb-16 rounded-2xl border border-accent-line/40 bg-bg-deep/40 px-6 py-5 md:px-8 md:py-6">
              <p className="text-ink-muted text-sm md:text-base leading-relaxed text-center">
                <strong className="text-accent-light font-semibold">SEO is a long game</strong> &mdash; most see something around 3 months, real movement by 6, and the compounding payoff around a year. Ads bring leads now while it builds.
              </p>
            </div>
          </ScrollReveal>

          {/* ===== LANE 2 — Ads (Ad Management), standalone-capable ===== */}
          <ScrollReveal direction="up" delay={0.16}>
            <div className="max-w-4xl mx-auto mb-14 md:mb-16">
              <div className="text-center mb-6">
                <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-2">Leads now &middot; ads</p>
              </div>
              <div className="bg-bg-raised rounded-2xl border border-line p-8 md:p-10">
                <div className="flex items-baseline justify-between flex-wrap gap-x-4 gap-y-1 mb-4">
                  <h3 className="text-sm tracking-[0.25em] uppercase text-ink-muted font-semibold">Ad Management</h3>
                  <p className="text-ink font-semibold text-lg leading-snug">Leads now.</p>
                </div>
                <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-6">
                  Ads put you in front of people searching today, and switch off the moment you want. Already happy with your site and digital foundation and just want ads run? I&apos;ll do that on its own &mdash; or run them alongside the Partnership, leads now while your organic builds.
                </p>

                {/* Price menu */}
                <div className="rounded-xl border border-line bg-bg-quiet/40 px-5 py-4 md:px-6 md:py-5 mb-6 space-y-2.5">
                  <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                    <span className="text-ink font-semibold">Google Search ads</span> &mdash; $500/mo, or 15% of ad spend, whichever is greater
                  </p>
                  <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                    <span className="text-ink font-semibold">Local Services Ads</span> &mdash; $150/mo flat
                  </p>
                  <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                    <span className="text-ink font-semibold">Both</span> &mdash; $600/mo, or 15% of ad spend, whichever is greater
                  </p>
                </div>

                {/* Setup / landing-page block */}
                <p className="text-ink-muted text-sm leading-relaxed mb-6">
                  When someone clicks your ad, it takes them to a landing page built to do one thing: get them to call you, or fill out a quick form that lands right in your inbox. Your first one&apos;s included. Want ads on their own? A one-time setup covers building that page and getting your ads up and running &mdash; I&apos;ll quote it on a call. Already on the Partnership? The setup&apos;s included.
                </p>

                <ul className="space-y-3 mb-6">
                  {[
                    <>Every month I review and adjust your ads <strong className="text-ink font-semibold">to keep them bringing in calls</strong></>,
                    <>Your ad spend is paid straight to Google from your card &mdash; <strong className="text-ink font-semibold">you see exactly what&apos;s going out, and I never mark it up or take a cut</strong></>,
                    <>A monthly report &mdash; <strong className="text-ink font-semibold">what you spent, and the leads it brought in</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-sm text-ink-quiet">On its own or as part of the Partnership &middot; cancel anytime</p>
              </div>
            </div>
          </ScrollReveal>

          {/* ===== EXTRAS — Email marketing (single) ===== */}
          <ScrollReveal direction="up" delay={0.18}>
            <div className="max-w-2xl mx-auto text-center">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent mb-3">Extra</p>
              <p className="text-ink-muted text-sm md:text-base leading-relaxed">
                <span className="text-ink font-semibold">Email marketing</span> &mdash; $300 to set up, first campaign included. After that, send campaigns yourself anytime at no extra cost, or have me run each one for $150. A simple way to get more repeat work from the customers you already have.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ==================== HOW THIS WORKS + TERMS — paired ==================== */}
      <section id="how-it-works" className="section-base py-20 md:py-28 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          {/* How this works — 2-col */}
          <ScrollReveal direction="up">
            <h2 className="display-h2 text-2xl md:text-4xl text-ink mb-10 md:mb-14 text-center">
              How this works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-10 md:mb-14">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-4">
                  My side
                </p>
                <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                  I handle the digital side &mdash; your website, your Google profile, getting you found on Google and AI search, the ads when you want them, all the writing, and your monthly report.
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-4">
                  Your side
                </p>
                <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                  Your side&apos;s simple &mdash; send me photos from your jobs, and ask happy customers for a review.
                </p>
              </div>
            </div>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto italic">
              The heavy lifting&apos;s on me &mdash; you just keep doing the work.
            </p>
          </ScrollReveal>

          {/* Terms — inset card */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="mt-16 md:mt-20 bg-bg-raised rounded-2xl border border-line px-8 py-10 md:px-12 md:py-14">
              <h3 className="display-h2 text-xl md:text-2xl text-ink mb-5 text-center">
                The terms
              </h3>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center">
                The build and setup are <strong className="text-accent-light font-semibold">paid up front, non-refundable</strong> &mdash; that covers building your whole foundation. After that it&apos;s <strong className="text-accent-light font-semibold">month-to-month</strong> &mdash; you can cancel any month with 72 hours notice before your next bill. <strong className="text-accent-light font-semibold">Your site, your domain, and your Google profile stay yours.</strong>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== POLARIZER ==================== */}
      <section id="fit" className="section-raised py-24 md:py-36 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-12 max-w-2xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                Are we a fit?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6 mb-8" />
              <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                Getting found is a long game &mdash; it compounds over time, like the gym. This is an investment in your business, not a quick fix, so let me be straight about who it&apos;s for.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* This is for you if */}
            <ScrollReveal direction="up" delay={0.05}>
              <div className="h-full bg-bg-raised rounded-2xl border border-accent p-8">
                <p className="text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                  This is for you if
                </p>
                <ul className="space-y-5">
                  {[
                    "You're good at the work but slow months still scare you.",
                    "This is your full-time business — not a side gig.",
                    "You want to actually understand what you're paying for — not just \"trust me, it's working.\"",
                    "You're in it for the long game — you can give it a few months to build, not expect it overnight.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-soft border border-accent flex items-center justify-center mt-0.5">
                        <IconCheck className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <p className="text-ink-muted text-base leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* This isn't for you if */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="h-full bg-bg-raised rounded-2xl border border-line p-8">
                <p className="text-ink-muted text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                  This isn&apos;t for you if
                </p>
                <ul className="space-y-5">
                  {[
                    "You want me to guarantee a specific number of leads — no marketer honestly can.",
                    "You need results this week. SEO takes months to build, and even ads need a few weeks to get going — nothing real is instant.",
                    "You're not ready to invest — the Foundation to start, then $950/mo ongoing.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center mt-0.5">
                        <IconX className="w-3.5 h-3.5 text-ink-faint" />
                      </div>
                      <p className="text-ink-muted text-base leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.15}>
            <p className="text-center text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-12">
              I work with a handful of businesses at a time, so the ones I take on get my full attention.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="section-deep py-24 md:py-36 px-6 relative z-10 border-t border-line scroll-mt-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                Questions I get a lot
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>
          <Accordion items={faqs.map((faq) => ({ title: faq.q, content: faq.a }))} />
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-base py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
              Interested in growing your business? Let&apos;s talk.
            </h2>
            <p className="text-ink-muted text-lg max-w-xl mx-auto">
              Tell me what your business does and what you need &mdash; or if you&apos;re not sure what you need, let&apos;s figure it out. Either way, I&apos;ll tell you if I&apos;m the right person to help.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-start">
              <div className="space-y-6">
                <a href="tel:8472208550" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-accent-soft border border-accent flex items-center justify-center group-hover:border-accent transition-colors flex-shrink-0">
                    <IconPhone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-accent text-sm font-medium">Call or Text</span>
                    <span className="text-ink-muted group-hover:text-ink transition-colors">(847) 220-8550</span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-accent-soft border border-accent flex items-center justify-center group-hover:border-accent transition-colors flex-shrink-0">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-accent text-sm font-medium">Email</span>
                    <span className="text-ink-muted group-hover:text-ink transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-line w-full">
                <p className="text-accent text-sm font-medium uppercase tracking-widest mb-6 pt-6">What happens next</p>
                <ol className="space-y-5">
                  <li className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <span className="font-mono text-xs text-accent pt-1">01</span>
                    <p className="text-ink-muted text-sm leading-relaxed">I read your message myself &mdash; usually within a few hours.</p>
                  </li>
                  <li className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <span className="font-mono text-xs text-accent pt-1">02</span>
                    <p className="text-ink-muted text-sm leading-relaxed">I&apos;ll reach back out by call or text.</p>
                  </li>
                  <li className="grid grid-cols-[auto_1fr] gap-4 items-start">
                    <span className="font-mono text-xs text-accent pt-1">03</span>
                    <p className="text-ink-muted text-sm leading-relaxed">If it feels right, we&apos;ll get on a longer call to make a plan.</p>
                  </li>
                </ol>
                <div className="mt-8">
                  <a href="tel:8472208550" className="cta-orbit">
                    Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-ink-quiet text-xs italic mt-5 leading-relaxed">
                  Prefer the form? Fill it out — it comes straight to me.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-bg-raised rounded-2xl p-8 border border-line">
                <ContactForm
                  source="marketing-page"
                  subjectPrefix="[Marketing form]"
                  showPhoneField
                  showTradeDropdown
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
