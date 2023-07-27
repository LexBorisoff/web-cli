import { Arguments } from "yargs";

export type Args = Partial<Arguments["_"]>;

export interface WithAlias {
  alias: string | string[];
}

export type Severity = "neutral" | "info" | "success" | "warning" | "error";

export type BannerType = "neutral" | "header" | "footer";
