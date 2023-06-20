import * as fs from "fs";
import { getFileName, fileExists } from "../helpers/config";

const configFileName = getFileName("config");

if (fileExists("config")) {
  fs.unlinkSync(configFileName);
}
