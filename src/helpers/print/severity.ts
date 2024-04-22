import chalk from "chalk";

const info = chalk.cyan;
const success = chalk.green;
const warning = chalk.yellow;
const error = chalk.red;

export const severity = { info, success, warning, error };
export const print = console.log;
export const printInfo = (message: string) => print(info(message));
export const printSuccess = (message: string) => print(success(message));
export const printWarning = (message: string) => print(warning(message));
export const printError = (message: string) => print(error(message));
