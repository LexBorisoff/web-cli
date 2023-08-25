import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options";
import { configFlags } from "../../data";

export default function getQueryArgs() {
  return yargs(hideBin(process.argv))
    .option(Option.Open, {
      type: "string",
      alias: alias.open,
      requireArg: true,
    })
    .option(Option.Profile, {
      type: "string",
      alias: alias.profile,
      requireArg: true,
    })
    .option(Option.Query, {
      type: "string",
      alias: alias.query,
      requireArg: true,
    })
    .option(Option.Route, {
      type: "string",
      alias: alias.route,
    })
    .option(Option.Private, {
      type: "boolean",
      alias: alias.private,
    })
    .option(Option.Join, {
      type: "boolean",
      alias: alias.join,
    })
    .option(Option.Split, {
      type: "boolean",
    })
    .option(Option.Http, {
      type: "boolean",
    })
    .help(false)
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
