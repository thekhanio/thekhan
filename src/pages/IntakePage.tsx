import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconCode,
  IconChartLine,
  IconStack2,
  IconHelpCircle,
} from "@tabler/icons-react";

// ============================================================
// Pre-call intake — the form Omair sends after first contact.
// Gated like /start: pick what you're looking for first, then the
// form reveals questions tailored to that choice. Captures the
// FACTUAL half of discovery so the call is shorter + sharper —
// pain-dig + 90-day vision stay on the call. Stands alone (cold
// reach-outs may never have touched the site) → includes contact.
// ============================================================

const SERVICE_OPTIONS: Array<{ value: string; Icon: typeof IconCode; subtitle: string }> = [
  { value: "Websites", Icon: IconCode, subtitle: "Build, rebuild, or fix what you have." },
  { value: "Marketing", Icon: IconChartLine, subtitle: "Get found and bring in more business." },
  { value: "Both", Icon: IconStack2, subtitle: "Site plus everything that drives traffic to it." },
  { value: "Not sure", Icon: IconHelpCircle, subtitle: "Want to talk it through first." },
];

const GROWTH_OPTIONS = ["Organic (SEO)", "Paid ads", "Both", "Not sure"];
const SITE_STATUS = ["New build", "Rebuild mine", "Just needs fixes"];
const LEAD_SOURCES = [
  "Referrals",
  "Google search",
  "Google Maps",
  "Facebook / social",
  "Repeat customers",
  "Trucks / signs",
  "Other",
];
const ENOUGH = ["Enough for now", "Need more"];
const TIMELINE = ["ASAP", "Soon — next month or so", "Long game, no rush"];
const DECISION = ["Just me", "Me + a partner / spouse"];
const BUDGET_OPTIONS = [
  "Not sure yet",
  "Under $1,000/mo",
  "$1,000–$2,000/mo",
  "$2,000–$4,000/mo",
  "$4,000+/mo",
];

type FormData = {
  serviceWanted: string;
  fullName: string;
  contactEmail: string;
  contactPhone: string;
  businessName: string;
  currentWebsite: string;
  yearsServices: string;
  // Website / Both
  siteStatus: string;
  sitePlatform: string;
  siteGoal: string;
  // Marketing / Both
  growthType: string;
  leadSources: string[];
  volume: string;
  enough: string;
  priorMarketing: string;
  // Not sure
  mainThing: string;
  // Budget — only shown when ads / uncertainty are in play
  budget: string;
  // Common tail
  areas: string;
  timeline: string;
  decisionMaker: string;
  anythingElse: string;
  honey: string;
};

const REQUIRED: Array<keyof FormData> = [
  "serviceWanted",
  "fullName",
  "contactEmail",
  "contactPhone",
  "businessName",
];

const FIELD_DOM_ID: Partial<Record<keyof FormData, string>> = {
  serviceWanted: "intake-service",
  fullName: "intake-name",
  contactEmail: "intake-email",
  contactPhone: "intake-phone",
  businessName: "intake-business",
};

