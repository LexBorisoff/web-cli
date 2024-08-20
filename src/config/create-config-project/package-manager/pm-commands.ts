import { PackageManager } from "./package-manager.enum.js";

export interface PmCommand {
  install: string;
  saveDev: string;
  run?: string;
}

export const pmCommands: Record<PackageManager, PmCommand> = {
  [PackageManager.NPM]: {
    install: "install",
    saveDev: "--save-dev",
    run: "run",
  },
  [PackageManager.PNPM]: {
    install: "add",
    saveDev: "--save-dev",
    run: "run",
  },
  [PackageManager.YARN]: {
    install: "add",
    saveDev: "--dev",
  },
};
