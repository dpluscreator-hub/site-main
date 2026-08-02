// Single source of truth for site-wide SEO/identity values. Reused by metadata,
// JSON-LD schema, sitemap and robots so they can never drift apart.

export const SITE_URL = "https://dpluscreator.com";
export const SITE_NAME = "DPlus Creator";
export const SITE_TAGLINE = "Creative Digital Agency";

export const SITE_DESCRIPTION =
  "DPLUS Creator is a creative social media agency helping brands grow and stand out online through branding, content creation, social strategy, and performance marketing.";

// Used as the Organization logo and OG fallback (absolute URLs required by schema).
export const SITE_LOGO = `${SITE_URL}/web-app-manifest-512x512.png`;

export const CONTACT = {
  email: "dpluscreator@gmail.com",
  phone: "+917693063186",
  phoneDisplay: "+91 7693063186",
} as const;

// Social / authority profiles (Organization.sameAs).
export const SOCIAL_PROFILES = [
  "https://www.instagram.com/d_pluscreator",
];

// Markets the agency targets (schema areaServed / content intent).
export const AREAS_SERVED = ["IN", "Asia", "Europe", "North America"];

/** Absolute URL helper for a site-relative path. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
