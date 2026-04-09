import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import {
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMenu2,
  IconX,
  IconCheck,
  IconChevronDown,
} from "@tabler/icons-react";

const faqs = [
  {
    q: "Do I need my own domain?",
    a: "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again.",
  },
  {
    q: "Where will my site be hosted?",
    a: "On modern hosting that's free for small business sites. The login is in your account, not mine. Your only ongoing cost is your domain renewal — about $12 a year.",
  },
  {
    q: "Can you migrate my existing Wix or Squarespace site?",
    a: "I'll use your existing copy, photos, and content — anything that's yours, I move over. But the site itself gets built from scratch on custom code, which gives you a faster, cleaner result than dragging an old template along. Same price as a new build.",
  },
  {
    q: "What if my content isn't ready yet?",
    a: "That's normal. Most people don't have polished copy or photos lined up before they hire me. During discovery, I get everything I need about your business and write the copy from there — you just review it. For photos, we figure out what you have, what you need, and what we can grab.",
  },
  {
    q: "What if I want changes after launch?",
    a: "Two options. Grab the optional dashboard ($59/mo) and edit anything yourself in a few clicks. Or text me for one-off updates — most start around $75, depending on scope. If you'll be making changes more than once a month, the dashboard usually pays for itself.",
  },
  {
    q: "Do I sign a long-term contract?",
    a: "No. It's a one-time project, not a subscription. You pay 50% to start, 50% on launch — that's the whole deal. No retainer, no auto-renewal, no cancellation fee. The optional dashboard is month-to-month, so if you grab it later, you can cancel by letting me know before the next month starts.",
  },
  {
    q: "How and when do I pay?",
    a: "50% to start, 50% on launch. Stripe or Zelle — whichever's easiest. No hidden fees, no surprise invoices.",
  },
];

const PAGE_TITLE = "Custom Web Design — Deerfield, IL | One Payment, You Own It";
const PAGE_DESC = "Custom websites built from scratch in 1–6 weeks. One-time payment, no retainer, no lock-in. You walk away with every file. Deerfield, IL.";
const PAGE_URL = "https://thekhan.io/websites";
const OG_IMAGE = "https://thekhan.io/og-image.jpg";

const SERVICE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://thekhan.io/websites#service",
  "name": "Custom Website Design & Development",
  "description": "Custom-coded websites built from scratch for small businesses, growing companies, and contractors who only need a one-time build. Mobile-responsive, SEO-optimized, owner-controlled — no template platforms, no retainer required.",
  "provider": { "@id": "https://thekhan.io/#localbusiness" },
  "areaServed": ["Chicago metropolitan area", "United States"],
  "offers": [
    { "@type": "Offer", "name": "Landing Page Build", "price": "300", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Starter Website Build", "price": "550", "priceCurrency": "USD" },
    { "@type": "Offer", "name": "Full Site Build", "price": "750", "priceCurrency": "USD" }
  ]
};

