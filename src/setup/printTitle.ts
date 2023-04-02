import chalk from "chalk";
import { Severity } from "../types/setup.types";

const print = console.log;

export default function printTitle(
  title: string,
  severity: Severity = "neutral"
): void {
  const columnsLength = 2;
  let line = "";
  const lineLength = 70;
  for (let i = 0; i < lineLength; i++) {
    line += "=";
  }

  function printLine() {
    let color: typeof chalk.white;
    switch (severity) {
      case "info":
        color = chalk.cyan;
        break;
      case "success":
        color = chalk.green;
        break;
      case "warning":
        color = chalk.yellow;
        break;
      case "error":
        color = chalk.redBright;
        break;
      default:
        color = chalk.white;
    }

    print(color(line));
  }

  if (line.length - title.length - columnsLength <= 0) {
    printLine();
    print(title);
    printLine();
    return;
  }

  const spaces = line.length - title.length - columnsLength;
  const half = spaces % 2 === 0 ? spaces / 2 : spaces / 2 - 1;

  let spacesLeft = "";
  for (let i = 0; i < half; i++) {
    spacesLeft += " ";
  }

  let spacesRight = spacesLeft;
  if (spaces % 2 > 0) {
    spacesRight += " ";
  }

  const titleLine = `>${spacesLeft}${title}${spacesRight}<`;

  printLine();
  print(titleLine);
  printLine();
}
