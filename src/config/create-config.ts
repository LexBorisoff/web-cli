import * as path from "node:path";
import "dotenv/config";
import {
  print,
  printError,
  printWarning,
  severity,
} from "../helpers/print/print-severity.js";
import { loading } from "./utils/loading.js";
import { promptText } from "./utils/prompts.js";
import { printInstructions } from "./create-config/print-instructions.js";
import { createProjectDir } from "./create-config/create-project-dir.js";
import { createProjectFiles } from "./create-config/create-project-files.js";
import { InitializeProject } from "./create-config/initialize-project.js";

export async function createConfig() {
  const { projectName } = await promptText({
    name: "projectName",
    message: "Project name",
    initial: "web-cli-config",
  });

  if (projectName == null) {
    return;
  }

  const parentPath = process.cwd();
  const projectPath = path.resolve(parentPath, projectName);

  print();

  try {
    createProjectDir(projectPath);
    process.chdir(projectPath);
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }

    return;
  }

  try {
    await InitializeProject.git();
  } catch (error) {
    printWarning("Could not initialize a git repository\n");
  }

  try {
    await loading(
      async (onCancel) => {
        process.on("SIGINT", () => {
          onCancel();
          process.exit();
        });

        await createProjectFiles(projectPath);
        await InitializeProject.npm();
      },
      {
        message: `⚡ Scaffolding ${severity.info(projectName)}`,
      }
    );

    print(`🚀 Successfully created ${severity.success(projectName)}\n`);
    printInstructions(projectName);
  } catch (error) {
    if (error instanceof Error) {
      printError(error.message);
    }
  }
}
