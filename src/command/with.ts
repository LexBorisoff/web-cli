import { matchers } from "@lexjs/browser-search/matchers";
import { getDefaultsData } from "../data/get-defaults-data.js";
import { getDataArgs } from "./args/get-data-args.js";

const defaults = getDefaultsData();

function withProfile(browserName: string): boolean {
  return (
    getDataArgs.profile(browserName).length > 0 ||
    defaults.profile(browserName) != null
  );
}

function withUrlsOnly(args: (string | number)[]): args is string[] {
  return (
    args.length > 0 && args.every((keyword) => matchers.url.test(`${keyword}`))
  );
}

export { withProfile, withUrlsOnly };
