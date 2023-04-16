import { hasEngines, readEnginesFile, fetchEngines } from "../helpers/config";
import { printInfo, printError } from "../helpers/print";
import { EnginesConfig } from "../types/engines.types";

export const engineFallback = "google";

export default async function getEnginesData(): Promise<EnginesConfig> {
  if (hasEngines()) {
    const data = readEnginesFile();
    return JSON.parse(data);
  }

  try {
    printInfo("Fetching engines config...");
    const engines = await fetchEngines();
    return engines;
  } catch {
    printError("An error occurred when fetching an engines list :(");
    return {};
  }
}
