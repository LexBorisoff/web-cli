import { getBrowsersData } from "../data";
import { Browser } from "../types/data.types";

export default async function getBrowser(
  browserNameOrAlias: string
): Promise<Browser | undefined> {
  const browsers = await getBrowsersData();
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
