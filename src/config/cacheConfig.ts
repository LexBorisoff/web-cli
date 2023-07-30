import * as fs from "fs";
import chalk from "chalk";
import { printFormat } from "./utils";
import { getConfigArgs } from "../command/args";
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
  printWarning,
  printError,
  emptyLine,
} from "../helpers/print";
import { cliPrompts } from "../helpers/prompts";
import { ConfigData } from "../types/config.types";
import { Args } from "../types/utility.types";

const { _: args, force } = getConfigArgs();
const { toggle } = cliPrompts;

const settingsPath = getSettingsPath();
const settings = getSettings() ?? {};
const { linkedPath } = settings;

const space = 2;

function cacheFile(filePath: string): void {
  try {
    const json = fs.readFileSync(filePath, { encoding: "utf-8" });
    const config: ConfigData = JSON.parse(json);
    const cache = { ...settings, cachedPath: filePath, config };
    fs.writeFileSync(settingsPath, JSON.stringify(cache));

    print(`${chalk.greenBright("Cached")} ${filePath}`);
    emptyLine();
  } catch {
    printError("Cannot access the config file:");
    print(filePath);
    emptyLine();
  }
}

async function exportFile(config: ConfigData, filePath: string): Promise<void> {
  let hasData: boolean | undefined;

  if (fs.existsSync(filePath)) {
    try {
      const json = fs.readFileSync(filePath, { encoding: "utf-8" });
      const configData = JSON.parse(json);
      hasData =
        configData != null &&
        configData !== "" &&
        configData instanceof Object &&
        Object.keys(configData).length > 0;
    } catch {
      hasData = false;
    }
  }

  let proceed: boolean | undefined =
    force || !fs.existsSync(filePath) || !hasData;

  if (!proceed) {
    proceed = await toggle(
      `${chalk.yellowBright(
        "This config file will be overridden:"
      )}\n  ${filePath}\n\n  ${chalk.cyan("Proceed?")}`,
      false
    );
    emptyLine();
  }

  if (proceed) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(config, null, space));
      print(`${chalk.greenBright("Exported to")} ${filePath}`);
      emptyLine();
    } catch {
      printError("Could not write to file");
      emptyLine();
    }
  }
}

function exportCache(filePath?: Args[number]): void {
  if (settings.config == null) {
    printError("No cache exists");
    emptyLine();
    return;
  }

  if (filePath != null) {
    const validation = isValidConfigFile([filePath]);
    if (!isValidResponse(validation)) {
      printError(validation.message);
      if (validation.format) {
        emptyLine();
        printFormat.cache();
      }
      emptyLine();
      return;
    }

    exportFile(settings.config, validation.configPath);
    return;
  }

  if (settings.cachedPath == null) {
    printError("Cached file's original path is unknown");
    printError("Please provide a file path");
    emptyLine();
    return;
  }

  exportFile(settings.config, settings.cachedPath);
}

function clearCache(): void {
  if (settings.config == null) {
    printInfo("No cache exists");
    emptyLine();
    return;
  }

  delete settings.config;
  delete settings.cachedPath;

  fs.writeFileSync(settingsPath, JSON.stringify(settings));
  printSuccess("Cache cleared");
  emptyLine();
}

export default function cacheConfig(): void {
  const [, ...values] = <Args>args;
  const [command] = values;

  if (command === "export" ? values.length > 2 : values.length > 1) {
    printError("Invalid number of arguments");
    emptyLine();
    printFormat.cache();
    emptyLine();
    return;
  }

  // export cache
  if (command === "export") {
    const [, filePath] = values;
    exportCache(filePath);
    return;
  }

  if (values.length === 1) {
    // clear cache
    if (command === "clear") {
      clearCache();
      return;
    }

    // cache provided file
    const validation = isValidConfigFile(values);
    if (!isValidResponse(validation)) {
      printError(validation.message);
      if (validation.format) {
        emptyLine();
        printFormat.cache();
      }
      emptyLine();
      return;
    }

    cacheFile(validation.configPath);
    return;
  }

  if (linkedPath == null || linkedPath === "") {
    printError("No config file is linked");
    emptyLine();
    printWarning("Link a config file before caching");
    printWarning(`or use "--config cache <filename>"`);
    emptyLine();
    return;
  }

  // cache the linked file
  cacheFile(linkedPath);
}
