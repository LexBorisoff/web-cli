import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { Option, alias, options } from "../options";
import { configFlags } from "../../data";

export default function getQueryArgs() {
  return yargs(hideBin(process.argv))
    .option(Option.Open, {
      type: "string",
      description: "Browser app to open",
      alias: alias.open,
      requireArg: true,
    })
    .option(Option.Profile, {
      type: "string",
      description: "Browser profile to use",
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
      description: "Access packages / libraries instead of querying",
      alias: alias.package,
    })
    .option(Option.Route, {
      type: "boolean",
      description: "Access engine routes directly instead of querying",
      alias: alias.route,
    })
    .option(Option.Private, {
      type: "boolean",
      description: "Use private / incognito mode",
      alias: alias.private,
    })
    .option(Option.Http, {
      type: "boolean",
      description: `Use the HTTP (non-secure) protocol`,
    })
    .option(Option.Query, {
      type: "boolean",
      description: `Query provided URLs as search values`,
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
