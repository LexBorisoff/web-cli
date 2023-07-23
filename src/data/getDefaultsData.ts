import getConfigData from "./getConfigData";
import { defaultEngine, defaultDelimiter } from "../helpers/config";
import { DefaultsData } from "../types/config.types";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

export default function getDefaultsData(): DefaultsData & RequiredDefaults {
  const config = getConfigData();
  const defaults: DefaultsData & RequiredDefaults = {
    ...(config.defaults ?? {}),
    engine: config.defaults?.engine ?? defaultEngine,
    delimiter: config.defaults?.delimiter ?? defaultDelimiter,
  };
  return defaults;
}
