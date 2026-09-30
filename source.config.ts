import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

/**
 * Strict content metadata schema for OpenDevDocs.
 * Ensures consistent metadata across thousands of documentation files.
 */
const openDevDocsFrontmatterSchema = frontmatterSchema.extend({
  category: z.string().optional(),
  topic: z.string().optional(),
  type: z
    .enum(["guide", "concept", "reference", "tutorial", "troubleshooting", "recipe"])
    .optional(),
  level: z
    .enum(["beginner", "intermediate", "advanced", "production"])
    .optional(),
  tags: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  tested: z.record(z.string(), z.string()).optional(),
  lastVerified: z.string().optional(),
  draft: z.boolean().optional(),
});

// Docs / Learning — long-form guides and references
export const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Commands — quick-reference command listings
export const commands = defineDocs({
  dir: "content/commands",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Errors / Troubleshooting
export const errors = defineDocs({
  dir: "content/errors",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Recipes — practical step-by-step how-tos
export const recipes = defineDocs({
  dir: "content/recipes",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Learning Paths / Roadmaps
export const roadmaps = defineDocs({
  dir: "content/roadmaps",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Packages — library and package references
export const packages = defineDocs({
  dir: "content/packages",
  docs: { schema: openDevDocsFrontmatterSchema },
});

// Developer Tools
export const tools = defineDocs({
  dir: "content/tools",
  docs: { schema: openDevDocsFrontmatterSchema },
});

export default defineConfig({
  mdxOptions: {
    // Recommended: keep the default remark/rehype pipeline from fumadocs
  },
});
