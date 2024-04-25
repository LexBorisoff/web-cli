import * as fs from "node:fs";
import { prompts } from "../helpers/utils/prompts.js";
import { getConfigFilePath } from "../helpers/config/get-config-path.js";

export enum ConfigAction {
  Browsers,
  Engines,
  Directory,
  Updated,
  Created,
  Delete,
  Create,
}

export async function getConfigAction(): Promise<ConfigAction | undefined> {
  const configPath = getConfigFilePath();
  const configExists = fs.existsSync(configPath);

  const actions = [
    {
      title: "Engines",
      value: ConfigAction.Engines,
      description: "show config engines",
      show: configExists,
    },
    {
      title: "Browsers",
      value: ConfigAction.Browsers,
      description: "show config browsers",
      show: configExists,
    },
    {
      title: "Directory",
      value: ConfigAction.Directory,
      description: "show config's project directory",
      show: configExists,
    },
    {
      title: "Updated",
      value: ConfigAction.Updated,
      description: "show when config was last updated",
      show: configExists,
    },
    {
      title: "Created",
      value: ConfigAction.Created,
      description: "show when config was first created",
      show: configExists,
    },
    {
      title: "Delete",
      value: ConfigAction.Delete,
      description: "delete generated config data",
      show: configExists,
    },
    {
      title: "Create",
      value: ConfigAction.Create,
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

  const { answer } = await prompts.select({
    name: "answer",
    message: "Choose an option",
    choices,
  });

  return answer;
}
