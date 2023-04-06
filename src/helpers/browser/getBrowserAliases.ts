import { BrowsersConfig } from "../../types/data.types";

export default function getBrowserAliases(browsers: BrowsersConfig): string[] {
  // const browsers = await getBrowsersData();

  let aliases: string[] = [];
  browsers.forEach((browser) => {
    if (browser instanceof Object && browser.alias != null) {
      const { alias } = browser;
      aliases = Array.isArray(alias)
        ? [...aliases, ...alias]
        : [...aliases, alias];
    }
  });

  return aliases;
}
