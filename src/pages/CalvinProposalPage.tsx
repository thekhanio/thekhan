import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl tracking-[-0.005em] mb-10 text-[#9BC4A8]">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-[-0.005em] mb-6 text-[#F5F1EB]">
      {children}
    </h3>
  );
}

export default function CalvinProposalPage() {
  return (
    <>
      <SEO
        title="Proposal for Crystal Clear — TheKhan"
        description="Custom proposal for Crystal Clear Window Washing & Janitorial Service Co. from TheKhan."
        canonical="https://thekhan.io/"
        noindex
      />

      <div className="proposal-archive min-h-screen bg-gradient-to-b from-[#1F1B17] to-[#2A251F] text-[#F5F1EB]">
        {/* Nav */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#1F1B17]/80 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-4 h-20 sm:h-18 flex items-center justify-center relative">
            <Link to="/" className="absolute left-6 flex items-center gap-2 text-sm text-[#9E9A95] hover:text-[#F5F1EB] transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/">
              <Logo variant="white" size="sm" type="full" />
            </Link>
          </div>
        </nav>

        {/* Header */}
        <header className="pt-20 md:pt-28 pb-16 px-6 text-center max-w-4xl mx-auto">
          
            
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl tracking-[-0.005em] mb-6">
              Proposal for Crystal Clear
            </h1>
            <p className="text-[#9E9A95] text-lg md:text-xl font-[family-name:var(--font-body)]">
              May 8, 2026 &middot; Prepared by Omair Khan, TheKhan
            </p>
          
        </header>

        {/* Section 1 — Two Design Directions */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <SectionHeading>Two design directions</SectionHeading>
          <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-8 max-w-3xl">
            Both directions are built on what works for commercial cleaning and procurement-led buyers like yours. You can edit anything here, mix them, or pick one as-is. A completely different direction is possible &mdash; just a bigger lift.
          </p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-5">
            <a
              href="https://crystal-clear-demo-a.thekhan.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-accent text-base md:text-lg"
            >
              View Direction A &rarr;
            </a>
            <a
              href="https://crystal-clear-demo-b.thekhan.workers.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-accent text-base md:text-lg"
            >
              View Direction B &rarr;
            </a>
          </div>
        </section>

        {/* Section 2 — Where You Are Digitally */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>Where You Are Digitally</SectionHeading>
          
          
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Your website has two problems: it doesn&apos;t tell buyers your story, and it doesn&apos;t tell Google what you actually do.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  When a buyer lands on your homepage &mdash; a property manager, a procurement officer, or a general contractor &mdash; they see a generic line about &ldquo;a professional cleaning company providing window washing and janitorial services&rdquo; that could describe any cleaning company in Chicago. Your real story (14 years, MBE and DBE certified, Goldman 10K alum, real clients across commercial, government, and real estate) is on your About page, two clicks deep.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Google has a hidden problem. Google doesn&apos;t just read what visitors see &mdash; it reads the underlying setup of your website. Your site was built from a template that came pre-loaded with fake placeholder info, and that info is still there. Right now Google is reading:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span>An email: <strong className="text-[#F5F1EB]">constructor@gmail.com</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span>An address: <strong className="text-[#F5F1EB]">&ldquo;Themeforest, Envato HQ, 24 Fifth Street, Los Angeles, USA&rdquo;</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span>Two phone numbers: <strong className="text-[#F5F1EB]">&ldquo;+1 234 5678 098&rdquo;</strong> and <strong className="text-[#F5F1EB]">&ldquo;+1 634 7638 654&rdquo;</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span>Three customer reviews written in fake Latin text, attributed to <strong className="text-[#F5F1EB]">&ldquo;David,&rdquo; &ldquo;Katy Grey,&rdquo;</strong> and <strong className="text-[#F5F1EB]">&ldquo;Jone Doe&rdquo;</strong></span>
                  </li>
                </ul>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  You can&apos;t see any of this by scrolling your live site &mdash; it&apos;s all hidden in the back-end. But Google reads the back-end. So when Google tries to figure out who you are, where you are, and whether real people leave you reviews, it gets confused. That&apos;s why it doesn&apos;t rank you.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Your site has been live for years without bringing in a single lead. That&apos;s not a quality issue. It&apos;s how the site is set up under the hood.
                </p>
              </div>
            </SpotlightGlow>
          
        </section>

        

        {/* Section 3 — Why This Matters Now */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>Why This Matters Now</SectionHeading>
          
          
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Here&apos;s what changed since 2012.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Back when you started, a property manager needing a cleaning vendor called someone they knew, asked around at industry events, or pulled out the Yellow Pages. A website was optional &mdash; nice to have, didn&apos;t need to do much.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  In 2026, even the people who say they don&apos;t use Google use Google. Before they go anywhere, before they buy anything, before they hire a vendor, they Google it. Research shows nearly 90% of business buyers research vendors online before they ever pick up the phone &mdash; that includes property managers, procurement officers, and general contractors.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  And it&apos;s not just Google anymore. When buyers ask ChatGPT or use Google&apos;s AI Overview to find a vendor, those tools pull information from websites too.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  What this means for you: even when a referral sends someone your way, the first thing they do is look you up online. They land on your site, see what we just covered, and decide not to call &mdash; even when the referral was solid.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Word of mouth and relationships still close deals. That hasn&apos;t changed. But more of those deals run through a Google check before they close. That&apos;s the gap we&apos;re closing.
                </p>
              </div>
            </SpotlightGlow>
          
        </section>

        

        {/* Section 4 — The Plan */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>The Plan</SectionHeading>
          

          
            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-12 max-w-3xl">
              Here&apos;s how I&apos;d approach getting your digital presence working. Three lanes &mdash; what I handle, what&apos;s worth considering on your side, and what you own. You decide which lanes to invest in.
            </p>
          

          {/* Lane 1 — What I Handle */}
          
            <SubHeading>What I Handle</SubHeading>
          
          <div className="space-y-5 mb-16">
            {[
              { title: "Rebuild the website", why: "Clean site that tells your story up front — your certifications, your real client list, what you actually do across all three sides of your business. Every page set up so Google knows where you are and what you offer." },
              { title: "Manage your Google Business Profile", why: "Add photos when you finish jobs, post when there’s something worth posting, respond to questions and reviews when they come in. This is where buyers vetting you check first." },
              { title: "Add one new page every month", why: "Start with the three sides of your business. Then expand into specific service-and-area pages over time — “condo cleaning Lincoln Park,” “post-construction cleaning Fulton Market,” that kind of thing." },
              { title: "Get you listed on the directories that matter", why: "I submit you to Google Business Profile, Bing Places, Apple Maps, Yellow Pages, Blue Book Network (where general contractors look for subs), Manta, and similar business directories. Each one tells Google you’re a real business with consistent information." },
              { title: "Set up a review process", why: "A simple way to ask clients for reviews after a job. Be aware: commercial reviews come slower than residential. Property managers leave them sometimes, procurement officers rarely do. We’ll focus where it’s worth the ask." },
              { title: "Monthly report", why: "One page sent on the 1st. How people found your website, what they searched to land there, and exactly what I did that month. Plain English, no fluff." },
            ].map((item, i) => (
              
                <div key={i} className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#9BC4A8]" />
                  </div>
                  <div>
                    <p className="text-[#F5F1EB] font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">{item.why}</p>
                  </div>
                </div>
              
            ))}
          </div>

          {/* Lane 2 — Worth Considering */}
          
            <SubHeading>Worth Considering (your call)</SubHeading>
          
          
            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-6">
              Three paid memberships worth looking into. None are required &mdash; and the applications are something you&apos;d handle, not me. I&apos;ll point you in the right direction if you decide to pursue any of them.
            </p>
          
          <div className="space-y-5 mb-16">
            {[
              { title: "BBB Accreditation — about $600/year", why: "Universal credibility signal." },
              { title: "BOMA Chicago — about $2,000/year", why: "Where Chicago property managers go to find vendors." },
              { title: "CMSDC membership — about $1,000/year", why: "You’re already CMSDC-certified — membership is the next step. It puts you in the supplier database where corporate procurement teams search for minority vendors." },
              { title: "BSCAI (Building Service Contractors Association International) — about $500–1,000/year", why: "Industry-specific. If you’re not already in it, worth a look — they have a contractor directory where commercial procurement teams search." },
            ].map((item, i) => (
              
                <div key={i} className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#9BC4A8]" />
                  </div>
                  <div>
                    <p className="text-[#F5F1EB] font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">{item.why}</p>
                  </div>
                </div>
              
            ))}
          </div>

          {/* Lane 3 — What You Own */}
          
            <SubHeading>What You Own (and Drive)</SubHeading>
          
          
            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-6">
              A few things only you can do. Light lift &mdash; about 3 hours a month.
            </p>
          
          <div className="space-y-5">
            {[
              { title: "Send job site photos", why: "4–6 a month when you can, phone photos are fine. I handle the captions and posts." },
              { title: "Forward review asks", why: "When a job finishes well, send the client the link I’ll set up. Takes 30 seconds." },
              { title: "Networking events when you can", why: "1–2 a month at BOMA, AGC, and similar industry events." },
              { title: "Approve drafts", why: "Quick review of the monthly report and anything I send for your sign-off." },
            ].map((item, i) => (
              
                <div key={i} className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#9BC4A8]" />
                  </div>
                  <div>
                    <p className="text-[#F5F1EB] font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">{item.why}</p>
                  </div>
                </div>
              
            ))}
          </div>
        </section>

        

        {/* Section 5 — Two Paths */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>Two Paths</SectionHeading>
          
          
            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-10 max-w-3xl">
              You have two options. Both replace the broken site. Path B keeps things moving after the build.
            </p>
          

          {/* Path A */}
          
            <SpotlightGlow className="w-full mb-8">
              <div className="p-8 md:p-12">
                <p className="text-sm uppercase tracking-widest text-[#9E9A95] mb-2 font-[family-name:var(--font-body)]">Path A &mdash; Just the Website</p>
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2D4A3E] to-[#9BC4A8] bg-clip-text text-transparent">
                    $750
                  </span>
                </div>
                <p className="text-[#9E9A95] text-sm font-[family-name:var(--font-body)] mb-6 italic">One-time</p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-6">
                  A clean 5-page website that fixes what&apos;s broken. Live in 2&ndash;3 weeks.
                </p>
                <p className="text-[#F5F1EB] font-semibold mb-3">What you get:</p>
                <ul className="space-y-2 mb-6">
                  {[
                    "5 pages: Home, About, Services, Clients, Contact",
                    "Custom coded, mobile-friendly, fast-loading",
                    "Your real story up front — certifications, client list, what you actually do",
                    "Set up so Google can read it properly",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#F5F1EB] text-base font-[family-name:var(--font-body)]">
                      <IconCheck className="w-5 h-5 text-[#9BC4A8] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#9E9A95] text-base font-[family-name:var(--font-body)] mb-8">
                  After delivery, it&apos;s yours. No ongoing cost.
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-[#F5F1EB] font-semibold mb-2">Optional add-on &mdash; self-editing dashboard, $59/month</p>
                  <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">
                    Built into the site at signing (can&apos;t be added later). Most commercial businesses don&apos;t use it enough to justify the cost &mdash; major edits are infrequent, and I can handle them on a paid basis when needed. Worth it if you&apos;d rather make regular edits to the site yourself.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          

          {/* Path B — Recommended */}
          
            <div className="relative">
              <div className="absolute -top-3 left-8 z-10">
                <span className="bg-gradient-to-r from-[#2D4A3E] to-[#9BC4A8] text-[#F5F1EB] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Recommended
                </span>
              </div>
              <SpotlightGlow className="w-full">
                <div className="p-8 md:p-12">
                  <p className="text-sm uppercase tracking-widest text-[#9E9A95] mb-2 font-[family-name:var(--font-body)]">Path B &mdash; Website + Marketing</p>
                  <div className="mb-2">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2D4A3E] to-[#9BC4A8] bg-clip-text text-transparent">
                      $900 first month
                    </span>
                    <span className="text-2xl md:text-3xl text-[#9E9A95] mx-2">+</span>
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2D4A3E] to-[#9BC4A8] bg-clip-text text-transparent">
                      $599/month after
                    </span>
                  </div>
                  <p className="text-[#9E9A95] text-sm font-[family-name:var(--font-body)] mb-6 italic">Month-to-month</p>
                  <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-6">
                    The full site plus monthly work to make it actually rank and bring in visibility.
                  </p>
                  <p className="text-[#F5F1EB] font-semibold mb-3">What you get:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "8-page website: 5 core pages + 3 dedicated pages for commercial, condo/HOA, and post-construction",
                      "Everything in Path A",
                      "Plus the monthly work above (SEO, GBP, directories, reviews, reporting)",
                      "Self-editing dashboard included — no extra charge (normally $59/month)",
                      "Month-to-month — 72-hour cancel before next billing date",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-[#F5F1EB] text-base font-[family-name:var(--font-body)]">
                        <IconCheck className="w-5 h-5 text-[#9BC4A8] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-4 text-[#F5F1EB] text-base md:text-lg leading-relaxed font-[family-name:var(--font-body)]">
                    <p>
                      <strong className="text-[#9BC4A8] font-semibold">$900 covers your first month</strong> &mdash; full website build + setup of your Google Business Profile, directories, tracking, and first SEO pages. Everything to get you started.
                    </p>
                    <p>
                      <strong className="text-[#9BC4A8] font-semibold">$599 every month after</strong> &mdash; ongoing work to keep your site ranking and your phone bringing in real opportunities.
                    </p>
                    <p className="text-[#9E9A95]">
                      Domain and email are already set up &mdash; no additional costs.
                    </p>
                  </div>
                </div>
              </SpotlightGlow>
            </div>
          
        </section>

        

        {/* Section 6 — What You Own */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>What You Own</SectionHeading>
          
          
            <SpotlightGlow className="w-full mb-10">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Your domain, your email, your Google profile &mdash; those are already yours and stay yours. The new website I build sits on top of what you already have.
                </p>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  The code is yours, custom-coded, no platform lock-in. Here&apos;s how it works in plain terms:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span><strong className="text-[#F5F1EB]">GitHub</strong> = where your website&apos;s code is stored. Like a digital filing cabinet &mdash; yours.</span>
                  </li>
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span><strong className="text-[#F5F1EB]">Cloudflare</strong> = the service that puts your site on the internet so visitors can see it. Free at the size your site will be.</span>
                  </li>
                  <li className="flex gap-3 text-[#F5F1EB] text-lg md:text-xl font-[family-name:var(--font-body)]">
                    <span className="text-[#9BC4A8] mt-1.5">&bull;</span>
                    <span><strong className="text-[#F5F1EB]">Domain</strong> = your crystalclearwwjs.com name, already on GoDaddy.</span>
                  </li>
                </ul>
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  Once I set everything up, you don&apos;t have to look at any of it. Your only ongoing cost is whatever GoDaddy charges you for the domain renewal (usually $15&ndash;$20/year). If you ever want to take everything elsewhere, you have full access to all of it &mdash; code, GitHub account, hosting account.
                </p>
              </div>
            </SpotlightGlow>
          

          
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10">
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-5">
                  I work with a handful of clients at a time, on purpose. The businesses I work with, I treat like they&apos;re my own. I never want anyone I work with to feel like just a number at a big marketing company. I believe the best work comes from a long-term relationship &mdash; it&apos;s mutually beneficial.
                </p>
                <p className="text-[#F5F1EB] font-semibold text-lg md:text-xl">
                  No contracts. No lock-in.
                </p>
              </div>
            </SpotlightGlow>
          
        </section>

        

        {/* Section 7 — What Happens Next */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          
            <SectionHeading>What Happens Next</SectionHeading>
          

          {/* Path A timeline */}
          
            <SubHeading>If Path A (Just the Website)</SubHeading>
          
          <div className="space-y-8 mb-16">
            {[
              { step: "You pay $750", detail: "Work starts that day." },
              { step: "Quick questionnaire from me", detail: "About 10–15 minutes to fill out online, captures everything I need to get started." },
              { step: "Send over your logos, real client list, competitors you watch, anything else relevant.", detail: "" },
              { step: "Site built and live within 2–3 weeks", detail: "Code in your GitHub, hosted on Cloudflare, both in your name." },
              { step: "Done", detail: "No ongoing relationship unless you need edits later." },
            ].map((item, i) => (
              
                <div key={i} className="flex gap-5 items-start">
                  <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2D4A3E] to-[#9BC4A8] flex items-center justify-center">
                      <span className="text-[#F5F1EB] font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-[#F5F1EB] font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    {item.detail && (
                      <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">{item.detail}</p>
                    )}
                  </div>
                </div>
              
            ))}
          </div>

          {/* Path B timeline */}
          
            <SubHeading>If Path B (Website + Marketing)</SubHeading>
          
          <div className="space-y-8 mb-12">
            {[
              { step: "You pay $900 for the first month", detail: "Covers your full onboarding and first month of work. From the second month on, it’s $599 on the 1st." },
              { step: "Quick questionnaire from me", detail: "About 10–15 minutes to fill out online." },
              { step: "Send over your logos, real client list, competitors you watch, anything else relevant.", detail: "" },
              { step: "Month 1 is full onboarding", detail: "Site build begins, I get the credentials I need or you add me as a manager where applicable (Google Business Profile, etc.), GBP cleanup starts, first directory submissions go out." },
              { step: "Full 8-page site live within 30–45 days", detail: "" },
              { step: "Monthly report on the 1st of each month starting month 2", detail: "What shipped, what’s working." },
            ].map((item, i) => (
              
                <div key={i} className="flex gap-5 items-start">
                  <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2D4A3E] to-[#9BC4A8] flex items-center justify-center">
                      <span className="text-[#F5F1EB] font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-[#F5F1EB] font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    {item.detail && (
                      <p className="text-[#9E9A95] text-sm md:text-base leading-relaxed font-[family-name:var(--font-body)]">{item.detail}</p>
                    )}
                  </div>
                </div>
              
            ))}
          </div>

          
            <SpotlightGlow className="w-full mb-12">
              <div className="p-8 md:p-10">
                <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                  If you ever want to explore paid ads down the road &mdash; after 3 or 6 months when we can see what&apos;s actually working &mdash; we can revisit. But like I tell everyone: ads only work while you&apos;re running them. The website and SEO foundation we&apos;re building keeps paying off. Ads stop the day you stop paying.
                </p>
              </div>
            </SpotlightGlow>
          

          
            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-12 max-w-3xl">
              <strong className="text-[#F5F1EB]">Either path works.</strong> Path B if you want me running things alongside you. Path A if you&apos;d rather start with the site and circle back. Either way &mdash; month-to-month, no contracts.
            </p>

            <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)] mb-8">
              Three ways to reach me when you&apos;re ready:
            </p>
            <div className="space-y-6 text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
              <p>
                <strong className="text-[#9BC4A8] font-semibold">Text or call:</strong>{" "}
                <a href="tel:8472208550" className="hover:text-[#9BC4A8] transition-colors">
                  (847) 220-8550
                </a>
              </p>
              <p>
                <strong className="text-[#9BC4A8] font-semibold">Email:</strong>{" "}
                <a href="mailto:omair@thekhan.io" className="hover:text-[#9BC4A8] transition-colors">
                  Omair@TheKhan.io
                </a>
              </p>
              <p>
                <strong className="text-[#9BC4A8] font-semibold">Or just reply to the email this came in on</strong> &mdash; fastest path, I&apos;ll see it within a few hours.
              </p>
            </div>
          
        </section>

        

        {/* Section 8 — About Me */}
        <footer className="px-6 pb-20 max-w-4xl mx-auto">
          
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl tracking-[-0.005em] mb-2 text-[#F5F1EB]">
                About Me
              </h2>
            </div>
          

          
            <div className="mb-14 max-w-3xl mx-auto text-center">
              <p className="text-[#F5F1EB] text-lg md:text-xl leading-relaxed font-[family-name:var(--font-body)]">
                I&apos;m Omair Khan. I run TheKhan as a one-person operation out of Deerfield, IL. Before this I ran my own contracting business &mdash; Clean &amp; Green Property Care &mdash; peaked at 84 clients before I closed it down to focus on this full-time. I work with a handful of business owners at a time &mdash; contractors, home service businesses, and commercial operators &mdash; helping them get found online and grow.
              </p>
            </div>
          

          
            <div className="text-center space-y-3 mb-14">
              <p className="text-[#F5F1EB] text-base font-[family-name:var(--font-body)]">
                <a href="mailto:omair@thekhan.io" className="hover:text-[#F5F1EB] transition-colors">Omair@TheKhan.io</a>
                <span className="mx-3 text-[#F5F1EB]/20">|</span>
                <a href="tel:8472208550" className="hover:text-[#F5F1EB] transition-colors">(847) 220-8550</a>
              </p>
            </div>
          

          
            <div className="flex flex-col items-center gap-6">
              <img
                src="/favicon-dark.svg"
                alt="TheKhan"
                className="w-14 h-14"
                width={56}
                height={56}
              />
              <p className="text-[#9E9A95] text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            </div>
          
        </footer>
      </div>
    </>
  );
}
