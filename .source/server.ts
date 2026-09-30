// @ts-nocheck
import { default as __fd_glob_22 } from "../content/docs/react/meta.json?collection=docs"
import { default as __fd_glob_21 } from "../content/docs/react/hooks/meta.json?collection=docs"
import { default as __fd_glob_20 } from "../content/docs/nextjs/meta.json?collection=docs"
import { default as __fd_glob_19 } from "../content/docs/meta.json?collection=docs"
import { default as __fd_glob_18 } from "../content/docs/javascript/meta.json?collection=docs"
import { default as __fd_glob_17 } from "../content/docs/docker/meta.json?collection=docs"
import * as __fd_glob_16 from "../content/docs/react/hooks/use-effect.md?collection=docs"
import * as __fd_glob_15 from "../content/docs/nextjs/routing.md?collection=docs"
import * as __fd_glob_14 from "../content/docs/meta-schema.md?collection=docs"
import * as __fd_glob_13 from "../content/docs/javascript/variables.md?collection=docs"
import * as __fd_glob_12 from "../content/docs/index.md?collection=docs"
import * as __fd_glob_11 from "../content/docs/getting-started/introduction.md?collection=docs"
import * as __fd_glob_10 from "../content/docs/getting-started/getting-started.md?collection=docs"
import * as __fd_glob_9 from "../content/docs/docker/installation-ubuntu.md?collection=docs"
import * as __fd_glob_8 from "../content/docs/docker/containers.md?collection=docs"
import * as __fd_glob_7 from "../content/tools/index.md?collection=tools"
import * as __fd_glob_6 from "../content/recipes/index.md?collection=recipes"
import * as __fd_glob_5 from "../content/packages/index.md?collection=packages"
import * as __fd_glob_4 from "../content/errors/javascript/cannot-read-properties-of-undefined.md?collection=errors"
import * as __fd_glob_3 from "../content/errors/index.md?collection=errors"
import * as __fd_glob_2 from "../content/commands/index.md?collection=commands"
import * as __fd_glob_1 from "../content/commands/git/git-commands.md?collection=commands"
import * as __fd_glob_0 from "../content/roadmaps/index.md?collection=roadmaps"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();

export const commands = await create.docs("commands", "content/commands", {}, {"git/git-commands.md": __fd_glob_1, "index.md": __fd_glob_2, });

export const docs = await create.docs("docs", "content/docs", {"docker/meta.json": __fd_glob_17, "javascript/meta.json": __fd_glob_18, "meta.json": __fd_glob_19, "nextjs/meta.json": __fd_glob_20, "react/hooks/meta.json": __fd_glob_21, "react/meta.json": __fd_glob_22, }, {"docker/containers.md": __fd_glob_8, "docker/installation-ubuntu.md": __fd_glob_9, "getting-started/getting-started.md": __fd_glob_10, "getting-started/introduction.md": __fd_glob_11, "index.md": __fd_glob_12, "javascript/variables.md": __fd_glob_13, "meta-schema.md": __fd_glob_14, "nextjs/routing.md": __fd_glob_15, "react/hooks/use-effect.md": __fd_glob_16, });

export const errors = await create.docs("errors", "content/errors", {}, {"index.md": __fd_glob_3, "javascript/cannot-read-properties-of-undefined.md": __fd_glob_4, });

export const packages = await create.docs("packages", "content/packages", {}, {"index.md": __fd_glob_5, });

export const recipes = await create.docs("recipes", "content/recipes", {}, {"index.md": __fd_glob_6, });

export const roadmaps = await create.docs("roadmaps", "content/roadmaps", {}, {"index.md": __fd_glob_0, });

export const tools = await create.docs("tools", "content/tools", {}, {"index.md": __fd_glob_7, });