import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { getBrowsersList, getProfilesList, getEnginesList } from "../data";

const browsersList = getBrowsersList();
const enginesList = getEnginesList();
const profilesList = getProfilesList();

export enum Options {
  browser = "browser",
  profile = "profile",
  engine = "engine",
  package = "package",
  incognito = "incognito",
  http = "http",
  https = "https",
  config = "config",
  force = "force",
  _ = "_",
  $0 = "$0",
}

export const alias = {
  browser: ["b"],
  profile: ["p"],
  engine: ["e", "website", "w"],
  package: ["pkg", "library", "lib"],
  incognito: ["i", "private"],
  https: ["secure", "s"],
  force: ["f"],
};

export const optionList = Object.values(Options) as string[];
export const aliasList = Object.values(alias).flat();

/**
 * Allows to interpret provided args that correspond to config's
 * names and aliases of browsers, profiles, and engines
 * as booleans and to not set the value to the arg's key
 */
function getFlagOptions() {
  const options = [...optionList, ...aliasList];
  return [...browsersList, ...profilesList, ...enginesList].filter(
    (customOption) => !options.includes(customOption)
  );
}

export default function getArgs() {
  return yargs(hideBin(process.argv))
    .option(Options.browser, {
      type: "string",
      description: "Browser to open",
      alias: alias.browser,
      requireArg: true,
    })
    .option(Options.profile, {
      type: "string",
      description: "Browser profile to use (if applicable)",
      alias: alias.profile,
      requireArg: true,
    })
    .option(Options.engine, {
      type: "string",
      description: "Search engine / Website to query",
      alias: alias.engine,
      requireArg: true,
    })
    .option(Options.package, {
      type: "boolean",
      description: "Query packages / libraries (if applicable)",
      alias: alias.package,
      default: false,
    })
    .option(Options.incognito, {
      type: "boolean",
      description: "Query in the incognito / private tab",
      alias: alias.incognito,
      default: false,
    })
    .option(Options.http, {
      type: "boolean",
      description: `Query using the "http" (not secure) protocol`,
      default: false,
    })
    .option(Options.https, {
      type: "boolean",
      description: `Query using the "https" (secure) protocol`,
      alias: alias.https,
      default: true,
    })
    .help(false)
    .boolean(getFlagOptions())
    .parseSync();
}
