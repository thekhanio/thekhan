import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import {
  IconCheck,
  IconX,
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMenu2,
  IconSearch,
  IconDeviceMobile,
  IconCurrencyDollar,
  IconTruck,
} from "@tabler/icons-react";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/contractors#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "Contractors", "item": "https://thekhan.io/contractors" },
  ],
};

const CONTRACTORS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thekhan.io/contractors#service",
  "name": "Home Service Contractor Marketing",
  "description": "Websites, Google Ads, and SEO that make the phone ring for home service contractors in the Chicago area.",
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
    "Home Service Contractor Marketing",
    "Website Design",
    "Google Ads Management",
    "Local SEO",
    "Marketing for Landscapers",
    "Marketing for Roofers",
    "Marketing for HVAC",
    "Marketing for Plumbers",
    "Marketing for Electricians",
    "Marketing for Pressure Washers",
    "Marketing for Painters",
    "Marketing for Cleaners",
    "Marketing for Handymen",
    "Marketing for Snow Removal",
  ],
};

const CONTRACTORS_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/contractors#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does marketing for home service contractors cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Three monthly tiers: Foundation ($550/mo), Engine ($1,050/mo — most common), and Machine ($1,500/mo). Monthly starts the day your site goes live. The website build is $750 upfront. Month-to-month, no long-term lock-ins. Cancel any month with 72 hours notice before your next bill.",
      },
    },
    {
      "@type": "Question",
      "name": "How long before I see more phone calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads can start driving calls within days of launch. Local SEO compounds — it doesn't work day one. Organic rankings take 3 to 6 months to show up meaningfully, which is why most contractors run both: ads bridge the gap while SEO builds. I'll tell you which channel fits your timeline and budget before we start, not after.",
      },
    },
    {
      "@type": "Question",
      "name": "Do I own my Google Ads account, or do you?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You own it. Always. I run your ads under your own Google Ads account with your card on file. If we ever part ways, you keep the account, the history, and the data. No agency-owned account hostage situations.",
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
        "text": "I work with contractors across the North Shore and Chicagoland — Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, Evanston, and the broader Chicago metro area. Remote clients anywhere in the US welcome if the project fits.",
      },
    },
  ],
};

