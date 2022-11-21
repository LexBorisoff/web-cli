import { Engine } from "./types";
import open from "open";
import getArgs from "./getArgs";
import { getDefaults, getBrowserName, getEngine, getProfile } from "./helpers";

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

function getBrowser(browserName: string) {
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

async function query(url?: string) {
  async function openUrl(browserName: string, profileDirectory?: string) {
    let browser = getBrowser(browserName);
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
    const browser = getBrowserName(browserNameFromArgs);
    if (browser) {
      if (args.profile) {
        await openBrowserProfile(browser);
      } else {
        await openUrl(browser);
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
    console.log(url);
    const protocol = `http${args.secure ? "s" : ""}://`;
    await open(`${protocol}${url}`);
  }
  // open browser without searching anything
  else {
    console.log("last");
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
