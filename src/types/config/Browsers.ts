export interface Browser {
  name: string;
  path?: string;
  alias?: string | string[];
}

type BrowsersConfig = Array<string | Browser>;

export default BrowsersConfig;
