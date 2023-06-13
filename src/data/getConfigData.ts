import { fileExists, readFile } from "../helpers/config";
import { Config } from "../types/data.types";

export default function getConfigData(): Config {
  if (!fileExists("config")) {
    return {};
  }

  const data = readFile("config");
  return data !== "" ? JSON.parse(data) : {};
}
