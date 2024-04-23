import { getDefaultsData } from "../data/get-defaults-data.js";
import { urlPattern } from "../helpers/utils/patterns.js";
import { getDataArgs } from "./args/get-data-args.js";
import { getQueryArgs } from "./args/get-query-args.js";

const { _: args } = getQueryArgs();
const defaults = getDefaultsData();

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

const withURLsOnly =
  args.length > 0 && args.every((arg) => urlPattern.test(`${arg}`));

export { withProfile, withURLsOnly };
