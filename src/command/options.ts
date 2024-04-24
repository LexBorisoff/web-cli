type Alias<T extends string> = Partial<Record<T, string | string[]>>;
type OptionType = "string" | "number" | "boolean";

export const yargsOptions = ["_", "$0"];

// QUERY OPTIONS
export enum Option {
  Browser = "browser",
  Profile = "profile",
  Engine = "engine",
  Resource = "resource",
  Port = "port",
  Incognito = "incognito",
  Split = "split",
  Http = "http",
  Peek = "peek",
  Update = "update",
}

export const optionTypes = {
  [Option.Browser]: "string" as const,
  [Option.Profile]: "string" as const,
  [Option.Engine]: "string" as const,
  [Option.Resource]: "string" as const,
  [Option.Port]: "number" as const,
  [Option.Incognito]: "boolean" as const,
  [Option.Split]: "boolean" as const,
  [Option.Http]: "boolean" as const,
  [Option.Peek]: "boolean" as const,
  [Option.Update]: "boolean" as const,
} satisfies Record<Option, OptionType>;

export const alias: Alias<Option> = {
  browser: ["b"],
  profile: ["p"],
  engine: ["e"],
  resource: ["r"],
  port: [":"],
  incognito: ["i"],
};

/**
 * CLI options and their aliases (excluding config options)
 */
export const options: string[] = [
  ...Object.values(Option),
  ...Object.values(alias).flat(),
];

// CONFIG OPTIONS
export enum ConfigOption {
  Config = "config",
}

/**
 * CLI options and their aliases related to config
 */
export const configOptions: string[] = Object.values(ConfigOption);
