import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Eyebrow, DisplayH2, MonoNum } from "@/components/editorial";
import { IconPhone, IconMail, IconArrowUpRight, IconPlayerPlayFilled, IconX } from "@tabler/icons-react";

const PAGE_TITLE = "Portfolio — Custom Websites for Small Businesses | TheKhan";
const PAGE_DESC = "Custom websites I've built for small businesses across Chicago and beyond — home service companies, local shops, and nonprofits. Every one is live right now.";
const PAGE_URL = "https://thekhan.io/portfolio";
const OG_IMAGE = "https://thekhan.io/portfolio-og.png";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/portfolio#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
    { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://thekhan.io/portfolio" },
  ],
};

// Live work shown on the page — every distinct live site (6 Premier domains + 5
// in the client grid). Mirrors worker/index.js verbatim (meta-desync rule).
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
    "numberOfItems": 11,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "WebSite", "name": "Premier Partners", "url": "https://servicesfrompremier.com" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "WebSite", "name": "Premier Power Washing", "url": "https://powerwashingfrompremier.com" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "WebSite", "name": "Premier Holiday Lighting", "url": "https://lightingfrompremier.com" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "WebSite", "name": "Premier Auto Spa", "url": "https://detailingfrompremier.com" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "WebSite", "name": "Premier Plowing", "url": "https://plowingfrompremier.com" } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "WebSite", "name": "Premier Paver Restoration", "url": "https://paversfrompremier.com" } },
      { "@type": "ListItem", "position": 7, "item": { "@type": "WebSite", "name": "MarioScape", "url": "https://marioscape.com" } },
      { "@type": "ListItem", "position": 8, "item": { "@type": "WebSite", "name": "Simpli Clock", "url": "https://simpliclock.com" } },
      { "@type": "ListItem", "position": 9, "item": { "@type": "WebSite", "name": "Nour's Barbershop", "url": "https://noursbarbershop.com" } },
      { "@type": "ListItem", "position": 10, "item": { "@type": "WebSite", "name": "WAF Chicago", "url": "https://wafchicago.org" } },
      { "@type": "ListItem", "position": 11, "item": { "@type": "WebSite", "name": "Clean Green Property", "url": "https://cleangreenproperty.com" } },
    ],
  },
};

interface PremierBrand {
  name: string;
  service: string;
  url: string;
  display: string;
  screenshot: string;
  logo: string;
  /** Slug of the "before" recording in /portfolio/before/, if one exists. */
  before?: string;
}

// The 5 service-brand sites under the Premier hub (the hub itself is the
// full-width flagship above, so it's not repeated here).
const PREMIER_BRANDS: PremierBrand[] = [
  { name: "Premier Power Washing", service: "Power Washing", url: "https://powerwashingfrompremier.com", display: "powerwashingfrompremier.com", screenshot: "/portfolio/premier-powerwashing-screenshot.jpg", logo: "/portfolio/premier-powerwashing-logo.png", before: "premier-powerwashing" },
  { name: "Premier Holiday Lighting", service: "Holiday Lighting", url: "https://lightingfrompremier.com", display: "lightingfrompremier.com", screenshot: "/portfolio/premier-lighting-screenshot.jpg", logo: "/portfolio/premier-lighting-logo.png", before: "premier-lighting" },
  { name: "Premier Auto Spa", service: "Auto Spa", url: "https://detailingfrompremier.com", display: "detailingfrompremier.com", screenshot: "/portfolio/premier-detailing-screenshot.jpg", logo: "/portfolio/premier-detailing-logo.png", before: "premier-detailing" },
  { name: "Premier Plowing", service: "Snow Services", url: "https://plowingfrompremier.com", display: "plowingfrompremier.com", screenshot: "/portfolio/premier-plowing-screenshot.jpg", logo: "/portfolio/premier-plowing-logo.png", before: "premier-plowing" },
  { name: "Premier Paver Restoration", service: "Paver Restoration", url: "https://paversfrompremier.com", display: "paversfrompremier.com", screenshot: "/portfolio/premier-paver-screenshot.jpg", logo: "/portfolio/premier-paver-logo.png" },
];

