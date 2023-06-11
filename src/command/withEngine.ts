import getArgs from "./getArgs";

const { engine } = getArgs();
const withEngine = engine != null && engine !== "";

export default withEngine;
