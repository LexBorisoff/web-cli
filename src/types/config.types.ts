import { WithAlias } from "./utility.types";

// DEFAULTS
export interface DefaultsConfig {
  browser?: string | null;
  profile?: { [key: string]: string } | null;
  engine?: string | null;
  delimiter?: string | null;
}

// BROWSERS
export interface BrowserObject extends Partial<WithAlias> {
  name: string;
  privateFlag?: string; // TODO: implement (--incognito, --private, etc.)
}

export type Browser = string | BrowserObject;

export type BrowsersConfig<B = Browser> = Array<B>;

// PROFILES
export interface Profile extends Partial<WithAlias> {
  directory: string; // --profile-directory="Folder Name"
}

export interface BrowserProfiles {
  [profile: string]: Profile;
}

export interface ProfilesConfig {
  [browser: string]: BrowserProfiles | undefined;
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
  profiles?: ProfilesConfig;
  engines?: EnginesConfig;
}
