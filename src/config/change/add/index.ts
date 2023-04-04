import chalk from "chalk";
import addDefault from "./addDefault";
import addBrowser from "./addBrowser";
import addProfile from "./addProfile";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function addType(configType?: ConfigType): Promise<boolean> {
  if (configType === "default") {
    return addDefault();
  } else if (configType === "browser") {
    return addBrowser();
  } else if (configType === "profile") {
    return addProfile();
  }

  return false;
}

export default async function addConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return addType(configType);
  }

  const configTypes: ConfigType[] = ["default", "browser", "profile"];
  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellow("config")} do you want to add?\n`
  );

  emptyLine();
  return addType(answer);
}
