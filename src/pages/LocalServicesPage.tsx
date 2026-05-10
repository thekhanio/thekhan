import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
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
  "@id": "https://thekhan.io/local-services#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "Local Services", "item": "https://thekhan.io/local-services" },
  ],
};

const LOCAL_SERVICES_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thekhan.io/local-services#service",
  "name": "Local Services Business Marketing",
  "description": "Websites, Google Ads, and SEO for local services businesses in Chicago — healthcare, dental, real estate, financial, beauty & wellness, pet services, and personal services.",
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
    "Local Services Business Marketing",
    "Website Design",
    "Google Ads Management",
    "Local SEO",
    "Marketing for Healthcare",
    "Marketing for Dental Offices",
    "Marketing for Real Estate Agents",
    "Marketing for Financial Planners",
    "Marketing for Tax Preparers",
    "Marketing for Beauty & Wellness",
    "Marketing for Pet Services",
    "Marketing for Personal Services",
  ],
};

const LOCAL_SERVICES_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/local-services#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does marketing for local services businesses cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three monthly tiers: Foundation ($600/mo), Engine ($1,260/mo — most common), and Partnership ($2,200/mo). Build + setup is a one-time $1,699 (Spring 2026 launch pricing through June 30, 2026; $2,400 after). Your monthly tier kicks in Day 31. Month-to-month — cancel any month with 72 hours notice before your next bill.",
      },
    },
    {
      "@type": "Question",
      "name": "How long before I see more clients?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads can start driving calls and inquiries shortly after launch. Local SEO is the long game — it compounds over time. You'll usually start seeing some results around 3 months, real movement on the needle by 6 months, and the full payoff around the 1-year mark. That's why most local services businesses run both: ads bring inquiries right away while SEO builds for the long haul. If you want results now, ads is the play. If you want the long-term win, SEO. Both gets you both. I'll tell you which fits your timeline and budget before we start, not after.",
      },
    },
    {
      "@type": "Question",
      "name": "What kinds of local services businesses do you work with?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Healthcare practices, dental offices, real estate agents, financial planners, tax preparers, beauty & wellness, pet services, and personal services — independent local businesses where someone Googles the service in their area and picks one. If your business is LSA-eligible (Local Services Ads through Google) or shows up in the local map pack, the playbook fits.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I own my Google Ads account, or do you?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You own it. Always. I run your ads under your own Google Ads account with your card on file. If we ever part ways, everything stays with you. Nothing of yours is locked behind me.",
      },
    },
    {
      "@type": "Question",
      "name": "What happens if the marketing doesn't work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Month-to-month means you're never locked in. Cancel any month with 72 hours notice before your next bill. I cap myself at a handful of clients per year specifically so I can pay attention to each one — if something isn't working, I find out fast and fix it, not 90 days later when your next invoice hits. Everything stays in your name, so canceling doesn't cost you what we've built.",
      },
    },
    {
      "@type": "Question",
      "name": "What Chicago suburbs do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I work with local services businesses across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you work with franchise locations?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. I work with independents — local services businesses where the owner makes the marketing call. If your franchise has corporate-mandated marketing or HQ approval rules, the playbook won't fit. Independents only.",
      },
    },
  ],
};

