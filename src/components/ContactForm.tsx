import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { MovingBorder } from "@/components/ui/moving-border";

interface ContactFormProps {
  source?: string;
  subjectPrefix?: string;
  showProjectTypeDropdown?: boolean;
  showTradeDropdown?: boolean;
  showPhoneField?: boolean;
  submitText?: string;
}

const TRADE_OPTIONS = [
  "Landscaping / Lawn Care",
  "Snow Removal",
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Pressure Washing",
  "Painting",
  "Cleaning",
  "Handyman / General Contracting",
  "Other",
];

export function ContactForm({ source, subjectPrefix, showProjectTypeDropdown, showTradeDropdown, showPhoneField = true, submitText = "Start the Conversation" }: ContactFormProps = {}) {
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    hearAboutUs: "",
    referralName: "",
    hearAboutUsOther: "",
    projectType: "",
    trade: "",
    tradeOther: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tradeValue = showTradeDropdown
        ? formData.trade === "Other"
          ? formData.tradeOther || "Other"
          : formData.trade
        : "";
      const messageWithTrade = showTradeDropdown && tradeValue
        ? `Trade: ${tradeValue}\n\n${formData.message}`
        : formData.message;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "27068209-3ff0-4c82-a1ed-e67558c5ffa4",
          from_name: "TheKhan Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: messageWithTrade,
          referral_source: formData.hearAboutUs === "Referral" ? `Referral — ${formData.referralName || "No name given"}` : formData.hearAboutUs === "Other" ? formData.hearAboutUsOther || "Other" : formData.hearAboutUs,
          ...(showProjectTypeDropdown && { project_type: formData.projectType }),
          ...(showTradeDropdown && tradeValue && { trade: tradeValue }),
          ...(source && { source }),
          subject: subjectPrefix ? `${subjectPrefix} — ${formData.name}` : `New Inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          hearAboutUs: "",
          referralName: "",
          hearAboutUsOther: "",
          projectType: "",
          trade: "",
          tradeOther: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3.5 rounded-xl bg-[#0a0a0a] border border-white/[0.12]",
    "text-white placeholder:text-[#707070]",
    "focus:outline-none focus:border-[#2563eb]/60 focus:ring-2 focus:ring-[#2563eb]/20",
    "transition-all duration-300 cursor-text"
  );

  if (submitStatus === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#2563eb]/20 to-[#06b6d4]/20 flex items-center justify-center mx-auto mb-6 border border-[#2563eb]/30">
          <svg className="w-8 h-8 text-[#2563eb]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 tracking-[0.15em] uppercase">
          Message Sent!
        </h3>
        <p className="text-[#d4d4d4] mb-6">
          Thanks for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="text-[#2563eb] hover:text-[#3b82f6] transition-colors text-sm cursor-pointer"
        >
          Send another message &rarr;
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm text-[#d4d4d4] mb-2">Name *</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm text-[#d4d4d4] mb-2">Email *</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
            placeholder="your@email.com"
          />
        </div>
      </div>

      {showPhoneField && (
        <div>
          <label htmlFor="contact-phone" className="block text-sm text-[#d4d4d4] mb-2">Phone <span className="text-[#808080] text-xs font-normal">(optional)</span></label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
        </div>
      )}

      {showProjectTypeDropdown && (
        <div>
          <label htmlFor="contact-projectType" className="block text-sm text-[#d4d4d4] mb-2">What do you need? *</label>
          <select
            id="contact-projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23707070%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]")}
          >
            <option value="" className="bg-[#0a0a0a]">Select one...</option>
            <option value="Landing page ($300)" className="bg-[#0a0a0a]">Landing page ($300)</option>
            <option value="Full website ($550+)" className="bg-[#0a0a0a]">Full website ($550+)</option>
            <option value="Custom project / not sure" className="bg-[#0a0a0a]">Custom project / not sure</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className="block text-sm text-[#d4d4d4] mb-2">Tell me about your business and what you need *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={cn(inputClasses, "min-h-[140px] resize-none")}
          placeholder="What does your business do? What are you looking for help with?"
        />
      </div>

      {showTradeDropdown && (
        <div>
          <label htmlFor="contact-trade" className="block text-sm text-[#d4d4d4] mb-2">
            What do you do? <span className="text-[#808080] text-xs font-normal">(optional)</span>
          </label>
          <p className="text-[#808080] text-xs mb-2">Pick the closest one — or skip it and tell me in the message below.</p>
          <select
            id="contact-trade"
            name="trade"
            value={formData.trade}
            onChange={(e) => setFormData({ ...formData, trade: e.target.value, tradeOther: e.target.value === "Other" ? formData.tradeOther : "" })}
            className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23707070%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]")}
          >
            <option value="" className="bg-[#0a0a0a]">Select one...</option>
            {TRADE_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-[#0a0a0a]">{opt}</option>
            ))}
          </select>
          {formData.trade === "Other" && (
            <input
              id="contact-tradeOther"
              name="tradeOther"
              type="text"
              aria-label="Tell me what you do"
              value={formData.tradeOther}
              onChange={(e) => setFormData({ ...formData, tradeOther: e.target.value })}
              className={cn(inputClasses, "mt-3")}
              placeholder="Tell me what you do"
            />
          )}
        </div>
      )}

      <div>
        <label htmlFor="contact-hearAboutUs" className="block text-sm text-[#d4d4d4] mb-2">How did you hear about me?</label>
        <select
          id="contact-hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value, referralName: "", hearAboutUsOther: "" })}
          className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23707070%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]")}
        >
          <option value="" className="bg-[#0a0a0a]">Select one...</option>
          <option value="Google" className="bg-[#0a0a0a]">Google</option>
          <option value="Instagram" className="bg-[#0a0a0a]">Instagram</option>
          <option value="Facebook" className="bg-[#0a0a0a]">Facebook</option>
          <option value="LinkedIn" className="bg-[#0a0a0a]">LinkedIn</option>
          <option value="Referral" className="bg-[#0a0a0a]">Referral</option>
          <option value="Word of mouth" className="bg-[#0a0a0a]">Word of mouth</option>
          <option value="Other" className="bg-[#0a0a0a]">Other</option>
        </select>
        {formData.hearAboutUs === "Referral" && (
          <input
            id="contact-referralName"
            name="referralName"
            type="text"
            aria-label="Who referred you"
            value={formData.referralName}
            onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
            className={cn(inputClasses, "mt-3")}
            placeholder="Who referred you? (name or business)"
          />
        )}
        {formData.hearAboutUs === "Other" && (
          <input
            id="contact-hearAboutUsOther"
            name="hearAboutUsOther"
            type="text"
            aria-label="Tell me where you heard about me"
            value={formData.hearAboutUsOther}
            onChange={(e) => setFormData({ ...formData, hearAboutUsOther: e.target.value })}
            className={cn(inputClasses, "mt-3")}
            placeholder="Tell me where..."
          />
        )}
      </div>

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      {/* Submit button with animated border */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative w-full p-[2px] rounded-xl overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200 ease-out hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] active:translate-y-0"
      >
        {/* Animated border */}
        <div className="absolute inset-0 rounded-xl">
          {mounted && (
            <MovingBorder duration={3000} rx="12px" ry="12px">
              <div className="h-20 w-20 bg-[radial-gradient(#06b6d4_40%,transparent_60%)] opacity-80" />
            </MovingBorder>
          )}
        </div>

        {/* Gradient background */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#2563eb] to-[#06b6d4]" />

        {/* Hover glow */}
        <div className="absolute inset-[-4px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md bg-gradient-to-r from-[#2563eb]/60 to-[#06b6d4]/60" />

        {/* Content */}
        <div className="relative bg-gradient-to-r from-[#2563eb] to-[#06b6d4] text-white py-4 rounded-xl font-medium tracking-wide">
          {isSubmitting ? "Sending..." : submitText}
        </div>
      </button>
    </form>
  );
}
