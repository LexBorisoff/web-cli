import config from "./config";
import { defaultEngine } from "./engines";
import { DefaultsConfig } from "../types/config";

const defaultDelimiter = " ";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

const defaults: DefaultsConfig & RequiredDefaults = {
  ...config.defaults,
  engine: config.defaults.engine ?? defaultEngine,
  delimiter: config.defaults?.delimiter ?? defaultDelimiter,
};

export default defaults;
