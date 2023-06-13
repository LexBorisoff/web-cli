import { WithAlias } from "./utility.types";

export interface Engine extends Partial<WithAlias> {
  name: string;
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
}

export interface EnginesConfig {
  [engine: string]: Engine;
}
