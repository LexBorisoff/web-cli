import { matchers } from "@lexjs/browser-search/matchers";
import { getDefaultsData } from "../data/get-defaults-data.js";
import { getDataArgs } from "./args/get-data-args.js";
import { queryArgs } from "./args/query-args.js";

const { _: keywords } = queryArgs;
const defaults = getDefaultsData();

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

const withURLsOnly =
  keywords.length > 0 &&
  keywords.every((keyword) => matchers.url.test(`${keyword}`));

export { withProfile, withURLsOnly };
