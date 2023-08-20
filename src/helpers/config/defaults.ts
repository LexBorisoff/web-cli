import { EnginesData } from "../../types/config.types";

export const defaultEngine = "google";

export const defaultEngineConfig: EnginesData = {
  [defaultEngine]: {
    name: "Google",
    url: "google.com",
    query: "search?q=",
  },
};

export const defaultDelimiter = " ";
