import type { OmitKey } from './omit-key.type.js';
import type {
  BrowserConfig,
  BrowserName,
  SiteConfig,
  ResourceConfig,
  SearchPathConfig,
} from '@api/index.js';

export interface WithAlias {
  alias?: string | string[];
}

export interface WithDefault {
  isDefault?: boolean;
}

export interface BaseConfigOptions extends WithAlias, WithDefault {}

/* ~~~ ENGINES ~~~ */

export interface ConfigSiteOptions<
  Prefix extends SearchPathConfig = undefined,
  Resource extends ResourceConfig = undefined,
>
  extends SiteConfig<Prefix, Resource>, BaseConfigOptions {}

export interface ConfigSite extends ConfigSiteOptions<
  SearchPathConfig,
  ResourceConfig
> {
  url: string;
}

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
  extends
    OmitKey<BrowserConfig<NonNullable<BrowserName>, undefined>, 'profiles'>,
    BaseConfigOptions {
  appPath?: string;
  profiles?: ConfigProfiles;
}

export type ConfigBrowser = ConfigBrowserOptions;

/* ~~~ CONFIG DATA ~~~ */

export interface WithSchema {
  $schema: string;
}

export type SitesData = Record<string, ConfigSite>;
export type BrowsersData = Record<string, ConfigBrowser>;

export type SitesConfig = SitesData & WithSchema;
export type BrowsersConfig = BrowsersData & WithSchema;

export interface ConfigData {
  sites: SitesData;
  browsers: BrowsersData;
}

/* ~~~ DEFAULTS ~~~ */

export interface DefaultsData {
  delimiter: string;
  engine: [string, ConfigSite];
  browser: [string, ConfigBrowser] | null;
  profile: (browserName: string) => [string, Profile] | null;
}
