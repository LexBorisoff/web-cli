export interface Profile {
  profile: string; // same as dir
  alias?: string | string[];
  path?: string;
}

export interface BrowserProfiles {
  [key: string]: Profile;
}

export interface ProfilesConfig {
  [key: string]: BrowserProfiles;
}
