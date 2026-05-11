import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCode,
  IconChartLine,
  IconStack2,
  IconHelpCircle,
} from "@tabler/icons-react";

type ServiceType = "Websites" | "Marketing" | "Both" | "Not sure";

const SERVICE_OPTIONS: Array<{
  value: ServiceType;
  Icon: typeof IconCode;
  subtitle: string;
}> = [
  { value: "Websites", Icon: IconCode, subtitle: "Build, rebuild, or fix what you have." },
  { value: "Marketing", Icon: IconChartLine, subtitle: "Get found and bring in more business." },
  { value: "Both", Icon: IconStack2, subtitle: "Site plus everything that drives traffic to it." },
  { value: "Not sure", Icon: IconHelpCircle, subtitle: "Want to talk it through first." },
];

const ACCESS_KEY = "27068209-3ff0-4c82-a1ed-e67558c5ffa4";

export default function IntakePage() {
  const reduce = useReducedMotion();
  const radioGroupRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState({
    businessName: "",
    businessType: "",
    website: "",
    serviceType: "" as ServiceType | "",
    biggestIssue: "",
    priorAgencies: "",
    anythingElse: "",
    honey: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error" | "missing"
  >("idle");

  const set = <K extends keyof typeof data>(k: K, v: (typeof data)[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (data.honey) return;

    if (!data.serviceType) {
      setStatus("missing");
      radioGroupRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          from_name: "TheKhan Intake",
          subject: `New intake — ${data.businessName.trim() || "unnamed"}`,
          business_name: data.businessName.trim() || "—",
          business_type: data.businessType.trim() || "—",
          website: data.website.trim() || "—",
          looking_for: data.serviceType,
          biggest_issue: data.biggestIssue.trim() || "—",
          prior_agencies: data.priorAgencies.trim() || "—",
          anything_else: data.anythingElse.trim() || "—",
          source: "intake-form",
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  // Motion variants — disabled cleanly when reduce-motion is on.
  const container = reduce
    ? undefined
    : {
        hidden: {},
        show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
      };
  const item = reduce
    ? undefined
    : {
        hidden: { opacity: 0, y: 8 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const },
        },
      };

  const inputBase =
    "w-full px-4 py-3.5 bg-bg-quiet border border-line text-ink placeholder:text-ink-faint " +
    "focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light/30 " +
    "transition-colors duration-200";

  return (
    <>
      <SEO
        title="Intake — TheKhan"
        description="Quick form before we talk. Sixty seconds. Optional except for one question."
        canonical="https://thekhan.io/intake"
        noindex
      />

      <div className="relative min-h-screen bg-bg text-ink overflow-hidden">
        {/* Subtle drifting backdrop — already prefers-reduced-motion friendly via CSS */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 gradient-drift opacity-70"
        />

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
                <m.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-10"
                >
                  {/* Header */}
                  <m.header variants={item} className="text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-light mb-5">
                      Intake
                    </p>
                    <h1 className="display-h1 text-4xl md:text-5xl lg:text-6xl text-ink tracking-[-0.005em] mb-5">
                      Quick before we talk.
                    </h1>
                    <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-md mx-auto">
                      Sixty seconds. Saves us both the basics.
                    </p>
                  </m.header>

                  <form
                    onSubmit={handleSubmit}
                    className="ed-card-dark space-y-8"
                    noValidate
                  >
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

                    {/* Row: business name + business type */}
                    <m.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="Business name"
                        optional
                        htmlFor="intake-business"
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
                      <Field
                        label="What kind of business?"
                        optional
                        htmlFor="intake-type"
                      >
                        <input
                          id="intake-type"
                          type="text"
                          value={data.businessType}
                          onChange={(e) => set("businessType", e.target.value)}
                          className={inputBase}
                          placeholder="e.g. roofing, café, law firm"
                        />
                      </Field>
                    </m.div>

                    {/* Website */}
                    <m.div variants={item}>
                      <Field
                        label="Website"
                        optional
                        htmlFor="intake-website"
                        hint="If you have one"
                      >
                        <input
                          id="intake-website"
                          type="url"
                          inputMode="url"
                          autoComplete="url"
                          value={data.website}
                          onChange={(e) => set("website", e.target.value)}
                          className={inputBase}
                          placeholder="e.g. smithplumbing.com"
                        />
                      </Field>
                    </m.div>

                    {/* Radio cards — required */}
                    <m.div variants={item} ref={radioGroupRef} className="scroll-mt-24">
                      <div className="flex items-baseline justify-between mb-3">
                        <label
                          id="intake-service-label"
                          className="block text-sm text-ink-muted"
                        >
                          What are you looking for?{" "}
                          <span className="text-accent-light ml-0.5">*</span>
                        </label>
                        <AnimatePresence>
                          {status === "missing" && (
                            <m.span
                              initial={reduce ? false : { opacity: 0, x: 4 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="text-xs text-accent-light"
                            >
                              Pick one to keep going
                            </m.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <div
                        role="radiogroup"
                        aria-labelledby="intake-service-label"
                        aria-required="true"
                        className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-shadow duration-300 ${
                          status === "missing"
                            ? "shadow-[0_0_0_1px_var(--accent-light)] rounded-sm p-1 -m-1"
                            : ""
                        }`}
                      >
                        {SERVICE_OPTIONS.map((opt) => (
                          <ServiceCard
                            key={opt.value}
                            option={opt}
                            selected={data.serviceType === opt.value}
                            onSelect={() => {
                              set("serviceType", opt.value);
                              if (status === "missing") setStatus("idle");
                            }}
                            reduce={!!reduce}
                          />
                        ))}
                      </div>
                    </m.div>

                    {/* Biggest issue */}
                    <m.div variants={item}>
                      <Field
                        label="Biggest issue you're trying to solve"
                        optional
                        htmlFor="intake-issue"
                      >
                        <textarea
                          id="intake-issue"
                          rows={3}
                          value={data.biggestIssue}
                          onChange={(e) => set("biggestIssue", e.target.value)}
                          className={`${inputBase} resize-none min-h-[96px]`}
                          placeholder="The thing that made you reach out."
                        />
                      </Field>
                    </m.div>

                    {/* Prior agencies */}
                    <m.div variants={item}>
                      <Field
                        label="Worked with a marketing company before?"
                        optional
                        htmlFor="intake-prior"
                      >
                        <textarea
                          id="intake-prior"
                          rows={2}
                          value={data.priorAgencies}
                          onChange={(e) => set("priorAgencies", e.target.value)}
                          className={`${inputBase} resize-none min-h-[80px]`}
                          placeholder="Who, and how it went."
                        />
                      </Field>
                    </m.div>

                    {/* Anything else */}
                    <m.div variants={item}>
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
                    </m.div>

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
                          <a
                            href="sms:+18472208550"
                            className="text-accent-light underline underline-offset-2"
                          >
                            (847) 220-8550
                          </a>
                          .
                        </m.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <m.div variants={item} className="pt-2">
                      <m.button
                        type="submit"
                        disabled={status === "submitting"}
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
                  </form>
                </m.div>
              </m.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="relative z-10 border-t border-line">
          <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-center gap-3">
            <img
              src="/favicon-dark.svg"
              alt=""
              width={20}
              height={20}
              className="opacity-60"
            />
            <p className="text-xs text-ink-quiet">
              &copy; {new Date().getFullYear()} TheKhan
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

function Field({
  label,
  optional,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  optional?: boolean;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-ink-muted mb-2">
        {label}
        {optional && (
          <span className="text-ink-quiet text-xs font-normal ml-1.5">
            {hint ? `(${hint})` : "(optional)"}
          </span>
        )}
      </label>
      {children}
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
        selected
          ? "border-accent-light bg-accent-soft"
          : "border-line bg-bg-quiet hover:border-accent-line"
      }`}
    >
      <input
        id={id}
        type="radio"
        name="service_type"
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
          <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-snug">
            {subtitle}
          </p>
        </div>
      </div>
      {selected && (
        <m.span
          layoutId="serviceSelectedRing"
          aria-hidden
          transition={
            reduce
              ? { duration: 0 }
              : { type: "spring", stiffness: 380, damping: 32 }
          }
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="w-8 h-8 text-accent-light"
        >
          <m.path
            d="M5 12.5l4.2 4.2L19 7"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.34, ease: "easeOut", delay: 0.08 }
            }
          />
        </svg>
      </div>
      <h2 className="display-h1 text-4xl md:text-5xl text-ink mb-4">
        We&apos;re set.
      </h2>
      <p className="text-ink-muted text-base md:text-lg">
        Talk soon.
      </p>
    </m.div>
  );
}
