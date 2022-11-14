import { Choices } from "args";
import { Browsers } from "browser";
import { SearchEngine, SearchEngines } from "search";

import open from "open";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import config from "../config.json";

const browsers: Browsers = config.browsers;
const searchEngines: SearchEngines = config.engines;
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
  .option("open", {
    description: "Browser to open",
    alias: "o",
    requireArg: true,
    choices: choices.browsers,
    default: config.default.browser,
  })
  .option("query", {
    description: "Search engine / Website to query",
    alias: "q",
    requireArg: true,
    choices: choices.engines,
    default: config.default.engine,
  })
  .help(false)
  .parseSync();

async function query(url?: string) {
  async function openBrowser(browser: string) {
    if (url) {
      await open(url, { app: { name: browser } });
    } else {
      await open(browser);
    }
  }

  if (!Array.isArray(args.open)) {
    if (browsers[args.open].enable) {
      await openBrowser(args.open);
    }
  } else {
    args.open.forEach(async (browserName) => {
      if (browsers[browserName].enable) {
        await openBrowser(browserName);
      }
    });
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
  const delimiter = engine.delimiter ?? config.default.delimiter;
  return args._.join(delimiter);
}

async function main() {
  function getUrl(engineNameFromArgs: string) {
    const engineName = getEngineNameFromConfig(engineNameFromArgs);

    if (engineName) {
      const engine = searchEngines[engineName];
      const searchQuery = getSearchQuery(engine);
      return engine.url + engine.query + searchQuery;
    }
  }

  if (args._) {
    if (!Array.isArray(args.query)) {
      await query(getUrl(args.query));
    } else {
      Object.values(args.query).forEach(async (engineName) => {
        await query(getUrl(engineName));
      });
    }
  }
}

main();
