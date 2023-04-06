import chalk from "chalk";
import addBrowser from "./browser";
import addProfile from "./profile";
import addEngine from "./engine";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function addType(configType?: ConfigType): Promise<boolean> {
  if (configType === "browser") {
    return addBrowser();
  } else if (configType === "profile") {
    return addProfile();
  } else if (configType === "engine") {
    return addEngine();
  }

  return false;
}

export default async function addConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return addType(configType);
  }

  const configTypes: ConfigType[] = ["browser", "profile", "engine"];
  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellow("config")} do you want to add?\n`
  );

  emptyLine();
  return addType(answer);
}
