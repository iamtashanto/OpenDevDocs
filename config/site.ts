/**
 * Site-wide configuration — single source of truth.
 * Import from here rather than hardcoding values in components.
 */
export const siteConfig = {
  name: "OpenDevDocs",
  tagline: "Learn. Build. Debug. Deploy.",
  description:
    "The open-source developer knowledge platform. Learn technologies step-by-step, find commands quickly, solve common errors, follow practical recipes, and move from beginner fundamentals to production-level development.",
  url: "https://docs.tashanto.com",
  github: "https://github.com/iamtashanto/OpenDevDocs",
  twitterHandle: "@OpenDevDocs",
} as const;

/**
 * The seven content sections of OpenDevDocs.
 * This is the authoritative list — used to generate navigation, sitemap, etc.
 */
export const contentSections = [
  {
    key: "docs",
    label: "Docs",
    href: "/docs",
    icon: "📖",
    description: "In-depth learning guides and references.",
    color: "blue",
  },
  {
    key: "commands",
    label: "Commands",
    href: "/commands",
    icon: "⌨️",
    description: "Copy-paste ready CLI command references.",
    color: "emerald",
  },
  {
    key: "errors",
    label: "Errors",
    href: "/errors",
    icon: "🔥",
    description: "Common errors with root cause and fix.",
    color: "red",
  },
  {
    key: "recipes",
    label: "Recipes",
    href: "/recipes",
    icon: "🧪",
    description: "Practical patterns you can adapt immediately.",
    color: "violet",
  },
  {
    key: "roadmaps",
    label: "Roadmaps",
    href: "/roadmaps",
    icon: "🗺️",
    description: "Structured paths from beginner to production.",
    color: "amber",
  },
  {
    key: "packages",
    label: "Packages",
    href: "/packages",
    icon: "📦",
    description: "Library API docs and usage patterns.",
    color: "cyan",
  },
  {
    key: "tools",
    label: "Tools",
    href: "/tools",
    icon: "🛠️",
    description: "Guides for the tools in your workflow.",
    color: "rose",
  },
] as const;

export type ContentSectionKey = (typeof contentSections)[number]["key"];
