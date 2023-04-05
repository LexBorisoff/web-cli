import * as fs from "fs";
import * as path from "path";
import { EngineList } from "../types/engines.types";

export const engineFallback = "google";

export default async function getEnginesData(): Promise<EngineList> {
  let enginesData: EngineList = {};
  const fileName = path.resolve(`${__dirname}/../engines.json`);
  if (fs.existsSync(fileName)) {
    const data = fs.readFileSync(fileName, { encoding: "utf-8" });
    enginesData = JSON.parse(data);
  }
  return enginesData;
}
