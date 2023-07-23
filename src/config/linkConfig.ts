import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { printFormat } from "./utils";
import getConfigArgs from "../command/getConfigArgs";
import { getSettingsData } from "../data";
import { getSettingsPath } from "../helpers/config";
import {
  print,
  printInfo,
  printSuccess,
  printError,
  emptyLine,
} from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const settings = getSettingsData() || {};
const { link } = settings;

export default async function linkFile(): Promise<void> {
  const [, ...values] = args;

  if (values.length > 1) {
    printError("Invalid number of arguments");
    printFormat.link();
    emptyLine();
    return;
  }

  const configArg = args.at(1);
  if (configArg == null) {
    printError("Filename must be provided");
    printFormat.link();
    emptyLine();
    return;
  }

  if (typeof configArg !== "string" || !configArg.endsWith(".json")) {
    printError("Config must a .json file");
    emptyLine();
    return;
  }

  const configPath = path.resolve(configArg);
  if (!fs.existsSync(configPath)) {
    printError("Could not access the provided config file");
    emptyLine();
    return;
  }

  let proceed: boolean | undefined = force || !fs.existsSync(settingsPath);

  if (link != null) {
    if (configPath === link) {
      printInfo("This file is already linked");
      emptyLine();
      return;
    }

    if (!force) {
      proceed = await toggle(
        `${chalk.italic.yellowBright(
          "The following config file will be replaced:"
        )}\n  ${link}\n\n  ${chalk.cyan("Proceed?")}`,
        false
      );
      emptyLine();
    }
  }

  if (proceed) {
    const updated: ConfigSettings = {
      ...settings,
      link: configPath,
    };
    fs.writeFileSync(settingsPath, JSON.stringify(updated));

    printSuccess(`Linked the config file:`);
    print(configPath);
    emptyLine();
    printFormat.open();
    emptyLine();
  }
}
