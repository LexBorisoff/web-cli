import { fileExists, readFile } from "./file";
import { ConfigFileType } from "../../types/config.types";

export default function hasData(type: ConfigFileType): boolean {
  if (!fileExists(type)) {
    return false;
  }

  const data = readFile(type);
  if (data === "") {
    return false;
  }

  const config = JSON.parse(data);
  return config instanceof Object ? Object.keys(config).length > 0 : false;
}
