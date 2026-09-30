import * as React from "react";
import {
  Callout,
  type CalloutProps,
  type CalloutType,
} from "@/components/ui/callout";

export { Callout, type CalloutProps, type CalloutType };

export function Info(props: Omit<CalloutProps, "type">) {
  return <Callout type="info" {...props} />;
}

export function Tip(props: Omit<CalloutProps, "type">) {
  return <Callout type="tip" {...props} />;
}

export function Warning(props: Omit<CalloutProps, "type">) {
  return <Callout type="warning" {...props} />;
}

export function Danger(props: Omit<CalloutProps, "type">) {
  return <Callout type="danger" {...props} />;
}
