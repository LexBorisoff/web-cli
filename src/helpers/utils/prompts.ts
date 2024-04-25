import $_ from "prompts";
import type { Choice, Options } from "prompts";
import type {
  SelectConfig,
  SelectReturn,
  TextConfig,
  TextReturn,
  ToggleOptions,
  ToggleReturn,
} from "../../types/prompts.types.js";

export const prompts = {
  select<C extends Choice, Name extends string = string>(
    choices: C[],
    config: SelectConfig<Name>,
    options?: Options
  ): SelectReturn<C, Name> {
    return $_({ ...config, type: "select", choices }, options);
  },

  text<Name extends string = string>(
    config: TextConfig<Name>,
    options?: Options
  ): TextReturn<Name> {
    return $_({ ...config, type: "text" }, options);
  },

  toggle<Name extends string>({
    name,
    message,
    active = "yes",
    inactive = "no",
    initial = false,
  }: ToggleOptions<Name>): ToggleReturn<Name> {
    return $_({
      type: "toggle",
      name,
      message,
      initial,
      active,
      inactive,
    });
  },

  multiselect() {
    return $_({
      type: "multiselect",
      name: "",
    });
  },
};
