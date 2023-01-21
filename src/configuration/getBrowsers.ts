import prompts from "prompts";

function getArray(reply: string): string[] {
  return reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());
}

export default async function getBrowsers() {
  const { reply } = await prompts({
    name: "reply",
    type: "text",
    message: "List browsers you want to use (space or comma separated)\n",
    validate: (value) =>
      /^[A-Za-z,\s]+$/.test(value)
        ? true
        : "Only letters and separators are allowed!",
  });

  const browsers = getArray(reply);
  console.log(browsers);
}
