import * as path from "node:path";
import "dotenv/config";
import { logger } from "../../helpers/utils/logger.js";
import { loading } from "../../helpers/utils/loading.js";
import { prompts } from "../../helpers/utils/prompts.js";
import { printInstructions } from "./print-instructions.js";
import { createProjectDir } from "./create-project-dir.js";
import { createProjectFiles } from "./create-project-files.js";
import { initializeProject } from "./initialize-project.js";
import { PackageManager } from "./package-manager/package-manager.enum.js";

export async function createConfigProject() {
  const { projectName } = await prompts.text({
    name: "projectName",
    message: "Project name",
    initial: "web-cli-config",
  });

  if (projectName == null) {
    return;
  }

  const { pm } = await prompts.select({
    name: "pm",
    message: "How to install dependencies",
    choices: [
      {
        title: PackageManager.NPM,
        value: PackageManager.NPM,
      },
      {
        title: PackageManager.YARN,
        value: PackageManager.YARN,
      },
      {
        title: PackageManager.PNPM,
        value: PackageManager.PNPM,
      },
    ],
  });

  if (pm == null) {
    return;
  }

  const parentPath = process.cwd();
  const projectPath = path.resolve(parentPath, projectName);

  logger();

  try {
    createProjectDir(projectPath);
    process.chdir(projectPath);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }

    return;
  }

  try {
    await initializeProject.git();
  } catch (error) {
    logger.warning("Could not initialize a git repository\n");
  }

  try {
    await loading(
      async (onCancel) => {
        process.on("SIGINT", () => {
          onCancel();
          process.exit();
        });

        await createProjectFiles(projectPath);
        await initializeProject.dependencies(projectName, pm);
      },
      {
        message: `⚡ Scaffolding ${logger.level.info(projectName)}`,
      }
    );

    logger(`🚀 Successfully created ${logger.level.success(projectName)}\n`);
    printInstructions(projectName, pm);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);
    }
  }
}
