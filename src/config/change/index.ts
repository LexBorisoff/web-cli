import addConfig from "./add";
import updateConfig from "./update";
import removeConfig from "./remove";
import defaultConfig from "./default";
import { getConfigArgs } from "../../command";
import { printBanner } from "../../helpers/print";
import {
  configTypes,
  ChangeCommand,
  ConfigType,
  ChangeCommandFn,
} from "../../types/config.types";
import { Severity } from "../../types/utility.types";

const { _: args } = getConfigArgs();
type CommandArg = (typeof args)[0];

function isValidConfigType(configType: CommandArg): configType is ConfigType {
  return (
    typeof configType === "string" &&
    (configTypes as string[]).includes(configType)
  );
}

function getChangeCommand(command: ChangeCommand): ChangeCommandFn {
  switch (command) {
    case ChangeCommand.add:
      return addConfig;
    case ChangeCommand.update:
      return updateConfig;
    case ChangeCommand.remove:
      return removeConfig;
    default:
      return defaultConfig;
  }
}

function printHeader() {
  printBanner("Changing config...", "header", "info");
}

/*
--- Possible Change Config Commands ---

--config

--config add
--config add browser
--config add profile

--config update
--config update browser
--config update profile

--config remove
--config remove browser
--config remove profile

--config default
--config default profile
--config default browser

*/

export default async function changeConfig(
  command: ChangeCommand
): Promise<void> {
  let success = false;

  if (args.length > 2) {
    printBanner("Invalid number of arguments", "neutral", "error");
    return;
  }

  // get the second arg, if it was provided
  const configType = args.at(1);
  if (configType != null && !isValidConfigType(configType)) {
    printBanner(`Invalid config type: "${configType}"`, "neutral", "error");
    return;
  }

  printHeader();

  const changeCommand = getChangeCommand(command);
  success = await changeCommand(configType);

  const message: string = success
    ? "Great Success!"
    : "Config was not changed.";
  const severity: Severity = success ? "success" : "error";
  printBanner(message, "footer", severity);
}
