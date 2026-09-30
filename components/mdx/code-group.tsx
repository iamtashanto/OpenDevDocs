import * as React from "react";
import { Tab, Tabs, type TabsProps } from "fumadocs-ui/components/tabs";

export { Tab, Tabs };

export interface CodeGroupProps extends TabsProps {
  children: React.ReactNode;
}

/**
 * CodeGroup wrapper for grouping multiple code blocks or language tabs.
 */
export function CodeGroup({ children, ...props }: CodeGroupProps) {
  return (
    <div className="my-6">
      <Tabs {...props}>{children}</Tabs>
    </div>
  );
}
