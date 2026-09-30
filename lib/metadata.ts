import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Generates consistent Next.js Metadata for any page.
 * Automatically computes canonical URL and OpenGraph/Twitter tags.
 */
export function buildMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const url = `${siteConfig.url}${path}`;
  const resolvedDescription = description ?? siteConfig.description;

  return {
    title,
    description: resolvedDescription,
    metadataBase: new URL(siteConfig.url),
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: resolvedDescription,
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
