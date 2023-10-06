import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options.js";
import { configFlags } from "../../data/index.js";
import getVersion from "../../helpers/getVersion.js";

export default function getQueryArgs() {
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
    .option(Option.Route, {
      type: "string",
      alias: alias.route,
      description: "The engine's route to access",
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
    .help()
    .version(getVersion())
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
