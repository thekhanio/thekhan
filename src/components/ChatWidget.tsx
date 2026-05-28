import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { IconMessageCircle, IconX, IconArrowLeft, IconPhone, IconMail } from "@tabler/icons-react";

// Routes where the widget should NOT render (internal/private pages).
const HIDDEN_PATHS = ["/start", "/intake", "/premierpartners", "/marioscape", "/crystalclear"];

// Single source of truth for chat content. Answers are hand-written and locked
// in voice — match the FAQ tone but tighter. Update them here, not in worker.
const QUESTIONS: Array<{ q: string; a: string }> = [
  {
    q: "How much is a website?",
    a: "Depends on what you need. A one-page Brochure site is one strong page doing one or two things — your services and a contact form in one clean scroll. That's $750. A Standard 5-page site lets each page do its own job (home, about, services, contact, plus one more). That's $1,500. Custom is quoted depending on exactly what you need. Either way, you own every file and the domain — no monthly fees, and I don't lock you to any platform.",
  },
  {
    q: "How much is marketing?",
    a: "The Partnership is my ongoing month-to-month marketing — keeps your site running, your Google profile managed, and new pages every month set up the right way so you're found organically on Google, in AI search, and the other places people look. That's $950/mo, cancel any month. To start, the Foundation builds your site, sets up your Google profile (or optimizes the one you already have), and lays the base for SEO and AI search to start picking up your business. That's $2,100 one-time. Want leads right now while SEO builds? Ad Management starts from $500/mo on top. Email marketing setup is $300 if you'd like as well.",
  },
  {
    q: "Is there a contract or cancellation fee?",
    a: "No long-term contract. The Partnership ($950/mo) is fully month-to-month — cancel any month with 72 hours notice before your next bill. The Foundation ($2,100) is paid up front and non-refundable because the work happens up front — building your site, setting up your Google Business Profile, optimizing it the right way, and getting your SEO set up properly so AI search and Google can find your business. Either way, your site, your domain, and your Google Business Profile are all owned by you. Nothing locked to me.",
  },
  {
    q: "What do you actually do?",
    a: "Two things. I build custom websites for small businesses — built from scratch, not templates, made to actually bring in business. And I run monthly marketing for home service and local businesses — AI search, SEO, your Google Business Profile, and Google Ads — to get you found by the people already searching for what you do. When you reach out, you'll reach me directly.",
  },
  {
    q: "How long until I see results?",
    a: "Ads start bringing leads in within weeks. SEO is the long game — early movement around 3 months, real traction by 6, and the compounding payoff around a year. Most clients run both: ads bring leads in now while SEO builds underneath.",
  },
];

const STORAGE_KEY = "thekhan.chatwidget.open";

export function ChatWidget() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Restore open state from sessionStorage on mount.
  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "true") setIsOpen(true);
  }, []);

  // Persist open/closed across page changes.
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, String(isOpen));
  }, [isOpen]);

  // Reset to question list whenever the panel closes, so reopening always
  // starts at the menu instead of an old answer view.
  useEffect(() => {
    if (!isOpen) setActiveIdx(null);
  }, [isOpen]);

  if (HIDDEN_PATHS.includes(pathname)) return null;

  return (
    <>
      {/* Launcher button — always visible on public pages. */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close quick answers" : "Open quick answers"}
        aria-expanded={isOpen}
        className="fixed bottom-5 right-5 md:bottom-6 md:right-6 w-14 h-14 rounded-full bg-bg-raised border-2 border-accent flex items-center justify-center cursor-pointer lift z-[90] transition-colors hover:border-accent-light shadow-[0_8px_24px_-4px_rgba(0,0,0,0.4)]"
      >
        {isOpen ? (
          <IconX className="w-5 h-5 text-accent-light" />
        ) : (
          <IconMessageCircle className="w-5 h-5 text-accent-light" />
        )}
      </button>

      {/* Panel — animates in/out from the launcher's corner. */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            className="fixed bottom-24 right-5 md:right-6 w-[calc(100vw-2.5rem)] sm:w-[360px] max-h-[calc(100vh-9rem)] bg-bg-raised border-2 border-accent rounded-2xl flex flex-col overflow-hidden z-[89] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.6)] origin-bottom-right"
            role="dialog"
            aria-modal="false"
            aria-label="Quick answers"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-line">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
                Quick answers
              </p>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
                className="text-ink-quiet hover:text-ink transition-colors cursor-pointer"
              >
                <IconX className="w-5 h-5" />
              </button>
            </div>

            {/* Body — either the question list or the answer view */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {activeIdx === null ? (
                <ul className="space-y-2.5">
                  {QUESTIONS.map((q, i) => (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setActiveIdx(i)}
                        className="w-full text-left px-4 py-3 rounded-xl border border-line bg-bg-quiet/40 text-ink-muted text-sm leading-snug hover:border-accent-light hover:text-ink hover:bg-bg-quiet/70 transition-colors cursor-pointer"
                      >
                        {q.q}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setActiveIdx(null)}
                    className="inline-flex items-center gap-1.5 text-accent-light hover:text-accent text-xs font-mono tracking-wide mb-4 cursor-pointer transition-colors"
                  >
                    <IconArrowLeft className="w-3.5 h-3.5" />
                    Back to questions
                  </button>
                  <h3 className="text-ink font-semibold text-base leading-snug mb-3">
                    {QUESTIONS[activeIdx].q}
                  </h3>
                  <p className="text-ink-muted text-sm leading-relaxed">
                    {QUESTIONS[activeIdx].a}
                  </p>
                </div>
              )}
            </div>

            {/* Footer — direct contact options */}
            <div className="border-t border-line px-5 py-4">
              <p className="text-ink-quiet text-xs tracking-wide mb-3">Need more info?</p>
              <div className="space-y-2.5">
                <a
                  href="tel:8472208550"
                  className="flex items-center gap-2.5 text-ink-muted text-sm transition-colors group"
                >
                  <IconPhone className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="group-hover:text-accent-light transition-colors">Call/text (847) 220-8550</span>
                </a>
                <a
                  href="mailto:omair@thekhan.io"
                  className="flex items-center gap-2.5 text-ink-muted text-sm transition-colors group"
                >
                  <IconMail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span className="group-hover:text-accent-light transition-colors">Omair@TheKhan.io</span>
                </a>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
