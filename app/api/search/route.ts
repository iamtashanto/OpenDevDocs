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

// Build a unified search index across all 7 content types at build time
export const { GET } = createSearchAPI("advanced", {
  indexes: [
    ...docsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...commandsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...errorsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...recipesSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...roadmapsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...packagesSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
    ...toolsSource.getPages().map((page) => ({
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      structuredData: page.data.structuredData,
    })),
  ],
});
