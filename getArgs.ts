import { hideBin } from "yargs/helpers";
import yargs from "yargs";
import config from "./config.json";
import { constructChoices, getDefaults } from "./helpers";

const defaults = getDefaults();
const choices = {
  browsers: constructChoices(config.browsers),
  engines: constructChoices(config.engines),
};

export default function () {
  return yargs(hideBin(process.argv))
    .option("browser", {
      description: "Browser to open",
      alias: "b",
      requireArg: true,
      // choices: choices.browsers,
      default: defaults.browser,
    })
    .option("profile", {
      description: "Browser profile",
      alias: "p",
      requireArg: true,
    })
    .option("engine", {
      description: "Search engine / Website to query",
      alias: ["website", "e", "w"],
      requireArg: true,
      // choices: choices.engines,
      default: defaults.engine,
    })
    .option("secure", {
      description: "Use https protocol during search",
      alias: ["s", "https"],
      type: "boolean",
      default: true,
    })
    .option("config", {})
    .help(false)
    .parseSync();
}
