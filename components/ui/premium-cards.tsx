"use client";

import * as React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor?: "blue" | "purple" | "emerald" | "amber" | "rose" | "cyan";
  href?: string;
}

const accentMap = {
  blue: {
    glow: "from-blue-500/20 to-blue-600/5",
    border: "group-hover:border-blue-500/50",
    iconBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400",
    shimmer: "from-transparent via-blue-500/10 to-transparent",
  },
  purple: {
    glow: "from-purple-500/20 to-purple-600/5",
    border: "group-hover:border-purple-500/50",
    iconBg: "bg-purple-500/10 text-purple-500 dark:text-purple-400",
    shimmer: "from-transparent via-purple-500/10 to-transparent",
  },
  emerald: {
    glow: "from-emerald-500/20 to-emerald-600/5",
    border: "group-hover:border-emerald-500/50",
    iconBg: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400",
    shimmer: "from-transparent via-emerald-500/10 to-transparent",
  },
  amber: {
    glow: "from-amber-500/20 to-amber-600/5",
    border: "group-hover:border-amber-500/50",
    iconBg: "bg-amber-500/10 text-amber-500 dark:text-amber-400",
    shimmer: "from-transparent via-amber-500/10 to-transparent",
  },
  rose: {
    glow: "from-rose-500/20 to-rose-600/5",
    border: "group-hover:border-rose-500/50",
    iconBg: "bg-rose-500/10 text-rose-500 dark:text-rose-400",
    shimmer: "from-transparent via-rose-500/10 to-transparent",
  },
  cyan: {
    glow: "from-cyan-500/20 to-cyan-600/5",
    border: "group-hover:border-cyan-500/50",
    iconBg: "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400",
    shimmer: "from-transparent via-cyan-500/10 to-transparent",
  },
};

export function GlowCard({
  icon,
  title,
  description,
  accentColor = "blue",
  href,
  children,
  className = "",
}: FeatureCardProps & { children?: React.ReactNode; className?: string }) {
  const accent = accentMap[accentColor];
  const Tag = href ? "a" : "div";
  const linkProps = href ? { href } : {};

  return (
    <Tag
      {...linkProps}
      className={`group relative overflow-hidden rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-900/40 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10 ${accent.border} ${className}`}
    >
      {/* Shimmer effect on hover */}
      <div
        className={`pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r ${accent.shimmer}`}
      />

      {/* Top glow */}
      <div
        className={`pointer-events-none absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r ${accent.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative p-6">
        <div
          className={`mb-4 inline-flex items-center justify-center size-10 rounded-xl ${accent.iconBg} ring-1 ring-inset ring-current/10`}
        >
          {icon}
        </div>

        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>

        {children}
      </div>
    </Tag>
  );
}

/* ─── Section Header with Animated Gradient Accent ───────────── */
interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  accentColor?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  accentColor = "text-blue-600 dark:text-blue-400",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";

  return (
    <div className={`max-w-2xl mb-12 ${alignClass}`}>
      <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-blue-500/15 bg-blue-500/5 dark:bg-blue-500/10">
        <span
          className={`text-xs font-semibold uppercase tracking-wider ${accentColor}`}
        >
          {eyebrow}
        </span>
      </div>

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-3">
        {title}
      </h2>

      {description && (
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

/* ─── Animated Stats Counter ─────────────────────────────────── */
interface StatItemProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function StatItem({ label, value, icon }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 p-4">
      {icon && (
        <div className="text-blue-500 dark:text-blue-400 mb-1">{icon}</div>
      )}
      <span className="text-2xl sm:text-3xl font-bold gradient-text">
        {value}
      </span>
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
    </div>
  );
}
