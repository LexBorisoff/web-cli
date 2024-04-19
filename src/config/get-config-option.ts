import * as fs from "node:fs";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";
import { parseData } from "./utils/parse-data.js";
import { readFile } from "./utils/read-file.js";
import { ConfigOption } from "./utils/config-option.enum.js";
import type { ConfigFileData } from "./types.js";
import { promptSelect } from "./prompts.js";

export async function getConfigAction(): Promise<ConfigOption | undefined> {
  const configPath = getConfigFilePath();
  const configExists = fs.existsSync(configPath);
  const configData = parseData<ConfigFileData>(readFile(configPath));

  if (!configExists || configData == null) {
    return ConfigOption.CreateConfig;
  }

  const configOptions = [
    {
      title: "Open config JSON file",
      value: ConfigOption.OpenConfig,
      show: configExists,
    },
    {
      title: "Show config project directory",
      value: ConfigOption.ShowConfig,
      show: configExists,
    },
    {
      title: "Create new config project",
      value: ConfigOption.CreateConfig,
      show: true,
    },
  ];

  const choices = configOptions
    .filter(({ show }) => show)
    .map(({ title, value }) => ({ title, value }));

  const { configOption } = await promptSelect(choices, {
    name: "configOption",
    message: "Choose an option",
  });

  console.log(configOption);

  return configOption;
}
