import chalk from "chalk";
import addBrowser from "./browser";
import addProfile from "./profile";
import addEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { configTypes, ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function addType(configType?: ConfigType): Promise<boolean> {
  switch (configType) {
    case ConfigType.browser:
      return addBrowser();
    case ConfigType.profile:
      return addProfile();
    case ConfigType.engine:
      return addEngine();
    default:
      return false;
  }
}

export default async function addConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return addType(configType);
  }

  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellowBright("config")} do you want to add?\n`
  );

  answer != null && emptyLine();
  return addType(answer);
}
