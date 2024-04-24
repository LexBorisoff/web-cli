import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import { print, severity } from "../../helpers/print/severity.js";
import { parseData } from "../../helpers/utils/parse-data.js";
import { readFile } from "../../helpers/utils/read-file.js";
import type { ConfigFileData } from "../../types/config.types.js";

export function showConfigProjectDir() {
  const configPath = getConfigFilePath();
  const { meta } = parseData<ConfigFileData>(readFile(configPath)) ?? {};

  print(
    meta?.projectDir ??
      severity.error("No project directory is stored in config")
  );
}
