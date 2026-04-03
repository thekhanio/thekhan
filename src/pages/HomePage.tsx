import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ContactForm } from "@/components/ContactForm";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import {
  IconAlertTriangle,
  IconEye,
  IconClock,
  IconHammer,
  IconSettings,
  IconTrendingUp,
  IconCheck,
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMapPinFilled,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

const premierSites = [
  { name: "Premier Partners", logo: "/portfolio/premier-partners-logo.png", url: "https://servicesfrompremier.com", label: "Hub Site" },
  { name: "Premier Power Washing", logo: "/portfolio/premier-powerwashing-logo.png", url: "https://powerwashingfrompremier.com", label: "Power Washing" },
  { name: "Premier Holiday Lighting", logo: "/portfolio/premier-lighting-logo.png", url: "https://lightingfrompremier.com", label: "Holiday Lighting" },
  { name: "Premier Auto Spa", logo: "/portfolio/premier-detailing-logo.png", url: "https://detailingfrompremier.com", label: "Auto Detailing" },
  { name: "Premier Seasonal Services", logo: "/portfolio/premier-plowing-logo.png", url: "https://plowingfrompremier.com", label: "Snow Removal" },
];


export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [premierExpanded, setPremierExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen antialiased relative">
      <Helmet>
        <title>TheKhan | Custom Websites, AI Systems, Software &amp; Marketing</title>
        <meta name="description" content="Custom websites and marketing that make your phone ring. Built for home service contractors and growing businesses by a real team from real code. No templates, no lock-in." />
        <link rel="canonical" href="https://thekhan.io/" />
        <meta property="og:title" content="TheKhan | Custom Websites, AI Systems, Software & Marketing" />
        <meta property="og:description" content="A founder, an engineer, and a strategist — building custom websites, AI systems, software, and marketing for growing businesses. Real code. Real team. No templates." />
        <meta property="og:url" content="https://thekhan.io/" />
        <meta property="og:image" content="https://thekhan.io/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-IL" />
        <meta name="geo.placename" content="Deerfield" />
        <meta name="geo.position" content="42.1711;-87.8445" />
        <meta name="ICBML" content="42.1711, -87.8445" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TheKhan | Custom Websites, AI Systems, Software & Marketing" />
        <meta name="twitter:description" content="Custom websites and marketing that make your phone ring. Built for home service contractors and growing businesses by a real team from real code. No templates, no lock-in." />
        <meta name="twitter:image" content="https://thekhan.io/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://thekhan.io/#organization",
              "name": "TheKhan",
              "url": "https://thekhan.io",
              "logo": "https://thekhan.io/logo.png",
              "email": "hello@thekhan.io",
              "telephone": "(847) 220-8550",
              "sameAs": [
                "https://www.linkedin.com/company/thekhanio",
                "https://www.instagram.com/thekhanio",
                "https://www.facebook.com/profile.php?id=61584909881446"
              ]
            },
            {
              "@type": "ProfessionalService",
              "@id": "https://thekhan.io/#localbusiness",
              "name": "TheKhan",
              "url": "https://thekhan.io",
              "logo": "https://thekhan.io/logo.png",
              "image": "https://thekhan.io/og-image.jpg",
              "email": "hello@thekhan.io",
              "telephone": "(847) 220-8550",
              "description": "Custom websites, SEO, Google Ads, and marketing for home service contractors and growing businesses. Real code, real team, no templates.",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "655 Deerfield Rd, Suite 100, Unit 404",
                "addressLocality": "Deerfield",
                "addressRegion": "IL",
                "postalCode": "60015",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 42.1711,
                "longitude": -87.8445
              },
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": 42.1711,
                  "longitude": -87.8445
                },
                "geoRadius": "50mi",
                "name": "Chicago metropolitan area"
              },
              "sameAs": [
                "https://www.linkedin.com/company/thekhanio",
                "https://www.instagram.com/thekhanio",
                "https://www.facebook.com/profile.php?id=61584909881446"
              ]
            },
            {
              "@type": "Service",
              "name": "Custom Website Development",
              "description": "Custom-coded websites for businesses. Fast, mobile-responsive, SEO-optimized sites built from real code — not templates or page builders. You own everything.",
              "provider": { "@id": "https://thekhan.io/#localbusiness" },
              "areaServed": "Chicago metropolitan area",
              "serviceType": "Web Development"
            },
            {
              "@type": "Service",
              "name": "Home Service Contractor Marketing",
              "description": "Websites, SEO, Google Business Profile optimization, Google Ads, and Local Service Ads management for home service contractors — landscapers, power washers, roofers, plumbers, and more.",
              "provider": { "@id": "https://thekhan.io/#localbusiness" },
              "areaServed": "Chicago metropolitan area",
              "serviceType": "Home Service Contractor Marketing"
            }
          ]
        })}</script>
      </Helmet>

      <BackgroundPaths />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-4 flex items-center justify-center lg:justify-between relative">
          <a href="#" className="flex flex-col cursor-pointer overflow-visible" onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}>
            <div className="scale-[0.85] lg:scale-100 origin-center">
              <Logo variant="white" size="sm" type="full" />
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-12">
            <a href="#services" className="nav-link text-[#d4d4d4] text-base tracking-wide">Services</a>
            <a href="#work" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</a>
            <Link to="/contractors" className="nav-link text-[#d4d4d4] text-base tracking-wide">For Contractors</Link>
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
                <a href="#services" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Services</a>
                <a href="#work" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</a>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">For Contractors</Link>
                <a href="#contact" onClick={handleNavClick} className="nav-button-premium px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium text-center mt-2">
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative z-10 min-h-[75vh] flex items-center overflow-hidden pt-0 md:pt-16">
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <h1
            className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-3 md:mb-4 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-gradient">You Never Showed Up. Your Competitor Did.</span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            They searched for exactly what you do. You&apos;re great at it — people just can&apos;t find you yet.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="9999px"
              containerClassName="h-14 w-full sm:w-52 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out clickable-hover active:scale-[0.98]"
              className="text-base px-8 tracking-wide"
              duration={3000}
            >
              See If We&apos;re a Fit
            </MovingBorderButton>
            <a
              href="#work"
              className="clickable-hover w-full sm:w-auto px-8 py-4 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.1] hover:border-white/25 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out text-base tracking-wide active:scale-[0.98]"
            >
              See Our Portfolio
            </a>
          </div>
        </div>
      </section>

      {/* ==================== THE PROBLEM ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                You&apos;re Losing Business and You Don&apos;t Even Know It.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 0.1} direction="up">
                <SpotlightGlow tilt className="h-full">
                  <div className="p-8 md:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {point.icon}
                    </div>
                    <h3 className="text-white font-bold text-xl mb-3">
                      {point.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-base leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-lg md:text-xl text-white mt-16 max-w-xl mx-auto leading-relaxed">
              This doesn&apos;t fix itself. And it&apos;s costing you more than you think.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT WE DO ==================== */}
      <section id="services" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Here&apos;s what changes.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                We handle three things. Each one builds on the last.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {serviceCards.map((card, i) => (
              <ScrollReveal key={card.title} direction="up" delay={i * 0.1}>
                <SpotlightGlow tilt className="h-full">
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {card.icon}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">
                      {card.desc}
                    </p>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {card.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-[#a3a3a3] text-sm">
                          <span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">
                      {card.price}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="text-center mt-8 space-y-5">
              <p className="text-[#a3a3a3] text-sm">One team. Three things. Everything connected.</p>
              <Link to="/services">
                <MovingBorderButton
                  borderRadius="9999px"
                  containerClassName="h-12 w-full sm:w-56 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out clickable-hover active:scale-[0.98]"
                  className="text-sm px-6 tracking-wide"
                  duration={3000}
                >
                  See the Full Breakdown
                </MovingBorderButton>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== HOW TO WORK WITH US ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Choose your path.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Two ways to work with us.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="up" delay={0.1}>
              <SpotlightGlow tilt className="h-full">
                <div className="p-7 md:p-8 flex flex-col h-full">
                  <span className="text-[#2563eb] text-xs font-semibold tracking-[0.2em] uppercase mb-4">One-time</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>The Project</h3>
                  <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">We build it. You own it. Done.</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Clear scope, clear timeline, clear price</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>You get the code, the assets, and every login</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Bring in any developer after — no lock-in</li>
                  </ul>
                  <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">Always open — no waitlist.</p>
                </div>
              </SpotlightGlow>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <SpotlightGlow tilt className="h-full">
                <div className="p-7 md:p-8 flex flex-col h-full relative">
                  <span className="text-[#06b6d4] text-xs font-semibold tracking-[0.2em] uppercase mb-4">Ongoing</span>
                  <h3 className="text-xl md:text-2xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>The Partnership</h3>
                  <p className="text-[#d4d4d4] text-base leading-relaxed mb-5">We become your digital team. Everything managed, month to month. No contracts.</p>
                  <ul className="space-y-2.5 mb-6 flex-1">
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>One team handling everything — not five freelancers</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Monthly check-ins with real reporting</li>
                    <li className="flex items-start gap-2.5 text-[#a3a3a3] text-sm"><span className="text-[#2563eb] mt-0.5 flex-shrink-0">&rarr;</span>Cancel anytime — no contracts, no exit fees</li>
                  </ul>
                  <p className="text-white/80 font-medium text-sm pt-4 border-t border-white/[0.06]">Limited spots per quarter · Month to month</p>
                </div>
              </SpotlightGlow>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-[#a3a3a3] text-sm mt-8">We only take on a few partnerships at a time so we can actually deliver. If we&apos;re at capacity, we&apos;ll tell you upfront.</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== HOW WE WORK ==================== */}
      <section className="py-24 px-6 relative z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                How we work.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                From first call to launch — here&apos;s how it works.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="space-y-0">
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.12} direction="left">
                <div className="flex gap-6 md:gap-8 pl-4 md:pl-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {i + 1}
                    </div>
                    <AnimatedUnderline vertical className="flex-1 min-h-[40px] my-2" />
                  </div>
                  <div className="pb-12">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                        {step.title}
                      </h3>
                      <span className="text-xs text-[#2563eb] bg-[#2563eb]/10 px-2.5 py-1 rounded-full font-medium">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-[#d4d4d4] text-base leading-relaxed">
                      {step.desc}
                    </p>
                    <p className="text-[#a3a3a3] text-sm mt-2">
                      &rarr; {step.deliverable}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Step 4 — Fork */}
            <ScrollReveal delay={0.36} direction="left">
              <div className="flex gap-6 md:gap-8 pl-4 md:pl-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    4
                  </div>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-xl md:text-2xl font-semibold text-white" style={{ fontFamily: "'Cinzel', serif" }}>
                      Launch
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SpotlightGlow tilt>
                      <div className="p-5">
                        <p className="text-sm text-[#2563eb] font-medium mb-2 uppercase tracking-wider">Project</p>
                        <p className="text-[#d4d4d4] text-base leading-relaxed">
                          We hand it over. You own everything — code, assets, logins. Make edits yourself, bring in any developer, or keep us on call. You&apos;re never locked into a platform, a tool, or anyone — including us.
                        </p>
                        <p className="text-[#a3a3a3] text-sm mt-2">
                          &rarr; Full ownership and handoff
                        </p>
                      </div>
                    </SpotlightGlow>
                    <SpotlightGlow tilt>
                      <div className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-sm text-[#06b6d4] font-medium uppercase tracking-wider">Partnership</p>
                        </div>
                        <p className="text-[#d4d4d4] text-base leading-relaxed">
                          We go live, then handle the day-to-day — updates, marketing, support. You focus on running your business.
                        </p>
                        <p className="text-[#a3a3a3] text-sm mt-2">
                          &rarr; Ongoing management and growth
                        </p>
                      </div>
                    </SpotlightGlow>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Process stats */}
          <ScrollReveal direction="up" delay={0.48}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mt-8 pt-10 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>1-6 weeks</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">From first call to launch</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>A few calls</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Time required from you</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>Yours</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Code, assets, and logins</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== OUR WORK ==================== */}
      <section id="work" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Portfolio.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Real code. Real builds. No shortcuts.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-wrap justify-center items-start gap-6 md:gap-16">
              {clients.map((client, i) => {
                const isPremier = client.name === "Premier Partners";
                return (
                  <motion.a
                    key={client.name}
                    href={isPremier ? undefined : client.url}
                    target={isPremier ? undefined : "_blank"}
                    rel={isPremier ? undefined : "noopener noreferrer"}
                    className="cursor-pointer flex flex-col items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileTap={{ scale: 0.95 }}
                    title={client.name}
                    onClick={isPremier ? (e: React.MouseEvent) => { e.preventDefault(); setPremierExpanded(!premierExpanded); } : undefined}
                  >
                    <SpotlightGlow tilt>
                      <div className="p-6 md:p-8">
                        <img
                          src={client.logo}
                          alt={client.name}
                          className={`w-auto object-contain transition-all duration-300 ${client.size || 'h-32 md:h-40'}`}
                        />
                      </div>
                    </SpotlightGlow>
                    <div className="flex flex-col items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 md:translate-y-[-4px] md:group-hover:translate-y-0">
                      <span className="text-white text-sm font-medium">{client.name}</span>
                      <span className="text-[#a3a3a3] text-xs">{client.industry}</span>
                      {client.outcome && <span className="text-[#06b6d4] text-[10px] font-medium">{client.outcome}</span>}
                      <span className="text-[#2563eb] text-xs tracking-wide mt-0.5">{isPremier ? (premierExpanded ? "Click to collapse" : "Click to explore") : "Visit site"} &rarr;</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Premier expanded row */}
          <AnimatePresence>
            {premierExpanded && (
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                  {premierSites.map((site, i) => (
                    <motion.a
                      key={site.name}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center gap-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 25 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <SpotlightGlow tilt>
                        <div className="p-4 md:p-5 w-[140px] md:w-[170px] h-[120px] md:h-[140px] flex items-center justify-center">
                          <img src={site.logo} alt={site.name} className="h-16 md:h-20 w-auto object-contain" />
                        </div>
                      </SpotlightGlow>
                      <div className="flex flex-col items-center gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300">
                        <span className="text-white text-xs font-medium text-center">{site.label}</span>
                        <span className="text-[#2563eb] text-[10px] tracking-wide">Visit site &rarr;</span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Stats bar */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 pt-10 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>100%</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Custom code — zero templates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>8+</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Sites & systems shipped</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>1</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Team. Not five freelancers.</p>
              </div>
              <div className="text-center">
                <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>0</p>
                <p className="text-[#a3a3a3] text-xs md:text-sm">Clients locked into contracts</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHAT MAKES THIS DIFFERENT ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                What Makes This Different.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Not the right fit for everyone. Here&apos;s why that&apos;s a good thing.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <h3 className="text-[#a3a3a3] font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Not this
                    </h3>
                    <ul className="space-y-4">
                      {notThis.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#a3a3a3]">
                          <IconX className="w-4 h-4 text-[#a3a3a3]/50 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      This instead
                    </h3>
                    <ul className="space-y-4">
                      {thisInstead.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#2563eb] mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHO THIS IS FOR ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who this is for.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                We can&apos;t help everyone. But if this sounds like you, we should talk.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Good fit
                    </h3>
                    <ul className="space-y-4">
                      {goodFit.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#2563eb] mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#a3a3a3] font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Not a fit
                    </h3>
                    <ul className="space-y-4">
                      {notAFit.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#a3a3a3]">
                          <IconX className="w-4 h-4 text-[#a3a3a3]/50 mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHO WE ARE ==================== */}
      <section id="about" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who we are.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                One point of contact. A real team behind it.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          {/* Founder intro */}
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="space-y-6 text-[#d4d4d4] text-lg leading-relaxed">
                  <p>
                    Three people. That&apos;s who works on your business. Not a rotating cast of juniors, not a faceless agency — three people who know your name and pick up when you call.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>

          {/* Three pillars — three people */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {teamPillars.map((pillar, i) => (
              <ScrollReveal key={pillar.title} direction="up" delay={0.15 + i * 0.1}>
                <SpotlightGlow tilt className="h-full">
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {pillar.icon}
                    </div>
                    <span className="text-[#2563eb] text-xs font-semibold tracking-[0.2em] uppercase mb-2">{pillar.label}</span>
                    <h3 className="text-xl font-semibold text-white mb-3" style={{ fontFamily: "'Cinzel', serif" }}>
                      {pillar.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>

          {/* AI differentiator + limited capacity */}
          <ScrollReveal direction="up" delay={0.4}>
            <SpotlightGlow className="mt-6">
              <div className="p-8 md:p-12">
                <div className="space-y-6 text-[#d4d4d4] text-lg leading-relaxed">
                  <p>
                    Most companies in this space are running the same playbook from 2017. Same tools. Same strategy. Same monthly PDF nobody reads. We build with AI every day and ship new tools the moment they drop. You&apos;re not getting last year&apos;s strategy — you&apos;re getting what works right now, backed by a real engineer and a real strategist.
                  </p>
                  <p>
                    We take on a handful of clients at a time. That&apos;s not a sales tactic — the work falls apart if we&apos;re stretched across 30 accounts. If we&apos;re at capacity, we&apos;ll tell you upfront.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Let&apos;s see if we&apos;re the right fit.</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Start a conversation.
            </h2>
            <p className="text-[#d4d4d4] text-lg">
              Fill out the form. We&apos;ll get back to you within 24 hours with honest feedback on where you stand and what we&apos;d do differently. We take on a handful of clients at a time — if we&apos;re full, we&apos;ll tell you.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8 flex flex-col items-center lg:items-start">
              <div>
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
                  <a href="mailto:hello@thekhan.io" className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center group-hover:border-[#2563eb]/50 transition-colors flex-shrink-0">
                      <IconMail className="w-4 h-4 text-[#2563eb]" />
                    </div>
                    <div className="flex flex-col pt-1">
                      <span className="text-[#2563eb] text-sm font-medium">Email</span>
                      <span className="text-[#d0d0d0] group-hover:text-white transition-colors">Hello@TheKhan.io</span>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white uppercase tracking-widest mb-5 text-center lg:text-left">Office</h3>
                <div className="flex items-start gap-4 text-[#d4d4d4]">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2563eb]/10 to-[#06b6d4]/10 border border-[#2563eb]/30 flex items-center justify-center flex-shrink-0">
                    <IconMapPinFilled className="w-4 h-4 text-[#2563eb]" />
                  </div>
                  <div className="pt-2.5 leading-relaxed">
                    655 Deerfield Rd<br />Suite 100, Unit 404<br />Deerfield, IL 60015
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm />
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
                <p><a href="mailto:hello@thekhan.io" className="hover:text-white transition-colors">Hello@TheKhan.io</a></p>
                <p><a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Pages</h4>
              <div className="space-y-2 text-[#d4d4d4] text-sm">
                <p><a href="#services" className="hover:text-white transition-colors">Services</a></p>
                <p><a href="#work" className="hover:text-white transition-colors">Portfolio</a></p>
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/services" className="hover:text-white transition-colors">Full Services Breakdown</Link></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Follow Us</h4>
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

// ==================== DATA ====================

const painPoints = [
  {
    icon: <IconAlertTriangle className="w-6 h-6 text-[#2563eb]" />,
    title: "They searched. You weren't there.",
    desc: "Right now, someone in your area is searching for exactly what you offer. They're not typing your name — they don't know you exist. They see whoever shows up first. If that's not you, they're calling someone else. And you'll never know it happened.",
  },
  {
    icon: <IconEye className="w-6 h-6 text-[#2563eb]" />,
    title: "They looked you up. They didn't call.",
    desc: "Before anyone reaches out, they check your website, your reviews, your social media. If what they see looks outdated — or doesn't exist — they move on. You're losing people who were ready to buy.",
  },
  {
    icon: <IconClock className="w-6 h-6 text-[#2563eb]" />,
    title: "You are the marketing department.",
    desc: "It's 10 PM and you're searching \"how to get more customers.\" You're posting when you can, guessing at what works, and wondering why your competitor always seems one step ahead.",
  },
];

const serviceCards = [
  {
    icon: <IconHammer className="w-7 h-7 text-[#2563eb]" />,
    title: "Build",
    desc: "Someone finds you online. Your site loads fast, looks sharp, and tells them exactly why they should call. Real code, not a template — faster, ranks higher, and you own every line.",
    features: [
      "Websites and software built from real code — not Wix, not GHL templates, not a drag-and-drop page builder",
      "AI tools that answer calls and capture leads",
      "You own everything — code, assets, logins",
    ],
    price: "One-time projects — scoped to your needs.",
  },
  {
    icon: <IconSettings className="w-7 h-7 text-[#2563eb]" />,
    title: "Manage",
    desc: "Something breaks at 9 PM on a Tuesday. You text one number. It's fixed before morning. No ticket queue. No chatbot. A real person who already knows your setup.",
    features: [
      "Updates, security, and hosting — all handled",
      "Your site stays live, fast, and current",
      "One point of contact — not a support desk",
    ],
    price: "Ongoing — included with partnerships.",
  },
  {
    icon: <IconTrendingUp className="w-7 h-7 text-[#2563eb]" />,
    title: "Grow",
    desc: "Monday morning. Three new inquiries from people who found you over the weekend. We put you where they're already looking — search, social, ads, AI.",
    features: [
      "Show up when they search — Google, ChatGPT, Siri",
      "Ads that bring the right people to your door",
      "Social media — posting, engagement, and strategy",
    ],
    price: "Ongoing — built into every partnership.",
  },
];

const processSteps = [
  {
    title: "Discovery",
    timeline: "Day 1",
    desc: "A quick call. We learn your business, your goals, and what's not working. No pitch — just questions.",
    deliverable: "Clear picture of where you stand and what to do about it",
  },
  {
    title: "Proposal",
    timeline: "Within 48 hours",
    desc: "Exact scope, timeline, and price. No surprises, no hidden fees. You know what you're getting before we start.",
    deliverable: "Approved plan and start date",
  },
  {
    title: "Build",
    timeline: "1-6 weeks",
    desc: "You see progress along the way. We test everything before it goes live. You're never in the dark.",
    deliverable: "Working product, tested and ready",
  },
];


const clients = [
  { name: "Clean & Green Property Care", industry: "Property Maintenance", url: "https://cleangreenproperty.com", logo: "/portfolio/clean-green-logo.png", outcome: "Website + GBP + Google Ads" },
  { name: "Shifa Home Care", industry: "Home Care", url: "https://shifahomecareservices.com", logo: "/portfolio/shifa-logo.png", outcome: "Website + SEO + Paid Ads" },
  { name: "Women's Association Forum", industry: "Nonprofit", url: "https://wafchicago.org", logo: "/portfolio/waf-logo.png", size: "h-28 md:h-36", outcome: "Full nonprofit web presence" },
  { name: "Premier Partners", industry: "Home Services", url: "https://servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png", outcome: "5-site brand ecosystem" },
];

const teamPillars = [
  {
    icon: <IconHammer className="w-7 h-7 text-[#06b6d4]" />,
    label: "Cameron Olechowski",
    title: "Lead Engineer",
    desc: "Engineer with experience at Plex and Small World. Every site, every app, every system — built in-house from real code. No templates, no shortcuts, no outsourcing.",
  },
  {
    icon: <IconSettings className="w-7 h-7 text-[#06b6d4]" />,
    label: "Zach Abbasi",
    title: "Growth & Operations",
    desc: "Spent years helping businesses adopt new technology — then learned to build it himself. Systems, automations, and infrastructure — he handles what runs behind the scenes.",
  },
  {
    icon: <IconTrendingUp className="w-7 h-7 text-[#06b6d4]" />,
    label: "Omair Khan",
    title: "Your Point of Contact",
    desc: "Built a service company to 90 clients and spent his own money figuring out what actually works online. Now he runs yours — SEO, ads, social media, Google Business Profile. When you call, he picks up.",
  },
];

const notThis = [
  "A big agency where you're account #47",
  "A freelancer who disappears after launch",
  "A platform that locks you into their ecosystem",
  "A template that looks like everyone else's site",
  "An agency that takes your money and runs ads with no foundation — no site, no tracking, no way to know what's working",
];

const thisInstead = [
  "We're not a 50-person agency, but that means the founder is on every project — not a junior dev you've never met",
  "We can't take on 30 clients at once, but that's why the ones we do take on actually get results",
  "Hand-coded from scratch — code will always outperform a template, and we'll show you the speed difference",
  "You own everything. Code, domain, data, accounts. Walk away anytime — we'll even help you transition out",
  "We'll tell you you're not ready for ads yet — most won't. We build the foundation first so every dollar you spend actually converts.",
];

const goodFit = [
  "You've been meaning to redo your website for two years — it's always next month's problem",
  "You've hired freelancers, tried agencies, maybe even did it yourself — and you're done piecing it together",
  "You're Googling marketing advice at 10 PM because nobody's handling it for you",
  "You're paying for marketing but can't point to a single customer it brought in",
  "You're ready to do this right — not the cheapest option, not the fastest, but something that actually works",
];

const notAFit = [
  "You're shopping for the cheapest option — we're not it, and we won't pretend to be",
  "You want to run everything yourself and just need someone to push buttons",
  "You need results by Friday — real marketing compounds over months, not days",
  "You've been burned before and aren't ready to trust anyone with this again (we get it — but we can't help if you won't let us)",
];
