import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { updateConfig } from "../configuration";
import { Command, ConfigType } from "../types/configuration";

export default function getArgs() {
  return yargs(hideBin(process.argv))
    .option("browser", {
      type: "string",
      alias: "b",
      requireArg: true,
    })
    .option("profile", {
      type: "string",
      description: "Browser profile",
      alias: "p",
      requireArg: true,
    })
    .option("engine", {
      type: "string",
      description: "Search engine / website to query",
      alias: ["website", "e", "w"],
      requireArg: true,
    })
    .option("package", {
      type: "boolean",
      description: "Search packages / libraries on websites that have them",
      alias: ["pack", "pkg", "library", "lib"],
      default: false,
    })
    .option("incognito", {
      type: "boolean",
      alias: ["i", "private"],
      default: false,
    })
    .option("secure", {
      type: "boolean",
      description: "Use https protocol during search",
      alias: ["s", "https"],
      default: true,
    })
    .help(false)
    .parseSync();
}

/*
--- Possible Config Command Combos ---
sq config

sq config add
sq config add default
sq config add browser
sq config add profile

sq config update
sq config update default
sq config update browser
sq config update profile

sq config delete
sq config delete default
sq config delete browser
sq config delete profile
 */

function commandDesc(command: Command): string {
  return `${command} config`;
}

type CommandBuilderFn = (configYargs: yargs.Argv) => yargs.Argv;
type CommandHandlerFn = () => void;
type ConfigTypeBuilderFn = () => void;

function getCommandBuilder(command: Command): CommandBuilderFn {
  function getConfigTypeDesc(type: ConfigType): string {
    return `${command} ${type} config`;
  }

  function getConfigTypeBuilder(type: ConfigType): ConfigTypeBuilderFn {
    return function () {
      updateConfig(command, type);
    };
  }

  return function (configYargs: yargs.Argv) {
    const configTypes: ConfigType[] = ["default", "browser", "profile"];
    configTypes.forEach((type) => {
      configYargs.command(
        type,
        getConfigTypeDesc(type),
        getConfigTypeBuilder(type)
      );
    });
    return configYargs;
  };
}

function getCommandHandler(command: Command): CommandHandlerFn {
  return function () {
    updateConfig(command);
  };
}

function constructConfigCommands(configYargs: yargs.Argv, commands: Command[]) {
  commands.forEach((command) => {
    configYargs.command(
      command,
      commandDesc(command),
      getCommandBuilder(command),
      getCommandHandler(command)
    );
  });
}

export function getConfigArgs() {
  let isConfig = false;

  const args = yargs(hideBin(process.argv))
    .command(
      "config",
      "Update the config file",
      function builder(configYargs) {
        isConfig = true;
        constructConfigCommands(configYargs, ["add", "update", "delete"]);
        return configYargs;
      },
      function handler() {
        updateConfig();
      }
    )
    .help(false)
    .parseSync();

  return { args, isConfig };
}
