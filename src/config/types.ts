import { ConfigBrowser } from "./define-config/define-browsers.js";
import { ConfigEngine } from "./define-config/define-engines.js";

export interface ConfigFileData {
  browsers?: Record<string, ConfigBrowser>;
  engines?: Record<string, ConfigEngine>;
}
