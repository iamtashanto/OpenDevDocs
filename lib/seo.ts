import type { Metadata } from "next";

export const SITE_URL = "https://docs.tashanto.com";
export const SITE_NAME = "OpenDevDocs";
export const DEFAULT_TITLE = "OpenDevDocs — Learn. Build. Debug. Deploy.";
export const DEFAULT_DESCRIPTION =
  "The open-source developer knowledge platform. Step-by-step guides, command references, troubleshooting, practical recipes, and roadmaps for modern software engineering.";

export interface SeoOptions {
  title: string;
  description?: string;
  urlPath?: string;
  ogType?: "article" | "website";
  tags?: string[];
  category?: string;
  lastVerified?: string;
  noIndex?: boolean;
}

/**
 * Builds standardized Next.js Metadata objects with Canonical URLs, Open Graph, and Twitter tags.
 */
export function buildPageMetadata(options: SeoOptions): Metadata {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    urlPath = "",
    ogType = "article",
    tags = [],
    noIndex = false,
  } = options;

  const cleanPath = urlPath.startsWith("/") ? urlPath : `/${urlPath}`;
  const canonicalUrl = `${SITE_URL}${cleanPath === "/" ? "" : cleanPath}`;
  const formattedTitle = title.includes("OpenDevDocs") ? title : title;

  return {
    title: formattedTitle,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    keywords: [
      ...tags,
      "developer documentation",
      "coding guide",
      "open source",
      "software development",
    ],
    openGraph: {
      type: ogType,
      locale: "en_US",
      url: canonicalUrl,
      siteName: SITE_NAME,
      title: formattedTitle,
      description,
      images: [
        {
          url: `${SITE_URL}/og-default.png`,
          width: 1200,
          height: 630,
          alt: formattedTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      creator: "@tashanto",
      images: [`${SITE_URL}/og-default.png`],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/**
 * Generates Schema.org TechArticle JSON-LD structured data.
 */
export function generateArticleJsonLd(options: {
  title: string;
  description: string;
  urlPath: string;
  lastVerified?: string;
  category?: string;
  tags?: string[];
}) {
  const canonicalUrl = `${SITE_URL}${options.urlPath.startsWith("/") ? options.urlPath : `/${options.urlPath}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: options.title,
    description: options.description,
    url: canonicalUrl,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    dateModified: options.lastVerified || "2026-09-30",
    author: {
      "@type": "Organization",
      name: "OpenDevDocs Contributors",
      url: "https://github.com/iamtashanto/OpenDevDocs",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    keywords: options.tags?.join(", ") || options.category || "programming",
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD structured data.
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generates Schema.org WebSite JSON-LD structured data with SearchAction.
 */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/docs?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}
