import { loader } from "fumadocs-core/source";
import {
  docs,
  commands,
  errors,
  recipes,
  roadmaps,
  packages,
  tools,
} from "@source";

export const docsSource = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const commandsSource = loader({
  baseUrl: "/commands",
  source: commands.toFumadocsSource(),
});

export const errorsSource = loader({
  baseUrl: "/errors",
  source: errors.toFumadocsSource(),
});

export const recipesSource = loader({
  baseUrl: "/recipes",
  source: recipes.toFumadocsSource(),
});

export const roadmapsSource = loader({
  baseUrl: "/roadmaps",
  source: roadmaps.toFumadocsSource(),
});

export const packagesSource = loader({
  baseUrl: "/packages",
  source: packages.toFumadocsSource(),
});

export const toolsSource = loader({
  baseUrl: "/tools",
  source: tools.toFumadocsSource(),
});
