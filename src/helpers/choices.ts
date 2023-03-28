import prompts from "prompts";
import chalk from "chalk";
import { PromptAnswer, PromptChoice } from "../types";

export function getChoiceTitle(choice: string): string {
  return `${choice[0].toUpperCase()}${choice.substring(1)}`;
}

export function getChoices(list: string[]): PromptChoice[] {
  return list.map((browser) => ({
    title: getChoiceTitle(browser),
    value: browser,
  }));
}

export async function select(
  list: string[],
  message: string
): Promise<string | undefined> {
  if (list.length === 1) {
    return list[0];
  }

  const choices = getChoices(list);
  const { answer }: PromptAnswer<string> = await prompts({
    type: "select",
    name: "answer",
    message,
    choices,
  });

  return answer;
}

export async function multiselect(
  choices: PromptChoice[],
  message: string
): Promise<string[] | undefined> {
  const { answer }: PromptAnswer<string[]> = await prompts({
    name: "answer",
    type: "multiselect",
    choices,
    message,
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  return answer;
}

export function constructChoices<L extends object>(list: L): string[] {
  let result: string[] = [];
  Object.entries(list).forEach(([key, item]) => {
    result = [...result, key.toLowerCase()];

    if (item.alias) {
      if (Array.isArray(item.alias)) {
        result = [
          ...result,
          ...item.alias.map((alias: string) => alias.toLowerCase()),
        ];
      } else {
        result = [...result, item.alias.toLowerCase()];
      }
    }
  });
  return result;
}
