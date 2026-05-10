import { useEffect, useState, type ReactNode } from "react";

interface WordStaggerItem {
  content: ReactNode;
  delayMs: number;
  className?: string;
}

interface WordStaggerProps {
  items: WordStaggerItem[];
  durationMs?: number;
}

/**
 * WordStagger — fades each child in with its own delay. Used on the
 * /about hero so "Doing", "Getting", and the closing line each get
 * their own typographic beat.
 */
export function WordStagger({ items, durationMs = 700 }: WordStaggerProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className={item.className}
          style={{
            display: "block",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(0.4em)",
            transition: `opacity ${durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${item.delayMs}ms, transform ${durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) ${item.delayMs}ms`,
          }}
        >
          {item.content}
        </span>
      ))}
    </>
  );
}
