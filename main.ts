import { BrowsersConfig } from "browser";
import { Engine, EnginesConfig } from "engine";
import open from "open";
import config from "./config.json";

import { getKeyFromConfig, getDefaults } from "./helpers";
import getArgs from "./getArgs";

const defaults = getDefaults();
const browsers = config.browsers as BrowsersConfig;
const engines = config.engines as EnginesConfig;

const args = getArgs();

function hasProfiles(browser: string) {
  return Object.keys(browsers[browser].profiles).length > 0;
}

function getDefaultProfile(browser?: string) {
  if (typeof defaults.profile === "string") {
    return defaults.profile;
  } else if (
    browser &&
    defaults.profile &&
    Object.keys(defaults.profile).includes(browser)
  ) {
    return defaults.profile[browser];
  }
}

async function query(url?: string) {
  async function openBrowser(browser: string) {
    // TODO: deal with profiles

    const browserKey = getKeyFromConfig(browser, config.browsers);
    if (browserKey && browsers[browserKey]?.enable) {
      if (url != null && url !== "") {
        await open(url, { app: { name: browser } });
      } else {
        await open(browser);
      }
    }
  }

  // browser specified through args or as default
  if (args.browser) {
    if (!Array.isArray(args.browser)) {
      await openBrowser(args.browser);
    } else {
      args.browser.forEach(async (browserName) => {
        await openBrowser(browserName);
      });
    }
  }
  // browser NOT specified but has search query
  else if (url) {
    console.log("here");
    const protocol = `http${args.secure ? "s" : ""}://`;
    await open(`${protocol}${url}`);
  }
  // open browser without searching anything
  else {
    // output message saying cannot open browser if default is not set
  }
}

function getSearchQuery(engine: Engine) {
  const delimiter = engine.delimiter ?? defaults.delimiter;
  return args._.join(delimiter);
}

function getUrl(engineNameFromArgs: string) {
  const engineKey = getKeyFromConfig(engineNameFromArgs, config.engines);
  if (engineKey) {
    const engine = engines[engineKey];
    const searchQuery = getSearchQuery(engine);
    return engine.url + engine.query + searchQuery;
  }
}

async function main() {
  // perform search query
  if (args._.length > 0) {
    // single search engine / website to query
    if (!Array.isArray(args.engine)) {
      await query(getUrl(args.engine));
    }
    // multiple search engines / websites to query
    else {
      Object.values(args.engine).forEach(async (engineName) => {
        await query(getUrl(engineName));
      });
    }
  }
  // open browser(s) without search query
  else {
    await query();
  }
}

console.log(args);

main();
