import getConfigData from "./getConfigData";
import { ProfilesConfig } from "../types/data.types";

export default async function getProfilesData(): Promise<ProfilesConfig> {
  const config = await getConfigData();
  return config?.profiles ?? {};
}
