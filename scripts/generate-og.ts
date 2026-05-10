/**
 * OG image generator — Satori → SVG → PNG via resvg.
 *
 * One-shot script. Run via: bun scripts/generate-og.ts
 *
 * - Brand fonts pulled from Google Fonts (woff2)
 * - TK logo composited from public/portfolio/logo-white.png as base64
 * - 5 pages, identical template, per-page copy
 * - Output: public/{og-image,websites-og,home-services-og,portfolio-og,about-og}.png
 *           + copies to docs/og-images-preview-2026-05-10/
 */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
// @ts-ignore — no types ship with the package
import wawoff from "wawoff2";

const ROOT = path.resolve(import.meta.dir, "..");
const PUBLIC_DIR = path.join(ROOT, "public");
const PREVIEW_DIR = path.join(ROOT, "docs", "og-images-preview-2026-05-10");

const COLORS = {
  bg: "#1F1B17",
  cream: "#F5F1EB",
  sage: "#9BC4A8",
  subhead: "#C7C3BC",
};

const PAGES = [
  {
    out: "og-image.png",
    preview: "01-home-og.png",
    line1: "Websites that rank.",
    line2: "Marketing that pays off.",
    subhead: "I build websites and run the marketing that brings in real business.",
  },
  {
    out: "websites-og.png",
    preview: "02-websites-og.png",
    line1: "A site you own.",
    line2: "Built to rank.",
    subhead: "Custom websites in about 30 days. You own everything.",
  },
  {
    out: "home-services-og.png",
    preview: "03-home-services-og.png",
    line1: "You do the work.",
    line2: "I make sure people find you.",
    subhead: "Home services marketing that makes your phone ring.",
  },
  {
    out: "portfolio-og.png",
    preview: "04-portfolio-og.png",
    line1: "Who I've built for.",
    line2: "11 sites, all live.",
    subhead: "Click any of them to see for yourself.",
  },
  {
    out: "about-og.png",
    preview: "05-about-og.png",
    line1: "Every business has two jobs.",
    line2: "The second one is all I do now.",
    subhead: "Solo, based in Deerfield, IL.",
  },
  {
    out: "local-services-og.png",
    preview: "06-local-services-og.png",
    line1: "You do the work.",
    line2: "I make sure people find you.",
    subhead: "Local services marketing that brings in real business.",
  },
] as const;

async function fetchGoogleFont(
  family: string,
  weight: number,
  text: string,
  style: "normal" | "italic" = "normal"
): Promise<ArrayBuffer> {
  const styleParam = style === "italic" ? "ital,wght@1," : "wght@";
  // text= forces Google to bundle every glyph we actually use into a single woff2.
  const textParam = `&text=${encodeURIComponent(text)}`;
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:${styleParam}${weight}${textParam}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  }).then((r) => r.text());

  // With text= the URL has no .woff2 extension (kit endpoint). Match any gstatic url
  // followed by a format('woff2') hint.
  const match = css.match(/src:\s*url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)\s*format\('woff2'\)/);
  if (!match) {
    throw new Error(`Could not parse woff2 URL for ${family} ${weight}\nCSS:\n${css}`);
  }
  const woff2 = await fetch(match[1]).then((r) => r.arrayBuffer());
  // Satori needs TTF/OTF — decompress WOFF2 → TTF
  const ttfBytes: Uint8Array = await wawoff.decompress(new Uint8Array(woff2));
  return ttfBytes.buffer.slice(ttfBytes.byteOffset, ttfBytes.byteOffset + ttfBytes.byteLength) as ArrayBuffer;
}

function unique(s: string): string {
  return Array.from(new Set(s.split(""))).join("");
}

async function loadLogoDataUri(): Promise<string> {
  const file = await readFile(path.join(PUBLIC_DIR, "portfolio", "logo-white.png"));
  return `data:image/png;base64,${file.toString("base64")}`;
}

