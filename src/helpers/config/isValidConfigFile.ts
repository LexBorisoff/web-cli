import * as fs from "fs";
import * as path from "path";
import { Args } from "../../types/utility.types";

interface ValidResponse {
  configPath: string;
}

interface InvalidResponse {
  message: string;
  format: boolean;
}

export function isValidResponse(
  response: ValidResponse | InvalidResponse
): response is ValidResponse {
  return "configPath" in response;
}

/**
 * Returns the config path if passes file validation
 */
export default function isValidConfigFile(
  values: Args
): ValidResponse | InvalidResponse {
  if (values.length > 1) {
    return {
      message: "Invalid number of arguments",
      format: true,
    };
  }

  const [configArg] = values;
  if (configArg == null) {
    return {
      message: "Filename must be provided",
      format: true,
    };
  }

  if (typeof configArg !== "string" || !configArg.endsWith(".json")) {
    return {
      message: "Config must be a .json file",
      format: false,
    };
  }

  const configPath = path.resolve(configArg);
  if (!fs.existsSync(configPath)) {
    return {
      message: "Could not access the provided config file",
      format: false,
    };
  }

  return { configPath };
}
