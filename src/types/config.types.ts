import { BrowsersConfig } from "./data.types";

export type ConfigFileType = "config" | "engines";

export enum FileCommand {
  setup = "setup",
  open = "open",
  delete = "delete",
}
export const fileCommands = Object.values(FileCommand);

export enum ChangeCommand {
  add = "add",
  update = "update",
  remove = "remove",
  default = "default",
}
export const changeCommands = Object.values(ChangeCommand);

export enum ConfigType {
  browser = "browser",
  profile = "profile",
  engine = "engine",
}
export const configTypes = Object.values(ConfigType);

export interface PromptAnswer<T> {
  answer?: T;
}

export type TextAnswer = Partial<{ [key: string]: string | undefined }>;

export interface PromptChoice {
  title: string;
  value: string;
}

export type ValidateFn = (
  value: string
) => boolean | string | Promise<boolean | string>;

export type ChangeCommandFn = (configType?: ConfigType) => Promise<boolean>;

export interface InitialConfig {
  browsers: BrowsersConfig;
  defaultBrowser: string;
}
