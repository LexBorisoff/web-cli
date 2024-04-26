import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";
import { printError } from "../../helpers/print/severity.js";
import { fileContents } from "./file-contents.js";

interface File {
  fileName: string;
  contents: string;
}

type ConfigFile = "eslint" | "tsconfig" | "gitignore";
type SourceFile = "engines" | "browsers";

export const srcDir = "src";
export const srcFiles: Record<SourceFile, File> = {
  engines: {
    fileName: `${srcDir}/engines.ts`,
    contents: fileContents.enginesConfig,
  },
  browsers: {
    fileName: `${srcDir}/browsers.ts`,
    contents: fileContents.browsersConfig,
  },
} as const;

const CONFIG_FILES: Record<ConfigFile, File> = {
  eslint: {
    fileName: ".eslintrc.cjs",
    contents: fileContents.eslintrc,
  },
  tsconfig: {
    fileName: "tsconfig.json",
    contents: fileContents.tsconfig,
  },
  gitignore: {
    fileName: ".gitignore",
    contents: fileContents.gitignore,
  },
};

export class ProjectFilesBuilder {
  #projectPath: string;

  constructor(projectPath: string) {
    this.#projectPath = projectPath;
  }

  public async config() {
    await Promise.all(
      Object.values(CONFIG_FILES).map((configFile) =>
        this.#createFile(configFile)
      )
    );
  }

  public async src() {
    const srcPath = path.resolve(this.#projectPath, srcDir);

    try {
      fs.mkdirSync(srcPath);

      await Promise.all(
        Object.values(srcFiles).map((srcFile) => this.#createFile(srcFile))
      );

      await execa("npx", ["prettier", "--write", `${srcDir}/*.ts`]);
    } catch {
      printError(`Could not create directory "${srcDir}"`);
    }
  }

  async #createFile({ fileName, contents }: File): Promise<void> {
    const filePath = path.resolve(process.cwd(), fileName);
    try {
      fs.writeFileSync(filePath, contents);
    } catch {
      printError(`Could not write to file "${fileName}"`);
    }
  }
}

class CreateError extends Error {
  constructor(fileType: string) {
    super(`Could not create project ${fileType} files`);
  }
}

export async function createProjectFiles(projectPath: string) {
  const builder = new ProjectFilesBuilder(projectPath);

  try {
    await builder.config();
  } catch {
    throw new CreateError("config");
  }

  try {
    await builder.src();
  } catch {
    throw new CreateError("source");
  }
}
