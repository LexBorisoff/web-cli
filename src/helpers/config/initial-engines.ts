import type { ConfigDataDto } from "../../types/config.types.js";

export const initialEngines: NonNullable<ConfigDataDto["engines"]> = {
  google: {
    name: "Google",
    baseUrl: "google.com",
    search: "search?q=",
  },
  duckduckgo: {
    name: "DuckDuckGo",
    baseUrl: "duckduckgo.com",
    search: "?q=",
    delimiter: "+",
    alias: ["duck"],
  },
  mdn: {
    name: "MDN",
    baseUrl: "developer.mozilla.org",
    search: "search?q=",
  },
  youtube: {
    name: "YouTube",
    baseUrl: "youtube.com",
    search: "results?search_query=",
  },
  npm: {
    name: "npm",
    baseUrl: "npmjs.com",
    search: "search?q=",
  },
};
