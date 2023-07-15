import setupConfig from "./setup";
import openConfig from "./open";
import deleteConfig from "./delete";
import changeConfig, { isValidChangeCommand } from "./change";
import getConfigArgs from "../command/getConfigArgs";
import { FileCommand, fileCommands } from "../types/config.types";

/**
--config open [app]
--config setup [--force | -f]
--config delete [--force | -f]

--config add browser|profile
--config update browser|profile
--config remove browser|profile
*/

const { _: args } = getConfigArgs();

function isValidFileCommand(command: string): command is FileCommand {
  return (fileCommands as string[]).includes(command);
}

export default function handleConfig() {
  if (args.length > 0) {
    const [command] = args;

    if (typeof command !== "string") {
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
    }
    // changing config
    else if (isValidChangeCommand(command)) {
      changeConfig();
    }
  }
}
