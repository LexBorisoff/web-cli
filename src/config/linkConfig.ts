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
import { cliPrompts } from "../helpers/prompts";
import { ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { link } = settings;

export default async function linkFile(): Promise<void> {
  const [, ...values] = <Partial<typeof args>>args;
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
  const hasConfigLink = link != null && link !== "";

  let proceed: boolean | undefined =
    force || !hasConfigLink || !fs.existsSync(settingsPath);

  if (hasConfigLink) {
    if (configPath === link) {
      printInfo("This file is already linked");
      emptyLine();
      return;
    }

    if (!force) {
      proceed = await toggle(
        `${chalk.yellowBright(
          "The following config file will be replaced:"
        )}\n  ${link}\n\n  ${chalk.cyan("Proceed?")}`,
        false
      );
      emptyLine();
    }
  }

  if (proceed) {
    const updatedSettings: ConfigSettings = { ...settings, link: configPath };
    fs.writeFileSync(settingsPath, JSON.stringify(updatedSettings));

    print(`${chalk.greenBright("Linked")} ${configPath}`);
    emptyLine();
  }
}
