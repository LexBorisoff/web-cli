import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
import getBrowsers from "./getBrowsers";

const print = console.log;

function createConfigFile(): void {
  const fileName = path.resolve(`${__dirname}/../config.json`);

  if (!fs.existsSync(fileName)) {
    const json = JSON.stringify({});

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

export default function setupConfig() {
  print(chalk.yellow.bold("setting up config..."));

  getBrowsers();
}
