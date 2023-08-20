import { Arguments } from "yargs";

export type Args = Partial<Arguments["_"]>;

export interface WithAlias {
  alias?: string | string[];
}

export interface WithDefault {
  default?: boolean;
}

export type Severity = "neutral" | "info" | "success" | "warning" | "error";

export type BannerType = "neutral" | "header" | "footer";
