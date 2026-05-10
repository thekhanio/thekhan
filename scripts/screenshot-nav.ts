import { chromium } from "playwright";
import path from "node:path";

const OUT = path.resolve(
  import.meta.dir,
  "..",
  "docs",
  "screenshots-final-polish-2026-05-10",
  "01-nav-no-deerfield.png"
);
const BASE = "http://127.0.0.1:5173";

const browser = await chromium.launch({ channel: "chromium-headless-shell" });
const ctx = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await ctx.newPage();
await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 20_000 });
await page.waitForTimeout(800);
await page.screenshot({
  path: OUT,
  clip: { x: 0, y: 0, width: 1440, height: 130 },
});
console.log(`  ✓ ${OUT}`);
await browser.close();
