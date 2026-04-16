import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { m, AnimatePresence } from "framer-motion";
import { IconCheck, IconLoader2, IconChevronDown } from "@tabler/icons-react";
import { Button as MovingBorderButton } from "@/components/ui/moving-border";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Link } from "react-router-dom";

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
  websiteToneNotes: string;

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

  // Intent router (first section)
  intent: string[];

  // Marketing Intake (conditional on intent includes Ongoing marketing or Both)
  currentMonthlyLeads: string;
  currentReviewCount: string;
  currentReviewRating: string;
  currentAdSpend: string;
  currentAdPlatforms: string[];
  currentAgency: string;
  currentAgencyDetails: string;
  averageJobValue: string;
  capacityForMore: string;
  seasonality: string;
  mainGoal: string[];
  mainGoalOther: string;
  mainPainPoint: string;
  topCompetitors: string;

  // Marketing Intake — Current Tracking & Team (Fix 4)
  hasCallTracking: string;
  hasGA4: string;
  currentCRM: string;
  leadSourceMix: string;
  teamSize: string;
  monthlyRevenueBallpark: string;

  // Custom Software / Web App (Fix 2)
  customSoftwareDescription: string;
  customSoftwarePlatform: string;
  customSoftwareUsers: string;
  customSoftwareIntegrations: string;
  customSoftwareExistingTools: string;

  // AI Chatbot (Fix 9)
  aiChatbotPurpose: string[];
  aiChatbotKnowledge: string[];
  aiChatbotHandoff: string;
  aiChatbotChannels: string[];
  aiChatbotExistingChat: string;

  // AI Receptionist (Fix 10)
  aiReceptionistPurpose: string;
  aiReceptionistTasks: string[];
  aiReceptionistCallVolume: string;
  aiReceptionistVoicePreference: string;
  aiReceptionistTransferRules: string;
  aiReceptionistCurrentSetup: string;

  // Google Ads / LSA (Fix 11)
  adsCurrentCostPerLead: string;
  adsConversionTracking: string;
  adsAccountOwnership: string;
  adsTakeoverPreference: string;
  adsTargetService: string;
  adsTargetGeo: string;
  adsBudgetWillingness: string;
}

const INTENT_TO_SERVICES: Record<string, string[]> = {
  "New website or rebuild": ["Website"],
  "Ongoing marketing — make my phone ring": [
    "SEO / Search Optimization",
    "Google Business Profile",
    "Google Ads / Paid Advertising",
  ],
  "Both — new site + ongoing marketing": [
    "Website",
    "SEO / Search Optimization",
    "Google Business Profile",
    "Google Ads / Paid Advertising",
  ],
  "Custom software, dashboard, or business system": [
    "Custom Software / Web App",
    "CRM & Business Dashboard",
  ],
  "AI chatbot (website)": ["AI Chatbot (Website)"],
  "AI receptionist (phone)": ["AI Receptionist (Phone)"],
  "Something else": ["Other"],
};

