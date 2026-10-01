"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Circle,
  Search,
  SlidersHorizontal,
  Share2,
  Sparkles,
  Layers,
  ListFilter,
  CheckSquare,
  ArrowRight,
  BookOpen,
  Terminal,
  FileCode2,
  AlertTriangle,
  RotateCcw,
  Compass,
  ExternalLink,
} from "lucide-react";
import type { RoadmapData, RoadmapNode } from "@/lib/roadmaps-data";
import { roadmapsList } from "@/lib/roadmaps-data";
import { RoadmapNodeModal } from "./roadmap-node-modal";

interface RoadmapCanvasProps {
  initialRoadmapSlug?: string;
}

type ViewMode = "flowchart" | "detailed" | "checklist";

export function RoadmapCanvas({ initialRoadmapSlug = "frontend" }: RoadmapCanvasProps) {
  const [activeSlug, setActiveSlug] = useState<string>(initialRoadmapSlug);
  const [viewMode, setViewMode] = useState<ViewMode>("flowchart");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Status state per node ID: "todo" | "in-progress" | "completed"
  const [nodeStatus, setNodeStatus] = useState<Record<string, "todo" | "in-progress" | "completed">>({});

  // Sync from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("opendevdocs_roadmap_progress");
      if (saved) {
        setNodeStatus(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleStatusChange = (nodeId: string, status: "todo" | "in-progress" | "completed") => {
    setNodeStatus((prev) => {
      const updated = { ...prev, [nodeId]: status };
      try {
        localStorage.setItem("opendevdocs_roadmap_progress", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleResetProgress = () => {
    if (confirm("Reset all progress checkmarks for this roadmap?")) {
      setNodeStatus({});
      try {
        localStorage.removeItem("opendevdocs_roadmap_progress");
      } catch {
        // ignore
      }
    }
  };

  const roadmap: RoadmapData = roadmapsList[activeSlug] || roadmapsList["frontend"];

  const allNodes = useMemo(() => {
    return roadmap.stages.flatMap((stage) => stage.nodes);
  }, [roadmap]);

  const totalNodesCount = allNodes.length;
  const completedCount = useMemo(() => {
    return allNodes.filter((node) => nodeStatus[node.id] === "completed").length;
  }, [allNodes, nodeStatus]);

  const inProgressCount = useMemo(() => {
    return allNodes.filter((node) => nodeStatus[node.id] === "in-progress").length;
  }, [allNodes, nodeStatus]);

  const completionPercentage = totalNodesCount > 0 ? Math.round((completedCount / totalNodesCount) * 100) : 0;

  // Filtered nodes
  const filteredStages = useMemo(() => {
    return roadmap.stages
      .map((stage) => {
        const matchingNodes = stage.nodes.filter((node) => {
          const matchesQuery =
            !searchQuery ||
            node.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            node.keySkills?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

          const matchesLevel = selectedLevel === "all" || node.level.toLowerCase() === selectedLevel.toLowerCase();

          return matchesQuery && matchesLevel;
        });

        return {
          ...stage,
          nodes: matchingNodes,
        };
      })
      .filter((stage) => stage.nodes.length > 0);
  }, [roadmap, searchQuery, selectedLevel]);

  const handleOpenNode = (node: RoadmapNode) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-fd-background text-fd-foreground pb-24">
      {/* Top Banner / Roadmap Hero */}
      <div className="relative border-b border-fd-border/70 bg-gradient-to-b from-fd-muted/40 via-fd-background to-fd-background py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header Track Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-fd-primary/10 text-fd-primary border border-fd-primary/20">
                <Compass className="w-3.5 h-3.5" />
                Developer Learning Roadmaps
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-medium">
                {roadmap.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg border border-fd-border text-xs font-medium text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent flex items-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                {copied ? "Copied Link!" : "Share"}
              </button>
              <button
                type="button"
                onClick={handleResetProgress}
                title="Reset progress"
                className="p-1.5 rounded-lg border border-fd-border text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
                aria-label="Reset roadmap progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-fd-foreground via-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
              {roadmap.title}
            </h1>
            <p className="text-base sm:text-lg text-fd-muted-foreground max-w-3xl">
              {roadmap.description}
            </p>
          </div>

          {/* Track Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-fd-border/50">
            {Object.values(roadmapsList).map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => {
                  setActiveSlug(item.slug);
                  setSearchQuery("");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeSlug === item.slug
                    ? "bg-fd-primary text-fd-primary-foreground shadow-md shadow-fd-primary/20 scale-[1.02]"
                    : "bg-fd-muted/50 text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-foreground"
                }`}
              >
                <span>{item.title.replace(" Roadmap", "")}</span>
              </button>
            ))}
          </div>

          {/* Metrics & Progress Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-fd-muted-foreground font-medium">Your Track Progress</span>
                <span className="font-bold text-fd-foreground">{completionPercentage}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-fd-muted overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-fd-muted-foreground">
                <span>{completedCount} of {totalNodesCount} mastered</span>
                <span>{inProgressCount} in progress</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-fd-muted-foreground font-medium">Estimated Time</p>
                <p className="text-lg font-bold text-fd-foreground mt-0.5">{roadmap.estimatedTime}</p>
              </div>
              <Clock className="w-6 h-6 text-fd-primary/60" />
            </div>

            <div className="p-4 rounded-xl border border-fd-border/70 bg-fd-card/50 backdrop-blur-sm flex items-center justify-between">
              <div>
                <p className="text-xs text-fd-muted-foreground font-medium">Learning Curve</p>
                <p className="text-lg font-bold text-fd-foreground mt-0.5">{roadmap.stages.length} Milestones</p>
              </div>
              <Sparkles className="w-6 h-6 text-amber-500/60" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls Bar: Search, View Mode, Filter */}
      <div className="sticky top-0 z-30 bg-fd-background/85 backdrop-blur-md border-b border-fd-border/70 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-fd-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter topics (e.g. Docker, React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-fd-muted/50 border border-fd-border focus:outline-none focus:ring-2 focus:ring-fd-primary text-fd-foreground placeholder:text-fd-muted-foreground/70"
            />
          </div>

          {/* Level Filter & View Modes */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-fd-muted/60 p-1 rounded-xl border border-fd-border text-xs">
              {(["all", "beginner", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-2.5 py-1 rounded-lg capitalize text-[11px] font-medium transition-all ${
                    selectedLevel === lvl
                      ? "bg-fd-card text-fd-foreground shadow-sm font-semibold"
                      : "text-fd-muted-foreground hover:text-fd-foreground"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 bg-fd-muted/60 p-1 rounded-xl border border-fd-border">
              <button
                type="button"
                onClick={() => setViewMode("flowchart")}
                title="Flowchart Graph View"
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "flowchart"
                    ? "bg-fd-card text-fd-primary shadow-sm"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                <Layers className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("detailed")}
                title="Detailed Cards View"
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "detailed"
                    ? "bg-fd-card text-fd-primary shadow-sm"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                <ListFilter className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("checklist")}
                title="Checklist View"
                className={`p-1.5 rounded-lg transition-all ${
                  viewMode === "checklist"
                    ? "bg-fd-card text-fd-primary shadow-sm"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Roadmap Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {filteredStages.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-fd-border rounded-2xl bg-fd-card/30">
            <Search className="w-8 h-8 text-fd-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-base text-fd-foreground">No matching topics found</h3>
            <p className="text-xs text-fd-muted-foreground mt-1">
              Try adjusting your search query or level filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedLevel("all");
              }}
              className="mt-4 px-3 py-1.5 rounded-lg bg-fd-primary text-fd-primary-foreground text-xs font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === "flowchart" ? (
          /* FLOWCHART VIEW */
          <div className="relative space-y-12">
            {/* Center spine connector line */}
            <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-emerald-500/50 z-0" />

            {filteredStages.map((stage, stageIndex) => (
              <div key={stage.id} className="relative z-10 space-y-6">
                {/* Stage Header Banner */}
                <div className="flex items-center justify-center">
                  <div className="px-5 py-2.5 rounded-2xl bg-fd-card border border-fd-border/80 shadow-lg text-center backdrop-blur-md max-w-lg">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-fd-primary">
                      Phase {stage.stageNumber}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-fd-foreground">
                      {stage.title}
                    </h2>
                    <p className="text-xs text-fd-muted-foreground mt-0.5">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Stage Nodes Grid */}
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  {stage.nodes.map((node, nodeIndex) => {
                    const status = nodeStatus[node.id] || "todo";
                    const isCompleted = status === "completed";
                    const isInProgress = status === "in-progress";

                    return (
                      <div
                        key={node.id}
                        onClick={() => handleOpenNode(node)}
                        className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left bg-fd-card/70 hover:bg-fd-card shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                          isCompleted
                            ? "border-emerald-500/40 bg-emerald-500/[0.03] ring-1 ring-emerald-500/20"
                            : isInProgress
                            ? "border-amber-500/40 bg-amber-500/[0.03] ring-1 ring-amber-500/20"
                            : "border-fd-border/80 hover:border-fd-primary/50"
                        }`}
                      >
                        {/* Status Checkbox & Badges */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-fd-muted text-fd-muted-foreground border border-fd-border">
                              {node.level}
                            </span>
                            {node.badge && (
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center gap-1">
                                <Sparkles className="w-2.5 h-2.5" />
                                {node.badge}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextStatus =
                                status === "todo"
                                  ? "in-progress"
                                  : status === "in-progress"
                                  ? "completed"
                                  : "todo";
                              handleStatusChange(node.id, nextStatus);
                            }}
                            className="p-1 rounded-lg text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted transition-colors"
                            title={`Status: ${status} (Click to toggle)`}
                            aria-label={`Toggle learning status for ${node.title}`}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : isInProgress ? (
                              <Clock className="w-5 h-5 text-amber-500" />
                            ) : (
                              <Circle className="w-5 h-5 text-fd-muted-foreground/40 group-hover:text-fd-muted-foreground" />
                            )}
                          </button>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="font-bold text-base text-fd-foreground group-hover:text-fd-primary transition-colors flex items-center justify-between">
                          <span>{node.title}</span>
                          <ArrowRight className="w-4 h-4 text-fd-muted-foreground group-hover:text-fd-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                        </h3>
                        <p className="text-xs text-fd-muted-foreground mt-1 line-clamp-2">
                          {node.subtitle}
                        </p>

                        {/* Subtopics Pills */}
                        {node.subTopics && node.subTopics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-fd-border/50">
                            {node.subTopics.slice(0, 3).map((st) => (
                              <span
                                key={st.id}
                                className="text-[10px] px-2 py-0.5 rounded-md bg-fd-muted/70 text-fd-foreground/80 font-medium"
                              >
                                {st.title}
                              </span>
                            ))}
                            {node.subTopics.length > 3 && (
                              <span className="text-[10px] px-1.5 py-0.5 text-fd-muted-foreground font-semibold">
                                +{node.subTopics.length - 3} more
                              </span>
                            )}
                          </div>
                        )}

                        {/* Direct Doc Links Indicator */}
                        {node.resources && node.resources.length > 0 && (
                          <div className="mt-3 flex items-center justify-between text-[11px] text-fd-primary font-medium">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-3.5 h-3.5" />
                              {node.resources.length} Guides & References
                            </span>
                            <span className="text-fd-muted-foreground text-[10px]">
                              Click to view
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : viewMode === "detailed" ? (
          /* DETAILED CARDS VIEW */
          <div className="space-y-10">
            {filteredStages.map((stage) => (
              <div key={stage.id} className="space-y-4">
                <div className="border-b border-fd-border pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-fd-primary">
                    Phase {stage.stageNumber}
                  </span>
                  <h2 className="text-xl font-bold text-fd-foreground">{stage.title}</h2>
                  <p className="text-xs text-fd-muted-foreground">{stage.description}</p>
                </div>

                <div className="space-y-4">
                  {stage.nodes.map((node) => {
                    const status = nodeStatus[node.id] || "todo";
                    return (
                      <div
                        key={node.id}
                        className="p-5 rounded-2xl border border-fd-border/80 bg-fd-card/50 space-y-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-fd-muted text-fd-muted-foreground">
                                {node.level}
                              </span>
                              {node.badge && (
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                                  {node.badge}
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-bold text-fd-foreground">{node.title}</h3>
                            <p className="text-xs text-fd-muted-foreground">{node.subtitle}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenNode(node)}
                              className="px-3 py-1.5 rounded-lg bg-fd-primary/10 text-fd-primary hover:bg-fd-primary hover:text-fd-primary-foreground text-xs font-semibold transition-colors"
                            >
                              Explore Details
                            </button>
                          </div>
                        </div>

                        <p className="text-xs text-fd-foreground/80 leading-relaxed">
                          {node.summary}
                        </p>

                        {/* Connected Links */}
                        {node.resources && node.resources.length > 0 && (
                          <div className="pt-3 border-t border-fd-border/60">
                            <span className="text-[11px] font-bold text-fd-muted-foreground uppercase block mb-2">
                              Connected OpenDevDocs Resources
                            </span>
                            <div className="grid sm:grid-cols-2 gap-2">
                              {node.resources.map((res, idx) => (
                                <Link
                                  key={idx}
                                  href={res.href}
                                  className="flex items-center justify-between p-2 rounded-lg border border-fd-border bg-fd-card hover:border-fd-primary text-xs font-medium group transition-all"
                                >
                                  <span className="truncate group-hover:text-fd-primary">
                                    {res.title}
                                  </span>
                                  <ArrowRight className="w-3.5 h-3.5 text-fd-muted-foreground group-hover:text-fd-primary group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* CHECKLIST VIEW */
          <div className="space-y-6">
            {filteredStages.map((stage) => (
              <div
                key={stage.id}
                className="p-6 rounded-2xl border border-fd-border/80 bg-fd-card/50 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-fd-border pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-fd-primary">
                      Phase {stage.stageNumber}
                    </span>
                    <h3 className="text-base font-bold text-fd-foreground">{stage.title}</h3>
                  </div>
                  <span className="text-xs text-fd-muted-foreground font-medium">
                    {stage.nodes.filter((n) => nodeStatus[n.id] === "completed").length} / {stage.nodes.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stage.nodes.map((node) => {
                    const status = nodeStatus[node.id] || "todo";
                    const isCompleted = status === "completed";

                    return (
                      <div
                        key={node.id}
                        onClick={() =>
                          handleStatusChange(
                            node.id,
                            isCompleted ? "todo" : "completed"
                          )
                        }
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          isCompleted
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-fd-card border-fd-border text-fd-foreground hover:bg-fd-accent"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={() => {}}
                            className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                          />
                          <div>
                            <p className={`text-xs font-semibold ${isCompleted ? "line-through opacity-80" : ""}`}>
                              {node.title}
                            </p>
                            <p className="text-[11px] text-fd-muted-foreground">
                              {node.subtitle}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenNode(node);
                          }}
                          className="text-[11px] font-medium text-fd-primary hover:underline ml-2"
                        >
                          View Guide
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Node Detail Slide-over / Modal */}
      <RoadmapNodeModal
        node={selectedNode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        status={selectedNode ? nodeStatus[selectedNode.id] || "todo" : "todo"}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}
