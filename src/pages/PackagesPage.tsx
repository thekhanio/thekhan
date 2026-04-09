import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { SpotlightGlow } from "@/components/ui/spotlight-glow";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { IconCheck, IconPlus, IconArrowLeft, IconArrowRight, IconBrandLinkedin, IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";
import { BackgroundPaths } from "@/components/ui/background-paths";

const tiers = [
  {
    id: "foundation",
    name: "Foundation",
    price: "$299",
    periodLabel: "One-time project",
    desc: "A clean, hand-coded landing page — live in days, not weeks.",
    includes: null,
    features: [
      "Single landing page",
      "Clean, modern design",
      "Mobile responsive",
      "Essential SEO meta tags",
      "Contact form",
      "Domain + hosting setup",
      "1 revision round",
    ],
  },
  {
    id: "starter",
    name: "Starter",
    price: "$499",
    periodLabel: "One-time project",
    desc: "One page, coded to be found — not just to exist.",
    includes: "Everything in Foundation, plus:",
    features: [
      "Custom design",
      "Full SEO + schema markup",
      "OG image for social sharing",
      "AI search optimization — show up in ChatGPT & AI answers",
      "2 revision rounds",
    ],
  },
  {
    id: "launch",
    name: "Launch",
    price: "$999",
    periodLabel: "One-time project",
    desc: "A full site coded to rank, convert, and grow with your business.",
    includes: "Everything in Starter, plus:",
    features: [
      "Up to 5 pages",
      "AI engine optimization — get found by ChatGPT, Gemini & Perplexity",
      "Google Business Profile setup & optimization",
      "Google Analytics",
      "3 revision rounds",
    ],
  },
  {
    id: "partnership",
    name: "Partnership",
    price: "$1,499",
    periodLabel: "Ongoing partnership",
    desc: "A founder, engineer, and strategist — your dedicated digital team. Month to month, no contracts. We keep our roster small to keep the work high-quality.",
    includes: "Full custom build, plus ongoing:",
    features: [
      "Ongoing SEO + GEO/AEO",
      "Google Ads management",
      "Social media management",
      "Website maintenance & updates",
      "Custom AI tools, software & automations",
      "Monthly performance reports + strategy calls",
      "Priority same-day support",
      "Unlimited revisions",
    ],
    recommended: true,
  },
];

const addonGroups = [
  {
    label: "Branding",
    items: [
      { id: "logo", name: "Logo & Brand Identity", price: "$299" },
      { id: "print", name: "Print Design (Cards, Flyers)", price: "$199" },
    ],
  },
  {
    label: "Marketing",
    items: [
      { id: "google-ads", name: "Google Ads Setup + First Month", price: "$499" },
      { id: "gbp", name: "Google Business Profile Setup & Optimization", price: "$199" },
      { id: "social-media", name: "Social Media Setup & Branding", price: "$299" },
    ],
  },
  {
    label: "AI",
    items: [
      { id: "ai-chatbot", name: "AI Chatbot (Website)", price: "$499 one-time" },
      { id: "ai-receptionist", name: "AI Receptionist (Phone)", price: "$499 setup", price2: "$149/mo" },
    ],
  },
];

const allAddons = addonGroups.flatMap((g) => g.items);

export default function PackagesPage() {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const navigate = useNavigate();

  function toggleAddon(id: string) {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  }

  function handleNext() {
    if (selectedTier === "partnership") {
      navigate("/#contact");
      return;
    }
    const params = new URLSearchParams();
    if (selectedTier) params.set("package", selectedTier);
    if (selectedAddons.length) params.set("addons", selectedAddons.join(","));
    navigate(`/start?${params.toString()}`);
  }

  const hasSelection = selectedTier !== null || selectedAddons.length > 0;

  return (
    <>
      <SEO
        title="Packages — TheKhan"
        description="Custom websites, software, AI systems, and marketing packages from TheKhan. A founder, engineer, and strategist — choose your starting point."
        canonical="https://thekhan.io/packages"
        noindex
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white pb-28 relative overflow-hidden">
        <BackgroundPaths />

        {/* Nav */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/[0.06] relative">
          <div className="max-w-7xl mx-auto px-6 py-4 h-20 sm:h-18 flex items-center justify-center relative">
            <Link to="/" className="absolute left-6 flex items-center gap-2 text-sm text-[#a3a3a3] hover:text-white transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to home</span>
            </Link>
            <Link to="/">
              <Logo variant="white" size="sm" type="full" />
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-20 pb-8 px-6 text-center">
          <ScrollReveal direction="up">
            <h1 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
              Here's How We Work Together
            </h1>
            <p className="text-[#a3a3a3] text-lg md:text-xl max-w-xl mx-auto font-[family-name:var(--font-manrope)]">
              Start where it makes sense. Add what you need.
            </p>
          </ScrollReveal>
        </section>

        {/* Tier Grid */}
        <section className="px-6 pb-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {tiers.map((tier, i) => {
              const isSelected = selectedTier === tier.id;
              return (
                <ScrollReveal key={tier.id} direction="up" delay={i * 0.08}>
                  <div
                    className="relative h-full cursor-pointer"
                    onClick={() => setSelectedTier(isSelected ? null : tier.id)}
                  >
                    {/* Gradient border for recommended OR selected */}
                    {(tier.recommended || isSelected) && (
                      <motion.div
                        className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#2563eb] via-[#06b6d4] to-[#2563eb] z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isSelected ? 1 : 0.5 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <SpotlightGlow tilt className={`h-full ${tier.recommended || isSelected ? "relative z-10" : ""}`}>
                      <div className="p-7 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-3">
                            {tier.recommended && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white">
                                Full Service
                              </span>
                            )}
                          </div>
                          {/* Selection indicator */}
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${isSelected ? "border-[#06b6d4] bg-[#06b6d4]" : "border-white/20"}`}>
                            {isSelected && <IconCheck className="w-3 h-3 text-white" />}
                          </div>
                        </div>
                        <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-wide mb-1">
                          {tier.name}
                        </h3>
                        <p className="text-[10px] uppercase tracking-widest text-[#a3a3a3] font-medium mb-1">{tier.periodLabel}</p>
                        <div className="flex items-baseline gap-1 mb-3">
                          {tier.id === "partnership" && <span className="text-sm text-[#a3a3a3] mr-0.5">From</span>}
                          <span className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                            {tier.price}
                          </span>
                          {tier.id === "partnership" && <span className="text-sm text-[#a3a3a3]">/mo</span>}
                        </div>
                        <p className="text-[#a3a3a3] text-sm mb-6 font-[family-name:var(--font-manrope)]">
                          {tier.desc}
                        </p>
                        {tier.includes && (
                          <p className="text-xs text-[#06b6d4] font-medium uppercase tracking-wide mb-3">
                            {tier.includes}
                          </p>
                        )}
                        <ul className="space-y-3 flex-1">
                          {tier.features.map((f) => (
                            <li key={f} className="flex items-start gap-2.5 text-sm text-[#d4d4d4]">
                              <IconCheck className="w-4 h-4 text-[#06b6d4] mt-0.5 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SpotlightGlow>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
          <p className="text-center text-[#a3a3a3] text-sm mt-6 font-[family-name:var(--font-manrope)]">
            Additional revision rounds: $75–100 each
          </p>
        </section>

        {/* Social proof */}
        <section className="px-6 pb-12 text-center">
          <ScrollReveal direction="up">
            <p className="text-[#a3a3a3] text-sm font-[family-name:var(--font-manrope)] italic">
              Real code. Real team. No templates. Code will always outperform a template site.
            </p>
          </ScrollReveal>
        </section>

        {/* Not sure CTA */}
        <section className="px-6 pb-20 text-center">
          <ScrollReveal direction="up">
            <div className="max-w-md mx-auto py-8 px-6 rounded-2xl border border-white/[0.06] bg-[#111111]">
              <h3 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-2">Not sure where to start?</h3>
              <p className="text-[#a3a3a3] text-sm mb-5 font-[family-name:var(--font-manrope)]">
                Book a quick call and we'll figure out the right starting point together.
              </p>
              <Link to="/#contact">
                <MovingBorderButton
                  as="div"
                  borderRadius="9999px"
                  className="px-8 py-3 text-sm font-semibold tracking-wide inline-flex"
                >
                  Book a Call
                </MovingBorderButton>
              </Link>
            </div>
          </ScrollReveal>
        </section>

        {/* Add-ons */}
        <section className="px-6 pb-24 max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-center mb-3">
              Add-Ons
            </h2>
            <p className="text-[#a3a3a3] text-center mb-10 font-[family-name:var(--font-manrope)]">
              Stack on any package.
            </p>
          </ScrollReveal>
          <div className="space-y-8">
            {addonGroups.map((group, gi) => (
              <div key={group.label}>
                <p className="text-xs text-[#a3a3a3] uppercase tracking-widest font-medium mb-3 text-center">{group.label}</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {group.items.map((a, i) => {
                    const isSelected = selectedAddons.includes(a.id);
                    return (
                      <ScrollReveal key={a.id} direction="up" delay={(gi * 3 + i) * 0.06}>
                        <div
                          className="relative cursor-pointer"
                          onClick={() => toggleAddon(a.id)}
                        >
                          {isSelected && (
                            <motion.div
                              className="absolute -inset-[2px] rounded-2xl bg-gradient-to-br from-[#2563eb] to-[#06b6d4] z-0"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                          <SpotlightGlow className={`w-full sm:w-[300px] ${isSelected ? "relative z-10" : ""}`}>
                            <div className="px-6 py-5 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border-2 transition-all duration-300 ${isSelected ? "border-[#06b6d4] bg-[#06b6d4]" : "border-white/20"}`}>
                                  {isSelected && <IconCheck className="w-3 h-3 text-white" />}
                                </div>
                                <span className="text-sm font-medium">{a.name}</span>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-sm font-semibold text-[#06b6d4] whitespace-nowrap">{a.price}</span>
                                {"price2" in a && (a as typeof a & { price2?: string }).price2 && (
                                  <div className="text-xs text-[#a3a3a3] mt-0.5">+ {(a as typeof a & { price2: string }).price2}</div>
                                )}
                              </div>
                            </div>
                          </SpotlightGlow>
                        </div>
                      </ScrollReveal>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Systems */}
        <section className="px-6 pb-24 max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <SpotlightGlow className="w-full">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    <p className="text-xs text-[#06b6d4] uppercase tracking-widest font-medium mb-3">Custom Build</p>
                    <h3 className="font-[family-name:var(--font-heading)] text-xl md:text-2xl font-bold mb-3">
                      Custom Software & Business Systems
                    </h3>
                    <p className="text-[#a3a3a3] text-sm leading-relaxed mb-5 font-[family-name:var(--font-manrope)]">
                      Web apps, CRM dashboards, internal tools, and automations — coded by our engineer around how your business actually works. Custom software will always outperform off-the-shelf tools you'll outgrow.
                    </p>
                    <ul className="space-y-2.5">
                      {[
                        "Custom-built to your workflow",
                        "Connects your existing tools & platforms",
                        "Real-time reporting & lead tracking",
                        "Team access & role permissions",
                      ].map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-sm text-[#d4d4d4]">
                          <IconCheck className="w-4 h-4 text-[#06b6d4] flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:text-right flex flex-col items-start md:items-end gap-3 md:pt-8">
                    <div>
                      <span className="text-sm text-[#a3a3a3]">Starting at</span>
                      <div className="text-3xl font-bold bg-gradient-to-r from-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
                        $5,000
                      </div>
                      <span className="text-xs text-[#a3a3a3]">Scoped to your needs</span>
                    </div>
                    <Link to="/#contact">
                      <MovingBorderButton
                        as="div"
                        borderRadius="9999px"
                        className="px-6 py-2.5 text-sm font-semibold tracking-wide"
                      >
                        Let's Talk
                      </MovingBorderButton>
                    </Link>
                  </div>
                </div>
              </div>
            </SpotlightGlow>
          </ScrollReveal>
        </section>

        {/* FAQ */}
        <section className="px-6 pb-24 max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl font-bold text-center mb-10">
              Common Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-6">
            {[
              { q: "What happens after I submit?", a: "We'll review your answers and get back to you within 24 hours with thoughts and next steps." },
              { q: "Can I upgrade later?", a: "Absolutely. Many clients start with a website or software build and move into a full Partnership as they grow. Your initial investment carries over." },
              { q: "What's not included?", a: "Ad spend (Google Ads budget), stock photo licensing, and third-party software subscriptions are billed separately. We'll flag any additional costs before they happen." },
              { q: "Do you offer payment plans?", a: "For Launch and above, I take payment in a 50/50 split — half upfront, half on delivery." },
            ].map((faq, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.06}>
                <div className="py-5 px-6 rounded-2xl border border-white/[0.06] bg-[#111111]">
                  <h4 className="font-semibold text-white mb-2">{faq.q}</h4>
                  <p className="text-sm text-[#a3a3a3] leading-relaxed font-[family-name:var(--font-manrope)]">{faq.a}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-6 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Contact</h4>
                <div className="space-y-2 text-[#d4d4d4] text-sm leading-relaxed">
                  <p>655 Deerfield Rd</p>
                  <p>Suite 100, Unit 404</p>
                  <p>Deerfield, IL 60015</p>
                  <div className="border-t border-white/[0.06] my-4" />
                  <p><a href="mailto:omair@thekhan.io" className="hover:text-white transition-colors">Omair@TheKhan.io</a></p>
                  <p><a href="tel:8472208550" className="hover:text-white transition-colors">(847) 220-8550</a></p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <h4 className="text-sm font-medium text-[#a3a3a3] uppercase tracking-widest mb-5">Follow Us</h4>
                <div className="flex gap-3">
                  {[
                    { href: "https://www.linkedin.com/company/thekhanio", icon: IconBrandLinkedin },
                    { href: "https://www.facebook.com/profile.php?id=61584909881446", icon: IconBrandFacebook },
                    { href: "https://www.instagram.com/thekhanio", icon: IconBrandInstagram },
                  ].map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#a3a3a3] hover:text-white hover:border-[#2563eb]/50 hover:bg-[#2563eb]/10 hover:scale-125 hover:-translate-y-1.5 hover:shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all duration-300">
                      <s.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Logo variant="white" size="md" className="mb-4" />
                <p className="text-[#a3a3a3] text-sm leading-relaxed">
                  Build. Manage. Grow.<br />Your outsourced digital team.
                </p>
              </div>
            </div>
            <div className="pt-8 border-t border-white/[0.06] text-center">
              <p className="text-[#606060] text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Sticky bottom bar */}
      <AnimatePresence>
        {hasSelection && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.08]"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm">
                {selectedTier && (
                  <>
                    <span className="font-semibold text-white">
                      {tiers.find((t) => t.id === selectedTier)?.name}
                    </span>
                    <span className="text-[#06b6d4] font-bold">
                      {tiers.find((t) => t.id === selectedTier)?.price}
                    </span>
                  </>
                )}
                {selectedAddons.length > 0 && (
                  <span className="text-[#a3a3a3]">
                    {selectedTier ? "+ " : ""}{selectedAddons.length} add-on{selectedAddons.length > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {selectedTier === "partnership" ? (
                <Link to="/#contact">
                  <MovingBorderButton
                    as="div"
                    borderRadius="9999px"
                    className="px-8 py-3 text-sm font-semibold tracking-wide"
                  >
                    Let's Talk
                  </MovingBorderButton>
                </Link>
              ) : (
                <button onClick={handleNext}>
                  <MovingBorderButton
                    as="div"
                    borderRadius="9999px"
                    className="px-8 py-3 text-sm font-semibold tracking-wide flex items-center gap-2"
                  >
                    Next
                    <IconArrowRight className="w-4 h-4" />
                  </MovingBorderButton>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
