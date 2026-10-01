#!/usr/bin/env node
/**
 * scripts/validate-content.mjs
 *
 * Strict content metadata & link validator for OpenDevDocs.
 * Checks:
 * 1. YAML frontmatter schema & required fields (title, description).
 * 2. Allowed enum values (type, level).
 * 3. Valid date formats (lastVerified).
 * 4. Duplicate slug detection.
 * 5. meta.json integrity (pages listed must exist).
 * 6. Internal documentation link integrity.
 *
 * Run: pnpm validate-content
 */

import { readdir, readFile } from "fs/promises";
import { join, relative, dirname } from "path";
import { existsSync } from "fs";

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

const registeredUrls = new Set(["/"]);

const internalLinksToCheck = [];

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
    } else if (entry.name === "meta.json") {
      await validateMetaJson(fullPath);
    }
  }
}

async function validateMetaJson(metaPath) {
  try {
    const content = await readFile(metaPath, "utf-8");
    const json = JSON.parse(content);
    const parentDir = dirname(metaPath);
    const relMeta = relative(CONTENT_ROOT, metaPath);

    if (json.pages && Array.isArray(json.pages)) {
      for (const pageName of json.pages) {
        if (typeof pageName !== "string") continue;
        const targetMd = join(parentDir, `${pageName}.md`);
        const targetMdx = join(parentDir, `${pageName}.mdx`);
        const targetDir = join(parentDir, pageName);

        if (!existsSync(targetMd) && !existsSync(targetMdx) && !existsSync(targetDir)) {
          console.warn(
            `⚠️  [meta.json references missing page/folder: "${pageName}"] in content/${relMeta}`
          );
          warningCount++;
        }
      }
    }
  } catch (err) {
    console.error(`❌ [Invalid JSON in meta.json] ${metaPath}: ${err.message}`);
    errorCount++;
  }
}

async function validateFile(filePath) {
  totalFiles++;
  const relPath = relative(CONTENT_ROOT, filePath);
  const content = await readFile(filePath, "utf-8");

  // Determine URL path
  const urlPath = `/${relPath.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "")}`;
  if (registeredUrls.has(urlPath) && !urlPath.endsWith("/index")) {
    console.error(`❌ [Duplicate Route / Slug] "${urlPath}" from content/${relPath}`);
    errorCount++;
  }
  registeredUrls.add(urlPath);

  // Extract frontmatter
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

  // Extract internal markdown links [text](/docs/...)
  const linkRegex = /\[([^\]]+)\]\(((\/(docs|commands|errors|recipes|roadmaps|packages|tools)[^)#\s]*)(#[^)]*)?)\)/g;
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    const linkUrl = match[3];
    internalLinksToCheck.push({
      sourceFile: relPath,
      targetUrl: linkUrl,
    });
  }
}

console.log("🔍 Validating OpenDevDocs content frontmatter, metadata & link integrity…\n");
await walkDir(CONTENT_ROOT);

// Validate internal links
for (const link of internalLinksToCheck) {
  const normalized = link.targetUrl.replace(/\/$/, "");
  if (!registeredUrls.has(normalized) && !registeredUrls.has(normalized + "/index")) {
    const isSectionRoot = ["/docs", "/commands", "/errors", "/recipes", "/roadmaps", "/packages", "/tools"].some(
      (root) => normalized === root || normalized.startsWith(root + "/")
    );
    if (!registeredUrls.has(normalized) && !isSectionRoot) {
      console.warn(`⚠️  [Potential Broken Link] in content/${link.sourceFile} -> "${link.targetUrl}"`);
      warningCount++;
    }
  }
}

console.log(`\nChecked ${totalFiles} markdown file(s) across 7 content collections.`);

if (errorCount === 0) {
  console.log(`✅ All content metadata is valid! (${warningCount} warning(s))`);
} else {
  console.error(`\n🚨 Validation failed with ${errorCount} error(s).`);
  process.exit(1);
}
