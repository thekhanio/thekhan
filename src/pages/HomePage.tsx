import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ServiceMarquee } from "@/components/ServiceMarquee";
import { GoogleBadges } from "@/components/GoogleBadges";
import { ClientTrustStrip } from "@/components/ClientTrustStrip";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WordRevealHeadline } from "@/components/ui/word-reveal-headline";
import { Eyebrow, DisplayH1, DisplayH2, MonoNum, PullQuote } from "@/components/editorial";
import { IconPhone, IconMail, IconArrowRight } from "@tabler/icons-react";

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
      "description": "TheKhan is an independent web design and digital marketing studio founded by Omair Khan in Deerfield, Illinois.",
      "url": "https://thekhan.io",
      "logo": "https://thekhan.io/portfolio/logo-white.png",
      "image": "https://thekhan.io/og-image.png",
      "telephone": "+18472208550",
      "email": "omair@thekhan.io",
      "priceRange": "$$",
      "openingHours": "Mo-Su 10:30-22:00",
      "founder": { "@id": "https://thekhan.io/about#omair" },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "655 Deerfield Rd, Suite 100, Unit 404",
        "addressLocality": "Deerfield",
        "addressRegion": "IL",
        "postalCode": "60015",
        "addressCountry": "US",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": "42.1711", "longitude": "-87.8445" },
      "areaServed": {
        "@type": "GeoCircle",
        "geoMidpoint": { "@type": "GeoCoordinates", "latitude": "42.1711", "longitude": "-87.8445" },
        "geoRadius": "80000",
        "description": "Chicagoland area and Chicago suburbs",
      },
      "sameAs": [
        "https://www.linkedin.com/company/thekhanio",
        "https://www.instagram.com/thekhanio",
        "https://www.facebook.com/profile.php?id=61584909881446",
      ],
    },
  ],
};

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://thekhan.io/#organization",
  "name": "TheKhan",
  "url": "https://thekhan.io",
  "logo": "https://thekhan.io/portfolio/logo-white.png",
  "founder": { "@type": "Person", "name": "Omair Khan" },
  "sameAs": [
    "https://www.linkedin.com/company/thekhanio",
    "https://www.instagram.com/thekhanio",
    "https://www.facebook.com/profile.php?id=61584909881446",
  ],
};

