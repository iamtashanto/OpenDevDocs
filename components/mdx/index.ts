/**
 * components/mdx barrel export.
 * All components here are registered in mdx-components.tsx and available
 * globally in all .md and .mdx documentation files without manual imports.
 */
export {
  Callout,
  Warning,
  Info,
  Tip,
  Danger,
  type CalloutProps,
  type CalloutType,
} from "./callout";
export { Command, type CommandProps } from "./command";
export { Terminal, type TerminalProps } from "./terminal";
export { Step, Steps } from "./steps";
export { CodeGroup, Tab, Tabs, type CodeGroupProps } from "./code-group";
export {
  PackageManagerTabs,
  type PackageManagerTabsProps,
} from "./package-manager-tabs";
export { OSTabs, type OSTabsProps } from "./os-tabs";
export { FileTree, File, Folder, type FileTreeProps } from "./file-tree";
export { VersionBadge, type VersionBadgeProps } from "./version-badge";
export {
  KeyboardShortcut,
  type KeyboardShortcutProps,
} from "./keyboard-shortcut";
export {
  ExpandableDetails,
  type ExpandableDetailsProps,
} from "./expandable-details";
export { RoadmapView } from "./roadmap-flow";
