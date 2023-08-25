type Alias<T extends string> = Partial<Record<T, string | string[]>>;

export const yargsOptions = ["_", "$0"];

// WEB SEARCH OPTIONS
export enum Option {
  Open = "open",
  Profile = "profile",
  Query = "query",
  Route = "route",
  Private = "private",
  Join = "join",
  Split = "split",
  Http = "http",
}

export const alias: Alias<Option> = {
  open: ["o"],
  profile: ["p"],
  query: ["q"],
  route: ["r"],
  private: ["i"],
  join: ["j"],
  split: ["s"],
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
  Browsers = "browsers",
  Engines = "engines",
  Config = "config",
}

/**
 * CLI options and their aliases related to config
 */
export const configOptions = Object.values(ConfigOption) as string[];
