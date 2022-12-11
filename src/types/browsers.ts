export interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

export type BrowsersConfig = Array<string | Browser>;
