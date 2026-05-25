import { Link } from "react-router-dom";
import { ContactForm } from "@/components/ContactForm";
import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { ClipReveal } from "@/components/ui/clip-reveal";
import { Eyebrow, DisplayH1, DisplayH2, MonoNum, PullQuote } from "@/components/editorial";
import { IconArrowRight, IconSearch, IconBuildingStore, IconSparkles } from "@tabler/icons-react";

const PAGE_TITLE = "Intent Marketing vs Interruption Marketing | TheKhan";
const PAGE_DESC =
  "Why I market to people already searching — Google, Maps, and AI like ChatGPT — instead of interrupting them on Facebook. The idea behind everything I do, plus the numbers.";
const PAGE_URL = "https://thekhan.io/why-intent";
const OG_IMAGE = "https://thekhan.io/og-image.png";

const BREADCRUMB_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://thekhan.io/why-intent#breadcrumb",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thekhan.io" },
    { "@type": "ListItem", position: 2, name: "Why Intent", item: "https://thekhan.io/why-intent" },
  ],
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": "https://thekhan.io/why-intent#article",
  headline: "Intent Marketing vs Interruption Marketing",
  description: PAGE_DESC,
  author: { "@id": "https://thekhan.io/about#omair" },
  publisher: { "@id": "https://thekhan.io/#localbusiness" },
  isPartOf: { "@id": "https://thekhan.io/#website" },
  about: ["Intent marketing", "Demand capture", "Local SEO", "Answer Engine Optimization", "Generative Engine Optimization"],
};

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": "https://thekhan.io/why-intent#faq",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is intent marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Intent marketing means reaching people who are already searching for what you sell — on Google, Google Maps, and AI search like ChatGPT — at the exact moment they want it. The industry term is demand capture. It's the opposite of interruption marketing (demand generation), which puts ads in front of people who weren't looking, like Facebook and Instagram feed ads.",
      },
    },
    {
      "@type": "Question",
      name: "What's the difference between intent marketing and interruption marketing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Intent (pull) marketing catches people who are already looking — a search for 'plumber near me' is someone ready to call. Interruption (push) marketing pushes a message at people who weren't looking, hoping to create demand. Seth Godin framed this as permission vs interruption. Both can work, but for local service businesses the people actively searching convert far better — so that's the lane TheKhan specializes in.",
      },
    },
    {
      "@type": "Question",
      name: "What are AEO and GEO?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization) mean getting your business cited when people ask AI tools — ChatGPT, Google's AI Overviews, Perplexity — instead of typing a search. It's the same goal as SEO (being found), applied to AI answers. As more customers ask AI 'who's the best [service] near me,' showing up in those answers matters as much as ranking on Google.",
      },
    },
    {
      "@type": "Question",
      name: "Does intent marketing convert better than social media ads?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "For most local service businesses, yes. People who find a business through organic search convert at about 2.7%, nearly double social media's 1.5% (Ruler Analytics, 2025). And for home services, Google Search ads convert roughly 40% higher than Facebook ads — 7.3% vs 5.2% (LocaliQ/WordStream, 2025). The reason is simple: searchers already want the service.",
      },
    },
  ],
};