export default function IntakePage() {
  const reduce = useReducedMotion();

  const [data, setData] = useState<FormData>({
    serviceWanted: "",
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    businessName: "",
    currentWebsite: "",
    yearsServices: "",
    siteStatus: "",
    sitePlatform: "",
    siteGoal: "",
    growthType: "",
    leadSources: [],
    volume: "",
    enough: "",
    priorMarketing: "",
    mainThing: "",
    budget: "",
    areas: "",
    timeline: "",
    decisionMaker: "",
    anythingElse: "",
    honey: "",
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const clearErr = (k: string) => {
    if (errors.has(k)) {
      setErrors((prev) => {
        const next = new Set(prev);
        next.delete(k);
        return next;
      });
    }
  };

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setData((d) => ({ ...d, [k]: v }));
    clearErr(k as string);
  };

  const toggleLead = (v: string) => {
    setData((d) => ({
      ...d,
      leadSources: d.leadSources.includes(v)
        ? d.leadSources.filter((x) => x !== v)
        : [...d.leadSources, v],
    }));
  };

  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  const isWebsite = data.serviceWanted === "Websites" || data.serviceWanted === "Both";
  const isMarketing = data.serviceWanted === "Marketing" || data.serviceWanted === "Both";
  const isNotSure = data.serviceWanted === "Not sure";
  // Budget only matters where there's a variable to size (ad spend) or no plan yet.
  // Fixed-price work (website, organic-only) doesn't need it.
  const adsBudget = ["Paid ads", "Both", "Not sure"].includes(data.growthType);

  const validate = (): Array<keyof FormData> =>
    REQUIRED.filter((f) => (data[f] as string).trim() === "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.honey) return;

    const missing = validate();
    if (missing.length > 0) {
      setErrors(new Set(missing));
      setTimeout(() => {
        const el = document.getElementById(FIELD_DOM_ID[missing[0]] || "");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 60);
      return;
    }
    if (!turnstileToken) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://leads-api.thekhan.io/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: "thekhan",
          form_id: "thekhan-intake",
          source: "pre-call",
          "cf-turnstile-response": turnstileToken,
          name: data.fullName.trim(),
          email: data.contactEmail.trim(),
          phone: data.contactPhone.trim(),
          service: "Pre-call intake",
          message: data.anythingElse.trim() || "(no extra notes)",
          // custom fields → Project Details in the email
          business_name: data.businessName.trim() || "—",
          looking_for: data.serviceWanted || "—",
          current_website: data.currentWebsite.trim() || "—",
          years_and_services: data.yearsServices.trim() || "—",
          site_status: isWebsite ? data.siteStatus || "—" : "n/a",
          site_platform: isWebsite ? data.sitePlatform.trim() || "—" : "n/a",
          site_goal: isWebsite ? data.siteGoal.trim() || "—" : "n/a",
          how_they_want_to_grow: isMarketing ? data.growthType || "—" : "n/a",
          lead_sources: isMarketing ? data.leadSources.join(", ") || "—" : "n/a",
          weekly_volume: isMarketing ? data.volume.trim() || "—" : "n/a",
          enough_or_need_more: isMarketing ? data.enough || "—" : "n/a",
          prior_marketing: isMarketing ? data.priorMarketing.trim() || "—" : "n/a",
          main_thing: isNotSure ? data.mainThing.trim() || "—" : "n/a",
          monthly_budget: isNotSure || adsBudget ? data.budget || "—" : "n/a",
          service_areas: data.areas.trim() || "—",
          timeline: data.timeline || "—",
          decision_maker: data.decisionMaker || "—",
          anything_else: data.anythingElse.trim() || "—",
          website_url: data.honey, // honeypot
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const item = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } },
      };

  return (
    <>
      <SEO
        title="Before we talk — TheKhan"
        description="A few quick questions before our call. About four minutes — saves us ten on the call."
        canonical="https://thekhan.io/intake"
        noindex
      />

      <div className="relative min-h-screen bg-bg text-ink overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 gradient-drift opacity-70" />

        {/* Nav */}
        <nav className="relative z-10 sticky top-0 backdrop-blur-xl bg-bg/80 border-b border-line">
          <div className="max-w-3xl mx-auto px-6 py-4 h-18 flex items-center justify-center relative">
            <Link
              to="/"
              className="absolute left-6 flex items-center gap-2 text-sm text-ink-quiet hover:text-ink transition-colors"
            >
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/" aria-label="TheKhan home">
              <Logo variant="white" size="sm" type="full" />
            </Link>
          </div>
        </nav>

        <main className="relative z-10 px-6 pb-24">
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <SuccessState key="success" reduce={!!reduce} />
            ) : (
              <m.div
                key="form"
                initial={reduce ? false : { opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: -8, transition: { duration: 0.25 } }}
                className="max-w-2xl mx-auto pt-14 md:pt-20"
              >
                {/* Header */}
                <header className="text-center mb-10">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-light mb-5">
                    Before we talk
                  </p>
                  <h1 className="display-h1 text-4xl md:text-5xl lg:text-6xl text-ink tracking-[-0.005em] mb-5">
                    Tell me about your business.
                  </h1>
                  <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    A few quick questions before our call. About four minutes — and it saves us ten or
                    fifteen on the call. Skip anything you&apos;re not sure on.
                  </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot */}
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={data.honey}
                    onChange={(e) => set("honey", e.target.value)}
                    className="absolute left-[-9999px] w-px h-px opacity-0"
                  />

                  {/* Gate — what are you looking for? */}
                  <div className="ed-card-dark" id="intake-service">
                    <SelectLabel
                      text="What are you looking for?"
                      required
                      error={errors.has("serviceWanted")}
                    />
                    <div
                      role="radiogroup"
                      aria-label="What are you looking for?"
                      className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${
                        errors.has("serviceWanted")
                          ? "shadow-[0_0_0_1px_var(--accent-light)] rounded-sm p-1 -m-1"
                          : ""
                      }`}
                    >
                      {SERVICE_OPTIONS.map((opt) => (
                        <ServiceCard
                          key={opt.value}
                          option={opt}
                          selected={data.serviceWanted === opt.value}
                          onSelect={() => set("serviceWanted", opt.value)}
                          reduce={!!reduce}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Reveal the rest once they've chosen */}
                  <AnimatePresence initial={false}>
                    {data.serviceWanted && (
                      <m.div
                        key="body"
                        initial={reduce ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0 }}
                        transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="ed-card-dark space-y-8"
                      >
                        {/* Contact */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Field label="Your name" required htmlFor="intake-name" error={errors.has("fullName")}>
                            <input
                              id="intake-name"
                              type="text"
                              autoComplete="name"
                              value={data.fullName}
                              onChange={(e) => set("fullName", e.target.value)}
                              className={inputBase}
                              placeholder="First & last"
                            />
                          </Field>
                          <Field label="Email" required htmlFor="intake-email" error={errors.has("contactEmail")}>
                            <input
                              id="intake-email"
                              type="email"
                              autoComplete="email"
                              value={data.contactEmail}
                              onChange={(e) => set("contactEmail", e.target.value)}
                              className={inputBase}
                              placeholder="you@example.com"
                            />
                          </Field>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Field label="Phone" required htmlFor="intake-phone" error={errors.has("contactPhone")}>
                            <input
                              id="intake-phone"
                              type="tel"
                              autoComplete="tel"
                              value={data.contactPhone}
                              onChange={(e) => set("contactPhone", e.target.value)}
                              className={inputBase}
                              placeholder="(555) 123-4567"
                            />
                          </Field>
                          <Field
                            label="Business name"
                            required
                            htmlFor="intake-business"
                            error={errors.has("businessName")}
                          >
                            <input
                              id="intake-business"
                              type="text"
                              autoComplete="organization"
                              value={data.businessName}
                              onChange={(e) => set("businessName", e.target.value)}
                              className={inputBase}
                              placeholder="e.g. Smith & Sons Plumbing"
                            />
                          </Field>
                        </div>

                        {/* Current website — asked either way so Omair can look */}
                        <Field
                          label="Your current website"
                          optional
                          hint="if you have one — so I can take a look"
                          htmlFor="intake-current-site"
                        >
                          <input
                            id="intake-current-site"
                            type="text"
                            inputMode="url"
                            value={data.currentWebsite}
                            onChange={(e) => set("currentWebsite", e.target.value)}
                            className={inputBase}
                            placeholder="e.g. smithplumbing.com"
                          />
                        </Field>

                        {/* Years + services */}
                        <Field
                          label="How long have you been in business — and what do you do?"
                          htmlFor="intake-years"
                        >
                          <input
                            id="intake-years"
                            type="text"
                            value={data.yearsServices}
                            onChange={(e) => set("yearsServices", e.target.value)}
                            className={inputBase}
                            placeholder="e.g. 8 years — residential roofing & gutters"
                          />
                        </Field>

                        {/* ---- Website branch ---- */}
                        {isWebsite && (
                          <div className="space-y-8 border-t border-line pt-8">
                            <div>
                              <SelectLabel text="Do you have a site now?" />
                              <ChipRow
                                options={SITE_STATUS}
                                value={data.siteStatus}
                                onSelect={(v) => set("siteStatus", v)}
                                reduce={!!reduce}
                              />
                            </div>

                            <Field
                              label="What's your current site built on?"
                              optional
                              hint="GoDaddy, Wix, Squarespace, WordPress — or not sure"
                              htmlFor="intake-platform"
                            >
                              <input
                                id="intake-platform"
                                type="text"
                                value={data.sitePlatform}
                                onChange={(e) => set("sitePlatform", e.target.value)}
                                className={inputBase}
                                placeholder="e.g. Wix"
                              />
                            </Field>

                            <Field
                              label="What do you want the site to do better?"
                              optional
                              htmlFor="intake-site-goal"
                            >
                              <textarea
                                id="intake-site-goal"
                                rows={2}
                                value={data.siteGoal}
                                onChange={(e) => set("siteGoal", e.target.value)}
                                className={`${inputBase} resize-none min-h-[80px]`}
                                placeholder="e.g. Look more legit, load faster, actually show up on Google."
                              />
                            </Field>
                          </div>
                        )}

                        {/* ---- Marketing branch ---- */}
                        {isMarketing && (
                          <div className="space-y-8 border-t border-line pt-8">
                            <div>
                              <SelectLabel text="How do you want to grow?" />
                              <ChipRow
                                options={GROWTH_OPTIONS}
                                value={data.growthType}
                                onSelect={(v) => set("growthType", v)}
                                reduce={!!reduce}
                              />
                            </div>

                            {adsBudget && (
                              <BudgetBlock
                                value={data.budget}
                                onSelect={(v) => set("budget", v)}
                                reduce={!!reduce}
                              />
                            )}

                            <div>
                              <SelectLabel
                                text="Where do most of your jobs come from now?"
                                hint="pick all that apply"
                              />
                              <ChipGrid
                                options={LEAD_SOURCES}
                                selected={data.leadSources}
                                onToggle={toggleLead}
                                reduce={!!reduce}
                              />
                            </div>

                            <div className="space-y-3">
                              <Field label="Roughly how many calls or jobs a week?" htmlFor="intake-volume">
                                <input
                                  id="intake-volume"
                                  type="text"
                                  value={data.volume}
                                  onChange={(e) => set("volume", e.target.value)}
                                  className={inputBase}
                                  placeholder="e.g. 5–8 a week"
                                />
                              </Field>
                              <ChipRow
                                options={ENOUGH}
                                value={data.enough}
                                onSelect={(v) => set("enough", v)}
                                reduce={!!reduce}
                              />
                            </div>

                            <Field
                              label="Ever run marketing before? If so, what?"
                              optional
                              htmlFor="intake-prior"
                            >
                              <textarea
                                id="intake-prior"
                                rows={2}
                                value={data.priorMarketing}
                                onChange={(e) => set("priorMarketing", e.target.value)}
                                className={`${inputBase} resize-none min-h-[80px]`}
                                placeholder="e.g. Ran Google LSA for a bit, tried an agency once."
                              />
                            </Field>
                          </div>
                        )}

                        {/* ---- Not sure branch ---- */}
                        {isNotSure && (
                          <div className="space-y-8 border-t border-line pt-8">
                            <Field
                              label="What's the main thing you're trying to fix or grow?"
                              htmlFor="intake-main-thing"
                            >
                              <textarea
                                id="intake-main-thing"
                                rows={2}
                                value={data.mainThing}
                                onChange={(e) => set("mainThing", e.target.value)}
                                className={`${inputBase} resize-none min-h-[80px]`}
                                placeholder="e.g. Phone's gone quiet — not sure if it's the site, Google, or what."
                              />
                            </Field>
                            <BudgetBlock
                              value={data.budget}
                              onSelect={(v) => set("budget", v)}
                              reduce={!!reduce}
                            />
                          </div>
                        )}

                        {/* ---- Common tail ---- */}
                        <div className="space-y-8 border-t border-line pt-8">
                          <Field
                            label="Areas you serve — and any you want to grow into"
                            htmlFor="intake-areas"
                          >
                            <textarea
                              id="intake-areas"
                              rows={2}
                              value={data.areas}
                              onChange={(e) => set("areas", e.target.value)}
                              className={`${inputBase} resize-none min-h-[80px]`}
                              placeholder="e.g. Deerfield, Northbrook, Glenview now — want more in Highland Park"
                            />
                          </Field>

                          <div>
                            <SelectLabel text="When are you hoping to get going?" />
                            <ChipRow
                              options={TIMELINE}
                              value={data.timeline}
                              onSelect={(v) => set("timeline", v)}
                              reduce={!!reduce}
                            />
                          </div>

                          <div>
                            <SelectLabel text="Who's calling the shots?" />
                            <ChipRow
                              options={DECISION}
                              value={data.decisionMaker}
                              onSelect={(v) => set("decisionMaker", v)}
                              reduce={!!reduce}
                            />
                          </div>

                          <Field
                            label="Anything else I should know before we talk?"
                            optional
                            htmlFor="intake-else"
                          >
                            <textarea
                              id="intake-else"
                              rows={2}
                              value={data.anythingElse}
                              onChange={(e) => set("anythingElse", e.target.value)}
                              className={`${inputBase} resize-none min-h-[80px]`}
                              placeholder="Anything that'll save us time."
                            />
                          </Field>
                        </div>

                        {/* Turnstile */}
                        <TurnstileWidget onToken={handleToken} onExpire={handleExpire} />

                        {/* Error fallback */}
                        <AnimatePresence>
                          {status === "error" && (
                            <m.div
                              initial={reduce ? false : { opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border border-accent-light/40 bg-accent-soft px-4 py-3 text-sm text-ink"
                            >
                              Couldn&apos;t send. Text me instead —{" "}
                              <a href="sms:+18472208550" className="text-accent-light underline underline-offset-2">
                                (847) 220-8550
                              </a>
                              .
                            </m.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <m.button
                          type="submit"
                          disabled={status === "submitting" || !turnstileToken}
                          whileHover={reduce ? undefined : { y: -1 }}
                          whileTap={reduce ? undefined : { scale: 0.985 }}
                          transition={{ duration: 0.15 }}
                          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer group"
                        >
                          {status === "submitting" ? (
                            <span>Sending…</span>
                          ) : (
                            <span className="inline-flex items-center gap-2">
                              Send it over
                              <IconArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                            </span>
                          )}
                        </m.button>
                      </m.div>
                    )}
                  </AnimatePresence>
                </form>
              </m.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-line">
          <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-center gap-3">
            <img src="/favicon-dark.svg" alt="" width={20} height={20} className="opacity-60" />
            <p className="text-xs text-ink-quiet">&copy; {new Date().getFullYear()} TheKhan</p>
          </div>
        </footer>
      </div>
    </>
  );
}

// ============================================================
// Primitives
// ============================================================

const inputBase =
  "w-full px-4 py-3.5 bg-bg-quiet border border-line text-ink placeholder:text-ink-faint " +
  "focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light/30 " +
  "transition-colors duration-200";

function Field({
  label,
  optional,
  required,
  htmlFor,
  hint,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  required?: boolean;
  htmlFor: string;
  hint?: string;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-ink-muted mb-2">
        {label}
        {required && <span className="text-accent-light ml-0.5">*</span>}
        {optional && <span className="text-ink-quiet text-xs font-normal ml-1.5">(optional)</span>}
        {hint && <span className="text-ink-quiet text-xs font-normal ml-1.5">({hint})</span>}
      </label>
      <div className={error ? "ring-1 ring-accent-light/60" : ""}>{children}</div>
      {error && <p className="mt-1.5 text-xs text-accent-light">Need this one.</p>}
    </div>
  );
}

function SelectLabel({
  text,
  required,
  hint,
  error,
}: {
  text: string;
  required?: boolean;
  hint?: string;
  error?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between mb-3">
      <span className="block text-sm text-ink-muted">
        {text}
        {required && <span className="text-accent-light ml-0.5">*</span>}
        {hint && <span className="text-ink-quiet text-xs font-normal ml-1.5">({hint})</span>}
      </span>
      {error && <span className="text-xs text-accent-light">Pick one to keep going</span>}
    </div>
  );
}

function ChipGrid({
  options,
  selected,
  onToggle,
  reduce,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  reduce: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = selected.includes(opt);
        return (
          <m.button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`px-4 py-2.5 text-sm border transition-colors duration-200 cursor-pointer select-none inline-flex items-center gap-1.5 ${
              on
                ? "border-accent-light bg-accent-soft text-ink"
                : "border-line bg-bg-quiet text-ink-muted hover:border-accent-line hover:text-ink"
            }`}
          >
            {on && <IconCheck className="w-3.5 h-3.5 text-accent-light shrink-0" stroke={2.2} />}
            {opt}
          </m.button>
        );
      })}
    </div>
  );
}

function ChipRow({
  options,
  value,
  onSelect,
  reduce,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
  reduce: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const on = value === opt;
        return (
          <m.button
            key={opt}
            type="button"
            onClick={() => onSelect(opt)}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`px-4 py-2.5 text-sm border transition-colors duration-200 cursor-pointer select-none ${
              on
                ? "border-accent-light bg-accent-soft text-ink"
                : "border-line bg-bg-quiet text-ink-muted hover:border-accent-line hover:text-ink"
            }`}
          >
            {opt}
          </m.button>
        );
      })}
    </div>
  );
}

function BudgetBlock({
  value,
  onSelect,
  reduce,
}: {
  value: string;
  onSelect: (v: string) => void;
  reduce: boolean;
}) {
  return (
    <div>
      <span className="block text-sm text-ink-muted mb-1">
        Roughly what&apos;s your monthly budget for this?
      </span>
      <p className="text-xs text-ink-quiet mb-3">
        Give me a ballpark and I can put together a clear plan for you.
      </p>
      <ChipRow options={BUDGET_OPTIONS} value={value} onSelect={onSelect} reduce={reduce} />
    </div>
  );
}

function ServiceCard({
  option,
  selected,
  onSelect,
  reduce,
}: {
  option: (typeof SERVICE_OPTIONS)[number];
  selected: boolean;
  onSelect: () => void;
  reduce: boolean;
}) {
  const { value, subtitle, Icon } = option;
  const id = `service-${value.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <m.label
      htmlFor={id}
      whileHover={reduce ? undefined : { y: -2 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18 }}
      className={`relative cursor-pointer block p-4 sm:p-5 border transition-colors duration-200 select-none ${
        selected ? "border-accent-light bg-accent-soft" : "border-line bg-bg-quiet hover:border-accent-line"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="service_wanted"
        value={value}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <div className="flex items-start gap-3">
        <Icon
          className={`w-5 h-5 mt-0.5 shrink-0 transition-colors duration-200 ${
            selected ? "text-accent-light" : "text-ink-muted"
          }`}
          stroke={1.6}
        />
        <div>
          <p className="font-medium text-base text-ink leading-tight">{value}</p>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-snug">{subtitle}</p>
        </div>
      </div>
      {selected && (
        <m.span
          layoutId="intakeServiceRing"
          aria-hidden
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none absolute inset-0 border border-accent-light"
        />
      )}
    </m.label>
  );
}

function SuccessState({ reduce }: { reduce: boolean }) {
  return (
    <m.div
      key="success-state"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-xl mx-auto pt-24 md:pt-32 text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-8 rounded-full border border-accent-light/40 bg-accent-soft">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-8 h-8 text-accent-light">
          <m.path
            d="M5 12.5l4.2 4.2L19 7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 0.34, ease: "easeOut", delay: 0.08 }}
          />
        </svg>
      </div>
      <h2 className="display-h1 text-4xl md:text-5xl text-ink mb-4">Got it.</h2>
      <p className="text-ink-muted text-base md:text-lg">
        I&apos;ll look all this over before we talk. Talk soon.
      </p>
    </m.div>
  );
}
