"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Check, Minus, Plus, Scan, ArrowDown } from "lucide-react";
import type { RoadmapDefinition } from "@/lib/roadmaps/types";

interface Props {
  roadmap: RoadmapDefinition;
  completedNodes: string[];
  onToggleComplete: (id: string) => void;
  searchQuery?: string;
}

const titles: Record<string, string> = {
  internet: "Internet", html: "HTML", css: "CSS", javascript: "JavaScript",
  vcs: "Version control", typescript: "TypeScript", frameworks: "Choose a framework",
  "react-nextjs": "Full-stack React", testing: "Testing", performance: "Performance & deployment",
  "linux-os": "Operating systems", networking: "Networking & security",
  containers: "Containers", cicd: "CI / CD", orchestration: "Kubernetes",
  iac: "Infrastructure as code", observability: "Observability",
};

export function RoadmapGraph({ roadmap, completedNodes, onToggleComplete, searchQuery = "" }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const query = searchQuery.trim().toLowerCase();
  const layout = useMemo(() => {
    const heights = [...roadmap.sections].sort((a, b) => a.order - b.order).map((section) => Math.max(140, Math.ceil(roadmap.nodes.filter((node) => node.sectionId === section.id).length / 2) * 66 + 54));
    const sections = [...roadmap.sections].sort((a, b) => a.order - b.order).map((section, index) => {
      const topics = roadmap.nodes.filter((node) => node.sectionId === section.id);
      const rows = Math.ceil(topics.length / 2);
      const height = Math.max(140, rows * 66 + 54);
      const cursor = 146 + heights.slice(0, index).reduce((sum, value) => sum + value, 0);
      const y = cursor + height / 2;
      const nodes = topics.map((node, i) => ({
        node,
        x: i % 2 === 0 ? 56 : 730,
        y: cursor + 24 + Math.floor(i / 2) * 66,
        left: i % 2 === 0,
      }));
      return { section, index, y, nodes };
    });
    return { sections, height: 266 + heights.reduce((sum, value) => sum + value, 0) };
  }, [roadmap]);
  const matches = roadmap.nodes.filter((node) => query && [node.title, node.description, ...(node.tags ?? []), ...(node.keyConcepts ?? [])].join(" ").toLowerCase().includes(query));
  const next = roadmap.nodes.find((node) => node.docsHref && !completedNodes.includes(node.id));

  return (
    <section className="roadmap-map" aria-label={roadmap.title + " visual map"}>
      <div className="roadmap-map-toolbar">
        <div className="roadmap-map-key"><span className="roadmap-key-line" /> Learning path <span className="roadmap-key-dots" /> Related topics <span className="roadmap-key-check"><Check size={12} /></span> Completed</div>
        <div className="flex items-center gap-1">
          <button aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(.7, z - .1))}><Minus size={16} /></button>
          <span className="w-12 text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
          <button aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.4, z + .1))}><Plus size={16} /></button>
          <button aria-label="Fit width" onClick={() => setZoom(Math.min(1, (viewport.current?.clientWidth ?? 1080) / 1080))}><Scan size={16} /></button>
          <button onClick={() => setZoom(1)} className="text-xs">Reset</button>
        </div>
      </div>
      {query && <div className="roadmap-search-results" aria-live="polite">
        <span>{matches.length} matching topics</span>
        {matches.map((node) => <button key={node.id} onClick={() => document.getElementById("map-" + node.id)?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })}>{node.title}<ArrowDown size={12} /></button>)}
      </div>}
      <div ref={viewport} className="roadmap-map-scroll">
        <div style={{ width: 1080 * zoom, height: layout.height * zoom, marginInline: "auto" }}>
          <div className="roadmap-map-plane" style={{ width: 1080, height: layout.height, transform: `scale(${zoom})` }}>
            <div className="roadmap-map-start"><span>YOUR LEARNING PATH</span><h2>{roadmap.title.replace(/ Roadmap$/, "")}</h2><p>Follow the line. Explore the branches.</p></div>
            <svg width="1080" height={layout.height} className="roadmap-connectors" aria-hidden="true">
              <path d={`M540 122 V${layout.height - 62}`} className="roadmap-spine" />
              {layout.sections.flatMap(({ section, y, nodes }) => nodes.map(({ node, x, y: nodeY, left }) => {
                const sx = left ? 420 : 660, tx = left ? x + 294 : x, sy = y + 25, ty = nodeY + 25;
                return <path key={section.id + node.id} d={`M${sx} ${sy} C${left ? 382 : 698} ${sy}, ${left ? 382 : 698} ${ty}, ${tx} ${ty}`} className={node.type === "alternative" ? "roadmap-branch alternative" : "roadmap-branch"} />;
              }))}
            </svg>
            {layout.sections.map(({ section, index, y, nodes }) => <div key={section.id}>
              <div className="roadmap-junction" style={{ left: 420, top: y }}><span>{String(index + 1).padStart(2, "0")}</span>{titles[section.id] ?? section.title.replace(/^\d+\.\s*/, "")}</div>
              {nodes.map(({ node, x, y: nodeY }) => {
                const completed = completedNodes.includes(node.id);
                const highlighted = matches.some((match) => match.id === node.id);
                return <div key={node.id} id={"map-" + node.id} className={`roadmap-topic ${completed ? "is-complete" : ""} ${highlighted ? "is-match" : ""} ${node.id === next?.id ? "is-next" : ""} ${node.type === "alternative" ? "is-alternative" : ""}`} style={{ left: x, top: nodeY }}>
                  {node.docsHref ? <Link href={node.docsHref} className="roadmap-topic-label">{node.title}</Link> : <span className="roadmap-topic-label">{node.title}<small>Coming soon</small></span>}
                  <button aria-pressed={completed} aria-label={`Mark ${node.title} ${completed ? "incomplete" : "complete"}`} onClick={() => onToggleComplete(node.id)} className="roadmap-topic-check">{completed && <Check size={13} />}</button>
                  <div className="roadmap-topic-tooltip">{node.description}<span>{node.level}{node.type === "alternative" ? " · Alternative" : ""}</span></div>
                </div>;
              })}
            </div>)}
            <div className="roadmap-map-end" style={{ top: layout.height - 62 }}><Check size={15} /> Keep building. Keep learning.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
