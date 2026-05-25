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

const MARKETING_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/marketing#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does your marketing cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Partnership is $950/mo — flat, month-to-month, cancel any month with 72 hours notice. It covers your website, Google Business Profile, and ongoing SEO under one brand. The build that starts it, the Foundation, is a one-time $2,100. Want leads right away? Ad Management runs from $500/mo on top, and your ad spend goes straight to Google. Day 31, the monthly plan begins.",
      },
    },
    {
      "@type": "Question",
      "name": "How long before I see more calls or bookings?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads can start driving calls shortly after launch. SEO is the long game — it compounds over time. You'll usually start seeing some results around 3 months, real movement by 6 months, and the full payoff around the 1-year mark. That's why most businesses run both: ads bring leads right away while SEO builds for the long haul. Want results now? Ads. Want the long-term win? SEO. Both gets you both. I'll tell you which fits your timeline and budget up front, not after.",
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
        "text": "Month-to-month means you're never locked in. Cancel any month with 72 hours notice before your next bill. I cap myself at a handful of clients so I can pay attention to each one — if something isn't working, I find out fast and fix it, not 90 days later when your next invoice hits. Everything stays in your name, so canceling doesn't cost you what we've built.",
      },
    },
    {
      "@type": "Question",
      "name": "What Chicago suburbs do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "I work with home service and local businesses across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you offer exclusive territory protection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By default, I won't take on a direct competitor in your service area — that's just how I run. Want it locked in writing? Territory exclusivity is an add-on from $150/city/mo, so a competitor in those cities can't sign with me no matter what they offer.",
      },
    },
    {
      "@type": "Question",
      "name": "Do you work with businesses running multiple brands?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Partnership covers one brand — one site, one Google profile, one set of reviews. A second brand under a different name gets its own site and profile for +$700/mo. The build for the extra brand is quoted separately based on scope. Running multiple brands? Tell me upfront and I'll lay out what makes sense.",
      },
    },
  ],
};

