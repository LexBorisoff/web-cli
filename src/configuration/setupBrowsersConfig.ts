import prompts from "prompts";
import getDefaultBrowser from "./getDefaultBrowser";
import getBrowserAliases from "./getBrowserAliases";
import { BrowsersConfig } from "../types";

async function askToKeepGoing(message: string) {
  const { answer }: { answer: boolean } = await prompts({
    type: "toggle",
    name: "answer",
    message,
    initial: true,
    active: "yes",
    inactive: "no",
  });

  return answer;
}

export default function setupBrowsersConfig(
  browsers: string[]
): BrowsersConfig {
  return browsers;
  //   let keepGoing = false;
  //   // 2) Browser Aliases
  //   let browsersConfig: BrowsersConfig = browsers;
  //   keepGoing = await askToKeepGoing(
  //     "Create aliases for some/all of the listed browsers?\n"
  //   );
  //   if (keepGoing) {
  //     browsersConfig = getBrowserAliases(browsers);
  //   }
}
