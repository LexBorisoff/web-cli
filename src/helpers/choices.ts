import prompts from "prompts";
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

export async function keepGoing(
  message: string,
  initial: boolean
): Promise<boolean> {
  const { answer: keepGoing }: PromptAnswer<boolean> = await prompts({
    name: "answer",
    type: "toggle",
    message,
    active: "yes",
    inactive: "no",
    initial,
  });

  return !!keepGoing;
}

export type ValidateFn = (
  value: string
) => boolean | string | Promise<boolean | string>;
const validateInput: ValidateFn = (value) =>
  /^[A-Za-z,\s]+$/.test(value)
    ? true
    : "Only letters and separators are allowed!";

export async function getText(
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
}

export function getArray(reply: string): string[] {
  const browsers = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(browsers)];
}
