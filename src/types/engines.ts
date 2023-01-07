export interface Engine {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
  alias?: string | string[];
}

export interface EnginesConfig {
  [index: string]: Engine;
}
