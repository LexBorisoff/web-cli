import type { Answers, Choice, PromptObject } from "prompts";
import type { OmitKey } from "./omit-key.type.js";

export type SelectConfig<Name extends string = string> = OmitKey<
  PromptObject<Name>,
  "type"
> &
  Required<Pick<PromptObject<Name>, "message">>;

export type SelectReturn<
  C extends Choice,
  Name extends string = string,
> = Promise<
  OmitKey<Answers<Name>, Name> & { [P in Name]: C["value"] | undefined }
>;

export type TextConfig<Name extends string> = OmitKey<
  PromptObject<Name>,
  "type"
>;

export type TextReturn<Name extends string> = Promise<
  OmitKey<Answers<Name>, Name> & { [P in Name]: string | undefined }
>;

export interface ToggleOptions<Name extends string> {
  name: Name;
  message: string;
  active?: string;
  inactive?: string;
  initial?: boolean;
}

export type ToggleReturn<Name extends string> = Promise<{
  [K in Name]: boolean;
}>;
