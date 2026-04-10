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
  IconArrowUpRight,
} from "@tabler/icons-react";

const PAGE_TITLE = "Portfolio — Custom Websites for Small Businesses | TheKhan";
const PAGE_DESC = "Omair is an independent web designer at TheKhan who builds custom-coded websites for home service businesses across the Chicago area.";
const PAGE_URL = "https://thekhan.io/portfolio";
const OG_IMAGE = "https://thekhan.io/portfolio-og.jpg";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/portfolio#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "The Work", "item": "https://thekhan.io/portfolio" },
  ],
};

const COLLECTION_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://thekhan.io/portfolio#collectionpage",
  "name": PAGE_TITLE,
  "description": PAGE_DESC,
  "url": PAGE_URL,
  "isPartOf": { "@id": "https://thekhan.io/#website" },
  "mainEntity": {
    "@type": "ItemList",
    "itemListOrder": "https://schema.org/ItemListOrderAscending",
    "numberOfItems": 5,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "WebSite", "name": "Premier Partners", "url": "https://servicesfrompremier.com", "about": "Multi-brand home services company serving Cook, Lake, and McHenry counties plus southern Wisconsin" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "WebSite", "name": "MarioScape", "url": "https://marioscape.com", "about": "North Shore landscaping company" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "WebSite", "name": "Shifa Home Care", "url": "https://shifahomecareservices.com", "about": "Chicagoland home care" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "WebSite", "name": "Nour's Barbershop", "url": "https://noursbarbershop.com", "about": "Morton Grove barbershop" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "WebSite", "name": "WAF Chicago", "url": "https://wafchicago.org", "about": "Nonprofit organization" } },
    ],
  },
};

const PREMIER_SUBSITES = [
  { name: "Premier Partners", url: "https://servicesfrompremier.com", display: "servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png" },
  { name: "Power Washing from Premier", url: "https://powerwashingfrompremier.com", display: "powerwashingfrompremier.com", logo: "/portfolio/premier-powerwashing-logo.png" },
  { name: "Holiday Lighting from Premier", url: "https://lightingfrompremier.com", display: "lightingfrompremier.com", logo: "/portfolio/premier-lighting-logo.png" },
  { name: "Premier Auto Spa", url: "https://detailingfrompremier.com", display: "detailingfrompremier.com", logo: "/portfolio/premier-detailing-logo.png" },
  { name: "Plowing from Premier", url: "https://plowingfrompremier.com", display: "plowingfrompremier.com", logo: "/portfolio/premier-plowing-logo.png" },
  { name: "Paver Restoration from Premier", url: "https://paversfrompremier.com", display: "paversfrompremier.com", logo: "/portfolio/premier-paver-logo.png" },
];

const SMALL_CARDS = [
  { name: "MarioScape", niche: "North Shore landscaping company", url: "https://marioscape.com", display: "marioscape.com", screenshot: "/portfolio/marioscape-screenshot.jpg", alt: "MarioScape homepage — custom-built by TheKhan" },
  { name: "Shifa Home Care", niche: "Chicagoland home care", url: "https://shifahomecareservices.com", display: "shifahomecareservices.com", screenshot: "/portfolio/shifa-screenshot.jpg", alt: "Shifa Home Care homepage — custom-built by TheKhan" },
  { name: "Nour's Barbershop", niche: "Morton Grove barbershop", url: "https://noursbarbershop.com", display: "noursbarbershop.com", screenshot: "/portfolio/nours-screenshot.jpg", alt: "Nour's Barbershop homepage — custom-built by TheKhan" },
  { name: "WAF Chicago", niche: "Nonprofit organization", url: "https://wafchicago.org", display: "wafchicago.org", screenshot: "/portfolio/waf-screenshot.jpg", alt: "WAF Chicago homepage — custom-built by TheKhan" },
];

