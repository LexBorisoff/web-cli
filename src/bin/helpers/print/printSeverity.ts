import chalk from "chalk";

const info = chalk.cyanBright;
const success = chalk.greenBright;
const warning = chalk.yellowBright;
const error = chalk.redBright;

export const severity = { info, success, warning, error };
export const print = console.log;
export const printInfo = (message: string) => print(info(message));
export const printSuccess = (message: string) => print(success(message));
export const printWarning = (message: string) => print(warning(message));
export const printError = (message: string) => print(error(message));
