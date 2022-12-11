import { hideBin } from "yargs/helpers";
import yargs from "yargs";

import { config, engines } from "data";
import { constructChoices, getDefaults } from "helpers";

const defaults = getDefaults();
const choices = {
  browsers: constructChoices(config.browsers),
  engines: constructChoices(engines),
};

export default function () {
  return yargs(hideBin(process.argv))
    .option("browser", {
      type: "string",
      alias: "b",
      requireArg: true,
      // choices: choices.browsers,
      default: defaults.browser,
    })
    .option("profile", {
      type: "string",
      description: "Browser profile",
      alias: "p",
      requireArg: true,
    })
    .option("engine", {
      type: "string",
      description: "Search engine / Website to query",
      alias: ["website", "e", "w"],
      requireArg: true,
      // choices: choices.engines,
      default: defaults.engine,
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
    .option("config", {})
    .help(false)
    .option("help", {
      alias: "h",
    })
    .parseSync();
}
