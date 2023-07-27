import getArgs from "./getArgs";
import { urlPattern } from "../helpers/patterns";

const { _: args } = getArgs();

const withURL = args.every((arg) => urlPattern.test(`${arg}`));

export default withURL;
