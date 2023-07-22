import getConfigData from "./getConfigData";
import { EnginesData } from "../types/config.types";

export default function getEnginesData(): EnginesData {
  const config = getConfigData();
  return config.engines ?? {};
}
