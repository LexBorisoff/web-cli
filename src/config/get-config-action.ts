import * as fs from "node:fs";
import { promptSelect } from "../helpers/utils/prompts.js";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";

export enum ConfigAction {
  ShowBrowsers,
  ShowEngines,
  ShowProjectDir,
  ShowUpdatedAt,
  ShowCreatedAt,
  DeleteConfigFile,
  CreateProject,
}

export async function getConfigAction(): Promise<ConfigAction | undefined> {
  const configPath = getConfigFilePath();
  const configExists = fs.existsSync(configPath);

  const actions = [
    {
      title: "Browsers",
      value: ConfigAction.ShowBrowsers,
      show: configExists,
    },
    {
      title: "Engines",
      value: ConfigAction.ShowEngines,
      show: configExists,
    },
    {
      title: "Config directory",
      value: ConfigAction.ShowProjectDir,
      show: configExists,
    },
    {
      title: "Updated at",
      value: ConfigAction.ShowUpdatedAt,
      show: configExists,
    },
    {
      title: "Created at",
      value: ConfigAction.ShowCreatedAt,
      show: configExists,
    },
    {
      title: "Delete generated config file",
      value: ConfigAction.DeleteConfigFile,
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
