import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { commandsSource } from "@/app/source";
import { buildSharedNavLinks, sharedDocsLayoutProps } from "@/components/docs";

export default function CommandsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={commandsSource.pageTree}
      links={buildSharedNavLinks("commands")}
      {...sharedDocsLayoutProps}
    >
      {children}
    </DocsLayout>
  );
}
