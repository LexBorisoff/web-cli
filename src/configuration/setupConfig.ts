import * as fs from "fs";
import chalk from "chalk";
import getConfigFileName from "./getConfigFileName";
import getBrowserList from "./getBrowserList";
import getDefaultBrowser from "./getDefaultBrowser";
import setupBrowsersConfig from "./setupBrowsersConfig";
import { configFileExists, configFileIsEmpty } from "./checkConfigFile";
import { Config } from "../types";

const print = console.log;

const configFileName = getConfigFileName();

function createConfigFile(config: Config = {}): void {
  console.log("config", config);
  if (configFileExists() && !configFileIsEmpty()) {
    print(chalk.red.bold("config file already exists"));
    return;
  }

  const json = JSON.stringify(config);

  print(chalk.yellow.bold("creating config file..."));
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}

export default async function setupConfig(): Promise<void> {
  print(chalk.yellow.bold("setting up config..."));

  const browserList = await getBrowserList();

  if (browserList.length > 0) {
    // 1) default browser
    const defaultBrowser = await getDefaultBrowser(browserList);

    if (defaultBrowser != null) {
      // 2) browsers config
      const browsers = await setupBrowsersConfig(browserList);

      try {
        createConfigFile({
          browsers,
          defaults: {
            browser: defaultBrowser,
          },
        });
      } catch (error) {
        console.error(
          "An error occurred while trying to create the config file."
        );
      }
    }
  }
}
