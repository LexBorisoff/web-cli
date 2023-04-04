import prompts from "prompts";
import chalk from "chalk";
import addDefault from "./addDefault";
import addBrowser from "./addBrowser";
import addProfile from "./addProfile";
import { getChoices } from "../../../helpers/prompts";
import emptyLine from "../../../helpers/emptyLine";
import {
  ConfigType,
  PromptAnswer,
  PromptChoice,
} from "../../../types/setup.types";

async function addType(type: ConfigType): Promise<boolean> {
  if (type === "default") {
    return addDefault();
  } else if (type === "browser") {
    return addBrowser();
  } else if (type === "profile") {
    return addProfile();
  }

  return false;
}

export default async function addConfig(type?: ConfigType): Promise<boolean> {
  if (type != null) {
    return await addType(type);
  }

  const configTypes: ConfigType[] = ["default", "browser", "profile"];
  const choices: PromptChoice[] = getChoices(configTypes);

  const { answer: configType }: PromptAnswer<ConfigType> = await prompts({
    name: "answer",
    type: "select",
    choices,
    message: `What ${chalk.yellow("config")} do you want to add?\n`,
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  if (configType != null) {
    emptyLine();
    return addType(configType);
  }

  return false;
}
