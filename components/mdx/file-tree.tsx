import * as React from "react";
import { Files, File, Folder } from "fumadocs-ui/components/files";

export { Files, File, Folder };

export interface FileTreeProps extends React.ComponentPropsWithoutRef<typeof Files> {
  children: React.ReactNode;
}

/**
 * Visual directory and file tree component for documentation.
 */
export function FileTree({ children, className, ...props }: FileTreeProps) {
  return (
    <div className="my-6">
      <Files className={className} {...props}>
        {children}
      </Files>
    </div>
  );
}
