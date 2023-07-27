import chalk from "chalk";
import { print } from "../helpers/print";

export const printFormat = {
  init: function formatInit(): void {
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright("--config init [directory]")}"`
      )
    );
  },
  link: function formatLink(): void {
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright("--config link <filename>")}"`
      )
    );
  },
  open: function formatOpen(): void {
    print(
      chalk.gray(`Use "${chalk.cyanBright("--config open [app]")}" to open it`)
    );
  },
  cache: function formatCache(): void {
    print(
      chalk.gray(
        `Use one of the formats:\n${chalk.cyanBright(
          "--config cache [clear]"
        )}\n${chalk.cyanBright(
          "--config cache <filename>"
        )}\n${chalk.cyanBright("--config cache export [filename]")}`
      )
    );
  },
};
