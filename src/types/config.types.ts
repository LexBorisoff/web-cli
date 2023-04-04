import { BrowsersConfig } from "./data.types";

export type ChangeCommand = "add" | "update" | "delete";
export type ConfigType = "default" | "browser" | "profile";

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
