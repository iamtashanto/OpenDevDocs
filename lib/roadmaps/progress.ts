"use client";

import { useSyncExternalStore, useCallback, useMemo } from "react";
import type { RoadmapNode } from "./types";

const STORAGE_KEY = "opendevdocs-roadmap-progress-v1";
const BOOKMARKS_STORAGE_KEY = "opendevdocs-roadmap-bookmarks-v1";

interface ProgressStore {
  [roadmapSlug: string]: string[]; // array of completed node IDs
}

const progressListeners = new Set<() => void>();
const bookmarkListeners = new Set<() => void>();

function emitProgressChange() {
  for (const listener of progressListeners) {
    listener();
  }
}

function emitBookmarkChange() {
  for (const listener of bookmarkListeners) {
    listener();
  }
}

function getProgressSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  try {
    return localStorage.getItem(STORAGE_KEY) || "{}";
  } catch {
    return "{}";
  }
}

function getBookmarksSnapshot(): string {
  if (typeof window === "undefined") return "[]";
  try {
    return localStorage.getItem(BOOKMARKS_STORAGE_KEY) || "[]";
  } catch {
    return "[]";
  }
}

function getServerSnapshot(): string {
  return "{}";
}

function getServerBookmarksSnapshot(): string {
  return "[]";
}

function subscribeProgress(callback: () => void) {
  progressListeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    progressListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function subscribeBookmarks(callback: () => void) {
  bookmarkListeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === BOOKMARKS_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    bookmarkListeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getStoredProgress(): ProgressStore {
  try {
    const raw = getProgressSnapshot();
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveStoredProgress(store: ProgressStore) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    emitProgressChange();
  } catch {
    // ignore quota errors
  }
}

export function useRoadmapProgress(roadmapSlug: string) {
  const rawStore = useSyncExternalStore(subscribeProgress, getProgressSnapshot, getServerSnapshot);
  const store: ProgressStore = useMemo(() => {
    try {
      return JSON.parse(rawStore);
    } catch {
      return {};
    }
  }, [rawStore]);

  const completedNodes = useMemo(() => store[roadmapSlug] || [], [store, roadmapSlug]);

  const toggleNodeCompleted = useCallback(
    (nodeId: string) => {
      const current = getStoredProgress();
      const existing = current[roadmapSlug] || [];
      const next = existing.includes(nodeId)
        ? existing.filter((id) => id !== nodeId)
        : [...existing, nodeId];

      current[roadmapSlug] = next;
      saveStoredProgress(current);
    },
    [roadmapSlug]
  );

  const markNodeCompleted = useCallback(
    (nodeId: string) => {
      const current = getStoredProgress();
      const existing = current[roadmapSlug] || [];
      if (!existing.includes(nodeId)) {
        current[roadmapSlug] = [...existing, nodeId];
        saveStoredProgress(current);
      }
    },
    [roadmapSlug]
  );

  const markNodeIncomplete = useCallback(
    (nodeId: string) => {
      const current = getStoredProgress();
      const existing = current[roadmapSlug] || [];
      if (existing.includes(nodeId)) {
        current[roadmapSlug] = existing.filter((id) => id !== nodeId);
        saveStoredProgress(current);
      }
    },
    [roadmapSlug]
  );

  const resetRoadmapProgress = useCallback(() => {
    const current = getStoredProgress();
    delete current[roadmapSlug];
    saveStoredProgress(current);
  }, [roadmapSlug]);

  const isNodeCompleted = useCallback(
    (nodeId: string) => completedNodes.includes(nodeId),
    [completedNodes]
  );

  const getNextIncompleteNode = useCallback(
    (nodes: RoadmapNode[]): RoadmapNode | null => {
      return (
        nodes.find(
          (n) =>
            !completedNodes.includes(n.id) &&
            n.type !== "coming_soon" &&
            n.docsHref
        ) || null
      );
    },
    [completedNodes]
  );

  return {
    completedNodes,
    isLoaded: true,
    isNodeCompleted,
    toggleNodeCompleted,
    markNodeCompleted,
    markNodeIncomplete,
    resetRoadmapProgress,
    getNextIncompleteNode,
  };
}

export function useRoadmapBookmarks() {
  const rawBookmarks = useSyncExternalStore(
    subscribeBookmarks,
    getBookmarksSnapshot,
    getServerBookmarksSnapshot
  );

  const bookmarks: string[] = useMemo(() => {
    try {
      return JSON.parse(rawBookmarks);
    } catch {
      return [];
    }
  }, [rawBookmarks]);

  const toggleBookmark = useCallback((slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const raw = getBookmarksSnapshot();
      const current: string[] = JSON.parse(raw);
      const next = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(next));
      emitBookmarkChange();
    } catch {
      // ignore
    }
  }, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks]
  );

  return {
    bookmarks,
    isBookmarked,
    toggleBookmark,
  };
}

export function getRoadmapCompletionPercentage(
  completedCount: number,
  totalCount: number
): number {
  if (totalCount === 0) return 0;
  return Math.round((completedCount / totalCount) * 100);
}
