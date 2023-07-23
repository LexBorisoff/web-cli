import configFileExists from "./configFileExists";
import readConfigFile from "./readConfigFile";

export default function hasConfigData(): boolean {
  if (!configFileExists()) {
    return false;
  }

  const data = readConfigFile();
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
