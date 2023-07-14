import { getConfigItem, hasData } from "../config";
import { getEnginesData } from "../../data";
import { Engine, EnginesConfig } from "../../types/engine.types";

const defaultEngineConfig: EnginesConfig = {
  google: {
    name: "Google",
    url: "www.google.com",
    query: "search?q=",
    alias: ["g"],
  },
};

export default function getEngine(
  engineNameOrAlias?: string
): Engine | undefined {
  if (engineNameOrAlias == null) {
    return undefined;
  }

  const engines = hasData("engines") ? getEnginesData() : defaultEngineConfig;
  return getConfigItem(engineNameOrAlias, engines);
}
