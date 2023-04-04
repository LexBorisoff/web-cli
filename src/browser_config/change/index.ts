import addConfig from "./add";
import updateConfig from "./update";
import deleteConfig from "./delete";
import printTitle from "../../helpers/printTitle";
import emptyLine from "../../helpers/emptyLine";
import { ConfigCommand, ConfigType } from "../../types/setup.types";

export default async function changeConfig(
  command?: ConfigCommand,
  type?: ConfigType
) {
  emptyLine();
  printTitle("Changing config...", "info");
  emptyLine();

  let success = false;

  if (command != null) {
    if (command === "add") {
      success = await addConfig(type);
    } else if (command === "update") {
      success = await updateConfig(type);
    } else if (command === "delete") {
      success = await deleteConfig(type);
    }
  } else {
    console.log("step-by-step config");
  }

  const message: string = success
    ? "Config is successfully changed!"
    : "Config was not changed";
  const severity: Parameters<typeof printTitle>[1] = success
    ? "success"
    : "error";

  emptyLine();
  printTitle(message, severity);
}
