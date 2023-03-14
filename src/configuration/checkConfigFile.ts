import * as fs from "fs";
import getConfigFileName from "./getConfigFileName";
import { Config } from "../types";

const configFileName = getConfigFileName();

export function configFileExists(): boolean {
  return fs.existsSync(configFileName);
}

export function configFileIsEmpty(): boolean {
  if (!configFileExists()) {
    throw new Error("config file does not exist");
  }

  const json = fs.readFileSync(configFileName, "utf-8");
  const config: Config = JSON.parse(json);
  return Object.keys(config).length <= 0;
}
