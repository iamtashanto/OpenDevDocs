/**
 * Global MDX component registry.
 *
 * Next.js looks for this file at the project root when MDX is enabled.
 * Components exported here are available in ALL .md and .mdx files
 * without any per-file import.
 */
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import {
  Callout,
  Warning,
  Info,
  Tip,
  Danger,
  Command,
  Terminal,
  Step,
  Steps,
  CodeGroup,
  Tab,
  Tabs,
  PackageManagerTabs,
  OSTabs,
  FileTree,
  File,
  Folder,
  VersionBadge,
  KeyboardShortcut,
  ExpandableDetails,
  RoadmapView,
} from "@/components/mdx";
import { Badge, Button, Kbd } from "@/components/ui";

export const globalMdxComponents: MDXComponents = {
  // fumadocs-ui defaults (pre, code blocks, links, images, headings, etc.)
  ...defaultMdxComponents,

  // Custom OpenDevDocs documentation components
  Callout,
  Warning,
  Info,
  Tip,
  Danger,
  Command,
  Terminal,
  Step,
  Steps,
  CodeGroup,
  Tab,
  Tabs,
  PackageManagerTabs,
  OSTabs,
  FileTree,
  File,
  Folder,
  VersionBadge,
  KeyboardShortcut,
  ExpandableDetails,
  RoadmapView,
  Badge,
  Button,
  Kbd,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...globalMdxComponents,
    ...components,
  };
}

