import getConfigData from "./getConfigData";
import { defaultEngine, defaultDelimiter } from "../helpers/config";
import { DefaultsConfig } from "../types/config.types";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

export default function getDefaultsData(): DefaultsConfig & RequiredDefaults {
  const config = getConfigData();
  const defaults: DefaultsConfig & RequiredDefaults = {
    ...config.defaults,
    engine: config.defaults?.engine ?? defaultEngine,
    delimiter: config.defaults?.delimiter ?? defaultDelimiter,
  };
  return defaults;
}
