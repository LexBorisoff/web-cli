export interface DefaultsConfig {
  engine: string;
  delimiter: string;
  browser?: string;
  profile?: { [key: string]: string };
}

export interface Profile {
  profile: string; // same as dir
  alias?: string | string[];
  path?: string;
}

export interface BrowserProfiles {
  [key: string]: Profile;
}

export interface ProfilesConfig {
  [key: string]: BrowserProfiles;
}

export interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

export type BrowsersConfig = Array<string | Browser>;

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
