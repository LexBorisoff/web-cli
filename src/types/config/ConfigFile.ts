import DefaultsConfig from "./Defaults";
import BrowsersConfig from "./Browsers";
import ProfilesConfig from "./Profiles";

export default interface ConfigFile {
  defaults: DefaultsConfig;
  browsers: BrowsersConfig;
  profiles: ProfilesConfig;
}
