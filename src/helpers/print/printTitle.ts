import chalk from "chalk";
import type { Severity, BannerType } from "../../types/utility";

const print = console.log;

export default function printTitle(
  title: string,
  titleType: BannerType,
  severity: Severity = "neutral"
): void {
  const columnsLength = 2;
  let line = "";
  let doubleLine = "";
  const lineLength = 70;
  for (let i = 0; i < lineLength; i++) {
    line += "~";
    doubleLine += "=";
  }

  function printLine(double: boolean) {
    let color: typeof chalk.white;
    switch (severity) {
      case "info":
        color = chalk.cyan;
        break;
      case "success":
        color = chalk.green;
        break;
      case "warning":
        color = chalk.yellowBright;
        break;
      case "error":
        color = chalk.redBright;
        break;
      default:
        color = chalk.white;
    }

    print(color(double ? doubleLine : line));
  }

  function isDoubleLine(checkTitleType: BannerType): boolean {
    return titleType === "neutral" || titleType === checkTitleType;
  }

  if (line.length - title.length - columnsLength <= 0) {
    printLine(isDoubleLine("header"));
    print(title);
    printLine(isDoubleLine("footer"));
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

  printLine(isDoubleLine("header"));
  print(titleLine);
  printLine(isDoubleLine("footer"));
}
