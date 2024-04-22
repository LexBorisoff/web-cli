import type {
  BrowserConfig,
  BrowserName,
  EngineConfig,
  ResourceConfig,
  SearchConfig,
} from "@lexjs/browser-search";
import type { OmitKey } from "../utils/types.js";

export interface WithAlias {
  alias?: string | string[];
}

export interface IsDefault {
  isDefault?: boolean;
}

export interface BaseConfigOptions extends WithAlias, IsDefault {}

/* ~~~ BROWSERS ~~~ */

export interface Profile extends BaseConfigOptions {
  directory: string;
}

export interface ConfigProfiles {
  [key: string]: string | Profile;
}

export type ProfilesData = {
  [K in keyof ConfigProfiles]: Exclude<ConfigProfiles[K], string>;
};

export interface ConfigBrowserOptions
  extends OmitKey<
      BrowserConfig<NonNullable<BrowserName>, undefined>,
      "profiles"
    >,
    BaseConfigOptions {
  profiles?: ConfigProfiles;
}

export interface ConfigBrowser extends ConfigBrowserOptions {
  name: NonNullable<BrowserName>;
}

export type CreateBrowserFn = (
  name: NonNullable<BrowserName>,
  config?: ConfigBrowserOptions
) => ConfigBrowser;

export type DefineBrowsersCallback = (
  createFn: CreateBrowserFn
) => Record<string, ConfigBrowser>;

export type DefineBrowsersFn = (callback: DefineBrowsersCallback) => void;

/* ~~~ ENGINES ~~~ */

export interface ConfigEngineOptions<
  S extends SearchConfig = undefined,
  R extends ResourceConfig = undefined,
> extends EngineConfig<S, R>,
    BaseConfigOptions {
  name?: string;
}

export interface ConfigEngine
  extends ConfigEngineOptions<SearchConfig, ResourceConfig> {
  baseUrl: string;
}

export type CreateEngineFn = (
  baseUrl: string,
  config?: ConfigEngineOptions<SearchConfig, ResourceConfig>
) => ConfigEngine;

export type DefineEnginesCallback = (
  createFn: CreateEngineFn
) => Record<string, ConfigEngine>;

export type DefineEnginesFn = (callback: DefineEnginesCallback) => void;

/* ~~~ CONFIG DATA ~~~ */

export interface ConfigFileData {
  browsers?: Record<string, ConfigBrowser>;
  engines?: Record<string, ConfigEngine>;
}

/* ~~~ DEFAULTS ~~~ */

export interface DefaultsData {
  delimiter: string;
  engine: [string, ConfigEngine];
  browser: [string, ConfigBrowser] | null;
  profile: (browserName: string) => [string, Profile] | null;
}
