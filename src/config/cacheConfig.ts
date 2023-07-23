import * as fs from "fs";
import { printFormat } from "./utils";
import getConfigArgs from "../command/getConfigArgs";
import { getSettings, getSettingsPath } from "../helpers/config";
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
const { link } = settings;

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
  const [, ...values] = args;
  if (values.length > 1) {
    printError("Invalid number of arguments");
    printFormat.cache();
    emptyLine();
    return;
  }

  if (values.length === 1) {
    const arg = values.at(0);
    if (arg !== "clear") {
      printError("Invalid argument");
      printFormat.cache();
      emptyLine();
      return;
    }

    clearCache();
    return;
  }

  let configPath: string | undefined;

  try {
    if (link != null && link !== "") {
      configPath = link;
    }
  } catch {
    printError("Something went wrong :(");
    emptyLine();
    return;
  }

  if (configPath == null) {
    printError("Cannot cache: No config file is linked");
    emptyLine();
    return;
  }

  try {
    const json = fs.readFileSync(configPath, { encoding: "utf-8" });
    const config: ConfigData = JSON.parse(json);
    const cache = { ...settings, config };

    fs.writeFileSync(settingsPath, JSON.stringify(cache));

    printSuccess("Cached the config file:");
    print(configPath);
    emptyLine();
  } catch {
    printError("Cannot access the linked config file:");
    print(configPath);
    emptyLine();
    return;
  }
}
