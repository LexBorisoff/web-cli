import prompts from "prompts";
import { getChoices } from "../../../helpers/prompts";
import {
  ConfigType,
  PromptAnswer,
  PromptChoice,
} from "../../../types/setup.types";

export default async function deleteConfig(
  type?: ConfigType
): Promise<boolean> {
  if (type != null) {
    return false;
  }

  const configTypes: ConfigType[] = ["default", "browser", "profile"];
  const choices: PromptChoice[] = getChoices(configTypes);

  const { answer: configType }: PromptAnswer<string> = await prompts({
    name: "answer",
    type: "select",
    choices,
    message: "What config do you want to delete?\n",
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  console.log(configType);
  return false;
}
