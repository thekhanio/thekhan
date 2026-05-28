import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { m, AnimatePresence, useReducedMotion } from "framer-motion";
import { SEO } from "@/components/SEO";
import { Logo } from "@/components/Logo";
import { TurnstileWidget } from "@/components/TurnstileWidget";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronDown,
  IconCheck,
  IconCircleDashed,
  IconCircleDot,
  IconCode,
  IconChartLine,
  IconStack2,
} from "@tabler/icons-react";

// ============================================================
// Types + constants
// ============================================================

type Scope = "Websites" | "Marketing" | "Both" | "";

type DayHours = { open: string; close: string; closed: boolean };

type LoginStatus = "yes" | "no" | "unsure" | "";

type FormState = {
  scope: Scope;

  // Section 1 — Common
  legalName: string;
  dba: string;
  address: string;
  phone: string;
  email: string;
  hours: Record<DayKey, DayHours>;
  services: string;
  serviceArea: string;
  yearsInBusiness: string;
  entityType: string;
  licenseInsurance: string;
  decisionMaker: string;
  communicationPref: string;
  urgent: string;

  // Section 2 — Website
  brandColorsFonts: string;
  clientList: string;
  testimonials: string;
  domainRegistrar: string;
  emailHost: string;
  sitesYouLike: string;
  voiceTone: string;
  copySource: string;
  extraPages: string;
  contactFormDestination: string;
  existingLinks: string;

  // Section 3 — Marketing
  gbpStatus: string;
  existingTracking: string;
  customerProfile: string;
  competitors: string;
  goal: string;
  photosPlan: string;
  crm: string;
  existingAds: string;
  reviewPlatforms: string;

  // Section 4 — Logins inventory
  logins: Record<string, LoginStatus>;

  // Completion flags
  done: { common: boolean; website: boolean; marketing: boolean; logins: boolean };

  honey: string;
};

type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

const DAYS: { key: DayKey; label: string }[] = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

const emptyHours = (): Record<DayKey, DayHours> => ({
  mon: { open: "08:00", close: "17:00", closed: false },
  tue: { open: "08:00", close: "17:00", closed: false },
  wed: { open: "08:00", close: "17:00", closed: false },
  thu: { open: "08:00", close: "17:00", closed: false },
  fri: { open: "08:00", close: "17:00", closed: false },
  sat: { open: "", close: "", closed: true },
  sun: { open: "", close: "", closed: true },
});

const SCOPE_OPTIONS: Array<{ value: Exclude<Scope, "">; Icon: typeof IconCode; subtitle: string }> = [
  { value: "Websites", Icon: IconCode, subtitle: "Build, rebuild, or fix what you have." },
  { value: "Marketing", Icon: IconChartLine, subtitle: "Get found and bring in more business." },
  { value: "Both", Icon: IconStack2, subtitle: "Site plus everything that drives traffic to it." },
];

const REGISTRARS = ["GoDaddy", "Namecheap", "Cloudflare", "Google Domains / Squarespace Domains", "Bluehost", "Hover", "Other", "Not sure"];
const EMAIL_HOSTS = ["Google Workspace", "Microsoft 365 / Outlook", "GoDaddy Email", "cPanel / hosting-provided", "iCloud / Yahoo / Gmail (personal)", "Other", "None", "Not sure"];
const ENTITY_TYPES = ["LLC", "Sole Proprietor", "S-Corp", "C-Corp", "Partnership", "Other"];

const LOGIN_SYSTEMS_BY_SCOPE: Record<Exclude<Scope, "">, Array<{ key: string; label: string }>> = {
  Websites: [
    { key: "domain", label: "Domain registrar (GoDaddy, Namecheap, etc.)" },
    { key: "hosting", label: "Hosting / current website platform" },
    { key: "emailHost", label: "Email host (Google Workspace, etc.)" },
  ],
  Marketing: [
    { key: "gbp", label: "Google Business Profile" },
    { key: "ga4", label: "Google Analytics (GA4)" },
    { key: "gsc", label: "Google Search Console" },
    { key: "socials", label: "Social platforms (Facebook, Instagram, etc.)" },
    { key: "hosting", label: "Hosting / current website platform" },
    { key: "domain", label: "Domain registrar" },
    { key: "crm", label: "CRM / lead system (Markate, Jobber, etc.)" },
    { key: "ads", label: "Existing ad accounts (Google Ads, Meta, etc.)" },
  ],
  Both: [
    { key: "domain", label: "Domain registrar" },
    { key: "hosting", label: "Hosting / current website platform" },
    { key: "emailHost", label: "Email host" },
    { key: "gbp", label: "Google Business Profile" },
    { key: "ga4", label: "Google Analytics (GA4)" },
    { key: "gsc", label: "Google Search Console" },
    { key: "socials", label: "Social platforms" },
    { key: "crm", label: "CRM / lead system" },
    { key: "ads", label: "Existing ad accounts" },
  ],
};

const STORAGE_KEY = "thekhan-onboarding-draft-v1";

// Required fields per section — work-blockers only.
const REQUIRED: Record<"common" | "website" | "marketing", Array<keyof FormState>> = {
  common: ["legalName", "address", "phone", "email", "services", "serviceArea"],
  website: ["domainRegistrar", "clientList", "voiceTone", "contactFormDestination"],
  marketing: ["gbpStatus", "customerProfile", "competitors", "goal"],
};

// Map field keys to their DOM input ids for scroll-to-error.
const FIELD_DOM_ID: Partial<Record<keyof FormState, string>> = {
  legalName: "legal-name",
  address: "address",
  phone: "phone",
  email: "email",
  services: "services",
  serviceArea: "service-area",
  domainRegistrar: "domain-registrar",
  clientList: "clients",
  voiceTone: "voice",
  contactFormDestination: "form-dest",
  gbpStatus: "gbp-status",
  customerProfile: "customer-profile",
  competitors: "competitors",
  goal: "goal",
};

