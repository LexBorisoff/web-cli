import { hideBin } from "yargs/helpers";
import yargs from "yargs";

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

export function getConfigArgs() {
  let isConfig = false;

  const args = yargs(hideBin(process.argv))
    .command("config", "Update the config file", function builder(yargs) {
      isConfig = true;

      return yargs
        .option("defaults", {
          alias: ["default", "d"],
          type: "boolean",
          default: false,
        })
        .option("browsers", {
          alias: ["browser", "b"],
          type: "boolean",
          default: false,
        })
        .option("profiles", {
          alias: ["profile", "p"],
          type: "boolean",
          default: false,
        });
    })
    .help(false)
    .parseSync();

  return { args, isConfig };
}
