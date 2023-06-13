import getConfigData from "./getConfigData";
import { engineFallback } from "./getEnginesData";
import { DefaultsConfig } from "../types/data.types";

const delimiterFallback = " ";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

export default function getDefaultsData(): DefaultsConfig & RequiredDefaults {
  const config = getConfigData();
  const defaults: DefaultsConfig & RequiredDefaults = {
    ...config.defaults,
    engine: config.defaults?.engine ?? engineFallback,
    delimiter: config.defaults?.delimiter ?? delimiterFallback,
  };
  return defaults;
}
