import { hideBin } from "yargs/helpers";
import yargs from "yargs";

import { constructChoices } from "./utils";
import { browsers, engines, defaults } from "../data";

const choices = {
  browsers: constructChoices(browsers),
  engines: constructChoices(engines),
};

export default function getArgs() {
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
