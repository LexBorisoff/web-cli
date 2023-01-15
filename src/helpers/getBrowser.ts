import open from "open";
import { Browser } from "../types";
import { browsers } from "../data";

export function getBrowserAppName(browserName: string) {
  switch (browserName) {
    case "chrome":
      return open.apps.chrome;
    case "firefox":
      return open.apps.firefox;
    case "edge":
      return open.apps.edge;
    default:
      return browserName;
  }
}

export default function getBrowser(
  browserNameOrAlias: string
): Browser | undefined {
  return browsers.find((browserFromConfig) => {
    if (typeof browserFromConfig === "string") {
      return browserFromConfig === browserNameOrAlias;
    }

    return (
      browserFromConfig.name === browserNameOrAlias ||
      (typeof browserFromConfig?.alias === "string" &&
        browserFromConfig.alias === browserNameOrAlias) ||
      (Array.isArray(browserFromConfig.alias) &&
        browserFromConfig.alias.includes(browserNameOrAlias))
    );
  });
}
