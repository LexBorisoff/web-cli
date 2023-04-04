import addConfig from "./add";
import updateConfig from "./update";
import deleteConfig from "./delete";
import { getConfigArgs } from "../../command";
import printTitle from "../../helpers/printTitle";
import emptyLine from "../../helpers/emptyLine";
import {
  ConfigType,
  ChangeCommand,
  ChangeCommandFn,
} from "../../types/setup.types";
import { Severity } from "../../types/utility.types";

const { config: isConfig, _: args } = getConfigArgs();
const changeCommands = ["add", "update", "delete"];
const configTypes = ["default", "browser", "profile"];

function isValidChangeCommand(command: string): command is ChangeCommand {
  return changeCommands.includes(command);
}

function isValidConfigType(configType: string): configType is ConfigType {
  return configTypes.includes(configType);
}

function printHeader() {
  emptyLine();
  printTitle("Changing config...", "info");
  emptyLine();
}

function printFooter(message: string, severity: Severity) {
  emptyLine();
  printTitle(message, severity);
  emptyLine();
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
  }
}

/*
--- Possible Config Change Commands ---
sq --config

sq --config add
sq --config add default
sq --config add browser
sq --config add profile

sq --config update
sq --config update default
sq --config update browser
sq --config update profile

sq --config delete
sq --config delete default
sq --config delete browser
sq --config delete profile
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
    if (args.length >= 1) {
      let changeCommand: ChangeCommandFn | undefined = undefined;

      // get the first arg
      const [command] = args;
      let configType: string | undefined = undefined;

      if (typeof command === "string") {
        changeCommand = getChangeCommand(command);

        if (!changeCommand) {
          printFooter(`Invalid command: "${command}"`, "error");
          return;
        }

        // get the second arg, if it was provided
        if (args.length >= 2 && typeof args[1] === "string") {
          configType = args[1];

          if (!isValidConfigType(configType)) {
            printFooter(`Invalid config type: "${configType}"`, "error");
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
      printFooter(message, severity);
    }
  }
}
