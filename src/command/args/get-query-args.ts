import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { configFlags } from "../../data/config-flags.js";
import { getVersion } from "../../helpers/utils/get-version.js";
import { Option, alias, options } from "../options.js";

const version = getVersion();

export function getQueryArgs() {
  return yargs(hideBin(process.argv))
    .option(Option.Browser, {
      type: "string",
      alias: alias.browser,
      description: "The browser app to open",
    })
    .option(Option.Profile, {
      type: "string",
      alias: alias.profile,
      description: "The user profile to open",
    })
    .option(Option.Engine, {
      type: "string",
      alias: alias.engine,
      description: "The search engine (or website) to query",
    })
    .option(Option.Resource, {
      type: "string",
      alias: alias.resource,
      description: "The engine's resource to access",
    })
    .option(Option.Port, {
      type: "number",
      alias: alias.port,
      description: "The port number to add to the URL",
    })
    .option(Option.Incognito, {
      type: "boolean",
      alias: alias.incognito,
      description: "Open in incognito / private mode",
    })
    .option(Option.Split, {
      type: "boolean",
      description: "Split values into separate web queries",
    })
    .option(Option.Http, {
      type: "boolean",
      description: "Use the HTTP (non-secure) protocol",
    })
    .option(Option.Peek, {
      type: "boolean",
      description: "Display the output without opening browser tabs",
    })
    .option(Option.Update, {
      type: "boolean",
      description: "Update package to the most current version",
    })
    .help()
    .version(version != null ? `Version ${version}` : "Could not get version")
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
