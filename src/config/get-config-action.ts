import * as fs from "node:fs";
import { promptSelect } from "../helpers/utils/prompts.js";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";

export enum ConfigAction {
  ShowProjectDir,
  CreateProject,
}

export async function getConfigAction(): Promise<ConfigAction | undefined> {
  const configPath = getConfigFilePath();
  const configExists = fs.existsSync(configPath);

  const actions = [
    {
      title: "Show config project directory",
      value: ConfigAction.ShowProjectDir,
      show: configExists,
    },
    {
      title: "Create new config project",
      value: ConfigAction.CreateProject,
      show: true,
    },
  ];

  const choices = actions
    .filter(({ show }) => show)
    .map(({ title, value }) => ({ title, value }));

  const { configAction } = await promptSelect(choices, {
    name: "configAction",
    message: "Choose an option",
  });

  return configAction;
}
