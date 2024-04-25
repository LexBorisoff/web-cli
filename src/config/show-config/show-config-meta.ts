import type { ConfigDataJson } from "../../types/config.types.js";
import { getConfigFilePath } from "../../helpers/config/get-config-path.js";
import {
  printError,
  printInfo,
  severity,
} from "../../helpers/print/severity.js";
import { isValidDateString } from "../../helpers/utils/is-valid-date-string.js";
import { parseData } from "../../helpers/utils/parse-data.js";
import { readFile } from "../../helpers/utils/read-file.js";
import { ConfigAction } from "../get-config-action.js";

const configPath = getConfigFilePath();
const { meta } = parseData<ConfigDataJson>(readFile(configPath)) ?? {};

function printDate(name: string, value: string = ""): void {
  if (value != null) {
    if (isValidDateString(value)) {
      printInfo(new Date(value).toString());
      return;
    }
    printError(`Invalid ${name} date is stored in config`);
  }
  printError(`No ${name} date is stored in config`);
}

export const showConfigMeta = {
  [ConfigAction.Directory]() {
    printInfo(
      meta?.projectDir ??
        severity.error("No project directory is stored in config")
    );
  },

  [ConfigAction.Created]() {
    const { createdAt } = meta ?? {};
    printDate("created at ", createdAt);
  },

  [ConfigAction.Updated]() {
    const { updatedAt } = meta ?? {};
    printDate("updated at ", updatedAt);
  },
};
