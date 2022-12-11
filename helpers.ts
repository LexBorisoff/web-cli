import open from "open";
import {
  Defaults,
  Browser,
  BrowsersConfig,
  Engine,
  EnginesConfig,
  ProfilesConfig,
} from "./types";
import config from "./config.json";
import enginesData from "./engines.json";

export const engines = enginesData as EnginesConfig;
export const browsers = config.browsers as BrowsersConfig;
export const profiles = config.profiles as ProfilesConfig;

export function getDefaults(): Defaults {
  const mainDefaults = {
    engine: "google",
    delimiter: " ",
  };
  return {
    ...mainDefaults,
    ...config.defaults,
  };
}

export function constructChoices<T extends object>(list: T): string[] {
  let result: string[] = [];
  Object.entries(list).forEach(([key, item]) => {
    result = [...result, key.toLowerCase()];

    if (item.alias) {
      if (Array.isArray(item.alias)) {
        result = [
          ...result,
          ...item.alias.map((alias: string) => alias.toLowerCase()),
        ];
      } else {
        result = [...result, item.alias.toLowerCase()];
      }
    }
  });
  return result;
}

export function getBrowser(browserName: string) {
  switch (browserName) {
    case "chrome":
      return open.apps.chrome;
    case "firefox":
      return open.apps.firefox;
    case "edge":
      return open.apps.edge;
    default:
      return browserName;
  }
}

export function getBrowserName(nameFromArgs: string): string | undefined {
  const foundBrowser = browsers.find((browser: string | Browser) => {
    if (typeof browser === "string") {
      return browser === nameFromArgs;
    }

    return (
      browser.name === nameFromArgs ||
      (typeof browser?.alias === "string" && browser.alias === nameFromArgs) ||
      (Array.isArray(browser.alias) && browser.alias.includes(nameFromArgs))
    );
  });

  if (foundBrowser) {
    return typeof foundBrowser === "string" ? foundBrowser : foundBrowser.name;
  }
}

function getConfigItemByNameOrAlias<T extends object>(name: string, list: T) {
  if (Object.keys(list).includes(name)) {
    return list[name as keyof T];
  }

  let found;
  Object.values(list).forEach((item) => {
    if (item.alias) {
      if (
        (Array.isArray(item.alias) && item.alias.includes(name)) ||
        item.alias === name
      ) {
        found = item;
        return;
      }
    }
  });
  return found;
}

export function getEngine(engineName: string): Engine | undefined {
  return getConfigItemByNameOrAlias(engineName, engines);
}

export function getProfile(
  profileName: string,
  browserName: string
): string | undefined {
  const browserProfiles = profiles[browserName];
  if (browserProfiles) {
    return getConfigItemByNameOrAlias(profileName, browserProfiles)?.profile;
  }
}
