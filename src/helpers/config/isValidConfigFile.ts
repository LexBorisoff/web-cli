import * as fs from "fs";
import * as path from "path";
import { Arguments } from "yargs";

interface ValidResponse {
  configPath: string;
}

interface InvalidResponse {
  message: string;
  printFormat: boolean;
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
  values: Partial<Arguments["_"]>
): ValidResponse | InvalidResponse {
  if (values.length > 1) {
    return {
      message: "Invalid number of arguments",
      printFormat: true,
    };
  }

  const [configArg] = values;
  if (configArg == null) {
    return {
      message: "Filename must be provided",
      printFormat: true,
    };
  }

  if (typeof configArg !== "string" || !configArg.endsWith(".json")) {
    return {
      message: "Config must a .json file",
      printFormat: false,
    };
  }

  const configPath = path.resolve(configArg);
  if (!fs.existsSync(configPath)) {
    return {
      message: "Could not access the provided config file",
      printFormat: false,
    };
  }

  return { configPath };
}
