import chalk from "chalk";
import WebSearch from "../WebSearch.js";
import type { Browser, Engine } from "../Options.js";
import {
  getDataArgs,
  getQueryArgs,
  validateArgs,
} from "./command/args/index.js";
import getDefaultsData from "./data/getDefaultsData.js";
import {
  print,
  severity,
  capitalize,
  emptyLine,
} from "./helpers/print/index.js";
import { findEngine } from "./helpers/find/index.js";
import { getBrowserName, getProfiles } from "./helpers/browser/index.js";
import { BrowserQuery } from "./types/query.js";

const { _: keywords, address, route, incognito, split, http } = getQueryArgs();

const defaults = getDefaultsData();
const [, defaultEngine] = defaults.engine;
const browserArgs = getDataArgs.browser();
const engineArgs = getDataArgs.engine();
const { info, success, error, warning } = severity;

export default function query(): void {
  const errors = validateArgs();
  if (errors.length > 0) {
    errors.forEach((message) => {
      print(message);
    });
    return;
  }

  const wsEngines: Engine[] = [];
  if (engineArgs.length > 0) {
    engineArgs.forEach((engineNameOrAlias) => {
      const found = findEngine(engineNameOrAlias);
      if (found != null) {
        const [, engine] = found;
        delete engine.alias;
        delete engine.isDefault;
        wsEngines.push(engine);
      }
    });
  }

  const wsBrowsers: Browser[] = [];
  const browserQueries: BrowserQuery[] = [];

  /**
   * Constructs web search browsers and browser queries
   */
  function handleBrowser(browserNameOrAlias: string) {
    const browserName = getBrowserName(browserNameOrAlias);
    const profiles = getProfiles(browserName);

    wsBrowsers.push({
      name: browserName,
      profileDirectory: profiles.map(([, profile]) => profile.directory),
    });

    browserQueries.push({
      browser: browserName,
      profiles: profiles.map(([profileName]) => profileName),
    });
  }

  if (browserArgs.length > 0) {
    browserArgs.forEach((nameOrAlias) => {
      handleBrowser(nameOrAlias);
    });
  } else if (defaults.browser != null) {
    const [browserName] = defaults.browser;
    handleBrowser(browserName);
  }

  const webSearch = new WebSearch({
    keywords,
    browser: wsBrowsers.length > 0 ? wsBrowsers : null,
    engine: wsEngines.length > 0 ? wsEngines : null,
    defaultEngine,
    address,
    route,
    incognito,
    split,
    http,
  });

  webSearch.open();

  // log bare engines
  if (webSearch.bareEngines.length > 0) {
    print(warning(`Engines with no ${chalk.italic.bold("query")} options:`));
    print(error(webSearch.bareEngines.join(", ")));
  }

  // log browser queries
  browserQueries.forEach((browserQuery) => {
    if (webSearch.bareEngines.length > 0) {
      emptyLine();
    }

    const { browser, profiles } = browserQuery;
    let browserInfo = info(capitalize(browser));
    if (profiles.length > 0) {
      browserInfo += ` (${chalk.gray(profiles.join(", "))})${
        incognito ? chalk.gray(" [private tab]") : ""
      }`;
    }

    print(browserInfo);
  });

  // log urls
  webSearch.urls.forEach((url) => {
    print(`> ${success(url)}`);
  });
}
