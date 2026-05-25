/**
 * ServiceMarquee — horizontal scrolling breadth signal.
 *
 * Two lines: home-service trades (solid Anton) on top, local verticals
 * (outlined ghost) below — signals "I serve both." Each line is one
 * .marquee-track containing two identical children blocks; the track
 * animates translateX(0) → translateX(-50%) so the second copy slides
 * exactly into the first copy's start position. Seamless infinite loop.
 */

const TRADES = [
  "Pressure Washing",
  "Window Cleaning",
  "Landscaping",
  "Roofing",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Painting",
  "Gutter Cleaning",
  "Snow Removal",
];

const VERTICALS = [
  "Dentists",
  "Med Spas",
  "Salons & Barbers",
  "Real Estate",
  "Restaurants",
  "Gyms & Fitness",
  "Auto",
  "Chiropractors",
  "Law Offices",
  "Pet Services",
];

const SEPARATOR = "—";

function MarqueeList({ items, ghost = false }: { items: string[]; ghost?: boolean }) {
  return (
    <span className="flex items-center">
      {items.map((svc, i) => (
        <span key={i} className={`marquee-text ${ghost ? "marquee-text-ghost" : ""}`}>
          {svc}
          <span className="opacity-40 px-2">{SEPARATOR}</span>
        </span>
      ))}
    </span>
  );
}

function MarqueeRow({ items, ghost = false }: { items: string[]; ghost?: boolean }) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {/* Two identical copies; -50% translate = one full copy width */}
        <MarqueeList items={items} ghost={ghost} />
        <MarqueeList items={items} ghost={ghost} />
      </div>
    </div>
  );
}

export function ServiceMarquee({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <MarqueeRow items={TRADES} />
      <MarqueeRow items={VERTICALS} ghost />
    </div>
  );
}
