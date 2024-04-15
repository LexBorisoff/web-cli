import { getDataArgs } from "./args/get-data-args.js";
import { getQueryArgs } from "./args/get-query-args.js";
import { getConfigArgs } from "./args/get-config-args.js";
import { getDefaultsData } from "../data/get-defaults-data.js";
import { urlPattern } from "../utils/index.js";

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

const withConfig = config != null;

export { withProfile, withURLsOnly, withConfig, update as withUpdate };
