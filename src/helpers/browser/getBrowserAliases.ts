import { BrowsersConfig } from "../../types/config.types";

export default function getBrowserAliases(
  browsersConfig: BrowsersConfig
): string[] {
  let aliases: string[] = [];
  browsersConfig.forEach((browser) => {
    if (browser instanceof Object && browser.alias != null) {
      const { alias } = browser;
      aliases = Array.isArray(alias)
        ? [...aliases, ...alias]
        : [...aliases, alias];
    }
  });

  return aliases;
}
