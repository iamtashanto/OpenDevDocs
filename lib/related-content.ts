import {
  docsSource,
  commandsSource,
  errorsSource,
  recipesSource,
  packagesSource,
  toolsSource,
} from "@/app/source";

export interface RelatedItem {
  title: string;
  description?: string;
  url: string;
  category?: string;
  topic?: string;
  type?: string;
  score: number;
}

export interface RelatedContentResults {
  docs: RelatedItem[];
  commands: RelatedItem[];
  errors: RelatedItem[];
  recipes: RelatedItem[];
  packages: RelatedItem[];
}

interface ItemInput {
  url: string;
  title: string;
  description?: string;
  topic?: string;
  category?: string;
  tags?: string[];
  type?: string;
}

function scoreRelevance(target: ItemInput, candidate: ItemInput): number {
  if (target.url === candidate.url) return -1;

  let score = 0;

  // 1. Exact topic match (highest relevance)
  if (target.topic && candidate.topic && target.topic.toLowerCase() === candidate.topic.toLowerCase()) {
    score += 10;
  }

  // 2. Matching tags
  if (target.tags && candidate.tags) {
    const targetTagSet = new Set(target.tags.map((t) => t.toLowerCase()));
    for (const tag of candidate.tags) {
      if (targetTagSet.has(tag.toLowerCase())) {
        score += 3;
      }
    }
  }

  // 3. Category match
  if (target.category && candidate.category && target.category.toLowerCase() === candidate.category.toLowerCase()) {
    score += 2;
  }

  // 4. Keyword overlap in title
  const targetWords = new Set(
    target.title
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length > 3)
  );
  const candidateWords = candidate.title
    .toLowerCase()
    .split(/\W+/)
    .filter((w) => w.length > 3);

  for (const word of candidateWords) {
    if (targetWords.has(word)) {
      score += 1.5;
    }
  }

  return score;
}

/**
 * Dynamically computes related documentation, commands, errors, and recipes based on content metadata.
 */
export function getRelatedContent(current: ItemInput): RelatedContentResults {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getScoredList = (pages: Array<{ url: string; data: any }>): RelatedItem[] => {
    return pages
      .map((p) => {
        const item: ItemInput = {
          url: p.url,
          title: (p.data?.title as string) || "",
          description: p.data?.description as string,
          topic: p.data?.topic as string,
          category: p.data?.category as string,
          tags: p.data?.tags as string[],
          type: p.data?.type as string,
        };
        return {
          title: item.title,
          description: item.description,
          url: item.url,
          category: item.category,
          topic: item.topic,
          type: item.type,
          score: scoreRelevance(current, item),
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  const allDocs = [...docsSource.getPages(), ...toolsSource.getPages()];
  const allCommands = commandsSource.getPages();
  const allErrors = errorsSource.getPages();
  const allRecipes = recipesSource.getPages();
  const allPackages = packagesSource.getPages();

  return {
    docs: getScoredList(allDocs).slice(0, 4),
    commands: getScoredList(allCommands).slice(0, 3),
    errors: getScoredList(allErrors).slice(0, 3),
    recipes: getScoredList(allRecipes).slice(0, 3),
    packages: getScoredList(allPackages).slice(0, 2),
  };
}
