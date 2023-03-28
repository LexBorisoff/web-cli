import { addConfig, updateConfig, deleteConfig } from "./changeCommands";
import { ConfigCommand, ConfigType } from "../types/configuration";

export default function changeConfigFile(
  command?: ConfigCommand,
  type?: ConfigType
) {
  if (command != null) {
    if (command === "add") {
      addConfig(type);
    } else if (command === "update") {
      updateConfig(type);
    } else if (command === "delete") {
      deleteConfig(type);
    }

    return;
  }

  console.log("step-by-step config");
}
