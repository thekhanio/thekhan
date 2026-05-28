import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ServiceMarquee } from "@/components/ServiceMarquee";
import { FoundOnRow } from "@/components/FoundOnRow";
import { ClientTrustStrip } from "@/components/ClientTrustStrip";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { WordRevealHeadline } from "@/components/ui/word-reveal-headline";
import { Eyebrow, DisplayH1, DisplayH2, MonoNum } from "@/components/editorial";
import { IconPhone, IconMail, IconArrowRight, IconSparkles } from "@tabler/icons-react";

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
    "https://x.com/thekhanio",
    "https://www.facebook.com/profile.php?id=61584909881446",
  ],
};

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
           Atmospheric gradient drift matches /websites and /marketing. ==================== */}
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
              A nice-looking site isn&apos;t enough &mdash; yours should bring in the customers already searching for what you do.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-5">
              <Link to="/websites" className="btn-primary"><span>I need a <span className="uppercase tracking-wide">website</span> &rarr;</span></Link>
              <Link to="/marketing" className="btn-primary"><span>I want <span className="uppercase tracking-wide">more customers</span> &rarr;</span></Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link to="/portfolio" className="text-ink-quiet hover:text-ink text-sm tracking-wide underline underline-offset-4 decoration-line-strong hover:decoration-ink transition-colors">
                See what I&apos;ve built &rarr;
              </Link>
              <Link to="/why-intent" className="text-ink-quiet hover:text-ink text-sm tracking-wide underline underline-offset-4 decoration-line-strong hover:decoration-ink transition-colors">
                How I get you found &rarr;
              </Link>
            </div>

            <div className="mt-14 md:mt-20">
              <FoundOnRow />
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
                { text: "A good-looking site is the easy part now. I build the kind that brings in business." },
              ]}
              ariaLabel="A good-looking site is the easy part now. I build the kind that brings in business."
              staggerMs={70}
              className="display-h2 text-ink text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem]"
            />
            <p className="mt-6 md:mt-8 text-accent-light text-lg md:text-xl leading-relaxed max-w-xl">
              Anyone can spin up a pretty site in an afternoon. The part that pays is one built to guide your customer to the call &mdash; and that takes more than a template.
            </p>
          </div>
          <div className="md:col-span-7 md:pt-2 max-w-2xl">
            <ul className="space-y-4 text-base md:text-lg leading-relaxed">
              {[
                "Built to load fast, get found on Google and AI search, and bring in calls",
                <>Yours from day one &mdash; files, domain, logins, all under your name</>,
                <>No platform locks &mdash; move it anywhere, anytime</>,
                <>Month-to-month &mdash; cancel any month with 72 hours notice before your next bill</>,
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

      {/* ==================== MARKETING BLOCK ====================
           Replaces the old homepage website gallery (now lives on /portfolio).
           Homepage stays a router: a tight intent pitch routing to /marketing
           and /why-intent, the Volo AI Overview as a TEASE (link only — the full
           dated screenshot + volatility caveat live on /why-intent), and a
           "see the work" link to /portfolio so the website door isn't orphaned. */}
      <section className="section-deep py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 md:items-center">
          <div className="md:col-span-5">
            <Eyebrow accent className="mb-6">The marketing</Eyebrow>
            <DisplayH2 className="mb-8">A site is the start. Getting found is the job.</DisplayH2>
            <p className="text-ink-muted text-lg leading-relaxed max-w-xl mb-8">
              I get you in front of the people already searching for what you do &mdash; on Google, the map, and AI search like ChatGPT. Not interrupting strangers mid-scroll. The ones already looking for you.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              <Link to="/marketing" className="link">See how the marketing works &rarr;</Link>
              <Link to="/why-intent" className="link">Why I bet on intent &rarr;</Link>
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7 space-y-5">
            {/* Volo AI Overview — TEASE only (no screenshot; full dated proof lives on /why-intent) */}
            <ScrollReveal direction="up">
              <Link to="/why-intent" className="group block rounded-2xl border-2 border-accent bg-bg-raised p-8 lift">
                <div className="flex items-center gap-3 mb-4">
                  <IconSparkles className="w-5 h-5 text-accent" />
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">Proof</p>
                </div>
                <p className="text-ink text-xl md:text-2xl leading-snug font-semibold mb-4">
                  Google&apos;s AI named a business I run marketing for right in its answer &mdash; and most local businesses aren&apos;t in there yet.
                </p>
                <span className="link">See the proof &rarr;</span>
              </Link>
            </ScrollReveal>

            {/* The website door — keep it from being orphaned now the gallery moved */}
            <ScrollReveal direction="up" delay={0.08}>
              <Link to="/portfolio" className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg-raised/40 p-6 lift">
                <div>
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet mb-1">The website work</p>
                  <p className="text-ink text-lg font-semibold group-hover:text-accent-light transition-colors">See the sites I&apos;ve built</p>
                </div>
                <IconArrowRight className="w-5 h-5 text-accent flex-shrink-0" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== PULL QUOTE ==================== */}
      <section id="about" className="section-raised py-24 md:py-32 px-6 lg:px-12 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <Eyebrow accent className="mb-10">Who you&apos;re working with</Eyebrow>
          <ScrollReveal>
            {/* Omair's own statement, stated plainly — not a pulled quote (no quote marks, no testimonial attribution). */}
            <p className="display-h2 text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight max-w-4xl text-ink">
              When you reach out, you reach me. Not a rep, not a project manager.
            </p>
          </ScrollReveal>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-7 md:col-start-2 space-y-5 leading-relaxed text-base md:text-lg max-w-2xl opacity-85">
              <p>
                Monthly marketing is capped at a handful of clients at a time &mdash; so the ones I work with get my full attention. Website builds fit around that work.
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
                    <span className="text-ink mt-1.5 text-base group-hover:text-accent-light transition-colors"><MonoNum>(847) 220-8550</MonoNum></span>
                  </div>
                </a>
                <a href="mailto:omair@thekhan.io" className="flex items-start gap-4 group">
                  <div className="w-11 h-11 border border-line flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors">
                    <IconMail className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="eyebrow eyebrow-accent">Email</span>
                    <span className="text-ink mt-1.5 text-base group-hover:text-accent-light transition-colors">Omair@TheKhan.io</span>
                  </div>
                </a>
              </div>

              <div className="pt-8 border-t border-line">
                <Eyebrow accent className="mb-6">What happens next</Eyebrow>
                <ol className="space-y-5">
                  {[
                    "I read your message myself — usually within a few hours.",
                    "I'll reach back out by call or text.",
                    "If a longer call makes sense, I'll set one up.",
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
                  Prefer the form? Fill it out — it comes straight to me.
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
            P.S. — If I&apos;m not the right person to help, I&apos;d rather tell you upfront than waste both our time.
          </p>
        </div>
      </section>
    </Layout>
  );
}
