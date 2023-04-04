import * as fs from "fs";
import getConfigFileName from "../helpers/getConfigFileName";
import { configFileExists } from "../helpers/hasConfig";

const configFileName = getConfigFileName();

if (configFileExists()) {
  fs.unlinkSync(configFileName);
}
