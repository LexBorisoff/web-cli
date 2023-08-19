import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options";
import { configFlags } from "../../data";

export default function getArgs() {
  return yargs(hideBin(process.argv))
    .option(Option.Browser, {
      type: "string",
      description: "Browser to open",
      alias: alias.browser,
      requireArg: true,
    })
    .option(Option.Profile, {
      type: "string",
      description: "Browser profile to use (if applicable)",
      alias: alias.profile,
      requireArg: true,
    })
    .option(Option.Search, {
      type: "string",
      description: "Search the provided engine / website",
      alias: alias.search,
      requireArg: true,
    })
    .option(Option.Package, {
      type: "boolean",
      description: "Query packages / libraries (if applicable)",
      alias: alias.package,
    })
    .option(Option.Incognito, {
      type: "boolean",
      description: "Use incognito / private tab",
      alias: alias.incognito,
    })
    .option(Option.Http, {
      type: "boolean",
      description: `Use the "http" protocol (not secure)`,
    })
    .option(Option.Query, {
      type: "boolean",
      description: `Query only without visiting the provided URL(s)`,
      alias: alias.query,
    })
    .option(Option.Split, {
      type: "boolean",
      description: `Split each value into a separate search query`,
    })
    .help(false)
    .boolean(configFlags.filter((flag) => !options.includes(flag)))
    .parseSync();
}
