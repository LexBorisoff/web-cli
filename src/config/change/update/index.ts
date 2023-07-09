import chalk from "chalk";
import updateBrowser from "./browser";
import updateProfile from "./profile";
import updateEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { configTypes, ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function updateType(configType?: ConfigType): Promise<boolean> {
  switch (configType) {
    case ConfigType.browser:
      return updateBrowser();
    case ConfigType.profile:
      return updateProfile();
    case ConfigType.engine:
      return updateEngine();
    default:
      return false;
  }
}

export default async function updateConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return updateType(configType);
  }

  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellowBright("config")} do you want to update?\n`
  );

  answer != null && emptyLine();
  return updateType(answer);
}
