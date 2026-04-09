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
} from "@tabler/icons-react";

const TIMELINE_NODES = [
  {
    date: "Jun '24",
    body: "I started Clean & Green Property Care as a cleaning company. My wife and I ran every clean ourselves — move-in/move-out jobs, whatever the marketing brought in from the city to the burbs. The problem was keeping up with both the marketing and the field work.",
  },
  {
    date: "Jan '25",
    body: "I stopped doing the work myself. Started running everything through subcontractors — added landscaping, power washing, gutter cleaning, and lighting installs. Margins got tighter and the volume got higher. But the business side was finally the only thing on my plate.",
  },
  {
    date: "Oct '25",
    body: "I registered TheKhan as a company. I built the first version of the site, took on my first clients, and started running marketing for them on the side. It was still a side project — but I was spending more of my week on it than I should have been.",
  },
  {
    date: "Late '25",
    body: "A couple of subcontractors fell through, so I brought the work back in-house myself. I was out in the field again, running two routes that took me 15 to 20 hours straight to finish. The company hit 84 clients at peak — and between the workload and some old injuries, I knew the labor side wasn't my edge.",
  },
  {
    date: "Mar '26",
    body: "I closed Clean & Green. I'm all in on TheKhan now — building websites and running marketing for other people growing their own businesses. I treat every one of them like my own — because I know what that seat feels like.",
  },
];

