import DefaultsConfig from "./defaults";
import BrowsersConfig from "./browsers";
import ProfilesConfig from "./profiles";

export default interface Config {
  defaults?: DefaultsConfig;
  browsers?: BrowsersConfig;
  profiles?: ProfilesConfig;
}
