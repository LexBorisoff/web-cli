import * as fs from "fs";
import chalk from "chalk";
import { getSettings, getSettingsPath } from "../helpers/config";
import { print, printInfo, emptyLine } from "../helpers/print";

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { linkedPath } = settings;

export default function unlinkConfig(): void {
  if (linkedPath == null) {
    printInfo("No config file is linked");
    emptyLine();
    return;
  }

  if (fs.existsSync(linkedPath)) {
    delete settings.linkedPath;
    fs.writeFileSync(settingsPath, JSON.stringify(settings));
  }

  print(`${chalk.greenBright("Unlinked")} ${linkedPath}`);
  emptyLine();
}
