import ConfigItem from "./configItem";

export interface BrowserObject extends ConfigItem {
  name: string;
  path?: string;
}

export type Browser = string | BrowserObject;

type BrowsersConfig<B = Browser> = Array<B>;
export default BrowsersConfig;
