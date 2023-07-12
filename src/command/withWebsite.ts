import getArgs from "./getArgs";
import { baseUrlPattern } from "../helpers/patterns";

const { _: args } = getArgs();
const withWebsite =
  args.filter((arg) => baseUrlPattern.test(`${arg}`)).length > 0;

export default withWebsite;