const NEXT_STEPS = [
  "I read every message myself — usually within a few hours.",
  "I reply by call, text, or email — whatever works for you.",
  "If there's a project to talk about, we'll find time. If not, no pressure.",
];

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://thekhan.io/about#aboutpage",
      "url": "https://thekhan.io/about",
      "name": "About Omair Khan — Founder of TheKhan",
      "description": "The founder story behind TheKhan — how Omair Khan built and scaled his own home service company before pivoting to help other contractors and small businesses grow.",
      "isPartOf": { "@id": "https://thekhan.io/#website" },
      "mainEntity": { "@id": "https://thekhan.io/about#omair" },
    },
    {
      "@type": "Person",
      "@id": "https://thekhan.io/about#omair",
      "name": "Omair Khan",
      "url": "https://thekhan.io/about",
      "image": "https://thekhan.io/omair-headshot.webp",
      "jobTitle": "Founder",
      "description": "Founder of TheKhan, an independent web design and digital marketing studio in Deerfield, Illinois. Before TheKhan, Omair built and scaled his own home service company to 84 clients before pivoting to help other contractors and small businesses grow.",
      "worksFor": { "@id": "https://thekhan.io/#localbusiness" },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Deerfield",
        "addressRegion": "IL",
        "addressCountry": "US",
      },
      "knowsAbout": [
        "Web design",
        "Web development",
        "SEO",
        "Google Ads",
        "Local SEO",
        "Home service marketing",
        "Small business marketing",
      ],
    },
  ],
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <main className="min-h-screen antialiased relative">
      <SEO
        title="About Omair Khan — Founder of TheKhan | Chicago Web Design & Marketing"
        description="I'm Omair — solo operator of TheKhan. Before this I built my own home service company to 84 clients. Now I build websites and run marketing for others."
        canonical="https://thekhan.io/about"
        ogType="profile"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={ABOUT_SCHEMA}
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
            <Link to="/contractors" className="nav-link text-[#d4d4d4] text-base tracking-wide">For Contractors</Link>
            <Link to="/portfolio" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</Link>
            <Link to="/about" className="nav-link text-white text-base tracking-wide">About</Link>
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
                <Link to="/websites" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Websites</Link>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">For Contractors</Link>
                <Link to="/portfolio" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</Link>
                <Link to="/about" onClick={handleNavClick} className="nav-link text-white text-base py-2">About</Link>
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
            About
          </p>

          <h1
            className={`font-bold text-white leading-[1.15] mb-5 md:mb-6 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span
              className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gradient mb-6 md:mb-8"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Every business has two jobs.
            </span>

            <span
              className="flex items-center justify-center gap-5 sm:gap-8 md:gap-12 mb-6 md:mb-8 text-xs sm:text-sm md:text-base uppercase tracking-[0.2em] font-medium"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              <span className="text-white">Doing<br className="sm:hidden" /> the work</span>
              <span aria-hidden="true" className="block h-10 md:h-12 w-px bg-gradient-to-b from-transparent via-[#06b6d4] to-transparent" />
              <span className="text-white [text-shadow:0_0_8px_rgba(255,255,255,0.6),0_0_20px_rgba(6,182,212,1),0_0_38px_rgba(6,182,212,0.75),0_0_64px_rgba(6,182,212,0.45)]">Getting<br className="sm:hidden" /> the work</span>
            </span>

            <span
              className="block text-3xl sm:text-4xl md:text-[2.75rem] lg:text-5xl text-gradient whitespace-nowrap"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              The second one is all I do.
            </span>
          </h1>

          <p className={`text-lg sm:text-xl text-[#d4d4d4] max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            You keep doing the work. I&apos;ll keep it coming.
          </p>
        </div>
      </section>

      {/* ==================== HANDSHAKE INTRO ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who you&apos;re working with.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
                  <div className="flex-shrink-0">
                    <img
                      src="/omair-headshot.webp"
                      alt="Omair Khan, founder of TheKhan"
                      className="w-44 md:w-56 h-auto object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-5 text-[#d4d4d4] text-lg leading-relaxed text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                      Hi — I&apos;m Omair Khan.
                    </h3>
                    <p>
                      I&apos;m based in the Deerfield area. At my desk most days — and usually forgetting to check the clock.
                    </p>
                    <p>
                      I treat every business I work with like my own — because before this, I was running Clean &amp; Green Property Care, a home service business right here on the North Shore.
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== ORIGIN ARC ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                How I got here.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.05}>
            <p className="text-[#d4d4d4] text-lg leading-relaxed max-w-3xl mx-auto text-center mb-16">
              I scaled Clean &amp; Green to 84 clients. I ran the marketing that brought the jobs in while trying to do the work in the field. Turned out I was much better at one than the other — so I shut down Clean &amp; Green. I&apos;m all in on TheKhan now, doing the one thing I was good at: making the phone ring.
            </p>
          </ScrollReveal>

          <div className="max-w-3xl mx-auto">
            {TIMELINE_NODES.map((node, i, arr) => (
              <ScrollReveal key={node.date} direction="up" delay={i * 0.05}>
                <div className="flex gap-5 md:gap-6">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-16 h-16 md:w-[72px] md:h-[72px] rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-[11px] md:text-xs tracking-wide flex-shrink-0 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
                      {node.date}
                    </div>
                    {i < arr.length - 1 && <AnimatedUnderline vertical className="flex-1 min-h-[40px] my-2" />}
                  </div>
                  <div className={`${i < arr.length - 1 ? 'pb-10' : ''} pt-3 md:pt-4`}>
                    <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed">{node.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT THEKHAN IS NOW ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                What TheKhan is now.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.05}>
            <div className="max-w-3xl mx-auto space-y-6 text-[#d4d4d4] text-lg leading-relaxed">
              <p>
                Today, TheKhan does two things. I build{" "}
                <Link to="/websites" className="text-[#06b6d4] hover:text-white underline underline-offset-4 transition-colors">custom websites</Link>
                {" "}for small businesses. And I run{" "}
                <Link to="/contractors" className="text-[#06b6d4] hover:text-white underline underline-offset-4 transition-colors">monthly marketing for home service contractors</Link>
                {" "}who want their phone ringing every week.
              </p>
              <p>
                I work with a handful of clients at a time. If your project doesn&apos;t fit those two cleanly, reach out. I partner with Velli, a technology studio, when something needs deeper engineering or strategy muscle — if it&apos;s the right fit, I can usually make it work.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== HOW I WORK ==================== */}
      <section className="py-20 md:py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                How I work.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.05}>
            <div className="max-w-3xl mx-auto space-y-7 text-[#d4d4d4] text-lg leading-relaxed">
              <p>
                Code will always outperform a template. That&apos;s why I write every site from scratch — and why you own every line when I&apos;m done.
              </p>
              <p>
                You deal with me from day one — that&apos;s not a pitch, it&apos;s just how I work. Fewer handoffs, fewer things lost in translation, nobody else to chase if something slips.
              </p>
              <p>
                I&apos;d rather tell you &ldquo;no&rdquo; on a first call than waste your time pretending we&apos;re a fit. If that sounds like how you want to work, the next move is below.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Still here?</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Glad you made it here.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              If you&apos;ve got a question, a project, or just want to say hi, drop a note below.
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
                  {NEXT_STEPS.map((text, i, arr) => (
                    <div className="flex gap-4" key={i}>
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                          {i + 1}
                        </div>
                        {i < arr.length - 1 && <AnimatedUnderline vertical className="flex-1 min-h-[28px] my-1.5" />}
                      </div>
                      <div className={`${i < arr.length - 1 ? 'pb-6' : ''} pt-1.5`}>
                        <p className="text-[#d0d0d0] text-sm leading-relaxed">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[#808080] text-xs italic mt-5 leading-relaxed">
                  Rather call or text instead? The number&apos;s right above.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm
                  source="about-page"
                  subjectPrefix="[About form]"
                  showPhoneField
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
                <p><Link to="/websites" className="hover:text-white transition-colors">Websites</Link></p>
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></p>
                <p><Link to="/about" className="text-white transition-colors">About</Link></p>
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
