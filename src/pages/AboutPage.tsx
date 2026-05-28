import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TldrStrip } from "@/components/ui/tldr-strip";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Eyebrow, DisplayH2, MonoNum } from "@/components/editorial";
import { IconPhone, IconMail } from "@tabler/icons-react";

const TIMELINE_NODES = [
  { date: "Jun '24", body: "I started my own cleaning company — just me and my wife, doing every job ourselves. The problem was keeping up with both the marketing and the field work." },
  { date: "Jan '25", body: "I stopped doing the work myself and ran everything through subcontractors — landscaping, power washing, gutter cleaning, lighting installs. Volume went up, margins got tighter. But the business side was finally the only thing I was focused on." },
  { date: "Oct '25", body: "I started TheKhan on the side — using what I'd learned marketing my own company to help a few other businesses. Still a side project, but it was already eating up more of my week than it should have." },
  { date: "Late '25", body: "A couple of subcontractors fell through, so I ended up back in the field myself. The company hit 84 clients at its peak around then — but I was doing it on legs I'd had to learn to walk on again after a motorcycle accident years earlier, and it made one thing clear: the labor wasn't really my thing. Growing the business and getting the clients was." },
  { date: "Mar '26", body: "I closed the company and went all in on TheKhan — the part I was best at, and the part I could actually control." },
];

const NEXT_STEPS = [
  "I read your message myself — usually within a few hours.",
  "I'll reach back out by call or text.",
  "If you're interested, I'll set up a time. If not, no pressure.",
];

