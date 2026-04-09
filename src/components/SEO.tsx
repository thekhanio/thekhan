// React 19 native document metadata. No external dep.
// `<title>`, `<meta>`, and `<link>` are hoisted to <head> automatically.
// `<script type="application/ld+json">` renders inline where this component mounts —
// valid per schema.org spec and read by Google regardless of placement.

type Geo = {
  region: string;
  placename: string;
  position: string; // "lat;lng"
};

type Props = {
  title: string;
  description: string;
  canonical: string;
  ogType?: "website" | "profile" | "article";
  ogImage?: string;
  noindex?: boolean;
  geo?: Geo;
  schema?: object | object[];
};

const DEFAULT_OG_IMAGE = "https://thekhan.io/og-image.jpg";

export function SEO({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  noindex,
  geo,
  schema,
}: Props) {
  const schemas = schema ? (Array.isArray(schema) ? schema : [schema]) : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="TheKhan" />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {geo && (
        <>
          <meta name="geo.region" content={geo.region} />
          <meta name="geo.placename" content={geo.placename} />
          <meta name="geo.position" content={geo.position} />
          <meta name="ICBM" content={geo.position.replace(";", ", ")} />
        </>
      )}

      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
    </>
  );
}
