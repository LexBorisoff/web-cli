import setupConfig from "./setup";
import openConfig from "./open";
import deleteConfig from "./delete";
import changeConfig from "./change";
import getConfigArgs from "../command/getConfigArgs";
import { printBanner } from "../helpers/print";
import {
  FileCommand,
  ChangeCommand,
  fileCommands,
  changeCommands,
} from "../types/config.types";

/**
--config open [app]
--config setup [--force | -f]
--config delete [--force | -f]

--config add browser|profile
--config update browser|profile
--config remove browser|profile
*/

const { _: args } = getConfigArgs();
type CommandArg = (typeof args)[0];

function isValidFileCommand(command: CommandArg): command is FileCommand {
  return (
    typeof command === "string" && (fileCommands as string[]).includes(command)
  );
}

function isValidChangeCommand(command: CommandArg): command is ChangeCommand {
  return (
    typeof command === "string" &&
    (changeCommands as string[]).includes(command)
  );
}

export default function handleConfig(): void {
  if (args.length > 0) {
    const [command] = args;

    if (!isValidFileCommand(command) && !isValidChangeCommand(command)) {
      printBanner(`Invalid command: "${command}"`, "neutral", "error");
      return;
    }

    // file manipulation
    if (isValidFileCommand(command)) {
      switch (command) {
        case FileCommand.open:
          openConfig();
          break;
        case FileCommand.setup:
          setupConfig();
          break;
        case FileCommand.delete:
          deleteConfig();
          break;
      }
      return;
    }

    // changing config
    if (isValidChangeCommand(command)) {
      changeConfig(command);
    }
  }
}
