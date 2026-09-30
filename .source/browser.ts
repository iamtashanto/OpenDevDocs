// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  commands: create.doc("commands", {"git/git-commands.md": () => import("../content/commands/git/git-commands.md?collection=commands"), "index.md": () => import("../content/commands/index.md?collection=commands"), }),
  docs: create.doc("docs", {"getting-started/getting-started.md": () => import("../content/docs/getting-started/getting-started.md?collection=docs"), "getting-started/introduction.md": () => import("../content/docs/getting-started/introduction.md?collection=docs"), "index.md": () => import("../content/docs/index.md?collection=docs"), }),
  errors: create.doc("errors", {"index.md": () => import("../content/errors/index.md?collection=errors"), "javascript/cannot-read-properties-of-undefined.md": () => import("../content/errors/javascript/cannot-read-properties-of-undefined.md?collection=errors"), }),
  packages: create.doc("packages", {"index.md": () => import("../content/packages/index.md?collection=packages"), }),
  recipes: create.doc("recipes", {"index.md": () => import("../content/recipes/index.md?collection=recipes"), }),
  roadmaps: create.doc("roadmaps", {"index.md": () => import("../content/roadmaps/index.md?collection=roadmaps"), }),
  tools: create.doc("tools", {"index.md": () => import("../content/tools/index.md?collection=tools"), }),
};
export default browserCollections;