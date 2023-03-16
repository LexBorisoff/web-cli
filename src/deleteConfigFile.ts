import * as fs from "fs";
import { getConfigFileName, configFileExists } from "./configuration";

const configFileName = getConfigFileName();

if (configFileExists()) {
  fs.unlinkSync(configFileName);
}
