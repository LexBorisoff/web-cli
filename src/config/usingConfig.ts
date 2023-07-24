import { printInfo, emptyLine } from "../helpers/print";
import { getSettings } from "../helpers/config";

const settings = getSettings();

export default function usingConfig() {
  if (settings?.config != null) {
    printInfo("cache");
  } else if (settings?.link != null && settings?.link !== "") {
    printInfo("linked");
  } else {
    printInfo("none");
  }

  emptyLine();
}
