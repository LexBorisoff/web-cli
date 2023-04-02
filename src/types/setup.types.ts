export type ConfigCommand = "add" | "update" | "delete";
export type ConfigType = "default" | "browser" | "profile";

export interface PromptAnswer<T> {
  answer?: T;
}

export interface PromptChoice {
  title: string;
  value: string;
}

export type Severity = "neutral" | "info" | "success" | "warning" | "error";

export type ValidateFn = (
  value: string
) => boolean | string | Promise<boolean | string>;
