import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 text-slate-900 dark:text-slate-100 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-5 sm:p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight text-slate-900 dark:text-slate-100", className)}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-slate-600 dark:text-slate-400 leading-relaxed", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 sm:p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 sm:p-6 pt-0", className)} {...props} />;
}

export interface InteractiveCardProps {
  href: string;
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Clickable interactive card for section landing pages and overview grids.
 */
export function InteractiveCard({
  href,
  icon,
  title,
  description,
  badge,
  className,
  id,
}: InteractiveCardProps) {
  return (
    <Link
      href={href}
      id={id}
      className={cn(
        "group relative flex flex-col justify-between p-5 rounded-xl border",
        "border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60",
        "hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900",
        "card-interactive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-3">
          {icon && <div className="text-2xl select-none">{icon}</div>}
          {badge && <div>{badge}</div>}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1.5 text-base">
          {title}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <span>Explore</span>
        <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
      </div>
    </Link>
  );
}

interface CardsProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Responsive grid wrapper for cards.
 */
export function Cards({ children, columns = 3, className }: CardsProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-4", gridCols[columns], className)}>
      {children}
    </div>
  );
}
