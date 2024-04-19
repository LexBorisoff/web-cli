import type {
  BrowserConfig,
  BrowserName,
  ProfilesConfig,
} from "@lexjs/browser-search";
import { OmitKey } from "../../utils/types.js";

interface Profile {
  directory: string;
  alias?: string | string[];
}

interface ConfigProfiles {
  profiles?: { [key: string]: string | Profile };
}

interface ConfigBrowserOptions<
  N extends BrowserName = undefined,
  P extends ProfilesConfig = undefined,
> extends OmitKey<BrowserConfig<N, P>, "profiles">,
    ConfigProfiles {
  alias?: string | string[];
}

function createBrowser<
  N extends BrowserName = undefined,
  P extends ProfilesConfig = undefined,
>(browserName: N, config: ConfigBrowserOptions<N, P> = {}) {
  return {
    name: browserName,
    ...config,
  };
}

export type ConfigBrowser = ReturnType<typeof createBrowser>;

type CallbackFn = (
  createFn: typeof createBrowser
) => Record<string, ConfigBrowser>;

export function defineBrowsers(callback: CallbackFn) {
  const browsers = callback(createBrowser);
  const json = JSON.stringify(browsers);
  console.log(json);
}
