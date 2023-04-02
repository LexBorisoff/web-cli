import { WithAlias } from "./utility.types";

export interface Engine extends WithAlias {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export interface EngineList {
  [engine: string]: Engine;
}
