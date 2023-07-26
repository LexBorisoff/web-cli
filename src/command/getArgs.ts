import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Options, alias, optionList, aliasList } from "./options";
import { getBrowsersList, getProfilesList, getEnginesList } from "../data";

const browsersList = getBrowsersList();
const enginesList = getEnginesList();
const profilesList = getProfilesList();

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
      default: true,
    })
    .help(false)
    .boolean(getFlagOptions())
    .parseSync();
}
