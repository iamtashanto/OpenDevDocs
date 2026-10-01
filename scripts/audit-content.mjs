import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";

const CONTENT_ROOT = new URL("../content", import.meta.url).pathname;

const PLACEHOLDER_PATTERNS = [
  /\bTODO\b/i,
  /\bTBD\b/i,
  /\bLOREM IPSUM\b/i,
  /\bCOMING SOON\b/i,
  /\bFIXME\b/i,
  /\bREPLACE_ME\b/i,
  /\bPLACEHOLDER\b/i,
];

const DESTRUCTIVE_COMMANDS = [
  { pattern: /rm\s+-rf\s+[\/~*]/i, label: "rm -rf root/wildcard" },
  { pattern: /DROP\s+DATABASE/i, label: "DROP DATABASE" },
  { pattern: /git\s+reset\s+--hard/i, label: "git reset --hard" },
  { pattern: /git\s+push\s+.*--force\b/i, label: "git push --force" },
  { pattern: /docker\s+system\s+prune\s+-a/i, label: "docker system prune -a" },
  { pattern: /kill\s+-9\b/i, label: "kill -9" },
  { pattern: /mkfs\b/i, label: "mkfs" },
  { pattern: /dd\s+if=/i, label: "dd raw disk write" },
];

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
};

let scannedFiles = 0;

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(fullPath);
    } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
      await auditFile(fullPath);
    }
  }
}

async function auditFile(filePath) {
  scannedFiles++;
  const relPath = relative(CONTENT_ROOT, filePath);
  const content = await readFile(filePath, "utf-8");

  // Split frontmatter and body
  const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const body = fmMatch ? content.slice(fmMatch[0].length) : content;

  // 1. Check for Placeholders / TODOs in prose (outside code blocks)
  const proseOnly = body.replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "");
  for (const pattern of PLACEHOLDER_PATTERNS) {
    // Exclude legitimate technical phrases like "::placeholder", "blur placeholder"
    const match = proseOnly.match(pattern);
    if (match) {
      const matchIndex = match.index;
      const context = proseOnly.slice(Math.max(0, matchIndex - 20), Math.min(proseOnly.length, matchIndex + 30)).toLowerCase();
      if (!context.includes("::placeholder") && !context.includes("placeholder property") && !context.includes("placeholder attribute") && !context.includes("blur placeholder") && !context.includes("tabstop placeholder")) {
        issues.high.push({
          file: relPath,
          type: "placeholder",
          detail: `Found placeholder pattern "${match[0]}" in text: "...${context.trim()}..."`,
        });
      }
    }
  }

  // 2. Check for Destructive Commands without safety callouts
  for (const item of DESTRUCTIVE_COMMANDS) {
    if (item.pattern.test(body)) {
      const hasSafetyWarning =
        body.includes('<Callout type="danger"') ||
        body.includes('<Callout type="warning"') ||
        body.toLowerCase().includes("danger") ||
        body.toLowerCase().includes("warning") ||
        body.toLowerCase().includes("caution") ||
        body.toLowerCase().includes("data loss");

      if (!hasSafetyWarning) {
        issues.high.push({
          file: relPath,
          type: "destructive_command_unwarned",
          detail: `Destructive command (${item.label}) found without explicit safety callout or warning`,
        });
      }
    }
  }

  // Strip fenced code blocks for heading hierarchy checks
  const contentWithoutCode = body.replace(/```[\s\S]*?```/g, "");

  // 3. Check for Heading Hierarchy (e.g. jumping straight from H1/Title to H3/H4)
  const headingMatches = [...contentWithoutCode.matchAll(/^(#{1,6})\s+(.+)$/gm)];
  let lastLevel = 1;
  for (const hMatch of headingMatches) {
    const level = hMatch[1].length;
    if (level - lastLevel > 1 && lastLevel > 0) {
      issues.medium.push({
        file: relPath,
        type: "heading_skip",
        detail: `Heading level jumped from H${lastLevel} to H${level}: "${hMatch[2]}"`,
      });
    }
    lastLevel = level;
  }

  // 4. Check for very short / stub articles (< 250 characters of body content)
  const trimmedBody = body.replace(/\s+/g, " ").trim();
  if (trimmedBody.length < 250 && !relPath.endsWith("index.md")) {
    issues.high.push({
      file: relPath,
      type: "stub_article",
      detail: `Article body is very short (${trimmedBody.length} chars), possible incomplete content`,
    });
  }

  // 5. Check for actual empty code blocks (```lang\n```)
  if (/^```[a-zA-Z0-9_-]*\r?\n```$/m.test(body)) {
    issues.critical.push({
      file: relPath,
      type: "empty_code_block",
      detail: "Contains empty code block with no content",
    });
  }

  // 6. Check for unescaped raw HTML tags inside headings (excluding inline backticked code)
  for (const hMatch of headingMatches) {
    const headingTextWithoutCode = hMatch[2].replace(/`[^`]*`/g, "");
    if (/<[a-zA-Z]+(\s+[^>]*)?>/.test(headingTextWithoutCode)) {
      issues.critical.push({
        file: relPath,
        type: "raw_html_in_heading",
        detail: `Heading contains raw HTML tag which breaks MDX AST: "${hMatch[2]}"`,
      });
    }
  }

  // 7. Check for missing lastVerified or metadata
  if (fmMatch) {
    const rawFm = fmMatch[1];
    if (!rawFm.includes("lastVerified:")) {
      issues.low.push({
        file: relPath,
        type: "missing_last_verified",
        detail: 'Missing "lastVerified" date in frontmatter',
      });
    }
    if (!rawFm.includes("tags:")) {
      issues.low.push({
        file: relPath,
        type: "missing_tags",
        detail: 'Missing "tags" array in frontmatter',
      });
    }
  }
}

async function run() {
  console.log("🔍 Running Comprehensive Documentation Quality Audit…\n");
  await walkDir(CONTENT_ROOT);

  console.log(`Audited ${scannedFiles} markdown documents.\n`);
  console.log("════════════════════ AUDIT RESULTS ════════════════════");
  console.log(`🔴 Critical Issues: ${issues.critical.length}`);
  for (const item of issues.critical) {
    console.log(`   - [${item.file}] ${item.type}: ${item.detail}`);
  }

  console.log(`\n🟠 High Issues: ${issues.high.length}`);
  for (const item of issues.high) {
    console.log(`   - [${item.file}] ${item.type}: ${item.detail}`);
  }

  console.log(`\n🟡 Medium Issues: ${issues.medium.length}`);
  for (const item of issues.medium) {
    console.log(`   - [${item.file}] ${item.type}: ${item.detail}`);
  }

  console.log(`\n🔵 Low Issues: ${issues.low.length}`);
  for (const item of issues.low) {
    console.log(`   - [${item.file}] ${item.type}: ${item.detail}`);
  }
  console.log("═══════════════════════════════════════════════════════\n");
}

run();
