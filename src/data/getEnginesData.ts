import * as fs from "fs";
import * as path from "path";
import { EngineList } from "../types/engines.types";

export const engineFallback = "google";

export default async function getEnginesData(): Promise<EngineList> {
  const fileName = path.resolve(`${__dirname}/../engines.json`);
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    return JSON.parse(data) as EngineList;
  }
  return {} as EngineList;
}
