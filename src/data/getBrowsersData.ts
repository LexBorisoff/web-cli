import getConfig from "./getConfigData";

export default async function getBrowsersData() {
  const config = await getConfig();
  return config?.browsers ?? [];
}
