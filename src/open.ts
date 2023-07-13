import open from "open";
import { getFileName } from "./helpers/config/file";
import getArgs from "./command/getArgs";

const configFile = getFileName("config");
const { _: args } = getArgs();

if (configFile != null) {
  if (args.length > 0) {
    args.forEach((arg) => {
      open(configFile, { app: { name: `${arg}` } });
    });
  } else {
    open(configFile);
  }
}
