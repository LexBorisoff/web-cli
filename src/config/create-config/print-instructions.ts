import chalk from "chalk";
import { print, severity } from "../../helpers/print/print-severity.js";

export function printInstructions(projectName: string) {
  const left = "  ";

  print(
    left +
      `${severity.warning("1.")} Open ${severity.info(projectName)} in your IDE, e.g.`
  );
  print();
  print(left + chalk.gray(`$ cd ${projectName}`));
  print(left + chalk.gray(`$ code .`));
  print();

  print(
    left +
      `${severity.warning("2.")} Define config by editing ${severity.info(
        "engines.ts"
      )} and ${severity.info("browsers.ts")}`
  );

  print();
  print(
    left +
      `${severity.warning("3.")} Generate a ${severity.info(
        "JSON config file"
      )} (used by the CLI)`
  );
  print();
  print(left + chalk.gray(`$ npm run config`));

  print();
  print(
    left +
      `${severity.warning("4.")} Enjoy using the ${severity.info(
        "web"
      )} command 😎`
  );
}
