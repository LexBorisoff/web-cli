import * as fs from "fs";
import * as path from "path";
import { Config } from "../types";

export default async function getConfig(): Promise<Config> {
  const fileName = path.resolve(`${__dirname}/../config.json`);
  if (fs.existsSync(fileName)) {
    return (await import(fileName)) as Config;
  }
  return {} as Config;
}
