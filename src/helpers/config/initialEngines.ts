import { EnginesData } from "../../types/config.types";

const initialEngines: EnginesData = {
  google: {
    name: "Google",
    url: "google.com",
    query: "search?q=",
  },
  duckduckgo: {
    name: "DuckDuckGo",
    url: "duckduckgo.com",
    query: "?q=",
    delimiter: "+",
    alias: ["duck"],
  },
  mdn: {
    name: "MDN",
    url: "developer.mozilla.org",
    query: "search?q=",
  },
  youtube: {
    name: "YouTube",
    url: "youtube.com",
    query: "results?search_query=",
  },
  npm: {
    name: "npm",
    url: "npmjs.com",
    query: "search?q=",
  },
};

export default initialEngines;
