/**
 * Roztomily client roster — used by the homepage marquee + anywhere
 * we need to show "brands we've worked with."
 *
 * Each entry references either a local file (`src`, supports PNG or SVG)
 * or a brand `domain` that `logoUrl()` resolves via img.logo.dev.
 * SVG paths are inline-loaded by the component so `currentColor` cascades
 * for theme-aware coloring.
 */

export type Client = {
  name: string;
  /** Local file in /public, e.g. "/roztomily/logos/Joy-1-300x300-transparent.png" or "/svg/customer-1.svg". */
  src?: string;
  /** Fallback brand domain — fetched via img.logo.dev when no `src` exists. */
  domain?: string;
};

export const clients: Client[] = [
  // Reference inline SVG marks — currentColor-aware, kept from the
  // original design system as anchor brands.
  { name: "Mark 01", src: "/svg/customer-1.svg" },
  { name: "Mark 02", src: "/svg/customer-2.svg" },
  { name: "Mark 03", src: "/svg/customer-3.svg" },
  { name: "Mark 04", src: "/svg/customer-4.svg" },
  { name: "Mark 05", src: "/svg/customer-5.svg" },
  { name: "Mark 06", src: "/svg/customer-6.svg" },

  // Roztomily campaign clients — local PNGs
  { name: "Bord Bia",     src: "/roztomily/logos/BoardBia-1-300x300-transparent.png" },
  { name: "Premier Cool", src: "/roztomily/logos/Premier-5-300x300-transparent.png" },
  { name: "Joy",          src: "/roztomily/logos/Joy-1-300x300-transparent.png" },
  { name: "Kings",        src: "/roztomily/logos/Kings-5-1-300x300-transparent.png" },
  { name: "Mamador",      src: "/roztomily/logos/mamador-5-300x300-transparent.png" },
  { name: "Morning Fresh",src: "/roztomily/logos/morningfresh-5-300x300-transparent.png" },
  { name: "Cussons Baby", src: "/roztomily/logos/cussonbaby-5-300x300-transparent.png" },
  { name: "PZ Cussons",   src: "/roztomily/logos/pzcussons-5-300x300-transparent.png" },

  // Additional brands — resolved via logo.dev
  { name: "ValueJet",  domain: "flyvaluejet.com" },
  { name: "Kerrygold", domain: "kerrygold.com" },
  { name: "Bet9ja",    domain: "bet9ja.com" },
  { name: "Carex",     domain: "carex.co.uk" },
  { name: "Regal",     domain: "regalgin.com" },
];

export const logoUrl = (domain: string, size = 400) =>
  `https://img.logo.dev/${domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=${size}&format=png&retina=true`;