const FAQ_SCHEMA_FOR_HEAD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/websites#faq",
  "mainEntity": [
    { "@type": "Question", "name": "Do I need my own domain?", "acceptedAnswer": { "@type": "Answer", "text": "If you don't have one, I'll walk you through buying it (about $12/year through GoDaddy, Namecheap, or whichever provider you prefer). You register it in your own account, with your own login. You own it forever — even if we never talk again." } },
    { "@type": "Question", "name": "Where will my site be hosted?", "acceptedAnswer": { "@type": "Answer", "text": "On modern hosting that's free for small business sites. The login is in your account, not mine. Your only ongoing cost is your domain renewal — about $12 a year." } },
    { "@type": "Question", "name": "Can you migrate my existing Wix or Squarespace site?", "acceptedAnswer": { "@type": "Answer", "text": "I'll use your existing copy, photos, and content — anything that's yours, I move over. But the site itself gets built from scratch on custom code, which gives you a faster, cleaner result than dragging an old template along. Same price as a new build." } },
    { "@type": "Question", "name": "What if my content isn't ready yet?", "acceptedAnswer": { "@type": "Answer", "text": "That's normal. Most people don't have polished copy or photos lined up before they hire me. During discovery, I get everything I need about your business and write the copy from there — you just review it. For photos, we figure out what you have, what you need, and what we can grab." } },
    { "@type": "Question", "name": "What if I want changes after launch?", "acceptedAnswer": { "@type": "Answer", "text": "Two options. Grab the optional dashboard ($59/mo) and edit anything yourself in a few clicks. Or text me for one-off updates — most start around $75, depending on scope. If you'll be making changes more than once a month, the dashboard usually pays for itself." } },
    { "@type": "Question", "name": "Do I sign a long-term contract?", "acceptedAnswer": { "@type": "Answer", "text": "No. It's a one-time project, not a subscription. You pay 50% to start, 50% on launch — that's the whole deal. No retainer, no auto-renewal, no cancellation fee. The optional dashboard is month-to-month, so if you grab it later, you can cancel by letting me know before the next month starts." } },
    { "@type": "Question", "name": "How and when do I pay?", "acceptedAnswer": { "@type": "Answer", "text": "50% to start, 50% on launch. Stripe or Zelle — whichever's easiest. No hidden fees, no surprise invoices." } }
  ]
};

