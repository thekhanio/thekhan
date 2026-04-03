import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ContactForm } from "@/components/ContactForm";
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
  IconMapPinFilled,
  IconMenu2,
  IconSearch,
  IconDeviceMobile,
  IconCalendar,
  IconCurrencyDollar,
  IconAlertTriangle,
  IconMoodSad,
  IconChartBar,
  IconTruck,
} from "@tabler/icons-react";

export default function ContractorsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen antialiased relative">
      <Helmet>
        <title>Contractors — TheKhan</title>
        <meta name="description" content="Custom websites, Google Ads, and marketing for home service contractors. Make your phone ring." />
        <link rel="canonical" href="https://thekhan.io/contractors" />
        <meta property="og:title" content="Contractors — TheKhan" />
        <meta property="og:description" content="Custom websites, Google Ads, and marketing for home service contractors. Make your phone ring." />
        <meta property="og:url" content="https://thekhan.io/contractors" />
        <meta property="og:image" content="https://thekhan.io/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-IL" />
        <meta name="geo.placename" content="Deerfield" />
        <meta name="geo.position" content="42.1711;-87.8445" />
        <meta name="ICBML" content="42.1711, -87.8445" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contractors — TheKhan" />
        <meta name="twitter:description" content="Custom websites, Google Ads, and marketing for home service contractors. Make your phone ring." />
        <meta name="twitter:image" content="https://thekhan.io/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfessionalService",
              "@id": "https://thekhan.io/#localbusiness",
              "name": "TheKhan",
              "url": "https://thekhan.io",
              "logo": "https://thekhan.io/logo.png",
              "image": "https://thekhan.io/og-image.jpg",
              "email": "hello@thekhan.io",
              "telephone": "(847) 220-8550",
              "description": "Custom websites, software, AI systems, and marketing for growing businesses",
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
              "name": "Home Service Contractor Marketing",
              "description": "Custom websites, Google Ads, SEO, and digital marketing for home service contractors — landscapers, power washers, plumbers, and handymen.",
              "provider": { "@id": "https://thekhan.io/#localbusiness" },
              "areaServed": "Chicago metropolitan area",
              "serviceType": "Home Service Contractor Marketing"
            }
          ]
        })}</script>
      </Helmet>

      <BackgroundPaths />

      {/* Navigation — same as homepage */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-4 flex items-center justify-center lg:justify-between relative">
          <Link to="/" className="flex flex-col cursor-pointer overflow-visible">
            <div className="scale-[0.85] lg:scale-100 origin-center">
              <Logo variant="white" size="sm" type="full" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link to="/" className="nav-link text-[#d4d4d4] text-base tracking-wide">Home</Link>
            <a href="/#work" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</a>
            <span className="nav-link text-white text-base tracking-wide">For Contractors</span>
            <a href="#contact" className="nav-button-premium px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">
              Get Your Free Audit
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
                <a href="/#work" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</a>
                <span className="nav-link text-white text-base py-2">For Contractors</span>
                <a href="#contact" onClick={handleNavClick} className="nav-button-premium px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium text-center mt-2">
                  Get Your Free Audit
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ==================== HERO ==================== */}
      <section className="relative z-10 min-h-[75vh] flex items-center overflow-hidden pt-20 md:pt-16">
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <div className="mb-6 md:mb-8">
            <span className="text-xs md:text-base font-medium tracking-[0.15em] md:tracking-[0.3em] uppercase text-[#2563eb]">
              For Home Service Contractors
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.15] mb-5 md:mb-7"
          >
            <span className="text-gradient">You Do the Work.<br />I Make Sure People Find You.</span>
          </h1>

          <p className="text-sm md:text-lg text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto text-center">
            Your competitor shows up online. You don&apos;t. Every day that stays true, they get the call — not you. Let&apos;s fix that.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MovingBorderButton
              as="a"
              href="#contact"
              borderRadius="9999px"
              containerClassName="h-14 w-full sm:w-64 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out clickable-hover active:scale-[0.98]"
              className="text-base px-8 tracking-wide"
              duration={3000}
            >
              Get Your Free Audit
            </MovingBorderButton>
          </div>
        </div>
      </section>

      {/* ==================== PAIN POINTS ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Sound familiar?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {contractorPains.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 0.1} direction="up">
                <SpotlightGlow tilt className="h-full">
                  <div className="p-8 md:p-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {point.icon}
                    </div>
                    <h3 className="text-white font-semibold text-xl mb-3">
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
        </div>
      </section>

      {/* ==================== WHAT YOU GET ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Here's what changes.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                This is what it looks like when your digital presence actually works.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {outcomes.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1} direction="up">
                <SpotlightGlow tilt className="h-full">
                  <div className="p-7 md:p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mb-6 border border-[#2563eb]/30 group-hover:border-[#06b6d4]/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DAMAGING ADMISSIONS ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Let me be honest.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="space-y-6">
            {admissions.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <SpotlightGlow>
                  <div className="p-8 md:p-10">
                    <p className="text-[#d4d4d4] text-lg leading-relaxed">
                      <span className="text-[#a3a3a3]">{item.flaw}</span>{" "}
                      <span className="text-white font-medium">{item.benefit}</span>
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PROOF ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                  {proofStats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl md:text-3xl font-semibold text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        {stat.num}
                      </p>
                      <p className="text-[#a3a3a3] text-xs md:text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.06] pt-6">
                  <p className="text-[#d4d4d4] text-sm text-center">
                    See the <a href="https://servicesfrompremier.com" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] hover:text-[#06b6d4] transition-colors">5-site ecosystem</a> we built for Premier Partners — power washing, holiday lighting, auto detailing, and snow removal.
                  </p>
                  <p className="text-[#a3a3a3] text-xs text-center mt-3">
                    Active contractor case studies in progress · Results coming Q2 2026
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== PRICING ==================== */}
      <section id="pricing" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Simple pricing. No surprises.
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                No contracts. No hidden fees. Cancel anytime.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} direction="up" delay={i * 0.1}>
                <div className="relative h-full">
                  {tier.anchor && (
                    <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#2563eb] z-0 opacity-50" />
                  )}
                  <SpotlightGlow tilt className={`h-full ${tier.anchor ? "relative z-10" : ""}`}>
                    <div className="p-7 md:p-8 flex flex-col h-full">
                      {tier.anchor && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white self-start mb-4">
                          Recommended
                        </span>
                      )}
                      <h3 className="font-semibold text-xl text-white mb-1" style={{ fontFamily: "'Cinzel', serif" }}>
                        {tier.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                          {tier.price}
                        </span>
                        <span className="text-sm text-[#a3a3a3]">{tier.period}</span>
                      </div>
                      <p className="text-[#a3a3a3] text-sm mb-6">
                        {tier.desc}
                      </p>
                      <ul className="space-y-2.5 flex-1">
                        {tier.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-sm text-[#d4d4d4]">
                            <IconCheck className="w-4 h-4 text-[#06b6d4] mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </SpotlightGlow>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-[#a3a3a3] text-sm mt-8">
              All plans include full code ownership. You're never locked in — to a platform, a tool, or us.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== WHO IT'S FOR ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Is this for you?
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Built for you if
                    </h3>
                    <ul className="space-y-4">
                      {contractorFit.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#2563eb] mt-1 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-[#a3a3a3] font-semibold text-lg mb-6" style={{ fontFamily: "'Cinzel', serif" }}>
                      Not a fit if
                    </h3>
                    <ul className="space-y-4">
                      {contractorNotFit.map((item) => (
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

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Free Audit</p>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Let&apos;s See Where You Stand.
              </h2>
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                Fill out the form. I'll send you a free audit of your online presence within 24 hours — where you show up, where you don't, and what your competitors are doing that you're not.
              </p>
              <p className="text-[#a3a3a3] text-sm mt-4">
                I take on a handful of contractors at a time. If I'm full, I'll tell you.
              </p>
            </ScrollReveal>
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
                <p><Link to="/" className="hover:text-white transition-colors">Home</Link></p>
                <p><a href="/#work" className="hover:text-white transition-colors">Portfolio</a></p>
                <p><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></p>
                <p><Link to="/services" className="hover:text-white transition-colors">All Services</Link></p>
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
                Your digital partner.<br />Making contractors&apos; phones ring.
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

const contractorPains = [
  {
    icon: <IconSearch className="w-6 h-6 text-[#2563eb]" />,
    title: "Your phone only rings from people you already know.",
    desc: "A homeowner three blocks from your last job just Googled exactly what you do. Your competitor showed up. You didn't. They got the call. You didn't even know it happened.",
  },
  {
    icon: <IconMoodSad className="w-6 h-6 text-[#2563eb]" />,
    title: "You tried posting on social media. Nothing happened.",
    desc: "You spent an hour taking photos on the job site, wrote a caption, posted it. Three likes — all from people you know. Meanwhile, the guy down the road has his phone ringing off the hook and you can't figure out what he's doing differently.",
  },
  {
    icon: <IconCurrencyDollar className="w-6 h-6 text-[#2563eb]" />,
    title: "You're paying $2,000/mo for ads and can't tell what's working.",
    desc: "Someone's running your Google Ads. They send you a report full of numbers you don't understand. You're not sure if the calls are coming from the ads, from Google Maps, or from the yard sign you put out last spring. You just know it's expensive.",
  },
  {
    icon: <IconTruck className="w-6 h-6 text-[#2563eb]" />,
    title: "Your competitor's truck keeps showing up.",
    desc: "You drive past a house you quoted last month. There's another company's truck in the driveway. They got the job. Not because they're better — because they showed up first when the homeowner searched online. That's the game now.",
  },
];

const outcomes = [
  {
    icon: <IconDeviceMobile className="w-7 h-7 text-[#06b6d4]" />,
    title: "Your phone buzzes at 7 AM.",
    desc: "A homeowner found you on Google. They already looked at your site, saw your work, and want a quote. You didn't chase them. They came to you.",
  },
  {
    icon: <IconCalendar className="w-7 h-7 text-[#06b6d4]" />,
    title: "Your calendar fills itself.",
    desc: "You stop scrambling for the next job. Leads come in steady — not just in peak season, but through the slow months too. You start turning work away instead of chasing it.",
  },
  {
    icon: <IconChartBar className="w-7 h-7 text-[#06b6d4]" />,
    title: "You know exactly what's working.",
    desc: "Every call tracked. Every dollar accounted for. You can see which jobs came from Google, which came from your Google Business Profile, and which came from ads. No guessing.",
  },
];

const pricingTiers = [
  {
    name: "Full Digital Takeover",
    price: "$3,000–5,000",
    period: "/mo",
    desc: "Everything handled. Website, Google Ads, SEO, social media, AI receptionist, content creation, and monthly strategy calls. For contractors doing $500K+ who want to hit $1M.",
    features: [
      "Custom website — hand-coded, not a template",
      "Google Ads — setup, management, and optimization",
      "SEO and Google Business Profile management",
      "Social media management",
      "AI receptionist + AI chatbot",
      "Monthly strategy calls",
      "Content creation",
      "Priority support",
    ],
    anchor: false,
  },
  {
    name: "Manage",
    price: "$535",
    period: "/mo",
    desc: "Your website, Google Business Profile, and SEO — managed month to month. The foundation that makes everything else work.",
    features: [
      "Custom website — built and maintained",
      "Google Business Profile management",
      "SEO — show up when they search",
      "Content dashboard — edit your own site",
      "Monthly reporting",
      "Same-day support",
    ],
    anchor: true,
  },
  {
    name: "Foundation",
    price: "$275",
    period: "/mo",
    desc: "A hand-coded website and basic maintenance. The starting point for contractors who need to get online the right way.",
    features: [
      "Custom website — hand-coded",
      "Mobile responsive",
      "Basic SEO setup",
      "Monthly maintenance",
      "Content dashboard",
    ],
    anchor: false,
  },
];

const admissions = [
  {
    flaw: "I'm not a 50-person company.",
    benefit: "But that means I personally build everything — your website, your ads, your Google profile. No junior dev. No handoff. No surprises.",
  },
  {
    flaw: "I can only take a handful of contractors at a time.",
    benefit: "But that's why every one of them gets my personal attention. You're not ticket #847 in a queue.",
  },
  {
    flaw: "Your site won't be done in 48 hours.",
    benefit: "But it'll be hand-coded to load faster than anything your competitors have. Code will always outperform a template.",
  },
  {
    flaw: "I haven't been doing this for 20 years.",
    benefit: "But I've reverse-engineered every competitor in your market and I know exactly what they're doing wrong — because I've been in your industry myself.",
  },
];

const contractorFit = [
  "You're growing and want more jobs — without figuring out marketing yourself",
  "Your phone only rings from repeat customers and referrals — you want new leads finding you online",
  "You're paying for ads but can't tell if they're working",
  "You want a real website — not a template that looks like every other contractor's",
  "You're ready to invest in something that compounds over time",
];

const contractorNotFit = [
  "You want a cheap template and a monthly PDF report — there are plenty of companies that do that",
  "You need your phone ringing by Friday — real marketing takes 60-90 days to build momentum",
  "You want to run your own ads and just need someone to push buttons",
  "You're not ready to invest in your online presence yet",
];

const proofStats = [
  { num: "8+", label: "Sites built" },
  { num: "5", label: "Home services sites" },
  { num: "4", label: "Industries served" },
  { num: "0", label: "Templates used" },
];