const ABOUT_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://thekhan.io/about#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://thekhan.io" },
        { "@type": "ListItem", "position": 2, "name": "About", "item": "https://thekhan.io/about" },
      ],
    },
    {
      "@type": "AboutPage",
      "@id": "https://thekhan.io/about#aboutpage",
      "url": "https://thekhan.io/about",
      "name": "About Omair Khan — Founder of TheKhan",
      "description": "The founder story behind TheKhan — how Omair Khan built and grew his own home service company before pivoting to help other contractors and small businesses grow.",
      "isPartOf": { "@id": "https://thekhan.io/#website" },
      "mainEntity": { "@id": "https://thekhan.io/about#omair" },
    },
    {
      "@type": "Person",
      "@id": "https://thekhan.io/about#omair",
      "name": "Omair Khan",
      "url": "https://thekhan.io/about",
      "image": "https://thekhan.io/omair-portrait.webp",
      "jobTitle": "Founder",
      "description": "Founder of TheKhan, an independent web design and digital marketing studio in Deerfield, Illinois. Before TheKhan, Omair built and grew his own home service company to 84 clients before pivoting to help other contractors and small businesses grow.",
      "worksFor": { "@id": "https://thekhan.io/#localbusiness" },
      "address": { "@type": "PostalAddress", "addressLocality": "Deerfield", "addressRegion": "IL", "addressCountry": "US" },
      "knowsAbout": ["Web design", "Web development", "SEO", "Google Ads", "Local SEO", "Home service marketing", "Small business marketing"],
      "sameAs": ["https://www.linkedin.com/in/omair-khan-64088a357", "https://www.instagram.com/thekhanio", "https://x.com/thekhanio"],
    },
  ],
};

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Inline stagger animation — preserves the two-axis layout by animating
  // each element in place (no display-collapsing wrapper).
  const staggerStyle = (delayMs: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(0.4em)",
    transition: `opacity 700ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delayMs}ms, transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1) ${delayMs}ms`,
  });

  return (
    <Layout activePath="/about" contactHref="#contact">
      <SEO
        title="About Omair Khan — Founder of TheKhan | Web Design & Marketing"
        description="One-man shop. Before this I built my own home service company to 84 clients. Now I build websites and run marketing for others."
        canonical="https://thekhan.io/about"
        ogImage="https://thekhan.io/about-og.png"
        ogType="profile"
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={ABOUT_SCHEMA}
      />

      {/* ==================== HERO — preserved two-axis composition (the template block) ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-16 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <Eyebrow accent className="mb-8">About</Eyebrow>
          <h1 className="display-h1">
            <span
              className="block text-2xl sm:text-3xl md:text-4xl text-ink-muted mb-8 md:mb-10"
              style={staggerStyle(0)}
            >
              Every business comes down to two jobs.
            </span>
            <span className="flex items-center justify-center gap-6 sm:gap-10 md:gap-14 mb-8 md:mb-10 text-sm sm:text-base md:text-lg uppercase tracking-[0.2em] font-mono">
              <span className="text-ink-muted" style={staggerStyle(200)}>
                Doing<br className="sm:hidden" /> the work
              </span>
              <span aria-hidden="true" className="block h-10 md:h-14 w-px bg-accent" style={staggerStyle(300)} />
              <span className="text-accent font-semibold" style={staggerStyle(400)}>
                Getting<br className="sm:hidden" /> the work
              </span>
            </span>
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink"
              style={staggerStyle(600)}
            >
              The second one is all I do now.
            </span>
          </h1>
          <p className="lede mt-10 max-w-2xl mx-auto">
            You keep doing the work. I&apos;ll handle the marketing.
          </p>

          <div className="mt-14 text-left">
            <TldrStrip
              bullets={[
                <>I&apos;m Omair &mdash; based in Deerfield, IL</>,
                <>Before TheKhan, I built my own home service company to <MonoNum>84</MonoNum> clients, then closed it to do this full-time</>,
                <>Now I run the marketing for other home service and local businesses &mdash; so they can focus on the work</>,
              ]}
              links={[
                { label: "How I got here", href: "#how-i-got-here" },
                { label: "How I work", href: "#how-i-work" },
                { label: "Let's talk", href: "#contact" },
              ]}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* ==================== HANDSHAKE ==================== */}
      <section className="section-deep py-24 px-6 border-t border-line">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <ClipReveal trigger="scroll" durationMs={900}>
              <img
                src="/omair-portrait.webp"
                alt="Omair Khan, founder of TheKhan"
                className="w-full h-auto block"
              />
              <p className="mt-4 font-mono text-xs text-ink-quiet uppercase tracking-widest">
                Omair Khan · Deerfield, IL
              </p>
            </ClipReveal>
          </div>
          <div className="md:col-span-7">
            <Eyebrow accent className="mb-5">Who you&apos;re working with</Eyebrow>
            <DisplayH2 className="mb-8">Hi — I&apos;m Omair.</DisplayH2>
            <div className="space-y-5 text-ink-muted leading-relaxed text-lg">
              <p>I&apos;m based in the Deerfield area, at my desk most days, running marketing for my clients. I keep up with how people find businesses these days — whether they&apos;re Googling it or asking whichever AI they&apos;re using now — so my clients stay right in front of the people looking for them.</p>
              <p>
                I treat every business I work with like my own — because before this, I ran my own home service company right here on the North Shore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== ORIGIN ARC — specimen timeline ==================== */}
      <section id="how-i-got-here" className="section-raised py-24 md:py-32 px-6 border-t border-line scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <Eyebrow accent className="mb-5">How I got here</Eyebrow>
            <DisplayH2 className="mb-6">
              I grew a home service company to 84 clients before I shut it down.
            </DisplayH2>
            <p className="lede max-w-2xl">Here&apos;s why.</p>
          </div>

          <div className="border-t border-line">
            {TIMELINE_NODES.map((node) => (
              <ScrollReveal key={node.date}>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 md:gap-x-12 gap-y-3 py-10 md:py-12 border-b border-line">
                  <p className="sticky-date font-mono text-sm text-accent tracking-widest pt-1 whitespace-nowrap">
                    {node.date}
                  </p>
                  <p className="text-ink-muted leading-relaxed text-base md:text-lg">{node.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT THEKHAN IS NOW ==================== */}
      <section className="section-base py-24 md:py-32 px-6 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-5">What TheKhan is now</Eyebrow>
          <DisplayH2 className="mb-10">I do two things.</DisplayH2>
          <div className="space-y-6 text-ink-muted text-lg leading-relaxed">
            <p>
              I build <Link to="/websites" className="link">custom websites</Link> for businesses that need more than a template &mdash; a site that actually brings in business.
              And I run <Link to="/marketing" className="link">monthly marketing for home service and local businesses</Link> who want more customers coming in.
            </p>
            <p>
              I work with a handful of clients at a time. If your project doesn&apos;t fit those two cleanly,
              reach out anyway — I&apos;ve got people in my network I can try to connect you with.
            </p>
            <p>
              Either way, I get you in front of people <Link to="/why-intent" className="link">already searching</Link> for exactly what you do or offer &mdash; not strangers I interrupt on Facebook. Think of me as an extension of your business: I handle the heavy lifting online so you can stay focused on the work.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== HOW I WORK ==================== */}
      <section id="how-i-work" className="section-deep py-24 md:py-32 px-6 border-t border-line scroll-mt-20">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-5">How I work</Eyebrow>
          <DisplayH2 className="mb-10">
            A custom site beats a template every time.
          </DisplayH2>
          <div className="space-y-7 text-ink-muted text-lg leading-relaxed">
            <p>The site I build is yours to keep — move it anywhere, anytime.</p>
            <p>You work with me from day one — no front desk, no runaround, no wondering who&apos;s handling your project.</p>
            <p>If I&apos;m not the right person for what you need, I&apos;d rather let you know upfront than waste both our time. The form&apos;s below if you&apos;re interested.</p>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-raised py-24 md:py-32 px-6 border-t border-line scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <Eyebrow accent className="mb-5">Interested in working together?</Eyebrow>
            <DisplayH2 className="mb-6">Let&apos;s talk.</DisplayH2>
            <p className="lede">
              Fill out the form, or reach out by call, text, or email.
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
                  {NEXT_STEPS.map((text, i) => (
                    <li key={i} className="grid grid-cols-[auto_1fr] gap-4 items-start">
                      <span className="font-mono text-xs text-accent pt-1">0{i + 1}</span>
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
                <ContactForm source="about-page" subjectPrefix="[About form]" showPhoneField />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
