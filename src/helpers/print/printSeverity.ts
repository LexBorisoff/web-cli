import chalk from "chalk";

export const info = chalk.cyanBright;
export const success = chalk.greenBright;
export const warning = chalk.yellowBright;
export const error = chalk.redBright;

export const print = console.log;
export const printInfo = (message: string) => print(info(message));
export const printSuccess = (message: string) => print(success(message));
export const printWarning = (message: string) => print(warning(message));
export const printError = (message: string) => print(error(message));
