export interface Profile {
  directory: string; // --profile-directory
  alias?: string | string[];
  path?: string;
}

export interface BrowserProfiles {
  [profile: string]: Profile;
}

export default interface ProfilesConfig {
  [browser: string]: BrowserProfiles;
}
