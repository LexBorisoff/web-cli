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