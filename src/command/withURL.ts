import { getArgs } from "./args";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getArgs();

const withURL =
  args.length > 0 && args.every((arg) => urlPattern.test(`${arg}`));

export default withURL;