const HOME_GALLERY = [
  { client: "Premier Partners", industry: "Multi-brand home services", screenshot: "/portfolio/premier-hub-screenshot.jpg" },
  { client: "MarioScape", industry: "Landscaping", screenshot: "/portfolio/marioscape-screenshot.jpg" },
  { client: "Nour's Barbershop", industry: "Barbershop", screenshot: "/portfolio/nours-screenshot.jpg" },
];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Layout activePath="/">
      <SEO
        title="Custom Websites & Marketing for Growing Businesses | TheKhan"
        description="Custom websites and marketing that actually bring in business. One point of contact, start to finish."
        canonical="https://thekhan.io/"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[HOME_SCHEMA, ORG_SCHEMA]}
      />

      {/* ==================== HERO — single column, no photo.
           Atmospheric gradient drift matches /websites and /home-services. ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-20 md:pb-28 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="gradient-drift" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto">
          <div
            className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Eyebrow accent className="mb-8">
              Local business growth · Month-to-month
            </Eyebrow>

            <DisplayH1 className="max-w-5xl">
              Websites that rank.
              <br />
              <span className="text-accent">Marketing that pays off.</span>
            </DisplayH1>

            <p className="lede mt-10 max-w-2xl">
              I build websites and run the marketing that brings in real business.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
              <Link to="/websites" className="btn-primary">I need a website &rarr;</Link>
              <Link to="/home-services" className="btn-outline-accent">
                <span className="text-ink-muted">I want to grow my </span>
                <span className="text-accent-light font-semibold">home service</span>
                <span className="text-ink-muted"> business &rarr;</span>
              </Link>
              <Link to="/local-services" className="btn-outline-accent">
                <span className="text-ink-muted">I want to grow my </span>
                <span className="text-accent-light font-semibold">local services</span>
                <span className="text-ink-muted"> business &rarr;</span>
              </Link>
            </div>
            <div className="mt-6">
              <Link to="/portfolio" className="text-ink-quiet hover:text-ink text-sm tracking-wide underline underline-offset-4 decoration-line-strong hover:decoration-ink transition-colors">
                See what I&apos;ve built &rarr;
              </Link>
            </div>

            <div className="mt-14 md:mt-20">
              <GoogleBadges />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SERVICE MARQUEE ==================== */}
      <section className="section-deep py-10 md:py-12 border-y border-line overflow-hidden">
        <ServiceMarquee />
      </section>

      {/* ==================== CLIENT TRUST STRIP — named, with city tags ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12 border-b border-line">
        <div className="max-w-[1400px] mx-auto">
          <ClientTrustStrip />
        </div>
      </section>

      {/* ==================== WHAT'S DIFFERENT — architect blueprint grid backdrop
           Relocated up from below the gallery to anchor the homepage's
           value statement directly after the trust strip. ==================== */}
      <section className="section-base grid-blueprint py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          <div className="md:col-span-5">
            <Eyebrow accent className="mb-6">What&apos;s different</Eyebrow>
            <WordRevealHeadline
              as="h2"
              lines={[
                { text: "A site that doesn’t just look good — it brings in real business." },
              ]}
              ariaLabel="A site that doesn't just look good — it brings in real business."
              staggerMs={70}
              className="display-h2 text-ink text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]"
            />
            <p className="mt-6 md:mt-8 text-accent-light text-lg md:text-xl leading-relaxed max-w-xl">
              That&apos;s why I write the code from scratch, not stamp it from a template.
            </p>
          </div>
          <div className="md:col-span-7 md:pt-2 max-w-2xl">
            <ul className="space-y-4 text-base md:text-lg leading-relaxed">
              {[
                "Built to load fast, rank on Google, and bring in calls",
                <>Yours from day one &mdash; files, domain, logins, all under your name</>,
                <>No platform locks &mdash; move it anywhere, anytime</>,
                <>Month-to-month &mdash; cancel any month with 72 hours notice</>,
              ].map((b, i) => (
                <li key={i} className="flex items-start gap-3 opacity-85">
                  <span className="text-accent-light mt-1.5 leading-none flex-shrink-0" aria-hidden="true">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10">
              <Link to="/websites" className="link">See website tiers &rarr;</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== EDITORIAL CLIENT GALLERY ==================== */}
      <section className="section-deep py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 md:mb-16">
            <div className="md:col-span-4">
              <Eyebrow accent>Selected work</Eyebrow>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <DisplayH2>A few sites I&apos;ve shipped.</DisplayH2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-0">
            {HOME_GALLERY.map((entry, i) => (
              <ScrollReveal key={entry.client} delay={i * 0.12}>
                <Link
                  to="/portfolio"
                  className="group block lift"
                >
                  <div className="aspect-[4/3] bg-bg border border-line overflow-hidden mb-5">
                    <img
                      src={entry.screenshot}
                      alt={`${entry.client} website`}
                      className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
                    />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-accent mb-2">
                    {String(i + 1).padStart(2, "0")} / Client
                  </p>
                  <p className="font-display text-xl md:text-2xl tracking-wider uppercase text-ink group-hover:text-accent transition-colors leading-none">
                    {entry.client}
                  </p>
                  <p className="mt-2 font-mono text-xs tracking-widest uppercase text-ink-quiet">
                    {entry.industry}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to="/portfolio" className="link text-base">
              See the full portfolio &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== PULL QUOTE ==================== */}
      <section id="about" className="section-raised py-24 md:py-32 px-6 lg:px-12 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Eyebrow accent className="mb-10">Who you&apos;re working with</Eyebrow>
          <ScrollReveal>
            <PullQuote attribution="Omair Khan · Founder, TheKhan">
              When you reach out, you reach me. Not a rep, not a project manager.
            </PullQuote>
          </ScrollReveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 md:col-start-2 space-y-5 leading-relaxed text-base md:text-lg max-w-2xl opacity-85">
              <p>
                I take on a job only if I know I can do it right. Monthly marketing is capped — a handful of clients at a time. Website builds fit around the ongoing work.
              </p>
              <p>
                <Link to="/about" className="link">How I got here &rarr;</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-base py-24 md:py-32 px-6 lg:px-12 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <Eyebrow accent className="mb-6">Get in touch</Eyebrow>
            <DisplayH2 className="mb-6">Let&apos;s talk.</DisplayH2>
            <p className="lede">
              Goes straight to my phone.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="space-y-5">
                <a href="tel:8472208550" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconPhone className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Call or Text</span>
                    <span className="text-ink mt-1.5 text-base group-hover:text-accent transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1.5 text-base group-hover:text-accent transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-8 border-t border-line">
                <Eyebrow accent className="mb-6">What happens next</Eyebrow>
                <ol className="space-y-5">
                  {[
                    "I'll read your message myself — usually within a few hours.",
                    "I'll reach back out by call or text.",
                    "If a longer call makes sense, we'll book one.",
                  ].map((step, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                      <span className="font-mono text-xs text-accent pt-1.5">0{i + 1}</span>
                      <p className="text-ink-muted text-sm leading-relaxed">{step}</p>
                    </li>
                  ))}
                </ol>

                {/* MovingBorder CTA — single, page-final earned-attention button */}
                <div className="mt-10">
                  <a href="tel:8472208550" className="cta-orbit">
                    Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-ink-faint text-xs italic mt-6 leading-relaxed">
                  Prefer the form? Fill it out — same inbox.
                </p>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="ed-card-dark">
                <ContactForm source="homepage" subjectPrefix="[Homepage form]" />
              </div>
            </div>
          </div>

          <p className="mt-16 max-w-3xl text-ink-quiet text-base italic leading-relaxed">
            P.S. — I&apos;d rather tell you we&apos;re not a fit on the first call than waste both our time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
