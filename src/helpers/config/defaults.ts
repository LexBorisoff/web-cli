import { EnginesData } from "../../types/config.types";

export const defaultEngine = "google";

export const defaultEngineConfig: EnginesData = {
  google: {
    name: "Google",
    url: "google.com",
    query: "search?q=",
  },
};

export const defaultDelimiter = " ";
