import * as path from "node:path";
import "dotenv/config";
import {
  print,
  printError,
  printWarning,
  severity,
} from "../../helpers/print/severity.js";
import { loading } from "../../helpers/utils/loading.js";
import { promptText } from "../../helpers/utils/prompts.js";
import { printInstructions } from "./print-instructions.js";
import { createProjectDir } from "./create-project-dir.js";
import { createProjectFiles } from "./create-project-files.js";
import { initializeProject } from "./initialize-project.js";

export async function createConfigProject() {
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
    await initializeProject.git();
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
        await initializeProject.npm();
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
