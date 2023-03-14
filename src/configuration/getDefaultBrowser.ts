import prompts from "prompts";
import getBrowserChoices from "./getBrowserChoices";

type Value = string | undefined;
interface Answer {
  value: Value;
}

export default async function getDefaultBrowser(
  browsers: string[]
): Promise<Value> {
  if (browsers.length === 1) {
    return browsers[0];
  }

  const choices = getBrowserChoices(browsers);

  const { value }: Answer = await prompts({
    type: "select",
    name: "value",
    message: "What should be the default browser?\n",
    choices,
  });

  return value;
}
