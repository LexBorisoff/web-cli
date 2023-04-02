import * as fs from "fs";
import {
  configFileExists,
  configFileIsEmpty,
} from "../../helpers/checkConfigFile";
import getConfigFileName from "../../helpers/getConfigFileName";
import printTitle from "../../helpers/printTitle";
import emptyLine from "../../helpers/emptyLine";
import { Config } from "../../types/config.types";

const configFileName = getConfigFileName();

export default function createConfigFile(config: Config = {}): void {
  if (configFileExists() && !configFileIsEmpty()) {
    printTitle("Config already exists");
    return;
  }

  const json = JSON.stringify(config);

  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }

    printTitle("You are good to go. Have fun!", "success");
    emptyLine();
  });
}
