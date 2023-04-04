import * as fs from "fs";
import { hasConfig, getConfigFileName } from "../helpers/config";
import { Config } from "../types/data.types";

const fileName = getConfigFileName();

export default async function getConfigData(): Promise<Config> {
  if (hasConfig()) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    return JSON.parse(data) as Config;
  }

  return {} as Config;
}
