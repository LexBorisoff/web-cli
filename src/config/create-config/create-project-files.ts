import * as fs from "node:fs";
import * as path from "node:path";
import { execa } from "execa";
import { fileContents } from "./file-contents.js";

interface File {
  fileName: string;
  contents: string;
}

type ConfigFile = "eslint" | "tsconfig" | "gitignore";
type SourceFile = "engines" | "browsers";

export const SRC_DIR = "src";
export const SRC_FILES: Record<SourceFile, File> = {
  engines: {
    fileName: `${SRC_DIR}/engines.ts`,
    contents: fileContents.enginesConfig,
  },
  browsers: {
    fileName: `${SRC_DIR}/browsers.ts`,
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
    const srcPath = path.resolve(this.#projectPath, SRC_DIR);
    fs.mkdirSync(srcPath);

    await Promise.all(
      Object.values(SRC_FILES).map((srcFile) => this.#createFile(srcFile))
    );

    await execa("npx", ["prettier", "--write", `${SRC_DIR}/*.ts`]);
  }

  async #createFile({ fileName, contents }: File): Promise<void> {
    const filePath = path.resolve(process.cwd(), fileName);
    fs.writeFileSync(filePath, contents);
  }
}

class CreateError extends Error {
  constructor(fileType: string) {
    super(`Could not create project ${fileType} CONFIG_FILES`);
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
