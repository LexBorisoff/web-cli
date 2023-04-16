import { enginesFileExists, readEnginesFile } from "./file";

export default function hasEngines(): boolean {
  if (!enginesFileExists()) {
    return false;
  }

  const data = readEnginesFile();
  if (data === "") {
    return false;
  }

  const engines = JSON.parse(data);
  return engines instanceof Object ? Object.keys(engines).length > 0 : false;
}
