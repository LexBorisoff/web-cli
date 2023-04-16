import * as fs from "fs";
import { getConfigFileName } from "./getFileName";

const configFileName = getConfigFileName();

export function configFileExists(): boolean {
  return fs.existsSync(configFileName);
}

export function configFileIsEmpty(): boolean {
  if (!configFileExists()) {
    throw new Error("config file does not exist");
  }

  const data = fs.readFileSync(configFileName, "utf-8");
  if (data === "") {
    return true;
  }

  const config = JSON.parse(data);
  return config instanceof Object ? Object.keys(config).length === 0 : true;
}

export default function hasConfig(): boolean {
  return configFileExists() && !configFileIsEmpty();
}
