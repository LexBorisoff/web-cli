import prompts from "prompts";

interface Answer {
  reply?: string;
}

function getArray(reply: string): string[] {
  const browsers = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(browsers)];
}

export default async function getBrowserList(): Promise<string[]> {
  const { reply }: Answer = await prompts({
    name: "reply",
    type: "text",
    message: "List browsers you want to use (space or comma separated)\n",
    validate: (value) =>
      /^[A-Za-z,\s]+$/.test(value)
        ? true
        : "Only letters and separators are allowed!",
  });

  const browsers = reply != null ? getArray(reply) : [];
  return browsers;
}
