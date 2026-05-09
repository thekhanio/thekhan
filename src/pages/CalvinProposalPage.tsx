import { SEO } from "@/components/SEO";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-10 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold tracking-tight mb-6 text-white">
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

      <div className="proposal-archive min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
        {/* Nav */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-4 h-20 sm:h-18 flex items-center justify-center relative">
            <Link to="/" className="absolute left-6 flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors">
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
          <ScrollReveal direction="up">
            <AnimatedUnderline className="max-w-xs mx-auto mb-12" />
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Proposal for Crystal Clear
            </h1>
            <p className="text-[#a3a3a3] text-base md:text-lg font-[family-name:var(--font-manrope)]">
              May 8, 2026 &middot; Prepared by Omair Khan, TheKhan
            </p>
          </ScrollReveal>
        </header>

        {/* Section 2 — Where You Are Digitally */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Where You Are Digitally</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Your website has two problems: it doesn&apos;t tell buyers your story, and it doesn&apos;t tell Google what you actually do.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  When a buyer lands on your homepage &mdash; a property manager, a procurement officer, or a general contractor &mdash; they see a generic line about &ldquo;a professional cleaning company providing window washing and janitorial services&rdquo; that could describe any cleaning company in Chicago. Your real story (14 years, MBE and DBE certified, Goldman 10K alum, real clients across commercial, government, and real estate) is on your About page, two clicks deep.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Google has a hidden problem. Google doesn&apos;t just read what visitors see &mdash; it reads the underlying setup of your website. Your site was built from a template that came pre-loaded with fake placeholder info, and that info is still there. Right now Google is reading:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span>An email: <strong className="text-white">constructor@gmail.com</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span>An address: <strong className="text-white">&ldquo;Themeforest, Envato HQ, 24 Fifth Street, Los Angeles, USA&rdquo;</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span>Two phone numbers: <strong className="text-white">&ldquo;+1 234 5678 098&rdquo;</strong> and <strong className="text-white">&ldquo;+1 634 7638 654&rdquo;</strong></span>
                  </li>
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span>Three customer reviews written in fake Latin text, attributed to <strong className="text-white">&ldquo;David,&rdquo; &ldquo;Katy Grey,&rdquo;</strong> and <strong className="text-white">&ldquo;Jone Doe&rdquo;</strong></span>
                  </li>
                </ul>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  You can&apos;t see any of this by scrolling your live site &mdash; it&apos;s all hidden in the back-end. But Google reads the back-end. So when Google tries to figure out who you are, where you are, and whether real people leave you reviews, it gets confused. That&apos;s why it doesn&apos;t rank you.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Your site has been live for years without bringing in a single lead. That&apos;s not a quality issue. It&apos;s how the site is set up under the hood.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 3 — Why This Matters Now */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Why This Matters Now</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Here&apos;s what changed since 2012.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Back when you started, a property manager needing a cleaning vendor called someone they knew, asked around at industry events, or pulled out the Yellow Pages. A website was optional &mdash; nice to have, didn&apos;t need to do much.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  In 2026, even the people who say they don&apos;t use Google use Google. Before they go anywhere, before they buy anything, before they hire a vendor, they Google it. Research shows nearly 90% of business buyers research vendors online before they ever pick up the phone &mdash; that includes property managers, procurement officers, and general contractors.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  And it&apos;s not just Google anymore. When buyers ask ChatGPT or use Google&apos;s AI Overview to find a vendor, those tools pull information from websites too.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  What this means for you: even when a referral sends someone your way, the first thing they do is look you up online. They land on your site, see what we just covered, and decide not to call &mdash; even when the referral was solid.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Word of mouth and relationships still close deals. That hasn&apos;t changed. But more of those deals run through a Google check before they close. That&apos;s the gap we&apos;re closing.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 4 — The Plan */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>The Plan</SectionHeading>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-12 max-w-3xl">
              Here&apos;s how I&apos;d approach getting your digital presence working. Three lanes &mdash; what I handle, what&apos;s worth considering on your side, and what you own. You decide which lanes to invest in.
            </p>
          </ScrollReveal>

          {/* Lane 1 — What I Handle */}
          <ScrollReveal direction="up" delay={0.15}>
            <SubHeading>What I Handle</SubHeading>
          </ScrollReveal>
          <div className="space-y-5 mb-16">
            {[
              { title: "Rebuild the website", why: "Clean site that tells your story up front — your certifications, your real client list, what you actually do across all three sides of your business. Every page set up so Google knows where you are and what you offer." },
              { title: "Manage your Google Business Profile", why: "Add photos when you finish jobs, post when there’s something worth posting, respond to questions and reviews when they come in. This is where buyers vetting you check first." },
              { title: "Add new pages every month", why: "Start with the three sides of your business. Then expand into specific service-and-area pages over time — “condo cleaning Lincoln Park,” “post-construction cleaning Fulton Market,” that kind of thing." },
              { title: "Get you listed on the directories that matter", why: "I submit you to Google Business Profile, Bing Places, Apple Maps, Yellow Pages, Blue Book Network (where general contractors look for subs), Manta, and similar business directories. Each one tells Google you’re a real business with consistent information." },
              { title: "Set up a review process", why: "A simple way to ask clients for reviews after a job. Be aware: commercial reviews come slower than residential. Property managers leave them sometimes, procurement officers rarely do. We’ll focus where it’s worth the ask." },
              { title: "Monthly report", why: "One page sent on the 1st. How people found your website, what they searched to land there, and exactly what I did that month. Plain English, no fluff." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.why}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Lane 2 — Worth Considering */}
          <ScrollReveal direction="up">
            <SubHeading>Worth Considering (your call)</SubHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
              Three paid memberships worth looking into. None are required &mdash; and the applications are something you&apos;d handle, not me. I&apos;ll point you in the right direction if you decide to pursue any of them.
            </p>
          </ScrollReveal>
          <div className="space-y-5 mb-16">
            {[
              { title: "BBB Accreditation — about $600/year", why: "Universal credibility signal." },
              { title: "BOMA Chicago — about $2,000/year", why: "Where Chicago property managers go to find vendors." },
              { title: "CMSDC membership — about $1,000/year", why: "Where corporate buyers find minority-owned vendors. If you’re not a member yet, your existing MBE certification with the City makes the application straightforward." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.why}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Lane 3 — What You Own */}
          <ScrollReveal direction="up">
            <SubHeading>What You Own (and Drive)</SubHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
              A few things only you can do. Light lift &mdash; about 3 hours a month.
            </p>
          </ScrollReveal>
          <div className="space-y-5">
            {[
              { title: "Send job site photos", why: "4–6 a month when you can, phone photos are fine. I handle the captions and posts." },
              { title: "Forward review asks", why: "When a job finishes well, send the client the link I’ll set up. Takes 30 seconds." },
              { title: "Networking events when you can", why: "1–2 a month at BOMA, AGC, and similar industry events." },
              { title: "Approve drafts", why: "Quick review of the monthly report and anything I send for your sign-off." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <div className="flex gap-4 items-start">
                  <div className="shrink-0 mt-1.5">
                    <IconCheck className="w-5 h-5 text-[#06b6d4]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.title}</p>
                    <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.why}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 5 — Two Paths */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Two Paths</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-10 max-w-3xl">
              You have two options. Both replace the broken site. Path B keeps things moving after the build.
            </p>
          </ScrollReveal>

          {/* Path A */}
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full mb-8">
              <div className="p-8 md:p-12">
                <p className="text-sm uppercase tracking-widest text-[#a3a3a3] mb-2 font-[family-name:var(--font-manrope)]">Path A &mdash; Just the Website</p>
                <div className="mb-2">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                    $750
                  </span>
                </div>
                <p className="text-[#a3a3a3] text-sm font-[family-name:var(--font-manrope)] mb-6 italic">One-time</p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
                  A clean 5-page website that fixes what&apos;s broken. Live in 2&ndash;3 weeks.
                </p>
                <p className="text-white font-semibold mb-3">What you get:</p>
                <ul className="space-y-2 mb-6">
                  {[
                    "5 pages: Home, About, Services, Clients, Contact",
                    "Custom coded, mobile-friendly, fast-loading",
                    "Your real story up front — certifications, client list, what you actually do",
                    "Set up so Google can read it properly",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-[#d4d4d4] text-base font-[family-name:var(--font-manrope)]">
                      <IconCheck className="w-5 h-5 text-[#06b6d4] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#a3a3a3] text-base font-[family-name:var(--font-manrope)] mb-8">
                  After delivery, it&apos;s yours. No ongoing cost.
                </p>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white font-semibold mb-2">Optional add-on &mdash; self-editing dashboard, $60/month</p>
                  <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">
                    Built into the site at signing (can&apos;t be added later). Most commercial businesses don&apos;t use it enough to justify the cost &mdash; major edits are infrequent, and I can handle them on a paid basis when needed. Worth it if you&apos;d rather make regular edits to the site yourself.
                  </p>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>

          {/* Path B — Recommended */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="relative">
              <div className="absolute -top-3 left-8 z-10">
                <span className="bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                  Recommended
                </span>
              </div>
              <SpotlightGlow className="w-full">
                <div className="p-8 md:p-12">
                  <p className="text-sm uppercase tracking-widest text-[#a3a3a3] mb-2 font-[family-name:var(--font-manrope)]">Path B &mdash; Website + Marketing</p>
                  <div className="mb-2">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                      $900 first month
                    </span>
                    <span className="text-2xl md:text-3xl text-[#a3a3a3] mx-2">+</span>
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                      $599/month after
                    </span>
                  </div>
                  <p className="text-[#a3a3a3] text-sm font-[family-name:var(--font-manrope)] mb-6 italic">Month-to-month</p>
                  <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-6">
                    The full site plus monthly work to make it actually rank and bring in visibility.
                  </p>
                  <p className="text-white font-semibold mb-3">What you get:</p>
                  <ul className="space-y-2 mb-6">
                    {[
                      "8-page website: 5 core pages + 3 dedicated pages for commercial, condo/HOA, and post-construction",
                      "Everything in Path A",
                      "Plus the monthly work above (SEO, GBP, directories, reviews, reporting)",
                      "Self-editing dashboard included — no extra charge (normally $60/month)",
                      "Month-to-month — 72-hour cancel before next billing date",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-3 text-[#d4d4d4] text-base font-[family-name:var(--font-manrope)]">
                        <IconCheck className="w-5 h-5 text-[#06b6d4] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-[#a3a3a3] text-base font-[family-name:var(--font-manrope)]">
                    <strong className="text-white">Your out-of-pocket:</strong> $900 to start, then $599 on the 1st of each month. Domain and email are already set up &mdash; no additional costs.
                  </p>
                </div>
              </SpotlightGlow>
            </div>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 6 — What You Own */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>What You Own</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full mb-10">
              <div className="p-8 md:p-12 space-y-6">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Your domain, your email, your Google profile &mdash; those are already yours and stay yours. The new website I build sits on top of what you already have.
                </p>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  The code is yours, custom-coded, no platform lock-in. Here&apos;s how it works in plain terms:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span><strong className="text-white">GitHub</strong> = where your website&apos;s code is stored. Like a digital filing cabinet &mdash; yours.</span>
                  </li>
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span><strong className="text-white">Cloudflare</strong> = the service that puts your site on the internet so visitors can see it. Free at the size your site will be.</span>
                  </li>
                  <li className="flex gap-3 text-[#d4d4d4] text-base md:text-lg font-[family-name:var(--font-manrope)]">
                    <span className="text-[#06b6d4] mt-1.5">&bull;</span>
                    <span><strong className="text-white">Domain</strong> = your crystalclearwwjs.com name, already on GoDaddy.</span>
                  </li>
                </ul>
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  Once I set everything up, you don&apos;t have to look at any of it. Your only ongoing cost is whatever GoDaddy charges you for the domain renewal (usually $15&ndash;$20/year). If you ever want to take everything elsewhere, you have full access to all of it &mdash; code, GitHub account, hosting account.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-5">
                  I work with a handful of clients at a time, on purpose. The businesses I work with, I treat like they&apos;re my own. I never want anyone I work with to feel like just a number at a big marketing company. I believe the best work comes from a long-term relationship &mdash; it&apos;s mutually beneficial.
                </p>
                <p className="text-white font-semibold text-lg md:text-xl">
                  No contracts. No lock-in.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 7 — What Happens Next */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>What Happens Next</SectionHeading>
          </ScrollReveal>

          {/* Path A timeline */}
          <ScrollReveal direction="up" delay={0.1}>
            <SubHeading>If Path A (Just the Website)</SubHeading>
          </ScrollReveal>
          <div className="space-y-8 mb-16">
            {[
              { step: "You pay $750", detail: "Work starts that day." },
              { step: "Quick questionnaire from me", detail: "About 10–15 minutes to fill out online, captures everything I need to get started." },
              { step: "Send over your logos, real client list, competitors you watch, anything else relevant.", detail: "" },
              { step: "Site built and live within 2–3 weeks", detail: "Code in your GitHub, hosted on Cloudflare, both in your name." },
              { step: "Done", detail: "No ongoing relationship unless you need edits later." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    {item.detail && (
                      <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.detail}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Path B timeline */}
          <ScrollReveal direction="up">
            <SubHeading>If Path B (Website + Marketing)</SubHeading>
          </ScrollReveal>
          <div className="space-y-8 mb-12">
            {[
              { step: "You pay $900 for the first month", detail: "Covers your full onboarding and first month of work. From the second month on, it’s $599 on the 1st." },
              { step: "Quick questionnaire from me", detail: "About 10–15 minutes to fill out online." },
              { step: "Send over your logos, real client list, competitors you watch, anything else relevant.", detail: "" },
              { step: "Month 1 is full onboarding", detail: "Site build begins, I get the credentials I need or you add me as a manager where applicable (Google Business Profile, etc.), GBP cleanup starts, first directory submissions go out." },
              { step: "Full 8-page site live within 30–45 days", detail: "" },
              { step: "Monthly report on the 1st of each month starting month 2", detail: "What shipped, what’s working." },
            ].map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    {item.detail && (
                      <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.detail}</p>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <SpotlightGlow className="w-full mb-12">
              <div className="p-8 md:p-10">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                  If you ever want to explore paid ads down the road &mdash; after 3 or 6 months when we can see what&apos;s actually working &mdash; we can revisit. But like I tell everyone: ads only work while you&apos;re running them. The website and SEO foundation we&apos;re building keeps paying off. Ads stop the day you stop paying.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10 text-center">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-8">
                  <strong className="text-white">Either path works.</strong> Path B if you want me running things alongside you. Path A if you&apos;d rather start with the site and circle back. Either way &mdash; month-to-month, no contracts.
                </p>
                <a
                  href="mailto:omair@thekhan.io?subject=Crystal%20Clear%20%E2%80%94%20I%27m%20In"
                  data-print-hide="true"
                >
                  <MovingBorderButton
                    as="div"
                    borderRadius="9999px"
                    className="px-12 py-4 text-base md:text-lg font-semibold tracking-wide inline-flex"
                  >
                    I&apos;m In
                  </MovingBorderButton>
                </a>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 8 — About Me */}
        <footer className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                About Me
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-14 max-w-3xl mx-auto text-center">
              <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                I&apos;m Omair Khan. I run TheKhan as a one-person operation out of Deerfield, IL. Before this I ran my own contracting business &mdash; Clean &amp; Green Property Care &mdash; peaked at 84 clients before I closed it down to focus on this full-time. I work with a handful of business owners at a time &mdash; contractors, home service businesses, and commercial operators &mdash; helping them get found online and grow.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="text-center space-y-3 mb-14">
              <p className="text-[#d4d4d4] text-base font-[family-name:var(--font-manrope)]">
                <a href="mailto:omair@thekhan.io" className="hover:text-white transition-colors">Omair@TheKhan.io</a>
                <span className="mx-3 text-white/20">|</span>
                <a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a>
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="flex flex-col items-center gap-6">
              <Logo variant="white" size="md" type="short" />
              <AnimatedUnderline className="w-32" />
              <p className="text-[#606060] text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </>
  );
}