export default function WebsitesPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <main className="min-h-screen antialiased relative">
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        canonical={PAGE_URL}
        ogImage={OG_IMAGE}
        schema={[SERVICE_SCHEMA, FAQ_SCHEMA_FOR_HEAD]}
      />
      <BackgroundPaths />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-4 flex items-center justify-center lg:justify-between relative">
          <Link to="/" className="flex flex-col cursor-pointer overflow-visible">
            <div className="scale-[0.85] lg:scale-100 origin-center">
              <Logo variant="white" size="sm" type="full" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link to="/" className="nav-link text-[#d4d4d4] text-base tracking-wide">Home</Link>
            <Link to="/websites" className="nav-link nav-link-active text-base tracking-wide">Websites</Link>
            <Link to="/contractors" className="nav-link text-[#d4d4d4] text-base tracking-wide">For Contractors</Link>
            <Link to="/portfolio" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</Link>
            <Link to="/about" className="nav-link text-[#d4d4d4] text-base tracking-wide">About</Link>
            <a href="#contact" className="nav-button-premium px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">
              Let&apos;s Talk
            </a>
          </div>

          <button className="lg:hidden absolute right-4 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <IconX className="w-6 h-6 text-[#06b6d4]" /> : <IconMenu2 className="w-6 h-6 text-[#06b6d4]" />}
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
                <Link to="/websites" onClick={handleNavClick} className="nav-link nav-link-active text-base py-2">Websites</Link>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">For Contractors</Link>
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
          <p className={`text-[#2563eb] text-xs sm:text-sm font-medium tracking-[0.25em] uppercase mb-5 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Just need a website?
          </p>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-4 md:mb-5 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="text-gradient">
              I build it.<br />
              You own it.<br />
              Done.
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            One-time build, launched in 1–6 weeks. You walk away with every file, the domain, and the logins — no retainer, no lock-in, no hostage hosting.
          </p>

          <div className={`flex flex-col items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a
              href="#contact"
              className="clickable-hover w-full sm:w-72 px-6 py-4 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.15] hover:border-transparent shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#06b6d4] transition-all duration-200 ease-out text-base tracking-wide text-center hover:-translate-y-0.5 active:scale-[0.97]"
            >
              Start your build
            </a>
            <a href="#pricing" className="text-[#06b6d4] hover:text-white text-sm tracking-wide transition-colors">
              See pricing ↓
            </a>
          </div>

          <p className={`text-[#a3a3a3] text-sm mt-10 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Just me. No agency, no handoff, no account managers.{" "}
            <Link to="/portfolio" className="text-[#06b6d4] hover:text-white underline underline-offset-4 transition-colors">
              See the work →
            </Link>
          </p>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Pick your package</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Pick what fits.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6 mb-6" />
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                All builds include the foundation — mobile, fast, built to rank, and yours to keep. The only thing that changes is how much site you need.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Tier 1 — LANDING */}
            <ScrollReveal direction="up" delay={0.1}>
              <SpotlightGlow>
                <div className="p-8 md:p-10 h-full flex flex-col">
                  <p className="text-[#06b6d4] text-xs font-medium tracking-[0.25em] uppercase mb-3">Landing</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>$300</span>
                  </div>
                  <p className="text-[#a3a3a3] text-sm italic mb-6">Best for: one clear offer, one clear CTA.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "1 page, built to convert",
                      "Mobile-responsive, loads in under 2 seconds",
                      "Contact form, click-to-call, map embed",
                      "SEO foundation (schema, sitemap, meta tags)",
                      "Google Analytics 4 setup",
                      "You keep every file, the domain, and the logins",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[#d4d4d4] text-sm leading-relaxed">
                        <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="block w-full text-center px-6 py-3.5 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.15] hover:border-transparent hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#06b6d4] transition-all duration-200 text-sm tracking-wide">
                    Start a landing page →
                  </a>
                </div>
              </SpotlightGlow>
            </ScrollReveal>

            {/* Tier 2 — STARTER */}
            <ScrollReveal direction="up" delay={0.2}>
              <SpotlightGlow>
                <div className="p-8 md:p-10 h-full flex flex-col">
                  <p className="text-[#06b6d4] text-xs font-medium tracking-[0.25em] uppercase mb-3">Starter</p>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>$550</span>
                  </div>
                  <p className="text-[#a3a3a3] text-sm italic mb-6">Best for: a real website with room to grow.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {[
                      "3 pages (home, services, contact)",
                      "Everything in Landing",
                      "Custom section design — no template feel",
                      "FAQ or testimonials block",
                      "Up to 2 rounds of revisions",
                      "Priority launch slot",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[#d4d4d4] text-sm leading-relaxed">
                        <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className="block w-full text-center px-6 py-3.5 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.15] hover:border-transparent hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#06b6d4] transition-all duration-200 text-sm tracking-wide">
                    Start a starter site →
                  </a>
                </div>
              </SpotlightGlow>
            </ScrollReveal>

            {/* Tier 3 — FULL */}
            <ScrollReveal direction="up" delay={0.3}>
              <div className="relative h-full">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white text-xs font-semibold tracking-widest uppercase shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    Most common
                  </span>
                </div>
                <div className="relative h-full rounded-2xl border-2 border-[#06b6d4]/40 bg-[#111111] shadow-[0_0_40px_rgba(6,182,212,0.15)]">
                  <div className="p-8 md:p-10 h-full flex flex-col">
                    <p className="text-[#06b6d4] text-xs font-medium tracking-[0.25em] uppercase mb-3">Full</p>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>$750</span>
                    </div>
                    <p className="text-[#a3a3a3] text-sm italic mb-6">Best for: a complete site that covers every angle.</p>
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        "5 pages (home, about, services, contact + one more)",
                        "Everything in Starter",
                        "Expanded copy writing (About, services, trust sections)",
                        "More design depth — extra sections, custom imagery, more polish",
                        "Up to 3 rounds of revisions",
                        "Priority launch slot",
                      ].map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[#d4d4d4] text-sm leading-relaxed">
                          <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="#contact" className="block w-full text-center px-6 py-3.5 rounded-full text-white bg-gradient-to-r from-[#2563eb] to-[#06b6d4] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 text-sm tracking-wide font-medium">
                      Start a full site →
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-12 max-w-2xl mx-auto text-center">
            <p className="text-[#a3a3a3] text-sm leading-relaxed">
              <span className="text-white font-semibold">Need more than 5 pages?</span>{" "}
              <span className="italic">Custom builds start at $999. Tell me about your project and I&apos;ll quote it.</span>
            </p>
            <p className="text-[#808080] text-xs italic mt-6 leading-relaxed">
              All builds live in 1–6 weeks. Need it sooner? Tell me when you reach out and I&apos;ll see what I can do.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WHAT'S NOT INCLUDED ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Honest scope</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What I don&apos;t do — on purpose.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6 mb-6" />
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                What&apos;s on your tier&apos;s list is what I build. Everything else is a separate conversation — priced up front, no surprise invoices. Here&apos;s what&apos;s not in the price, so we&apos;re on the same page from day one.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="p-6 md:p-8 rounded-xl border border-white/[0.08] bg-[#111111]/60">
                <h3 className="text-xl font-semibold text-white mb-3">1. Ongoing marketing.</h3>
                <p className="text-[#d4d4d4] leading-relaxed italic">
                  No SEO maintenance, no Google Ads, no social media, no Google Business Profile management. I build the site. I don&apos;t run your marketing. If you want that handled for you every month,{" "}
                  <Link to="/contractors" className="text-[#06b6d4] hover:text-white underline underline-offset-4 not-italic">
                    that&apos;s the &ldquo;I want to grow my business&rdquo; door →
                  </Link>
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1}>
              <div className="p-6 md:p-8 rounded-xl border border-white/[0.08] bg-[#111111]/60">
                <h3 className="text-xl font-semibold text-white mb-3">2. Photos and brand assets.</h3>
                <p className="text-[#d4d4d4] leading-relaxed italic">
                  I&apos;ll write the copy — you just tell me anything specific you want included and I&apos;ll draft the rest. But photos, logos, and brand materials need to come from you. I&apos;m not running a photo shoot, and I&apos;m not your brand designer. Need a headshot or a logo? I can point you to someone — that&apos;s a separate conversation.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.15}>
              <div className="p-6 md:p-8 rounded-xl border border-white/[0.08] bg-[#111111]/60">
                <h3 className="text-xl font-semibold text-white mb-3">3. Post-launch edits.</h3>
                <p className="text-[#d4d4d4] leading-relaxed italic">
                  Once the site is live, you&apos;re in the driver&apos;s seat. Edits are on you — or grab the optional dashboard (more below) and make changes yourself in a few clicks.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="p-6 md:p-8 rounded-xl border border-white/[0.08] bg-[#111111]/60">
                <h3 className="text-xl font-semibold text-white mb-3">4. Custom systems.</h3>
                <p className="text-[#d4d4d4] leading-relaxed italic">
                  E-commerce backends, custom booking systems, membership logins, payment processors — building these from scratch isn&apos;t in the base tiers. But if you already use something like Stripe, Booksy, or Calendly, I can embed the link on your site for free — that&apos;s quick work. Need a custom system built from scratch? Tell me upfront and I&apos;ll quote it as its own project.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== WHY CUSTOM CODE ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Why custom code</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Why every site is built from scratch.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6 mb-6" />
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                Short version: you get more control, lower long-term cost, and no platform holding your site hostage. Here&apos;s the breakdown.
              </p>
            </ScrollReveal>
          </div>

          <div className="space-y-8">
            <ScrollReveal direction="up" delay={0.05}>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold">1</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">It&apos;s faster where it matters.</h3>
                  <p className="text-[#d4d4d4] leading-relaxed italic">
                    Template builders load a mountain of code your site doesn&apos;t actually need. Custom-built sites only load what&apos;s used — which shows up in Google&apos;s Core Web Vitals, the speed scores Google watches to rank mobile search results.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold">2</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">You control the technical SEO.</h3>
                  <p className="text-[#d4d4d4] leading-relaxed italic">
                    Google rewards fast performance, proper schema, and clean structured data. Template platforms give you a generic version of all three. Custom-coded means I can tune every page for the exact search you&apos;re trying to win — not the one-size-fits-all setup everyone else on the platform gets.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.15}>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold">3</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">No platform rent.</h3>
                  <p className="text-[#d4d4d4] leading-relaxed italic mb-4">
                    Your site runs on modern hosting for about $60 over 5 years — just the domain renewal. Compare that to what the platforms charge:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-4">
                    <div className="px-4 py-3 rounded-lg border border-[#06b6d4]/40 bg-[#06b6d4]/5">
                      <p className="text-[#06b6d4] text-sm font-semibold">Your custom-coded site</p>
                      <p className="text-white text-lg font-bold">~$60 / 5 years</p>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/5">
                      <p className="text-red-400/80 text-sm font-semibold">Wix Core</p>
                      <p className="text-[#d4d4d4] text-lg font-bold">~$1,080 / 5 years</p>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/5">
                      <p className="text-red-400/80 text-sm font-semibold">Squarespace Core</p>
                      <p className="text-[#d4d4d4] text-lg font-bold">~$1,460 / 5 years</p>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/5">
                      <p className="text-red-400/80 text-sm font-semibold">Webflow CMS</p>
                      <p className="text-[#d4d4d4] text-lg font-bold">~$1,380 / 5 years</p>
                    </div>
                    <div className="px-4 py-3 rounded-lg border border-red-500/20 bg-red-500/5 sm:col-span-2">
                      <p className="text-red-400/80 text-sm font-semibold">GoDaddy Premium</p>
                      <p className="text-[#d4d4d4] text-lg font-bold">~$1,700+ / 5 years</p>
                    </div>
                  </div>
                  <p className="text-[#d4d4d4] leading-relaxed italic">
                    You&apos;re paying for a domain, not renting access to your own site. (Want to edit pages yourself? I offer an optional dashboard — covered in the next section.)
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold">4</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">You actually own it — platforms don&apos;t let you leave.</h3>
                  <p className="text-[#d4d4d4] leading-relaxed italic mb-3">
                    Wix&apos;s own support docs say exporting your site is &ldquo;not possible.&rdquo; Squarespace exports are partial — most content won&apos;t transfer. GoDaddy has no export at all. Webflow lets you export HTML/CSS but not your content database. If you leave any of them, you&apos;re rebuilding from scratch.
                  </p>
                  <p className="text-[#d4d4d4] leading-relaxed italic">
                    When I build you a custom site, every file is yours — text, images, code, structure. Leave anytime. Bring in any developer. Host it anywhere.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.25}>
            <p className="text-center text-white text-lg md:text-xl italic mt-16 max-w-2xl mx-auto leading-relaxed">
              &ldquo;Most of your competitors are paying Wix rent forever — and they can&apos;t leave without starting over. You won&apos;t have that problem.&rdquo;
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== DASHBOARD ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Prefer to edit your website yourself?</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                I&apos;ll build you a dashboard.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6 mb-6" />
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                Make every change to your site yourself — text, photos, hours, prices, blog posts, anything. No code, no HTML, no tech background needed. Click what you want to update, make the change, hit save. Simple enough to use from your phone on a jobsite.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Cinzel', serif" }}>$59</span>
                  <span className="text-[#a3a3a3]">/month</span>
                  <span className="text-[#808080] text-sm italic ml-2">Completely optional. Month-to-month — cancel before the next month starts.</span>
                </div>

                <div className="border-l-2 border-[#06b6d4]/60 pl-5">
                  <p className="text-white font-semibold mb-2">The important part — and why this isn&apos;t a Wix subscription:</p>
                  <p className="text-[#d4d4d4] leading-relaxed italic">
                    If you cancel the dashboard, your site keeps running. The code is still yours, the site is still live — the only thing that goes away is the edit interface. You&apos;d just text me (or any developer) for changes after that.
                  </p>
                  <p className="text-[#d4d4d4] leading-relaxed italic mt-3">
                    Cancel Wix or Squarespace? Your site disappears the same day. That&apos;s the real difference between a dashboard and a platform.
                  </p>
                </div>

                <div>
                  <p className="text-[#a3a3a3] leading-relaxed">
                    <span className="text-white font-semibold">Skip it if</span>{" "}
                    <span className="italic">you set it up once and never plan to touch it. Most small business sites fall into this camp — hours don&apos;t change, services stay the same, you&apos;re not publishing weekly blog posts. If that&apos;s you, save the $59 and just text me when something needs updating.</span>
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PROCESS ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">The process</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                From first call to live site, in four steps.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div>
            {[
              { n: 1, title: "Discovery — Day 1", body: "A quick call. Tell me about your business and what you need the site to do. No pitch, just questions.", arrow: "Clear picture of what we're building." },
              { n: 2, title: "Proposal — Within 48 hours", body: "Exact scope, timeline, and price. No surprises. You see exactly what you're paying for before I start.", arrow: "Locked plan and start date." },
              { n: 3, title: "Build — 1 to 6 weeks", body: "You see progress along the way. I test everything before it goes live. No \u201Ctrust me, it'll be great\u201D black box.", arrow: "Working site, tested and ready." },
              { n: 4, title: "Launch — Day of", body: "I hand it over. Code, files, domain, logins — all yours. Add the dashboard if you want to edit, bring in any developer, or just let it run.", arrow: "Your site, live, owned by you.", last: true },
            ].map((step) => (
              <ScrollReveal key={step.n} direction="up" delay={0.05 * step.n}>
                <div className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {step.n}
                    </div>
                    {!step.last && <AnimatedUnderline vertical className="flex-1 min-h-[40px] my-2" />}
                  </div>
                  <div className="pb-10 pt-1 flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-[#d4d4d4] leading-relaxed italic">{step.body}</p>
                    <p className="text-[#06b6d4] text-sm italic mt-2">→ {step.arrow}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="border-l-2 border-[#06b6d4]/60 pl-5 my-8 max-w-2xl mx-auto">
              <p className="text-white italic leading-relaxed">
                &ldquo;Prefer not to get on a call? Same process, just over text. I&apos;ll send you a quick questionnaire — fill it out on your own time, and we go from there. A lot of busy clients like it this way.&rdquo;
              </p>
            </div>
          </ScrollReveal>

          <p className="text-center text-[#a3a3a3] italic mt-8 max-w-2xl mx-auto">
            &ldquo;Every build lands in 1 to 6 weeks. On a tighter deadline? Tell me when you reach out — I&apos;ll do what I can to fit you in.&rdquo;
          </p>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Common questions</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What people ask before we start.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl border border-white/[0.08] bg-[#111111]/60 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-white font-medium text-base md:text-lg">{faq.q}</span>
                  <IconChevronDown
                    className={`w-5 h-5 text-[#06b6d4] flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-[#d4d4d4] leading-relaxed italic">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Ready to build?</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Let&apos;s start your site.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              Tell me about your business. You could have a proposal in your inbox — scope, timeline, price — within 48 hours.
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
                  {[
                    "I read your message myself — usually within a few hours.",
                    "I send you a quick questionnaire. Continue by text or call, your choice.",
                    "I send a proposal with scope, timeline, and price.",
                    "If you approve, I send a one-page agreement and start the build.",
                  ].map((text, i, arr) => (
                    <div className="flex gap-4" key={i}>
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />}
                      </div>
                      <div className={`${i < arr.length - 1 ? 'pb-6' : ''} pt-1.5`}>
                        <p className="text-[#d0d0d0] text-sm leading-relaxed italic">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#808080] text-xs italic mt-5 leading-relaxed">
                  Prefer to skip the form? Just call or text the number above.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm
                  source="websites-page"
                  subjectPrefix="[/websites] New build inquiry"
                  showProjectTypeDropdown
                  showPhoneField
                />
              </div>
            </div>
          </div>

          <p className="text-center text-[#a3a3a3] text-sm italic mt-12 max-w-2xl mx-auto leading-relaxed">
            P.S. — If you only need a one-page site, I&apos;ll tell you. I&apos;m not going to talk you into more than you need.
          </p>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-6 border-t border-white/[0.06] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Contact</h4>
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
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Pages</h4>
              <div className="space-y-2 text-[#d4d4d4] text-sm">
                <p><Link to="/" className="hover:text-white transition-colors">Home</Link></p>
                <p><Link to="/websites" className="text-white transition-colors">Websites</Link></p>
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></p>
                <p><Link to="/about" className="hover:text-white transition-colors">About</Link></p>
                <p><a href="#contact" className="hover:text-white transition-colors">Contact</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Follow Along</h4>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/thekhanio" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61584909881446" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                  <IconBrandFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/thekhanio" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
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
