/**
 * TextMarquee — single-line, slower-scroll variant of the homepage
 * marquee. Used on sub-pages; styled solid OR outlined to differentiate
 * from homepage (which is solid + outlined two-line).
 */

interface TextMarqueeProps {
  items: string[];
  /** "solid" — filled glyphs. "outlined" — stroked only. */
  variant?: "solid" | "outlined";
  /** Animation duration override (longer = slower). */
  durationSec?: number;
  className?: string;
}

const SEPARATOR = "·";

function TextList({ items, variant }: { items: string[]; variant: "solid" | "outlined" }) {
  return (
    <span className="flex items-center">
      {items.map((item, i) => (
        <span
          key={i}
          className={`marquee-text ${variant === "outlined" ? "marquee-text-ghost" : ""}`}
        >
          {item}
          <span className="opacity-40 px-2">{SEPARATOR}</span>
        </span>
      ))}
    </span>
  );
}

export function TextMarquee({
  items,
  variant = "solid",
  durationSec = 80,
  className = "",
}: TextMarqueeProps) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className="marquee-track"
        style={{ animationDuration: `${durationSec}s` }}
      >
        <TextList items={items} variant={variant} />
        <TextList items={items} variant={variant} />
      </div>
    </div>
  );
}
