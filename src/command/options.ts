enum YargsOptions {
  _ = "_",
  $0 = "$0",
}

export enum Options {
  browser = "browser",
  profile = "profile",
  engine = "engine",
  package = "package",
  incognito = "incognito",
  http = "http",
}

export enum ConfigOptions {
  config = "config",
  force = "force",
}

type Alias<T extends string> = Partial<Record<T, string | string[]>>;

export const alias: Alias<Options> = {
  browser: ["b"],
  profile: ["p"],
  engine: ["e", "website", "w"],
  package: ["pkg", "library", "lib"],
  incognito: ["i", "private"],
};

export const configAlias: Alias<ConfigOptions> = {
  force: ["f"],
};

export const optionList = [
  ...Object.values(Options),
  ...Object.values(ConfigOptions),
  ...Object.values(YargsOptions),
] as string[];

export const aliasList = [
  ...Object.values(alias).flat(),
  ...Object.values(configAlias).flat(),
];
