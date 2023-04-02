import * as fs from "fs";
import getConfigFileName from "./helpers/getConfigFileName";
import { configFileExists } from "./setup/checkConfigFile";

const configFileName = getConfigFileName();

if (configFileExists()) {
  fs.unlinkSync(configFileName);
}
