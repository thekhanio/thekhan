import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import { Logo } from "@/components/Logo";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { IconCheck, IconArrowLeft } from "@tabler/icons-react";

export interface ProposalConfig {
  client: {
    name: string;
    businessName?: string;
  };
  date: string;
  whereYouAre: string[];
  whereYoureHeaded: string[];
  whatWellBuild: {
    title: string;
    why: string;
  }[];
  monthOnePrice: string;
  monthOneDescription: string;
  ownership: string[];
  whatHappensNext: {
    step: string;
    detail: string;
  }[];
  damagingAdmission: string;
  scarcity: string;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-10 bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
      {children}
    </h2>
  );
}

export default function ProposalPage({ config }: { config: ProposalConfig }) {
  const { client, date, whereYouAre, whereYoureHeaded, whatWellBuild, monthOnePrice, monthOneDescription, ownership, whatHappensNext, damagingAdmission, scarcity } = config;

  return (
    <>
      <Helmet>
        <title>Proposal for {client.businessName || client.name} — TheKhan</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
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
              Proposal for {client.name}
            </h1>
            <p className="text-[#a3a3a3] text-base md:text-lg font-[family-name:var(--font-manrope)]">
              {date} &middot; Prepared by Omair Khan, TheKhan
            </p>
          </ScrollReveal>
        </header>

        {/* Section 1 — Where You Are */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Where You Are</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 space-y-6">
                {whereYouAre.map((p, i) => (
                  <p key={i} className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                    {p}
                  </p>
                ))}
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 2 — Where You're Headed */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Where You're Headed</SectionHeading>
          </ScrollReveal>
          <div className="space-y-6">
            {whereYoureHeaded.map((moment, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <SpotlightGlow className="w-full">
                  <div className="p-8 md:p-10 flex gap-5">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563eb]/20 to-[#06b6d4]/20 border border-[#06b6d4]/30 flex items-center justify-center">
                        <IconCheck className="w-4 h-4 text-[#06b6d4]" />
                      </div>
                    </div>
                    <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                      {moment}
                    </p>
                  </div>
                </SpotlightGlow>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 3 — What We'll Build */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>What We'll Build</SectionHeading>
          </ScrollReveal>
          <div className="space-y-5">
            {whatWellBuild.map((item, i) => (
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

        {/* Section 4 — Month 1 */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>Month 1</SectionHeading>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-12 text-center">
                <div className="mb-6">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                    {monthOnePrice}
                  </span>
                </div>
                <div className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] max-w-2xl mx-auto space-y-2">
                  {monthOneDescription.split('\n').map((line, i) => (
                    <p key={i} className={line === '' ? 'h-2' : ''}>{line}</p>
                  ))}
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 5 — What You Own */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>What You Own</SectionHeading>
          </ScrollReveal>
          <div className="space-y-4 mb-10">
            {ownership.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <div className="flex items-start gap-4">
                  <IconCheck className="w-5 h-5 text-[#06b6d4] mt-0.5 shrink-0" />
                  <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.3}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-5">
                  {damagingAdmission}
                </p>
                <p className="text-white font-semibold text-lg md:text-xl">
                  No contracts. No lock-in.
                </p>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 6 — What Happens Next */}
        <section className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeading>What Happens Next</SectionHeading>
          </ScrollReveal>
          <div className="space-y-8 mb-12">
            {whatHappensNext.map((item, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.08}>
                <div className="flex gap-5 items-start">
                  <div className="shrink-0">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2563eb] to-[#06b6d4] flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">{i + 1}</span>
                    </div>
                  </div>
                  <div className="pt-1 md:pt-2">
                    <p className="text-white font-semibold text-base md:text-lg mb-1">{item.step}</p>
                    <p className="text-[#a3a3a3] text-sm md:text-base leading-relaxed font-[family-name:var(--font-manrope)]">{item.detail}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal direction="up" delay={0.4}>
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10 text-center">
                <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)] mb-8">
                  {scarcity}
                </p>
                <a href="mailto:omair@thekhan.io?subject=I%27m%20in%20%E2%80%94%20let%27s%20go">
                  <MovingBorderButton
                    as="div"
                    borderRadius="9999px"
                    className="px-12 py-4 text-base md:text-lg font-semibold tracking-wide inline-flex"
                  >
                    I'm In
                  </MovingBorderButton>
                </a>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        <AnimatedUnderline className="max-w-md mx-auto mb-20" />

        {/* Section 7 — About TheKhan */}
        <footer className="px-6 pb-20 max-w-4xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-12">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold tracking-tight mb-2 text-white">
                About TheKhan
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-14 max-w-3xl mx-auto text-center">
              <p className="text-[#d4d4d4] text-base md:text-lg leading-relaxed font-[family-name:var(--font-manrope)]">
                You know who I am and how I work. Here&apos;s how to reach me.
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
