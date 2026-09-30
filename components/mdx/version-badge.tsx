import * as React from "react";
import { Badge } from "@/components/ui/badge";

export interface VersionBadgeProps {
  version?: string;
  status?: "stable" | "lts" | "experimental" | "deprecated" | "new" | "beta";
  children?: React.ReactNode;
}

const statusConfig: Record<
  NonNullable<VersionBadgeProps["status"]>,
  { label: string; variant: "default" | "brand" | "success" | "warning" | "error" | "info" }
> = {
  stable: { label: "Stable", variant: "success" },
  lts: { label: "LTS", variant: "brand" },
  experimental: { label: "Experimental", variant: "warning" },
  deprecated: { label: "Deprecated", variant: "error" },
  new: { label: "New", variant: "info" },
  beta: { label: "Beta", variant: "warning" },
};

export function VersionBadge({
  version,
  status,
  children,
}: VersionBadgeProps) {
  if (status) {
    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} size="sm" className="font-mono text-[10px]">
        {children ?? config.label}
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" size="sm" className="font-mono text-[10px]">
      {children ?? version}
    </Badge>
  );
}
