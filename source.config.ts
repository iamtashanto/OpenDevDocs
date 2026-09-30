import { defineDocs, defineConfig } from "fumadocs-mdx/config";

// Docs / Learning — long-form guides and references
export const docs = defineDocs({ dir: "content/docs" });

// Commands — quick-reference command listings
export const commands = defineDocs({ dir: "content/commands" });

// Errors / Troubleshooting
export const errors = defineDocs({ dir: "content/errors" });

// Recipes — practical step-by-step how-tos
export const recipes = defineDocs({ dir: "content/recipes" });

// Learning Paths / Roadmaps
export const roadmaps = defineDocs({ dir: "content/roadmaps" });

// Packages — library and package references
export const packages = defineDocs({ dir: "content/packages" });

// Developer Tools
export const tools = defineDocs({ dir: "content/tools" });

export default defineConfig({
  mdxOptions: {
    // Recommended: keep the default remark/rehype pipeline from fumadocs
  },
});
