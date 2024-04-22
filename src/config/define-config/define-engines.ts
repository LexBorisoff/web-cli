import type { DefineEnginesFn } from "../types.js";

export const defineEngines: DefineEnginesFn = function defineEngines(callback) {
  const engines = callback((baseUrl, config = {}) => ({
    baseUrl,
    ...config,
  }));

  const json = JSON.stringify(engines);
  console.log(json);
};
