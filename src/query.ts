import open from "open";

import { Engine } from "types";
import { defaults } from "data";
import {
  getArgs,
  getBrowser,
  getBrowserName,
  getEngine,
  getProfile,
} from "helpers";

const args = getArgs();

async function query(url?: string) {
  async function openUrl(browserName: string, profileDirectory?: string) {
    const browser = getBrowser(browserName);
    let browserArguments: string[] = [""];
    const removeEmptyArgument = () => {
      browserArguments = browserArguments.filter((arg) => arg !== "");
    };

    if (profileDirectory) {
      browserArguments.push(`--profile-directory=${profileDirectory}`);
      removeEmptyArgument();
    }
    if (args.incognito) {
      let incognito = "incognito";
      if (browserName == "edge") {
        incognito = "inprivate";
      } else if (browserName === "firefox" || browserName === "opera") {
        incognito = "private";
      }
      browserArguments.push(`--${incognito}`);
      removeEmptyArgument();
    }

    if (url != null && url !== "") {
      await open(url, {
        app: { name: browser, arguments: browserArguments },
      });
    } else {
      await open.openApp(browser, { arguments: browserArguments });
    }
  }

  async function openBrowserProfile(browser: string) {
    if (args.profile) {
      if (!Array.isArray(args.profile)) {
        const profile = getProfile(args.profile, browser);
        await openUrl(browser, profile);
      } else {
        args.profile.forEach(async (profileFromArgs) => {
          const profile = getProfile(profileFromArgs, browser);
          await openUrl(browser, profile);
        });
      }
    }
  }

  async function openBrowser(browserNameFromArgs: string) {
    const browserName = getBrowserName(browserNameFromArgs);
    if (browserName) {
      if (args.profile) {
        await openBrowserProfile(browserName);
      } else if (defaults.profile) {
        const defaultProfile = defaults.profile[browserName];
        const profile = getProfile(defaultProfile, browserName);
        await openUrl(browserName, profile);
      } else {
        await openUrl(browserName);
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
    const protocol = `http${args.secure ? "s" : ""}://`;
    await open(`${protocol}${url}`);
  }
  // open browser without searching anything
  else if (defaults.browser) {
    const browser = getBrowser(defaults.browser);
    if (browser) {
      const defaultProfile = defaults.profile?.[defaults.browser];
      const profile =
        defaultProfile && getProfile(defaultProfile, defaults.browser);
      const browserArguments = profile
        ? [`--profile-directory=${profile}`]
        : [""];

      await open.openApp(browser, {
        arguments: browserArguments,
      });
    }
  }
}

function getSearchQuery(engine: Engine) {
  const delimiter = engine.delimiter ?? defaults.delimiter;
  return args._.join(delimiter);
}

function getUrl(engineName: string) {
  const engine = getEngine(engineName);
  if (engine) {
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

export default main;

console.log(args);
