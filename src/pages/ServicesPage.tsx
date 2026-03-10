import { useEffect, useState } from "react";
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
  IconPhone,
  IconMail,
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMapPinFilled,
  IconMenu2,
  IconX,
  IconWorldWww,
  IconMapPin,
  IconSearch,
  IconPalette,
  IconCode,
  IconShield,
  IconBrandGoogle,
  IconRobot,
  IconChartBar,
  IconShare,
  IconRefresh,
  IconTargetArrow,
  IconDeviceAnalytics,
} from "@tabler/icons-react";

function ServiceCard({ icon, title, desc, index }: { icon: React.ReactNode; title: string; desc: string; index: number }) {
  return (
    <ScrollReveal direction="up" delay={index * 0.08}>
      <SpotlightGlow tilt className="h-full">
        <div className="p-7 md:p-8 flex flex-col h-full">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/20 flex items-center justify-center mb-5 group-hover:border-[#06b6d4]/40 group-hover:from-[#2563eb]/25 group-hover:to-[#06b6d4]/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
            <div className="text-[#06b6d4] group-hover:text-[#38bdf8] transition-colors duration-500">{icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>{title}</h3>
          <p className="text-[#a3a3a3] text-sm leading-relaxed">{desc}</p>
        </div>
      </SpotlightGlow>
    </ScrollReveal>
  );
}

export default function ServicesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen antialiased relative">
      <Helmet>
        <title>Services — TheKhan</title>
        <meta name="description" content="Custom websites, SEO, Google Ads, social media, and AI tools for growing businesses. Real code, real team, no templates. See everything we handle." />
        <link rel="canonical" href="https://thekhan.io/services" />
        <meta property="og:title" content="Services — TheKhan" />
        <meta property="og:description" content="Custom websites, SEO, Google Ads, social media, and AI tools for growing businesses. Real code, real team, no templates." />
        <meta property="og:url" content="https://thekhan.io/services" />
        <meta property="og:image" content="https://thekhan.io/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta name="geo.region" content="US-IL" />
        <meta name="geo.placename" content="Deerfield" />
        <meta name="geo.position" content="42.1711;-87.8445" />
        <meta name="ICBML" content="42.1711, -87.8445" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Services — TheKhan" />
        <meta name="twitter:description" content="Custom websites, SEO, Google Ads, social media, and AI tools for growing businesses. Real code, real team, no templates." />
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
              "name": "Digital Marketing Services",
              "description": "Custom websites, SEO, Google Ads, social media management, and AI tools for growing businesses. Build, manage, and grow your digital presence.",
              "provider": { "@id": "https://thekhan.io/#localbusiness" },
              "areaServed": "Chicago metropolitan area",
              "serviceType": "Digital Marketing"
            }
          ]
        })}</script>
      </Helmet>

      <BackgroundPaths />

      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.05]" style={{ position: 'fixed' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-4 lg:py-4 flex items-center justify-center lg:justify-between relative">
          <Link to="/" className="flex flex-col cursor-pointer overflow-visible">
            <div className="scale-[0.85] lg:scale-100 origin-center">
              <Logo variant="white" size="sm" type="full" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <Link to="/" className="nav-link text-[#d4d4d4] text-base tracking-wide">Home</Link>
            <span className="nav-link text-white text-base tracking-wide">Services</span>
            <a href="/#work" className="nav-link text-[#d4d4d4] text-base tracking-wide">Portfolio</a>
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
                <Link to="/" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Home</Link>
                <span className="nav-link text-white text-base py-2">Services</span>
                <a href="/#work" onClick={handleNavClick} className="nav-link text-[#d4d4d4] text-base py-2">Portfolio</a>
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
      <section className="relative z-10 min-h-[60vh] flex items-center overflow-hidden pt-20 md:pt-16">
        <div className="max-w-4xl mx-auto px-6 w-full text-center">
          <p className="text-sm sm:text-base tracking-[0.3em] uppercase text-[#2563eb] mb-6 md:mb-8" style={{ fontFamily: "'Cinzel', serif" }}>
            Build &middot; Manage &middot; Grow
          </p>
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] mb-5 md:mb-7 tracking-[0.04em] md:tracking-[0.06em]"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            <span className="text-gradient">Build. Manage. Grow.</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-[#a3a3a3] mb-8 md:mb-10 max-w-2xl mx-auto">
            Everything we do falls into one of three buckets — and each one exists to make your business easier to find, easier to run, and harder to ignore.
          </p>
        </div>
      </section>

      {/* ==================== BUILD ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Build
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Your online presence is the first thing people see. We make sure it&apos;s worth looking at.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {buildServices.map((svc, i) => (
              <div key={svc.title} className="w-full">
                <ServiceCard icon={svc.icon} title={svc.title} desc={svc.desc} index={i} />
              </div>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <p className="text-center text-[#a3a3a3] text-xs mt-8">
              Custom software starts at $5,000+ and is scoped as its own project. Most clients don&apos;t need this — but if you do, we build it.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== MANAGE ==================== */}
      <section className="py-16 lg:py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Manage
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                After launch, most people disappear. We don&apos;t. This is what &ldquo;managed&rdquo; actually means.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {manageServices.map((svc, i) => (
              <div key={svc.title} className="w-full">
                <ServiceCard icon={svc.icon} title={svc.title} desc={svc.desc} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-page CTA */}
      <section className="py-12 px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal direction="up">
            <Link to="/contractors">
              <MovingBorderButton
                as="div"
                borderRadius="9999px"
                containerClassName="h-14 w-full sm:w-64 mx-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-200 ease-out clickable-hover active:scale-[0.98]"
                className="text-base px-8 tracking-wide"
                duration={3000}
              >
                See How It Works
              </MovingBorderButton>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== GROW ==================== */}
      <section className="py-16 lg:py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Grow
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Your foundation is set. Now we put money behind it — and make sure every dollar comes back.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {growServices.map((svc, i) => (
              <div key={svc.title} className="w-full">
                <ServiceCard icon={svc.icon} title={svc.title} desc={svc.desc} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ADD-ONS ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Add-Ons
              </h2>
              <p className="text-[#a3a3a3] text-lg">
                Available at any tier. You don&apos;t need the top package to get these.
              </p>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>

          <div className="max-w-lg mx-auto">
            <ScrollReveal direction="up">
              <SpotlightGlow tilt className="h-full">
                <div className="p-7 md:p-8 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/20 flex items-center justify-center mb-5 group-hover:border-[#06b6d4]/40 group-hover:from-[#2563eb]/25 group-hover:to-[#06b6d4]/25 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="text-[#06b6d4] group-hover:text-[#38bdf8] transition-colors duration-500">
                      <IconRobot className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: "'Cinzel', serif" }}>AI Chatbot &amp; Receptionist</h3>
                  <p className="text-[#a3a3a3] text-sm leading-relaxed">AI that answers calls, books appointments, and handles questions 24/7 — even after hours. Chat widget on your site that captures leads and gives rough quotes. Available as an add-on to any tier.</p>
                </div>
              </SpotlightGlow>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== HOW IT ALL CONNECTS ==================== */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <ScrollReveal direction="up">
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                How It Connects
              </h2>
              <AnimatedUnderline className="w-48 md:w-64 mx-auto mt-6" />
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up">
            <SpotlightGlow>
              <div className="p-8 md:p-12">
                <p className="text-[#d4d4d4] text-lg leading-relaxed">
                  Most clients start with Build. Some add Manage right away. Grow comes when the foundation is ready — and we&apos;ll tell you when that is. Not every business needs ads on day one. But when you&apos;re ready, every dollar you spend will actually work because the foundation is already there.
                </p>
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
              <p className="text-[#a3a3a3] text-sm tracking-widest uppercase mb-6">Seen enough?</p>
              <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Start a conversation.
              </h2>
              <p className="text-[#d4d4d4] text-lg max-w-2xl mx-auto">
                Tell us where you are and what you need. We&apos;ll get back to you within 24 hours.
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
                <p><Link to="/contractors" className="hover:text-white transition-colors">For Contractors</Link></p>
                <p><a href="#contact" className="hover:text-white transition-colors">Contact</a></p>
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

const buildServices = [
  {
    icon: <IconWorldWww className="w-6 h-6" />,
    title: "Custom Websites",
    desc: "Real code, not templates. Faster load times, higher search rankings, and a site you actually own. Not Wix, not GHL templates, not a drag-and-drop page builder.",
  },
  {
    icon: <IconMapPin className="w-6 h-6" />,
    title: "Google Business Profile Setup",
    desc: "Your Google Business Profile is often the first thing people see — before your website. We set it up, verify it, and optimize it so you show up in local search.",
  },
  {
    icon: <IconSearch className="w-6 h-6" />,
    title: "SEO Foundation",
    desc: "When someone Googles what you do, you show up. That's not luck — we build it into every site from day one. Technical work behind the scenes so you start ranking immediately.",
  },
  {
    icon: <IconPalette className="w-6 h-6" />,
    title: "Branding & Identity",
    desc: "Logo, business cards, brand look — sharp and consistent everywhere your name shows up.",
  },
  {
    icon: <IconCode className="w-6 h-6" />,
    title: "Custom Software",
    desc: "Web apps, internal tools, automations — built around how your business actually works. Priced as its own project.",
  },
];

const manageServices = [
  {
    icon: <IconRefresh className="w-6 h-6" />,
    title: "Site Maintenance & Updates",
    desc: "Content changes, design updates, bug fixes — handled same-day. Your site never goes stale.",
  },
  {
    icon: <IconShield className="w-6 h-6" />,
    title: "Security & Hosting",
    desc: "Your site stays live, loads fast, and never goes down at 2 AM. We handle backups, security, and monitoring so you never think about it.",
  },
  {
    icon: <IconSearch className="w-6 h-6" />,
    title: "Search Rankings",
    desc: "Rankings don't hold themselves. We monitor, adjust, and keep you showing up — on Google, ChatGPT, Perplexity, and Siri.",
  },
  {
    icon: <IconShare className="w-6 h-6" />,
    title: "Social Media",
    desc: "Strategy, content, posting, and engagement across your platforms. Consistent presence without you lifting a finger.",
  },
  {
    icon: <IconMapPin className="w-6 h-6" />,
    title: "Google Business Profile Management",
    desc: "Weekly posts, review responses, photo updates, info edits. Your Google Business Profile stays active and current.",
  },
  {
    icon: <IconChartBar className="w-6 h-6" />,
    title: "Analytics, Tracking & Reporting",
    desc: "We track where your calls, clicks, and customers come from. Monthly check-ins with real numbers — not a PDF nobody reads.",
  },
];

const growServices = [
  {
    icon: <IconBrandGoogle className="w-6 h-6" />,
    title: "Google Ads",
    desc: "We manage your ads end to end — budget, targeting, optimization. Your money, your ad account, full transparency.",
  },
  {
    icon: <IconTargetArrow className="w-6 h-6" />,
    title: "Retargeting & Paid Social",
    desc: "Someone visited your site but didn't call? We bring them back. Ads on Facebook, Instagram, and Google that follow up for you.",
  },
  {
    icon: <IconDeviceAnalytics className="w-6 h-6" />,
    title: "Ad Tracking",
    desc: "Every click, every call, every form — tracked back to the source. You know exactly where your customers came from.",
  },
];
