import getArgs from "./getArgs";

const { engine } = getArgs();
const hasEngine = engine != null && engine !== "";

export default hasEngine;
