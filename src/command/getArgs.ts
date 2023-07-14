import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export default function getArgs() {
  return yargs(hideBin(process.argv))
    .option("browser", {
      type: "string",
      description: "Browser to open",
      alias: ["b"],
      requireArg: true,
    })
    .option("profile", {
      type: "string",
      description: "Browser profile to use",
      alias: ["p"],
      requireArg: true,
    })
    .option("engine", {
      type: "string",
      description: "Search engine / website to query",
      alias: ["e", "website", "w"],
      requireArg: true,
    })
    .option("package", {
      type: "boolean",
      description: "Search packages / libraries on websites that have them",
      alias: ["pkg", "library", "lib"],
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