const initialState: FormState = {
  scope: "",
  legalName: "",
  dba: "",
  address: "",
  phone: "",
  email: "",
  hours: emptyHours(),
  services: "",
  serviceArea: "",
  yearsInBusiness: "",
  entityType: "",
  licenseInsurance: "",
  decisionMaker: "",
  communicationPref: "",
  urgent: "",
  brandColorsFonts: "",
  clientList: "",
  testimonials: "",
  domainRegistrar: "",
  emailHost: "",
  sitesYouLike: "",
  voiceTone: "",
  copySource: "",
  extraPages: "",
  contactFormDestination: "",
  existingLinks: "",
  gbpStatus: "",
  existingTracking: "",
  customerProfile: "",
  competitors: "",
  goal: "",
  photosPlan: "",
  crm: "",
  existingAds: "",
  reviewPlatforms: "",
  logins: {},
  done: { common: false, website: false, marketing: false, logins: false },
  honey: "",
};

type Action =
  | { type: "SET"; field: keyof FormState; value: unknown }
  | { type: "SET_DAY"; day: DayKey; patch: Partial<DayHours> }
  | { type: "SET_LOGIN"; key: string; value: LoginStatus }
  | { type: "MARK_DONE"; section: keyof FormState["done"] }
  | { type: "LOAD"; state: FormState }
  | { type: "RESET" };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET":
      return { ...state, [action.field]: action.value };
    case "SET_DAY":
      return { ...state, hours: { ...state.hours, [action.day]: { ...state.hours[action.day], ...action.patch } } };
    case "SET_LOGIN":
      return { ...state, logins: { ...state.logins, [action.key]: action.value } };
    case "MARK_DONE":
      return { ...state, done: { ...state.done, [action.section]: true } };
    case "LOAD":
      return action.state;
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

// ============================================================
// Time estimates per section (minutes)
// ============================================================

const TIME = { common: 8, website: 10, marketing: 7, logins: 5 } as const;

// ============================================================
// Main component
// ============================================================

type SectionKey = "common" | "website" | "marketing" | "logins";

