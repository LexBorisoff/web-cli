import getArgs from "./getArgs";
import { baseUrlPattern } from "../helpers/patterns";

const { _: args } = getArgs();
const withSearchQuery =
  args.filter((arg) => !baseUrlPattern.test(`${arg}`)).length > 0;

export default withSearchQuery;
