import { hideBin } from "yargs/helpers";
import yargs from "yargs";
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

// sq config          -> go through all the steps
// sq config add      -> go through add the steps
// sq config update   -> go through update the steps
// sq config delete   -> go through delete the steps
export function getConfigArgs() {
  let isConfig = false;

  function commandDesc(command: Command) {
    return `${command} config`;
  }

  function commandBuilder(command: Command) {
    function desc(type: ConfigType) {
      return `${command} ${type} config`;
    }

    function getBuilder(type: ConfigType) {
      return function builder() {
        updateConfig(command, type);
      };
    }

    return function (yargs: yargs.Argv) {
      return yargs
        .command("default", desc("default"), getBuilder("default"))
        .command("browser", desc("browser"), getBuilder("browser"))
        .command("profile", desc("profile"), getBuilder("profile"));
    };
  }

  function commandHandler(command: Command) {
    return function handler() {
      updateConfig(command);
    };
  }

  const args = yargs(hideBin(process.argv))
    .command(
      "config",
      "Update the config file",
      function builder(configYargs) {
        isConfig = true;

        return configYargs
          .command(
            "add",
            commandDesc("add"),
            commandBuilder("add"),
            commandHandler("add")
          )
          .command(
            "update",
            commandDesc("update"),
            commandBuilder("update"),
            commandHandler("update")
          )
          .command(
            "delete",
            commandDesc("delete"),
            commandBuilder("delete"),
            commandHandler("delete")
          );
      },
      function handler() {
        updateConfig();
      }
    )
    .help(false)
    .parseSync();

  return { args, isConfig };
}
