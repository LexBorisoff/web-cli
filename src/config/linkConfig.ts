import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command";
import { getSettings, getSettingsPath } from "../helpers/config";
import { print, printInfo, printError, emptyLine } from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigSettings } from "../types/config.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { link: configLink } = settings;

export default async function linkFile(): Promise<void> {
  const [, ...values] = args;

  if (values.length > 1) {
    printError("Invalid number of arguments");
    printFormat.link();
    emptyLine();
    return;
  }

  const [, configArg] = <Partial<typeof args>>args;
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

  const hasConfigLink = configLink != null && configLink !== "";

  let proceed: boolean | undefined =
    force || !hasConfigLink || !fs.existsSync(settingsPath);

  if (hasConfigLink) {
    if (configPath === configLink) {
      printInfo("This file is already linked");
      emptyLine();
      return;
    }

    if (!force) {
      proceed = await toggle(
        `${chalk.yellowBright(
          "The following config file will be replaced:"
        )}\n  ${configLink}\n\n  ${chalk.cyan("Proceed?")}`,
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
