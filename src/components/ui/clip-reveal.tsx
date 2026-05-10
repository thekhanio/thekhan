import { useEffect, useRef, useState, type ReactNode } from "react";

interface ClipRevealProps {
  children: ReactNode;
  /** Delay before reveal starts (ms). */
  delayMs?: number;
  /** Duration of the wipe (ms). */
  durationMs?: number;
  /** "load" — fires once on mount. "scroll" — fires once on intersect. */
  trigger?: "load" | "scroll";
  className?: string;
  as?: "div" | "span";
}

/**
 * ClipReveal — clip-path wipe reveal. Used on H1 page-load reveals
 * and the /about portrait scroll-into-view reveal.
 *
 * Wipes from a fully-clipped state (inset 100% on the right) down
 * to inset 0 — content slides into view from left to right.
 */
export function ClipReveal({
  children,
  delayMs = 0,
  durationMs = 1600,
  trigger = "load",
  className = "",
  as = "div",
}: ClipRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (trigger === "load") {
      const t = setTimeout(() => setRevealed(true), delayMs);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = setTimeout(() => setRevealed(true), delayMs);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    const fallback = setTimeout(() => setRevealed(true), 1500 + delayMs);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
      clearTimeout(fallback);
    };
  }, [delayMs, trigger]);

  const style: React.CSSProperties = {
    clipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    WebkitClipPath: revealed ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
    transition: `clip-path ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-clip-path ${durationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
  };

  const Tag = as;
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLSpanElement>}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
