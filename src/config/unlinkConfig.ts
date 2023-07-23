import * as fs from "fs";
import chalk from "chalk";
import { getSettings, getSettingsPath } from "../helpers/config";
import { print, printInfo, emptyLine } from "../helpers/print";

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const configLink = settings?.link;

export default function unlinkConfig() {
  if (configLink == null) {
    printInfo("There is no linked config file");
    emptyLine();
    return;
  }

  if (fs.existsSync(configLink)) {
    delete settings.link;
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  }

  print(`${chalk.greenBright("Unlinked")} ${configLink}`);
  emptyLine();
}
