import { getDataArgs, getQueryArgs, getConfigArgs } from "./args/index.js";
import { getDefaultsData } from "../data/index.js";
import { urlPattern } from "../utilities/index.js";

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
