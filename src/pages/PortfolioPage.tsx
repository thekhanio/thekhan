import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Eyebrow, DisplayH2, MonoNum } from "@/components/editorial";
import { IconPhone, IconMail, IconArrowUpRight, IconArrowRight } from "@tabler/icons-react";

const PAGE_TITLE = "Portfolio — Custom Websites for Small Businesses | TheKhan";
const PAGE_DESC = "I build custom websites and run the marketing for home service businesses across Chicago.";
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
    "numberOfItems": 10,
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "WebSite", "name": "Premier Partners", "url": "https://servicesfrompremier.com" } },
      { "@type": "ListItem", "position": 2, "item": { "@type": "WebSite", "name": "Premier Power Washing", "url": "https://powerwashingfrompremier.com" } },
      { "@type": "ListItem", "position": 3, "item": { "@type": "WebSite", "name": "Premier Holiday Lighting", "url": "https://lightingfrompremier.com" } },
      { "@type": "ListItem", "position": 4, "item": { "@type": "WebSite", "name": "Premier Auto Spa", "url": "https://detailingfrompremier.com" } },
      { "@type": "ListItem", "position": 5, "item": { "@type": "WebSite", "name": "Premier Plowing", "url": "https://plowingfrompremier.com" } },
      { "@type": "ListItem", "position": 6, "item": { "@type": "WebSite", "name": "Premier Paver Restoration", "url": "https://paversfrompremier.com" } },
      { "@type": "ListItem", "position": 7, "item": { "@type": "WebSite", "name": "MarioScape", "url": "https://marioscape.com" } },
      { "@type": "ListItem", "position": 8, "item": { "@type": "WebSite", "name": "Shifa Home Care", "url": "https://shifahomecareservices.com" } },
      { "@type": "ListItem", "position": 9, "item": { "@type": "WebSite", "name": "Nour's Barbershop", "url": "https://noursbarbershop.com" } },
      { "@type": "ListItem", "position": 10, "item": { "@type": "WebSite", "name": "WAF Chicago", "url": "https://wafchicago.org" } },
    ],
  },
};

interface PremierBrand {
  name: string;
  url: string;
  display: string;
  logo: string;
}

const PREMIER_BRANDS: PremierBrand[] = [
  { name: "Premier Partners", url: "https://servicesfrompremier.com", display: "servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png" },
  { name: "Premier Power Washing", url: "https://powerwashingfrompremier.com", display: "powerwashingfrompremier.com", logo: "/portfolio/premier-powerwashing-logo.png" },
  { name: "Premier Holiday Lighting", url: "https://lightingfrompremier.com", display: "lightingfrompremier.com", logo: "/portfolio/premier-lighting-logo.png" },
  { name: "Premier Auto Spa", url: "https://detailingfrompremier.com", display: "detailingfrompremier.com", logo: "/portfolio/premier-detailing-logo.png" },
  { name: "Premier Plowing", url: "https://plowingfrompremier.com", display: "plowingfrompremier.com", logo: "/portfolio/premier-plowing-logo.png" },
  { name: "Premier Paver Restoration", url: "https://paversfrompremier.com", display: "paversfrompremier.com", logo: "/portfolio/premier-paver-logo.png" },
];

const LOGO_MARQUEE_BRANDS = [
  { name: "Premier Partners", url: "https://servicesfrompremier.com", logo: "/portfolio/premier-partners-logo.png" },
  { name: "MarioScape", url: "https://marioscape.com", logo: "/portfolio/marioscape-logo.png" },
  { name: "Premier Power Washing", url: "https://powerwashingfrompremier.com", logo: "/portfolio/premier-powerwashing-logo.png" },
  { name: "Clean & Green", url: "https://cleangreenproperty.com", logo: "/portfolio/cleangreen-logo.png" },
  { name: "Premier Paver Restoration", url: "https://paversfrompremier.com", logo: "/portfolio/premier-paver-logo.png" },
  { name: "WAF Chicago", url: "https://wafchicago.org", logo: "/portfolio/waf-logo.svg" },
  { name: "Premier Holiday Lighting", url: "https://lightingfrompremier.com", logo: "/portfolio/premier-lighting-logo.png" },
  { name: "Premier Auto Spa", url: "https://detailingfrompremier.com", logo: "/portfolio/premier-detailing-logo.png" },
  { name: "Nour's Barbershop", url: "https://noursbarbershop.com", logo: "/portfolio/nours-logo.png" },
  { name: "Premier Plowing", url: "https://plowingfrompremier.com", logo: "/portfolio/premier-plowing-logo.png" },
  { name: "Shifa Home Care", url: "https://shifahomecareservices.com", logo: "/portfolio/shifa-logo.png" },
];