export default function OnboardingPage() {
  const reduce = useReducedMotion();
  // Scope can be locked via the link Omair sends: /start/websites|marketing|both.
  // When locked, the client never sees the scope chooser — it's settled at signing.
  const { scopeParam } = useParams();
  const lockedScope: Scope | null =
    scopeParam === "websites" ? "Websites" :
    scopeParam === "marketing" ? "Marketing" :
    scopeParam === "both" ? "Both" : null;
  const [state, dispatch] = useReducer(reducer, initialState, (s) =>
    lockedScope ? { ...s, scope: lockedScope } : s
  );
  const [openSection, setOpenSection] = useState<SectionKey | null>(lockedScope ? "common" : null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [resumeDecision, setResumeDecision] = useState<"pending" | "resume" | "fresh">("pending");
  const [errors, setErrors] = useState<Set<string>>(new Set());
  const [turnstileToken, setTurnstileToken] = useState("");
  const hasMounted = useRef(false);

  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  // Wrappers that clear the error for a field as soon as the user starts typing.
  const setField = (field: keyof FormState, value: unknown) => {
    dispatch({ type: "SET", field, value });
    if (errors.has(field as string)) {
      setErrors((prev) => {
        const next = new Set(prev);
        next.delete(field as string);
        return next;
      });
    }
  };

  const setLogin = (key: string, value: LoginStatus) => {
    dispatch({ type: "SET_LOGIN", key, value });
    const errKey = `login:${key}`;
    if (errors.has(errKey)) {
      setErrors((prev) => {
        const next = new Set(prev);
        next.delete(errKey);
        return next;
      });
    }
  };

  // ============================================================
  // Resume prompt — check localStorage on mount
  // ============================================================
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as FormState;
        if (parsed && typeof parsed === "object" && parsed.scope !== undefined) {
          // Show resume prompt
          (window as Window & { __pendingDraft?: FormState }).__pendingDraft = parsed;
          return;
        }
      }
    } catch {
      // Corrupt draft — ignore
    }
    setResumeDecision("fresh");
  }, []);

  const handleResume = () => {
    const draft = (window as Window & { __pendingDraft?: FormState }).__pendingDraft;
    if (draft) {
      dispatch({ type: "LOAD", state: draft });
      // Auto-open the next unfinished section
      const next: SectionKey | null =
        !draft.done.common ? "common" :
        (draft.scope === "Websites" || draft.scope === "Both") && !draft.done.website ? "website" :
        (draft.scope === "Marketing" || draft.scope === "Both") && !draft.done.marketing ? "marketing" :
        !draft.done.logins ? "logins" : null;
      setOpenSection(next);
    }
    setResumeDecision("resume");
  };

  const handleStartFresh = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setResumeDecision("fresh");
  };

  // ============================================================
  // Auto-save — debounced to localStorage on every state change
  // ============================================================
  useEffect(() => {
    if (!hasMounted.current) { hasMounted.current = true; return; }
    if (resumeDecision === "pending") return;
    if (submitStatus === "success") return;
    // Only save if user has actually started something
    if (!state.scope) return;
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        setSavedAt(Date.now());
      } catch {
        // Storage full or blocked — silent fail
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [state, resumeDecision, submitStatus]);

  // ============================================================
  // Derived: which sections apply, progress, time remaining
  // ============================================================
  const sectionsApplicable = useMemo<SectionKey[]>(() => {
    if (!state.scope) return [];
    const list: SectionKey[] = ["common"];
    if (state.scope === "Websites" || state.scope === "Both") list.push("website");
    if (state.scope === "Marketing" || state.scope === "Both") list.push("marketing");
    list.push("logins");
    return list;
  }, [state.scope]);

  const doneCount = sectionsApplicable.filter((s) => state.done[s]).length;
  const totalCount = sectionsApplicable.length;
  const progressPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const minutesLeft = useMemo(() => {
    return sectionsApplicable
      .filter((s) => !state.done[s])
      .reduce((sum, s) => sum + TIME[s], 0);
  }, [sectionsApplicable, state.done]);

  const allDone = totalCount > 0 && doneCount === totalCount;

  // ============================================================
  // Section handlers
  // ============================================================
  const validateSection = (section: SectionKey): string[] => {
    const missing: string[] = [];
    if (section === "common" || section === "website" || section === "marketing") {
      for (const field of REQUIRED[section]) {
        const val = state[field];
        if (typeof val === "string" && val.trim() === "") missing.push(field as string);
      }
    }
    if (section === "logins" && state.scope) {
      const systems = LOGIN_SYSTEMS_BY_SCOPE[state.scope as Exclude<Scope, "">];
      for (const sys of systems) {
        if (!state.logins[sys.key]) missing.push(`login:${sys.key}`);
      }
    }
    return missing;
  };

  const completeSection = (section: SectionKey) => {
    const missing = validateSection(section);
    if (missing.length > 0) {
      setErrors(new Set(missing));
      // Scroll to first missing field
      setTimeout(() => {
        const firstKey = missing[0];
        const domId = firstKey.startsWith("login:")
          ? `login-row-${firstKey.slice(6)}`
          : FIELD_DOM_ID[firstKey as keyof FormState];
        if (domId) {
          const el = document.getElementById(domId);
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
          if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
            el.focus({ preventScroll: true });
          }
        }
      }, 60);
      return;
    }
    setErrors(new Set());
    dispatch({ type: "MARK_DONE", section });
    // Auto-advance to next applicable section
    const idx = sectionsApplicable.indexOf(section);
    const next = sectionsApplicable[idx + 1];
    setOpenSection(next ?? null);
    if (next) {
      setTimeout(() => {
        const el = document.getElementById(`section-${next}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  };

  // ============================================================
  // Submit
  // ============================================================
  const handleSubmit = async () => {
    if (state.honey) return;
    if (!allDone) return;
    if (!turnstileToken) {
      setSubmitStatus("error");
      return;
    }
    setSubmitStatus("submitting");
    try {
      const hoursPretty = DAYS.map(({ key, label }) => {
        const h = state.hours[key];
        return h.closed ? `${label}: Closed` : `${label}: ${h.open || "?"}–${h.close || "?"}`;
      }).join("\n");

      const loginsList = (state.scope ? LOGIN_SYSTEMS_BY_SCOPE[state.scope as Exclude<Scope, "">] : [])
        .map((s) => `${s.label}: ${state.logins[s.key] || "—"}`)
        .join("\n");

      const displayName = state.dba || state.legalName || "Onboarding";

      const payload: Record<string, string> = {
        // routing
        client: "thekhan",
        form_id: "thekhan-start",
        source: "manual",
        "cf-turnstile-response": turnstileToken,
        // standard lead fields
        name: displayName,
        email: state.email || "",
        phone: state.phone || "",
        service: "Onboarding",
        message: `Onboarding intake — see Project Details for full payload.`,
        // honeypot
        website_url: state.honey,
        // custom fields → render under "Project Details" in the email
        scope: state.scope || "—",
        legal_name: state.legalName || "—",
        dba: state.dba || "—",
        address: state.address || "—",
        hours: hoursPretty,
        services: state.services || "—",
        service_area: state.serviceArea || "—",
        years_in_business: state.yearsInBusiness || "—",
        entity_type: state.entityType || "—",
        license_insurance: state.licenseInsurance || "—",
        decision_maker: state.decisionMaker || "—",
        communication_pref: state.communicationPref || "—",
        urgent: state.urgent || "—",
      };

      if (state.scope === "Websites" || state.scope === "Both") {
        Object.assign(payload, {
          brand_colors_fonts: state.brandColorsFonts || "—",
          client_list: state.clientList || "—",
          testimonials: state.testimonials || "—",
          domain_registrar: state.domainRegistrar || "—",
          email_host: state.emailHost || "—",
          sites_you_like: state.sitesYouLike || "—",
          voice_tone: state.voiceTone || "—",
          copy_source: state.copySource || "—",
          extra_pages: state.extraPages || "—",
          contact_form_destination: state.contactFormDestination || "—",
          existing_links: state.existingLinks || "—",
        });
      }

      if (state.scope === "Marketing" || state.scope === "Both") {
        Object.assign(payload, {
          gbp_status: state.gbpStatus || "—",
          existing_tracking: state.existingTracking || "—",
          customer_profile: state.customerProfile || "—",
          competitors: state.competitors || "—",
          goal: state.goal || "—",
          photos_plan: state.photosPlan || "—",
          crm: state.crm || "—",
          existing_ads: state.existingAds || "—",
          review_platforms: state.reviewPlatforms || "—",
        });
      }

      payload.logins_inventory = loginsList;

      const res = await fetch("https://leads-api.thekhan.io/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitStatus("success");
        try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
  };

  // ============================================================
  // Render
  // ============================================================

  return (
    <>
      <SEO
        title="Onboarding — TheKhan"
        description="Post-signature onboarding intake. About 20–30 minutes. Save and come back anytime."
        canonical="https://thekhan.io/start"
        noindex
      />

      <div className="relative min-h-screen bg-bg text-ink overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 gradient-drift opacity-70" />

        {/* Nav */}
        <nav className="relative z-20 sticky top-0 backdrop-blur-xl bg-bg/85 border-b border-line">
          <div className="max-w-3xl mx-auto px-6 py-4 h-18 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-sm text-ink-quiet hover:text-ink transition-colors">
              <IconArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <Link to="/" aria-label="TheKhan home">
              <Logo variant="white" size="sm" type="full" />
            </Link>
            <SavedPill savedAt={savedAt} reduce={!!reduce} />
          </div>
          {/* Progress bar (only after scope chosen + not on success) */}
          {state.scope && submitStatus !== "success" && (
            <div className="max-w-3xl mx-auto px-6 pb-3">
              <div className="flex items-baseline justify-between mb-1.5 text-xs text-ink-quiet">
                <span>{doneCount} of {totalCount} done</span>
                <span>{minutesLeft > 0 ? `~${minutesLeft} min left` : "Ready to send"}</span>
              </div>
              <div className="h-1 bg-bg-quiet rounded-full overflow-hidden">
                <m.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full bg-accent-light"
                />
              </div>
            </div>
          )}
        </nav>

        <main className="relative z-10 px-6 pb-24">
          <AnimatePresence mode="wait" initial={false}>
            {resumeDecision === "pending" ? (
              <ResumePrompt
                key="resume"
                onResume={handleResume}
                onFresh={handleStartFresh}
                reduce={!!reduce}
              />
            ) : submitStatus === "success" ? (
              <SuccessState key="success" reduce={!!reduce} />
            ) : (
              <m.div
                key="form"
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduce ? 0 : 0.3 }}
                className="max-w-3xl mx-auto pt-12 md:pt-16"
              >
                {/* Header */}
                <header className="text-center mb-12 md:mb-16">
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-light mb-5">
                    Onboarding
                  </p>
                  <h1 className="display-h1 text-4xl md:text-5xl lg:text-6xl text-ink tracking-[-0.005em] mb-5">
                    Welcome.
                  </h1>
                  <p className="text-ink-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                    Everything I need to get started. About 20–30 minutes — save and come back anytime.
                  </p>
                </header>

                {/* Honeypot */}
                <input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={state.honey}
                  onChange={(e) => dispatch({ type: "SET", field: "honey", value: e.target.value })}
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />

                {/* Scope gate — hidden when scope is locked via the link */}
                {!lockedScope && (
                <section className="ed-card-dark mb-8" aria-labelledby="scope-heading">
                  <h2 id="scope-heading" className="font-mono text-xs uppercase tracking-[0.22em] text-ink-quiet mb-3">
                    Scope
                  </h2>
                  <p className="text-ink text-lg md:text-xl mb-6">What's in scope for this engagement?</p>
                  <div role="radiogroup" aria-labelledby="scope-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {SCOPE_OPTIONS.map((opt) => (
                      <ScopeCard
                        key={opt.value}
                        option={opt}
                        selected={state.scope === opt.value}
                        onSelect={() => {
                          dispatch({ type: "SET", field: "scope", value: opt.value });
                          if (!openSection) setOpenSection("common");
                        }}
                        reduce={!!reduce}
                      />
                    ))}
                  </div>
                </section>
                )}

                {/* Accordion sections */}
                {state.scope && (
                  <div className="space-y-4">
                    <AccordionSection
                      id="common"
                      number={1}
                      title="Common"
                      subtitle="Business basics — everyone fills this"
                      minutes={TIME.common}
                      isOpen={openSection === "common"}
                      isDone={state.done.common}
                      onToggle={() => setOpenSection(openSection === "common" ? null : "common")}
                      reduce={!!reduce}
                    >
                      <CommonFields state={state} setField={setField} dispatch={dispatch} errors={errors} />
                      <SaveAndContinue onClick={() => completeSection("common")} alreadyDone={state.done.common} />
                    </AccordionSection>

                    {(state.scope === "Websites" || state.scope === "Both") && (
                      <AccordionSection
                        id="website"
                        number={2}
                        title="Website"
                        subtitle="Everything I need to build the site"
                        minutes={TIME.website}
                        isOpen={openSection === "website"}
                        isDone={state.done.website}
                        onToggle={() => setOpenSection(openSection === "website" ? null : "website")}
                        reduce={!!reduce}
                      >
                        <WebsiteFields state={state} setField={setField} errors={errors} />
                        <SaveAndContinue onClick={() => completeSection("website")} alreadyDone={state.done.website} />
                      </AccordionSection>
                    )}

                    {(state.scope === "Marketing" || state.scope === "Both") && (
                      <AccordionSection
                        id="marketing"
                        number={state.scope === "Both" ? 3 : 2}
                        title="Marketing"
                        subtitle="Everything I need to run the retainer"
                        minutes={TIME.marketing}
                        isOpen={openSection === "marketing"}
                        isDone={state.done.marketing}
                        onToggle={() => setOpenSection(openSection === "marketing" ? null : "marketing")}
                        reduce={!!reduce}
                      >
                        <MarketingFields state={state} setField={setField} errors={errors} />
                        <SaveAndContinue onClick={() => completeSection("marketing")} alreadyDone={state.done.marketing} />
                      </AccordionSection>
                    )}

                    <AccordionSection
                      id="logins"
                      number={sectionsApplicable.indexOf("logins") + 1}
                      title="Logins & access"
                      subtitle="What you have — credentials handled separately"
                      minutes={TIME.logins}
                      isOpen={openSection === "logins"}
                      isDone={state.done.logins}
                      onToggle={() => setOpenSection(openSection === "logins" ? null : "logins")}
                      reduce={!!reduce}
                    >
                      <LoginsFields state={state} setLogin={setLogin} errors={errors} />
                      <SaveAndContinue onClick={() => completeSection("logins")} alreadyDone={state.done.logins} />
                    </AccordionSection>
                  </div>
                )}

                {/* Final submit */}
                {state.scope && (
                  <div className="mt-10">
                    {submitStatus === "error" && (
                      <m.div
                        initial={reduce ? false : { opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mb-5 border border-accent-light/40 bg-accent-soft px-4 py-3 text-sm text-ink"
                      >
                        Couldn&apos;t send. Text me instead —{" "}
                        <a href="sms:+18472208550" className="text-accent-light underline underline-offset-2">
                          (847) 220-8550
                        </a>
                        .
                      </m.div>
                    )}
                    {allDone && (
                      <div className="mb-5">
                        <TurnstileWidget onToken={handleToken} onExpire={handleExpire} />
                      </div>
                    )}
                    <m.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!allDone || submitStatus === "submitting" || !turnstileToken}
                      whileHover={!reduce && allDone ? { y: -1 } : undefined}
                      whileTap={!reduce && allDone ? { scale: 0.985 } : undefined}
                      transition={{ duration: 0.15 }}
                      className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer group"
                    >
                      {submitStatus === "submitting" ? (
                        <span>Sending…</span>
                      ) : allDone ? (
                        <span className="inline-flex items-center gap-2">
                          Send everything over
                          <IconArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </span>
                      ) : (
                        <span className="text-ink-muted">
                          Finish all sections to send
                        </span>
                      )}
                    </m.button>
                  </div>
                )}
              </m.div>
            )}
          </AnimatePresence>
        </main>

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
// Sub-components
// ============================================================

function SavedPill({ savedAt, reduce }: { savedAt: number | null; reduce: boolean }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (savedAt) {
      setVisible(true);
      const t = setTimeout(() => setVisible(false), 1800);
      return () => clearTimeout(t);
    }
  }, [savedAt]);
  return (
    <AnimatePresence>
      {visible && (
        <m.span
          initial={reduce ? false : { opacity: 0, x: 4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="text-xs text-accent-light flex items-center gap-1.5"
        >
          <IconCheck className="w-3.5 h-3.5" />
          Saved
        </m.span>
      )}
    </AnimatePresence>
  );
}

function ResumePrompt({ onResume, onFresh, reduce }: { onResume: () => void; onFresh: () => void; reduce: boolean }) {
  return (
    <m.div
      key="resume-prompt"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? undefined : { opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="max-w-xl mx-auto pt-24 md:pt-32"
    >
      <div className="ed-card-dark text-center">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-light mb-3">
          Picking up where you left off
        </p>
        <h2 className="display-h2 text-2xl md:text-3xl text-ink mb-3">
          You started this earlier.
        </h2>
        <p className="text-ink-muted mb-7">
          Resume where you stopped, or start fresh?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={onResume} className="btn-primary cursor-pointer">
            Resume
          </button>
          <button type="button" onClick={onFresh} className="btn-ghost cursor-pointer">
            Start over
          </button>
        </div>
      </div>
    </m.div>
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
        I&apos;ll reach out within 24 hours with next steps.
      </p>
    </m.div>
  );
}

function ScopeCard({
  option,
  selected,
  onSelect,
  reduce,
}: {
  option: (typeof SCOPE_OPTIONS)[number];
  selected: boolean;
  onSelect: () => void;
  reduce: boolean;
}) {
  const { value, subtitle, Icon } = option;
  const id = `scope-${value.toLowerCase()}`;
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
      <input id={id} type="radio" name="scope" value={value} checked={selected} onChange={onSelect} className="sr-only" />
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 transition-colors duration-200 ${selected ? "text-accent-light" : "text-ink-muted"}`} stroke={1.6} />
        <div>
          <p className="font-medium text-base text-ink leading-tight">{value}</p>
          <p className="text-xs sm:text-sm text-ink-muted mt-1 leading-snug">{subtitle}</p>
        </div>
      </div>
      {selected && (
        <m.span
          layoutId="scopeSelectedRing"
          aria-hidden
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
          className="pointer-events-none absolute inset-0 border border-accent-light"
        />
      )}
    </m.label>
  );
}

function AccordionSection({
  id,
  number,
  title,
  subtitle,
  minutes,
  isOpen,
  isDone,
  onToggle,
  reduce,
  children,
}: {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  minutes: number;
  isOpen: boolean;
  isDone: boolean;
  onToggle: () => void;
  reduce: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={`section-${id}`} className="border border-line bg-bg-quiet scroll-mt-32">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`panel-${id}`}
        className="w-full px-5 md:px-7 py-5 flex items-center justify-between gap-4 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="shrink-0">
            {isDone ? (
              <IconCheck className="w-5 h-5 text-accent-light" stroke={2} />
            ) : isOpen ? (
              <IconCircleDot className="w-5 h-5 text-accent-light" stroke={1.6} />
            ) : (
              <IconCircleDashed className="w-5 h-5 text-ink-quiet" stroke={1.6} />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono text-xs text-ink-quiet">{number.toString().padStart(2, "0")}</span>
              <h3 className="text-lg md:text-xl text-ink font-medium leading-tight">{title}</h3>
              <span className="text-xs text-ink-quiet">~{minutes} min</span>
              {isDone && <span className="text-xs text-accent-light">Done</span>}
            </div>
            <p className="text-sm text-ink-muted mt-0.5 truncate">{subtitle}</p>
          </div>
        </div>
        <IconChevronDown
          className={`w-5 h-5 text-ink-quiet shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <m.div
            id={`panel-${id}`}
            key="panel"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-7 pb-7 pt-2 space-y-7 border-t border-line">
              {children}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SaveAndContinue({ onClick, alreadyDone }: { onClick: () => void; alreadyDone: boolean }) {
  return (
    <div className="pt-2">
      <button type="button" onClick={onClick} className="btn-primary cursor-pointer inline-flex items-center gap-2 group">
        {alreadyDone ? "Update & continue" : "Save & continue"}
        <IconArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

// ============================================================
// Field primitives
// ============================================================

const inputBase =
  "w-full px-4 py-3 bg-bg-quiet border border-line text-ink placeholder:text-ink-faint " +
  "focus:outline-none focus:border-accent-light focus:ring-1 focus:ring-accent-light/30 " +
  "transition-colors duration-200";

function Field({
  label,
  htmlFor,
  hint,
  children,
  required,
  error,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm text-ink-muted mb-2">
        {label}
        {required && <span className="text-accent-light ml-1">*</span>}
        {hint && <span className="text-ink-quiet text-xs font-normal ml-1.5">({hint})</span>}
      </label>
      <div className={error ? "ring-1 ring-accent-light/60 ring-offset-0" : ""}>
        {children}
      </div>
      {error && (
        <p className="mt-1.5 text-xs text-accent-light">Need this one.</p>
      )}
    </div>
  );
}

function Text({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={inputBase}
      placeholder={placeholder}
    />
  );
}

function TextArea({
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      id={id}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} resize-none`}
      placeholder={placeholder}
    />
  );
}

function Select({
  id,
  value,
  onChange,
  options,
  placeholder = "Select one…",
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputBase} appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23808080%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center] pr-10`}
    >
      <option value="" className="bg-bg-deep">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-bg-deep">{opt}</option>
      ))}
    </select>
  );
}

// ============================================================
// Section: Common
// ============================================================

function CommonFields({
  state,
  setField,
  dispatch,
  errors,
}: {
  state: FormState;
  setField: (field: keyof FormState, value: unknown) => void;
  dispatch: React.Dispatch<Action>;
  errors: Set<string>;
}) {
  const set = (field: keyof FormState) => (value: string) => setField(field, value);
  const err = (field: keyof FormState) => errors.has(field as string);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Legal business name" htmlFor="legal-name" required error={err("legalName")}>
          <Text id="legal-name" value={state.legalName} onChange={set("legalName")} placeholder="e.g. Smith Plumbing LLC" autoComplete="organization" />
        </Field>
        <Field label="DBA (the name customers know)" htmlFor="dba" hint="optional if same as legal name">
          <Text id="dba" value={state.dba} onChange={set("dba")} placeholder="e.g. Smith & Sons Plumbing" />
        </Field>
      </div>

      <Field label="Business address" htmlFor="address" hint="street, city, state, zip" required error={err("address")}>
        <Text id="address" value={state.address} onChange={set("address")} placeholder="123 Main St, Deerfield, IL 60015" autoComplete="street-address" />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Phone" htmlFor="phone" required error={err("phone")}>
          <Text id="phone" type="tel" value={state.phone} onChange={set("phone")} placeholder="(847) 220-8550" autoComplete="tel" />
        </Field>
        <Field label="Email" htmlFor="email" hint="the one you actually check" required error={err("email")}>
          <Text id="email" type="email" value={state.email} onChange={set("email")} placeholder="you@business.com" autoComplete="email" />
        </Field>
      </div>

      <Field label="Hours of operation">
        <HoursGrid state={state} dispatch={dispatch} />
      </Field>

      <Field label="Services offered" htmlFor="services" hint="one per line, full list — not just primary" required error={err("services")}>
        <TextArea id="services" rows={4} value={state.services} onChange={set("services")} placeholder={"e.g.\nResidential roofing\nGutter repair\nSiding"} />
      </Field>

      <Field label="Service area" htmlFor="service-area" hint="cities or zips you serve, comma-separated" required error={err("serviceArea")}>
        <TextArea id="service-area" rows={3} value={state.serviceArea} onChange={set("serviceArea")} placeholder="e.g. Deerfield, Northbrook, Glenview, Highland Park, Buffalo Grove" />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Years in business" htmlFor="years">
          <Text id="years" type="number" value={state.yearsInBusiness} onChange={set("yearsInBusiness")} placeholder="e.g. 8" />
        </Field>
        <Field label="Entity type" htmlFor="entity-type">
          <Select id="entity-type" value={state.entityType} onChange={set("entityType")} options={ENTITY_TYPES} />
        </Field>
      </div>

      <Field label="License & insurance" htmlFor="license" hint="optional — for trust badges and schema">
        <Text id="license" value={state.licenseInsurance} onChange={set("licenseInsurance")} placeholder="e.g. IL Roofing License #104.018421, Liability $2M" />
      </Field>

      <Field label="Who's the decision-maker?" htmlFor="decision-maker" hint="just you, or partner / spouse / manager?">
        <Text id="decision-maker" value={state.decisionMaker} onChange={set("decisionMaker")} placeholder="e.g. Just me / Me + my wife / Me + my GM" />
      </Field>

      <Field label="Best way to reach you" htmlFor="comm-pref" hint="text / email / both — and how fast you respond">
        <Text id="comm-pref" value={state.communicationPref} onChange={set("communicationPref")} placeholder="e.g. Text first, usually within an hour during the day" />
      </Field>

      <Field label="Anything urgent in the first 30 days?" htmlFor="urgent" hint="seasonal push, event, launch, complaint to fix">
        <TextArea id="urgent" rows={3} value={state.urgent} onChange={set("urgent")} placeholder="e.g. Snow season hits Nov 1 — need ads running by Oct 15." />
      </Field>
    </>
  );
}

function HoursGrid({ state, dispatch }: { state: FormState; dispatch: React.Dispatch<Action> }) {
  return (
    <div className="border border-line bg-bg-deep/40 divide-y divide-line">
      {DAYS.map(({ key, label }) => {
        const h = state.hours[key];
        return (
          <div key={key} className="flex items-center gap-3 px-3 py-2.5">
            <span className="w-12 text-sm text-ink-muted font-medium">{label}</span>
            {h.closed ? (
              <span className="flex-1 text-sm text-ink-quiet italic">Closed</span>
            ) : (
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="time"
                  value={h.open}
                  onChange={(e) => dispatch({ type: "SET_DAY", day: key, patch: { open: e.target.value } })}
                  className="px-2 py-1.5 bg-bg-quiet border border-line text-ink text-sm focus:outline-none focus:border-accent-light"
                  aria-label={`${label} open time`}
                />
                <span className="text-ink-quiet text-xs">to</span>
                <input
                  type="time"
                  value={h.close}
                  onChange={(e) => dispatch({ type: "SET_DAY", day: key, patch: { close: e.target.value } })}
                  className="px-2 py-1.5 bg-bg-quiet border border-line text-ink text-sm focus:outline-none focus:border-accent-light"
                  aria-label={`${label} close time`}
                />
              </div>
            )}
            <label className="flex items-center gap-1.5 text-xs text-ink-muted cursor-pointer">
              <input
                type="checkbox"
                checked={h.closed}
                onChange={(e) => dispatch({ type: "SET_DAY", day: key, patch: { closed: e.target.checked } })}
                className="accent-accent-light cursor-pointer"
              />
              Closed
            </label>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
// Section: Website
// ============================================================

function WebsiteFields({
  state,
  setField,
  errors,
}: {
  state: FormState;
  setField: (field: keyof FormState, value: unknown) => void;
  errors: Set<string>;
}) {
  const set = (field: keyof FormState) => (value: string) => setField(field, value);
  const err = (field: keyof FormState) => errors.has(field as string);
  return (
    <>
      <DriveNote
        title="Logos, photos, and team shots"
        body="I'll send a shared Google Drive folder in the kickoff email. Drop logo files, job photos, and team photos in there — easier than uploading through this form. If you don't have logos yet, no rush, we'll talk through it."
      />

      <Field label="Brand colors & fonts" htmlFor="brand" hint="hex codes if you know them, or 'needs designed'">
        <TextArea id="brand" rows={3} value={state.brandColorsFonts} onChange={set("brandColorsFonts")} placeholder="e.g. Navy #1A3D5C + warm white. Montserrat / Lora. Or: needs designed." />
      </Field>

      <Field label="Real client list" htmlFor="clients" hint="names, brands, anything you want featured" required error={err("clientList")}>
        <TextArea id="clients" rows={4} value={state.clientList} onChange={set("clientList")} placeholder="e.g. Property managers — Greystar, Bozzuto. GCs — McShane, Pepper. Etc." />
      </Field>

      <Field label="Testimonials or reviews to feature" htmlFor="testimonials" hint="paste in any you want on the site — even rough">
        <TextArea id="testimonials" rows={4} value={state.testimonials} onChange={set("testimonials")} placeholder={"e.g.\n'Best roofer we've ever worked with.' — John D, Highland Park\n'Quick, clean, fairly priced.' — Sarah K, Glenview"} />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Domain registrar" htmlFor="domain-registrar" hint="where you bought the domain" required error={err("domainRegistrar")}>
          <Select id="domain-registrar" value={state.domainRegistrar} onChange={set("domainRegistrar")} options={REGISTRARS} />
        </Field>
        <Field label="Email host" htmlFor="email-host" hint="who runs your @yourbusiness.com mail">
          <Select id="email-host" value={state.emailHost} onChange={set("emailHost")} options={EMAIL_HOSTS} />
        </Field>
      </div>

      <Field label="2–3 sites you like (any industry)" htmlFor="sites-like" hint="design direction reference — paste URLs">
        <TextArea id="sites-like" rows={3} value={state.sitesYouLike} onChange={set("sitesYouLike")} placeholder={"e.g.\nhttps://example.com — clean, lots of white space\nhttps://example2.com — bold typography"} />
      </Field>

      <Field label="Voice & tone preference" htmlFor="voice" hint="formal / casual / technical / mix" required error={err("voiceTone")}>
        <Text id="voice" value={state.voiceTone} onChange={set("voiceTone")} placeholder="e.g. Casual but professional. Plain English, no jargon." />
      </Field>

      <Field label="Copy / content source" htmlFor="copy-source" hint="do you have copy already, or am I writing it?">
        <Text id="copy-source" value={state.copySource} onChange={set("copySource")} placeholder="e.g. You write it / I have rough drafts / Mix" />
      </Field>

      <Field label="Pages beyond the standard 5" htmlFor="extra-pages" hint="anything beyond Home / About / Services / Contact / Reviews">
        <TextArea id="extra-pages" rows={3} value={state.extraPages} onChange={set("extraPages")} placeholder="e.g. FAQ page, Financing page, Commercial vs Residential split" />
      </Field>

      <Field label="Where should contact form submissions go?" htmlFor="form-dest" hint="email address that gets the leads" required error={err("contactFormDestination")}>
        <Text id="form-dest" type="email" value={state.contactFormDestination} onChange={set("contactFormDestination")} placeholder="you@business.com" />
      </Field>

      <Field label="Existing links to embed" htmlFor="existing-links" hint="booking, payment, CRM, scheduling — paste URLs">
        <TextArea id="existing-links" rows={3} value={state.existingLinks} onChange={set("existingLinks")} placeholder={"e.g.\nCalendly: https://calendly.com/...\nStripe payments: https://...\nLeave blank if none."} />
      </Field>
    </>
  );
}

function DriveNote({ title, body }: { title: string; body: string }) {
  return (
    <div className="border border-accent-line bg-accent-soft/40 px-4 py-3 text-sm">
      <p className="font-medium text-accent-light mb-1">{title}</p>
      <p className="text-ink-muted leading-relaxed">{body}</p>
    </div>
  );
}

// ============================================================
// Section: Marketing
// ============================================================

function MarketingFields({
  state,
  setField,
  errors,
}: {
  state: FormState;
  setField: (field: keyof FormState, value: unknown) => void;
  errors: Set<string>;
}) {
  const set = (field: keyof FormState) => (value: string) => setField(field, value);
  const err = (field: keyof FormState) => errors.has(field as string);
  return (
    <>
      <Field label="Google Business Profile status" htmlFor="gbp-status" required error={err("gbpStatus")}>
        <Select
          id="gbp-status"
          value={state.gbpStatus}
          onChange={set("gbpStatus")}
          options={["I own it and it's verified", "I claim it but not verified", "Don't have one", "Not sure"]}
        />
      </Field>

      <Field label="Existing tracking" htmlFor="tracking" hint="GA4 ID, Search Console, Meta Pixel — paste what you have">
        <TextArea id="tracking" rows={3} value={state.existingTracking} onChange={set("existingTracking")} placeholder={"e.g.\nGA4: G-XXXXXXX\nSearch Console: verified\nMeta Pixel: yes, ID 12345"} />
      </Field>

      <Field label="Your best customer" htmlFor="customer-profile" hint="who they are, ticket size, lifetime value" required error={err("customerProfile")}>
        <TextArea id="customer-profile" rows={4} value={state.customerProfile} onChange={set("customerProfile")} placeholder="e.g. Homeowners 45–65 in single-family homes north of $600k. Avg job $4,500. Best ones do recurring seasonal work — $8–12k/year." />
      </Field>

      <Field label="Top 3 competitors" htmlFor="competitors" hint="the ones you actually compete against" required error={err("competitors")}>
        <TextArea id="competitors" rows={3} value={state.competitors} onChange={set("competitors")} placeholder={"e.g.\n1. Acme Roofing — bigger, more aggressive on Google Ads\n2. Smith & Co — similar size, dominant on local SEO\n3. NextDoor Roofers — newer, lots of door-knocking"} />
      </Field>

      <Field label="6-month goal" htmlFor="goal" hint="how you'll know this is working" required error={err("goal")}>
        <TextArea id="goal" rows={3} value={state.goal} onChange={set("goal")} placeholder="e.g. 4–6 qualified leads a week from search, ranking in map pack for 'roofer Deerfield', site converting at 5%+." />
      </Field>

      <Field label="Job photos plan" htmlFor="photos-plan" hint="how often you'll get me photos">
        <TextArea id="photos-plan" rows={3} value={state.photosPlan} onChange={set("photosPlan")} placeholder="e.g. 4–6 phone photos a week, I'll drop them in the shared Drive folder by Friday." />
      </Field>

      <Field label="CRM / lead capture system" htmlFor="crm" hint="where leads land today">
        <Text id="crm" value={state.crm} onChange={set("crm")} placeholder="e.g. Markate / Jobber / HCP / Square / spreadsheet / nothing yet" />
      </Field>

      <Field label="Existing ads" htmlFor="ads" hint="if yes, what platforms — Google, Meta, LSA, etc.">
        <TextArea id="ads" rows={3} value={state.existingAds} onChange={set("existingAds")} placeholder="e.g. Running Google LSA — ~$1,500/mo. No Meta. No Search. Or: nothing currently." />
      </Field>

      <Field label="Other review platforms" htmlFor="reviews" hint="Yelp / HomeAdvisor / Angi / BBB — high level">
        <Text id="reviews" value={state.reviewPlatforms} onChange={set("reviewPlatforms")} placeholder="e.g. Yelp 4.8 with 22 reviews, BBB A+, nothing on Angi" />
      </Field>
    </>
  );
}

// ============================================================
// Section: Logins
// ============================================================

function LoginsFields({
  state,
  setLogin,
  errors,
}: {
  state: FormState;
  setLogin: (key: string, value: LoginStatus) => void;
  errors: Set<string>;
}) {
  const systems = state.scope ? LOGIN_SYSTEMS_BY_SCOPE[state.scope as Exclude<Scope, "">] : [];
  return (
    <>
      <div className="border border-accent-line bg-accent-soft/40 px-4 py-3 text-sm">
        <p className="text-ink-muted leading-relaxed">
          Don&apos;t type any passwords here. I&apos;ll reach out separately to collect any logins or access I need.
          Just let me know which of these you have, and I&apos;ll handle the rest.
        </p>
      </div>

      <div className="border border-line divide-y divide-line">
        {systems.map((sys) => (
          <LoginRow
            key={sys.key}
            id={`login-row-${sys.key}`}
            label={sys.label}
            value={state.logins[sys.key] || ""}
            onChange={(v) => setLogin(sys.key, v)}
            error={errors.has(`login:${sys.key}`)}
          />
        ))}
      </div>
    </>
  );
}

function LoginRow({ id, label, value, onChange, error }: { id: string; label: string; value: LoginStatus; onChange: (v: LoginStatus) => void; error?: boolean }) {
  const options: Array<{ value: LoginStatus; label: string }> = [
    { value: "yes", label: "Yes, I have this" },
    { value: "no", label: "No / don't have" },
    { value: "unsure", label: "Not sure" },
  ];
  return (
    <div id={id} className={`scroll-mt-32 px-4 py-3.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-shadow duration-200 ${error ? "shadow-[inset_0_0_0_1px_var(--accent-light)]" : ""}`}>
      <p className="text-sm text-ink">
        {label}
        {error && <span className="ml-2 text-xs text-accent-light">Pick one.</span>}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`px-3 py-1.5 text-xs border transition-colors duration-150 cursor-pointer ${
                selected
                  ? "border-accent-light bg-accent-soft text-ink"
                  : "border-line bg-bg-quiet text-ink-muted hover:border-accent-line hover:text-ink"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
