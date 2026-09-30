import { createSearchAPI } from "fumadocs-core/search/server";
import {
  docsSource,
  commandsSource,
  errorsSource,
  recipesSource,
  roadmapsSource,
  packagesSource,
  toolsSource,
} from "@/app/source";

// Unified search index across all 7 collections
export const { GET } = createSearchAPI("advanced", {
  indexes: [
    ...docsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Docs",
      structuredData: page.data.structuredData,
    })),
    ...commandsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Commands",
      structuredData: page.data.structuredData,
    })),
    ...errorsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Errors",
      structuredData: page.data.structuredData,
    })),
    ...recipesSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Recipes",
      structuredData: page.data.structuredData,
    })),
    ...roadmapsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Roadmaps",
      structuredData: page.data.structuredData,
    })),
    ...packagesSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Packages",
      structuredData: page.data.structuredData,
    })),
    ...toolsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: "Tools",
      structuredData: page.data.structuredData,
    })),
  ],
});
