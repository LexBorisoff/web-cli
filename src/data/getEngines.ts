import * as fs from "fs";
import * as path from "path";

import { EngineList } from "../types";

export const engineFallback = "google";

export default async function getEnginesData(): Promise<EngineList> {
  const fileName = path.resolve(`${__dirname}/../engines.json`);
  if (fs.existsSync(fileName)) {
    return (await import(fileName)) as EngineList;
  }
  return {} as EngineList;
}
