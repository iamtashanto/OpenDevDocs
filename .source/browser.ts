// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  commands: create.doc("commands", {"docker/run.md": () => import("../content/commands/docker/run.md?collection=commands"), "docker/system-prune.md": () => import("../content/commands/docker/system-prune.md?collection=commands"), "git/git-commands.md": () => import("../content/commands/git/git-commands.md?collection=commands"), "git/reset-soft.md": () => import("../content/commands/git/reset-soft.md?collection=commands"), "index.md": () => import("../content/commands/index.md?collection=commands"), "linux/kill-process-port.md": () => import("../content/commands/linux/kill-process-port.md?collection=commands"), "networking/check-open-ports.md": () => import("../content/commands/networking/check-open-ports.md?collection=commands"), "pnpm/clean-install.md": () => import("../content/commands/pnpm/clean-install.md?collection=commands"), "postgresql/dump-database.md": () => import("../content/commands/postgresql/dump-database.md?collection=commands"), "ssh/generate-key.md": () => import("../content/commands/ssh/generate-key.md?collection=commands"), }),
  docs: create.doc("docs", {"docker/containers.md": () => import("../content/docs/docker/containers.md?collection=docs"), "docker/installation-ubuntu.md": () => import("../content/docs/docker/installation-ubuntu.md?collection=docs"), "getting-started/getting-started.md": () => import("../content/docs/getting-started/getting-started.md?collection=docs"), "getting-started/introduction.md": () => import("../content/docs/getting-started/introduction.md?collection=docs"), "index.md": () => import("../content/docs/index.md?collection=docs"), "javascript/variables.md": () => import("../content/docs/javascript/variables.md?collection=docs"), "mdx-components.md": () => import("../content/docs/mdx-components.md?collection=docs"), "meta-schema.md": () => import("../content/docs/meta-schema.md?collection=docs"), "nextjs/routing.md": () => import("../content/docs/nextjs/routing.md?collection=docs"), "react/hooks/use-effect.md": () => import("../content/docs/react/hooks/use-effect.md?collection=docs"), }),
  errors: create.doc("errors", {"index.md": () => import("../content/errors/index.md?collection=errors"), "javascript/cannot-read-properties-of-undefined.md": () => import("../content/errors/javascript/cannot-read-properties-of-undefined.md?collection=errors"), }),
  packages: create.doc("packages", {"index.md": () => import("../content/packages/index.md?collection=packages"), }),
  recipes: create.doc("recipes", {"index.md": () => import("../content/recipes/index.md?collection=recipes"), }),
  roadmaps: create.doc("roadmaps", {"index.md": () => import("../content/roadmaps/index.md?collection=roadmaps"), }),
  tools: create.doc("tools", {"index.md": () => import("../content/tools/index.md?collection=tools"), }),
};
export default browserCollections;