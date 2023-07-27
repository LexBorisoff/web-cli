import * as fs from "fs";

import chalk from "chalk";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command";
import {
  getSettings,
  getSettingsPath,
  isValidConfigFile,
  isValidResponse,
} from "../helpers/config";
import { print, printInfo, printError, emptyLine } from "../helpers/print";
import { ConfigSettings } from "../types/config.types";
import { Args } from "../types/utility.types";

const { _: args } = getConfigArgs();

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { linkedPath } = settings;

export default async function linkFile(): Promise<void> {
  const [, ...values] = <Args>args;
  const validation = isValidConfigFile(values);

  if (!isValidResponse(validation)) {
    printError(validation.message);
    if (validation.format) {
      printFormat.link();
    }
    emptyLine();
    return;
  }

  const { configPath } = validation;

  if (linkedPath != null && linkedPath !== "" && configPath === linkedPath) {
    printInfo("This file is already linked");
    emptyLine();
    return;
  }

  const updatedSettings: ConfigSettings = {
    ...settings,
    linkedPath: configPath,
  };
  fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings));

  print(`${chalk.greenBright("Linked")} ${configPath}`);
  emptyLine();
}