export default function PortfolioPage() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        schema={[BREADCRUMB_SCHEMA, COLLECTION_PAGE_SCHEMA]}
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
            <Link to="/websites" className="nav-link text-[#d4d4d4] text-base tracking-wide">Websites</Link>
            <Link to="/contractors" className="nav-link text-[#d4d4d4] text-base tracking-wide">For Contractors</Link>
            <Link to="/portfolio" className="nav-link nav-link-active text-base tracking-wide">Portfolio</Link>
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
                <Link to="/websites" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Websites</Link>
                <Link to="/contractors" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">For Contractors</Link>
                <Link to="/portfolio" onClick={handleNavClick} className="nav-link nav-link-active text-base py-2">Portfolio</Link>
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
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-5 md:mb-6 text-center transition-all duration-700 delay-150 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-gradient">
              Built by me.<br />
              Owned by them.<br />
              Live right now.
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-[#a3a3a3] max-w-2xl mx-auto text-center transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Five clients. Ten custom-coded sites.<br />
            Click any logo and see for yourself.
          </p>
        </div>
      </section>

      {/* ==================== PROOF GRID ==================== */}
      <section className="py-16 md:py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14 md:mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                The work.
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          {/* Premier anchor card */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-10 md:mb-12">
              <SpotlightGlow>
                <div className="overflow-hidden">
                  <a href="https://servicesfrompremier.com" target="_blank" rel="noopener noreferrer" className="block group">
                    <img
                      src="/portfolio/premier-hub-screenshot.jpg"
                      alt="Premier Partners hub site — servicesfrompremier.com, custom-built by TheKhan"
                      className="w-full h-auto object-cover border-b border-white/[0.06] group-hover:opacity-90 transition-opacity duration-300"
                      loading="lazy"
                    />
                  </a>
                  <div className="p-6 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>
                      Premier Partners
                    </h3>
                    <p className="text-[#06b6d4] text-sm md:text-base mb-8">
                      Multi-brand home services • Cook, Lake, McHenry counties + southern Wisconsin
                    </p>

                    {/* 6 sub-brand tiles — logo card + domain caption beneath, whole thing clickable */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 md:gap-6">
                      {PREMIER_SUBSITES.map((sub) => (
                        <a
                          key={sub.url}
                          href={sub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex flex-col items-center min-w-0"
                          aria-label={`${sub.display} — ${sub.name}`}
                          title={sub.name}
                        >
                          <div className="relative w-full flex items-center justify-center h-24 md:h-28 lg:h-32 px-4 md:px-6 py-4 rounded-xl bg-[#0a0a0a]/60 border border-white/[0.06] group-hover:border-[#06b6d4]/40 group-hover:bg-[#06b6d4]/[0.04] group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_24px_rgba(6,182,212,0.15)] transition-all duration-300">
                            <img
                              src={sub.logo}
                              alt={sub.name}
                              className="max-h-full max-w-full object-contain opacity-70 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-300"
                              loading="lazy"
                            />
                            <IconArrowUpRight className="absolute top-2.5 right-2.5 w-4 h-4 text-[#06b6d4] opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300" />
                          </div>
                          <span className="mt-3 text-[11px] md:text-sm text-[#a3a3a3] group-hover:text-white text-center tracking-wide truncate w-full px-1 transition-colors duration-200">
                            {sub.display}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightGlow>
            </div>
          </ScrollReveal>

          {/* 4 smaller cards — 2x2 grid on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {SMALL_CARDS.map((card, i) => (
              <ScrollReveal key={card.url} direction="up" delay={0.1 + i * 0.05}>
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-[#111111] rounded-2xl border border-white/[0.08] overflow-hidden hover:border-[#06b6d4]/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)]"
                >
                  <div className="overflow-hidden border-b border-white/[0.06]">
                    <img
                      src={card.screenshot}
                      alt={card.alt}
                      className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-1.5" style={{ fontFamily: "'Cinzel', serif" }}>
                      {card.name}
                    </h3>
                    <p className="text-[#06b6d4] text-sm mb-5">{card.niche}</p>
                    <div className="flex items-center gap-1.5 text-[#d4d4d4] group-hover:text-white text-sm tracking-wide transition-colors">
                      <span>Visit {card.display}</span>
                      <IconArrowUpRight className="w-4 h-4 text-[#06b6d4] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <ScrollReveal direction="up">
              <Link to="/about" className="text-[#06b6d4] hover:text-white text-sm tracking-wide underline underline-offset-4 transition-colors">
                The person behind these projects &rarr;
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="py-24 px-6 relative z-10 scroll-mt-20">
        <div className="max-w-3xl mx-auto relative">
          <div className="text-center mb-12">
            <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Like what you see?</p>
            <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
              Let&apos;s talk.
            </h2>
            <p className="text-[#d4d4d4] text-lg max-w-xl mx-auto">
              Tell me about your project. I&apos;ll get back to you personally.
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
                    "I'll reach back out by call or text — whatever works for you.",
                    "If you'd like to talk, we'll book a quick call so I can dig into your project.",
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
                  source="portfolio-page"
                  subjectPrefix="[Portfolio form]"
                  showProjectTypeDropdown
                  showPhoneField
                  submitText="Send it →"
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
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><Link to="/portfolio" className="text-white transition-colors">Portfolio</Link></p>
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
