import { configFileExists, readConfigFile } from "./file";

export default function hasConfig(): boolean {
  if (!configFileExists()) {
    return false;
  }

  const data = readConfigFile();
  if (data === "") {
    return false;
  }

  const config = JSON.parse(data);
  return config instanceof Object ? Object.keys(config).length > 0 : false;
}
