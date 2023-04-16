import { readEnginesFile } from "../helpers/config";
import { EnginesConfig } from "../types/engines.types";

export const engineFallback = "google";

export default async function getEnginesData(): Promise<EnginesConfig> {
  const data = readEnginesFile();
  return JSON.parse(data);
}
