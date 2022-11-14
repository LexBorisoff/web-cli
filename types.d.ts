declare module "types/browser" {
  export interface Profiles {
    [key: string]: string;
  }

  export interface Browser {
    enable: boolean;
    profiles: BrowserProfiles;
  }

  export interface Browsers {
    [key: string]: Browser;
  }
}

// declare module "search" {
//   export type SearchEngineName =
//     | "google"
//     | "youtube"
//     | "duckduckgo"
//     | "mdn"
//     | "npm"
//     | "cdn"
//     | "css"
//     | "whois"
//     | "namecheap"
//     | "godaddy"
//     | "unsplash"
//     | "pexels"
//     | "burst"
//     | "investopedia"
//     | "amazon";

//   export interface SearchEngineObject {
//     url: string;
//     query: string;
//     package?: string;
//     alias?: string | string[];
//   }

//   export interface SearchEngines {
//     [index: string]: SearchEngineObject;
//   }
// }
