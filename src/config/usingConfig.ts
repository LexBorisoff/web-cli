import { printInfo, emptyLine } from "../helpers/print";
import { getSettings } from "../helpers/config";

const settings = getSettings() ?? {};

export default function usingConfig(): void {
  const { config, linkedPath } = settings;

  if (config != null) {
    printInfo("cache");
  } else if (linkedPath != null && linkedPath !== "") {
    printInfo("linked");
  } else {
    printInfo("none");
  }

  emptyLine();
}
