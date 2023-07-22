import { EnginesData } from "../../types/config.types";

export const defaultEngine = "google";

export const defaultEngineConfig: EnginesData = {
  google: {
    name: "Google",
    url: "www.google.com",
    query: "search?q=",
  },
};

export const defaultDelimiter = " ";
