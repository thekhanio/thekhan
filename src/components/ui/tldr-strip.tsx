import type { ReactNode } from "react";
import { Eyebrow } from "@/components/editorial";

interface TldrStripProps {
  bullets: ReactNode[];
  links: { label: string; href: string }[];
  className?: string;
}

/**
 * TldrStrip — "THE SHORT VERSION" sub-hero strip used on /websites,
 * /home-services, and /about. Renders 3 bullets + a "Skip to:" inline
 * anchor row. Matches editorial system tokens.
 */
export function TldrStrip({ bullets, links, className = "" }: TldrStripProps) {
  return (
    <div className={`mt-10 max-w-3xl ${className}`}>
      <Eyebrow accent className="mb-4">The short version</Eyebrow>
      <ul className="space-y-2.5 mb-5 text-ink-muted text-base md:text-lg leading-relaxed">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="text-accent-light mt-1.5 leading-none" aria-hidden="true">·</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <p className="text-ink-quiet text-sm flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-mono text-[11px] uppercase tracking-widest text-ink-faint mr-1">Skip to:</span>
        {links.map((l, i) => (
          <span key={l.href} className="flex items-center gap-2">
            <a
              href={l.href}
              className="text-accent-light hover:text-ink underline underline-offset-4 decoration-accent-line hover:decoration-ink transition-colors"
            >
              {l.label}
            </a>
            {i < links.length - 1 && <span className="text-ink-faint" aria-hidden="true">·</span>}
          </span>
        ))}
      </p>
    </div>
  );
}
