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
    .option("website", {
      type: "string",
      description: "Search engine / Website to query",
      alias: ["w", "engine", "e"],
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
      description: `Query using the "http" protocol`,
      default: false,
    })
    .option("https", {
      type: "boolean",
      description: `Query using the secure "https" protocol (default)`,
      alias: ["secure", "s"],
      default: true,
    })
    .option("lookup", {
      type: "boolean",
      description: "Look up the website(s) instead of visiting directly",
      default: false,
      alias: ["l"],
    })
    .help(false)
    .parseSync();
}
