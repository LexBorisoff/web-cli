import { getQueryArgs } from "./args";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getQueryArgs();

const withSearchQuery = args.some((arg) => !urlPattern.test(`${arg}`));

export default withSearchQuery;
