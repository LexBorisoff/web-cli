import * as fs from "node:fs";
import { prompts } from "../../helpers/utils/prompts.js";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import { printError, printSuccess } from "../../helpers/print/severity.js";

export async function deleteConfig() {
  const filePath = getConfigFilePath();
}
