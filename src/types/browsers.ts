export interface BrowserObject {
  name: string;
  path?: string;
  alias?: string | string[];
}

export type Browser = string | BrowserObject;

type BrowsersConfig = Array<Browser>;
export default BrowsersConfig;
