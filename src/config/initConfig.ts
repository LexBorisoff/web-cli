import open from "open";
import * as fs from "fs";
import * as path from "path";
import { getConfigArgs } from "../command";
import { defaultEngine, defaultEngineConfig } from "../helpers/config/defaults";
import { print, printSuccess, printError, emptyLine } from "../helpers/print";
import { ConfigData } from "../types/config.types";

const { _: args, force } = getConfigArgs();

const defaultConfig: ConfigData = {
  defaults: {
    engine: defaultEngine,
    browser: null,
    profile: {},
  },
  browsers: {},
  engines: defaultEngineConfig,
};

async function isDirectory(directoryPath: string): Promise<true | string> {
  return new Promise((resolve) => {
    if (!fs.existsSync(directoryPath)) {
      resolve("Directory does not exist");
    }

    fs.stat(directoryPath, (error, stats) => {
      if (error) {
        resolve("Could not access the directory");
        return;
      }

      if (!stats.isDirectory()) {
        resolve("Provided path is not a directory");
        return;
      }

      resolve(true);
    });
  });
}

export default async function initConfig() {
  let directoryPath = path.resolve(".");
  const filename = "websearch.json";

  const [, ...values] = args;

  if (values.length > 1) {
    printError("Only 1 directory name is allowed");
    return;
  }

  const directory = values.at(0);

  if (directory != null) {
    directoryPath = path.resolve(`${directory}`);
    const response = await isDirectory(directoryPath);

    if (response !== true) {
      printError(response);
      return;
    }
  }

  const configPath = path.resolve(`${directoryPath}/${filename}`);

  // if config file already exists
  if (fs.existsSync(configPath)) {
    //
  }

  const space = 2;
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, space));

  printSuccess(`Initialzed a config file at:`);
  print(configPath);
  emptyLine();

  // set config settings

  open(configPath);
}
