import * as fs from "fs";
import { getConfigFileName } from "./getFileName";

const configFileName = getConfigFileName();

export function configFileExists(): boolean {
  return fs.existsSync(configFileName);
}

export function hasConfig(): boolean {
  if (!configFileExists()) {
    return false;
  }

  const data = fs.readFileSync(configFileName, "utf-8");
  if (data === "") {
    return false;
  }

  const config = JSON.parse(data);
  return config instanceof Object ? Object.keys(config).length > 0 : false;
}
