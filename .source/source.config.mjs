// source.config.ts
import { defineDocs, defineConfig, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";
var openDevDocsFrontmatterSchema = frontmatterSchema.extend({
  category: z.string().optional(),
  topic: z.string().optional(),
  type: z.enum(["guide", "concept", "reference", "tutorial", "troubleshooting", "recipe"]).optional(),
  level: z.enum(["beginner", "intermediate", "advanced", "production"]).optional(),
  tags: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  tested: z.record(z.string(), z.string()).optional(),
  lastVerified: z.string().optional(),
  draft: z.boolean().optional()
});
var docs = defineDocs({
  dir: "content/docs",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var commands = defineDocs({
  dir: "content/commands",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var errors = defineDocs({
  dir: "content/errors",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var recipes = defineDocs({
  dir: "content/recipes",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var roadmaps = defineDocs({
  dir: "content/roadmaps",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var packages = defineDocs({
  dir: "content/packages",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var tools = defineDocs({
  dir: "content/tools",
  docs: { schema: openDevDocsFrontmatterSchema }
});
var source_config_default = defineConfig({
  mdxOptions: {
    // Recommended: keep the default remark/rehype pipeline from fumadocs
  }
});
export {
  commands,
  source_config_default as default,
  docs,
  errors,
  packages,
  recipes,
  roadmaps,
  tools
};
