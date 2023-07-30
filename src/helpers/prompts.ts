import prompts from "prompts";
import getTitle from "./getTitle";
import { PromptAnswer, PromptChoice, ValidateFn } from "../types/prompt.types";

export function getChoices(list: string[], titleCase = true): PromptChoice[] {
  return list.map((item) => ({
    title: titleCase ? getTitle(item) : item,
    value: item,
  }));
}

export function getUniqueArrayLowerCase(reply: string): string[] {
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
    message: string,
    titleCase = true
  ): Promise<ListItem | undefined> {
    if (list.length === 1) {
      return list[0];
    }

    const choices = getChoices(list, titleCase);
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
    message: string,
    titleCase = true
  ): Promise<ListItem[] | undefined> {
    const choices = getChoices(list, titleCase);

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

  toggle: async function (
    message: string,
    initial: boolean
  ): Promise<boolean | undefined> {
    const { answer }: PromptAnswer<boolean> = await prompts({
      name: "answer",
      type: "toggle",
      message,
      active: "yes",
      inactive: "no",
      initial,
    });

    return answer;
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
