import * as fs from "fs";
import { defaultEngine, defaultEngineConfig } from "./defaults";
import { getFileName } from "./file";
import { Config } from "../../types/config.types";

const defaultConfig: Config = {
  defaults: {
    engine: defaultEngine,
    browser: null,
    profile: {},
  },
  browsers: [],
  profiles: {},
  engines: defaultEngineConfig,
};

export default function setupInitialConfig() {
  fs.writeFileSync(getFileName(), JSON.stringify(defaultConfig));
}
