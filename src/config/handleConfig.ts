import * as fs from "fs";
import { getConfigPath } from "../helpers/config";
import { severity } from "../helpers/print";

const configPath = getConfigPath();

function createConfigDirectory(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.mkdir(configPath, { recursive: true }, (error) => {
      if (error != null) {
        reject(new Error("Could not create config folder."));
      } else {
        resolve(true);
      }
    });
  });
}

export default async function handleConfig() {
  let configExists = fs.existsSync(configPath);

  if (!configExists) {
    try {
      configExists = await createConfigDirectory();
    } catch (error) {
      if (error instanceof Error) {
        console.error(severity.error(error.message));
      }
    }
  }

  if (configExists) {
    //
  }
}
