import type { MetadataRoute } from "next";
import {
  docsSource,
  commandsSource,
  errorsSource,
  recipesSource,
  roadmapsSource,
  packagesSource,
  toolsSource,
} from "./source";

const baseUrl = "https://docs.tashanto.com";

function buildEntries(
  source: {
    getPages: () => Array<{ url: string; data: { title?: string } }>;
  },
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  return source.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    changeFrequency,
    priority,
    lastModified: new Date(),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    ...buildEntries(docsSource, "weekly", 0.9),
    ...buildEntries(commandsSource, "monthly", 0.8),
    ...buildEntries(errorsSource, "monthly", 0.8),
    ...buildEntries(recipesSource, "monthly", 0.8),
    ...buildEntries(roadmapsSource, "monthly", 0.7),
    ...buildEntries(packagesSource, "monthly", 0.7),
    ...buildEntries(toolsSource, "monthly", 0.7),
  ];
}
