import chalk from "chalk";
import setupConfig from "./setup";
import openConfig from "./openConfig";
import deleteConfig from "./deleteConfig";
import changeConfig, { isValidChangeCommand } from "./change";
import getConfigArgs from "../command/getConfigArgs";
import fileExists from "../helpers/config/file/fileExists";
import { cliPrompts } from "../helpers/prompts";
import { printError } from "../helpers/print";
import { FileCommand, fileCommands } from "../types/config.types";

/**

--config open [app]
--config setup [--force | -f]
--config delete [--force | -f]

--config add browser|profile
--config update browser|profile
--config remove browser|profile

*/

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

function isValidFileCommand(command: string): command is FileCommand {
  return (fileCommands as string[]).includes(command);
}

export default async function handleConfig() {
  if (args.length > 0) {
    const [command] = args;

    if (typeof command === "string") {
      // file manipulation
      if (isValidFileCommand(command)) {
        // open
        if (command === FileCommand.open) {
          openConfig();
        }

        // setup
        if (command === FileCommand.setup) {
          let continueToSetup = !fileExists("config") || force;
          if (!continueToSetup) {
            continueToSetup = await toggle(
              `${chalk.yellow(
                "This will override the existing config file."
              )} Continue?\n`,
              false
            );
          }

          if (continueToSetup) {
            setupConfig();
          }
        }

        if (command === FileCommand.delete) {
          if (fileExists("config")) {
            let continueToDelete = force;
            if (!continueToDelete) {
              continueToDelete = await toggle(
                `${chalk.yellow(
                  "Are you sure you want to delete the config file?\n"
                )}`,
                false
              );
            }

            if (continueToDelete) {
              deleteConfig();
            }
          } else {
            printError("There is no config file to delete");
          }
        }

        return;
      }

      // changing config
      if (isValidChangeCommand(command)) {
        changeConfig();
      }
    }
  }
}
