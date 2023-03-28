import * as fs from "fs";
import * as path from "path";
import { Config } from "../types";

export default async function getConfigData(): Promise<Config> {
  const fileName = path.resolve(`${__dirname}/../config.json`);
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    return JSON.parse(data) as Config;
  }
  return {} as Config;
}
