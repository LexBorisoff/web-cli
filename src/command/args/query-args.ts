import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { configFlags } from "../../data/config-flags.js";
import { getVersion } from "../../helpers/version/get-version.js";
import { Option, alias, optionTypes, options } from "../options.js";
import { orArray } from "../../helpers/utils/or-arrray.js";

const version = getVersion();

const args = yargs(hideBin(process.argv))
  .option(Option.Browser, {
    type: optionTypes[Option.Browser],
    alias: alias.browser,
    description: "The browser app to open",
  })
  .option(Option.Profile, {
    type: optionTypes[Option.Profile],
    alias: alias.profile,
    description: "The user profile to open",
  })
  .option(Option.Engine, {
    type: optionTypes[Option.Engine],
    alias: alias.engine,
    description: "The search engine (or website) to query",
  })
  .option(Option.Resource, {
    type: optionTypes[Option.Resource],
    alias: alias.resource,
    description: "The engine's resource to access",
  })
  .option(Option.Port, {
    type: optionTypes[Option.Port],
    alias: alias.port,
    description: "The port number to add to the URL",
  })
  .option(Option.Incognito, {
    type: optionTypes[Option.Incognito],
    alias: alias.incognito,
    description: "Open in incognito / private mode",
  })
  .option(Option.Split, {
    type: optionTypes[Option.Split],
    description: "Split values into separate web queries",
  })
  .option(Option.Http, {
    type: optionTypes[Option.Http],
    description: "Use the HTTP (non-secure) protocol",
  })
  .option(Option.Peek, {
    type: optionTypes[Option.Peek],
    description: "Display the output without opening browser tabs",
  })
  .option(Option.Update, {
    type: optionTypes[Option.Update],
    description: "Update package to the most current version",
  })
  .help()
  .version(version != null ? `Version ${version}` : "Could not get version")
  .boolean(configFlags.filter((flag) => !options.includes(flag)))
  .parseSync();

const arrayArgs = {
  browser: orArray(args.browser),
  profile: orArray(args.profile),
  engine: orArray(args.engine),
  resource: orArray(args.resource),
  port: orArray(args.port),
};

const queryArgs = {
  ...args,
  ...arrayArgs,
};

type QueryArgs = typeof queryArgs;
Object.keys(arrayArgs).forEach((key) => {
  if (args[key] == null) {
    delete queryArgs[key as keyof QueryArgs];
  }
});

export { queryArgs };
