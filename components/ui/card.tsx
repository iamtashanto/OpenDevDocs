import Link from "next/link";
import { cn } from "@/lib/utils";

interface CardProps {
  href: string;
  icon?: string;
  title: string;
  description: string;
  className?: string;
  id?: string;
}

/**
 * Clickable content card used in section overview pages.
 */
export function Card({ href, icon, title, description, className, id }: CardProps) {
  return (
    <Link
      href={href}
      id={id}
      className={cn(
        "group flex flex-col gap-3 p-5 rounded-xl border border-neutral-800",
        "bg-neutral-900/60 hover:border-neutral-600 hover:bg-neutral-900",
        "transition-all duration-200 hover:-translate-y-0.5",
        "hover:shadow-lg hover:shadow-neutral-950/50",
        className
      )}
    >
      {icon && <span className="text-2xl select-none">{icon}</span>}
      <div>
        <h3 className="font-semibold text-neutral-200 group-hover:text-white transition-colors mb-1">
          {title}
        </h3>
        <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-medium text-neutral-600 group-hover:text-neutral-400 transition-colors">
        Open
        <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden>→</span>
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
 * Responsive grid wrapper for Card components.
 */
export function Cards({ children, columns = 3, className }: CardsProps) {
  const gridCols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={cn("grid grid-cols-1 gap-4", gridCols[columns], className)}>
      {children}
    </div>
  );
}
