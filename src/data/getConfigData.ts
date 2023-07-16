import { fileExists, readFile } from "../helpers/config";
import { Config } from "../types/config.types";

export default function getConfigData(): Config {
  if (!fileExists()) {
    return {};
  }

  const data = readFile();

  try {
    return data != null && data !== "" ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
