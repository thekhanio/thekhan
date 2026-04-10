import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  IconLock,
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
        "text": "I work on monthly retainers in three tiers: Foundation ($550/mo), Engine ($1,050/mo — most common), and Machine ($1,500/mo). Every new contractor starts with a 60-day intro at $550/mo flat, regardless of which tier you pick — that's when I build the foundation: new site, Google listing, basic SEO. Day 61, you move to your full tier rate. No setup fee, no long-term contract.",
      },
    },
    {
      "@type": "Question",
      "name": "How long before I see more phone calls?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Google Ads can start driving calls within days of launch. Local SEO and organic rankings take 3 to 6 months to show up meaningfully — that's why every new contractor starts with a 60-day intro, so the foundational work is in place by the time the deeper SEO work starts paying off. I'll tell you which channel fits your timeline and budget before we start, not after.",
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
        "text": "The 60-day intro comes with a 30-day walk clause — if I'm not delivering in the first 30 days, you can walk, no questions asked. Beyond that, I cap myself at a handful of clients per year specifically so I can pay attention to each one. If something isn't working, I find out fast and fix it — not 90 days later when your next retainer invoice hits.",
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
            <motion.div
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
            </motion.div>
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
            Home Service Contractor Marketing &mdash; Chicago &amp; North Shore
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
            &mdash; Before TheKhan, I built my own home service company to 84 clients &mdash; before I realized I was better at the growth side than the job site. &mdash;
          </p>
          <p className={`text-[#808080] text-sm italic mt-3 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-[500ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            &mdash; Serving contractors across Chicagoland &mdash; Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Wilmette, Evanston, Skokie, Arlington Heights, Naperville, Oak Park, and the rest of the Chicago metro. Websites and marketing clients served nationwide. &mdash;
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
                Pick your tier. The first 60 days are the same.
              </h2>
              <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed">
                $550/mo for the first 60 days &mdash; any tier. That&apos;s when I build the foundation: new site, Google listing, basic SEO. That&apos;s the work that moves the needle fastest. The deeper work takes 3&ndash;6 months to show up anyway. Day 61 you move to your full tier rate.
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
                  Get found. Stop losing jobs to the other guys.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  For contractors still surviving on referrals and repeat customers.
                </p>
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
                  Make the phone ring. Keep it ringing.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  For contractors who want jobs coming in every week &mdash; not just during busy season.
                </p>
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
                  Turn jobs away. Hire the crew.
                </p>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  For contractors ready to stop being the bottleneck and start running a real company.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* 60-day intro callout */}
          <ScrollReveal direction="up" delay={0.2}>
            <SpotlightGlow>
              <div className="p-8 md:p-10 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-4" style={{ fontFamily: "'Cinzel', serif" }}>
                  Here&apos;s how the first 60 days work.
                </h3>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
                  $550/mo, any tier. No setup fee. If I&apos;m not delivering in the first 30 days, you can walk.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== NOTHING HELD HOSTAGE MINI-STRIP ==================== */}
      <section className="py-12 md:py-16 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/30 mb-5">
              <IconLock className="w-5 h-5 text-[#06b6d4]" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
              Nothing&apos;s held hostage.
            </h3>
            <p className="text-[#a3a3a3] italic text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Your site, your logins, your content &mdash; all in your name from day one. Most agencies don&apos;t work that way.
            </p>
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
                    "You need the phone ringing in week one.",
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
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Think we&apos;re a fit?</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Let&apos;s see if I can help.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              Tell me about your business and what&apos;s not working. I&apos;ll give you a straight answer &mdash; whether I&apos;m the right fit or not. No pitch.
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
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">I&apos;ll reach back by call or text &mdash; whatever works for you.</p>
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
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">If it feels right, we&apos;ll book a quick call so I can look at your jobs and what&apos;s getting in the way.</p>
                    </div>
                  </div>
                </div>
                <p className="text-[#808080] text-xs italic mt-5 leading-relaxed">
                  Rather skip the form? Call or text &mdash; number&apos;s right there.
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
                Custom-built websites. Here to grow your business.
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
