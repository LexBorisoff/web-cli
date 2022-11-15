import { Choices } from "args";
import { Browsers } from "browser";
import { SearchEngine, SearchEngines } from "search";
import { Defaults } from "defaults";

import open from "open";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import config from "./config.json";

const mainDefaults = {
  engine: "google",
  delimiter: " ",
};
const defaults = {
  ...mainDefaults,
  ...config.defaults,
} as Defaults;
const browsers = config.browsers as Browsers;
const searchEngines = config.engines as SearchEngines;

const choices: Choices = {
  browsers: Object.keys(config.browsers),
  engines: [],
};

Object.entries(config.engines).forEach(
  ([key, engine]: [key: string, engine: SearchEngine]) => {
    choices.engines = [...choices.engines, key.toLowerCase()];

    if (engine.alias) {
      if (Array.isArray(engine.alias)) {
        choices.engines = [
          ...choices.engines,
          ...engine.alias.map((alias) => alias.toLowerCase()),
        ];
      } else {
        choices.engines = [...choices.engines, engine.alias.toLowerCase()];
      }
    }
  }
);

const args = yargs(hideBin(process.argv))
  .option("browser", {
    description: "Browser to open",
    alias: "b",
    requireArg: true,
    choices: choices.browsers,
    default: defaults.browser,
  })
  .option("profile", {
    description: "Browser profile",
    alias: "p",
    requireArg: true,
  })
  .option("engine", {
    description: "Search engine / Website to query",
    alias: ["website", "e", "w"],
    requireArg: true,
    choices: choices.engines,
    default: defaults.engine,
  })
  .option("secure", {
    description: "Use https protocol during search",
    alias: ["s", "https"],
    type: "boolean",
    default: true,
  })
  .help(false)
  .parseSync();

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

    if (url != null && url !== "") {
      await open(url, { app: { name: browser } });
    } else {
      await open(browser);
    }
  }

  // browser specified thru args or as default
  if (args.browser) {
    if (!Array.isArray(args.browser)) {
      if (browsers[args.browser].enable) {
        await openBrowser(args.browser);
      }
    } else {
      args.browser.forEach(async (browserName) => {
        if (browsers[browserName].enable) {
          await openBrowser(browserName);
        }
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
    // output message saying cannot open browser if default is not set
  }
}

function getEngineNameFromConfig(engineName: string) {
  if (Object.keys(config.engines).includes(engineName)) {
    return engineName;
  }

  let engineFromConfig = "";
  Object.entries(config.engines).forEach(
    ([key, engine]: [key: string, engine: SearchEngine]) => {
      if (engine.hasOwnProperty("alias")) {
        if (
          (Array.isArray(engine.alias) && engine.alias.includes(engineName)) ||
          engine.alias === engineName
        ) {
          engineFromConfig = key;
          return;
        }
      }
    }
  );

  if (engineFromConfig !== "") {
    return engineFromConfig;
  }
}

function getSearchQuery(engine: SearchEngine) {
  const delimiter = engine.delimiter ?? defaults.delimiter;
  return args._.join(delimiter);
}

function getUrl(engineNameFromArgs: string) {
  const engineName = getEngineNameFromConfig(engineNameFromArgs);

  if (engineName) {
    const engine = searchEngines[engineName];
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
