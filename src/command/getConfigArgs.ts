import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option("config", {
      type: "boolean",
    })
    .option("force", {
      type: "boolean",
      alias: ["f"],
      default: false,
    })
    .help(false)
    .parseSync();
}
