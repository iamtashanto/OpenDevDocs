/**
 * Global MDX component registry.
 *
 * Next.js looks for this file at the project root when MDX is enabled.
 * Components exported here are available in ALL .md and .mdx files
 * without any per-file import.
 *
 * fumadocs-ui's defaultMdxComponents are spread in first so our
 * components can override individual elements if needed.
 */
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Callout } from "@/components/mdx/callout";
import { Step, Steps } from "@/components/mdx/steps";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // fumadocs-ui defaults (pre, code blocks, links, images, headings, etc.)
    ...defaultMdxComponents,

    // Custom OpenDevDocs components — available in all .md/.mdx files
    Callout,
    Step,
    Steps,

    // Spread caller overrides last so page-level components win
    ...components,
  };
}
