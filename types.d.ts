declare module "defaults" {
  import { BrowserProfiles } from "browser";

  interface Defaults {
    engine: string;
    delimiter: string;
    browser?: string;
    profile?: BrowserProfiles;
  }
}

declare module "browser" {
  interface BrowserProfile {
    dir: string;
    alias?: string | string[];
  }

  interface BrowserProfiles {
    [key: string]: string | BrowserProfile;
  }

  interface Browser {
    enable: boolean;
    alias?: string | string[];
    profiles: BrowserProfiles;
  }

  interface BrowsersConfig {
    [key: string]: Browser;
  }
}

declare module "engine" {
  interface Engine {
    url: string;
    query: string;
    package?: string;
    delimiter?: string;
    alias?: string | string[];
  }

  interface EnginesConfig {
    [index: string]: Engine;
  }
}
