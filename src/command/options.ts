type Alias<T extends string> = Partial<Record<T, string | string[]>>;

export const yargsOptions = ["_", "$0"];

// WEB SEARCH OPTIONS
export enum Option {
  Browser = "browser",
  Profile = "profile",
  Search = "search",
  Package = "package",
  Incognito = "incognito",
  Http = "http",
  Query = "query",
  Split = "split",
}

export const alias: Alias<Option> = {
  browser: ["b"],
  profile: ["p"],
  search: ["s"],
  package: ["pkg", "library", "lib"],
  incognito: ["i", "private"],
  query: ["q"],
};

/**
 * CLI options and their aliases (excluding config options)
 */
export const options = [
  ...Object.values(Option),
  ...Object.values(alias).flat(),
] as string[];

// CONFIG OPTIONS
export enum ConfigOption {
  Config = "config",
  Force = "force",
}

export const configAlias: Alias<ConfigOption> = {
  force: ["f"],
};

/**
 * CLI options and their aliases related to config
 */
export const configOptions = [
  ...Object.values(ConfigOption),
  ...Object.values(configAlias).flat(),
] as string[];
