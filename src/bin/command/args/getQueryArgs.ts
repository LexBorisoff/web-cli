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
    })
    .option(Option.Profile, {
      type: "string",
      alias: alias.profile,
    })
    .option(Option.Engine, {
      type: "string",
      alias: alias.engine,
    })
    .option(Option.Route, {
      type: "string",
      alias: alias.route,
    })
    .option(Option.Address, {
      type: "string",
      alias: alias.address,
    })
    .option(Option.Port, {
      type: "number",
      alias: alias.port,
    })
    .option(Option.Incognito, {
      type: "boolean",
      alias: alias.incognito,
    })
    .option(Option.Split, {
      type: "boolean",
    })
    .option(Option.Http, {
      type: "boolean",
    })
    .help(false)
    .version(getVersion())
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
