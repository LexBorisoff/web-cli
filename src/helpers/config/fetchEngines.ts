import axios from "axios";
import { writeEnginesFile } from "./file";
import { EnginesConfig } from "../../types/engines.types";

const url = "https://dev-query.lexborisoff.dev/api/engines";

export default async function fetchEngines(): Promise<EnginesConfig> {
  const { data: engines } = await axios.get<EnginesConfig>(url);
  writeEnginesFile(engines);
  return engines;
}
