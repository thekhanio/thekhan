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

const HOME_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://thekhan.io/#website",
      "url": "https://thekhan.io",
      "name": "TheKhan",
      "description": "Independent web design and digital marketing studio founded by Omair Khan in Deerfield, IL.",
      "publisher": { "@id": "https://thekhan.io/#localbusiness" },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": "https://thekhan.io/#localbusiness",
      "name": "TheKhan",
      "description": "TheKhan is an independent web design and digital marketing studio founded by Omair Khan in Deerfield, Illinois. Serving home service businesses and growing companies across Chicagoland and remote clients nationwide, TheKhan builds custom websites and runs the marketing that drives real leads.",
      "url": "https://thekhan.io",
      "logo": "https://thekhan.io/portfolio/logo-white.png",
      "image": "https://thekhan.io/og-image.jpg",
      "telephone": "+18472208550",
      "email": "omair@thekhan.io",
      "priceRange": "$$",
      "openingHours": "Mo-Sa 10:30-20:00",
      "founder": { "@id": "https://thekhan.io/about#omair" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "655 Deerfield Rd, Suite 100, Unit 404",
        "addressLocality": "Deerfield",
        "addressRegion": "IL",
        "postalCode": "60015",
        "addressCountry": "US",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "42.1711",
        "longitude": "-87.8445",
      },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": "42.1711",
          "longitude": "-87.8445",
        },
        "geoRadius": "80000",
        "description": "Chicagoland area and Chicago suburbs",
      },
      "sameAs": [
        "https://www.linkedin.com/company/thekhanio",
        "https://www.instagram.com/thekhanio",
        "https://www.facebook.com/profile.php?id=61584909881446",
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Custom Website Design & Development",
              "description": "Custom-coded responsive websites built from scratch for small businesses, home service contractors, and growing companies. Mobile-friendly, SEO-optimized, owner-controlled — no template platforms or page builders.",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Monthly Marketing Retainers for Home Service Businesses",
              "description": "Ongoing marketing for home service contractors including SEO, Google Ads, Local Service Ads (LSA), Google Business Profile management, and lead generation. Built for plumbers, HVAC, roofing, electrical, landscaping, and other trades.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://thekhan.io/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What services does TheKhan offer?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TheKhan offers two main services: custom-coded website design and development for small businesses, plus monthly marketing retainers for home service contractors. Marketing retainers include SEO, Google Ads, Local Service Ads, Google Business Profile management, and lead generation.",
          },
        },
        {
          "@type": "Question",
          "name": "Where is TheKhan located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TheKhan is based in Deerfield, Illinois on Chicago's North Shore. Founded by Omair Khan, the studio serves businesses throughout Chicagoland and works with remote clients nationwide.",
          },
        },
        {
          "@type": "Question",
          "name": "Does TheKhan work with small businesses?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — TheKhan is built specifically for small and growing businesses. Every client works directly with founder Omair Khan, not an account manager or sales rep. TheKhan caps at a handful of clients per year to keep that direct relationship.",
          },
        },
        {
          "@type": "Question",
          "name": "How can I get started with TheKhan?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Get started by filling out the contact form at thekhan.io, calling or texting (847) 220-8550, or emailing omair@thekhan.io. Omair reads every message himself and usually replies within a few hours.",
          },
        },
        {
          "@type": "Question",
          "name": "What areas does TheKhan serve?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TheKhan serves businesses throughout Chicagoland — including Deerfield, Highland Park, Lake Forest, Northbrook, Glencoe, Winnetka, Bannockburn, and the broader Chicago metropolitan area. Remote clients welcome nationwide.",
          },
        },
      ],
    },
  ],
};
import {
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen antialiased relative">
      <SEO
        title="Custom Websites & Marketing for Growing Businesses | TheKhan"
        description="Custom websites and marketing that actually bring in business. One point of contact, start to finish."
        canonical="https://thekhan.io/"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={HOME_SCHEMA}
      />
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
            <Link to="/" className="nav-link nav-link-active text-base tracking-wide">Home</Link>
            <Link to="/websites" className="nav-link text-[#d4d4d4] text-base tracking-wide">Websites</Link>
            <Link to="/contractors" className="nav-link text-[#d4d4d4] text-base tracking-wide">For Contractors</Link>
            <Link to="/portfolio" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</Link>
            <Link to="/about" className="nav-link text-[#d4d4d4] text-base tracking-wide">About</Link>
            <a href="/#contact" className="nav-button-premium px-7 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium tracking-wide">
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
                <Link to="/" onClick={handleNavClick} className="nav-link nav-link-active text-base py-2">Home</Link>
                <Link to="/websites" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Websites</Link>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">For Contractors</Link>
                <Link to="/portfolio" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</Link>
                <Link to="/about" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">About</Link>
                <a href="/#contact" onClick={handleNavClick} className="nav-button-premium px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white rounded-full text-base font-medium text-center mt-2">
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
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-4 md:mb-5 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-gradient">
              Websites that rank.<br />
              Marketing that pays off.<br />
              Pick your door.
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            I custom-build your website — then stick around to grow the business, if we&apos;re a fit.
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Link
              to="/websites"
              className="clickable-hover w-full sm:w-72 px-6 py-4 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.15] hover:border-transparent shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#06b6d4] transition-all duration-200 ease-out text-base tracking-wide text-center hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[0_0_50px_rgba(6,182,212,0.8)]"
            >
              I need a website
            </Link>
            <Link
              to="/contractors"
              className="clickable-hover w-full sm:w-72 px-6 py-4 rounded-full text-[#d4d4d4] hover:text-white border border-white/[0.15] hover:border-transparent shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:bg-gradient-to-r hover:from-[#2563eb] hover:to-[#06b6d4] transition-all duration-200 ease-out text-base tracking-wide text-center hover:-translate-y-0.5 active:scale-[0.97] active:shadow-[0_0_50px_rgba(6,182,212,0.8)]"
            >
              I want to grow my business
            </Link>
          </div>

          <p className={`text-[#a3a3a3] text-sm mt-5 transition-all duration-700 delay-[400ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Just me. No agency. No pitch.
          </p>

          {/* Trust strip */}
          <div className={`mt-14 md:mt-20 pt-10 md:pt-12 border-t border-white/[0.06] transition-all duration-700 delay-[500ms] ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-[#606060] text-[11px] font-medium tracking-[0.25em] uppercase mb-6">Trusted by</p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 opacity-90">
              <img src="/portfolio/premier-partners-logo.png" alt="Premier Partners" className="h-14 md:h-16 w-auto object-contain" />
              <img src="/portfolio/marioscape-logo.png" alt="MarioScape" className="h-16 md:h-20 w-auto object-contain" />
              <img src="/portfolio/shifa-logo.png" alt="Shifa Home Care" className="h-14 md:h-16 w-auto object-contain" />
              <img src="/portfolio/nours-logo.png" alt="Nour's Barbershop" className="h-14 md:h-16 w-auto object-contain" />
              <img src="/portfolio/waf-logo.png" alt="WAF Chicago" className="h-14 md:h-16 w-auto object-contain" />
            </div>
            <p className="text-center mt-8">
              <Link to="/portfolio" className="text-[#06b6d4] hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors">
                See what I&apos;ve built →
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== WHO YOU'RE WORKING WITH ==================== */}
      <section id="about" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Who you&apos;re working with.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          {/* Founder intro — Omair + photo */}
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
                      I&apos;m Omair. Your direct line.
                    </h3>
                    <p>
                      I&apos;m a one-man shop — but that&apos;s the point. No account managers, no ticket queues, no &ldquo;let me check with the team.&rdquo; Whether that&apos;s one project or a long-term run, you&apos;re dealing with me from day one.
                    </p>
                    <div className="border-l-2 border-[#06b6d4]/60 pl-5 my-2">
                      <p className="text-white">
                        I use new AI tools to build faster and squeeze more out of every page. You get what&apos;s working right now — not strategies from a year ago.
                      </p>
                    </div>
                    <p className="text-[#a3a3a3] text-base">
                      For partnerships, I cap at a handful of clients at a time — if I&apos;m at capacity, I&apos;ll tell you upfront. One-time website builds usually have room. I can fit those in around the partnership work.
                    </p>
                    <div className="pt-2">
                      <Link to="/about" className="text-[#06b6d4] hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors">
                        Read my full story →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Not sure which door?</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Let&apos;s talk it through.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              Tell me where you&apos;re at. I&apos;ll give you my honest recommendation. No sales pitch.
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
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">I read your message myself — usually within a few hours.</p>
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
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">I&apos;ll reach back out by call or text — whatever works for you.</p>
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
                      <p className="text-[#d0d0d0] text-sm leading-relaxed">If you&apos;d like to move forward, we&apos;ll book a quick call so I can dig into your business.</p>
                    </div>
                  </div>
                </div>
                <p className="text-[#808080] text-xs italic mt-5 leading-relaxed">
                  Prefer to skip the form? Just call or text the number above.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="bg-[#111111] rounded-2xl p-8 border border-white/[0.08]">
                <ContactForm source="homepage" subjectPrefix="[Homepage form]" />
              </div>
            </div>
          </div>

          <p className="text-center text-[#a3a3a3] text-sm italic mt-12 max-w-2xl mx-auto leading-relaxed">
            P.S. — I&apos;d rather tell you &ldquo;no&rdquo; on a first call than waste your time pretending we&apos;re a fit.
          </p>
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
                <p><Link to="/" className="text-white transition-colors">Home</Link></p>
                <p><Link to="/websites" className="hover:text-white transition-colors">Websites</Link></p>
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link></p>
                <p><Link to="/about" className="hover:text-white transition-colors">About</Link></p>
                <p><a href="/#contact" className="hover:text-white transition-colors">Contact</a></p>
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
