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
      description: "Browser profile to use (if applicable)",
      alias: ["p"],
      requireArg: true,
    })
    .option("engine", {
      type: "string",
      description: "Search engine / Website to query",
      alias: ["e", "website", "w"],
      requireArg: true,
    })
    .option("package", {
      type: "boolean",
      description: "Query packages / libraries (if applicable)",
      alias: ["pkg", "library", "lib"],
      default: false,
    })
    .option("incognito", {
      type: "boolean",
      description: "Query in the incognito / private tab",
      alias: ["i", "private"],
      default: false,
    })
    .option("http", {
      type: "boolean",
      description: `Query using the "http" (not secure) protocol`,
      default: false,
    })
    .option("https", {
      type: "boolean",
      description: `Query using the "https" (secure) protocol`,
      alias: ["secure", "s"],
      default: true,
    })
    .help(false)
    .parseSync();
}
