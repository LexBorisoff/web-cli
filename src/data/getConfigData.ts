import * as fs from "fs";
import hasConfig from "../helpers/hasConfig";
import getConfigFileName from "../helpers/getConfigFileName";
import { Config } from "../types/config.types";

const fileName = getConfigFileName();

export default async function getConfigData(): Promise<Config> {
  if (hasConfig()) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    return JSON.parse(data) as Config;
  }

  return {} as Config;
}
