import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Logo } from "@/components/Logo";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/websites", label: "Websites" },
  { to: "/marketing", label: "Marketing" },
  { to: "/why-intent", label: "Why Intent" },
  // DEFERRED restructure: once the /results marketing-proof page exists, convert
  // "Portfolio" into a dropdown → Website Portfolio + Marketing Case Studies.
  // Until then it stays a single item (= website work). Update Site Architecture Decisions doc when done.
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
];

interface LayoutProps {
  children: ReactNode;
  /** Override the active nav link. Defaults to current pathname. */
  activePath?: string;
  /** Where the "Let's Talk" CTA should point. Defaults to /#contact. */
  contactHref?: string;
}

export function Layout({ children, activePath, contactHref = "/#contact" }: LayoutProps) {
  const { pathname } = useLocation();
  const active = activePath ?? pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <main className="min-h-screen antialiased relative bg-bg">
      {/* ==================== NAV ==================== */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-bg/85 backdrop-blur-xl border-b border-line">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-7 flex items-center justify-center lg:justify-between relative">
          {/* Masthead — logo + city tag, vertically centered in nav.
              Logo is `scale-[1.35]` on desktop. CSS transforms don't
              change layout size, so the next element would collide;
              we wrap the logo in a width-reservation block sized to
              the scaled width (logo sm = 160px → 216px at 1.35×). */}
          <Link to="/" className="flex items-center cursor-pointer overflow-visible" onClick={closeMenu}>
            <div className="w-[152px] lg:w-[216px] flex-shrink-0">
              <div className="scale-[0.95] lg:scale-[1.35] origin-left">
                <Logo variant="white" size="sm" type="full" />
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`nav-link ${active === item.to ? "nav-link-active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
            <a href={contactHref} className="btn-primary text-sm">
              Let&apos;s talk &rarr;
            </a>
          </div>

          <button
            className="lg:hidden absolute right-4 p-2 text-ink"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IconX className="w-6 h-6" /> : <IconMenu2 className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-bg/95 backdrop-blur-xl border-b border-line overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col items-center gap-3">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={`nav-link py-2 ${active === item.to ? "nav-link-active" : ""}`}
                  >
                    {item.label}
                  </Link>
                ))}
                <a href={contactHref} onClick={closeMenu} className="btn-primary text-sm mt-2">
                  Let&apos;s talk &rarr;
                </a>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Body offset reserved for the fixed masthead nav */}
      <div className="pt-[88px] lg:pt-[112px]">{children}</div>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-16 px-6 border-t border-line relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="eyebrow mb-5">Contact</p>
              <div className="space-y-2 text-ink-muted text-sm leading-relaxed">
                <p>655 Deerfield Rd</p>
                <p>Suite 100, Unit 404</p>
                <p>Deerfield, IL 60015</p>
                <div className="border-t border-line my-4" />
                <p><a href="mailto:omair@thekhan.io" className="hover:text-accent-light transition-colors">Omair@TheKhan.io</a></p>
                <p><a href="tel:8472208550" className="hover:text-accent-light transition-colors">(847) 220-8550</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="eyebrow mb-5">Pages</p>
              <div className="space-y-2 text-ink-muted text-sm">
                {NAV_ITEMS.map((item) => (
                  <p key={item.to}>
                    <Link
                      to={item.to}
                      className={active === item.to ? "text-accent-light" : "hover:text-accent-light transition-colors"}
                    >
                      {item.label}
                    </Link>
                  </p>
                ))}
                <p><a href={contactHref} className="hover:text-accent-light transition-colors">Contact</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-end md:text-right">
              <Logo variant="white" size="md" className="mb-4" />
              <p className="text-ink-muted text-sm leading-relaxed">
                your marketing partner.
              </p>
              <p className="text-ink-faint text-xs leading-relaxed mt-1">
                For home service businesses and growing companies.
              </p>
              <a
                href="https://share.google/0PfUGpeaAI6fNNZhV"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 mt-4 text-ink-faint text-sm hover:text-ink transition-colors duration-300"
              >
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>
                  Find us on{" "}
                  <span className="font-medium">
                    <span className="transition-colors duration-300 group-hover:text-[#4285F4]">G</span>
                    <span className="transition-colors duration-300 group-hover:text-[#EA4335]">o</span>
                    <span className="transition-colors duration-300 group-hover:text-[#FBBC05]">o</span>
                    <span className="transition-colors duration-300 group-hover:text-[#4285F4]">g</span>
                    <span className="transition-colors duration-300 group-hover:text-[#34A853]">l</span>
                    <span className="transition-colors duration-300 group-hover:text-[#EA4335]">e</span>
                  </span>
                </span>
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-line text-center">
            <p className="text-ink-faint text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            <p className="text-ink-faint text-sm mt-2 opacity-70">Custom-built by TheKhan</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
