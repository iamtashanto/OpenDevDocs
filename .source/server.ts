// @ts-nocheck
import * as __fd_glob_10 from "../content/tools/index.md?collection=tools"
import * as __fd_glob_9 from "../content/packages/index.md?collection=packages"
import * as __fd_glob_8 from "../content/recipes/index.md?collection=recipes"
import * as __fd_glob_7 from "../content/errors/javascript/cannot-read-properties-of-undefined.md?collection=errors"
import * as __fd_glob_6 from "../content/errors/index.md?collection=errors"
import * as __fd_glob_5 from "../content/docs/index.md?collection=docs"
import * as __fd_glob_4 from "../content/docs/getting-started/introduction.md?collection=docs"
import * as __fd_glob_3 from "../content/docs/getting-started/getting-started.md?collection=docs"
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

export const docs = await create.docs("docs", "content/docs", {}, {"getting-started/getting-started.md": __fd_glob_3, "getting-started/introduction.md": __fd_glob_4, "index.md": __fd_glob_5, });

export const errors = await create.docs("errors", "content/errors", {}, {"index.md": __fd_glob_6, "javascript/cannot-read-properties-of-undefined.md": __fd_glob_7, });

export const packages = await create.docs("packages", "content/packages", {}, {"index.md": __fd_glob_9, });

export const recipes = await create.docs("recipes", "content/recipes", {}, {"index.md": __fd_glob_8, });

export const roadmaps = await create.docs("roadmaps", "content/roadmaps", {}, {"index.md": __fd_glob_0, });

export const tools = await create.docs("tools", "content/tools", {}, {"index.md": __fd_glob_10, });