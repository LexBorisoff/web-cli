import chalk from "chalk";
import { getSettings } from "../helpers/config";
import { print, printWarning, emptyLine } from "../helpers/print";

const settings = getSettings() ?? {};

export default function whereConfig(): void {
  const { linkedPath } = settings;

  if (linkedPath == null || linkedPath === "") {
    printWarning("No config file is linked");
    print(
      `Use "${chalk.cyanBright(
        "--config link <filename>"
      )}" to link a config file`
    );
    emptyLine();
    return;
  }

  print(linkedPath);
  emptyLine();
}
