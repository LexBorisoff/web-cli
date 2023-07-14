import * as fs from "fs";
import { getFileName, fileExists } from "../helpers/config";
import { printSuccess } from "../helpers/print";

const configFileName = getFileName("config");

export default function deleteConfig() {
  if (configFileName != null && fileExists("config")) {
    fs.unlinkSync(configFileName);
    printSuccess("Deleted!");
  }
}
