// JSON-LD schema builders. Each returns a plain object rendered by <JsonLd/>.
// @id values cross-link the graph (Organization <- WebSite <- pages) so search
// engines treat them as one connected entity.

import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_LOGO,
  CONTACT,
  SOCIAL_PROFILES,
  AREAS_SERVED,
  absoluteUrl,
} from "./site";

type Schema = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    image: SITE_LOGO,
    description: SITE_DESCRIPTION,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    sameAs: SOCIAL_PROFILES,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.email,
      telephone: CONTACT.phone,
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteSchema(): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: Array.isArray(faqs)
      ? faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        }))
      : [],
  };
}

export function professionalServiceSchema(services: string[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#service`,
    name: SITE_NAME,
    image: SITE_LOGO,
    url: absoluteUrl("/services"),
    description:
      "Branding, content creation, social media strategy, video production and performance marketing for brands that want to grow online.",
    telephone: CONTACT.phone,
    email: CONTACT.email,
    priceRange: "$$",
    sameAs: SOCIAL_PROFILES,
    provider: { "@id": ORG_ID },
    areaServed: AREAS_SERVED.map((name) => ({ "@type": "AdministrativeArea", name })),
    makesOffer: services.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name, provider: { "@id": ORG_ID } },
    })),
  };
}

export interface Crumb {
  name: string;
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export interface WorkItem {
  title: string;
  category?: string;
}

export function workCollectionSchema(projects: WorkItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl("/work")}#webpage`,
    url: absoluteUrl("/work"),
    name: `Our Work | ${SITE_NAME}`,
    description:
      "Selected branding, content, video and social media projects delivered by DPLUS Creator.",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: project.title,
        ...(project.category ? { description: project.category } : {}),
      })),
    },
  };
}
