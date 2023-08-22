import { getDataArgs, getQueryArgs } from "./args";
import { getDefaultsData } from "../data";
import { urlPattern } from "../helpers/patterns";

const { _: args, route } = getQueryArgs();
const defaults = getDefaultsData();

const withEngine = getDataArgs.engine().length > 0;

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

const withRoute = route != null;

const withURL =
  args.length > 0 && args.every((arg) => urlPattern.test(`${arg}`));

const withValues = args.some((arg) => !urlPattern.test(`${arg}`));

export { withEngine, withProfile, withRoute, withURL, withValues };
