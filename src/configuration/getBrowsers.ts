import prompts from "prompts";
import getBrowserChoices from "./getBrowserChoices";

interface Answer<T> {
  answer?: T;
}

interface Choice {
  title: string;
  value: string;
}

async function getKnownBrowsers(): Promise<string[] | undefined> {
  const choices: Choice[] = [
    { title: "Chrome", value: "chrome" },
    { title: "Firefox", value: "firefox" },
    { title: "Edge", value: "edge" },
    { title: "Brave", value: "brave" },
    { title: "Opera", value: "opera" },
    { title: "Safari", value: "safari" },
  ];

  const { answer: browsers }: Answer<string[]> = await prompts({
    name: "answer",
    type: "multiselect",
    choices,
    message: "What browser(s) do you have installed?\n",
    instructions: false,
    hint: "- Space/←/→ to toggle selection. Enter to submit.",
  });

  return browsers;
}

function getArray(reply: string): string[] {
  const browsers = reply
    .trim()
    .split(/\s+|,+/)
    .filter((r) => r !== "")
    .map((r) => r.toLowerCase());

  return [...new Set(browsers)];
}

async function getExtraBrowsers(): Promise<string[]> {
  const { answer: keepGoing }: Answer<boolean> = await prompts({
    name: "answer",
    type: "toggle",
    message: "Are there browsers you use that were not in the list?\n",
    active: "yes",
    inactive: "no",
    initial: false,
  });

  if (keepGoing) {
    console.log("");
    const { answer: browsers }: Answer<string> = await prompts({
      name: "answer",
      type: "text",
      message:
        "List other browsers you want to add (space or comma separated).\n",
      validate: (value) =>
        /^[A-Za-z,\s]+$/.test(value)
          ? true
          : "Only letters and separators are allowed!",
    });

    return browsers != null ? getArray(browsers) : [];
  }

  return [];
}

async function getDefaultBrowser(
  browsers: string[]
): Promise<string | undefined> {
  if (browsers.length === 1) {
    return browsers[0];
  }

  const choices = getBrowserChoices(browsers);

  const { answer }: Answer<string> = await prompts({
    type: "select",
    name: "answer",
    message: "What should be the default browser?\n",
    choices,
  });

  return answer;
}

export { getKnownBrowsers, getExtraBrowsers, getDefaultBrowser };
