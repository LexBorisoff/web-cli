import getConfigData from "./getConfigData";
import { ProfilesConfig } from "../types/data.types";

export default function getProfilesData(): ProfilesConfig {
  const config = getConfigData();
  return config?.profiles ?? {};
}
