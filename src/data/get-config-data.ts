import type { ConfigDataJson } from "../types/config.types.js";
import { parseData } from "../helpers/utils/parse-data.js";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";
import { readFile } from "../helpers/utils/read-file.js";

export function getConfigData(): ConfigDataJson {
  const filePath = getConfigFilePath();
  const config = readFile(filePath);
  return parseData<ConfigDataJson>(config) ?? {};
}
