import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";
import { printFormat } from "./utils";
import getConfigArgs from "../command/getConfigArgs";
import {
  print,
  printInfo,
  printSuccess,
  printError,
  emptyLine,
} from "../helpers/print";
import { getSettings, getSettingsPath } from "../helpers/config";
import { cliPrompts } from "../helpers/prompts";
import { ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

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
    printError("Filename does not exist");
    emptyLine();
    return;
  }

  const settingsPath = getSettingsPath();
  const settings = getSettings();
  let proceed: boolean | undefined = force || !fs.existsSync(settingsPath);

  if (settings.path != null) {
    if (configPath === settings.path) {
      printInfo("This file is already linked");
      emptyLine();
      return;
    }

    if (!force) {
      proceed = await toggle(
        `${chalk.italic.yellowBright(
          "The following config file will be replaced:"
        )}\n  ${settings.path}\n\n  ${chalk.cyan("Proceed?")}`,
        false
      );
      emptyLine();
    }
  }

  if (proceed) {
    const updated: ConfigSettings = {
      ...settings,
      path: configPath,
    };
    fs.writeFileSync(settingsPath, JSON.stringify(updated));

    printSuccess(`Linked the config file:`);
    print(configPath);
    emptyLine();
    printFormat.open();
    emptyLine();
  }
}
