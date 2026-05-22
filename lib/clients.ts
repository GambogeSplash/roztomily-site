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
  /** Opt out of the dark-mode invert filter — for logos that are already light/white. */
  keepColor?: boolean;
};

export const clients: Client[] = [
  // Roztomily campaign clients — local PNGs
  { name: "Bord Bia",          src: "/roztomily/logos/BoardBia-1-300x300-transparent.png" },
  { name: "NNPC Retail",       src: "/roztomily/logos/nnpc-retail-transparent.png" },
  { name: "AgroPartnerships",  src: "/roztomily/logos/agropartnerships-transparent.png" },
  { name: "Drinks Fest Lagos", src: "/roztomily/logos/drinks-fest-lagos-transparent.png", keepColor: true },

  // Additional brands — resolved via logo.dev
  { name: "ValueJet",  domain: "flyvaluejet.com" },
  { name: "Kerrygold", domain: "kerrygold.com" },
  { name: "Bet9ja",    src: "/roztomily/logos/bet9ja-transparent.png" },
  { name: "Regal",     src: "/roztomily/logos/regal-gin-transparent.png" },
];

export const logoUrl = (domain: string, size = 400) =>
  `https://img.logo.dev/${domain}?token=pk_X-1ZO13GSgeOoUrIuJ6GMQ&size=${size}&format=png&retina=true`;
