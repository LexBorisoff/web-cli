import * as fs from "fs";
import { hasConfig, getConfigFileName } from "../helpers/config";
import { Config } from "../types/data.types";

const fileName = getConfigFileName();

export default async function getConfigData(): Promise<Config> {
  let config: Config = {};
  if (hasConfig()) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    config = JSON.parse(data);
  }
  return config;
}
