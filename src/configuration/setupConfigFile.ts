import * as fs from "fs";
import printTitle from "./printTitle";
import getConfigFileName from "./getConfigFileName";
import getBrowsersConfig from "./getBrowsersConfig";
import { configFileExists, configFileIsEmpty } from "./checkConfigFile";
import { emptyLine } from "../helpers";
import { Config } from "../types";

const configFileName = getConfigFileName();

function createConfigFile(config: Config = {}): void {
  if (configFileExists() && !configFileIsEmpty()) {
    printTitle("Config already exists");
    return;
  }

  const json = JSON.stringify(config);

  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    printTitle("You are good to go. Have fun!");
    emptyLine();
  });
}

export default async function setupConfigFile(): Promise<void> {
  printTitle("Let's set up browser config");
  emptyLine();

  const browsersConfig = await getBrowsersConfig();
  if (browsersConfig != null) {
    emptyLine();

    const { browsers, defaultBrowser } = browsersConfig;

    try {
      createConfigFile({
        defaults: {
          browser: defaultBrowser,
        },
        browsers,
      });
    } catch (error) {
      console.error(
        "An error occurred while trying to create the config file."
      );
    }
  } else {
    printTitle("You didn't add any browsers:( Try again...");
    emptyLine();
  }
}
