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
      description: "A browser app to open",
    })
    .option(Option.Profile, {
      type: "string",
      alias: alias.profile,
      description: "A browser profile to use",
    })
    .option(Option.Engine, {
      type: "string",
      alias: alias.engine,
      description: "A search engine (or website) to query",
    })
    .option(Option.Route, {
      type: "string",
      alias: alias.route,
      description: "An engine's route to access",
    })
    .option(Option.Address, {
      type: "string",
      alias: alias.address,
      description: "A custom address to access",
    })
    .option(Option.Port, {
      type: "number",
      alias: alias.port,
      description: "An explicit port number to add to the URL",
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
    .help()
    .version(getVersion())
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
