import * as fs from "fs";
import { hasConfig, getConfigFileName } from "../../helpers/config";
import { printHeader } from "../../helpers/print";
import { Config } from "../../types/data.types";

const configFileName = getConfigFileName();

export default function createConfigFile(config: Config = {}): void {
  if (hasConfig()) {
    printHeader("Config already exists");
    return;
  }

  const json = JSON.stringify(config);

  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}
