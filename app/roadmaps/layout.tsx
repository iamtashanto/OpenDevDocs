import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function RoadmapsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      <SiteHeader />
      <main className="flex-1 w-full">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

