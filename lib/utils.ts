import type { CSSProperties } from "react";

/** Tiny className joiner — no dependency needed. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Stagger helper for [data-reveal] elements: style={delay(120)} */
export function delay(ms: number): CSSProperties {
  return { ["--d" as string]: `${ms}ms` } as CSSProperties;
}
