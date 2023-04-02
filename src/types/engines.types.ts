import { WithAlias } from "./utility.types";

export interface Engine extends WithAlias {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export default interface EngineList {
  [engine: string]: Engine;
}
