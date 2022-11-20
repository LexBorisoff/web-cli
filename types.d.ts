export interface Defaults {
  engine: string;
  delimiter: string;
  browser?: string;
  profile?: { [key: string]: string };
}

export interface Profile {
  profile: string; // same as dir
  alias?: string | string[];
}

export interface ProfilesConfig {
  [key: string]: Profile;
}

export interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

type BrowsersConfig = Array<string | Browser>;

export interface Engine {
  url: string;
  query: string;
  package?: string;
  delimiter?: string;
  alias?: string | string[];
}

export interface EnginesConfig {
  [index: string]: Engine;
}