export default function ContractorsPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const painCards = [
    {
      Icon: IconSearch,
      title: "Your phone only rings from people you already know.",
      body: "A homeowner down the street Googles your service, finds three other guys, and calls one. You never even showed up.",
    },
    {
      Icon: IconDeviceMobile,
      title: "Your website isn't making the phone ring.",
      body: "Maybe you don't have one. Maybe you update the one you have every week and it still doesn't show up on Google — because it wasn't built to show up in the first place. You're doing the work. The site isn't.",
    },
    {
      Icon: IconCurrencyDollar,
      title: "You pay for ads. You can't tell if they work.",
      body: "Whether you run them or someone else does, every month there's a report full of numbers nobody explains. You can't tell if the call came from the ads, the Google listing, or the yard sign out front. You just know it's expensive.",
    },
    {
      Icon: IconTruck,
      title: "Your competitor's truck keeps showing up.",
      body: "You drive past a house on your street. Another company's truck is in the driveway. You never got a call about that one. And that's just the one you saw.",
    },
  ];

  return (
    <main className="min-h-screen antialiased relative">
      <SEO
        title="Marketing for Home Service Contractors in Chicago | TheKhan"
        description="Websites, Google Ads, and SEO for Chicago home service contractors. Get your phone ringing every week. You do the work. I make people find you."
        canonical="https://thekhan.io/contractors"
        ogImage="https://thekhan.io/contractors-og.jpg"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, CONTRACTORS_SCHEMA, CONTRACTORS_FAQ_SCHEMA]}
      />

      <BackgroundPaths />

      {/* ==================== NAV ==================== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-4 flex items-center justify-center lg:justify-between relative">
          <Link to="/" className="flex flex-col cursor-pointer overflow-visible">
            <div className="scale-[0.85] lg:scale-100 origin-center">
              <Logo variant="white" size="sm" type="full" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link to="/" className="nav-link text-[#d4d4d4] text-base tracking-wide">Home</Link>
            <Link to="/websites" className="nav-link text-[#d4d4d4] text-base tracking-wide">Websites</Link>
            <Link to="/contractors" className="nav-link nav-link-active text-base tracking-wide">For Contractors</Link>
            <Link to="/portfolio" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</Link>
            <Link to="/about" className="nav-link text-[#d4d4d4] text-base tracking-wide">About</Link>
            <a href="#contact" className="nav-button-premium px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">
              Let&apos;s Talk
            </a>
          </div>

          <button className="lg:hidden absolute right-4 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <IconX className="w-6 h-6 text-[#06b6d4]" />
            ) : (
              <IconMenu2 className="w-6 h-6 text-[#06b6d4]" />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.05] overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col items-center gap-3">
                <Link to="/" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Home</Link>
                <Link to="/websites" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Websites</Link>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link nav-link-active text-base py-2">For Contractors</Link>
                <Link to="/portfolio" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</Link>
                <Link to="/about" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">About</Link>
                <a href="#contact" onClick={handleNavClick} className="nav-button-premium px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium text-center mt-2">
                  Let&apos;s Talk
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative z-10 flex items-center overflow-hidden pt-32 md:pt-40 pb-16 md:pb-20">
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <p className={`text-[#2563eb] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-5 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            For Contractors
          </p>

          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5 md:mb-6 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient">
              You do the work.<br />
              I make sure<br />
              people find you.
            </span>
          </h1>

          <h2 className={`text-sm sm:text-base md:text-lg text-[#a3a3a3] font-medium tracking-wide mb-6 md:mb-7 text-center transition-all duration-700 delay-[175ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: "'Cinzel', serif" }}>
            Home service contractor marketing that makes the phone ring &mdash; based on Chicago&apos;s North Shore.
          </h2>

          <p className={`text-lg sm:text-xl text-[#d4d4d4] mb-9 md:mb-10 max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            One-man shop. I treat every business I work with like my own.
          </p>

          <div className={`flex flex-col items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="9999px"
              className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white text-base font-medium tracking-wide px-8 py-4 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-shadow duration-300"
              containerClassName="w-auto h-auto"
            >
              See if we&apos;re a fit &rarr;
            </MovingBorderButton>

            <a href="#pricing" className="text-[#06b6d4] hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors mt-1">
              See pricing
            </a>
          </div>

          <p className={`text-[#808080] text-sm italic mt-8 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            &mdash; I work with a handful of contractors at a time. &mdash;
          </p>
          <p className={`text-[#808080] text-sm italic mt-3 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-[450ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            &mdash; Before TheKhan, I built my own home service company to 84 clients. Closed it in March &mdash; the company phone still rings today from the SEO work I did. &mdash;
          </p>
          <p className={`text-[#808080] text-sm italic mt-3 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-[500ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            &mdash; Serving contractors across Chicagoland &mdash; Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Remote clients welcome anywhere in the US. &mdash;
          </p>
        </div>
      </section>

      {/* ==================== PAIN GRID ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Sound familiar?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {painCards.map((card, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <SpotlightGlow>
                  <div className="p-8 h-full">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/30 flex items-center justify-center mb-5">
                      <card.Icon className="w-5 h-5 text-[#06b6d4]" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-base leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FULL STORY LINK ==================== */}
      <section className="pt-2 pb-8 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <Link to="/about" className="text-[#06b6d4] hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors">
              How I got here &rarr;
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-20 md:py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <ScrollReveal direction="up">
              <p className="text-[#2563eb] text-xs sm:text-sm tracking-[0.25em] uppercase font-medium mb-5">
                What It Costs
              </p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-6 leading-tight" style={{ fontFamily: "'Cinzel', serif" }}>
                Three tiers, all month-to-month.
              </h2>
              <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed">
                Your monthly starts the day your site goes live. Cancel any month with 72 hours notice before your next bill. The website build is $750 upfront.
              </p>
            </ScrollReveal>
          </div>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-6 md:items-stretch mb-8">
            {/* Foundation */}
            <ScrollReveal direction="up" delay={0.05}>
              <div className="md:mt-8 h-full bg-[#111111] rounded-2xl border border-white/[0.08] p-8 flex flex-col">
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#a3a3a3] font-semibold mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  Foundation
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-white mb-6">
                  $550<span className="text-base font-medium text-[#808080]">/mo</span>
                </p>
                <p className="text-white font-semibold text-lg leading-snug mb-4">
                  Get found.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5">
                  For contractors still surviving on referrals and repeat customers.
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Website hosted and maintained</>,
                    <>Google Business Profile kept active &mdash; <strong className="text-white font-semibold">so it doesn&apos;t go dormant</strong></>,
                    <>Every Google review replied to &mdash; <strong className="text-white font-semibold">good or bad, none ignored</strong></>,
                    <>Past customers texted every quarter &mdash; <strong className="text-white font-semibold">more calls from people who already know you</strong></>,
                    <>Monthly report in plain English &mdash; <strong className="text-white font-semibold">what moved, what didn&apos;t, what&apos;s next</strong></>,
                    <>Dashboard to edit your site yourself</>,
                    <>Text or email me direct &mdash; <strong className="text-white font-semibold">no tickets, no gatekeepers</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                      <span className="text-[#d4d4d4] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Engine — anchor */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative h-full bg-[#0f0f0f] rounded-2xl border-2 border-[#06b6d4]/60 p-8 flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white text-[10px] tracking-[0.2em] uppercase font-semibold whitespace-nowrap">
                  Most Common
                </div>
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#06b6d4] font-semibold mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  Engine
                </h3>
                <p className="text-4xl md:text-5xl font-bold text-white mb-6">
                  $1,050<span className="text-base font-medium text-[#808080]">/mo</span>
                </p>
                <p className="text-white font-semibold text-lg leading-snug mb-4">
                  Make the phone ring.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5">
                  For contractors who want jobs coming in every week &mdash; not just during busy season.
                </p>
                <p className="text-[#06b6d4] text-xs tracking-wide uppercase font-semibold mb-3">
                  Everything in Foundation, plus:
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>New service and city pages every month &mdash; <strong className="text-white font-semibold">you rank for more services in more towns</strong></>,
                    <>Older pages refreshed &mdash; <strong className="text-white font-semibold">so they keep ranking as Google updates</strong></>,
                    <>Directories cleaned up and checked quarterly &mdash; <strong className="text-white font-semibold">so Google can verify who you are everywhere it matters</strong></>,
                    <>Deeper Google Business Profile work &mdash; <strong className="text-white font-semibold">expanded services list, questions seeded, attributes set</strong></>,
                    <>Rank tracking across your service area &mdash; <strong className="text-white font-semibold">shown in your monthly report</strong></>,
                    <>Call tracking available &mdash; <strong className="text-white font-semibold">know which ads, pages, and channels actually drive your phone calls</strong> (optional add-on, you pay direct)</>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                      <span className="text-[#d4d4d4] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Machine */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="md:mt-8 h-full bg-[#111111] rounded-2xl border border-white/[0.08] p-8 flex flex-col">
                <h3 className="text-sm tracking-[0.25em] uppercase text-[#a3a3a3] font-semibold mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                  Machine
                </h3>
                <p className="text-3xl md:text-4xl font-bold text-white mb-6">
                  $1,500<span className="text-base font-medium text-[#808080]">/mo</span>
                </p>
                <p className="text-white font-semibold text-lg leading-snug mb-4">
                  Turn jobs away.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5">
                  For contractors ready to stop being the bottleneck and start running a real company.
                </p>
                <p className="text-[#06b6d4] text-xs tracking-wide uppercase font-semibold mb-3">
                  Everything in Engine, plus:
                </p>
                <ul className="space-y-3 mt-auto">
                  {[
                    <>Paid ads managed &mdash; <strong className="text-white font-semibold">LSA where your service is eligible, Google Ads where it&apos;s not.</strong> I match the channel to each service, run bids, dispute fake leads, handle the review flow.</>,
                    <>More pages every month &mdash; <strong className="text-white font-semibold">faster coverage across your full service area</strong></>,
                    <>Past customers texted every month &mdash; <strong className="text-white font-semibold">segmented by service, season, and offer</strong></>,
                    <>Full site audit every quarter &mdash; <strong className="text-white font-semibold">find what&apos;s weakening, double down on what&apos;s working</strong></>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                      <span className="text-[#d4d4d4] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* $750 build education blurb */}
          <ScrollReveal direction="up" delay={0.18}>
            <div className="max-w-3xl mx-auto mb-8 p-6 md:p-8 rounded-2xl bg-[#0d0d0d] border border-white/[0.06]">
              <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                Why the build is $750.
              </h3>
              <p className="text-[#d4d4d4] text-base leading-relaxed">
                Five pages &mdash; home, services, about, contact, area served. Each one answers a different question Google asks about your business: what you do, who you are, how to reach you, what areas you work. Template sites pile it all onto one page and Google can&apos;t sort it out.
              </p>
            </div>
          </ScrollReveal>

          {/* Ads add-on line */}
          <ScrollReveal direction="up" delay={0.19}>
            <p className="max-w-3xl mx-auto mb-10 text-center text-[#a3a3a3] text-sm md:text-base leading-relaxed px-4">
              <span className="text-white font-semibold">Want ads?</span> Machine includes both. On Foundation or Engine, add them as needed &mdash; Google Ads at $400/mo or LSA at $150/mo. Ad spend is separate, billed directly to your card by Google. You see exactly where every dollar goes.
            </p>
          </ScrollReveal>

          {/* Terms callout */}
          <ScrollReveal direction="up" delay={0.2}>
            <SpotlightGlow>
              <div className="p-8 md:p-10 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  The terms, plain.
                </h3>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  Month-to-month. Cancel any month with 72 hours notice before your next bill. If you ever leave, I transfer every account I manage &mdash; site files, hosting, analytics. Everything goes with you.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== HOW THIS WORKS ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <SpotlightGlow>
              <div className="p-8 md:p-10 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                  How this works
                </h3>
                <div className="space-y-4 text-[#d4d4d4] text-base md:text-lg leading-relaxed">
                  <p>I handle the digital side &mdash; the site, the SEO, the ads when you want them, the writing, the reports.</p>
                  <p>You handle the customer-facing side &mdash; photos from jobs you finish, asking happy customers for a Google review, and giving me your past customer list so I can text them for repeat work.</p>
                  <p>That&apos;s the whole thing. No busy work from either side.</p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== POLARIZER ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Think we&apos;re a fit?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Built for you */}
            <ScrollReveal direction="up" delay={0.05}>
              <div className="h-full bg-[#111111] rounded-2xl border border-[#2563eb]/30 p-8">
                <p className="text-[#2563eb] text-xs tracking-[0.25em] uppercase font-semibold mb-6">
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
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#06b6d4]/15 border border-[#06b6d4]/40 flex items-center justify-center mt-0.5">
                        <IconCheck className="w-3.5 h-3.5 text-[#06b6d4]" />
                      </div>
                      <p className="text-[#d4d4d4] text-base leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Not a fit */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="h-full bg-[#0d0d0d] rounded-2xl border border-white/[0.06] p-8">
                <p className="text-[#a3a3a3] text-xs tracking-[0.25em] uppercase font-semibold mb-6">
                  Not A Fit If
                </p>
                <ul className="space-y-5">
                  {[
                    "Your budget is under $550/mo.",
                    "You want me to promise you a specific number of leads.",
                    "You're starting from zero — no past customers, no online presence — and need jobs this week.",
                    "You expect SEO to be driving calls inside 30 days. Google just doesn't work that way — trust takes 3 to 6 months to build. Wish it were faster.",
                    "You're running ads and want them at full capacity day one. Ads take 30 to 60 days of real data to optimize — you'll get calls in the meantime, just not the full volume yet.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/[0.04] border border-white/[0.1] flex items-center justify-center mt-0.5">
                        <IconX className="w-3.5 h-3.5 text-[#707070]" />
                      </div>
                      <p className="text-[#a3a3a3] text-base leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              If that&apos;s you, let&apos;s talk.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              Tell me about your business &mdash; what you&apos;ve tried, what worked, what didn&apos;t. If we&apos;re not a fit, I&apos;ll tell you on the first call. No pitch.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-start">
              <div className="space-y-6">
                <a href="tel:8472208550" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center group-hover:border-[#2563eb]/50 transition-colors flex-shrink-0">
                    <IconPhone className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-[#2563eb] text-sm font-medium">Call or Text</span>
                    <span className="text-[#d0d0d0] group-hover:text-white transition-colors">(847) 220-8550</span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center group-hover:border-[#2563eb]/50 transition-colors flex-shrink-0">
                    <IconMail className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-[#2563eb] text-sm font-medium">Email</span>
                    <span className="text-[#d0d0d0] group-hover:text-white transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-2 border-t border-white/[0.06] w-full">
                <p className="text-[#2563eb] text-sm font-medium uppercase tracking-widest mb-6 pt-6">What happens next</p>
                <div>
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        1
                      </div>
                      <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">I read your message myself &mdash; usually within a few hours.</p>
                    </div>
                  </div>
                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        2
                      </div>
                      <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />
                    </div>
                    <div className="pb-6 pt-1.5">
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">I&apos;ll reach back out by call or text &mdash; whatever works for you.</p>
                    </div>
                  </div>
                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                        3
                      </div>
                    </div>
                    <div className="pt-1.5">
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">If it feels right, we&apos;ll get on a longer call to go through where your jobs are coming from, where they&apos;re not, and what I&apos;d change to get the phone ringing more.</p>
                    </div>
                  </div>
                </div>
                <p className="text-[#808080] text-xs italic mt-5 leading-relaxed">
                  Prefer to skip the form? Text or call (847) 220-8550.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm
                  source="contractors-page"
                  subjectPrefix="[Contractors form]"
                  showPhoneField
                  showTradeDropdown
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-6 border-t border-white/[0.06] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Contact</h3>
              <div className="space-y-2 text-[#d4d4d4] text-sm leading-relaxed">
                <p>655 Deerfield Rd</p>
                <p>Suite 100, Unit 404</p>
                <p>Deerfield, IL 60015</p>
                <div className="border-t border-white/[0.06] my-4" />
                <p><a href="mailto:omair@thekhan.io" className="hover:text-white transition-colors">Omair@TheKhan.io</a></p>
                <p><a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h3 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Pages</h3>
              <div className="space-y-2 text-[#d4d4d4] text-sm">
                <p><Link to="/" className="hover:text-white transition-colors">Home</Link></p>
                <p><Link to="/websites" className="hover:text-white transition-colors">Websites</Link></p>
                <p><Link to="/contractors" className="text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></p>
                <p><Link to="/about" className="hover:text-white transition-colors">About</Link></p>
                <p><a href="#contact" className="hover:text-white transition-colors">Contact</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h3 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Follow Along</h3>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/thekhanio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61584909881446" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/thekhanio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Logo variant="white" size="md" className="mb-4" />
              <p className="text-[#a3a3a3] text-sm leading-relaxed">
                Your digital partner.
              </p>
              <p className="text-[#606060] text-xs leading-relaxed mt-1">
                Websites and marketing for growing businesses.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/[0.06] text-center">
            <p className="text-[#606060] text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            <p className="text-[#606060] text-sm mt-2 opacity-70">Designed and built by TheKhan</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
