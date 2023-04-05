import { WithAlias } from "./utility.types";

export interface Engine extends Partial<WithAlias> {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export interface EngineList {
  [engine: string]: Engine;
}
