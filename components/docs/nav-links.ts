import type { LinkItemType } from "fumadocs-ui/layouts/shared";
import { siteConfig, contentSections } from "@/config/site";

/**
 * Returns the shared DocsLayout nav links, omitting the current section
 * so the active section isn't shown as a cross-link.
 *
 * Usage:
 *   import { buildSharedNavLinks } from "@/components/docs/nav-links";
 *   const links = buildSharedNavLinks("docs");
 */
export function buildSharedNavLinks(
  currentKey: string
): LinkItemType[] {
  return contentSections
    .filter((s) => s.key !== currentKey)
    .map((s) => ({
      type: "main" as const,
      text: s.label,
      url: s.href,
    }));
}

/**
 * Common DocsLayout props shared across all 7 section layouts.
 */
export const sharedDocsLayoutProps = {
  nav: {
    title: `⚡ ${siteConfig.name}`,
    url: "/",
  },
  githubUrl: siteConfig.github,
  themeSwitch: {
    mode: "light-dark-system",
  },
} as const;
