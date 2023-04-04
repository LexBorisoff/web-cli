import * as fs from "fs";
import { getConfigFileName, configFileExists } from "../helpers/config";

const configFileName = getConfigFileName();

if (configFileExists()) {
  fs.unlinkSync(configFileName);
}
