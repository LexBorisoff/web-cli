import {
  Defaults,
  Browser,
  BrowsersConfig,
  Engine,
  EnginesConfig,
} from "./types";
import config from "./config.json";

export const browsers = config.browsers as BrowsersConfig;
export const engines = config.engines as EnginesConfig;

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

export function constructChoices<T extends Object>(list: T): string[] {
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

export function getEngine(engineName: string): Engine | undefined {
  if (Object.keys(engines).includes(engineName)) {
    return engines[engineName];
  }

  let found;
  Object.values(engines).forEach((engine) => {
    if (engine.alias) {
      if (
        (Array.isArray(engine.alias) && engine.alias.includes(engineName)) ||
        engine.alias === engineName
      ) {
        found = engine;
        return;
      }
    }
  });
  return found;
}