// Interleaved so no two Premier logos sit next to each other (alternates
// Premier → other client → Premier …). 6 Premier + 5 others, and the strip
// loops, so the one unavoidable Premier-touch lands at the loop seam (last → first).
const LOGO_MARQUEE_BRANDS = [
  { name: "Premier Partners", url: "https://servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png" },
  { name: "Clean Green Property", url: "https://cleangreenproperty.com", logo: "/portfolio/cleangreen-logo.png" },
  { name: "Premier Power Washing", url: "https://powerwashingfrompremier.com", logo: "/portfolio/premier-powerwashing-logo.png" },
  { name: "WAF Chicago", url: "https://wafchicago.org", logo: "/portfolio/waf-logo.svg" },
  { name: "Premier Holiday Lighting", url: "https://lightingfrompremier.com", logo: "/portfolio/premier-lighting-logo.png" },
  { name: "Simpli Clock", url: "https://simpliclock.com", logo: "/portfolio/simpli-logo.png" },
  { name: "Premier Auto Spa", url: "https://detailingfrompremier.com", logo: "/portfolio/premier-detailing-logo.png" },
  { name: "MarioScape", url: "https://marioscape.com", logo: "/portfolio/marioscape-logo.png" },
  { name: "Premier Plowing", url: "https://plowingfrompremier.com", logo: "/portfolio/premier-plowing-logo.png" },
  { name: "Nour's Barbershop", url: "https://noursbarbershop.com", logo: "/portfolio/nours-logo.png" },
  { name: "Premier Paver Restoration", url: "https://paversfrompremier.com", logo: "/portfolio/premier-paver-logo.png" },
];

interface ClientCard {
  name: string;
  area: string;
  screenshot: string;
  logo: string;
  url: string;
  display: string;
  /** Slug of the "before" recording in /portfolio/before/, if one exists. */
  before?: string;
}

const CLIENTS: ClientCard[] = [
  {
    name: "MarioScape",
    area: "Landscaping and removal company serving Chicago's North Shore.",
    screenshot: "/portfolio/marioscape-screenshot.jpg",
    logo: "/portfolio/marioscape-logo.png",
    url: "https://marioscape.com",
    display: "marioscape.com",
  },
  {
    name: "Clean Green Property",
    area: "Property care company serving Chicago's North Shore.",
    screenshot: "/portfolio/cleangreen-screenshot.jpg",
    logo: "/portfolio/cleangreen-logo.png",
    url: "https://cleangreenproperty.com",
    display: "cleangreenproperty.com",
  },
  {
    name: "Simpli Clock",
    area: "Time clocks and time-tracking equipment — a Brantford, Ontario shop shipping across Canada and the U.S.",
    screenshot: "/portfolio/simpli-screenshot.jpg",
    logo: "/portfolio/simpli-logo.png",
    url: "https://simpliclock.com",
    display: "simpliclock.com",
    before: "simpli-clock",
  },
  {
    name: "WAF Chicago",
    area: "Nonprofit serving Cook County, based in Des Plaines.",
    screenshot: "/portfolio/waf-screenshot.jpg",
    logo: "/portfolio/waf-logo.svg",
    url: "https://wafchicago.org",
    display: "wafchicago.org",
  },
  {
    name: "Nour's Barbershop",
    area: "Local barbershop in Morton Grove, IL. His last marketing company locked him out of his own site — so I built him a new one he owns, and got him back online.",
    screenshot: "/portfolio/nours-screenshot.jpg",
    logo: "/portfolio/nours-logo.png",
    url: "https://noursbarbershop.com",
    display: "noursbarbershop.com",
  },
];

interface BeforeTarget {
  slug: string;
  label: string;
}

