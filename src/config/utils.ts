import chalk from "chalk";
import { print } from "../helpers/print";

export const printFormat = {
  init: function formatInit() {
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright("--config init [directory]")}"`
      )
    );
  },
  link: function formatLink() {
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright("--config link <filename>")}"`
      )
    );
  },
  open: function formatOpen() {
    print(
      chalk.gray(`Use "${chalk.cyanBright("--config open [app]")}" to open it`)
    );
  },
  cache: function formatCache() {
    print(
      chalk.gray(
        `Use the format "${chalk.cyanBright(
          "--config cache [clear]"
        )}" or "${chalk.cyanBright("--config cache <filename>")}"`
      )
    );
  },
};
