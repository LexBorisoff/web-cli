import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Options, alias } from "./getArgs";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option(Options.config, {
      type: "boolean",
    })
    .option(Options.force, {
      type: "boolean",
      alias: alias.force,
      default: false,
    })
    .help(false)
    .parseSync();
}