function template(opts: {
  line1: string;
  line2: string;
  subhead: string;
  logoDataUri: string;
}) {
  // Satori-compatible JSX as plain object tree (avoids needing TSX)
  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        backgroundColor: COLORS.bg,
        position: "relative",
      },
      children: [
        // Subtle sage radial glow upper-right (as a positioned div with radial-gradient
        // background). Satori supports radial-gradient on backgrounds.
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              top: "-200px",
              right: "-200px",
              width: "800px",
              height: "800px",
              backgroundImage: `radial-gradient(circle, rgba(155,196,168,0.18) 0%, rgba(155,196,168,0) 65%)`,
              display: "flex",
            },
          },
        },
        // Top: TK logo
        {
          type: "div",
          props: {
            style: { display: "flex" },
            children: [
              {
                type: "img",
                props: {
                  src: opts.logoDataUri,
                  width: 174,
                  height: 64,
                  style: { objectFit: "contain" },
                },
              },
            ],
          },
        },
        // Middle: headline + subhead
        {
          type: "div",
          props: {
            style: { display: "flex", flexDirection: "column" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Anton",
                    fontSize: "82px",
                    color: COLORS.cream,
                    lineHeight: 0.95,
                    letterSpacing: "-0.005em",
                    textTransform: "uppercase",
                    display: "flex",
                  },
                  children: opts.line1,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Anton",
                    fontSize: "82px",
                    color: COLORS.sage,
                    lineHeight: 0.95,
                    letterSpacing: "-0.005em",
                    textTransform: "uppercase",
                    marginTop: "8px",
                    display: "flex",
                  },
                  children: opts.line2,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Manrope",
                    fontWeight: 400,
                    fontSize: "28px",
                    color: COLORS.subhead,
                    lineHeight: 1.45,
                    marginTop: "32px",
                    maxWidth: "960px",
                    display: "flex",
                  },
                  children: opts.subhead,
                },
              },
            ],
          },
        },
        // Bottom: footer location strip
        {
          type: "div",
          props: {
            style: {
              fontFamily: "JetBrainsMono",
              fontWeight: 500,
              fontSize: "16px",
              color: COLORS.sage,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
            },
            children: "thekhan.io  ·  Deerfield, IL",
          },
        },
      ],
    },
  };
}

async function main() {
  await mkdir(PREVIEW_DIR, { recursive: true });

  // Build a unique character set across ALL pages so Google Fonts subsets
  // include every glyph we render (otherwise we get tofu boxes).
  const headlineChars = unique(
    PAGES.flatMap((p) => [p.line1.toUpperCase(), p.line2.toUpperCase()]).join("")
  );
  const bodyChars = unique(PAGES.map((p) => p.subhead).join(""));
  const monoChars = unique("THEKHAN.IO  ·  DEERFIELD, IL".toUpperCase() + "thekhan.io  ·  Deerfield, IL");

  console.log("Fetching brand fonts from Google Fonts…");
  const [anton, manrope400, jetbrainsMono500] = await Promise.all([
    fetchGoogleFont("Anton", 400, headlineChars),
    fetchGoogleFont("Manrope", 400, bodyChars),
    fetchGoogleFont("JetBrains Mono", 500, monoChars),
  ]);
  console.log(`  Anton: ${anton.byteLength} B · Manrope 400: ${manrope400.byteLength} B · JetBrains Mono 500: ${jetbrainsMono500.byteLength} B`);

  const logoDataUri = await loadLogoDataUri();

  const fonts = [
    { name: "Anton", data: anton, weight: 400 as const, style: "normal" as const },
    { name: "Manrope", data: manrope400, weight: 400 as const, style: "normal" as const },
    { name: "JetBrainsMono", data: jetbrainsMono500, weight: 500 as const, style: "normal" as const },
  ];

  for (const page of PAGES) {
    const tree = template({
      line1: page.line1,
      line2: page.line2,
      subhead: page.subhead,
      logoDataUri,
    });
    // satori takes a React-element-shaped object — our hand-built tree matches
    const svg = await satori(tree as any, {
      width: 1200,
      height: 630,
      fonts,
    });

    const png = new Resvg(svg, {
      fitTo: { mode: "width", value: 1200 },
    })
      .render()
      .asPng();

    const outPath = path.join(PUBLIC_DIR, page.out);
    const previewPath = path.join(PREVIEW_DIR, page.preview);
    await writeFile(outPath, png);
    await writeFile(previewPath, png);

    console.log(`  ✓ ${page.out} (${(png.byteLength / 1024).toFixed(1)} KB)`);
  }

  console.log("\nAll 6 OG images generated.");
}

await main();
