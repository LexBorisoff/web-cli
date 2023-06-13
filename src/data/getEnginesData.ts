import { fileExists, readFile } from "../helpers/config";
import { EnginesConfig } from "../types/engine.types";

export const engineFallback = "google";

export default function getEnginesData(): EnginesConfig {
  if (!fileExists("engines")) {
    return {};
  }

  const data = readFile("engines");
  return data !== "" ? JSON.parse(data) : {};
}
