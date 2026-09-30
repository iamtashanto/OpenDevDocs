import * as React from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Command } from "./command";

export interface OSTabsProps {
  linux?: string;
  macos?: string;
  windows?: string;
  children?: React.ReactNode;
}

export function OSTabs({ linux, macos, windows, children }: OSTabsProps) {
  if (children) {
    return (
      <Tabs items={["Linux", "macOS", "Windows"]} className="my-6">
        {children}
      </Tabs>
    );
  }

  return (
    <Tabs items={["Linux", "macOS", "Windows"]} className="my-6">
      {linux && (
        <Tab value="Linux">
          <Command>{linux}</Command>
        </Tab>
      )}
      {macos && (
        <Tab value="macOS">
          <Command>{macos}</Command>
        </Tab>
      )}
      {windows && (
        <Tab value="Windows">
          <Command prompt="PS>">{windows}</Command>
        </Tab>
      )}
    </Tabs>
  );
}
