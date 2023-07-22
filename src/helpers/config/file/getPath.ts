import * as fs from "fs";
import { Config } from "../../../types/config.types";

function hasPath(data: unknown): data is Config {
  return (
    data instanceof Object && "path" in data && typeof data.path === "string"
  );
}

export default function getConfigPath(): string | undefined {
  try {
    const json = fs.readFileSync("../../../config.json", { encoding: "utf-8" });
    const config = JSON.parse(json);
    return hasPath(config) ? config.path : undefined;
  } catch {
    return undefined;
  }
}
