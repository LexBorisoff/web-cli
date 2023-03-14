import ConfigItem from "./configItem";

export interface Profile extends ConfigItem {
  directory: string; // --profile-directory
  path?: string;
}

export interface BrowserProfiles {
  [profile: string]: Profile;
}

export default interface ProfilesConfig {
  [browser: string]: BrowserProfiles;
}
