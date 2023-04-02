import { addConfig, updateConfig, deleteConfig } from "./changeCommands";
import printTitle from "./printTitle";
import emptyLine from "../helpers/emptyLine";
import { ConfigCommand, ConfigType } from "../types/setup.types";

export default async function changeConfigFile(
  command?: ConfigCommand,
  type?: ConfigType
) {
  emptyLine();
  printTitle("Changing config...");
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

  if (success) {
    emptyLine();
    printTitle("Config is successfully changed!");
  }
}
