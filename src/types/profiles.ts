export interface Profile {
  directory: string; // --profile-directory
  alias?: string | string[];
  path?: string;
}

export interface BrowserProfiles {
  [key: string]: Profile;
}

export interface ProfilesConfig {
  [key: string]: BrowserProfiles;
}
