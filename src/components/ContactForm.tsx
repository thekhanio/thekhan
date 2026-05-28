import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { TurnstileWidget } from "@/components/TurnstileWidget";

interface ContactFormProps {
  source?: string;
  subjectPrefix?: string;
  showProjectTypeDropdown?: boolean;
  showTradeDropdown?: boolean;
  showPhoneField?: boolean;
  submitText?: string;
}

// Channels Omair actually runs / hears from. The conditional detail box appears
// for the three "where exactly?" answers below.
const HEAR_OPTIONS = ["Google", "Referral", "Word of mouth", "AI search (ChatGPT, etc.)", "Other"];
const HEAR_DETAIL_OPTIONS = ["Referral", "Word of mouth", "Other"];

export function ContactForm({ source, subjectPrefix, showProjectTypeDropdown, showTradeDropdown, showPhoneField = true, submitText = "Send it →" }: ContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    hearAboutUs: "",
    hearAboutUsDetail: "",
    projectType: "",
    trade: "",
    website_url: "", // honeypot
  });
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleToken = useCallback((token: string) => setTurnstileToken(token), []);
  const handleExpire = useCallback(() => setTurnstileToken(""), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);

    try {
      const tradeValue = showTradeDropdown ? formData.trade : "";
      const referralSource =
        HEAR_DETAIL_OPTIONS.includes(formData.hearAboutUs) && formData.hearAboutUsDetail
          ? `${formData.hearAboutUs} — ${formData.hearAboutUsDetail}`
          : formData.hearAboutUs;

      const response = await fetch("https://leads-api.thekhan.io/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client: "thekhan",
          form_id: "thekhan-contact",
          source: "seo",
          "cf-turnstile-response": turnstileToken,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          service: "Inquiry",
          referral_source: referralSource,
          ...(showProjectTypeDropdown && { project_type: formData.projectType }),
          ...(showTradeDropdown && tradeValue && { trade: tradeValue }),
          ...(source && { page_source: source }),
          ...(subjectPrefix && { page_form: subjectPrefix }),
          website_url: formData.website_url, // honeypot
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
          hearAboutUsDetail: "",
          projectType: "",
          trade: "",
          website_url: "",
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
    "w-full px-4 py-3.5 bg-bg-quiet border border-line",
    "text-ink placeholder:text-ink-faint",
    "focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30",
    "transition-colors duration-200 cursor-text"
  );

  if (submitStatus === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 border border-accent flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="display-h2 text-2xl text-ink mb-3">
          Message sent.
        </h3>
        <p className="text-ink-muted mb-6">
          I&apos;ll get back to you within a few hours.
        </p>
        <button
          onClick={() => setSubmitStatus("idle")}
          className="text-accent hover:text-ink transition-colors text-sm cursor-pointer"
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
          <label htmlFor="contact-name" className="block text-sm text-ink-muted mb-2">Name *</label>
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
          <label htmlFor="contact-email" className="block text-sm text-ink-muted mb-2">Email *</label>
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
          <label htmlFor="contact-phone" className="block text-sm text-ink-muted mb-2">Phone *</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
            placeholder="(555) 123-4567"
          />
        </div>
      )}

      {/* Honeypot — hidden from humans, bots fill it */}
      <input
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={formData.website_url}
        onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
        className="absolute left-[-9999px] w-px h-px opacity-0"
      />

      {showProjectTypeDropdown && (
        <div>
          <label htmlFor="contact-projectType" className="block text-sm text-ink-muted mb-2">What do you need? *</label>
          <select
            id="contact-projectType"
            name="projectType"
            required
            value={formData.projectType}
            onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
            className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23707070%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]")}
          >
            <option value="" className="bg-bg-quiet">Select one...</option>
            <option value="Brochure site — 1 page ($750)" className="bg-bg-quiet">Brochure site — 1 page ($750)</option>
            <option value="Standard site — 5 pages ($1,500)" className="bg-bg-quiet">Standard site — 5 pages ($1,500)</option>
            <option value="Custom — let's scope it" className="bg-bg-quiet">Custom — let&apos;s scope it</option>
            <option value="Not sure yet" className="bg-bg-quiet">Not sure yet</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="contact-message" className="block text-sm text-ink-muted mb-2">Tell me about your business and what you need *</label>
        <textarea
          id="contact-message"
          name="message"
          required
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={cn(inputClasses, "min-h-[140px] resize-none")}
          placeholder="What does your business do, and what are you looking for help with?"
        />
      </div>

      {showTradeDropdown && (
        <div>
          <label htmlFor="contact-trade" className="block text-sm text-ink-muted mb-2">
            What do you do? <span className="text-ink-quiet text-xs font-normal">(optional)</span>
          </label>
          <p className="text-ink-quiet text-xs mb-2">Your trade or business — or skip it and tell me in the message below.</p>
          <input
            id="contact-trade"
            name="trade"
            type="text"
            value={formData.trade}
            onChange={(e) => setFormData({ ...formData, trade: e.target.value })}
            className={inputClasses}
            placeholder="e.g. roofing, dental office, salon…"
          />
        </div>
      )}

      <div>
        <label htmlFor="contact-hearAboutUs" className="block text-sm text-ink-muted mb-2">How did you hear about me?</label>
        <select
          id="contact-hearAboutUs"
          name="hearAboutUs"
          value={formData.hearAboutUs}
          onChange={(e) => setFormData({ ...formData, hearAboutUs: e.target.value, hearAboutUsDetail: "" })}
          className={cn(inputClasses, "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23707070%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_16px_center]")}
        >
          <option value="" className="bg-bg-quiet">Select one...</option>
          {HEAR_OPTIONS.map((opt) => (
            <option key={opt} value={opt} className="bg-bg-quiet">{opt}</option>
          ))}
        </select>
        {HEAR_DETAIL_OPTIONS.includes(formData.hearAboutUs) && (
          <input
            id="contact-hearAboutUsDetail"
            name="hearAboutUsDetail"
            type="text"
            aria-label="Mind sharing who told you, or where you found me?"
            value={formData.hearAboutUsDetail}
            onChange={(e) => setFormData({ ...formData, hearAboutUsDetail: e.target.value })}
            className={cn(inputClasses, "mt-3")}
            placeholder="Mind sharing who told you, or where you found me? (optional)"
          />
        )}
      </div>

      <TurnstileWidget onToken={handleToken} onExpire={handleExpire} />

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm">
          Something went wrong. Please try again or email me directly.
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting || !turnstileToken}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? "Sending..." : submitText}
      </button>
    </form>
  );
}
