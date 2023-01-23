import getConfig from "./getConfigData";
import { engineFallback } from "./getEngines";
import { DefaultsConfig } from "../types";

const delimiterFallback = " ";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

export default async function getDefaultsData(): Promise<
  DefaultsConfig & RequiredDefaults
> {
  const config = await getConfig();
  const defaults: DefaultsConfig & RequiredDefaults = {
    ...config.defaults,
    engine: config.defaults?.engine ?? engineFallback,
    delimiter: config.defaults?.delimiter ?? delimiterFallback,
  };
  return defaults;
}
