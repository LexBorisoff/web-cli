import * as fs from "node:fs";
import { prompts } from "../helpers/utils/prompts.js";
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
      title: "Engines",
      value: ConfigAction.ShowEngines,
      description: "show config engines",
      show: configExists,
    },
    {
      title: "Browsers",
      value: ConfigAction.ShowBrowsers,
      description: "show config browsers",
      show: configExists,
    },
    {
      title: "Directory",
      value: ConfigAction.ShowProjectDir,
      description: "show config's project directory",
      show: configExists,
    },
    {
      title: "Updated",
      value: ConfigAction.ShowUpdatedAt,
      description: "show when config was last updated",
      show: configExists,
    },
    {
      title: "Created",
      value: ConfigAction.ShowCreatedAt,
      description: "show when config was first created",
      show: configExists,
    },
    {
      title: "Delete",
      value: ConfigAction.DeleteConfigFile,
      description: "delete generated config data",
      show: configExists,
    },
    {
      title: "Create",
      value: ConfigAction.CreateProject,
      description: "create new config project",
      show: true,
    },
  ];

  const choices = actions
    .filter(({ show }) => show)
    .map(({ title, value, description }) => ({
      title,
      value,
      description,
    }));

  const { configAction } = await prompts.select(choices, {
    name: "configAction",
    message: "Choose an option",
  });

  return configAction;
}
