import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names intelligently.
 * Combines clsx (conditional classes) with tailwind-merge (conflict resolution).
 *
 * @example
 * cn("px-4 py-2", isActive && "bg-blue-500", "px-6")
 * // => "py-2 bg-blue-500 px-6"  (px-4 is overridden by px-6)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Returns a formatted page title, e.g. "Introduction | OpenDevDocs"
 */
export function formatTitle(pageTitle: string, siteName = "OpenDevDocs"): string {
  return `${pageTitle} | ${siteName}`;
}

/**
 * Converts a slug array (from catch-all routes) to a URL path string.
 * Handles the case where slug is undefined (index page).
 */
export function slugToPath(slug: string[] | undefined): string {
  if (!slug || slug.length === 0) return "/";
  return `/${slug.join("/")}`;
}

/**
 * Strips leading and trailing slashes from a path segment.
 */
export function stripSlashes(path: string): string {
  return path.replace(/^\/+|\/+$/g, "");
}
