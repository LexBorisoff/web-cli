import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import { Config } from "../types";
import getBrowserList from "./getBrowserList";
import getDefaultBrowser from "./getDefaultBrowser";

const print = console.log;

function createConfigFile(config: Config = {}): void {
  const fileName = path.resolve(`${__dirname}/../config.json`);

  if (!fs.existsSync(fileName)) {
    const json = JSON.stringify(config);

    print(chalk.yellow.bold("creating config file..."));
    fs.writeFile(fileName, json, (error) => {
      if (error != null) {
        throw error;
      }
    });

    return;
  }

  print(chalk.red.bold("config file already exists"));
}

export default async function setupConfig(): Promise<void> {
  print(chalk.yellow.bold("setting up config..."));

  const browsers = await getBrowserList();

  if (browsers.length > 0) {
    const defaultBrowser = await getDefaultBrowser(browsers);
    console.log(defaultBrowser);
  }
}
