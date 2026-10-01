"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  X,
  CheckCircle2,
  Clock,
  ExternalLink,
  BookOpen,
  Terminal,
  FileCode2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { RoadmapNode } from "@/lib/roadmaps-data";

interface RoadmapNodeModalProps {
  node: RoadmapNode | null;
  isOpen: boolean;
  onClose: () => void;
  status: "todo" | "in-progress" | "completed";
  onStatusChange: (nodeId: string, status: "todo" | "in-progress" | "completed") => void;
}

export function RoadmapNodeModal({
  node,
  isOpen,
  onClose,
  status,
  onStatusChange,
}: RoadmapNodeModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !node) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-fd-background border border-fd-border rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-6 border-b border-fd-border/70 bg-fd-card/50 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-fd-primary/10 text-fd-primary border border-fd-primary/20">
                {node.level}
              </span>
              {node.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  {node.badge}
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold tracking-tight text-fd-foreground">
              {node.title}
            </h3>
            <p className="text-sm text-fd-muted-foreground mt-1">
              {node.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-accent transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Status Switcher */}
          <div className="bg-fd-muted/30 p-4 rounded-xl border border-fd-border/60">
            <span className="text-xs font-semibold uppercase tracking-wider text-fd-muted-foreground block mb-2.5">
              Your Learning Status
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onStatusChange(node.id, "todo")}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  status === "todo"
                    ? "bg-fd-card text-fd-foreground border-fd-border shadow-sm ring-1 ring-fd-border font-semibold"
                    : "border-transparent text-fd-muted-foreground hover:bg-fd-accent"
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-fd-muted-foreground/50" />
                To Learn
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(node.id, "in-progress")}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  status === "in-progress"
                    ? "bg-amber-500/10 text-amber-500 border-amber-500/30 shadow-sm font-semibold"
                    : "border-transparent text-fd-muted-foreground hover:bg-fd-accent"
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                In Progress
              </button>
              <button
                type="button"
                onClick={() => onStatusChange(node.id, "completed")}
                className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-all ${
                  status === "completed"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 shadow-sm font-semibold"
                    : "border-transparent text-fd-muted-foreground hover:bg-fd-accent"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Mastered
              </button>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-fd-muted-foreground mb-2">
              Overview
            </h4>
            <p className="text-fd-foreground/90 leading-relaxed">
              {node.summary}
            </p>
          </div>

          {/* Key Skills */}
          {node.keySkills && node.keySkills.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-fd-muted-foreground mb-3">
                Key Skills & Competencies
              </h4>
              <ul className="space-y-2">
                {node.keySkills.map((skill, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-fd-foreground/90">
                    <span className="w-1.5 h-1.5 rounded-full bg-fd-primary mt-2 flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Subtopics / Options */}
          {node.subTopics && node.subTopics.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-fd-muted-foreground mb-3">
                Recommended Path & Alternatives
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {node.subTopics.map((st) => (
                  <div
                    key={st.id}
                    className="p-3 rounded-xl border border-fd-border/70 bg-fd-card/40 flex items-center justify-between gap-2"
                  >
                    <span className="font-medium text-fd-foreground text-xs">
                      {st.title}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase ${
                        st.status === "recommended"
                          ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                          : st.status === "alternative"
                          ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/20"
                          : "bg-fd-muted text-fd-muted-foreground"
                      }`}
                    >
                      {st.status ?? "optional"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connected OpenDevDocs Guides */}
          {node.resources && node.resources.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-fd-muted-foreground mb-3 flex items-center justify-between">
                <span>OpenDevDocs Guides & Deep Links</span>
                <span className="text-[11px] text-fd-primary font-normal">Direct Link</span>
              </h4>
              <div className="grid gap-2">
                {node.resources.map((res, i) => {
                  const Icon =
                    res.type === "command"
                      ? Terminal
                      : res.type === "recipe"
                      ? FileCode2
                      : res.type === "error"
                      ? AlertTriangle
                      : BookOpen;

                  const isExternal = res.href.startsWith("http");

                  return (
                    <Link
                      key={i}
                      href={res.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between p-3 rounded-xl border border-fd-border/80 bg-fd-card/60 hover:border-fd-primary/50 hover:bg-fd-accent/40 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-lg bg-fd-primary/10 text-fd-primary group-hover:bg-fd-primary group-hover:text-fd-primary-foreground transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-xs text-fd-foreground truncate group-hover:text-fd-primary transition-colors">
                            {res.title}
                          </p>
                          <p className="text-[11px] text-fd-muted-foreground capitalize">
                            {res.type} Reference
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-fd-muted-foreground group-hover:text-fd-primary group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-fd-border bg-fd-card/50 flex items-center justify-between">
          <span className="text-xs text-fd-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-fd-muted border border-fd-border font-mono">ESC</kbd> to close
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-fd-primary text-fd-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
