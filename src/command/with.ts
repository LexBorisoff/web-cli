import { getDefaultsData } from "../data/get-defaults-data.js";
import { urlPattern } from "../utils/patterns.js";
import { getDataArgs } from "./args/get-data-args.js";
import { getQueryArgs } from "./args/get-query-args.js";
import { getConfigArgs } from "./args/get-config-args.js";

const { _: args, update } = getQueryArgs();
const { config } = getConfigArgs();
const defaults = getDefaultsData();

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

const withURLsOnly =
  args.length > 0 && args.every((arg) => urlPattern.test(`${arg}`));

const withConfig = !!config;

export { withProfile, withURLsOnly, withConfig, update as withUpdate };
