import { WithAlias } from "./utility.types";

// DEFAULTS
export interface DefaultsConfig {
  browser?: string | null;
  profile?: { [key: string]: string } | null;
  engine?: string | null;
  delimiter?: string | null;
}

// BROWSERS
export interface Profile extends Partial<WithAlias> {
  directory: string; // --profile-directory="Folder Name"
}

export interface ProfilesConfig {
  [profile: string]: Profile;
}

export interface Browser extends Partial<WithAlias> {
  profiles?: ProfilesConfig;
}

export interface BrowsersConfig {
  [browser: string]: Browser;
}

// ENGINES
export interface Engine extends Partial<WithAlias> {
  name: string;
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export interface EnginesConfig {
  [engine: string]: Engine;
}

export interface Config {
  defaults?: DefaultsConfig;
  browsers?: BrowsersConfig;
  engines?: EnginesConfig;
}
