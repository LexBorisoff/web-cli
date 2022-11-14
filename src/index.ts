import { Browser, Browsers } from "types/browser";

import open from "open";
import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import config from "../config.json";

interface SearchEngine {
  url: string;
  query: string;
  package?: string;
  alias?: string | string[];
}

interface Choices {
  browsers: string[];
  engines: string[];
}

const browsers: Browsers = config.browsers;
const choices: Choices = {
  browsers: Object.keys(config.browsers),
  engines: [],
};

Object.entries(config.engines).forEach(
  ([key, engine]: [key: string, engine: SearchEngine]) => {
    if (engine.alias) {
      if (Array.isArray(engine.alias)) {
        choices.engines = [...choices.engines, ...engine.alias];
      } else {
        choices.engines = [...choices.engines, engine.alias];
      }
    } else {
      choices.engines = [...choices.engines, key];
    }
  }
);

const args = yargs(hideBin(process.argv))
  .option("open", {
    description: "browser to open",
    alias: "o",
    requireArg: true,
    choices: choices.browsers,
    default: config.default.browser,
  })
  .option("query", {
    description: "use a specific search engine/website",
    alias: "q",
    requireArg: true,
    choices: choices.engines,
    default: config.default.engine,
  })
  .help(false)
  .parseSync();

async function query(url: string) {
  async function openBrowser(browser: string) {
    await open(url, { app: { name: browser } });
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

async function getSearchString() {
  const delimiter = " ";
  const searchArgs = args._;

  await query(searchArgs.join(delimiter));
}

getSearchString();
