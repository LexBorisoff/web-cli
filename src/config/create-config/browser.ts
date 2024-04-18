import type {
  BrowserConfig,
  BrowserName,
  ProfilesConfig,
} from "@lexjs/browser-search";

type OmitKey<T extends object, K extends keyof T> = Omit<T, K>;

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

type CallbackFn = (
  createFn: typeof createBrowser
) => Record<string, ReturnType<typeof createBrowser>>;

export function defineBrowsers(callback: CallbackFn) {
  const browsers = callback(createBrowser);
  const json = JSON.stringify(browsers);
  console.log(json);
}
