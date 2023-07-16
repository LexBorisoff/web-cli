import getConfigData from "./getConfigData";
import { EnginesConfig } from "../types/config.types";

export const engineFallback = "google";

export default function getEnginesData(): EnginesConfig {
  const config = getConfigData();
  return config?.engines ?? {};
}
