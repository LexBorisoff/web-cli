import config from "./config";
import { fallbackEngine } from "./engines";
import { DefaultsConfig } from "../types/config";

const fallbackDelimiter = " ";

interface RequiredDefaults {
  engine: string;
  delimiter: string;
}

const defaults: DefaultsConfig & RequiredDefaults = {
  ...config.defaults,
  engine: config.defaults?.engine ?? fallbackEngine,
  delimiter: config.defaults?.delimiter ?? fallbackDelimiter,
};

export default defaults;
