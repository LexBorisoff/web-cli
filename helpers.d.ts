interface Defaults {
  engine: string;
  delimiter: string;
  browser?: string;
  profile?: { [key: string]: string };
}

interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

interface Engine {
  url: string;
  query: string;
  package?: string;
  delimiter?: string;
  alias?: string | string[];
}

declare function getDefaults(): Defaults;
// declare function constructChoices<T extends Object>(list: T): string[];
declare function getBrowserName(nameFromArgs: string): string | undefined;
declare function getEngine(engineName: number): Engine | undefined;
