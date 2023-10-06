type Alias<T extends string> = Partial<Record<T, string | string[]>>;

export const yargsOptions = ["_", "$0"];

// WEB SEARCH OPTIONS
export enum Option {
  Browser = "browser",
  Profile = "profile",
  Engine = "engine",
  Route = "route",
  Port = "port",
  Incognito = "incognito",
  Split = "split",
  Http = "http",
  Peek = "peek",
}

export const alias: Alias<Option> = {
  browser: ["b"],
  profile: ["p"],
  engine: ["e"],
  route: ["r"],
  port: [":"],
  incognito: ["i"],
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
}

export enum ConfigValue {
  Browsers = "browsers",
  Engines = "engines",
}

export const configValues = Object.values(ConfigValue) as string[];

/**
 * CLI options and their aliases related to config
 */
export const configOptions = Object.values(ConfigOption) as string[];