export default function WhyIntentPage() {
  return (
    <Layout activePath="/why-intent" contactHref="#contact">
      <SEO
        title={PAGE_TITLE}
        description={PAGE_DESC}
        canonical={PAGE_URL}
        ogImage={OG_IMAGE}
        geo={{ region: "US-IL", placename: "Deerfield", position: "42.1711;-87.8445" }}
        schema={[BREADCRUMB_SCHEMA, ARTICLE_SCHEMA, FAQ_SCHEMA]}
      />

      {/* ==================== HERO ==================== */}
      <section className="section-base relative pt-16 md:pt-24 pb-20 md:pb-28 px-6 md:px-12 lg:px-16 overflow-hidden">
        <div className="gradient-drift" aria-hidden="true" />
        <div className="relative max-w-[1400px] mx-auto">
          <Eyebrow accent className="mb-8">The idea behind everything I do</Eyebrow>
          <ClipReveal trigger="load">
            <DisplayH1 className="max-w-5xl">
              I market to people
              <br />
              <span className="text-accent">already looking for you.</span>
            </DisplayH1>
          </ClipReveal>
          <p className="lede mt-10 max-w-2xl">
            Not interrupting strangers mid-scroll. Catching the ones who just searched for exactly what you do &mdash; on Google, Maps, and AI like ChatGPT.
          </p>
        </div>
      </section>

      {/* ==================== THE CORE IDEA — intent vs interruption ==================== */}
      <section className="section-deep py-24 md:py-32 px-6 lg:px-12 border-y border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">Intent vs interruption</Eyebrow>
          <DisplayH2 className="mb-10">Two ways to get a customer&apos;s attention.</DisplayH2>
          <div className="space-y-6 text-ink-muted text-lg leading-relaxed max-w-3xl">
            <p>
              Here&apos;s the whole idea in one question: who&apos;s more likely to call you &mdash; someone you interrupted scrolling Facebook, or someone who just typed your exact service into Google?
            </p>
            <p>
              It isn&apos;t close. One was looking. One wasn&apos;t. I build my entire approach around the one who was.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-14">
            <ScrollReveal direction="up">
              <div className="h-full rounded-2xl border border-line p-8 bg-bg-raised/40">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet mb-4">Interruption &mdash; demand generation</p>
                <p className="text-ink-muted leading-relaxed mb-4">
                  Push a message at people who weren&apos;t looking and hope to spark interest &mdash; Facebook and Instagram feed ads. Marketers call it <em>push</em>. Seth Godin called it interruption.
                </p>
                <p className="text-ink-quiet text-sm leading-relaxed">
                  It has its place &mdash; big considered purchases, brand-building, staying top of mind. It&apos;s just not what most local businesses need first.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <div className="h-full rounded-2xl border-2 border-accent p-8 bg-bg-raised">
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent mb-4">Intent &mdash; demand capture</p>
                <p className="text-ink-muted leading-relaxed mb-4">
                  Be there the moment someone searches for what you sell &mdash; Google, Google Maps, and AI search. Marketers call it <em>pull</em>. Godin called it permission.
                </p>
                <p className="text-ink-quiet text-sm leading-relaxed">
                  The customer is already raising their hand. They&apos;re not deciding whether they want the service &mdash; only who to pick. This is what I specialize in.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== THE NUMBERS — the 2 hard stats ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">The numbers</Eyebrow>
          <DisplayH2 className="mb-12">It&apos;s not just logic. It&apos;s measurable.</DisplayH2>

          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="up">
              <div className="h-full rounded-2xl border border-line p-8 bg-bg-raised">
                <p className="display-h2 text-5xl md:text-6xl text-accent mb-2"><MonoNum>2.7%</MonoNum></p>
                <p className="text-ink font-semibold mb-4">vs 1.5% on social</p>
                <p className="text-ink-muted leading-relaxed">
                  People who find a business through organic search convert at <strong className="text-ink font-semibold">2.7%</strong> &mdash; nearly double social media&apos;s 1.5%.
                </p>
                <p className="text-ink-faint text-xs mt-4 font-mono tracking-wide">Ruler Analytics, 2025 &middot; 100M+ data points</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <div className="h-full rounded-2xl border border-line p-8 bg-bg-raised">
                <p className="display-h2 text-5xl md:text-6xl text-accent mb-2"><MonoNum>~40%</MonoNum></p>
                <p className="text-ink font-semibold mb-4">higher than Facebook ads</p>
                <p className="text-ink-muted leading-relaxed">
                  For home services, Google Search ads convert about <strong className="text-ink font-semibold">40% higher</strong> than Facebook ads &mdash; 7.3% vs 5.2%.
                </p>
                <p className="text-ink-faint text-xs mt-4 font-mono tracking-wide">LocaliQ / WordStream, 2025</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== AI SEARCH — AEO / GEO ==================== */}
      <section className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">The next search box is AI</Eyebrow>
          <DisplayH2 className="mb-10">Intent moved to ChatGPT, too.</DisplayH2>
          <div className="space-y-6 text-ink-muted text-lg leading-relaxed max-w-3xl">
            <p>
              More and more people don&apos;t type into Google anymore &mdash; they ask ChatGPT, Perplexity, or Google&apos;s own AI Overviews &ldquo;who&apos;s the best [service] near me?&rdquo; That&apos;s still intent. It&apos;s just a new front door.
            </p>
            <p>
              Getting your business named in those answers has its own name: <strong className="text-accent">AEO</strong> (Answer Engine Optimization), also called <strong className="text-accent">GEO</strong> (Generative Engine Optimization). Same goal as <strong className="text-accent">SEO</strong> &mdash; being found &mdash; pointed at AI instead of the old list of blue links.
            </p>
            <p>
              I build for all of it: classic search, the map, and the AI answer. Most of your competitors haven&apos;t even noticed the AI front door yet.
            </p>
          </div>

          <ScrollReveal direction="up">
            <div className="mt-12 rounded-2xl border-2 border-accent bg-bg-raised p-8 md:p-10 max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <IconSparkles className="w-5 h-5 text-accent" />
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">Proof</p>
              </div>
              <p className="text-ink text-xl md:text-2xl leading-snug font-semibold mb-4">
                Google&apos;s AI named a business I run marketing for in the answer for power washing in Volo, Illinois &mdash; while their competitors were still arguing about Facebook ads.
              </p>
              <p className="text-ink-muted leading-relaxed">
                AI answers shift every time someone checks &mdash; but showing up in them at all is the win, and most local businesses don&apos;t. That&apos;s not a future promise; it&apos;s happening today.
              </p>
              <figure className="mt-6">
                <img
                  src="/volo-ai-overview.png"
                  alt="Google's AI Overview naming a business TheKhan runs marketing for in the answer for power washing in Volo, Illinois"
                  className="w-full rounded-xl border border-line"
                  loading="lazy"
                />
                <figcaption className="mt-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet">
                  Google AI Overview &middot; May 25, 2026
                </figcaption>
              </figure>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ==================== ORIGIN — firsthand experience ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">How I know</Eyebrow>
          <ScrollReveal>
            <PullQuote attribution="Omair Khan · Founder, TheKhan">
              I didn&apos;t read this in a book. I built my own home service company on it.
            </PullQuote>
          </ScrollReveal>
          <div className="mt-12 space-y-6 text-ink-muted text-lg leading-relaxed max-w-3xl">
            <p>
              Before TheKhan, I ran Clean &amp; Green Property Care &mdash; a home service business right here on the North Shore. I grew it to <MonoNum>84</MonoNum> clients, mostly by being there when people searched for what I did.
            </p>
            <p>
              The leads that actually turned into work came from people already looking &mdash; not from ads I pushed at folks who weren&apos;t. That&apos;s the whole idea behind TheKhan, and now I run it for other businesses.
            </p>
            <p>
              <Link to="/about" className="link">The full story &rarr;</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ==================== HONESTY — organic decay ==================== */}
      <section className="section-deep py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">The honest part</Eyebrow>
          <DisplayH2 className="mb-10">Rankings are like staying in shape.</DisplayH2>
          <div className="space-y-6 text-ink-muted text-lg leading-relaxed max-w-3xl">
            <p>
              You own your site and every page on it, forever. Rankings are different &mdash; they&apos;re a position you hold by keeping the work going. Stop, and competitors slowly climb back over you.
            </p>
            <p>
              That&apos;s why the organic side is ongoing, not one-and-done. And it&apos;s exactly why ads exist as the instant on/off lever &mdash; flip them on for leads today while the rankings build underneath.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== THE TWO LANES — route to offers ==================== */}
      <section className="section-base py-24 md:py-32 px-6 lg:px-12 border-t border-line">
        <div className="max-w-4xl mx-auto">
          <Eyebrow accent className="mb-8">Two ways to use it</Eyebrow>
          <DisplayH2 className="mb-12">Both lanes catch people already searching.</DisplayH2>
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal direction="up">
              <Link to="/marketing" className="group block h-full rounded-2xl border-2 border-accent p-8 bg-bg-raised lift">
                <div className="flex items-center gap-3 mb-4">
                  <IconSearch className="w-5 h-5 text-accent" />
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">Organic &mdash; the long game</p>
                </div>
                <p className="text-ink text-xl font-semibold mb-3 group-hover:text-accent transition-colors">The Partnership</p>
                <p className="text-ink-muted leading-relaxed mb-4">
                  Own your market over time. Your site, your Google profile, and new pages every month so you climb and hold your spot. You own the site for good.
                </p>
                <span className="link">See how it works &rarr;</span>
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.08}>
              <Link to="/marketing#pricing" className="group block h-full rounded-2xl border border-line p-8 bg-bg-raised/40 lift">
                <div className="flex items-center gap-3 mb-4">
                  <IconBuildingStore className="w-5 h-5 text-accent" />
                  <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-quiet">Paid &mdash; leads now</p>
                </div>
                <p className="text-ink text-xl font-semibold mb-3 group-hover:text-accent transition-colors">Ad Management</p>
                <p className="text-ink-muted leading-relaxed mb-4">
                  Switch on Google Search and Local Services Ads to be in front of searchers today &mdash; while the organic side builds underneath. On or off whenever you want.
                </p>
                <span className="link">See pricing &rarr;</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section id="contact" className="section-raised py-24 md:py-32 px-6 lg:px-12 border-t border-line scroll-mt-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 max-w-3xl">
            <Eyebrow accent className="mb-6">Get in touch</Eyebrow>
            <DisplayH2 className="mb-6">Want this working for you?</DisplayH2>
            <p className="lede">
              Tell me about your business. If it&apos;s not a fit, I&apos;ll say so on the first call. No pitch.
            </p>
          </div>
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <p className="text-ink-muted leading-relaxed">
                Not sure which lane fits? That&apos;s the call. I&apos;ll tell you whether to start with the long game, ads, or both &mdash; whatever actually fits your situation.
              </p>
              <div className="pt-2">
                <a href="tel:8472208550" className="cta-orbit">
                  Tell me about your business &nbsp;<IconArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="ed-card-dark">
                <ContactForm source="why-intent-page" subjectPrefix="[Why Intent form]" showPhoneField />
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
