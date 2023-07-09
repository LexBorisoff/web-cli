import addConfig from "./add";
import updateConfig from "./update";
import deleteConfig from "./delete";
import defaultConfig from "./default";
import { getConfigArgs } from "../../command";
import { printBanner } from "../../helpers/print";
import {
  changeCommands,
  configTypes,
  ChangeCommand,
  ConfigType,
  ChangeCommandFn,
} from "../../types/config.types";
import { Severity } from "../../types/utility.types";

const { config: isConfig, _: args } = getConfigArgs();

function isValidChangeCommand(command: string): command is ChangeCommand {
  return (changeCommands as string[]).includes(command);
}

function isValidConfigType(configType: string): configType is ConfigType {
  return (configTypes as string[]).includes(configType);
}

function getChangeCommand(command: string): ChangeCommandFn | undefined {
  if (!isValidChangeCommand(command)) {
    return undefined;
  }

  switch (command) {
    case ChangeCommand.add:
      return addConfig;
    case ChangeCommand.update:
      return updateConfig;
    case ChangeCommand.delete:
      return deleteConfig;
    case ChangeCommand.default:
      return defaultConfig;
    default:
      return undefined;
  }
}

function printHeader() {
  printBanner("Changing config...", "header", "info");
}

/*
--- Possible Config Change Commands ---
sq --config

sq --config add
sq --config add browser
sq --config add profile
sq --config add engine

sq --config update
sq --config update browser
sq --config update profile
sq --config update engine

sq --config delete
sq --config delete browser
sq --config delete profile
sq --config delete engine

sq --config default
sq --config default profile
sq --config default browser
sq --config default engine
 */

export default async function changeConfig(): Promise<void> {
  if (isConfig) {
    let success = false;

    // config from the beginning
    if (args.length === 0) {
      printHeader();
      console.log("step-by-step config");
      return;
    }

    // using config commands
    let changeCommand: ChangeCommandFn | undefined = undefined;

    // get the first arg
    const [command] = args;
    let configType: string | undefined = undefined;

    if (typeof command === "string") {
      changeCommand = getChangeCommand(command);

      if (!changeCommand) {
        printBanner(`Invalid command: "${command}"`, "neutral", "error");
        return;
      }

      // get the second arg, if it was provided
      if (args.length >= 2 && typeof args[1] === "string") {
        configType = args[1];

        if (!isValidConfigType(configType)) {
          printBanner(
            `Invalid config type: "${configType}"`,
            "neutral",
            "error"
          );
          return;
        }
      }

      printHeader();
      success = await changeCommand(configType);
    }

    const message: string = success
      ? "Config is successfully changed!"
      : "Config was not changed";
    const severity: Severity = success ? "success" : "error";
    printBanner(message, "footer", severity);
  }
}
