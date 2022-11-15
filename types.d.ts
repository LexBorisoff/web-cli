declare module "defaults" {
  import { BrowserProfiles } from "browser";

  interface Defaults {
    browser?: string;
    profile?: BrowserProfiles;
    engine?: string;
    delimiter?: string;
  }
}

declare module "args" {
  interface Choices {
    browsers: string[];
    engines: string[];
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
    profiles: BrowserProfiles;
  }

  interface Browsers {
    [key: string]: Browser;
  }
}

declare module "search" {
  interface SearchEngine {
    url: string;
    query: string;
    package?: string;
    delimiter?: string;
    alias?: string | string[];
  }

  interface SearchEngines {
    [index: string]: SearchEngine;
  }
}
