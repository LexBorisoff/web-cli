import * as fs from "fs";
import { getConfigFileName, getEnginesFileName } from "./getFileName";
import { Config } from "../../../types/data.types";
import { EnginesConfig } from "../../../types/engines.types";

const configFileName = getConfigFileName();
const enginesFileName = getEnginesFileName();

export function writeConfigFile(config: Config): void {
  const json = JSON.stringify(config);
  fs.writeFile(configFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}

export function writeEnginesFile(engines: EnginesConfig): void {
  const json = JSON.stringify(engines);
  fs.writeFile(enginesFileName, json, (error) => {
    if (error != null) {
      throw error;
    }
  });
}
