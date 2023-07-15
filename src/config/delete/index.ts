import * as fs from "fs";
import chalk from "chalk";
import getConfigArgs from "../../command/getConfigArgs";
import { getFileName, fileExists } from "../../helpers/config";
import { cliPrompts } from "../../helpers/prompts";
import { printSuccess, printError, emptyLine } from "../../helpers/print";

const configFileName = getFileName("config");
const { force } = getConfigArgs();
const { toggle } = cliPrompts;

export default async function deleteConfig() {
  if (configFileName != null && fileExists("config")) {
    let continueToDelete = force;
    if (!continueToDelete) {
      continueToDelete = await toggle(
        `${chalk.yellow("Are you sure you want to delete the config file?\n")}`,
        false
      );
    }

    if (continueToDelete) {
      fs.unlinkSync(configFileName);
      printSuccess("Deleted!\n");
    }
  } else {
    printError("There is no config file to delete.\n");
  }
}
