import type { WithAlias, IsDefault } from "./utility.d.ts";

// BROWSERS
export interface Profile extends WithAlias, IsDefault {
  directory: string; // --profile-directory="Folder Name"
}

export interface ProfilesData {
  [profile: string]: Profile;
}

export interface Browser extends WithAlias, IsDefault {
  profiles?: ProfilesData;
}

export interface BrowsersData {
  [browser: string]: Browser;
}

// ENGINES
interface Routes {
  [route: string]: string;
}

export interface Engine extends WithAlias, IsDefault {
  name: string;
  url: string;
  query?: string;
  routes?: Routes;
  delimiter?: string;
}

export interface EnginesData {
  [engine: string]: Engine;
}

// DEFAULTS
export interface DefaultsData {
  delimiter: string;
  engine: [string, Engine];
  browser: [string, Browser] | null;
  profile: (browserName: string) => [string, Profile] | null;
}
