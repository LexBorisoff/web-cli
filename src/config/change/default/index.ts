import chalk from "chalk";
import defaultBrowser from "./browser";
import defaultProfile from "./profile";
import defaultEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { configTypes, ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function defaultType(configType?: ConfigType): Promise<boolean> {
  switch (configType) {
    case ConfigType.browser:
      return defaultBrowser();
    case ConfigType.profile:
      return defaultProfile();
    case ConfigType.engine:
      return defaultEngine();
    default:
      return false;
  }
}

export default async function defaultConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return defaultType(configType);
  }

  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellowBright("default")} do you want to change?\n`
  );

  answer != null && emptyLine();
  return defaultType(answer);
}
