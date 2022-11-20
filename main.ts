import { Engine } from "./types";
import open from "open";
import getArgs from "./getArgs";
import { getDefaults, getBrowserName, getEngine } from "./helpers";

const args = getArgs();
const defaults = getDefaults();

const supportedBrowsers = Object.keys(open.apps);

function hasProfiles(browser: string) {
  // return Object.keys(browsers[browser].profiles).length > 0;
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
  async function openBrowser(browserNameFromArgs: string) {
    const browser = getBrowserName(browserNameFromArgs);
    if (browser) {
      if (args.profile) {
      }

      if (url != null && url !== "") {
        await open(url, { app: { name: browser } });
      } else {
        console.log("browser", browser);
        await open.openApp("msedge");
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
  else {
    // opens empty tab if no profile
    await open.openApp(open.apps.firefox, {
      arguments: [""],
    });
    // await open(open.apps.edge as string);
    // output message saying cannot open browser if default is not set
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

main();
console.log(args);
