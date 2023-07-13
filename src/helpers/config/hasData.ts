import { fileExists, readFile } from "./file";
import { ConfigFileType } from "../../types/config.types";

export default function hasData(fileType: ConfigFileType): boolean {
  if (!fileExists(fileType)) {
    return false;
  }

  const data = readFile(fileType);
  if (data == null || data === "") {
    return false;
  }

  try {
    const config = JSON.parse(data);
    return config instanceof Object && Object.keys(config).length > 0;
  } catch {
    return false;
  }
}
