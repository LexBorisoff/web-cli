import { EnginesConfig } from "../../types/config.types";

export const defaultEngine = "google";

export const defaultEngineConfig: EnginesConfig = {
  google: {
    name: "Google",
    url: "www.google.com",
    query: "search?q=",
    alias: ["g"],
  },
};

export const defaultDelimiter = " ";
