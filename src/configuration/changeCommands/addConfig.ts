import prompts from "prompts";
import chalk from "chalk";
import { addDefault } from "./default";
import { addBrowser } from "./browser";
import { addProfile } from "./profile";
import { emptyLine, getChoices } from "../../helpers";

import { ConfigType, PromptAnswer, PromptChoice } from "../../types";

async function add(type: ConfigType) {
  if (type === "default") {
    await addDefault();
  } else if (type === "browser") {
    await addBrowser();
  } else if (type === "profile") {
    await addProfile();
  }
}

export default async function addConfig(type?: ConfigType) {
  if (type != null) {
    await add(type);
    return;
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
    await add(configType);
  }
}
