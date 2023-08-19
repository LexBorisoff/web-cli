import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { ConfigOption, configOptions } from "../options";

export default function getConfigArgs() {
  return yargs(hideBin(process.argv))
    .option(ConfigOption.Browsers, {
      type: "boolean",
    })
    .option(ConfigOption.Engines, {
      type: "boolean",
    })
    .option(ConfigOption.Config, {
      type: "boolean",
    })
    .help(false)
    .parseSync();
}

export function withConfigArgs() {
  const configArgs = getConfigArgs();
  return (
    Object.keys(configArgs).filter((arg) => configOptions.includes(arg))
      .length > 0
  );
}
