import chalk from "chalk";
import deleteEngine from "./engine";
import deleteBrowser from "./browser";
import deleteProfile from "./profile";
import { cliPrompts } from "../../../helpers/prompts";
import { emptyLine } from "../../../helpers/print";
import { ConfigType } from "../../../types/config.types";

const { select } = cliPrompts;

async function deleteType(configType?: ConfigType): Promise<boolean> {
  if (configType === "engine") {
    return deleteEngine();
  } else if (configType === "browser") {
    return deleteBrowser();
  } else if (configType === "profile") {
    return deleteProfile();
  }

  return false;
}

export default async function deleteConfig(
  configType?: ConfigType
): Promise<boolean> {
  if (configType != null) {
    return deleteType(configType);
  }

  const configTypes: ConfigType[] = ["browser", "profile", "engine"];
  const answer = await select<ConfigType>(
    configTypes,
    `What ${chalk.yellow("config")} do you want to update?\n`
  );

  emptyLine();
  return deleteType(answer);
}
