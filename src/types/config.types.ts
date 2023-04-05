import { BrowsersConfig } from "./data.types";

export type ChangeCommand = "add" | "update" | "delete" | "default";
export type ConfigType = "browser" | "profile" | "engine";

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
