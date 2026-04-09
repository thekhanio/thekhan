import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconLoader2, IconChevronDown } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Link, useSearchParams } from "react-router-dom";

interface FormData {
  // Section 1: Basic Info
  name: string;
  email: string;
  phone: string;
  businessName: string;
  businessDescription: string;
  websiteUrl: string;
  preferredContact: string;
  decisionMaker: string;
  decisionMakerOther: string;
  hearAboutUs: string;
  referralSource: string;
  socialMediaSource: string;
  hearAboutUsOther: string;

  // Section 2: Services
  services: string[];
  servicesOther: string;

  // Section 3: Conditional - Website
  websiteGoals: string[];
  productCount: string;
  paymentProcessor: string;
  paymentTypes: string[];
  currentWebsiteUrl: string;
  websiteType: string;
  websiteCount: string;
  websiteBusinessType: string;
  multipleWebsitesDescription: string;
  domainRegistrar: string;
  domainRegistrarOther: string;
  hasHosting: string;
  hostingProvider: string;
  hostingProviderOther: string;
  hasLogo: string;
  hasBrandColors: string;
  hasCopy: string;
  hasPhotos: string;
  pages: string[];
  otherPages: string;
  referenceSites: string;
  needsContactForm: string;
  contactFormTypes: string[];
  contactFormOther: string;
  integrations: string;

  // Section 3: Conditional - Google Business Profile
  hasGoogleBusiness: string;
  businessType: string;

  // Section 3: Conditional - Social Media
  socialPlatforms: string[];
  hasExistingSocial: string;

  // Section 3: Conditional - Logo Design
  logoIdeas: string;
  logoVibe: string[];

  // Section 3: Conditional - Print Design
  printItems: string[];
  hasPrintContent: string;

  // Global: Website, Domain & GBP
  hasWebsite: string;
  hasDomainGlobal: string;
  domainNameGlobal: string;
  hasGBPGlobal: string;
  gbpLink: string;

  // Website: Existing site changes
  siteChanges: string;

  // Website: Booking system
  bookingSystem: string;
  bookingSystemOther: string;
  bookingEmbedLink: string;

  // Website: Brand color values
  brandColorValues: string;

  // Website: Features wanted
  featuresWanted: string[];

  // Business Details (for the website)
  yearsInBusiness: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  businessHours: string;
  tagline: string;
  socialMediaUrls: string;
  needsProfessionalEmail: string;

  addressIsPrivate: string;
  domainPreference: string;
  websiteTone: string;

  // Basic Info: Business scoping
  targetAudience: string;
  serviceArea: string;

  // Website: Primary CTAs
  primaryCTA: string[];
  servicesOffered: string;

  // CRM & Business Dashboard
  crmNeeds: string[];
  crmCurrentTools: string;
  crmUsers: string;
  crmPainPoint: string;

  // Section 4: Competition & Inspiration
  competitorsInspiration: string;

  // Section 5: Timeline & Budget
  timeline: string;
  budget: string;

  // Section 6: Anything Else
  additionalInfo: string;
}

const packageLabels: Record<string, { name: string; price: string }> = {
  foundation: { name: "Foundation", price: "$299" },
  starter: { name: "Starter", price: "$499" },
  launch: { name: "Launch", price: "$999" },
};

const addonToService: Record<string, string> = {
  "google-ads": "Google Ads / Paid Advertising",
  "ai-chatbot": "AI Chatbot (Website)",
  "ai-receptionist": "AI Receptionist (Phone)",
  "gbp": "Google Business Profile",
  "social-media": "Social Media Setup",
  "logo": "Logo Design",
  "print": "Print Design (brochures, flyers, business cards)",
  "crm": "CRM & Business Dashboard",
};

function getInitialServices(pkg: string | null, addonsParam: string | null): string[] {
  const services = new Set<string>();
  if (pkg) {
    services.add("Website");
    if (pkg !== "foundation") services.add("SEO / Search Optimization");
    if (pkg === "launch") services.add("Google Business Profile");
  }
  if (addonsParam) {
    for (const id of addonsParam.split(",")) {
      const svc = addonToService[id];
      if (svc) services.add(svc);
    }
  }
  return [...services];
}

