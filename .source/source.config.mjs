// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
var docs = defineDocs({ dir: "content/docs" });
var commands = defineDocs({ dir: "content/commands" });
var errors = defineDocs({ dir: "content/errors" });
var recipes = defineDocs({ dir: "content/recipes" });
var roadmaps = defineDocs({ dir: "content/roadmaps" });
var packages = defineDocs({ dir: "content/packages" });
var tools = defineDocs({ dir: "content/tools" });
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
