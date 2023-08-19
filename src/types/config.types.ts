import { WithAlias } from "./utility.types";

// DEFAULTS
export interface DefaultsData {
  browser?: string | null;
  profile?: { [key: string]: string } | null;
  engine?: string | null;
  delimiter?: string | null;
}

// BROWSERS
export interface Profile extends WithAlias {
  directory: string; // --profile-directory="Folder Name"
}

export interface ProfilesData {
  [profile: string]: Profile;
}

export interface Browser extends WithAlias {
  profiles?: ProfilesData;
}

export interface BrowsersData {
  [browser: string]: Browser;
}

// ENGINES
export interface Engine extends WithAlias {
  name: string;
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export interface EnginesData {
  [engine: string]: Engine;
}

// CONFIG
export interface ConfigData {
  defaults?: DefaultsData;
  browsers?: BrowsersData;
  engines?: EnginesData;
}

export interface ConfigSettings {
  linkedPath?: string; // path to config file
  cachedPath?: string; // path to cached file
  config?: ConfigData; // config cache
}