export default function QuestionnairePage() {
  const [searchParams] = useSearchParams();
  const selectedPackage = searchParams.get("package");
  const selectedAddons = searchParams.get("addons");
  const pkg = selectedPackage ? packageLabels[selectedPackage] : null;
  const addonNames = selectedAddons ? selectedAddons.split(",") : [];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    businessDescription: "",
    websiteUrl: "",
    preferredContact: "",
    decisionMaker: "",
    decisionMakerOther: "",
    hearAboutUs: "",
    referralSource: "",
    socialMediaSource: "",
    hearAboutUsOther: "",
    services: getInitialServices(selectedPackage, selectedAddons),
    servicesOther: "",
    websiteGoals: [],
    productCount: "",
    paymentProcessor: "",
    paymentTypes: [],
    currentWebsiteUrl: "",
    websiteType: "",
    websiteCount: "",
    websiteBusinessType: "",
    multipleWebsitesDescription: "",
    domainRegistrar: "",
    domainRegistrarOther: "",
    hasHosting: "",
    hostingProvider: "",
    hostingProviderOther: "",
    hasLogo: "",
    hasBrandColors: "",
    hasCopy: "",
    hasPhotos: "",
    pages: [],
    otherPages: "",
    referenceSites: "",
    needsContactForm: "",
    contactFormTypes: [],
    contactFormOther: "",
    integrations: "",
    hasGoogleBusiness: "",
    businessType: "",
    socialPlatforms: [],
    hasExistingSocial: "",
    logoIdeas: "",
    logoVibe: [],
    printItems: [],
    hasPrintContent: "",
    hasWebsite: "",
    hasDomainGlobal: "",
    domainNameGlobal: "",
    hasGBPGlobal: "",
    gbpLink: "",
    siteChanges: "",
    bookingSystem: "",
    bookingSystemOther: "",
    bookingEmbedLink: "",
    brandColorValues: "",
    featuresWanted: [],
    yearsInBusiness: "",
    businessPhone: "",
    businessEmail: "",
    businessAddress: "",
    businessHours: "",
    tagline: "",
    socialMediaUrls: "",
    needsProfessionalEmail: "",
    addressIsPrivate: "",
    domainPreference: "",
    websiteTone: "",
    targetAudience: "",
    serviceArea: "",
    primaryCTA: [],
    servicesOffered: "",
    crmNeeds: [],
    crmCurrentTools: "",
    crmUsers: "",
    crmPainPoint: "",
    competitorsInspiration: "",
    timeline: "",
    budget: "",
    additionalInfo: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    details: false,
    services: false,
    website: false,
    gbp: false,
    social: false,
    logo: false,
    print: false,
    crm: false,
    competition: false,
    timeline: false,
    anything: false,
  });

  const mainSectionOrder = ["basic", "details", "services", "competition", "timeline", "anything"];

  // Calculate progress based on section completion
  useEffect(() => {
    // Each main section worth equal weight
    const sections: { filled: number; total: number }[] = [];

    // Section 1: Basic Info (7 key fields)
    const basic = { filled: 0, total: 7 };
    if (formData.name) basic.filled++;
    if (formData.email) basic.filled++;
    if (formData.phone) basic.filled++;
    if (formData.businessName) basic.filled++;
    if (formData.businessDescription) basic.filled++;
    if (formData.hasWebsite) basic.filled++;
    if (formData.hasDomainGlobal) basic.filled++;
    sections.push(basic);

    // Section 2: Business Details (5 key fields)
    const details = { filled: 0, total: 5 };
    if (formData.businessPhone) details.filled++;
    if (formData.businessEmail) details.filled++;
    if (formData.businessAddress) details.filled++;
    if (formData.businessHours) details.filled++;
    if (formData.yearsInBusiness) details.filled++;
    sections.push(details);

    // Section 3: Services (1 + conditional)
    const services = { filled: 0, total: 1 };
    if (formData.services.length > 0) services.filled++;
    sections.push(services);

    // Section 4: Conditional service sections
    if (formData.services.includes("Website")) {
      const web = { filled: 0, total: 5 };
      if (formData.websiteGoals.length > 0) web.filled++;
      if (formData.websiteType) web.filled++;
      if (formData.pages.length > 0) web.filled++;
      if (formData.hasLogo) web.filled++;
      if (formData.hasBrandColors) web.filled++;
      sections.push(web);
    }

    if (formData.services.includes("Google Business Profile")) {
      const gbp = { filled: 0, total: 1 };
      if (formData.businessType) gbp.filled++;
      sections.push(gbp);
    }

    if (formData.services.includes("Social Media Setup")) {
      const social = { filled: 0, total: 1 };
      if (formData.socialPlatforms.length > 0) social.filled++;
      sections.push(social);
    }

    if (formData.services.includes("Logo Design")) {
      const logo = { filled: 0, total: 1 };
      if (formData.logoVibe.length > 0) logo.filled++;
      sections.push(logo);
    }

    if (formData.services.includes("CRM & Business Dashboard")) {
      const crm = { filled: 0, total: 1 };
      if (formData.crmNeeds.length > 0) crm.filled++;
      sections.push(crm);
    }

    // Section 5: Competition (1 field)
    const comp = { filled: 0, total: 1 };
    if (formData.competitorsInspiration) comp.filled++;
    sections.push(comp);

    // Section 6: Timeline (1 field)
    const time = { filled: 0, total: 1 };
    if (formData.timeline) time.filled++;
    sections.push(time);

    const totalFields = sections.reduce((sum, s) => sum + s.total, 0);
    const filledFields = sections.reduce((sum, s) => sum + s.filled, 0);
    const progressPercent = totalFields > 0 ? Math.round((filledFields / totalFields) * 100) : 0;
    setProgress(progressPercent);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "27068209-3ff0-4c82-a1ed-e67558c5ffa4",
          subject: `New Inquiry from ${formData.name} — ${formData.businessName || "No business name"}`,
          from_name: "TheKhan Start",
          ...formData,
          // Format arrays for email
          services: formData.services.join(", "),
          websiteGoals: formData.websiteGoals.join(", "),
          paymentTypes: formData.paymentTypes.join(", "),
          pages: formData.pages.join(", "),
          featuresWanted: formData.featuresWanted.join(", "),
          contactFormTypes: formData.contactFormTypes.join(", "),
          socialPlatforms: formData.socialPlatforms.join(", "),
          logoVibe: formData.logoVibe.join(", "),
          printItems: formData.printItems.join(", "),
          primaryCTA: formData.primaryCTA.join(", "),
          crmNeeds: formData.crmNeeds.join(", "),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayValue = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((v) => v !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const toggleSection = (key: string) => {
    setOpenSections((prev) => {
      const isOpening = !prev[key];
      if (isOpening) {
        // Accordion: close all main sections, open the clicked one
        const next: Record<string, boolean> = {};
        for (const k in prev) {
          next[k] = mainSectionOrder.includes(k) ? false : prev[k];
        }
        next[key] = true;
        return next;
      }
      return { ...prev, [key]: false };
    });
    // Scroll to section after a tick
    setTimeout(() => {
      document.getElementById(`section-${key}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const goToNextSection = (currentKey: string) => {
    const idx = mainSectionOrder.indexOf(currentKey);
    if (idx < mainSectionOrder.length - 1) {
      const nextKey = mainSectionOrder[idx + 1];
      setOpenSections((prev) => {
        const next: Record<string, boolean> = {};
        for (const k in prev) {
          next[k] = mainSectionOrder.includes(k) ? false : prev[k];
        }
        next[nextKey] = true;
        // Also open conditional sections if services is being closed and we're moving past it
        return next;
      });
      setTimeout(() => {
        document.getElementById(`section-${nextKey}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 350);
    }
  };

  const inputClasses =
    "w-full px-4 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.12] text-white placeholder:text-[#707070] focus:outline-none focus:border-[#2563eb]/60 focus:ring-2 focus:ring-[#2563eb]/20 transition-all duration-300";

  const labelClasses = "block text-sm font-medium text-[#d4d4d4] mb-2";

  const sectionClasses = "space-y-6 mb-4 pb-4 border-b border-white/[0.06]";

  const sectionTitleClasses = "text-2xl md:text-3xl font-semibold text-white mb-6 tracking-[0.15em] uppercase";

  const SectionHeader = ({ sectionKey, title, subtitle }: { sectionKey: string; title: string; subtitle?: string }) => (
    <button
      type="button"
      id={`section-${sectionKey}`}
      onClick={() => toggleSection(sectionKey)}
      className="w-full flex items-center justify-between cursor-pointer group scroll-mt-16"
    >
      <div className="text-left">
        <h2
          className="text-2xl md:text-3xl font-semibold text-white tracking-[0.15em] uppercase group-hover:text-[#2563eb] transition-colors"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {title}
        </h2>
        {subtitle && !openSections[sectionKey] && <p className="text-sm text-[#a3a3a3] mt-2">{subtitle}</p>}
      </div>
      <motion.div
        animate={{ rotate: openSections[sectionKey] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-[#a3a3a3] group-hover:text-[#2563eb] transition-colors shrink-0 ml-4"
      >
        <IconChevronDown size={24} />
      </motion.div>
    </button>
  );

  const ContinueButton = ({ sectionKey }: { sectionKey: string }) => (
    <div className="pt-4">
      <MovingBorderButton
        as="div"
        borderRadius="9999px"
        containerClassName="h-12 w-40 cursor-pointer hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-200 ease-out active:scale-[0.98]"
        className="text-sm px-6 tracking-wide"
        duration={3000}
        onClick={() => goToNextSection(sectionKey)}
      >
        Continue
      </MovingBorderButton>
    </div>
  );

  const questionnaireHelmet = (
    <SEO
      title="Tell Me About Your Business | TheKhan"
      description="Tell me about your business — websites, software, AI, or marketing. I'll use this to prepare for our first conversation."
      canonical="https://thekhan.io/start"
      noindex
    />
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {questionnaireHelmet}
        <BackgroundPaths />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="rounded-2xl bg-[#111111] border border-white/[0.08] p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] flex items-center justify-center"
              >
                <IconCheck className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-semibold text-white mb-4 tracking-[0.15em] uppercase" style={{ fontFamily: "'Cinzel', serif" }}>
                Thank You!
              </h2>
              <p className="text-[#d4d4d4] mb-6">
                I&apos;ll review everything and reach out within 24 hours.
              </p>
              <Link
                to="/"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white font-medium hover:opacity-90 transition-opacity"
              >
                Return to Homepage
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      {questionnaireHelmet}
      <BackgroundPaths />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-white/[0.08]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] shadow-[0_0_10px_rgba(37,99,235,0.4)]"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-end px-4 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm">
          <span className="text-xs text-[#a3a3a3]">{progress}% complete</span>
        </div>
      </div>

      <div className="relative z-10 pt-14 pb-8 md:pt-20 md:pb-16 px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="mb-6 md:mb-8 flex justify-center">
              <Logo variant="white" size="lg" type="full" />
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-3 md:mb-4 text-white tracking-[0.15em] uppercase px-2"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Tell Me About Your Business
            </h1>
            <p className="text-base md:text-lg text-[#d4d4d4] px-4">
              The more we know upfront, the better our first conversation will be.
            </p>
            {pkg && (
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#2563eb]/15 to-[#06b6d4]/15 border border-[#2563eb]/30">
                  <span className="text-sm font-semibold text-white">{pkg.name}</span>
                  <span className="text-sm font-semibold text-[#06b6d4]">{pkg.price}</span>
                </div>
                {addonNames.map((id) => {
                  const label = ({
                    "google-ads": "Google Ads",
                    "ai-chatbot": "AI Chatbot",
                    "ai-receptionist": "AI Receptionist",
                    "gbp": "Google Business Profile",
                    "social-media": "Social Media",
                    "logo": "Logo & Branding",
                    "print": "Print Design",
                  } as Record<string, string>)[id];
                  return label ? (
                    <div key={id} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-[#d4d4d4]">
                      <IconCheck className="w-3 h-3 text-[#06b6d4]" />
                      {label}
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Section 1: Basic Info */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="basic" title="Basic Information" />
              <AnimatePresence>
                {openSections.basic && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>
                    Name <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    Email <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>
                    Phone <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className={inputClasses}
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClasses}>
                    Business Name <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>What does your business do?</label>
                <input
                  type="text"
                  placeholder="1-2 sentences"
                  className={inputClasses}
                  value={formData.businessDescription}
                  onChange={(e) => updateField("businessDescription", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Who are your ideal customers?</label>
                <input
                  type="text"
                  placeholder="e.g., homeowners in their 40s-60s, small business owners, families with kids..."
                  className={inputClasses}
                  value={formData.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Where do you serve?</label>
                <input
                  type="text"
                  placeholder="e.g., North Shore IL, all of Cook County, nationwide..."
                  className={inputClasses}
                  value={formData.serviceArea}
                  onChange={(e) => updateField("serviceArea", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Preferred Contact Method</label>
                <div className="flex flex-wrap gap-3">
                  {["Call", "Text", "Email", "WhatsApp"].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => updateField("preferredContact", method)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.preferredContact === method
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClasses}>Who&apos;s the decision maker on this project?</label>
                <div className="flex flex-wrap gap-3">
                  {["Me", "Me + business partner", "Someone else"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("decisionMaker", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.decisionMaker === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.decisionMaker === "Someone else" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>Who should we loop in? (name and role)</label>
                    <input
                      type="text"
                      placeholder="e.g., John Smith - Business Owner"
                      className={inputClasses}
                      value={formData.decisionMakerOther}
                      onChange={(e) => updateField("decisionMakerOther", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelClasses}>How did you hear about me?</label>
                <div className="flex flex-wrap gap-3">
                  {["Google", "Referral", "Social Media", "Other"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("hearAboutUs", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.hearAboutUs === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.hearAboutUs === "Referral" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>Who referred you?</label>
                    <input
                      type="text"
                      placeholder="Name or business name"
                      className={inputClasses}
                      value={formData.referralSource}
                      onChange={(e) => updateField("referralSource", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Social Media" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>Which social media platform?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Facebook", "Instagram", "LinkedIn", "Other"].map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => updateField("socialMediaSource", platform)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.socialMediaSource === platform
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Social Media" && formData.socialMediaSource === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>Which platform?</label>
                    <input
                      type="text"
                      placeholder="e.g., TikTok, Twitter, etc."
                      className={inputClasses}
                      value={formData.hearAboutUsOther}
                      onChange={(e) => updateField("hearAboutUsOther", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Other" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>How did you hear about me?</label>
                    <input
                      type="text"
                      placeholder="Please tell me..."
                      className={inputClasses}
                      value={formData.hearAboutUsOther}
                      onChange={(e) => updateField("hearAboutUsOther", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelClasses}>Do you have a website?</label>
                <div className="flex flex-wrap gap-3">
                  {["Yes", "No"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("hasWebsite", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.hasWebsite === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.hasWebsite === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>What&apos;s the URL?</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      className={inputClasses}
                      value={formData.websiteUrl}
                      onChange={(e) => updateField("websiteUrl", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelClasses}>Do you have a domain?</label>
                <div className="flex flex-wrap gap-3">
                  {["Yes", "No, I need help getting one", "Not sure"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("hasDomainGlobal", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.hasDomainGlobal === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.hasDomainGlobal === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className={labelClasses}>What&apos;s the domain?</label>
                      <input
                        type="text"
                        placeholder="example.com"
                        className={inputClasses}
                        value={formData.domainNameGlobal}
                        onChange={(e) => updateField("domainNameGlobal", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelClasses}>Where is it registered?</label>
                      <div className="flex flex-wrap gap-3">
                        {["GoDaddy", "Namecheap", "Google", "Cloudflare", "Other", "Not sure"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("domainRegistrar", option)}
                            className={cn(
                              "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                              formData.domainRegistrar === option
                                ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <AnimatePresence>
                      {formData.domainRegistrar === "Other" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label className={labelClasses}>Which registrar?</label>
                          <input
                            type="text"
                            placeholder="e.g., Squarespace, Wix, etc."
                            className={inputClasses}
                            value={formData.domainRegistrarOther}
                            onChange={(e) => updateField("domainRegistrarOther", e.target.value)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hasDomainGlobal === "No, I need help getting one" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>What domain do you want?</label>
                    <input
                      type="text"
                      placeholder="e.g., mybusiness.com, mybusinesschicago.com"
                      className={inputClasses}
                      value={formData.domainPreference}
                      onChange={(e) => updateField("domainPreference", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className={labelClasses}>Is your Google Business Profile set up?</label>
                <div className="flex flex-wrap gap-3">
                  {["Yes", "No", "Not sure"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("hasGBPGlobal", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.hasGBPGlobal === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.hasGBPGlobal === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>Paste the link to your Google Business Profile</label>
                    <input
                      type="url"
                      placeholder="https://g.co/kgs/..."
                      className={inputClasses}
                      value={formData.gbpLink}
                      onChange={(e) => updateField("gbpLink", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="basic" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Business Details (for the website) */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="details" title="Business Details" subtitle="This info helps me scope your project. If you have multiple businesses, provide details for your primary one here." />
              <AnimatePresence>
                {openSections.details && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >

              <div>
                <label className={labelClasses}>How long have you been in business?</label>
                <input
                  type="text"
                  placeholder="e.g., 5 years, just starting, 20+ years"
                  className={inputClasses}
                  value={formData.yearsInBusiness}
                  onChange={(e) => updateField("yearsInBusiness", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClasses}>Business Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 123-4567"
                    className={inputClasses}
                    value={formData.businessPhone}
                    onChange={(e) => updateField("businessPhone", e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelClasses}>Business Email</label>
                  <input
                    type="email"
                    placeholder="info@yourbusiness.com"
                    className={inputClasses}
                    value={formData.businessEmail}
                    onChange={(e) => updateField("businessEmail", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className={labelClasses}>Business Address</label>
                <input
                  type="text"
                  placeholder="123 Main St, City, State ZIP"
                  className={inputClasses}
                  value={formData.businessAddress}
                  onChange={(e) => updateField("businessAddress", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Is this a home address you&apos;d like kept private?</label>
                <p className="text-sm text-[#a3a3a3] mb-3">We won&apos;t display it on your website if so</p>
                <div className="flex flex-wrap gap-3">
                  {["Yes, keep it private", "No, display it on the site"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("addressIsPrivate", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.addressIsPrivate === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClasses}>Business Hours</label>
                <input
                  type="text"
                  placeholder="e.g., Mon-Fri 9am-5pm, Sat 10am-2pm"
                  className={inputClasses}
                  value={formData.businessHours}
                  onChange={(e) => updateField("businessHours", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Tagline or Slogan (if you have one)</label>
                <input
                  type="text"
                  placeholder="e.g., &quot;Quality you can trust&quot;"
                  className={inputClasses}
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Social media profile links</label>
                <textarea
                  className={inputClasses}
                  rows={3}
                  placeholder="Paste any links — Facebook, Instagram, LinkedIn, Yelp, etc."
                  value={formData.socialMediaUrls}
                  onChange={(e) => updateField("socialMediaUrls", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Do you need a professional email set up?</label>
                <p className="text-sm text-[#a3a3a3] mb-3">e.g., info@yourbusiness.com instead of a Gmail or Yahoo address</p>
                <div className="flex flex-wrap gap-3">
                  {["Yes", "No", "Already have one"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => updateField("needsProfessionalEmail", option)}
                      className={cn(
                        "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                        formData.needsProfessionalEmail === option
                          ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                          : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                      )}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence>
                {formData.needsProfessionalEmail === "Yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>What email do you want? (e.g., info@yourbusiness.com)</label>
                    <input
                      type="text"
                      placeholder="info@yourbusiness.com"
                      className={inputClasses}
                      value={formData.businessEmail}
                      onChange={(e) => updateField("businessEmail", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.needsProfessionalEmail === "Already have one" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label className={labelClasses}>What is it?</label>
                    <input
                      type="email"
                      placeholder="info@yourbusiness.com"
                      className={inputClasses}
                      value={formData.businessEmail}
                      onChange={(e) => updateField("businessEmail", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="details" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2: Services */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="services" title="Services Interested In" subtitle="Select all that apply — you can choose multiple services" />
              <AnimatePresence>
                {openSections.services && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
              <div className="flex flex-wrap gap-3">
                {[
                  "Website",
                  "Custom Software / Web App",
                  "SEO / Search Optimization",
                  "Google Ads / Paid Advertising",
                  "AI Chatbot (Website)",
                  "AI Receptionist (Phone)",
                  "Google Business Profile",
                  "Social Media Setup",
                  "Logo Design",
                  "CRM & Business Dashboard",
                  "Print Design (brochures, flyers, business cards)",
                  "Other",
                ].map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleArrayValue("services", service)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                      formData.services.includes(service)
                        ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                        : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                    )}
                  >
                    {service}
                  </button>
                ))}
              </div>


              {/* Services Other Text Field */}
              <AnimatePresence>
                {formData.services.includes("Other") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <label className={labelClasses}>What do you need?</label>
                    <input
                      type="text"
                      placeholder="Tell me what you're looking for..."
                      className={inputClasses}
                      value={formData.servicesOther}
                      onChange={(e) => updateField("servicesOther", e.target.value)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="services" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 3: Conditional Questions */}

            {/* Website Questions */}
            <AnimatePresence>
              {formData.services.includes("Website") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Website Questions</h2>

                  <div>
                    <label className={labelClasses}>What&apos;s the main goal of your website?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Generate leads", "Book appointments", "Sell products online", "Collect payments", "Provide information", "Build credibility"].map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleArrayValue("websiteGoals", goal)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.websiteGoals.includes(goal)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>What should visitors do on your site?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Call us", "Fill out a form", "Book online", "Request a quote", "Buy a product", "Get directions"].map((cta) => (
                        <button
                          key={cta}
                          type="button"
                          onClick={() => toggleArrayValue("primaryCTA", cta)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.primaryCTA.includes(cta)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {cta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>What services or products do you offer?</label>
                    <textarea
                      className={inputClasses}
                      rows={3}
                      placeholder="List your main services or products — this helps me plan your site structure and pages"
                      value={formData.servicesOffered}
                      onChange={(e) => updateField("servicesOffered", e.target.value)}
                    />
                  </div>

                  <AnimatePresence>
                    {formData.websiteGoals.includes("Sell products online") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                      >
                        <div>
                          <label className={labelClasses}>Approximately how many products?</label>
                          <div className="flex flex-wrap gap-3">
                            {["1-10", "11-50", "51-100", "100+"].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => updateField("productCount", option)}
                                className={cn(
                                  "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                  formData.productCount === option
                                    ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                    : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className={labelClasses}>Do you have a payment processor?</label>
                          <div className="flex flex-wrap gap-3">
                            {["Stripe", "Square", "PayPal", "Not yet", "Not sure"].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => updateField("paymentProcessor", option)}
                                className={cn(
                                  "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                  formData.paymentProcessor === option
                                    ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                    : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.websiteGoals.includes("Collect payments") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>What kind of payments?</label>
                        <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                        <div className="flex flex-wrap gap-3">
                          {["One-time payments", "Recurring/subscriptions", "Deposits", "Invoices", "Not sure"].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => toggleArrayValue("paymentTypes", type)}
                              className={cn(
                                "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                formData.paymentTypes.includes(type)
                                  ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                  : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hasWebsite === "Yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>What should we keep, change, or remove from your current site?</label>
                        <textarea
                          className={inputClasses}
                          rows={3}
                          placeholder="E.g., keep the reviews section, remove the blog, update the services page, change the color scheme..."
                          value={formData.siteChanges}
                          onChange={(e) => updateField("siteChanges", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Is this a redesign or brand new site?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Redesign", "Brand new"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("websiteType", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.websiteType === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>How many websites do you need?</label>
                    <div className="flex flex-wrap gap-3">
                      {["1", "2", "3+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("websiteCount", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.websiteCount === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {(formData.websiteCount === "2" || formData.websiteCount === "3+") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Are these for the same business or different businesses?</label>
                        <div className="flex flex-wrap gap-3">
                          {["Same business", "Different businesses or brands"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateField("websiteBusinessType", option)}
                              className={cn(
                                "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                formData.websiteBusinessType === option
                                  ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                  : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {(formData.websiteCount === "2" || formData.websiteCount === "3+") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Please describe each site</label>
                        <p className="text-sm text-[#a3a3a3] mb-3">Include the business name, what it does, and who it serves for each</p>
                        <textarea
                          className={inputClasses}
                          rows={5}
                          placeholder={"Site 1: [Business name] — [what it does] — [who it serves]\nSite 2: [Business name] — [what it does] — [who it serves]\nSite 3: ...\nSite 4: ..."}
                          value={formData.multipleWebsitesDescription}
                          onChange={(e) => updateField("multipleWebsitesDescription", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Do you have hosting?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasHosting", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasHosting === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.hasHosting === "Yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Who is your hosting with?</label>
                        <div className="flex flex-wrap gap-3">
                          {["Vercel", "GoDaddy", "Bluehost", "Hostinger", "Other"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateField("hostingProvider", option)}
                              className={cn(
                                "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                formData.hostingProvider === option
                                  ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                  : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hostingProvider === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Type your hosting provider</label>
                        <input
                          type="text"
                          placeholder="e.g., AWS, DigitalOcean, etc."
                          className={inputClasses}
                          value={formData.hostingProviderOther}
                          onChange={(e) => updateField("hostingProviderOther", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Do you have a logo?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No, I need one"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasLogo", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasLogo === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Do you have brand colors?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasBrandColors", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasBrandColors === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.hasBrandColors === "Yes" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>What are your brand colors?</label>
                        <input
                          type="text"
                          placeholder="e.g., blue, white, red or #003366, #FFFFFF, #CC0000"
                          className={inputClasses}
                          value={formData.brandColorValues}
                          onChange={(e) => updateField("brandColorValues", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Do you have copy (text content) ready?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "I'll use my current site's copy"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasCopy", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasCopy === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Do you have photos/images ready?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "I'll use my current site's images"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasPhotos", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasPhotos === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>What pages do you need?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Home", "About", "Services", "Contact", "Gallery", "Reviews", "Blog", "Pricing", "FAQ", "Other"].map((page) => (
                        <button
                          key={page}
                          type="button"
                          onClick={() => toggleArrayValue("pages", page)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.pages.includes(page)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.pages.includes("Other") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>What pages?</label>
                        <input
                          type="text"
                          placeholder="Portfolio, Blog, Shop, etc."
                          className={inputClasses}
                          value={formData.otherPages}
                          onChange={(e) => updateField("otherPages", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Any reference sites you like?</label>
                    <textarea
                      className={inputClasses}
                      rows={2}
                      placeholder="Share URLs or describe the style you're looking for..."
                      value={formData.referenceSites}
                      onChange={(e) => updateField("referenceSites", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>What tone should the website have?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Professional", "Friendly & casual", "Warm & family-oriented", "Bold & confident", "Clean & minimal"].map((tone) => (
                        <button
                          key={tone}
                          type="button"
                          onClick={() => updateField("websiteTone", tone)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.websiteTone === tone
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {tone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Do you need a contact form, or just email/phone?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Contact Form", "Email/Phone Only", "Both"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("needsContactForm", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.needsContactForm === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {(formData.needsContactForm === "Contact Form" || formData.needsContactForm === "Both") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>What kind of contact form?</label>
                        <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                        <div className="flex flex-wrap gap-3">
                          {[
                            "Simple contact form",
                            "Quote request",
                            "Booking/scheduling",
                            "Lead capture with multiple fields",
                            "Other"
                          ].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => toggleArrayValue("contactFormTypes", type)}
                              className={cn(
                                "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                                formData.contactFormTypes.includes(type)
                                  ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                                  : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                              )}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.contactFormTypes.includes("Other") && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Describe your contact form needs</label>
                        <input
                          type="text"
                          placeholder="Tell me what you need..."
                          className={inputClasses}
                          value={formData.contactFormOther}
                          onChange={(e) => updateField("contactFormOther", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Do you have a booking/scheduling system?</label>
                    <div className="flex flex-wrap gap-3">
                      {["ResponsiBid", "Calendly", "Square", "None", "Other"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("bookingSystem", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.bookingSystem === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.bookingSystem === "Other" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Which booking system?</label>
                        <input
                          type="text"
                          placeholder="e.g., Acuity, HouseCall Pro, Jobber, etc."
                          className={inputClasses}
                          value={formData.bookingSystemOther}
                          onChange={(e) => updateField("bookingSystemOther", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.bookingSystem && formData.bookingSystem !== "None" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={labelClasses}>Embed link or URL (if you have it)</label>
                        <input
                          type="text"
                          placeholder="https://..."
                          className={inputClasses}
                          value={formData.bookingEmbedLink}
                          onChange={(e) => updateField("bookingEmbedLink", e.target.value)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label className={labelClasses}>Any features you specifically want?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Animations", "Photo Gallery", "Reviews/Testimonials", "FAQ Section", "Service Area Map", "Social Media Links", "Live Chat"].map((feature) => (
                        <button
                          key={feature}
                          type="button"
                          onClick={() => toggleArrayValue("featuresWanted", feature)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.featuresWanted.includes(feature)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {feature}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Any other integrations needed?</label>
                    <input
                      type="text"
                      placeholder="Stripe, CRM, email marketing, etc."
                      className={inputClasses}
                      value={formData.integrations}
                      onChange={(e) => updateField("integrations", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Google Business Profile Questions */}
            <AnimatePresence>
              {formData.services.includes("Google Business Profile") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Google Business Profile Questions</h2>

                  <div>
                    <label className={labelClasses}>Physical location or service area business?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Physical location", "Service area", "Both"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("businessType", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.businessType === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Media Questions */}
            <AnimatePresence>
              {formData.services.includes("Social Media Setup") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Social Media Questions</h2>

                  <div>
                    <label className={labelClasses}>Which platforms?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Facebook", "Instagram", "LinkedIn"].map((platform) => (
                        <button
                          key={platform}
                          type="button"
                          onClick={() => toggleArrayValue("socialPlatforms", platform)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.socialPlatforms.includes(platform)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {platform}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Do you have existing accounts?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "Some"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasExistingSocial", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasExistingSocial === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo Design Questions */}
            <AnimatePresence>
              {formData.services.includes("Logo Design") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Logo Design Questions</h2>

                  <div>
                    <label className={labelClasses}>Do you have any ideas or inspiration?</label>
                    <textarea
                      className={inputClasses}
                      rows={3}
                      placeholder="Share any ideas, styles you like, or reference logos..."
                      value={formData.logoIdeas}
                      onChange={(e) => updateField("logoIdeas", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>What vibe?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Modern", "Playful", "Corporate", "Minimal", "Other"].map((vibe) => (
                        <button
                          key={vibe}
                          type="button"
                          onClick={() => toggleArrayValue("logoVibe", vibe)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.logoVibe.includes(vibe)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {vibe}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Print Design Questions */}
            <AnimatePresence>
              {formData.services.includes("Print Design (brochures, flyers, business cards)") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Print Design Questions</h2>

                  <div>
                    <label className={labelClasses}>What do you need?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Brochures", "Flyers", "Business cards"].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleArrayValue("printItems", item)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.printItems.includes(item)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>Do you have content ready?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasPrintContent", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasPrintContent === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CRM & Business Dashboard Questions */}
            <AnimatePresence>
              {formData.services.includes("CRM & Business Dashboard") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>CRM & Business Dashboard</h2>

                  <div>
                    <label className={labelClasses}>What do you need help with?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Lead tracking", "Invoicing", "Scheduling", "Email marketing", "Customer database", "Automations", "Other"].map((need) => (
                        <button
                          key={need}
                          type="button"
                          onClick={() => toggleArrayValue("crmNeeds", need)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.crmNeeds.includes(need)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {need}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>What tools do you currently use?</label>
                    <input
                      type="text"
                      placeholder="e.g., spreadsheets, pen & paper, HubSpot, Jobber, nothing yet..."
                      className={inputClasses}
                      value={formData.crmCurrentTools}
                      onChange={(e) => updateField("crmCurrentTools", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>How many people need access?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Just me", "2-5", "6-10", "10+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("crmUsers", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.crmUsers === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClasses}>What&apos;s your biggest pain point with how you manage leads or clients right now?</label>
                    <textarea
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., leads fall through the cracks, no follow-up system, everything is in my head..."
                      value={formData.crmPainPoint}
                      onChange={(e) => updateField("crmPainPoint", e.target.value)}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Section 4: Competition & Inspiration */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="competition" title="Competition & Inspiration" />
              <AnimatePresence>
                {openSections.competition && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className={labelClasses}>Any competitors or businesses you admire?</label>
                      <textarea
                        className={inputClasses}
                        rows={3}
                        placeholder="Links or names of businesses whose style you like"
                        value={formData.competitorsInspiration}
                        onChange={(e) => updateField("competitorsInspiration", e.target.value)}
                      />
                    </div>
                    <ContinueButton sectionKey="competition" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 5: Timeline & Budget */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="timeline" title="Timeline & Budget" />
              <AnimatePresence>
                {openSections.timeline && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className={labelClasses}>When do you need this done?</label>
                      <input
                        type="text"
                        placeholder="ASAP, 2 weeks, by end of month, etc."
                        className={inputClasses}
                        value={formData.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className={labelClasses}>Budget range (optional)</label>
                      <input
                        type="text"
                        placeholder="$500-$1000, $2000-$5000, etc."
                        className={inputClasses}
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                      />
                    </div>
                    <ContinueButton sectionKey="timeline" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 6: Anything Else */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="anything" title="Anything Else?" />
              <AnimatePresence>
                {openSections.anything && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label className={labelClasses}>Additional information or questions</label>
                      <textarea
                        className={inputClasses}
                        rows={4}
                        placeholder="Share any other details, questions, or special requirements..."
                        value={formData.additionalInfo}
                        onChange={(e) => updateField("additionalInfo", e.target.value)}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Media Upload Callout */}
            <div className="rounded-xl bg-[#0a0a0a] border border-[#2563eb]/20 p-5">
              <p className="text-sm font-medium text-[#2563eb] mb-2">
                Have logos, photos, or videos?
              </p>
              <p className="text-sm text-[#a3a3a3]">
                Email them to{" "}
                <a href="mailto:omair@thekhan.io" className="text-white hover:text-[#2563eb] transition-colors">
                  Omair@TheKhan.io
                </a>
                {" "}with your business name in the subject line. The more we have, the faster we can move.
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-6 pb-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative inline-flex h-14 w-full md:w-auto md:px-16 items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <IconLoader2 className="animate-spin" size={20} />
                    Submitting...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
