import chalk from "chalk";
import updateBrowser from "./browser";
import updateProfile from "./profile";
import updateEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function updateType(configType?: ConfigType): Promise<boolean> {
  if (configType === "browser") {
    return updateBrowser();
  } else if (configType === "profile") {
    return updateProfile();
  } else if (configType === "engine") {
    return updateEngine();
  }

  return false;
}

export default async function updateConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return updateType(configType);
  }

  const configTypes: ConfigType[] = ["browser", "profile", "engine"];
  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellow("config")} do you want to update?\n`
  );

  emptyLine();
  return updateType(answer);
}
