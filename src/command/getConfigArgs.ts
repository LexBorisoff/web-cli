import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ConfigOptions, configAlias } from "./options";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option(ConfigOptions.config, {
      type: "boolean",
    })
    .option(ConfigOptions.force, {
      type: "boolean",
      alias: configAlias.force,
      default: false,
    })
    .help(false)
    .parseSync();
}
