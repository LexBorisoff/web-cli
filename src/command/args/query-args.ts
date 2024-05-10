import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { matchers } from "@lexjs/web-search/matchers";
import { getPackageJson } from "../../helpers/project/get-package-json.js";
import { configFlags } from "../../data/config-flags.js";
import { orArray } from "../../helpers/utils/or-arrray.js";
import {
  QueryOptions as Options,
  queryAlias as alias,
  queryOptions as options,
  queryOptionTypes as types,
} from "../options.js";

const version = getPackageJson().version!;

const args = yargs(hideBin(process.argv))
  .option(Options.Browser, {
    type: types[Options.Browser],
    alias: alias.browser,
    description: "The browser app to open",
  })
  .option(Options.Profile, {
    type: types[Options.Profile],
    alias: alias.profile,
    description: "The browser profile to open",
  })
  .option(Options.Engine, {
    type: types[Options.Engine],
    alias: alias.engine,
    description: "The search engine (or website) to query",
  })
  .option(Options.Search, {
    type: types[Options.Search],
    alias: alias.search,
    description: "The engine's search path to use for querying",
  })
  .option(Options.Resource, {
    type: types[Options.Resource],
    alias: alias.resource,
    description: "The engine's resource to access",
  })
  .option(Options.Port, {
    type: types[Options.Port],
    alias: alias.port,
    description: "The port number to add to the URL",
  })
  .option(Options.Incognito, {
    type: types[Options.Incognito],
    alias: alias.incognito,
    description: "Open in incognito / private mode",
  })
  .option(Options.Split, {
    type: types[Options.Split],
    description: "Create a separate web query for each value argument",
  })
  .option(Options.Http, {
    type: types[Options.Http],
    description: "Use the HTTP (non-secure) protocol",
  })
  .option(Options.Test, {
    type: types[Options.Test],
    alias: alias.test,
    description: "Display the output without opening browser tabs",
  })
  .option(Options.Update, {
    type: types[Options.Update],
    description: "Update package to the most current version",
  })
  .help()
  .version(version)
  .boolean(configFlags.filter((flag) => !options.includes(flag)))
  .parseSync();

const arrayArgs = {
  browser: orArray(args.browser),
  profile: orArray(args.profile),
  engine: orArray(args.engine),
  query: orArray(args.query),
  resource: orArray(args.resource),
  prefix: orArray(args.prefix),
  port: orArray(args.port),
};

const _ = args._.map((arg) => `${arg}`);

const urlsOnly: boolean =
  _.length > 0 && _.every((arg) => matchers.url.test(arg));

/**
 * Is populated only if all value args are URLs
 */
const urlArgs = urlsOnly ? _ : undefined;

const queryArgs = {
  ...args,
  ...arrayArgs,
  _,
};

// delete undefined properties created in arrayArgs
type QueryArgs = typeof queryArgs;
Object.keys(arrayArgs).forEach((key) => {
  if (args[key] == null) {
    delete queryArgs[key as keyof QueryArgs];
  }
});

export { queryArgs, urlArgs };
