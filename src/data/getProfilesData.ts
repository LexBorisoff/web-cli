import getConfigData from "./getConfigData";

export default async function getProfilesData() {
  const config = await getConfigData();
  return config?.profiles;
}
