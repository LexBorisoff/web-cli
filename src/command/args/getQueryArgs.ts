import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options";
import { configFlags } from "../../data";
import getVersion from "../../helpers/getVersion";

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
