import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ConfigOption, configAlias } from "../options";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option(ConfigOption.Config, {
      type: "boolean",
    })
    .option(ConfigOption.Force, {
      type: "boolean",
      alias: configAlias.force,
      default: false,
    })
    .help(false)
    .parseSync();
}
