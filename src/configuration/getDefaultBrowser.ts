import prompts from "prompts";

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

  const choices = browsers.map((b) => ({
    title: `${b[0].toUpperCase()}${b.substring(1)}`,
    value: b,
  }));

  const { value }: Answer = await prompts({
    type: "select",
    name: "value",
    message: "What should be the default browser?\n",
    choices,
  });

  return value;
}
