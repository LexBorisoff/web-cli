import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export enum Options {
  browser = "browser",
  profile = "profile",
  engine = "engine",
  package = "package",
  incognito = "incognito",
  http = "http",
  https = "https",
  _ = "_",
  $0 = "$0",
}

const alias = {
  browser: ["b"],
  profile: ["p"],
  engine: ["e", "website", "w"],
  package: ["pkg", "library", "lib"],
  incognito: ["i", "private"],
  https: ["secure", "s"],
};

export default function getArgs() {
  return yargs(hideBin(process.argv))
    .option(Options.browser, {
      type: "string",
      description: "Browser to open",
      alias: alias.browser,
      requireArg: true,
    })
    .option(Options.profile, {
      type: "string",
      description: "Browser profile to use (if applicable)",
      alias: alias.profile,
      requireArg: true,
    })
    .option(Options.engine, {
      type: "string",
      description: "Search engine / Website to query",
      alias: alias.engine,
      requireArg: true,
    })
    .option(Options.package, {
      type: "boolean",
      description: "Query packages / libraries (if applicable)",
      alias: alias.package,
      default: false,
    })
    .option(Options.incognito, {
      type: "boolean",
      description: "Query in the incognito / private tab",
      alias: alias.incognito,
      default: false,
    })
    .option(Options.http, {
      type: "boolean",
      description: `Query using the "http" (not secure) protocol`,
      default: false,
    })
    .option(Options.https, {
      type: "boolean",
      description: `Query using the "https" (secure) protocol`,
      alias: alias.https,
      default: true,
    })
    .help(false)
    .parseSync();
}

const options = Object.values(Options) as string[];
const aliases = Object.values(alias).flat();

export { options, aliases };
