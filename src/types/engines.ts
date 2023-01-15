import ConfigItem from "./configItem";

export interface Engine extends ConfigItem {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export default interface EngineList {
  [engine: string]: Engine;
}
