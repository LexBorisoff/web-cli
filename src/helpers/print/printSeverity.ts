import chalk from "chalk";

export const printInfo = (message: string) => console.log(chalk.cyan(message));
export const printSuccess = (message: string) =>
  console.log(chalk.green(message));
export const printWarning = (message: string) =>
  console.log(chalk.yellowBright(message));
export const printError = (message: string) =>
  console.log(chalk.redBright(message));