export default function MarketingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const painPoints = [
    {
      title: "People in your area are searching for what you do. They're finding someone else.",
      body: "Someone Googles your service and sees three other businesses first. You never showed up — so you never got the call.",
    },
    {
      title: "You've got a website. It's just not bringing in work.",
      body: "Maybe you paid good money for it. Maybe a friend built it. Either way it's online — but the calls and bookings aren't coming. The site isn't doing its job.",
    },
    {
      title: "You pay for ads. You can't tell if they work.",
      body: "Every month there's a report full of numbers nobody explains. You can't tell if the customer came from the ad, the map listing, or a referral. You just know it's expensive.",
    },
    {
      title: "Your competitor keeps showing up first.",
      body: "Same service, same area, similar reviews. But they're at the top of the map and you're on page two — getting the customers that should be yours.",
    },
  ];

  return (
    <Layout activePath="/marketing" contactHref="#contact">
      <SEO
        title="Marketing for Home Service & Local Businesses | TheKhan"
        description="SEO, Google Ads, and Google Business Profile that get you found by people already searching — for home service and local businesses across Chicago. You do the work. I make sure people find you."
        canonical="https://thekhan.io/marketing"
        ogImage="https://thekhan.io/og-image.png"
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
              I get you in front of the people already searching for what you do &mdash; and turn those searches into calls and booked work.
            </p>

            <TldrStrip
              bullets={[
                <>Site, Google profile, SEO, reports &mdash; I run all of it</>,
                <>The Partnership: <MonoNum>$950</MonoNum>/mo, month-to-month</>,
                <>Want leads now? Ads from <MonoNum>$500</MonoNum>/mo on top</>,
              ]}
              links={[
                { label: "Pricing", href: "#pricing" },
                { label: "How it works", href: "#how-it-works" },
                { label: "Am I a fit?", href: "#fit" },
              ]}
            />

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
              <a href="#contact" className="btn-primary">See if it&apos;s a fit &rarr;</a>
              <a href="#pricing" className="btn-outline-accent">See pricing &rarr;</a>
            </div>

            {/* Micro-strips — now inside the hero's light section */}
            <div className="mt-14 md:mt-16 space-y-3">
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; I work with a handful of businesses at a time.
              </p>
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[475ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; Before TheKhan, I built my own home service company to <CountUp to={84} className="font-mono text-accent-light" /> clients &mdash; and the leads that turned into real work came from people already searching, not ads I pushed at strangers. Now I do that for other businesses.
              </p>
              <p className={`text-ink-quiet text-base md:text-[17px] leading-relaxed opacity-80 transition-all duration-700 delay-[550ms] ${mounted ? 'opacity-80 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                &mdash; Serving home service and local businesses across Chicagoland &mdash; Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Remote clients welcome anywhere in the US.
              </p>
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

      {/* ==================== WHY THIS WORKS — intent vs interruption ==================== */}
      <section className="section-deep py-24 md:py-36 px-6 relative z-10 border-t border-line">
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
              When someone types &ldquo;[your service] near me,&rdquo; they&apos;re not browsing &mdash; they&apos;re ready to reach out. That&apos;s who I get you in front of: Google, Google Maps, and AI search like ChatGPT. The people already looking for what you do.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
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
          <ScrollReveal direction="up" delay={0.2}>
            <p className="text-center text-ink-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              Feed ads have their place. But for most local businesses, the work comes from people actively searching &mdash; so that&apos;s where I put you.{" "}
              <Link to="/why-intent" className="link">Why I bet on intent &rarr;</Link>
            </p>
          </ScrollReveal>
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
                One plan. Month-to-month.
              </h2>
              <p className="text-ink-muted text-base md:text-lg leading-relaxed">
                Two ways to get found: own your market the long way, or switch ads on for leads now. Most businesses start with one and add the other when they&apos;re ready.
              </p>
            </ScrollReveal>
          </div>

          {/* Two lanes — organic (The Partnership) + paid (Ad Management) */}
          <div className="grid md:grid-cols-2 gap-6 md:items-stretch mb-10 md:mb-12 max-w-4xl mx-auto">
            {/* The Partnership — organic lane (anchor) */}
            <ScrollReveal direction="up" delay={0.05}>
              <a href="#contact" aria-label="Start with The Partnership — go to contact form" className="lift relative h-full bg-bg-raised rounded-2xl border-2 border-accent p-8 flex flex-col cursor-pointer transition-colors">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-ink text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap">
                  The Long Game
                </div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-accent font-semibold mb-3">
                  The Partnership
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-ink mb-1">
                  $950<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">Month-to-month &middot; cancel any month with 72 hours notice</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Own your market.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  You show up when people search for what you do, and you own the site for good. The rankings are a spot we hold by keeping the work going.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>A custom site &mdash; <strong className="text-ink font-semibold">fast, mobile, built to turn up when people search</strong></>,
                    <>Your Google Business Profile actively managed &mdash; <strong className="text-ink font-semibold">reviews replied to, photos and posts kept fresh</strong></>,
                    <>New pages every month &mdash; <strong className="text-ink font-semibold">more services and more of your area people can find you for</strong></>,
                    <>A plain-English monthly report &mdash; <strong className="text-ink font-semibold">what you&apos;re ranking for, where the work came from, what&apos;s next</strong></>,
                    <>A direct line to me by text or email &mdash; <strong className="text-ink font-semibold">answered within a business day</strong></>,
                    <>You own all of it &mdash; <strong className="text-ink font-semibold">site, domain, logins &mdash; cancel any month with 72 hours notice</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </ScrollReveal>

            {/* Ad Management — paid lane */}
            <ScrollReveal direction="up" delay={0.1}>
              <a href="#contact" aria-label="Ask about Ad Management — go to contact form" className="lift md:mt-8 h-full bg-bg-raised rounded-2xl border border-line p-8 flex flex-col cursor-pointer hover:border-accent-line transition-colors">
                <h3 className="text-sm tracking-[0.25em] uppercase text-ink-muted font-semibold mb-3">
                  Ad Management
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-ink mb-1">
                  from $500<span className="text-base font-medium text-ink-quiet">/mo</span>
                </p>
                <p className="text-sm text-ink-quiet mb-5">Add it any time &middot; your first landing page included</p>
                <p className="text-ink font-semibold text-lg leading-snug mb-4">
                  Leads now.
                </p>
                <p className="text-ink-muted text-sm leading-relaxed mb-5">
                  While the organic side builds, ads put you in front of people searching today &mdash; and switch off the moment you want.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Google Search + Local Services Ads &mdash; <strong className="text-ink font-semibold">set up and managed end to end</strong></>,
                    <>A landing page built to turn clicks into calls &mdash; <strong className="text-ink font-semibold">your first one included</strong></>,
                    <>Keywords, ad copy, and bids tuned every month &mdash; <strong className="text-ink font-semibold">to bring your cost per lead down</strong></>,
                    <>Your ad spend goes straight to Google on your card &mdash; <strong className="text-ink font-semibold">I never mark it up</strong></>,
                    <>A monthly report &mdash; <strong className="text-ink font-semibold">what your spend actually brought in</strong></>,
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

          {/* Ad-spend transparency */}
          <ScrollReveal direction="up" delay={0.12}>
            <p className="max-w-3xl mx-auto text-center text-ink-quiet text-sm md:text-base italic leading-relaxed mb-16 md:mb-20">
              Paid ads need real fuel &mdash; most businesses start around $1,000&ndash;1,500/mo in ad spend, and that goes straight to Google on your card, not to me. I&apos;ll help you dial in the right number for your market on a call.
            </p>
          </ScrollReveal>

          {/* The Foundation — the build that starts the Partnership */}
          <ScrollReveal direction="up" delay={0.18}>
            <div className="max-w-3xl mx-auto mb-8 p-6 md:p-8 rounded-2xl bg-bg-raised border border-line">
              <h3 className="text-lg md:text-xl font-semibold text-ink mb-2">
                The Foundation &mdash; your first 30 days
              </h3>
              <p className="text-accent text-base font-semibold mb-1">
                One-time $2,100
              </p>
              <p className="text-ink-muted text-sm mb-4">The build that gets the Partnership going.</p>
              <ul className="space-y-3 mt-5">
                {[
                  <>A custom site, about 8 pages &mdash; <strong className="text-ink font-semibold">fast, mobile, built to rank</strong></>,
                  <>Your Google Business Profile set up and optimized &mdash; <strong className="text-ink font-semibold">you show up on the map for your services and area</strong></>,
                  <>Tracking installed &mdash; <strong className="text-ink font-semibold">you see where every call and click is coming from</strong></>,
                  <>Listed across the directories local search trusts &mdash; <strong className="text-ink font-semibold">so customers find you when they&apos;re looking nearby</strong></>,
                  <>Your first service pages built and submitted to Google from day one &mdash; <strong className="text-ink font-semibold">the foundation that gets you found for what you do</strong></>,
                  <>A simple dashboard &mdash; <strong className="text-ink font-semibold">swap your own photos and update your hours anytime</strong></>,
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <IconCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-ink-muted text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-ink-muted text-sm italic">
                Day 31, the Partnership begins at $950/mo.
              </p>
            </div>
          </ScrollReveal>

          {/* Add-ons */}
          <ScrollReveal direction="up" delay={0.19}>
            <div className="max-w-3xl mx-auto mb-10 px-4">
              <h3 className="text-center text-accent text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold mb-6">
                Add-ons
              </h3>
              <div className="space-y-4 text-ink-muted text-sm md:text-base leading-relaxed">
                <p>
                  <span className="text-ink font-semibold">Another brand</span> &mdash; +$700/mo. A second business under a different name gets its own site and Google profile &mdash; two separate brands, run side by side.
                </p>
                <p>
                  <span className="text-ink font-semibold">Locked territory</span> &mdash; from $150/city/mo. I won&apos;t take on a direct competitor in the cities you lock.
                </p>
                <p>
                  <span className="text-ink font-semibold">Email marketing</span> &mdash; from $300 to set up. Bring past customers back with the occasional campaign.
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
                  You handle the customer-facing side &mdash; photos from your work, asking happy customers for a Google review, and reaching back out to past customers using scripts I write for you.
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

      {/* ==================== WHAT THAT LOOKS LIKE ==================== */}
      <section className="section-deep py-24 md:py-36 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-ink mb-4 display-h2">
                What that looks like
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
              <p className="text-ink-muted text-base md:text-lg leading-relaxed mt-6">
                No jargon &mdash; here&apos;s what I&apos;m actually doing to get you found:
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-5">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">You show up when people Google your service.</strong> Someone types &quot;[your service] near me&quot; or &quot;[your service] in [your town],&quot; and your business is right there in the results &mdash; the searches that actually bring work.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">You show up on the map.</strong> When someone nearby searches, your Google profile is right there &mdash; reviews, photos, and a tap-to-call button.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">You show up when people ask AI.</strong> More and more customers ask ChatGPT or Google&apos;s AI answers &quot;who&apos;s the best [your service] in [town]&quot; &mdash; and your name is in the answer.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">Your site is fast and built right under the hood</strong> &mdash; so all of that can actually happen. A slow, sloppy site doesn&apos;t rank, no matter what else you do.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.25}>
              <div className="p-6 md:p-7 rounded-xl border border-line bg-bg-raised/60">
                <p className="text-ink-muted leading-relaxed">
                  <strong className="text-ink font-semibold">Ads bring customers fast &mdash; but only while you&apos;re paying.</strong> Rankings take 3 to 6 months to build and are held by ongoing work. Run both: ads for leads now, the organic side compounding underneath.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="text-center text-ink-quiet text-sm md:text-base leading-relaxed pt-2">
                Want the technical version &mdash; the acronyms, the how, the proof?{" "}
                <Link to="/why-intent" className="link">Why intent wins &rarr;</Link>
              </p>
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
                Think it&apos;s a fit?
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
                    "You can wait 3 to 6 months for SEO to compound — once you're ranking, it takes less work to hold than it did to earn.",
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
                    "Your budget is under $950/mo.",
                    "You want me to promise you a specific number of leads.",
                    "You're starting from zero — no past customers, no online presence — and need work this week.",
                    "You expect SEO to be driving calls inside 30 days. Google just doesn't work that way — trust takes 3 to 6 months to build. Wish it were faster.",
                    "You're running ads and want them at full capacity day one. Ads take 30 to 60 days of real data to optimize — you'll get calls in the meantime, just not the full volume yet.",
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
              Tell me about your business. If it&apos;s not a fit, I&apos;ll tell you on the first call. No pitch.
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
                      <p className="text-ink-muted text-sm leading-relaxed">If it feels right, I&apos;ll set up a longer call to go through where your work is coming from, where it&apos;s not, and what I&apos;d change to bring in more.</p>
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
