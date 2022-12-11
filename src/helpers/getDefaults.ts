import { DefaultsConfig } from "../types";
import { config } from "../data";

export default function getDefaults(): DefaultsConfig {
  const mainDefaults = {
    engine: "google",
    delimiter: " ",
  };
  return {
    ...mainDefaults,
    ...config.defaults,
  };
}
