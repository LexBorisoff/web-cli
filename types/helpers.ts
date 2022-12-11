export interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

export interface Engine {
  url: string;
  query: string;
  package?: string;
  delimiter?: string;
  alias?: string | string[];
}
