import * as fs from "fs";
import getFileName from "./getFileName";
import { ConfigFileType } from "../../../types/config.types";
import { Config } from "../../../types/data.types";
import { EnginesConfig } from "../../../types/engine.types";

type Data = Config | EnginesConfig;

export default function writeFile(fileType: ConfigFileType, data: Data) {
  const fileName = getFileName(fileType);
  const json = JSON.stringify(data);
  fs.writeFileSync(fileName, json);
}
