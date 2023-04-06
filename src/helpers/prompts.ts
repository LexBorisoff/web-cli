import prompts from "prompts";
import { PromptAnswer, PromptChoice, ValidateFn } from "../types/config.types";

export function getTitle(choice: string): string {
  return `${choice[0].toUpperCase()}${choice.substring(1).toLowerCase()}`;
}

export function getChoices(list: string[]): PromptChoice[] {
  return list.map((item) => ({
    title: getTitle(item),
    value: item,
  }));
}

export function getArrayLowerCase(reply: string): string[] {
  if (reply === "") {
    return [];
  }

  const array = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(array)];
}

const validateInput: ValidateFn = (value) =>
  /^[A-Za-z,\s]+$/.test(value)
    ? true
    : "Only letters and separators are allowed";

export const cliPrompts = {
  select: async function <ListItem extends string = string>(
    list: ListItem[],
    message: string
  ): Promise<ListItem | undefined> {
    if (list.length === 1) {
      return list[0];
    }

    const choices = getChoices(list);
    const { answer }: PromptAnswer<ListItem> = await prompts({
      type: "select",
      name: "answer",
      message,
      choices,
      instructions: false,
      hint: "- Space/←/→ to toggle selection. Enter to submit.",
    });

    return answer;
  },

  multiselect: async function <ListItem extends string = string>(
    list: ListItem[],
    message: string
  ): Promise<ListItem[] | undefined> {
    const choices = getChoices(list);

    const { answer }: PromptAnswer<ListItem[]> = await prompts({
      name: "answer",
      type: "multiselect",
      choices,
      message,
      instructions: false,
      hint: "- Space/←/→/a to toggle selection. Enter to submit.",
    });

    return answer;
  },

  toggle: async function (message: string, initial: boolean): Promise<boolean> {
    const { answer }: PromptAnswer<boolean> = await prompts({
      name: "answer",
      type: "toggle",
      message,
      active: "yes",
      inactive: "no",
      initial,
    });

    return !!answer;
  },

  text: async function (
    message: string,
    validate: ValidateFn = validateInput
  ): Promise<string | undefined> {
    const { answer }: PromptAnswer<string> = await prompts({
      name: "answer",
      type: "text",
      message,
      validate,
    });

    return answer;
  },
};
