import { getBrowsersData } from "../../data";
import { Browser } from "../../types/config.types";

/**
 * returns the found browser from config or the provided argument
 */
export default function getBrowser(browserNameOrAlias: string): Browser {
  const browsers = getBrowsersData();
  return (
    browsers.find((browserFromConfig) => {
      if (typeof browserFromConfig === "string") {
        return browserFromConfig === browserNameOrAlias;
      }

      const isBrowserName = browserFromConfig.name === browserNameOrAlias;
      const isBrowserAlias =
        // alias is a string
        (typeof browserFromConfig?.alias === "string" &&
          browserFromConfig.alias === browserNameOrAlias) ||
        // alias is an array
        (Array.isArray(browserFromConfig.alias) &&
          browserFromConfig.alias.includes(browserNameOrAlias));

      return isBrowserName || isBrowserAlias;
    }) ?? browserNameOrAlias
  );
}
