import * as fs from "fs";
import getConfigFileName from "./getConfigFileName";
import { Config } from "../../types/data.types";

const configFileName = getConfigFileName();

export default function writeConfigFile(config: Config): void {
  const json = JSON.stringify(config);
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}
