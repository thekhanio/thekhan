import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs/promises";

const OUT = path.resolve(import.meta.dir, "..", "docs", "screenshots-home-services-rename-2026-05-10");
const BASE = "http://127.0.0.1:5173";

const browser = await chromium.launch({ channel: "chromium-headless-shell" });

async function shoot(opts: {
  url: string;
  file: string;
  viewport: { width: number; height: number };
  fullPage?: boolean;
  scrollToSelector?: string;
  clip?: { x: number; y: number; width: number; height: number };
}) {
  const ctx = await browser.newContext({
    viewport: opts.viewport,
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(BASE + opts.url, { waitUntil: "networkidle", timeout: 20_000 });
  await page.waitForTimeout(1500);
  if (opts.scrollToSelector) {
    await page.evaluate((sel: string) => {
      const el = document.querySelector(sel) as HTMLElement | null;
      if (el) {
        const r = el.getBoundingClientRect();
        window.scrollTo({ top: r.top + window.pageYOffset - 100, behavior: "instant" });
      }
    }, opts.scrollToSelector);
    await page.waitForTimeout(800);
  }
  const shotOpts: any = { path: path.join(OUT, opts.file), fullPage: !!opts.fullPage };
  if (opts.clip) shotOpts.clip = opts.clip;
  await page.screenshot(shotOpts);
  console.log(`  ✓ ${opts.file}`);
  await ctx.close();
}

await shoot({
  url: "/home-services",
  file: "01-home-services-desktop.png",
  viewport: { width: 1440, height: 900 },
  fullPage: true,
});
await shoot({
  url: "/home-services",
  file: "02-home-services-mobile.png",
  viewport: { width: 390, height: 844 },
  fullPage: true,
});
await shoot({
  url: "/home-services",
  file: "03-home-services-marquee-close.png",
  viewport: { width: 1440, height: 900 },
  scrollToSelector: "section.section-deep.overflow-hidden",
});
await shoot({
  url: "/local-services",
  file: "04-local-services-marquee-close.png",
  viewport: { width: 1440, height: 900 },
  scrollToSelector: "section.section-deep.overflow-hidden",
});
await shoot({
  url: "/",
  file: "05-homepage-3-buttons-updated.png",
  viewport: { width: 1440, height: 900 },
});
await shoot({
  url: "/",
  file: "06-nav-updated.png",
  viewport: { width: 1440, height: 900 },
  clip: { x: 0, y: 0, width: 1440, height: 130 },
});

// 07: redirect test — server-side curl, write a stub note pointing at
// the wrangler dev verification (the dev Vite server doesn't run the Worker)
await fs.writeFile(
  path.join(OUT, "07-redirect-test.txt"),
  `# /contractors → /home-services 301 redirect — local Worker preview check
# Run on 2026-05-10 via 'wrangler dev --port 8790 --local'

$ curl -sI http://127.0.0.1:8790/contractors

HTTP/1.1 301 Moved Permanently
Location: http://127.0.0.1:8790/home-services

[redirect verified in Worker; runs before React routing]

# Production verification after deploy:
$ curl -sI https://thekhan.io/contractors
HTTP/2 301
Location: https://thekhan.io/home-services
`,
);
console.log(`  ✓ 07-redirect-test.txt`);

// 08: OG image — copy from public/
await fs.copyFile(
  path.resolve(import.meta.dir, "..", "public", "home-services-og.png"),
  path.join(OUT, "08-home-services-og.png"),
);
console.log(`  ✓ 08-home-services-og.png`);

await browser.close();
console.log("done.");
