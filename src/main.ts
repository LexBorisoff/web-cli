import open, { openApp, apps } from "open";
import URLs from "./URLs.js";

export interface Engine {
  name: string;
  url: string;
  query?: string;
  routes?: {
    [route: string]: string;
  };
  delimiter?: string;
}

export interface Browser {
  name: string;
  profileDirectory?: string | string[];
}

export type Keyword = string | number;

export interface QueryOptions {
  keywords?: Keyword[];
  browser?: Browser | Browser[] | null;
  engine?: Engine | Engine[] | null;
  defaultEngine?: Engine | null;
  route?: string | string[];
  address?: string | string[];
  incognito?: boolean;
  split?: boolean;
  http?: boolean;
}

export default class WebSearch extends URLs {
  public open(): void {
    let browserList: Browser[] = [];
    if (this.browser != null) {
      browserList = Array.isArray(this.browser) ? this.browser : [this.browser];
    }

    // browser(s) provided in args
    if (browserList.length > 0) {
      browserList.forEach((browser) => {
        this.openBrowser(browser);
      });
      return;
    }

    // no browser but has urls
    if (this.urls.length > 0) {
      this.urls.forEach((url) => {
        open(url);
      });
    }
  }

  private openBrowser({ name: browserName, profileDirectory }: Browser) {
    const browserAppName = this.getBrowserAppName(browserName);
    let profiles: string[] = [];
    if (profileDirectory != null) {
      profiles = Array.isArray(profileDirectory)
        ? profileDirectory
        : [profileDirectory];
    }

    const handleOpen = (handler: (browserArguments: string[]) => void) => {
      if (profiles.length > 0) {
        profiles.forEach((directory) => {
          const browserArguments = this.getBrowserArguments(
            browserName,
            directory
          );

          handler(browserArguments);
        });
      } else {
        const browserArguments = this.getBrowserArguments(browserName);
        handler(browserArguments);
      }
    };

    // open URLs
    if (this.urls.length > 0) {
      this.urls.forEach((url) => {
        handleOpen((browserArguments) => {
          open(url, {
            app: { name: browserAppName, arguments: browserArguments },
          });
        });
      });
    }
    // open empty browser
    else {
      handleOpen((browserArguments) => {
        openApp(browserAppName, { arguments: browserArguments });
      });
    }
  }

  private getBrowserAppName(browserName: string) {
    switch (browserName.toLowerCase()) {
      case "chrome":
        return apps.chrome;
      case "firefox":
        return apps.firefox;
      case "edge":
        return apps.edge;
      default:
        return browserName;
    }
  }

  private getBrowserArguments(
    browserName?: string,
    profileDirectory: string | null = null
  ) {
    const browserArguments: string[] = [];

    if (profileDirectory != null) {
      browserArguments.push(`--profile-directory=${profileDirectory}`);
    }

    if (this.incognito) {
      let incognitoValue = "incognito";
      if (browserName === "edge") {
        incognitoValue = "inprivate";
      } else if (browserName === "firefox" || browserName === "opera") {
        incognitoValue = "private";
      }
      browserArguments.push(`--${incognitoValue}`);
    }

    return browserArguments;
  }
}
