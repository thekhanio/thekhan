import { useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import {
  IconBrandLinkedin,
  IconBrandFacebook,
  IconBrandInstagram,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import { Logo } from "@/components/Logo";

const NAV_ITEMS = [
  { to: "/", label: "Home" },
  { to: "/websites", label: "Websites" },
  { to: "/contractors", label: "For Contractors" },
  { to: "/local-services", label: "For Local Services" },
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="eyebrow mb-5">Contact</p>
              <div className="space-y-2 text-ink-muted text-sm leading-relaxed">
                <p>655 Deerfield Rd</p>
                <p>Suite 100, Unit 404</p>
                <p>Deerfield, IL 60015</p>
                <div className="border-t border-line my-4" />
                <p><a href="mailto:omair@thekhan.io" className="hover:text-ink transition-colors">Omair@TheKhan.io</a></p>
                <p><a href="tel:8472208550" className="hover:text-ink transition-colors">(847) 220-8550</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="eyebrow mb-5">Pages</p>
              <div className="space-y-2 text-ink-muted text-sm">
                {NAV_ITEMS.map((item) => (
                  <p key={item.to}>
                    <Link
                      to={item.to}
                      className={active === item.to ? "text-ink" : "hover:text-ink transition-colors"}
                    >
                      {item.label}
                    </Link>
                  </p>
                ))}
                <p><a href={contactHref} className="hover:text-ink transition-colors">Contact</a></p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <p className="eyebrow mb-5">Follow Along</p>
              <div className="flex gap-3">
                <a href="https://www.linkedin.com/company/thekhanio" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-accent transition-colors">
                  <IconBrandLinkedin className="w-4 h-4" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61584909881446" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-accent transition-colors">
                  <IconBrandFacebook className="w-4 h-4" />
                </a>
                <a href="https://www.instagram.com/thekhanio" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 border border-line flex items-center justify-center text-ink-muted hover:text-ink hover:border-accent transition-colors">
                  <IconBrandInstagram className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <Logo variant="white" size="md" className="mb-4" />
              <p className="text-ink-muted text-sm leading-relaxed">
                your marketing partner.
              </p>
              <p className="text-ink-faint text-xs leading-relaxed mt-1">
                For home service businesses and growing companies.
              </p>
            </div>
          </div>
          <div className="pt-8 border-t border-line text-center">
            <p className="text-ink-faint text-sm">&copy; {new Date().getFullYear()} TheKhan. All rights reserved.</p>
            <p className="text-ink-faint text-sm mt-2 opacity-70">Designed and built by TheKhan</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
