import { fileExists, readFile } from "../helpers/config";
import { EnginesConfig } from "../types/engine.types";

export const engineFallback = "google";

export default function getEnginesData(): EnginesConfig {
  if (!fileExists("engines")) {
    return {};
  }

  const data = readFile("engines");

  try {
    return data != null && data !== "" ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
