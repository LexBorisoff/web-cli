import type { DefineBrowsersFn } from "../types.js";

export const defineBrowsers: DefineBrowsersFn = function defineBrowsers(
  define
) {
  const browsers = define((name, config = {}) => ({
    name,
    ...config,
  }));

  const json = JSON.stringify(browsers);
  console.log(json);
};
