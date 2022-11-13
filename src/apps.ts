import open from "open";
import config from "../config.json";

function checkAppFromEnv(appPath?: string): string | undefined {
  return appPath && appPath !== "" ? appPath : undefined;
}

const chrome = checkAppFromEnv(config.browsers.chrome) ?? open.apps.chrome;
const edge = checkAppFromEnv(config.browsers.edge) ?? open.apps.edge;
const firefox = checkAppFromEnv(config.browsers.firefox) ?? open.apps.firefox;
const brave = checkAppFromEnv(config.browsers.brave);
const opera = checkAppFromEnv(config.browsers.opera);
const safari = checkAppFromEnv(config.browsers.safari);

export { chrome, edge, firefox, brave, opera, safari };
