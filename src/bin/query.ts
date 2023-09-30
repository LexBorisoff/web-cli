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
import { findEngine, findProfile } from "./helpers/find/index.js";
import { BrowserQuery } from "./types/query.js";
import { withProfile } from "./command/with.js";
import getBrowserName from "./helpers/browser/getBrowserName.js";
import { Profile } from "./types/config.js";

const { _: keywords, address, route, incognito, split, http } = getQueryArgs();

const defaults = getDefaultsData();
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

  const browserQueries: BrowserQuery[] = [];
  const browsers: Browser[] = [];
  const engines: Engine[] = [];

  /**
   * Returns a list of profile keys from the config
   * for a provided browser name
   */
  function getProfiles(browserName: string): [string, Profile][] {
    const profiles: [string, Profile][] = [];

    function handleProfile(profileNameOrAlias: string) {
      const found = findProfile(browserName, profileNameOrAlias);
      if (found != null) {
        profiles.push(found);
      }
    }

    if (withProfile(browserName)) {
      const profileArgs = getDataArgs.profile(browserName);
      const defaultProfile = defaults.profile(browserName);

      if (profileArgs.length > 0) {
        profileArgs.forEach((profileNameOrAlias) => {
          handleProfile(profileNameOrAlias);
        });
      } else if (defaultProfile != null) {
        const [profileName] = defaultProfile;
        handleProfile(profileName);
      }
    }

    return profiles;
  }

  function addBrowser(browserNameOrAlias: string) {
    const browserName = getBrowserName(browserNameOrAlias);
    const profiles = getProfiles(browserName);

    browserQueries.push({
      browser: browserName,
      profiles: profiles.map(([profileName]) => profileName),
    });

    browsers.push({
      name: browserName,
      profileDirectory: profiles.map(([, profile]) => profile.directory),
    });
  }

  if (browserArgs.length > 0) {
    browserArgs.forEach((nameOrAlias) => {
      addBrowser(nameOrAlias);
    });
  }
  // default browser exists in config
  else if (defaults.browser != null) {
    const [browserName] = defaults.browser;
    addBrowser(browserName);
  }

  if (engineArgs.length > 0) {
    engineArgs.forEach((engineNameOrAlias) => {
      const found = findEngine(engineNameOrAlias);
      if (found != null) {
        const [, engine] = found;
        delete engine.alias;
        delete engine.isDefault;
        engines.push(engine);
      }
    });
  }

  const defaultEngine = defaults.engine[1];
  delete defaultEngine.alias;
  delete defaultEngine.isDefault;

  const webSearch = new WebSearch({
    keywords,
    browser: browsers.length > 0 ? browsers : null,
    engine: engines.length > 0 ? engines : null,
    defaultEngine,
    address,
    route,
    incognito,
    split,
    http,
  });

  webSearch.open();

  if (webSearch.bareEngines.length > 0) {
    print(warning(`Engines with no ${chalk.italic.bold("query")} options:`));
    print(error(webSearch.bareEngines.join(", ")));
  }

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

  webSearch.urls.forEach((url) => {
    print(`> ${success(url)}`);
  });
}
