import getConfigData from "./getConfigData";

export default async function getBrowsersData() {
  const config = await getConfigData();
  return config?.browsers ?? [];
}
