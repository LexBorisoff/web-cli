import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option("config", {
      type: "boolean",
    })
    .help(false)
    .parseSync();
}
