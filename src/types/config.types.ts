import type {
  BrowserConfig,
  BrowserName,
  EngineConfig,
  ResourceConfig,
  SearchConfig,
} from "@lexjs/browser-search";
import type { OmitKey } from "./omit-key.type.js";

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

/* ~~~ DEFINE CONFIG ~~~ */

export type CreatedBrowser = ConfigBrowser & { __browser: true };
export type CreatedEngine = ConfigEngine & { __engine: true };

export type CreateBrowserFn = (
  name: NonNullable<BrowserName>,
  config?: ConfigBrowserOptions
) => CreatedBrowser;

export type CreateEngineFn = (
  baseUrl: string,
  config?: ConfigEngineOptions<SearchConfig, ResourceConfig>
) => CreatedEngine;

export interface DefineConfigProps {
  engine: CreateEngineFn;
  browser: CreateBrowserFn;
}

export type DefineConfigCallback = (
  props: DefineConfigProps
) => Record<string, CreatedEngine | CreatedBrowser>;

export type DefineConfigFn = (callback: DefineConfigCallback) => void;

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
