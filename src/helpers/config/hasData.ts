import { fileExists, readFile } from "./file";

export default function hasData(): boolean {
  if (!fileExists()) {
    return false;
  }

  const data = readFile();
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
