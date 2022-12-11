import { DefaultsConfig } from "types";
import config from "./config";
const defaultsConfig = config.defaults;

const defaults: DefaultsConfig = {
  engine: "google",
  delimiter: " ",
  ...defaultsConfig,
};

export default defaults;
