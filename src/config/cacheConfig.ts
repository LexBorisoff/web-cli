import * as fs from "fs";
import chalk from "chalk";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command";
import {
  getSettingsPath,
  getSettings,
  isValidConfigFile,
  isValidResponse,
} from "../helpers/config";
import {
  print,
  printInfo,
  printSuccess,
  printError,
  emptyLine,
} from "../helpers/print";
import { ConfigData } from "../types/config.types";

const { _: args } = getConfigArgs();
const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { linkedPath } = settings;

function cacheFile(filePath: string) {
  try {
    const json = fs.readFileSync(filePath, { encoding: "utf-8" });
    const config: ConfigData = JSON.parse(json);
    const cache = { ...settings, config };
    fs.writeFileSync(settingsPath, JSON.stringify(cache));

    print(`${chalk.greenBright("Cached")} ${filePath}`);
    emptyLine();
  } catch {
    printError("Cannot access the config file:");
    print(filePath);
    emptyLine();
  }
}

function clearCache() {
  if (settings?.config == null) {
    printInfo("No cache exists");
    emptyLine();
    return;
  }

  delete settings.config;

  fs.writeFileSync(settingsPath, JSON.stringify(settings));
  printSuccess("Cache cleared");
  emptyLine();
}

export default function cacheConfig() {
  const [, ...values] = <Partial<typeof args>>args;
  if (values.length > 1) {
    printError("Invalid number of arguments");
    printFormat.cache();
    emptyLine();
    return;
  }

  if (values.length === 1) {
    // clear cache
    const [arg] = values;
    if (arg === "clear") {
      clearCache();
      return;
    }

    // cache provided file
    const validation = isValidConfigFile(values);
    if (!isValidResponse(validation)) {
      printError(validation.message);
      if (validation.format) {
        printFormat.link();
      }
      emptyLine();
      return;
    }

    cacheFile(validation.configPath);
    return;
  }

  if (linkedPath == null || linkedPath === "") {
    printError("Cannot cache: No config file is linked");
    emptyLine();
    return;
  }

  // cache the linked file
  cacheFile(linkedPath);
}
