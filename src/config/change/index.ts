import addConfig from "./add";
import updateConfig from "./update";
import deleteConfig from "./delete";
import defaultConfig from "./default";
import { getConfigArgs } from "../../command";
import { printHeader } from "../../helpers/print";
import {
  ConfigType,
  ChangeCommand,
  ChangeCommandFn,
} from "../../types/config.types";
import { Severity } from "../../types/utility.types";

const { config: isConfig, _: args } = getConfigArgs();
const changeCommands = ["add", "update", "delete", "default"];
const configTypes = ["browser", "profile", "engine"];

function isValidChangeCommand(command: string): command is ChangeCommand {
  return changeCommands.includes(command);
}

function isValidConfigType(configType: string): configType is ConfigType {
  return configTypes.includes(configType);
}

function getChangeCommand(command: string): ChangeCommandFn | undefined {
  if (!isValidChangeCommand(command)) {
    return undefined;
  }

  switch (command) {
    case "add":
      return addConfig;
    case "update":
      return updateConfig;
    case "delete":
      return deleteConfig;
    case "default":
      return defaultConfig;
    default:
      return undefined;
  }
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

    if (args.length >= 0) {
      printHeader("Changing config...");
    }

    // config from the beginning
    if (args.length === 0) {
      console.log("step-by-step config");
      return;
    }

    // using config commands
    if (args.length >= 1) {
      let changeCommand: ChangeCommandFn | undefined = undefined;

      // get the first arg
      const [command] = args;
      let configType: string | undefined = undefined;

      if (typeof command === "string") {
        changeCommand = getChangeCommand(command);

        if (!changeCommand) {
          printHeader(`Invalid command: "${command}"`, "error");
          return;
        }

        // get the second arg, if it was provided
        if (args.length >= 2 && typeof args[1] === "string") {
          configType = args[1];

          if (!isValidConfigType(configType)) {
            printHeader(`Invalid config type: "${configType}"`, "error");
            return;
          }
        }

        success = await changeCommand(configType);
      }

      const message: string = success
        ? "Config is successfully changed!"
        : "Config was not changed";
      const severity: Severity = success ? "success" : "error";
      printHeader(message, severity);
    }
  }
}
