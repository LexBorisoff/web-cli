import type {
  BrowserConfig,
  BrowserName,
  EngineConfig,
  ResourceConfig,
  SearchConfig,
} from "@lexjs/browser-search";
import type { OmitKey } from "../utils/types.js";

interface BaseConfigOptions {
  alias?: string | string[];
  isDefault?: boolean;
}

/* ~~~ BROWSERS ~~~ */

interface Profile extends BaseConfigOptions {
  directory: string;
}

interface ConfigProfiles {
  profiles?: { [key: string]: string | Profile };
}

interface ConfigBrowserOptions
  extends OmitKey<
      BrowserConfig<NonNullable<BrowserName>, undefined>,
      "profiles"
    >,
    ConfigProfiles,
    BaseConfigOptions {}

interface ConfigBrowser extends ConfigBrowserOptions {
  name: NonNullable<BrowserName>;
}

type CreateBrowserFn = (
  name: NonNullable<BrowserName>,
  config?: ConfigBrowserOptions
) => ConfigBrowser;

type DefineBrowsersCallback = (
  createFn: CreateBrowserFn
) => Record<string, ConfigBrowser>;

export type DefineBrowsersFn = (callback: DefineBrowsersCallback) => void;

/* ~~~ ENGINES ~~~ */

interface ConfigEngineOptions<
  S extends SearchConfig = undefined,
  R extends ResourceConfig = undefined,
> extends EngineConfig<S, R>,
    BaseConfigOptions {
  name?: string;
}

interface ConfigEngine
  extends ConfigEngineOptions<SearchConfig, ResourceConfig> {
  baseUrl: string;
}

type CreateEngineFn = (
  baseUrl: string,
  config?: ConfigEngineOptions<SearchConfig, ResourceConfig>
) => ConfigEngine;

type DefineEnginesCallback = (
  createFn: CreateEngineFn
) => Record<string, ConfigEngine>;

export type DefineEnginesFn = (callback: DefineEnginesCallback) => void;

/* ~~~ CONFIG DATA ~~~ */

export interface ConfigFileData {
  browsers?: Record<string, ConfigBrowser>;
  engines?: Record<string, ConfigEngine>;
}