/** Small secondary affordance — opens the on-page "before" lightbox. */
function BeforeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] md:text-xs tracking-wide text-ink-quiet transition-all duration-200 cursor-pointer hover:text-accent-light hover:border-accent-light hover:shadow-[0_0_16px_-3px_rgba(155,196,168,0.55)]"
    >
      <IconPlayerPlayFilled className="w-3 h-3" />
      <span>See the before</span>
    </button>
  );
}

/**
 * On-page lightbox for the "before" screen recordings. The <video> is only
 * mounted while open + preload="none", so initial page load pulls ZERO video
 * bytes — nothing downloads until the viewer hits play inside the popup.
 */
function BeforeLightbox({ before, onClose }: { before: BeforeTarget | null; onClose: () => void }) {
  useEffect(() => {
    if (!before) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [before, onClose]);

  return (
    <AnimatePresence>
      {before && (
        <m.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${before.label} — the previous website`}
        >
          <m.div
            className="relative w-full max-w-4xl bg-bg-raised border border-line rounded-xl overflow-hidden"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-line">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet">
                Before &middot; {before.label}
              </p>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-ink-quiet hover:text-accent transition-colors cursor-pointer"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>
            <video
              key={before.slug}
              className="w-full max-h-[75vh] bg-black"
              controls
              preload="none"
              playsInline
              poster={`/portfolio/before/${before.slug}-poster.jpg`}
            >
              <source src={`/portfolio/before/${before.slug}.mp4`} type="video/mp4" />
            </video>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export default function PortfolioPage() {
  const [before, setBefore] = useState<BeforeTarget | null>(null);

  return (
    <Layout activePath="/portfolio" contactHref="#contact">
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        canonical={PAGE_URL}
        ogImage={OG_IMAGE}
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, COLLECTION_PAGE_SCHEMA]}
      />

      {/* ==================== HERO ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-8 md:pb-10 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <Eyebrow accent className="mb-6">The work</Eyebrow>
          <ClipReveal trigger="load">
            <h1 className="display-h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink max-w-5xl">
              Who I&apos;ve <span className="text-accent">built for.</span>
            </h1>
          </ClipReveal>
          <p className="lede mt-8 max-w-2xl">
            Every business here has a site that&apos;s live right now &mdash; click any of them and see for yourself.
          </p>
        </div>
      </section>

      {/* ==================== LOGO MARQUEE — large, slow, clickable ==================== */}
      <section className="section-deep py-8 md:py-10 border-y border-line overflow-hidden">
        <LogoMarquee items={LOGO_MARQUEE_BRANDS} durationSec={95} />
      </section>

      {/* ==================== PREMIER PARTNERS — flagship (centered column) ==================== */}
      <section className="section-base border-t border-line py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <img
              src="/portfolio/premier-partners-logo.png"
              alt=""
              aria-hidden="true"
              className="h-9 md:h-11 w-auto object-contain flex-shrink-0"
              loading="lazy"
            />
            <h2 className="display-h2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink">
              Premier Partners
            </h2>
          </div>

          <a
            href="https://servicesfrompremier.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-[16/9] bg-bg-raised border border-line overflow-hidden lift mb-6 md:mb-8"
            aria-label="Premier Partners hub site screenshot"
          >
            <img
              src="/portfolio/premier-hub-screenshot.jpg"
              alt="Premier Partners hub website"
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </a>

          <p className="text-accent-light text-base md:text-lg leading-relaxed max-w-3xl mb-6 md:mb-8">
            A multi-brand home service company across Cook, Lake, and McHenry County &mdash; I built their hub site and every service-brand site under it.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10 md:mb-14">
            <a
              href="https://servicesfrompremier.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-light hover:text-ink transition-colors font-mono text-sm tracking-wide"
            >
              <span>Visit live site &rarr;</span>
              <IconArrowUpRight className="w-4 h-4" />
            </a>
            <BeforeButton onClick={() => setBefore({ slug: "premier-hub", label: "Premier Partners" })} />
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {PREMIER_BRANDS.map((brand) => (
              <div
                key={brand.url}
                className="group lift relative flex flex-col w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-13.333px)] bg-bg-raised border border-line hover:border-accent-light transition-colors"
              >
                <a
                  href={brand.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col flex-1"
                  aria-label={`${brand.name} — ${brand.display}`}
                >
                  <div className="relative aspect-[16/10] bg-bg-raised border-b border-line overflow-hidden">
                    <img
                      src={brand.screenshot}
                      alt={`${brand.name} website`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                    <IconArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-accent opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="px-4 py-3 md:py-4">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-ink text-sm md:text-base font-medium leading-tight group-hover:text-accent-light transition-colors">
                        {brand.service}
                      </p>
                      <img
                        src={brand.logo}
                        alt=""
                        aria-hidden="true"
                        className="h-6 md:h-7 w-auto object-contain flex-shrink-0"
                        loading="lazy"
                      />
                    </div>
                    <p className="font-mono text-[10px] md:text-[11px] tracking-widest text-ink-quiet truncate">
                      {brand.display}
                    </p>
                  </div>
                </a>
                {brand.before && (
                  <div className="border-t border-line px-4 py-2.5 flex justify-center">
                    <BeforeButton onClick={() => setBefore({ slug: brand.before!, label: brand.name })} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CLIENT GRID — 5 cards, orphan centered ==================== */}
      <section className="section-deep border-t border-line py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8">
            {CLIENTS.map((c) => (
              <div
                key={c.name}
                className="group lift flex flex-col bg-bg-raised border border-line hover:border-accent-light transition-colors w-full md:w-[calc(50%-1rem)]"
              >
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col flex-1"
                  aria-label={`${c.name} — ${c.display}`}
                >
                  <div className="relative aspect-[16/10] bg-bg-raised border-b border-line overflow-hidden">
                    <img
                      src={c.screenshot}
                      alt={`${c.name} website`}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-7 md:p-8 flex-1">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="display-h2 text-2xl md:text-3xl lg:text-4xl text-ink">
                        {c.name}
                      </h3>
                      <img
                        src={c.logo}
                        alt=""
                        aria-hidden="true"
                        className="h-7 md:h-8 w-auto object-contain flex-shrink-0"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-5">
                      {c.area}
                    </p>
                    <span className="inline-flex items-center gap-2 text-ink group-hover:text-accent-light transition-colors">
                      <span className="font-mono text-xs md:text-sm tracking-wide">Visit {c.display}</span>
                      <IconArrowUpRight className="w-4 h-4 text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </a>
                {c.before && (
                  <div className="border-t border-line px-7 md:px-8 py-4">
                    <BeforeButton onClick={() => setBefore({ slug: c.before!, label: c.name })} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-raised py-24 md:py-32 px-6 scroll-mt-20 border-t border-line">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <Eyebrow accent className="mb-5">Like what you see?</Eyebrow>
            <DisplayH2 className="mb-6">Let&apos;s talk.</DisplayH2>
            <p className="lede">
              Tell me about your project. I&apos;ll get back to you personally.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-5">
                <a href="tel:8472208550" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent-light transition-colors">
                    <IconPhone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Call or Text</span>
                    <span className="text-ink mt-1 group-hover:text-accent-light transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent-light transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1 group-hover:text-accent-light transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-8 border-t border-line">
                <Eyebrow accent className="mb-6">What happens next</Eyebrow>
                <ol className="space-y-5">
                  {[
                    "I read your message myself — usually within a few hours.",
                    "I'll reach back out by call or text.",
                    "If a longer call makes sense, we'll book one so I can quote it right.",
                  ].map((text, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                      <span className="font-mono text-xs text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-ink-muted text-sm leading-relaxed">{text}</p>
                    </li>
                  ))}
                </ol>
                <p className="text-ink-quiet text-xs italic mt-6 leading-relaxed">
                  Prefer the form? Fill it out — it comes straight to me.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="ed-card-dark">
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

          <p className="text-center mt-16">
            <Link to="/about" className="link text-base">About me &rarr;</Link>
          </p>
        </div>
      </section>

      <BeforeLightbox before={before} onClose={() => setBefore(null)} />
    </Layout>
  );
}
