import { cn } from "@/lib/utils";

type CalloutType = "note" | "tip" | "warning" | "danger";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: string; containerClass: string; titleClass: string }
> = {
  note: {
    icon: "ℹ️",
    containerClass: "border-blue-500/30 bg-blue-500/5",
    titleClass: "text-blue-400",
  },
  tip: {
    icon: "💡",
    containerClass: "border-emerald-500/30 bg-emerald-500/5",
    titleClass: "text-emerald-400",
  },
  warning: {
    icon: "⚠️",
    containerClass: "border-amber-500/30 bg-amber-500/5",
    titleClass: "text-amber-400",
  },
  danger: {
    icon: "🚨",
    containerClass: "border-red-500/30 bg-red-500/5",
    titleClass: "text-red-400",
  },
};

/**
 * Callout / admonition box for MDX content.
 *
 * Usage in .mdx files:
 *   <Callout type="tip" title="Pro tip">Use pnpm for faster installs.</Callout>
 */
export function Callout({ type = "note", title, children }: CalloutProps) {
  const { icon, containerClass, titleClass } = calloutConfig[type];

  return (
    <div
      role="note"
      aria-label={type}
      className={cn(
        "my-6 rounded-xl border px-5 py-4 text-sm leading-relaxed",
        containerClass
      )}
    >
      {title && (
        <p className={cn("mb-2 flex items-center gap-2 font-semibold", titleClass)}>
          <span aria-hidden>{icon}</span>
          {title}
        </p>
      )}
      <div className="text-neutral-300 [&>p:last-child]:mb-0 [&>p]:mb-2">
        {children}
      </div>
    </div>
  );
}
