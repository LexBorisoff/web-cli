import chalk from "chalk";

export const print = console.log;
export const printInfo = (message: string) => print(chalk.cyanBright(message));
export const printSuccess = (message: string) =>
  print(chalk.greenBright(message));
export const printWarning = (message: string) =>
  print(chalk.yellowBright(message));
export const printError = (message: string) => print(chalk.redBright(message));
