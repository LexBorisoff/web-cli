import getArgs from "./getArgs";
import getEngineArgs from "./getEngineArgs";

const { engine } = getArgs();
const engineArgs = getEngineArgs();

const withEngine = (engine != null && engine !== "") || engineArgs.length > 0;

export default withEngine;
