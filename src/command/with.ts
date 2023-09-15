import { getDataArgs, getQueryArgs, getConfigArgs } from "./args";
import { getDefaultsData } from "../data";
import { urlPattern } from "../utilities";

const { _: args, route } = getQueryArgs();
const { config } = getConfigArgs();
const defaults = getDefaultsData();

const withEngine = getDataArgs.engine().length > 0;

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

const withRoute = route != null;

const withURLsOnly =
  args.length > 0 && args.every((arg) => urlPattern.test(`${arg}`));

const withKeywords = args.some((arg) => !urlPattern.test(`${arg}`));

const withConfig = config != null;

export {
  withEngine,
  withProfile,
  withRoute,
  withURLsOnly,
  withKeywords,
  withConfig,
};
