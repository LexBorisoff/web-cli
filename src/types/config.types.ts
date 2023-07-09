import { BrowsersConfig } from "./data.types";

export type ConfigFileType = "config" | "engines";

export enum ChangeCommand {
  add = "add",
  update = "update",
  delete = "delete",
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
