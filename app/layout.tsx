import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteNav } from "@/components/blocks/SiteNav";
import { SiteFooter } from "@/components/blocks/SiteFooter";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MagicCursor } from "@/components/ui/MagicCursor";

/* ── SEO + social metadata ────────────────────────────────────────── */
const SITE_URL = "https://www.roztomilygroup.com";
const SITE_NAME = "Roztomily";
const TAGLINE = "We engineer influence.";
const DESCRIPTION =
  "Roztomily is a full-service Integrated Marketing Communications agency in Lagos. PR, media relations, experiential marketing, digital, creative production, and talent management — built for brands that want to be seen, understood, and remembered.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} · ${TAGLINE}`,
    template: `%s · ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "PR agency Lagos",
    "Integrated Marketing Communications",
    "experiential marketing Nigeria",
    "brand campaigns Lagos",
    "media relations Nigeria",
    "creative production Lagos",
    "Roztomily",
    "Roztomily Group",
  ],
  category: "marketing",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DESCRIPTION,
    /* `images` is intentionally omitted — Next 16 auto-resolves
       app/opengraph-image.tsx and injects the correct meta tag. */
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} · ${TAGLINE}`,
    description: DESCRIPTION,
    /* Same — falls back to opengraph-image.tsx if no twitter-image.tsx exists. */
    creator: "@roztomily",
    site: "@roztomily",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  /* Brand-red theme color — tints the Safari/iOS browser chrome
     (tab bar, address bar, status bar) with Roztomily red. */
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dc2c25" },
    { media: "(prefers-color-scheme: dark)", color: "#dc2c25" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

/* JSON-LD Organization schema — helps Google understand who Roztomily is. */
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Roztomily Group",
  alternateName: "Roztomily",
  url: SITE_URL,
  logo: `${SITE_URL}/roztomily/logo.svg`,
  description: DESCRIPTION,
  email: "hello@roztomilygroup.com",
  telephone: "+234-90-000-0000",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  sameAs: [
    "https://instagram.com/roztomily",
    "https://linkedin.com/company/roztomily",
    "https://x.com/roztomily",
  ],
  knowsAbout: [
    "PR & Brand Marketing",
    "Media Relations",
    "Experiential Marketing",
    "Digital Marketing",
    "Creative Production",
    "Talent Management",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  /* Site is locked to dark mode — no toggle, no preference flip. */
  const noFlash = `
(function(){try{
  document.documentElement.dataset.theme = 'dark';
  document.documentElement.dataset.themeMode = 'dark';
}catch(e){}})();`;
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Big+Shoulders:wght@500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
      </head>
      <body>
        <ScrollProgress />
        <MagicCursor />
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
