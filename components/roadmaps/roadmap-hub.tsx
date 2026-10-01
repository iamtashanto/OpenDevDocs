"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Compass,
  Zap,
  ArrowRight,
  Code2,
  Cloud,
  Database,
  Layers,
} from "lucide-react";
import { allRoadmapsList } from "@/lib/roadmaps/registry";
import { RoadmapCard } from "./roadmap-card";

const categoryList: { id: string; label: string; icon: React.ElementType }[] = [
  { id: "all", label: "All Roadmaps", icon: Compass },
  { id: "role", label: "Role Based", icon: Layers },
  { id: "framework", label: "Frameworks", icon: Code2 },
  { id: "language", label: "Languages", icon: Code2 },
  { id: "devops", label: "DevOps & Cloud", icon: Cloud },
  { id: "database", label: "Databases", icon: Database },
  { id: "tools", label: "Core Tools", icon: Zap },
];

export function RoadmapHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Keyboard shortcut ⌘K / Ctrl+K focus on search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        const input = document.getElementById("roadmap-hub-search");
        input?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredRoadmaps = useMemo(() => {
    return allRoadmapsList.filter((roadmap) => {
      const matchesSearch =
        !searchQuery ||
        roadmap.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roadmap.nodes.some((n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" || roadmap.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredRoleRoadmaps = useMemo(() => {
    return filteredRoadmaps.filter((r) => r.category === "role");
  }, [filteredRoadmaps]);

  const skillAndFrameworkRoadmaps = useMemo(() => {
    return filteredRoadmaps.filter((r) => r.category !== "role");
  }, [filteredRoadmaps]);

  return (
    <div className="w-full min-h-screen bg-slate-50/50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* ─── Roadmap Hero ─── */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Compass className="w-3.5 h-3.5" />
            <span>STRUCTURED DEVELOPER LEARNING PATHS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
            Developer <span className="gradient-text">Roadmaps</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
            Step-by-step learning paths from fundamentals to production. Follow curated topics and jump directly into verified OpenDevDocs documentation for every step.
          </p>

          {/* Search Input with ⌘K */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="roadmap-hub-search"
                type="text"
                placeholder="Search roadmaps, technologies, skills (e.g. React, Docker, SQL)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-14 py-3 rounded-2xl border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-[10px] font-mono font-semibold text-slate-500 dark:text-zinc-400">
                <span>⌘</span>
                <span>K</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Category Filter Tabs ─── */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryList.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 scale-[1.02]"
                    : "bg-white dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200/80 dark:border-zinc-800"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* ─── Section 1: Role-Based Roadmaps ─── */}
        {featuredRoleRoadmaps.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Layers className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Role-Based Career Roadmaps
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                {featuredRoleRoadmaps.length} Pathways
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredRoleRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
              ))}
            </div>
          </div>
        )}

        {/* ─── Technology VS Callout ─── */}
        <div className="p-6 rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-500/[0.05] via-indigo-500/[0.03] to-purple-500/[0.05] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                Architecture Trade-Offs
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Not sure which framework or database to learn next?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
              Explore our head-to-head engineering comparisons with real execution models, benchmarks, and side-by-side code.
            </p>
          </div>

          <Link
            href="/vs"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold whitespace-nowrap shadow-lg shadow-blue-500/20 flex items-center gap-2 transition-all hover:scale-105"
          >
            <span>Explore Technology VS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ─── Section 2: Framework & Skill Roadmaps ─── */}
        {skillAndFrameworkRoadmaps.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Code2 className="w-4 h-4" />
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Framework & Technology Roadmaps
                </h2>
              </div>
              <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400">
                {skillAndFrameworkRoadmaps.length} Roadmaps
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillAndFrameworkRoadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.slug} roadmap={roadmap} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
