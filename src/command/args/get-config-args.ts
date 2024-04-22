import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ConfigOption } from "../options.js";

export function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option(ConfigOption.Config, {
      type: "boolean",
    })
    .help(false)
    .parseSync();
}
