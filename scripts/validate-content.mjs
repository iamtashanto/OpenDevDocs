#!/usr/bin/env node
/**
 * scripts/validate-content.mjs
 *
 * Validates that every Markdown file in /content has the required frontmatter fields.
 * Run: node scripts/validate-content.mjs
 *
 * Exits 1 if any file is missing required frontmatter so CI can catch it.
 */

import { readdir, readFile } from "fs/promises";
import { join } from "path";

const CONTENT_ROOT = new URL("../content", import.meta.url).pathname;
const REQUIRED_FIELDS = ["title", "description"];

let errorCount = 0;

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
  const content = await readFile(filePath, "utf-8");

  // Extract frontmatter between the first pair of ---
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fmMatch) {
    console.error(`❌ Missing frontmatter: ${filePath}`);
    errorCount++;
    return;
  }

  const fm = fmMatch[1];
  for (const field of REQUIRED_FIELDS) {
    if (!fm.includes(`${field}:`)) {
      console.error(`❌ Missing "${field}" in frontmatter: ${filePath}`);
      errorCount++;
    }
  }
}

console.log("🔍 Validating content frontmatter…\n");
await walkDir(CONTENT_ROOT);

if (errorCount === 0) {
  console.log("✅ All content files are valid.");
} else {
  console.error(`\n🚨 ${errorCount} error(s) found.`);
  process.exit(1);
}
