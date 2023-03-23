import { Command, ConfigType } from "../types/configuration";

export default function updateConfig(command?: Command, type?: ConfigType) {
  if (command != null) {
    console.log(command, type);
    return;
  }

  console.log("step-by-step config");
}
