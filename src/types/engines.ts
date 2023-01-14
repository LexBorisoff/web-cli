export interface Engine {
  url: string;
  query?: string;
  package?: string;
  delimiter?: string;
  alias?: string | string[];
}

export default interface EngineList {
  [engine: string]: Engine;
}
