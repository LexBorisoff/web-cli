import getArgs from "./getArgs";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getArgs();
const withWebsite = args.filter((arg) => urlPattern.test(`${arg}`)).length > 0;

export default withWebsite;
