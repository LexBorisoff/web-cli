import type { Arguments } from "yargs";

export type Args = Arguments["_"];

export type Arg = Args[number];

export interface WithAlias {
  alias?: string | string[];
}

export interface IsDefault {
  isDefault?: boolean;
}

export type Severity = "neutral" | "info" | "success" | "warning" | "error";

export type BannerType = "neutral" | "header" | "footer";
