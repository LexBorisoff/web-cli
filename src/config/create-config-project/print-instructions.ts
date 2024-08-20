import chalk from "chalk";
import { logger } from "../../helpers/utils/logger.js";
import { PackageManager } from "./package-manager/package-manager.enum.js";
import { pmCommands } from "./package-manager/pm-commands.js";

export function printInstructions(projectName: string, pm: PackageManager) {
  const left = "  ";
  const { run } = pmCommands[pm];

  logger(
    left +
      `${logger.level.warning("1.")} Open ${logger.level.info(
        projectName
      )} in your IDE, e.g.`
  );
  logger(left + chalk.gray(`$ cd ${projectName}`));
  logger(left + chalk.gray(`$ code .`));
  logger();

  logger(
    left +
      `${logger.level.warning("2.")} Define config by editing ${logger.level.info(
        "engines.ts"
      )} and ${logger.level.info("browsers.ts")}`
  );

  logger();
  logger(
    left +
      `${logger.level.warning("3.")} Generate a ${logger.level.info(
        "JSON config file"
      )} (used by the CLI)`
  );
  const runCommand = run != null ? ` ${run}` : "";
  logger(left + chalk.gray(`$ ${pm}${runCommand} config`));

  logger();
  logger(
    left +
      `${logger.level.warning("4.")} Enjoy using the ${logger.level.info(
        "web"
      )} command 😎`
  );
}