export default function LocalServicesPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const painPoints = [
    {
      title: "People in your area are searching for what you do. They're not finding you.",
      body: "When someone Googles your service, they see three other businesses first — never yours. You're losing the click before they even know you're there.",
    },
    {
      title: "Your website looks the part. Nobody's reaching out.",
      body: "Maybe you spent good money on it. Maybe a friend built it. Either way, it's online — but the calls, bookings, and form fills aren't coming. Your site isn't doing the work.",
    },
    {
      title: "You pay for ads. You can't tell if they work.",
      body: "Whether you run them yourself or pay someone, there's a monthly report full of numbers nobody explains. You can't tell if the new client came from the ad, the listing, or a word-of-mouth referral. You just know it's expensive.",
    },
    {
      title: "Your competitor keeps showing up first.",
      body: "Same area. Same service. Similar reviews. But they're at the top of the map and you're on page two. They're getting the customers you should be getting.",
    },
  ];

  return (
    <Layout activePath="/local-services" contactHref="#contact">
      <SEO
        title="Marketing for Local Services Businesses | TheKhan"
        description="Local services marketing that brings in real business. Healthcare, dental, real estate, financial, beauty & wellness, pet services. Month-to-month, no contracts."
        canonical="https://thekhan.io/local-services"
        ogImage="https://thekhan.io/local-services-og.png"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, LOCAL_SERVICES_SCHEMA, LOCAL_SERVICES_FAQ_SCHEMA]}
      />

      {/* ==================== HERO (includes micro-strips) ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-16 md:pb-20 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="gradient-drift" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto">
          <div className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <Eyebrow accent className="mb-8">
              For Local Services
            </Eyebrow>

            <ClipReveal trigger="load">
              <DisplayH1 className="max-w-5xl">
                You do the work.
                <br />
                <span className="text-accent">I make sure people find you.</span>
              </DisplayH1>
            </ClipReveal>

            <p className="lede mt-10 max-w-2xl">
              Local services marketing that brings in real business.
            </p>

            <TldrStrip
              bullets={[
                <>Site, SEO, ads, reviews, reports &mdash; I run all of it</>,
                <>3 tiers: <MonoNum>$600</MonoNum>, <MonoNum>$1,260</MonoNum>, or <MonoNum>$2,200</MonoNum>/mo</>,
                <>Month-to-month &mdash; cancel any month with 72 hours notice</>,
              ]}
              links={[
                { label: "Pricing", href: "#pricing" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Am I a fit?", href: "#fit" },
              ]}
            />

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
              <a href="#contact" className="btn-primary">See if we&apos;re a fit &rarr;</a>
              <a href="#pricing" className="btn-outline-accent">See pricing &rarr;</a>
            </div>

            {/* Micro-strips — now inside the hero's light section */}
            <div className="mt-14 md:mt-16 space-y-3">
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; I work with a handful of local service businesses at a time.
              </p>
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[475ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; Before TheKhan, I built my own home service company to <CountUp to={84} className="font-mono text-accent-light" /> clients. Closed it in March &mdash; the phone still rings from the SEO work I did &mdash; and those calls now go to the businesses I work with.
              </p>
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[550ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; Serving local service businesses across Chicagoland &mdash; Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Remote clients welcome anywhere in the US.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TEXT MARQUEE — 2-row, categories solid + specific verticals outlined ==================== */}
      <section className="section-deep py-8 md:py-10 border-y border-line overflow-hidden space-y-2 md:space-y-3">
        <TextMarquee
          variant="solid"
          durationSec={110}
          items={[
            "Healthcare",
            "Dental",
            "Real Estate",
            "Financial Planning",
            "Tax Services",
            "Beauty & Wellness",
            "Pet Services",
            "Personal Services",
          ]}
        />
        <TextMarquee
          variant="outlined"
          durationSec={130}
          items={[
            "Dentists",
            "Lawyers",
            "Real Estate Agents",
            "Salons",
            "Barbers",
            "Chiropractors",
            "Personal Trainers",
            "Vets",
            "Tutors",
            "Pet Groomers",
            "Locksmiths",
            "Movers",
          ]}
        />
      </section>

      {/* ==================== PAIN GRID ==================== */}
      <section className="section-base py-24 md:py-36 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
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
                <div className={`py-8 md:py-12 ${i > 0 ? "border-t border-accent-line/40" : ""}`}>
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

      {/* ==================== FULL STORY LINK ==================== */}
      <section className="section-deep py-10 md:py-12 px-6 relative z-10 border-y border-line">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <Link to="/about" className="text-accent hover:text-ink text-sm tracking-wide underline underline-offset-4 transition-colors">
              How I got here &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="section-raised py-24 md:py-36 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-5">
                What It Costs
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
                Three tiers, all month-to-month.
              </h2>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                Build + setup is a one-time $1,699. Your monthly tier kicks in Day 31.
              </p>
              <p className="font-mono text-[11px] tracking-widest uppercase text-accent mt-4">
                <span className="line-through text-ink-faint">$2,400</span> — Spring 2026 launch pricing, locked through June 30, 2026
              </p>
            </ScrollReveal>
          </div>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-6 md:items-stretch mb-16 md:mb-24">
            {/* Foundation */}
            <ScrollReveal direction="up" delay={0.05}>
              <a href="#contact" aria-label="See if Foundation is a fit — go to contact form" className="lift md:mt-8 h-full bg-bg-raised rounded-2xl border border-line p-8 flex flex-col cursor-pointer hover:border-accent-line transition-colors">
                <h3 className="text-sm tracking-[0.25em] uppercase text-ink-muted font-semibold mb-3">
                  Foundation
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1">
                  $600<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">$20 a day</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Get found.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  For local services businesses still surviving on referrals and repeat customers.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Site hosted and monitored &mdash; <strong className="text-ink font-semibold">secure, with contact form always working</strong></>,
                    <>Google Business Profile kept active &mdash; <strong className="text-ink font-semibold">photos and posts published, reviews and edits caught fast</strong></>,
                    <>Every review replied to in your voice &mdash; <strong className="text-ink font-semibold">typically by next business day</strong></>,
                    <>One new page every month &mdash; <strong className="text-ink font-semibold">service, city, or FAQ that brings in calls you&apos;re missing</strong></>,
                    <>Monthly 1-page report in plain English &mdash; <strong className="text-ink font-semibold">traffic, leads, AI-search visibility, what&apos;s next</strong></>,
                    <>Dashboard to edit your site yourself &mdash; <strong className="text-ink font-semibold">at yourdomain.com/admin</strong></>,
                    <>Text or email me direct &mdash; <strong className="text-ink font-semibold">next-business-day response, no middlemen</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </ScrollReveal>

            {/* Engine — anchor */}
            <ScrollReveal direction="up" delay={0.1}>
              <a href="#contact" aria-label="See if Engine is a fit — go to contact form" className="lift relative h-full bg-bg-raised rounded-2xl border-2 border-accent p-8 flex flex-col cursor-pointer transition-colors">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-ink text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap">
                  Most Common
                </div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-accent font-semibold mb-3">
                  Engine
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-ink mb-1">
                  $1,260<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">$42 a day</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Make the phone ring.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  For local services businesses that want clients coming in every week &mdash; not just busy season.
                </p>
                <p className="text-accent text-xs tracking-wide uppercase font-semibold mb-3">
                  Everything in Foundation, plus:
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>2&ndash;3 new pages every month &mdash; <strong className="text-ink font-semibold">more services people can find you for across your service area</strong></>,
                    <>Your Google profile worked every week &mdash; <strong className="text-ink font-semibold">posts, photos, services kept tight</strong></>,
                    <>Geographic rank tracking &mdash; <strong className="text-ink font-semibold">you see where you rank in every city you serve, every month</strong></>,
                    <>Directories kept clean &mdash; <strong className="text-ink font-semibold">no conflicting info hurting your rank</strong></>,
                    <>Fake reviews disputed &mdash; <strong className="text-ink font-semibold">when a competitor posts one, I take the case to Google.</strong></>,
                    <>I send you overflow leads from my own pipeline &mdash; <strong className="text-ink font-semibold">calls coming in while yours warms up</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </ScrollReveal>

            {/* Partnership */}
            <ScrollReveal direction="up" delay={0.15}>
              <a href="#contact" aria-label="See if Partnership is a fit — go to contact form" className="lift md:mt-8 h-full bg-bg-raised rounded-2xl border border-line p-8 flex flex-col cursor-pointer hover:border-accent-line transition-colors">
                <h3 className="text-sm tracking-[0.25em] uppercase text-ink-muted font-semibold mb-3">
                  Partnership
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1">
                  $2,200<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">$73 a day</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Turn jobs away.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  For local services businesses ready to lock down their service area and pick which clients to take.
                </p>
                <p className="text-accent text-xs tracking-wide uppercase font-semibold mb-3">
                  Everything in Engine, plus:
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Up to 8 cities locked to you &mdash; <strong className="text-ink font-semibold">I won&apos;t take a competitor&apos;s check in any of them</strong></>,
                    <>4&ndash;6 new pages every month &mdash; <strong className="text-ink font-semibold">you cover more services and cities than competitors can keep up with</strong></>,
                    <>Overflow leads from my pipeline &mdash; <strong className="text-ink font-semibold">they come to you every month, not split with the next business I sign</strong></>,
                    <>Full site audit every quarter &mdash; <strong className="text-ink font-semibold">find what&apos;s slipping, double down on what&apos;s working</strong></>,
                    <>Custom playbook built around how you work &mdash; <strong className="text-ink font-semibold">scripts, templates, systems yours to keep, even if you cancel</strong></>,
                    <>Multi-round review disputes &mdash; <strong className="text-ink font-semibold">I don&apos;t drop it after one rejection</strong></>,
                    <>Tool setup help &mdash; <strong className="text-ink font-semibold">call tracking, CRM, scheduling. You pay the tool direct, no markup</strong></>,
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

          {/* Setup block */}
          <ScrollReveal direction="up" delay={0.18}>
            <div className="max-w-3xl mx-auto mb-8 p-6 md:p-8 rounded-2xl bg-bg-raised border border-line">
              <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">
                What build + setup gets you &mdash; first 30 days
              </h3>
              <p className="text-accent text-base font-semibold mb-1">
                One-time $1,699 <span className="text-ink-quiet font-normal text-sm">(<span className="line-through text-ink-faint">$2,400</span> after June 30, 2026)</span>
              </p>
              <ul className="space-y-3 mt-5">
                {[
                  <>Website (7&ndash;8 pages) &mdash; <strong className="text-ink font-semibold">fast, mobile, built to rank</strong></>,
                  <>Google Business Profile set up &mdash; <strong className="text-ink font-semibold">you show up on the map for your services and area</strong></>,
                  <>Tracking installed &mdash; <strong className="text-ink font-semibold">you see where every call and click is coming from</strong></>,
                  <>Listed where it counts for local search &mdash; <strong className="text-ink font-semibold">so customers find you when they&apos;re looking nearby.</strong></>,
                  <>First SEO pages built and submitted to Google from day one &mdash; <strong className="text-ink font-semibold">the foundation that gets you found for the services you offer.</strong></>,
                  <>Dashboard set up at yourdomain.com/admin &mdash; <strong className="text-ink font-semibold">edit anything yourself, anytime</strong></>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-ink-muted text-sm italic">
                Day 31: your monthly tier kicks in.
              </p>
            </div>
          </ScrollReveal>

          {/* Add-ons block */}
          <ScrollReveal direction="up" delay={0.19}>
            <div className="max-w-3xl mx-auto mb-10 px-4">
              <h3 className="text-center text-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-6">
                Add-ons
              </h3>
              <div className="space-y-5 text-ink-muted text-sm md:text-base leading-relaxed">
                <div>
                  <p className="mb-3">
                    <span className="text-ink font-semibold">Ad management</span> &mdash; Add-on at any tier.
                  </p>
                  <ul className="space-y-2 pl-5 list-disc marker:text-accent">
                    <li>Bundled (Google Search + LSA) &mdash; <strong className="text-ink font-semibold">$600/mo</strong></li>
                    <li>Google Search ads only &mdash; <strong className="text-ink font-semibold">$500/mo</strong></li>
                    <li>LSA only &mdash; <strong className="text-ink font-semibold">$150/mo</strong></li>
                    <li>Partnership rate (bundled + first landing page included) &mdash; <strong className="text-ink font-semibold">$500/mo</strong></li>
                    <li>Ad spend goes on your card direct &mdash; <strong className="text-ink font-semibold">zero markup</strong></li>
                  </ul>
                </div>
                <p className="text-ink-quiet text-sm italic">
                  Engine is the best place to run ads &mdash; the ongoing optimization makes spend compound faster. Foundation + ads still works, just slower organically alongside.
                </p>
                <p>
                  <span className="text-ink font-semibold">Custom landing pages</span> &mdash; $300 each through June 30, 2026 ($750 after). Partnership ads bundle includes the first one free; add&apos;l pages run $250 each through June 30, 2026 ($500 after) at the Partnership rate.
                </p>
                <p>
                  <span className="text-ink font-semibold">Multiple service brands</span> &mdash; say you run paving, snow plowing, and holiday lighting as separate businesses. Each tier covers one brand. Each additional brand is +$649/mo. Build + setup quoted separately based on scope.
                </p>
              </div>
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
                  I handle the digital side &mdash; the site, the SEO, the ads when you want them, the writing, the reports.
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-4">
                  Your side
                </p>
                <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                  You handle the customer-facing side &mdash; photos from jobs you finish, asking happy customers for a Google review, and giving me your past customer list so I can text them for repeat work.
                </p>
              </div>
            </div>
            <p className="text-ink-muted text-base md:text-lg leading-relaxed text-center max-w-2xl mx-auto italic">
              That&apos;s the whole thing. No busy work from either side.
            </p>
          </ScrollReveal>

          {/* Terms — inset card */}
          <ScrollReveal direction="up" delay={0.05}>
            <div className="mt-16 md:mt-20 bg-bg-raised rounded-2xl border border-line px-8 py-10 md:px-12 md:py-14">
              <h3 className="display-h2 text-xl md:text-2xl text-ink mb-5 text-center">
                The terms, plain.
              </h3>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto text-center">
                <strong className="text-accent-light font-semibold">Month-to-month</strong> &mdash; cancel any month with 72 hours notice before your next bill. Build + setup paid Day 1, <strong className="text-accent-light font-semibold">non-refundable</strong> &mdash; covers the foundation work. After that, every month is your call. If you leave, I transfer everything I manage. <strong className="text-accent-light font-semibold">Full ownership stays with you.</strong>
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT I ACTUALLY DO ==================== */}
      <section className="section-deep py-24 md:py-36 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                What I actually do
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
              <p className="text-ink-muted text-base md:text-lg leading-relaxed mt-6">
                Marketing comes with a lot of acronyms. Here&apos;s what each one does for you:
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-5">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">You&apos;re findable in regular Google searches</strong> &mdash; when someone types &quot;[your service] in [your town],&quot; your business is part of the results. That&apos;s <strong className="text-accent">SEO</strong> (search engine optimization). The version that matters most for local services businesses is <strong className="text-accent">local SEO</strong> &mdash; the &quot;near me&quot; and city searches that bring clients.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">You&apos;re findable when people ask AI tools instead of typing into Google</strong> &mdash; ChatGPT, Google&apos;s AI Overviews, Perplexity. Customers are starting to ask AI things like &quot;best [your service] in [town],&quot; and your business is part of the answer. That&apos;s <strong className="text-accent">AEO</strong> (answer engine optimization), also called <strong className="text-accent">GEO</strong> (generative engine optimization). Same idea, different acronym.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">Your site is built right under the hood</strong> &mdash; fast, mobile-friendly, structured the way search engines expect. That&apos;s <strong className="text-accent">technical SEO</strong> &mdash; the foundation everything else stands on.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">The right words on each page, plus the rest of the internet pointing back to you.</strong> That&apos;s <strong className="text-accent">on-page SEO</strong> (content side) and <strong className="text-accent">off-page SEO</strong> (credibility side).
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.25}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  Ads bring calls fast &mdash; but only while you&apos;re paying. SEO takes 3 to 6 months to start, and keeps paying off long after, even when you stop. Run both, and you get the speed of ads plus the longevity of SEO.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== POLARIZER ==================== */}
      <section id="fit" className="section-raised py-24 md:py-36 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                Think we&apos;re a fit?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Built for you */}
            <ScrollReveal direction="up" delay={0.05}>
              <div className="h-full bg-bg-raised rounded-2xl border border-accent p-8">
                <p className="text-accent text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                  Built For You If
                </p>
                <ul className="space-y-5">
                  {[
                    "You're good at the work but slow months still scare you.",
                    "This is your full-time business — not a side gig.",
                    "You're tired of reports full of numbers nobody explains — and someone telling you \"it's working.\"",
                    "You can wait 3 to 6 months for SEO to compound — once you're ranking, it takes less work to hold than it did to earn. (My old company closed in March. The phone still rings.)",
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

            {/* Not a fit */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="h-full bg-bg-raised rounded-2xl border border-line p-8">
                <p className="text-ink-muted text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                  Not A Fit If
                </p>
                <ul className="space-y-5">
                  {[
                    "Your budget is under $600/mo.",
                    "You want me to promise you a specific number of leads or new clients.",
                    "You're starting from zero — no past customers, no online presence — and need new clients this week.",
                    "You expect SEO to be driving calls and bookings inside 30 days. Google just doesn't work that way — trust takes 3 to 6 months to build. Wish it were faster.",
                    "You're running ads and want them at full capacity day one. Ads take 30 to 60 days of real data to optimize — you'll get calls and inquiries in the meantime, just not the full volume yet.",
                    "You're a franchise location with corporate-mandated marketing. I work with independents — not franchises bound by HQ's rules.",
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
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-base py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
              If that&apos;s you, let&apos;s talk.
            </h2>
            <p className="text-ink-muted text-lg max-w-xl mx-auto">
              Tell me about your business. If we&apos;re not a fit, I&apos;ll tell you on the first call. No pitch.
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
                <div>
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0">
                        1
                      </div>
                      <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p className="text-ink-muted text-sm leading-relaxed">I read your message myself &mdash; usually within a few hours.</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0">
                        2
                      </div>
                      <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p className="text-ink-muted text-sm leading-relaxed">I&apos;ll reach back out by call or text.</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-ink font-semibold text-sm flex-shrink-0">
                        3
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-ink-muted text-sm leading-relaxed">If it feels right, we&apos;ll get on a longer call to go through where your jobs are coming from, where they&apos;re not, and what I&apos;d change to get the phone ringing more.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <a href="tel:8472208550" className="cta-orbit">
                    Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-ink-quiet text-xs italic mt-5 leading-relaxed">
                  Prefer the form? Fill it out — same inbox.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-bg-raised rounded-2xl p-8 border border-line">
                <ContactForm
                  source="local-services-page"
                  subjectPrefix="[Local Services form]"
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