interface ClientCard {
  name: string;
  area: string;
  screenshot: string;
  url?: string;
  display?: string;
  paused?: boolean;
}

const CLIENTS: ClientCard[] = [
  {
    name: "MarioScape",
    area: "Landscaping and removal company serving Chicago's North Shore",
    screenshot: "/portfolio/marioscape-screenshot.jpg",
    url: "https://marioscape.com",
    display: "marioscape.com",
  },
  {
    name: "Shifa Home Care",
    area: "Non-medical home care services serving Will County, Kane County, Cook County, and DuPage County",
    screenshot: "/portfolio/shifa-screenshot.jpg",
    paused: true,
  },
  {
    name: "Nour's Barbershop",
    area: "Local barbershop in Morton Grove, IL",
    screenshot: "/portfolio/nours-screenshot.jpg",
    url: "https://noursbarbershop.com",
    display: "noursbarbershop.com",
  },
  {
    name: "WAF Chicago",
    area: "Nonprofit serving Cook County, based in Des Plaines",
    screenshot: "/portfolio/waf-screenshot.jpg",
    url: "https://wafchicago.org",
    display: "wafchicago.org",
  },
];

export default function PortfolioPage() {
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
            <MonoNum>11</MonoNum> sites, all live right now. Click any of them to see for yourself.
          </p>
        </div>
      </section>

      {/* ==================== LOGO MARQUEE — large, slow, clickable ==================== */}
      <section className="section-deep py-8 md:py-10 border-y border-line overflow-hidden">
        <LogoMarquee items={LOGO_MARQUEE_BRANDS} durationSec={95} />
      </section>

      {/* ==================== PREMIER PARTNERS + CLEAN & GREEN — paired (60/40) ==================== */}
      <section className="section-base border-t border-line py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 md:gap-0">
            {/* PREMIER PARTNERS — 60% */}
            <div className="md:pr-12 lg:pr-16">
              <h2 className="display-h2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-ink mb-6 md:mb-8">
                Premier Partners
              </h2>

              <a
                href="https://servicesfrompremier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-[16/10] bg-bg-raised border border-line overflow-hidden lift mb-6 md:mb-8"
                aria-label="Premier Partners hub site screenshot"
              >
                <img
                  src="/portfolio/premier-hub-screenshot.jpg"
                  alt="Premier Partners hub website"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </a>

              <p className="text-accent-light text-base md:text-lg leading-relaxed max-w-3xl mb-8 md:mb-10">
                Multi-brand home service company serving Cook County, Lake County, and McHenry County
              </p>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-6 md:mb-8">
                {PREMIER_BRANDS.map((brand, i) => (
                  <ScrollReveal key={brand.url} delay={i * 0.1}>
                    <a
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group lift relative flex flex-col bg-bg-raised border border-line hover:border-accent transition-colors h-full"
                      aria-label={`${brand.name} — ${brand.display}`}
                    >
                      <IconArrowUpRight className="absolute top-3 right-3 w-4 h-4 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center justify-center h-28 md:h-32 px-5 py-6">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="border-t border-line px-3 py-3">
                        <p className="font-mono text-[10px] md:text-[11px] tracking-widest text-ink-quiet group-hover:text-accent transition-colors text-center truncate">
                          {brand.display}
                        </p>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </div>

              <a
                href="https://servicesfrompremier.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-light hover:text-ink transition-colors font-mono text-sm tracking-wide"
              >
                <span>Visit hub site &rarr;</span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* CLEAN & GREEN — 40%, with vertical sage divider on desktop */}
            <div className="md:pl-12 lg:pl-16 md:border-l md:border-accent-line/60 mt-16 md:mt-0">
              <h2 className="display-h2 text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-ink mb-6 md:mb-8">
                Clean &amp; Green
              </h2>

              <a
                href="https://cleangreenproperty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block aspect-[16/10] bg-bg-raised border border-line overflow-hidden lift mb-6 md:mb-8"
                aria-label="Clean & Green homepage screenshot"
              >
                <img
                  src="/portfolio/cleangreen-screenshot.jpg"
                  alt="Clean & Green Property Care website"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </a>

              <p className="text-ink-muted text-base md:text-lg leading-relaxed mb-10 md:mb-12">
                My old company. Founded June 2024, scaled to 84 clients on the North Shore before I closed it March 2026. The phone still rings from the SEO work I did &mdash; and those calls now go to the contractors I work with.
              </p>

              {/* 3-stat editorial data block — Founded / Peak / Closed */}
              <dl className="grid grid-cols-3 gap-4 md:gap-6 py-8 md:py-10 border-y border-line mb-10 md:mb-12">
                {[
                  { label: "Founded", value: "June 2024" },
                  { label: "Peak", value: "84 clients" },
                  { label: "Closed", value: "March 2026" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="font-mono text-[10px] md:text-[11px] tracking-widest uppercase text-accent-light mb-2">
                      {stat.label}
                    </dt>
                    <dd className="font-display text-lg md:text-xl lg:text-2xl text-ink leading-tight uppercase tracking-wide">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="https://cleangreenproperty.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent-light hover:text-ink transition-colors font-mono text-sm tracking-wide"
              >
                <span>Visit &rarr;</span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OTHER CLIENTS — 2×2 grid ==================== */}
      <section className="section-deep border-t border-line py-20 md:py-28 px-6 md:px-12 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {CLIENTS.map((c) => {
              const CardInner = (
                <>
                  <div className="relative aspect-[16/10] bg-bg-raised border-b border-line overflow-hidden">
                    <img
                      src={c.screenshot}
                      alt={`${c.name} website`}
                      className={`w-full h-full object-cover object-top transition-opacity ${c.paused ? "opacity-40" : "opacity-100"}`}
                      loading="lazy"
                    />
                    {c.paused && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="px-5 py-2 bg-bg/85 border border-accent text-accent font-mono text-[11px] tracking-[0.2em] uppercase">
                          Currently Paused
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-7 md:p-8">
                    <h3 className="display-h2 text-2xl md:text-3xl lg:text-4xl text-ink mb-3">
                      {c.name}
                    </h3>
                    <p className="text-ink-muted text-sm md:text-base leading-relaxed mb-5">
                      {c.area}
                    </p>
                    {c.paused ? (
                      <p className="font-mono text-xs text-ink-quiet italic tracking-wide">
                        Site temporarily offline
                      </p>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-ink group-hover:text-accent transition-colors">
                        <span className="font-mono text-xs md:text-sm tracking-wide">Visit {c.display}</span>
                        <IconArrowUpRight className="w-4 h-4 text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    )}
                  </div>
                </>
              );

              if (c.paused || !c.url) {
                return (
                  <div
                    key={c.name}
                    className="flex flex-col bg-bg-raised border border-line"
                    aria-label={`${c.name} — currently paused`}
                  >
                    {CardInner}
                  </div>
                );
              }

              return (
                <a
                  key={c.name}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group lift flex flex-col bg-bg-raised border border-line hover:border-accent transition-colors"
                  aria-label={`${c.name} — ${c.display}`}
                >
                  {CardInner}
                </a>
              );
            })}
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
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconPhone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Call or Text</span>
                    <span className="text-ink mt-1 group-hover:text-accent transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1 group-hover:text-accent transition-colors">Omair@TheKhan.io</span>
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
                <div className="mt-8">
                  <a href="tel:8472208550" className="cta-orbit">
                    Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-ink-quiet text-xs italic mt-6 leading-relaxed">
                  Prefer the form? Fill it out — same inbox.
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
    </Layout>
  );
}
