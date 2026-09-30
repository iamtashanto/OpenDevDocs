#!/usr/bin/env node
/**
 * scripts/validate-content.mjs
 *
 * Strict content metadata validator for OpenDevDocs.
 * Checks YAML frontmatter structure, required fields, and allowed enum values.
 *
 * Run: pnpm validate-content
 */

import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";

const CONTENT_ROOT = new URL("../content", import.meta.url).pathname;

const ALLOWED_TYPES = new Set([
  "guide",
  "concept",
  "reference",
  "tutorial",
  "troubleshooting",
  "recipe",
]);

const ALLOWED_LEVELS = new Set([
  "beginner",
  "intermediate",
  "advanced",
  "production",
]);

let totalFiles = 0;
let errorCount = 0;
let warningCount = 0;

/**
 * Basic YAML frontmatter parser for node scripts
 */
function parseFrontmatter(rawFm) {
  const data = {};
  const lines = rawFm.split(/\r?\n/);
  let currentKey = null;
  let inArray = false;
  let inObject = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    // Array item (e.g. "  - item")
    if (trimmed.startsWith("- ") && currentKey && inArray) {
      data[currentKey].push(trimmed.slice(2).trim().replace(/^["']|["']$/g, ""));
      continue;
    }

    // Nested object key (e.g. "  docker: current")
    if (line.startsWith("  ") && currentKey && inObject && trimmed.includes(":")) {
      const colonIdx = trimmed.indexOf(":");
      const objKey = trimmed.slice(0, colonIdx).trim();
      const objVal = trimmed.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, "");
      data[currentKey][objKey] = objVal;
      continue;
    }

    // Top-level key: value
    const match = line.match(/^([a-zA-Z0-9_-]+):(.*)$/);
    if (match) {
      const key = match[1].trim();
      const rawVal = match[2].trim();
      currentKey = key;

      if (rawVal === "") {
        // Could be start of array or object
        const nextLine = lines[i + 1] ? lines[i + 1].trim() : "";
        if (nextLine.startsWith("- ")) {
          inArray = true;
          inObject = false;
          data[key] = [];
        } else if (nextLine.includes(":")) {
          inObject = true;
          inArray = false;
          data[key] = {};
        } else {
          inArray = false;
          inObject = false;
          data[key] = null;
        }
      } else {
        inArray = false;
        inObject = false;
        let val = rawVal.replace(/^["']|["']$/g, "");
        if (val === "true") val = true;
        else if (val === "false") val = false;
        data[key] = val;
      }
    }
  }

  return data;
}

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      await validateFile(fullPath);
    }
  }
}

async function validateFile(filePath) {
  totalFiles++;
  const relPath = relative(CONTENT_ROOT, filePath);
  const content = await readFile(filePath, "utf-8");

  // Extract frontmatter between the first pair of ---
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error(`❌ [Missing Frontmatter] content/${relPath}`);
    errorCount++;
    return;
  }

  const fm = parseFrontmatter(fmMatch[1]);

  // 1. Required field: title
  if (!fm.title || typeof fm.title !== "string" || fm.title.trim() === "") {
    console.error(`❌ [Missing "title"] content/${relPath}`);
    errorCount++;
  }

  // 2. Validate type enum if present
  if (fm.type && !ALLOWED_TYPES.has(fm.type)) {
    console.error(
      `❌ [Invalid "type": "${fm.type}"] content/${relPath}\n   Allowed values: ${Array.from(ALLOWED_TYPES).join(", ")}`
    );
    errorCount++;
  }

  // 3. Validate level enum if present
  if (fm.level && !ALLOWED_LEVELS.has(fm.level)) {
    console.error(
      `❌ [Invalid "level": "${fm.level}"] content/${relPath}\n   Allowed values: ${Array.from(ALLOWED_LEVELS).join(", ")}`
    );
    errorCount++;
  }

  // 4. Validate lastVerified format (YYYY-MM-DD) if present
  if (fm.lastVerified && !/^\d{4}-\d{2}-\d{2}$/.test(fm.lastVerified)) {
    console.error(
      `❌ [Invalid "lastVerified" date format: "${fm.lastVerified}"] content/${relPath} (Expected YYYY-MM-DD)`
    );
    errorCount++;
  }

  // 5. Warning if description is omitted
  if (!fm.description) {
    console.warn(`⚠️  [Missing "description"] content/${relPath}`);
    warningCount++;
  }
}

console.log("🔍 Validating OpenDevDocs content frontmatter & metadata…\n");
await walkDir(CONTENT_ROOT);

console.log(`\nChecked ${totalFiles} markdown file(s).`);

if (errorCount === 0) {
  console.log(`✅ All content metadata is valid! (${warningCount} warning(s))`);
} else {
  console.error(`\n🚨 Validation failed with ${errorCount} error(s).`);
  process.exit(1);
}
