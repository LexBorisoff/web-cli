import chalk from "chalk";
import deleteBrowser from "./browser";
import deleteProfile from "./profile";
import deleteEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { configTypes, ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function deleteType(configType?: ConfigType): Promise<boolean> {
  switch (configType) {
    case ConfigType.browser:
      return deleteBrowser();
    case ConfigType.profile:
      return deleteProfile();
    case ConfigType.engine:
      return deleteEngine();
    default:
      return false;
  }
}

export default async function deleteConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return deleteType(configType);
  }

  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellowBright("config")} do you want to update?\n`
  );

  emptyLine();
  return deleteType(answer);
}
