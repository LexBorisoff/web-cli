import { EnginesConfig } from "../types";
import config from "./config";

const engines: EnginesConfig = config.engines;
const defaultEngine = "google";

export default engines;
export { defaultEngine };
