import * as React from "react";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { Command } from "./command";

export interface PackageManagerTabsProps {
  /** The package name to install, e.g. "tailwindcss", "@types/node" */
  package?: string;
  /** Whether this is a dev dependency (-D) */
  dev?: boolean;
  /** Full command without package manager name, e.g. "create-next-app@latest ./" */
  command?: string;
  /** Custom tab contents */
  children?: React.ReactNode;
}

export function PackageManagerTabs({
  package: pkg,
  dev = false,
  command,
  children,
}: PackageManagerTabsProps) {
  if (children) {
    return (
      <Tabs items={["pnpm", "npm", "yarn", "bun"]} className="my-6">
        {children}
      </Tabs>
    );
  }

  if (command) {
    const isCreate = command.startsWith("create-");
    return (
      <Tabs items={["pnpm", "npm", "yarn", "bun"]} className="my-6">
        <Tab value="pnpm">
          <Command>{isCreate ? `pnpm create ${command.replace(/^create-/, "")}` : `pnpm ${command}`}</Command>
        </Tab>
        <Tab value="npm">
          <Command>{isCreate ? `npm create ${command.replace(/^create-/, "")}` : `npx ${command}`}</Command>
        </Tab>
        <Tab value="yarn">
          <Command>{isCreate ? `yarn create ${command.replace(/^create-/, "")}` : `yarn ${command}`}</Command>
        </Tab>
        <Tab value="bun">
          <Command>{isCreate ? `bun create ${command.replace(/^create-/, "")}` : `bunx ${command}`}</Command>
        </Tab>
      </Tabs>
    );
  }

  if (pkg) {
    const devFlagPnpm = dev ? " -D" : "";
    const devFlagNpm = dev ? " --save-dev" : "";
    const devFlagYarn = dev ? " --dev" : "";
    const devFlagBun = dev ? " -d" : "";

    return (
      <Tabs items={["pnpm", "npm", "yarn", "bun"]} className="my-6">
        <Tab value="pnpm">
          <Command>{`pnpm add${devFlagPnpm} ${pkg}`}</Command>
        </Tab>
        <Tab value="npm">
          <Command>{`npm install${devFlagNpm} ${pkg}`}</Command>
        </Tab>
        <Tab value="yarn">
          <Command>{`yarn add${devFlagYarn} ${pkg}`}</Command>
        </Tab>
        <Tab value="bun">
          <Command>{`bun add${devFlagBun} ${pkg}`}</Command>
        </Tab>
      </Tabs>
    );
  }

  return null;
}
