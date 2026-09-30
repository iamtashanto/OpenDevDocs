import { cn } from "@/lib/utils";

interface StepProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

/**
 * A numbered step in a multi-step guide.
 * Used inside a <Steps> wrapper.
 */
export function Step({ step, title, children }: StepProps) {
  return (
    <div className="relative pl-10">
      <div
        aria-hidden
        className={cn(
          "absolute left-0 top-0 flex h-7 w-7 items-center justify-center",
          "rounded-full bg-blue-600 text-xs font-bold text-white select-none"
        )}
      >
        {step}
      </div>
      <h3 className="mb-2 font-semibold text-neutral-100">{title}</h3>
      <div className="text-sm text-neutral-400 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Ordered step list wrapper with connecting lines.
 *
 * Usage in .mdx:
 *   <Steps>
 *     <Step step={1} title="Install dependencies">Run `pnpm install`.</Step>
 *     <Step step={2} title="Start dev server">Run `pnpm dev`.</Step>
 *   </Steps>
 */
export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn(
        "my-6 flex flex-col gap-6",
        // Vertical connector line through step numbers
        "[&>div:not(:last-child)]:pb-6 [&>div:not(:last-child)]:border-b [&>div:not(:last-child)]:border-neutral-800",
        className
      )}
    >
      {children}
    </div>
  );
}
