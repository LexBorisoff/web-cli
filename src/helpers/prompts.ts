import prompts from "prompts";
import { PromptAnswer, PromptChoice, ValidateFn } from "../types/setup.types";

export function getChoiceTitle(choice: string): string {
  return `${choice[0].toUpperCase()}${choice.substring(1)}`;
}

export function getChoices(list: string[]): PromptChoice[] {
  return list.map((browser) => ({
    title: getChoiceTitle(browser),
    value: browser,
  }));
}

export function getChoiceArray(reply: string): string[] {
  if (reply === "") {
    return [];
  }

  const browsers = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(browsers)];
}

const validateInput: ValidateFn = (value) =>
  /^[A-Za-z,\s]+$/.test(value)
    ? true
    : "Only letters and separators are allowed";

export const choicesPrompt = {
  select: async function (
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
  },

  multiselect: async function (
    list: string[],
    message: string
  ): Promise<string[] | undefined> {
    const choices = getChoices(list);

    const { answer }: PromptAnswer<string[]> = await prompts({
      name: "answer",
      type: "multiselect",
      choices,
      message,
      instructions: false,
      hint: "- Space/←/→ to toggle selection. Enter to submit.",
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
