import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import chalk from "chalk";
import changeConfig from "../browser_config/change";
import { ConfigCommand, ConfigType } from "../types/setup.types";

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
--- Possible Config Commands ---
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

type CommandBuilderFn = (configYargs: yargs.Argv) => yargs.Argv;
type CommandHandlerFn = () => void;
type ConfigTypeBuilderFn = () => void;

function configDesc(desc: string): string {
  return `${desc} config`;
}

function commandBuilder(command: ConfigCommand): CommandBuilderFn {
  function configTypeBuilder(type: ConfigType): ConfigTypeBuilderFn {
    return function () {
      changeConfig(command, type);
    };
  }

  return function (configYargs) {
    const configTypes: ConfigType[] = ["default", "browser", "profile"];
    configTypes.forEach((type) => {
      configYargs.command(
        type,
        configDesc(`${command} ${type}`),
        configTypeBuilder(type)
      );
    });

    return configYargs;
  };
}

function commandHandler(command: ConfigCommand): CommandHandlerFn {
  return function () {
    changeConfig(command);
  };
}

function constructCommands(configYargs: yargs.Argv, commands: ConfigCommand[]) {
  commands.forEach((command) => {
    configYargs.command(
      command,
      configDesc(command),
      commandBuilder(command),
      commandHandler(command)
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

        // top config commands
        constructCommands(configYargs, ["add", "update", "delete"]);
        return configYargs;
      },
      function handler(argv) {
        if (argv._.length > 1) {
          console.log(chalk.redBright("Config command not valid"));
          return;
        }

        changeConfig();
      }
    )
    .help(false)
    .parseSync();

  return { args, isConfig };
}
