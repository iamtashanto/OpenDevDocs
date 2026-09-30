// @ts-nocheck
import * as __fd_glob_39 from "../content/docs/react/hooks/use-effect.md?collection=docs"
import * as __fd_glob_38 from "../content/docs/nextjs/routing.md?collection=docs"
import * as __fd_glob_37 from "../content/docs/meta-schema.md?collection=docs"
import * as __fd_glob_36 from "../content/docs/mdx-components.md?collection=docs"
import * as __fd_glob_35 from "../content/docs/javascript/variables.md?collection=docs"
import * as __fd_glob_34 from "../content/docs/index.md?collection=docs"
import * as __fd_glob_33 from "../content/docs/getting-started/introduction.md?collection=docs"
import * as __fd_glob_32 from "../content/docs/getting-started/getting-started.md?collection=docs"
import * as __fd_glob_31 from "../content/docs/docker/installation-ubuntu.md?collection=docs"
import * as __fd_glob_30 from "../content/docs/docker/containers.md?collection=docs"
import { default as __fd_glob_29 } from "../content/docs/react/meta.json?collection=docs"
import { default as __fd_glob_28 } from "../content/docs/react/hooks/meta.json?collection=docs"
import { default as __fd_glob_27 } from "../content/docs/nextjs/meta.json?collection=docs"
import { default as __fd_glob_26 } from "../content/docs/meta.json?collection=docs"
import { default as __fd_glob_25 } from "../content/docs/javascript/meta.json?collection=docs"
import { default as __fd_glob_24 } from "../content/docs/docker/meta.json?collection=docs"
import * as __fd_glob_23 from "../content/tools/index.md?collection=tools"
import * as __fd_glob_22 from "../content/recipes/index.md?collection=recipes"
import * as __fd_glob_21 from "../content/packages/index.md?collection=packages"
import * as __fd_glob_20 from "../content/errors/javascript/cannot-read-properties-of-undefined.md?collection=errors"
import * as __fd_glob_19 from "../content/errors/index.md?collection=errors"
import * as __fd_glob_18 from "../content/commands/ssh/generate-key.md?collection=commands"
import * as __fd_glob_17 from "../content/commands/postgresql/dump-database.md?collection=commands"
import * as __fd_glob_16 from "../content/commands/pnpm/clean-install.md?collection=commands"
import * as __fd_glob_15 from "../content/commands/networking/check-open-ports.md?collection=commands"
import * as __fd_glob_14 from "../content/commands/linux/kill-process-port.md?collection=commands"
import * as __fd_glob_13 from "../content/commands/index.md?collection=commands"
import * as __fd_glob_12 from "../content/commands/git/reset-soft.md?collection=commands"
import * as __fd_glob_11 from "../content/commands/git/git-commands.md?collection=commands"
import * as __fd_glob_10 from "../content/commands/docker/system-prune.md?collection=commands"
import * as __fd_glob_9 from "../content/commands/docker/run.md?collection=commands"
import { default as __fd_glob_8 } from "../content/commands/ssh/meta.json?collection=commands"
import { default as __fd_glob_7 } from "../content/commands/postgresql/meta.json?collection=commands"
import { default as __fd_glob_6 } from "../content/commands/pnpm/meta.json?collection=commands"
import { default as __fd_glob_5 } from "../content/commands/networking/meta.json?collection=commands"
import { default as __fd_glob_4 } from "../content/commands/meta.json?collection=commands"
import { default as __fd_glob_3 } from "../content/commands/linux/meta.json?collection=commands"
import { default as __fd_glob_2 } from "../content/commands/git/meta.json?collection=commands"
import { default as __fd_glob_1 } from "../content/commands/docker/meta.json?collection=commands"
import * as __fd_glob_0 from "../content/roadmaps/index.md?collection=roadmaps"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const commands = await create.docs("commands", "content/commands", {"docker/meta.json": __fd_glob_1, "git/meta.json": __fd_glob_2, "linux/meta.json": __fd_glob_3, "meta.json": __fd_glob_4, "networking/meta.json": __fd_glob_5, "pnpm/meta.json": __fd_glob_6, "postgresql/meta.json": __fd_glob_7, "ssh/meta.json": __fd_glob_8, }, {"docker/run.md": __fd_glob_9, "docker/system-prune.md": __fd_glob_10, "git/git-commands.md": __fd_glob_11, "git/reset-soft.md": __fd_glob_12, "index.md": __fd_glob_13, "linux/kill-process-port.md": __fd_glob_14, "networking/check-open-ports.md": __fd_glob_15, "pnpm/clean-install.md": __fd_glob_16, "postgresql/dump-database.md": __fd_glob_17, "ssh/generate-key.md": __fd_glob_18, });

export const docs = await create.docs("docs", "content/docs", {"docker/meta.json": __fd_glob_24, "javascript/meta.json": __fd_glob_25, "meta.json": __fd_glob_26, "nextjs/meta.json": __fd_glob_27, "react/hooks/meta.json": __fd_glob_28, "react/meta.json": __fd_glob_29, }, {"docker/containers.md": __fd_glob_30, "docker/installation-ubuntu.md": __fd_glob_31, "getting-started/getting-started.md": __fd_glob_32, "getting-started/introduction.md": __fd_glob_33, "index.md": __fd_glob_34, "javascript/variables.md": __fd_glob_35, "mdx-components.md": __fd_glob_36, "meta-schema.md": __fd_glob_37, "nextjs/routing.md": __fd_glob_38, "react/hooks/use-effect.md": __fd_glob_39, });

export const errors = await create.docs("errors", "content/errors", {}, {"index.md": __fd_glob_19, "javascript/cannot-read-properties-of-undefined.md": __fd_glob_20, });

export const packages = await create.docs("packages", "content/packages", {}, {"index.md": __fd_glob_21, });

export const recipes = await create.docs("recipes", "content/recipes", {}, {"index.md": __fd_glob_22, });

export const roadmaps = await create.docs("roadmaps", "content/roadmaps", {}, {"index.md": __fd_glob_0, });

export const tools = await create.docs("tools", "content/tools", {}, {"index.md": __fd_glob_23, });