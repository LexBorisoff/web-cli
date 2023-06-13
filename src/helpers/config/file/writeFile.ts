import * as fs from "fs";
import getFileName from "./getFileName";
import { Config } from "../../../types/data.types";
import { EnginesConfig } from "../../../types/engine.types";

interface Data {
  config?: Config;
  engines?: EnginesConfig;
}

export default function writeFile(data: Data) {
  if (data.config != null) {
    const { config } = data;
    const json = JSON.stringify(config);
    const fileName = getFileName("config");
    fs.writeFileSync(fileName, json);
  }

  if (data.engines != null) {
    const { engines } = data;
    const json = JSON.stringify(engines);
    const fileName = getFileName("engines");
    fs.writeFileSync(fileName, json);
  }
}
