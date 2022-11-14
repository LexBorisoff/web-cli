declare module "args" {
  interface Choices {
    browsers: string[];
    engines: string[];
  }
}

declare module "browser" {
  interface BrowserProfiles {
    [key: string]: string;
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
