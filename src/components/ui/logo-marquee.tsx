/**
 * LogoMarquee — large clickable brand logos, scrolling slowly,
 * pause-on-hover. Used on /portfolio under the hero.
 *
 * Differentiated from ClientTrustStrip (homepage): bigger logos,
 * slower, clickable, top-of-page centerpiece.
 */

interface LogoMarqueeItem {
  name: string;
  url: string;
  logo: string;
  /** Optional override for logo height multiplier (some logos read tiny). */
  scale?: number;
}

interface LogoMarqueeProps {
  items: LogoMarqueeItem[];
  durationSec?: number;
}

function LogoList({ items }: { items: LogoMarqueeItem[] }) {
  return (
    <span className="flex items-center">
      {items.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${item.name}`}
          className="logo-marquee-cell"
        >
          <img
            src={item.logo}
            alt={item.name}
            className="logo-marquee-img"
            loading="lazy"
            style={item.scale ? { transform: `scale(${item.scale})` } : undefined}
          />
        </a>
      ))}
    </span>
  );
}

export function LogoMarquee({ items, durationSec = 95 }: LogoMarqueeProps) {
  return (
    <div className="logo-marquee">
      <div
        className="logo-marquee-track"
        style={{ animationDuration: `${durationSec}s` }}
      >
        <LogoList items={items} />
        <LogoList items={items} />
      </div>
    </div>
  );
}