export default function QuestionnairePage() {
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
    services: [],
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
    websiteToneNotes: "",
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
    intent: [],
    currentMonthlyLeads: "",
    currentReviewCount: "",
    currentReviewRating: "",
    currentAdSpend: "",
    currentAdPlatforms: [],
    currentAgency: "",
    currentAgencyDetails: "",
    averageJobValue: "",
    capacityForMore: "",
    seasonality: "",
    mainGoal: [],
    mainGoalOther: "",
    mainPainPoint: "",
    topCompetitors: "",
    hasCallTracking: "",
    hasGA4: "",
    currentCRM: "",
    leadSourceMix: "",
    teamSize: "",
    monthlyRevenueBallpark: "",
    customSoftwareDescription: "",
    customSoftwarePlatform: "",
    customSoftwareUsers: "",
    customSoftwareIntegrations: "",
    customSoftwareExistingTools: "",
    aiChatbotPurpose: [],
    aiChatbotKnowledge: [],
    aiChatbotHandoff: "",
    aiChatbotChannels: [],
    aiChatbotExistingChat: "",
    aiReceptionistPurpose: "",
    aiReceptionistTasks: [],
    aiReceptionistCallVolume: "",
    aiReceptionistVoicePreference: "",
    aiReceptionistTransferRules: "",
    aiReceptionistCurrentSetup: "",
    adsCurrentCostPerLead: "",
    adsConversionTracking: "",
    adsAccountOwnership: "",
    adsTakeoverPreference: "",
    adsTargetService: "",
    adsTargetGeo: "",
    adsBudgetWillingness: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    intent: true,
    basic: false,
    details: false,
    services: false,
    marketing: false,
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

  const mainSectionOrder = ["intent", "basic", "details", "services", "marketing", "competition", "timeline", "anything"];

  // Calculate progress based on section completion
  useEffect(() => {
    // Each main section worth equal weight
    const sections: { filled: number; total: number }[] = [];

    // Intent router (Fix 3)
    const intent = { filled: 0, total: 1 };
    if (formData.intent.length > 0) intent.filled = 1;
    sections.push(intent);

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

    if (formData.services.includes("Custom Software / Web App")) {
      const cs = { filled: 0, total: 5 };
      if (formData.customSoftwareDescription) cs.filled++;
      if (formData.customSoftwarePlatform) cs.filled++;
      if (formData.customSoftwareUsers) cs.filled++;
      if (formData.customSoftwareIntegrations) cs.filled++;
      if (formData.customSoftwareExistingTools) cs.filled++;
      sections.push(cs);
    }

    if (formData.services.includes("AI Chatbot (Website)")) {
      const bot = { filled: 0, total: 5 };
      if (formData.aiChatbotPurpose.length > 0) bot.filled++;
      if (formData.aiChatbotKnowledge.length > 0) bot.filled++;
      if (formData.aiChatbotHandoff) bot.filled++;
      if (formData.aiChatbotChannels.length > 0) bot.filled++;
      if (formData.aiChatbotExistingChat) bot.filled++;
      sections.push(bot);
    }

    if (formData.services.includes("AI Receptionist (Phone)")) {
      const rec = { filled: 0, total: 6 };
      if (formData.aiReceptionistPurpose) rec.filled++;
      if (formData.aiReceptionistTasks.length > 0) rec.filled++;
      if (formData.aiReceptionistCallVolume) rec.filled++;
      if (formData.aiReceptionistVoicePreference) rec.filled++;
      if (formData.aiReceptionistTransferRules) rec.filled++;
      if (formData.aiReceptionistCurrentSetup) rec.filled++;
      sections.push(rec);
    }

    if (formData.services.includes("Google Ads / Paid Advertising")) {
      const ads = { filled: 0, total: 7 };
      if (formData.adsCurrentCostPerLead) ads.filled++;
      if (formData.adsConversionTracking) ads.filled++;
      if (formData.adsAccountOwnership) ads.filled++;
      if (formData.adsTakeoverPreference) ads.filled++;
      if (formData.adsTargetService) ads.filled++;
      if (formData.adsTargetGeo) ads.filled++;
      if (formData.adsBudgetWillingness) ads.filled++;
      sections.push(ads);
    }

    // Marketing Intake (conditional on intent = Ongoing marketing or Both)
    if (
      formData.intent.includes("Ongoing marketing — make my phone ring") ||
      formData.intent.includes("Both — new site + ongoing marketing")
    ) {
      const marketing = { filled: 0, total: 18 };
      if (formData.currentMonthlyLeads) marketing.filled++;
      if (formData.currentReviewCount) marketing.filled++;
      if (formData.currentReviewRating) marketing.filled++;
      if (formData.currentAdSpend) marketing.filled++;
      if (formData.currentAdPlatforms.length > 0) marketing.filled++;
      if (formData.currentAgency) marketing.filled++;
      if (formData.averageJobValue) marketing.filled++;
      if (formData.capacityForMore) marketing.filled++;
      if (formData.seasonality) marketing.filled++;
      if (formData.mainGoal.length > 0) marketing.filled++;
      if (formData.mainPainPoint) marketing.filled++;
      if (formData.topCompetitors) marketing.filled++;
      if (formData.hasCallTracking) marketing.filled++;
      if (formData.hasGA4) marketing.filled++;
      if (formData.currentCRM) marketing.filled++;
      if (formData.leadSourceMix) marketing.filled++;
      if (formData.teamSize) marketing.filled++;
      if (formData.monthlyRevenueBallpark) marketing.filled++;
      sections.push(marketing);
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
          from_name: "TheKhan Form",
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
          intent: formData.intent.join(", "),
          currentAdPlatforms: formData.currentAdPlatforms.join(", "),
          mainGoal: formData.mainGoal.join(", "),
          aiChatbotPurpose: formData.aiChatbotPurpose.join(", "),
          aiChatbotKnowledge: formData.aiChatbotKnowledge.join(", "),
          aiChatbotChannels: formData.aiChatbotChannels.join(", "),
          aiReceptionistTasks: formData.aiReceptionistTasks.join(", "),
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error submitting form:", error);
      }
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

  const toggleIntent = (option: string) => {
    setFormData((prev) => {
      const isOn = prev.intent.includes(option);
      const nextIntent = isOn
        ? prev.intent.filter((v) => v !== option)
        : [...prev.intent, option];

      // Recompute services: union of all still-selected intents' mapped services,
      // plus any services the user added manually that aren't from intents.
      const allIntentServices = new Set<string>();
      Object.values(INTENT_TO_SERVICES).forEach((arr) => arr.forEach((s) => allIntentServices.add(s)));

      const manuallyAdded = prev.services.filter((s) => !allIntentServices.has(s));
      const fromIntents = new Set<string>();
      nextIntent.forEach((i) => {
        (INTENT_TO_SERVICES[i] || []).forEach((s) => fromIntents.add(s));
      });

      const nextServices = [...new Set([...fromIntents, ...manuallyAdded])];
      return { ...prev, intent: nextIntent, services: nextServices };
    });
  };

  const showMarketingIntake =
    formData.intent.includes("Ongoing marketing — make my phone ring") ||
    formData.intent.includes("Both — new site + ongoing marketing");

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
      <m.div
        animate={{ rotate: openSections[sectionKey] ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-[#a3a3a3] group-hover:text-[#2563eb] transition-colors shrink-0 ml-4"
      >
        <IconChevronDown size={24} />
      </m.div>
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

  const questionnaireSEO = (
    <SEO
      title="Tell Me About Your Business | TheKhan"
      description="Tell me about your business — websites, marketing, or custom systems. I'll use this to prepare for our first conversation."
      canonical="https://thekhan.io/form"
      noindex
    />
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {questionnaireSEO}
        <BackgroundPaths />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <m.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <div className="rounded-2xl bg-[#111111] border border-white/[0.08] p-8">
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#2563eb] to-[#06b6d4] flex items-center justify-center"
              >
                <IconCheck className="w-10 h-10 text-white" />
              </m.div>
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
          </m.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      {questionnaireSEO}
      <BackgroundPaths />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-white/[0.08]">
          <m.div
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
            <p className="text-base md:text-lg text-[#d4d4d4] px-4 [text-shadow:0_0_8px_rgba(255,255,255,0.6),0_0_20px_rgba(6,182,212,1),0_0_38px_rgba(6,182,212,0.75),0_0_64px_rgba(6,182,212,0.45)]">
              The more I know upfront, the better our first conversation will be.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Intent Router: What brings you here? */}
            <div className={sectionClasses}>
              <SectionHeader
                sectionKey="intent"
                title="What Brings You Here?"
                subtitle="Pick all that apply — this shapes the rest of the form."
              />
              <AnimatePresence>
                {openSections.intent && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <p className="text-sm text-[#a3a3a3] mb-4">Select all that apply — this shapes the rest of the form.</p>
                      {/* 3×2 grid with vertical divider + full-width catch-all — desktop */}
                      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-y-4">
                        {[
                          ["New website or rebuild", "Ongoing marketing — make my phone ring"],
                          ["Both — new site + ongoing marketing", "Custom software, dashboard, or business system"],
                          ["AI chatbot (website)", "AI receptionist (phone)"],
                        ].map(([left, right], rowIdx) => (
                          <div key={rowIdx} className="contents">
                            <button
                              type="button"
                              onClick={() => toggleIntent(left)}
                              className={cn(
                                "py-4 px-6 rounded-xl text-sm font-medium border transition-all duration-300 cursor-pointer text-left",
                                formData.intent.includes(left)
                                  ? "border-[#2563eb]/60 bg-[#2563eb]/10 text-white shadow-[0_0_16px_rgba(37,99,235,0.25),inset_0_0_16px_rgba(37,99,235,0.1)]"
                                  : "border-white/[0.08] text-[#d4d4d4] hover:border-white/[0.2] hover:text-white"
                              )}
                            >
                              {left}
                            </button>
                            <div className="flex items-center justify-center px-4">
                              <span aria-hidden="true" className="block h-full w-px bg-gradient-to-b from-transparent via-[#06b6d4]/30 to-transparent" />
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleIntent(right)}
                              className={cn(
                                "py-4 px-6 rounded-xl text-sm font-medium border transition-all duration-300 cursor-pointer text-left",
                                formData.intent.includes(right)
                                  ? "border-[#2563eb]/60 bg-[#2563eb]/10 text-white shadow-[0_0_16px_rgba(37,99,235,0.25),inset_0_0_16px_rgba(37,99,235,0.1)]"
                                  : "border-white/[0.08] text-[#d4d4d4] hover:border-white/[0.2] hover:text-white"
                              )}
                            >
                              {right}
                            </button>
                          </div>
                        ))}
                        {/* Something else — full width catch-all */}
                        <button
                          type="button"
                          onClick={() => toggleIntent("Something else")}
                          className={cn(
                            "col-span-3 py-4 px-6 rounded-xl text-sm font-medium border transition-all duration-300 cursor-pointer text-center",
                            formData.intent.includes("Something else")
                              ? "border-[#2563eb]/60 bg-[#2563eb]/10 text-white shadow-[0_0_16px_rgba(37,99,235,0.25),inset_0_0_16px_rgba(37,99,235,0.1)]"
                              : "border-white/[0.08] text-[#d4d4d4] hover:border-white/[0.2] hover:text-white"
                          )}
                        >
                          Something else
                        </button>
                      </div>
                      {/* Mobile: single column, no divider */}
                      <div className="flex flex-col gap-3 md:hidden">
                        {[
                          "New website or rebuild",
                          "Ongoing marketing — make my phone ring",
                          "Both — new site + ongoing marketing",
                          "Custom software, dashboard, or business system",
                          "AI chatbot (website)",
                          "AI receptionist (phone)",
                          "Something else",
                        ].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleIntent(option)}
                            className={cn(
                              "py-4 px-6 rounded-xl text-sm font-medium border transition-all duration-300 cursor-pointer text-left",
                              formData.intent.includes(option)
                                ? "border-[#2563eb]/60 bg-[#2563eb]/10 text-white shadow-[0_0_16px_rgba(37,99,235,0.25),inset_0_0_16px_rgba(37,99,235,0.1)]"
                                : "border-white/[0.08] text-[#d4d4d4] hover:border-white/[0.2] hover:text-white"
                            )}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                    <ContinueButton sectionKey="intent" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Fix 1: Something else inline textarea */}
            <AnimatePresence>
              {formData.intent.includes("Something else") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <label htmlFor="servicesOther" className={labelClasses}>Tell me what you&apos;re looking for</label>
                  <textarea
                    id="servicesOther"
                    className={inputClasses}
                    rows={3}
                    placeholder="Describe what you need — I'll figure out if it's something I can help with"
                    value={formData.servicesOther}
                    onChange={(e) => updateField("servicesOther", e.target.value)}
                  />
                </m.div>
              )}
            </AnimatePresence>

            {/* Section 1: Basic Info */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="basic" title="Basic Information" />
              <AnimatePresence>
                {openSections.basic && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className={labelClasses}>
                    Name <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.name}
                    onChange={(e) => updateField("name", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClasses}>
                    Email <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    id="email"
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
                  <label htmlFor="phone" className={labelClasses}>
                    Phone <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    className={inputClasses}
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className={labelClasses}>
                    Business Name <span className="text-[#2563eb]">*</span>
                  </label>
                  <input
                    id="businessName"
                    type="text"
                    required
                    className={inputClasses}
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessDescription" className={labelClasses}>What does your business do?</label>
                <input
                  id="businessDescription"
                  type="text"
                  placeholder="1-2 sentences"
                  className={inputClasses}
                  value={formData.businessDescription}
                  onChange={(e) => updateField("businessDescription", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="targetAudience" className={labelClasses}>Who are your ideal customers?</label>
                <input
                  id="targetAudience"
                  type="text"
                  placeholder="e.g., homeowners in their 40s-60s, small business owners, families with kids..."
                  className={inputClasses}
                  value={formData.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="serviceArea" className={labelClasses}>Where do you serve?</label>
                <input
                  id="serviceArea"
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="decisionMakerOther" className={labelClasses}>Who should I loop in? (name and role)</label>
                    <input
                      id="decisionMakerOther"
                      type="text"
                      placeholder="e.g., John Smith - Business Owner"
                      className={inputClasses}
                      value={formData.decisionMakerOther}
                      onChange={(e) => updateField("decisionMakerOther", e.target.value)}
                    />
                  </m.div>
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="referralSource" className={labelClasses}>Who referred you?</label>
                    <input
                      id="referralSource"
                      type="text"
                      placeholder="Name or business name"
                      className={inputClasses}
                      value={formData.referralSource}
                      onChange={(e) => updateField("referralSource", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Social Media" && (
                  <m.div
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
                  </m.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Social Media" && formData.socialMediaSource === "Other" && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="hearAboutUsOtherPlatform" className={labelClasses}>Which platform?</label>
                    <input
                      id="hearAboutUsOtherPlatform"
                      type="text"
                      placeholder="e.g., TikTok, Twitter, etc."
                      className={inputClasses}
                      value={formData.hearAboutUsOther}
                      onChange={(e) => updateField("hearAboutUsOther", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hearAboutUs === "Other" && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="hearAboutUsOther" className={labelClasses}>How did you hear about me?</label>
                    <input
                      id="hearAboutUsOther"
                      type="text"
                      placeholder="Please tell me..."
                      className={inputClasses}
                      value={formData.hearAboutUsOther}
                      onChange={(e) => updateField("hearAboutUsOther", e.target.value)}
                    />
                  </m.div>
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="websiteUrl" className={labelClasses}>What&apos;s the URL?</label>
                    <input
                      id="websiteUrl"
                      type="url"
                      placeholder="https://example.com"
                      className={inputClasses}
                      value={formData.websiteUrl}
                      onChange={(e) => updateField("websiteUrl", e.target.value)}
                    />
                  </m.div>
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label htmlFor="domainNameGlobal" className={labelClasses}>What&apos;s the domain?</label>
                      <input
                        id="domainNameGlobal"
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
                        <m.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <label htmlFor="domainRegistrarOther" className={labelClasses}>Which registrar?</label>
                          <input
                            id="domainRegistrarOther"
                            type="text"
                            placeholder="e.g., Squarespace, Wix, etc."
                            className={inputClasses}
                            value={formData.domainRegistrarOther}
                            onChange={(e) => updateField("domainRegistrarOther", e.target.value)}
                          />
                        </m.div>
                      )}
                    </AnimatePresence>
                  </m.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.hasDomainGlobal === "No, I need help getting one" && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="domainPreference" className={labelClasses}>What domain do you want?</label>
                    <input
                      id="domainPreference"
                      type="text"
                      placeholder="e.g., mybusiness.com, mybusinesschicago.com"
                      className={inputClasses}
                      value={formData.domainPreference}
                      onChange={(e) => updateField("domainPreference", e.target.value)}
                    />
                  </m.div>
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="gbpLink" className={labelClasses}>Paste the link to your Google Business Profile</label>
                    <input
                      id="gbpLink"
                      type="url"
                      placeholder="https://g.co/kgs/..."
                      className={inputClasses}
                      value={formData.gbpLink}
                      onChange={(e) => updateField("gbpLink", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="basic" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Business Details (for the website) */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="details" title="Business Details" subtitle="This info helps me scope your project. If you have multiple businesses, provide details for your primary one here." />
              <AnimatePresence>
                {openSections.details && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >

              <div>
                <label htmlFor="yearsInBusiness" className={labelClasses}>How long have you been in business?</label>
                <input
                  id="yearsInBusiness"
                  type="text"
                  placeholder="e.g., 5 years, just starting, 20+ years"
                  className={inputClasses}
                  value={formData.yearsInBusiness}
                  onChange={(e) => updateField("yearsInBusiness", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="businessPhone" className={labelClasses}>Business Phone</label>
                  <input
                    id="businessPhone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className={inputClasses}
                    value={formData.businessPhone}
                    onChange={(e) => updateField("businessPhone", e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="businessEmail" className={labelClasses}>Business Email</label>
                  <input
                    id="businessEmail"
                    type="email"
                    placeholder="info@yourbusiness.com"
                    className={inputClasses}
                    value={formData.businessEmail}
                    onChange={(e) => updateField("businessEmail", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="businessAddress" className={labelClasses}>Business Address</label>
                <input
                  id="businessAddress"
                  type="text"
                  placeholder="123 Main St, City, State ZIP"
                  className={inputClasses}
                  value={formData.businessAddress}
                  onChange={(e) => updateField("businessAddress", e.target.value)}
                />
              </div>

              <div>
                <label className={labelClasses}>Is this a home address you&apos;d like kept private?</label>
                <p className="text-sm text-[#a3a3a3] mb-3">I won&apos;t display it on your website if so</p>
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
                <label htmlFor="businessHours" className={labelClasses}>Business Hours</label>
                <input
                  id="businessHours"
                  type="text"
                  placeholder="e.g., Mon-Fri 9am-5pm, Sat 10am-2pm"
                  className={inputClasses}
                  value={formData.businessHours}
                  onChange={(e) => updateField("businessHours", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="tagline" className={labelClasses}>Tagline or Slogan (if you have one)</label>
                <input
                  id="tagline"
                  type="text"
                  placeholder="e.g., &quot;Quality you can trust&quot;"
                  className={inputClasses}
                  value={formData.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="socialMediaUrls" className={labelClasses}>Social media profile links</label>
                <textarea
                  id="socialMediaUrls"
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="businessEmailNeeded" className={labelClasses}>What email do you want? (e.g., info@yourbusiness.com)</label>
                    <input
                      id="businessEmailNeeded"
                      type="text"
                      placeholder="info@yourbusiness.com"
                      className={inputClasses}
                      value={formData.businessEmail}
                      onChange={(e) => updateField("businessEmail", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {formData.needsProfessionalEmail === "Already have one" && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <label htmlFor="businessEmailExisting" className={labelClasses}>What is it?</label>
                    <input
                      id="businessEmailExisting"
                      type="email"
                      placeholder="info@yourbusiness.com"
                      className={inputClasses}
                      value={formData.businessEmail}
                      onChange={(e) => updateField("businessEmail", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="details" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 2: Services */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="services" title="Services Interested In" subtitle="These were auto-selected based on your first answer — deselect any that don't apply, or add anything else you need." />
              <AnimatePresence>
                {openSections.services && (
                  <m.div
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
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <label htmlFor="servicesOtherInput" className={labelClasses}>What do you need?</label>
                    <input
                      id="servicesOtherInput"
                      type="text"
                      placeholder="Tell me what you're looking for..."
                      className={inputClasses}
                      value={formData.servicesOther}
                      onChange={(e) => updateField("servicesOther", e.target.value)}
                    />
                  </m.div>
                )}
              </AnimatePresence>
              <ContinueButton sectionKey="services" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 3: Conditional Questions */}

            {/* Marketing Intake (conditional on intent = Ongoing marketing or Both) */}
            <AnimatePresence>
              {showMarketingIntake && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>
                    Marketing Intake — Where Your Business Is Right Now
                  </h2>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6 first:border-t-0 first:mt-0 first:pt-0">Current Lead Volume</h3>
                  <div>
                    <label className={labelClasses}>Roughly how many leads/inquiries do you get per month right now?</label>
                    <div className="flex flex-wrap gap-3">
                      {["0-10", "11-25", "26-50", "51-100", "100+", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("currentMonthlyLeads", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentMonthlyLeads === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Current Google Presence</h3>
                  <div>
                    <label className={labelClasses}>How many Google reviews does your business have right now?</label>
                    <div className="flex flex-wrap gap-3">
                      {["0", "1-10", "11-50", "51-100", "100+", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("currentReviewCount", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentReviewCount === option
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
                    <label className={labelClasses}>Average Google rating?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Under 4.0", "4.0-4.4", "4.5-4.9", "5.0", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("currentReviewRating", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentReviewRating === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Current Marketing Spend</h3>
                  <div>
                    <label className={labelClasses}>How much are you spending on paid ads per month?</label>
                    <div className="flex flex-wrap gap-3">
                      {["None", "Under $500", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("currentAdSpend", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentAdSpend === option
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
                    <label className={labelClasses}>Which platforms are you running ads on right now?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Google Ads", "Local Services Ads", "Facebook", "Instagram", "NextDoor", "None", "Other"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayValue("currentAdPlatforms", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentAdPlatforms.includes(option)
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
                    <label className={labelClasses}>Are you currently working with a marketing agency?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes, currently", "Yes, in the past", "Never"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("currentAgency", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.currentAgency === option
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
                    {(formData.currentAgency === "Yes, currently" || formData.currentAgency === "Yes, in the past") && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="currentAgencyDetails" className={labelClasses}>Who, and why are you looking for a change?</label>
                        <textarea
                          id="currentAgencyDetails"
                          className={inputClasses}
                          rows={3}
                          placeholder="Agency name and what's not working..."
                          value={formData.currentAgencyDetails}
                          onChange={(e) => updateField("currentAgencyDetails", e.target.value)}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Service Area &amp; Pricing</h3>
                  <div>
                    <label className={labelClasses}>What&apos;s an average job worth to you?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Under $500", "$500-$1k", "$1k-$2.5k", "$2.5k-$5k", "$5k-$10k", "$10k+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("averageJobValue", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.averageJobValue === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Capacity &amp; Goals</h3>
                  <div>
                    <label className={labelClasses}>How many MORE jobs per month could you handle right now without hiring?</label>
                    <div className="flex flex-wrap gap-3">
                      {["0", "1-5", "6-10", "11-20", "20+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("capacityForMore", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.capacityForMore === option
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
                    <label htmlFor="seasonality" className={labelClasses}>When are your busy and slow months?</label>
                    <textarea
                      id="seasonality"
                      className={inputClasses}
                      rows={2}
                      placeholder="e.g., busy April-October, dead December-February..."
                      value={formData.seasonality}
                      onChange={(e) => updateField("seasonality", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>What&apos;s your main goal in the next 6 months?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["More leads", "Bigger jobs", "New service area", "New service line", "Hire crew", "Increase prices", "Other"].map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleArrayValue("mainGoal", goal)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.mainGoal.includes(goal)
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {goal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <AnimatePresence>
                    {formData.mainGoal.includes("Other") && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="mainGoalOther" className={labelClasses}>What&apos;s the goal?</label>
                        <input
                          id="mainGoalOther"
                          type="text"
                          placeholder="Tell me more..."
                          className={inputClasses}
                          value={formData.mainGoalOther}
                          onChange={(e) => updateField("mainGoalOther", e.target.value)}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Pain Points</h3>
                  <div>
                    <label htmlFor="mainPainPoint" className={labelClasses}>What&apos;s the biggest thing slowing you down right now?</label>
                    <textarea
                      id="mainPainPoint"
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., slow phones, low quality leads, can't keep up with leads, tire-kickers, no shows, etc."
                      value={formData.mainPainPoint}
                      onChange={(e) => updateField("mainPainPoint", e.target.value)}
                    />
                  </div>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Local Competition</h3>
                  <div>
                    <label htmlFor="topCompetitors" className={labelClasses}>Who are your top 2-3 local competitors?</label>
                    <textarea
                      id="topCompetitors"
                      className={inputClasses}
                      rows={2}
                      placeholder="Names or websites if you have them"
                      value={formData.topCompetitors}
                      onChange={(e) => updateField("topCompetitors", e.target.value)}
                    />
                  </div>

                  <h3 className="text-xs uppercase tracking-widest text-[#06b6d4] font-medium pt-4 pb-2 border-t border-white/[0.06] mt-6">Current Tracking &amp; Team</h3>

                  <div>
                    <label className={labelClasses}>Do you have call tracking set up?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasCallTracking", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasCallTracking === option
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
                    <label className={labelClasses}>Do you have Google Analytics installed?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes", "No", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("hasGA4", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.hasGA4 === option
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
                    <label htmlFor="currentCRM" className={labelClasses}>What CRM or lead tool are you using?</label>
                    <input
                      id="currentCRM"
                      type="text"
                      placeholder="e.g., Jobber, HubSpot, spreadsheet, nothing yet"
                      className={inputClasses}
                      value={formData.currentCRM}
                      onChange={(e) => updateField("currentCRM", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="leadSourceMix" className={labelClasses}>Where are your current leads coming from?</label>
                    <textarea
                      id="leadSourceMix"
                      className={inputClasses}
                      rows={3}
                      placeholder="Roughly what % come from Google, referrals, ads, or repeat customers? Best guess is fine."
                      value={formData.leadSourceMix}
                      onChange={(e) => updateField("leadSourceMix", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>How big is your team?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Just me", "2-5", "6-10", "10+"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("teamSize", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.teamSize === option
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
                    <label className={labelClasses}>Rough monthly revenue (helps me size the engagement)</label>
                    <div className="flex flex-wrap gap-3">
                      {["Under $10k/mo", "$10k-$25k/mo", "$25k-$50k/mo", "$50k-$100k/mo", "$100k+/mo", "Prefer not to say"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("monthlyRevenueBallpark", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.monthlyRevenueBallpark === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Website Questions */}
            <AnimatePresence>
              {formData.services.includes("Website") && (
                <m.div
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
                    <label htmlFor="servicesOffered" className={labelClasses}>What services or products do you offer?</label>
                    <textarea
                      id="servicesOffered"
                      className={inputClasses}
                      rows={3}
                      placeholder="List your main services or products — this helps me plan your site structure and pages"
                      value={formData.servicesOffered}
                      onChange={(e) => updateField("servicesOffered", e.target.value)}
                    />
                  </div>

                  <AnimatePresence>
                    {formData.websiteGoals.includes("Sell products online") && (
                      <m.div
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
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.websiteGoals.includes("Collect payments") && (
                      <m.div
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
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hasWebsite === "Yes" && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="siteChanges" className={labelClasses}>What should I keep, change, or remove from your current site?</label>
                        <textarea
                          id="siteChanges"
                          className={inputClasses}
                          rows={3}
                          placeholder="E.g., keep the reviews section, remove the blog, update the services page, change the color scheme..."
                          value={formData.siteChanges}
                          onChange={(e) => updateField("siteChanges", e.target.value)}
                        />
                      </m.div>
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
                      <m.div
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
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {(formData.websiteCount === "2" || formData.websiteCount === "3+") && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="multipleWebsitesDescription" className={labelClasses}>Please describe each site</label>
                        <p className="text-sm text-[#a3a3a3] mb-3">Include the business name, what it does, and who it serves for each</p>
                        <textarea
                          id="multipleWebsitesDescription"
                          className={inputClasses}
                          rows={5}
                          placeholder={"Site 1: [Business name] — [what it does] — [who it serves]\nSite 2: [Business name] — [what it does] — [who it serves]\nSite 3: ...\nSite 4: ..."}
                          value={formData.multipleWebsitesDescription}
                          onChange={(e) => updateField("multipleWebsitesDescription", e.target.value)}
                        />
                      </m.div>
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
                      <m.div
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
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.hostingProvider === "Other" && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="hostingProviderOther" className={labelClasses}>Type your hosting provider</label>
                        <input
                          id="hostingProviderOther"
                          type="text"
                          placeholder="e.g., AWS, DigitalOcean, etc."
                          className={inputClasses}
                          value={formData.hostingProviderOther}
                          onChange={(e) => updateField("hostingProviderOther", e.target.value)}
                        />
                      </m.div>
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
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="brandColorValues" className={labelClasses}>What are your brand colors?</label>
                        <input
                          id="brandColorValues"
                          type="text"
                          placeholder="e.g., blue, white, red or #003366, #FFFFFF, #CC0000"
                          className={inputClasses}
                          value={formData.brandColorValues}
                          onChange={(e) => updateField("brandColorValues", e.target.value)}
                        />
                      </m.div>
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
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="otherPages" className={labelClasses}>What pages?</label>
                        <input
                          id="otherPages"
                          type="text"
                          placeholder="Portfolio, Blog, Shop, etc."
                          className={inputClasses}
                          value={formData.otherPages}
                          onChange={(e) => updateField("otherPages", e.target.value)}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label htmlFor="referenceSites" className={labelClasses}>Any reference sites you like?</label>
                    <textarea
                      id="referenceSites"
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
                    <textarea
                      className={`${inputClasses} mt-3`}
                      rows={2}
                      placeholder="Anything else about how you want to come across? (optional)"
                      value={formData.websiteToneNotes}
                      onChange={(e) => updateField("websiteToneNotes", e.target.value)}
                    />
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
                      <m.div
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
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.contactFormTypes.includes("Other") && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="contactFormOther" className={labelClasses}>Describe your contact form needs</label>
                        <input
                          id="contactFormOther"
                          type="text"
                          placeholder="Tell me what you need..."
                          className={inputClasses}
                          value={formData.contactFormOther}
                          onChange={(e) => updateField("contactFormOther", e.target.value)}
                        />
                      </m.div>
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
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="bookingSystemOther" className={labelClasses}>Which booking system?</label>
                        <input
                          id="bookingSystemOther"
                          type="text"
                          placeholder="e.g., Acuity, HouseCall Pro, Jobber, etc."
                          className={inputClasses}
                          value={formData.bookingSystemOther}
                          onChange={(e) => updateField("bookingSystemOther", e.target.value)}
                        />
                      </m.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {formData.bookingSystem && formData.bookingSystem !== "None" && (
                      <m.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label htmlFor="bookingEmbedLink" className={labelClasses}>Embed link or URL (if you have it)</label>
                        <input
                          id="bookingEmbedLink"
                          type="text"
                          placeholder="https://..."
                          className={inputClasses}
                          value={formData.bookingEmbedLink}
                          onChange={(e) => updateField("bookingEmbedLink", e.target.value)}
                        />
                      </m.div>
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
                    <label htmlFor="integrations" className={labelClasses}>Any other integrations needed?</label>
                    <input
                      id="integrations"
                      type="text"
                      placeholder="Stripe, CRM, email marketing, etc."
                      className={inputClasses}
                      value={formData.integrations}
                      onChange={(e) => updateField("integrations", e.target.value)}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Google Business Profile Questions */}
            <AnimatePresence>
              {formData.services.includes("Google Business Profile") && (
                <m.div
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
                </m.div>
              )}
            </AnimatePresence>

            {/* Social Media Questions */}
            <AnimatePresence>
              {formData.services.includes("Social Media Setup") && (
                <m.div
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
                </m.div>
              )}
            </AnimatePresence>

            {/* Logo Design Questions */}
            <AnimatePresence>
              {formData.services.includes("Logo Design") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Logo Design Questions</h2>

                  <div>
                    <label htmlFor="logoIdeas" className={labelClasses}>Do you have any ideas or inspiration?</label>
                    <textarea
                      id="logoIdeas"
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
                </m.div>
              )}
            </AnimatePresence>

            {/* Print Design Questions */}
            <AnimatePresence>
              {formData.services.includes("Print Design (brochures, flyers, business cards)") && (
                <m.div
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
                </m.div>
              )}
            </AnimatePresence>

            {/* CRM & Business Dashboard Questions */}
            <AnimatePresence>
              {formData.services.includes("CRM & Business Dashboard") && (
                <m.div
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
                    <label htmlFor="crmCurrentTools" className={labelClasses}>What tools do you currently use?</label>
                    <input
                      id="crmCurrentTools"
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
                    <label htmlFor="crmPainPoint" className={labelClasses}>What&apos;s your biggest pain point with how you manage leads or clients right now?</label>
                    <textarea
                      id="crmPainPoint"
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., leads fall through the cracks, no follow-up system, everything is in my head..."
                      value={formData.crmPainPoint}
                      onChange={(e) => updateField("crmPainPoint", e.target.value)}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Custom Software / Web App Questions (Fix 2) */}
            <AnimatePresence>
              {formData.services.includes("Custom Software / Web App") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Custom Software / Web App Questions</h2>

                  <div>
                    <label htmlFor="customSoftwareDescription" className={labelClasses}>What should this software do? What&apos;s the problem you&apos;re trying to solve?</label>
                    <textarea
                      id="customSoftwareDescription"
                      className={inputClasses}
                      rows={4}
                      placeholder="Describe the problem and what you want the software to do..."
                      value={formData.customSoftwareDescription}
                      onChange={(e) => updateField("customSoftwareDescription", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Platform</label>
                    <div className="flex flex-wrap gap-3">
                      {["Web app", "Mobile app", "Both", "Desktop", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("customSoftwarePlatform", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.customSoftwarePlatform === option
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
                    <label className={labelClasses}>Who will use it?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Just me", "My team only", "My customers only", "Both team + customers"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("customSoftwareUsers", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.customSoftwareUsers === option
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
                    <label htmlFor="customSoftwareIntegrations" className={labelClasses}>Which existing tools, platforms, or data sources should this connect to?</label>
                    <textarea
                      id="customSoftwareIntegrations"
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., Stripe, QuickBooks, Google Sheets, Salesforce..."
                      value={formData.customSoftwareIntegrations}
                      onChange={(e) => updateField("customSoftwareIntegrations", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="customSoftwareExistingTools" className={labelClasses}>What are you using today to handle this — if anything?</label>
                    <textarea
                      id="customSoftwareExistingTools"
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., spreadsheets, manual process, off-the-shelf tool that doesn't quite fit..."
                      value={formData.customSoftwareExistingTools}
                      onChange={(e) => updateField("customSoftwareExistingTools", e.target.value)}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* AI Chatbot Questions (Fix 9) */}
            <AnimatePresence>
              {formData.services.includes("AI Chatbot (Website)") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>AI Chatbot Questions</h2>

                  <div>
                    <label className={labelClasses}>What should the chatbot do?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Lead capture", "Customer support / FAQ", "Book appointments", "Qualify leads before they call", "Quote pricing", "Other"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayValue("aiChatbotPurpose", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiChatbotPurpose.includes(option)
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
                    <label className={labelClasses}>What should it know about?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Services + pricing", "Business hours + location", "FAQs", "Booking availability", "Service area", "Custom knowledge base"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayValue("aiChatbotKnowledge", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiChatbotKnowledge.includes(option)
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
                    <label htmlFor="aiChatbotHandoff" className={labelClasses}>When should the bot hand off to a human?</label>
                    <textarea
                      id="aiChatbotHandoff"
                      className={inputClasses}
                      rows={3}
                      placeholder="e.g., 'any quote over $X', 'complaints', 'urgent requests'"
                      value={formData.aiChatbotHandoff}
                      onChange={(e) => updateField("aiChatbotHandoff", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Which channels?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Website only", "Website + SMS", "Website + WhatsApp", "Website + Messenger", "All channels"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayValue("aiChatbotChannels", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiChatbotChannels.includes(option)
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
                    <label htmlFor="aiChatbotExistingChat" className={labelClasses}>Are you using any chat tool today?</label>
                    <input
                      id="aiChatbotExistingChat"
                      type="text"
                      placeholder="e.g., Intercom, Drift, none"
                      className={inputClasses}
                      value={formData.aiChatbotExistingChat}
                      onChange={(e) => updateField("aiChatbotExistingChat", e.target.value)}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* AI Receptionist Questions (Fix 10) */}
            <AnimatePresence>
              {formData.services.includes("AI Receptionist (Phone)") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>AI Receptionist Questions</h2>

                  <div>
                    <label className={labelClasses}>When should it answer?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Answer all calls", "Overflow only when I'm busy", "After-hours only", "Specific scenarios (specify below)"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("aiReceptionistPurpose", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiReceptionistPurpose === option
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
                    <label className={labelClasses}>What should it do?</label>
                    <p className="text-sm text-[#a3a3a3] mb-3">Select all that apply</p>
                    <div className="flex flex-wrap gap-3">
                      {["Qualify leads", "Book appointments", "Take messages", "Transfer urgent calls", "Answer FAQs", "Quote rough pricing"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleArrayValue("aiReceptionistTasks", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiReceptionistTasks.includes(option)
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
                    <label className={labelClasses}>Roughly how many calls do you get?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Under 50/week", "50-100/week", "100-250/week", "250-500/week", "500+/week", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("aiReceptionistCallVolume", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiReceptionistCallVolume === option
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
                    <label className={labelClasses}>Voice preference</label>
                    <div className="flex flex-wrap gap-3">
                      {["Male", "Female", "No preference"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("aiReceptionistVoicePreference", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.aiReceptionistVoicePreference === option
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
                    <label htmlFor="aiReceptionistTransferRules" className={labelClasses}>When should it transfer to you or your team?</label>
                    <textarea
                      id="aiReceptionistTransferRules"
                      className={inputClasses}
                      rows={3}
                      placeholder="Be specific."
                      value={formData.aiReceptionistTransferRules}
                      onChange={(e) => updateField("aiReceptionistTransferRules", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="aiReceptionistCurrentSetup" className={labelClasses}>How are calls being handled today?</label>
                    <input
                      id="aiReceptionistCurrentSetup"
                      type="text"
                      placeholder="e.g., 'I answer myself', 'answering service', 'voicemail', 'spam-blocking'"
                      className={inputClasses}
                      value={formData.aiReceptionistCurrentSetup}
                      onChange={(e) => updateField("aiReceptionistCurrentSetup", e.target.value)}
                    />
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Google Ads / LSA Details (Fix 11) */}
            <AnimatePresence>
              {formData.services.includes("Google Ads / Paid Advertising") && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={sectionClasses}
                >
                  <h2 className={sectionTitleClasses} style={{ fontFamily: "'Cinzel', serif" }}>Google Ads / LSA Details</h2>

                  <div>
                    <label htmlFor="adsCurrentCostPerLead" className={labelClasses}>What&apos;s your current cost per lead?</label>
                    <input
                      id="adsCurrentCostPerLead"
                      type="text"
                      placeholder="'Not sure' is fine"
                      className={inputClasses}
                      value={formData.adsCurrentCostPerLead}
                      onChange={(e) => updateField("adsCurrentCostPerLead", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Do you have conversion tracking set up?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Yes — calls + form fills", "Yes — calls only", "No", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("adsConversionTracking", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.adsConversionTracking === option
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
                    <label className={labelClasses}>Who owns your ad accounts?</label>
                    <div className="flex flex-wrap gap-3">
                      {["I own my ad accounts", "My current agency owns them", "Not sure"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("adsAccountOwnership", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.adsAccountOwnership === option
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
                    <label className={labelClasses}>Takeover or fresh start?</label>
                    <div className="flex flex-wrap gap-3">
                      {["Take over my existing accounts", "Start fresh new accounts", "Open to either"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("adsTakeoverPreference", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.adsTakeoverPreference === option
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
                    <label htmlFor="adsTargetService" className={labelClasses}>Which services do you most want ads to drive leads for?</label>
                    <textarea
                      id="adsTargetService"
                      className={inputClasses}
                      rows={3}
                      placeholder="Be specific — e.g., 'paver restoration only, not new builds' or 'roof repairs, not replacements'."
                      value={formData.adsTargetService}
                      onChange={(e) => updateField("adsTargetService", e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="adsTargetGeo" className={labelClasses}>What geographic area should ads target?</label>
                    <textarea
                      id="adsTargetGeo"
                      className={inputClasses}
                      rows={3}
                      placeholder="Specific zip codes, cities, or radius from your location"
                      value={formData.adsTargetGeo}
                      onChange={(e) => updateField("adsTargetGeo", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className={labelClasses}>Budget willingness</label>
                    <div className="flex flex-wrap gap-3">
                      {["Same as current", "Willing to increase if it works", "Want to decrease", "Need help deciding"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField("adsBudgetWillingness", option)}
                          className={cn(
                            "px-6 py-2.5 rounded-full text-sm border transition-all duration-300 cursor-pointer",
                            formData.adsBudgetWillingness === option
                              ? "bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white border-transparent"
                              : "bg-transparent text-[#d4d4d4] border-white/[0.12] hover:border-[#2563eb]/50"
                          )}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Section 4: Competition & Inspiration */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="competition" title="Competition & Inspiration" />
              <AnimatePresence>
                {openSections.competition && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label htmlFor="competitorsInspiration" className={labelClasses}>Any competitors or businesses you admire?</label>
                      <textarea
                        id="competitorsInspiration"
                        className={inputClasses}
                        rows={3}
                        placeholder="Links or names of businesses whose style you like"
                        value={formData.competitorsInspiration}
                        onChange={(e) => updateField("competitorsInspiration", e.target.value)}
                      />
                    </div>
                    <ContinueButton sectionKey="competition" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 5: Timeline & Budget */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="timeline" title="Timeline & Budget" />
              <AnimatePresence>
                {openSections.timeline && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label htmlFor="timeline" className={labelClasses}>When do you need this done?</label>
                      <input
                        id="timeline"
                        type="text"
                        placeholder="ASAP, 2 weeks, by end of month, etc."
                        className={inputClasses}
                        value={formData.timeline}
                        onChange={(e) => updateField("timeline", e.target.value)}
                      />
                    </div>

                    <div>
                      <label htmlFor="budget" className={labelClasses}>Budget range (optional)</label>
                      <input
                        id="budget"
                        type="text"
                        placeholder="$500-$1000, $2000-$5000, etc."
                        className={inputClasses}
                        value={formData.budget}
                        onChange={(e) => updateField("budget", e.target.value)}
                      />
                    </div>
                    <ContinueButton sectionKey="timeline" />
                  </m.div>
                )}
              </AnimatePresence>
            </div>

            {/* Section 6: Anything Else */}
            <div className={sectionClasses}>
              <SectionHeader sectionKey="anything" title="Anything Else?" />
              <AnimatePresence>
                {openSections.anything && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 overflow-hidden"
                  >
                    <div>
                      <label htmlFor="additionalInfo" className={labelClasses}>Additional information or questions</label>
                      <textarea
                        id="additionalInfo"
                        className={inputClasses}
                        rows={4}
                        placeholder="Share any other details, questions, or special requirements..."
                        value={formData.additionalInfo}
                        onChange={(e) => updateField("additionalInfo", e.target.value)}
                      />
                    </div>
                  </m.div>
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
                {" "}with your business name in the subject line. The more I have, the faster we can move.
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
