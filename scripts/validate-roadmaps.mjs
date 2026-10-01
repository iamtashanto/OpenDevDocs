import { validateAllRoadmaps } from "../lib/roadmaps/validation.ts";
import { roadmapsRegistry } from "../lib/roadmaps/registry.ts";

const result = validateAllRoadmaps(roadmapsRegistry);

if (!result.isValid) {
  console.error("❌ Roadmap validation failed with errors:");
  console.error(JSON.stringify(result.errors, null, 2));
  process.exit(1);
} else {
  console.log(`✅ All ${Object.keys(roadmapsRegistry).length} roadmap definitions validated successfully!`);
  process.exit(0);
}
