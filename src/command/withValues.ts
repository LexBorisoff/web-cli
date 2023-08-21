import { getQueryArgs } from "./args";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getQueryArgs();

const withValues = args.some((arg) => !urlPattern.test(`${arg}`));

export default withValues;
