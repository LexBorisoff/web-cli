import getConfigData from "./getConfigData";
import { BrowsersConfig } from "../types/config.types";

export default function getBrowsersData(): BrowsersConfig {
  const config = getConfigData();
  const { browsers } = config ?? {};

  if (browsers == null) {
    return [];
  }

  return browsers.sort((a, b) => {
    if (typeof a === "string") {
      if (typeof b === "string") {
        return a.localeCompare(b);
      }

      return a.localeCompare(b.name);
    }

    if (typeof b === "string") {
      return a.name.localeCompare(b);
    }

    return a.name.localeCompare(b.name);
  });
}
