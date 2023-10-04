import Options, { type Engine, type QueryOptions } from "./Options.js";

const trailingSlash = /\/$/;
const leadingSlash = /^\//;
const urlPattern = /^(https?:\/\/)?([A-Za-z0-9]+\.)+[a-z]{2,}\/?/is;

const defaultEngine = {
  name: "Google",
  url: "google.com",
  query: "search?q=",
};

function removeLeadingSlash(value: string): string {
  return leadingSlash.test(value) ? value.substring(1) : value;
}

function removeTrailingSlash(value: string): string {
  return trailingSlash.test(value)
    ? value.substring(0, value.length - 1)
    : value;
}

function removeProtocol(url: string) {
  return url.startsWith("http") && url.includes("://")
    ? url.split("://")[1]
    : url;
}

function addTrailingSlash(value: string): string {
  return trailingSlash.test(value) ? value : `${value}/`;
}

export default class URLs extends Options {
  public urls: string[] = [];

  public get bareEngines(): string[] {
    return this._bareEngines;
  }

  constructor(options: QueryOptions) {
    super(options);
    this.setUrls();
  }

  private get urlKeywords(): string[] {
    return this.keywords.filter((keyword) => urlPattern.test(keyword));
  }

  private get nonUrlKeywords(): string[] {
    return this.keywords.filter((keyword) => !urlPattern.test(keyword));
  }

  private get withKeywords(): boolean {
    return this.keywords.some((keyword) => !urlPattern.test(keyword));
  }

  private get withUrlsOnly(): boolean {
    return (
      this.keywords.length > 0 &&
      this.keywords.every((keyword) => urlPattern.test(keyword))
    );
  }

  private _bareEngines: string[] = [];

  private setUrls(): void {
    const urls: string[] = [];

    let engineList: Engine[] = [];
    if (this.engine != null) {
      engineList = Array.isArray(this.engine) ? this.engine : [this.engine];
    }

    // address
    if (this.address != null) {
      const addressUrls: string[] = [];

      // multiple addresses
      if (Array.isArray(this.address)) {
        this.address
          .filter((address) => address !== "")
          .forEach((address) => {
            addressUrls.push(...this.urlRouteQuery(address));
          });
      }
      // single address
      else if (this.address != null && this.address !== "") {
        addressUrls.push(...this.urlRouteQuery(this.address));
      }

      // handle ports for each address URL
      urls.push(
        ...addressUrls.reduce<string[]>((list, addressUrl) => {
          list.push(...this.handlePort(addressUrl));
          return list;
        }, [])
      );
    }

    const condition = {
      // no address OR address without routes
      address: this.address == null || this.route == null,
      // keywords or URLs
      keywordsOrUrls: this.withKeywords || this.withUrlsOnly,
    };

    if (
      this.engine != null ||
      (condition.address && condition.keywordsOrUrls)
    ) {
      if (engineList.length > 0) {
        engineList.forEach((currentEngine) => {
          urls.push(...this.createUrls(currentEngine));
        });
      } else {
        urls.push(...this.createUrls());
      }
    }

    this.urls = this.handleProtocol(urls);
  }

  /**
   * Returns a list of constructed URLs based on the engine
   * or the URL argument(s)
   *
   * @param engine
   * if not provided, the default engine is used
   */
  private createUrls(engineOption?: Engine | null): string[] {
    const engine = engineOption ?? this.defaultEngine ?? defaultEngine;

    // route
    if (this.route != null) {
      // query routes of the provided URLs
      if (this.withUrlsOnly) {
        const urls = this.urlKeywords.reduce<string[]>((list, url) => {
          list.push(...this.urlRouteQuery(url, true));
          return list;
        }, []);

        return urls.reduce<string[]>((list, url) => {
          list.push(...this.handlePort(url));
          return list;
        }, []);
      }

      // query engine routes
      if (this.keywords.length > 0) {
        return this.keywords.reduce<string[]>((list, keyword) => {
          list.push(...this.engineRouteQuery(engine, keyword));
          return list;
        }, []);
      }

      // access engine routes
      return this.engineRouteQuery(engine);
    }

    // URL
    if (this.withUrlsOnly) {
      // search engine query with URLs as part of the search query
      if (engineOption != null) {
        return this.searchQuery(engineOption, this.urlKeywords);
      }

      // full URLs based on the provided URL args
      return this.urlKeywords.reduce<string[]>((list, website) => {
        list.push(...this.handlePort(website));
        return list;
      }, []);
    }

    // search query
    if (this.withKeywords) {
      return this.searchQuery(engine);
    }

    // engine only
    return this.handlePort(engine.url);
  }

  private addBareEngine(bareEngine: string) {
    if (!this._bareEngines.includes(bareEngine)) {
      this._bareEngines.push(bareEngine);
    }
  }

  /**
   * Returns a list of base URLs with port numbers
   * (if --port option was provided), and without the protocol
   */
  private handlePort(baseUrl: string): string[] {
    const pattern = /:(\d{1,5})/;
    const noSlashUrl = removeTrailingSlash(baseUrl);
    const noProtocolUrl = removeProtocol(noSlashUrl);

    function hasPort(): boolean {
      return pattern.test(baseUrl);
    }

    function addPort(port: number): string {
      // provided URL includes a port
      const matches = noProtocolUrl.match(pattern);
      if (matches != null) {
        const [, urlPort] = matches;

        // remove the port from the string if it does not match
        const index = noProtocolUrl.indexOf(":");
        if (urlPort !== port.toString() && index >= 0) {
          const noPortUrl = noProtocolUrl.substring(0, index);
          // 1 is to account for the length of ":"
          const afterPort = noProtocolUrl.substring(index + 1 + urlPort.length);
          return `${noPortUrl}:${port}${afterPort}`;
        }

        // return the provided URL if port matches what's in the string
        return noProtocolUrl;
      }

      // provided URL does not include a port
      const slashIndex = noProtocolUrl.indexOf("/");
      const hostName =
        slashIndex > 0 ? noProtocolUrl.substring(0, slashIndex) : noProtocolUrl;
      const pathName =
        slashIndex > 0 ? noProtocolUrl.substring(slashIndex) : "";

      return `${hostName}:${port}${pathName}`;
    }

    if (this.port != null) {
      if (Array.isArray(this.port)) {
        const list = this.port.map((port) => addPort(port));
        return hasPort() && !list.includes(noProtocolUrl)
          ? [noProtocolUrl, ...list]
          : list;
      }

      const url = addPort(this.port);
      return hasPort() && noProtocolUrl !== url ? [noProtocolUrl, url] : [url];
    }

    return [noProtocolUrl];
  }

  /**
   * Returns a list of provided URLs with the protocol
   */
  private handleProtocol(urls: string[]): string[] {
    const protocol = `http${this.http === true ? "" : "s"}://`;
    function href(fullUrl: string): string {
      return new URL(fullUrl).href;
    }

    return urls.map((url) =>
      /^https?:\/\//is.test(url) ? href(url) : href(`${protocol}${url}`)
    );
  }

  /**
   * Returns simple search query URLs
   */
  private searchQuery(
    engine: Engine | null,
    values = this.keywords.map((keyword) => keyword.toString())
  ): string[] {
    if (engine == null) {
      return [];
    }

    if (this.split) {
      const urls: string[] = [];

      if (engine.query == null) {
        const engineBaseUrls = this.getEngineBaseUrls(engine);
        urls.push(...engineBaseUrls);

        if (values.length > 0) {
          this.addBareEngine(engine.name);
        }
      } else {
        values.forEach((value) => {
          const engineQueryUrls = this.getEngineQueryUrls(
            engine,
            value.toString()
          );
          urls.push(...engineQueryUrls);
        });
      }

      return urls;
    }

    const delimiter = engine.delimiter ?? " ";
    return this.getEngineQueryUrls(engine, values.join(delimiter));
  }

  /**
   * Returns a list of URLs with routes for the provided URL
   */
  private urlRouteQuery = (url: string, usePureKeywords = false): string[] => {
    const handleKeywords = (addressWithRoute: string): string[] => {
      const keywords = usePureKeywords ? this.nonUrlKeywords : this.keywords;
      if (keywords.length > 0) {
        return keywords.map(
          (keyword) => addTrailingSlash(addressWithRoute) + keyword
        );
      }
      return [addressWithRoute];
    };

    // multiple routes
    if (Array.isArray(this.route)) {
      return this.route.reduce<string[]>((list, route) => {
        list.push(...handleKeywords(addTrailingSlash(url) + route));
        return list;
      }, []);
    }

    // single route
    if (this.route != null) {
      return handleKeywords(addTrailingSlash(url) + this.route);
    }

    // no routes
    return [url];
  };

  /**
   * Returns a list of URLs with routes for the provided engine
   *
   * @param value
   * if provided, it is added to the URL after a forward-slash
   */
  private engineRouteQuery(engine: Engine, value?: string): string[] {
    const createRoute = (route: string): string[] => {
      const engineRoutes = this.getEngineRouteUrls(engine, route);
      return engineRoutes.map((engineRoute) =>
        value != null
          ? addTrailingSlash(engineRoute) + value.toString()
          : engineRoute
      );
    };

    if (Array.isArray(this.route)) {
      return this.route
        .filter((route) => route !== "")
        .reduce<string[]>((list, route) => {
          list.push(...createRoute(route));
          return list;
        }, []);
    }

    if (this.route != null) {
      return createRoute(this.route);
    }

    return [];
  }

  /**
   * Returns a list of base URLs with a trailing forward slash
   * and ports, if the --port option was provided
   */
  private getEngineBaseUrls(engine: Engine): string[] {
    return this.handlePort(engine.url).map((url) => addTrailingSlash(url));
  }

  /**
   * Returns a list of URLs that can be used to query
   * the provided engine by adding the search values
   */
  private getEngineQueryUrls(engine: Engine, queryValues: string): string[] {
    const baseUrls = this.getEngineBaseUrls(engine);

    if (engine.query != null) {
      const queryString = removeLeadingSlash(engine.query);
      return baseUrls.map((url) => url + queryString + queryValues);
    }

    this.addBareEngine(engine.name);
    return baseUrls;
  }

  /**
   * Returns a list of route URLs for the provided engine
   *
   * @param route
   * if it refers to a route in the engine's object, then the URL is built
   * using the object's route value, otherwise the argument itself is used
   * to create the URL
   */
  private getEngineRouteUrls(engine: Engine, route: string): string[] {
    const found = Object.entries(engine.routes ?? {}).find(
      ([key]) => key === route
    );

    if (found != null) {
      const [, routePath] = found;
      const baseUrls = this.getEngineBaseUrls(engine);
      return baseUrls.map((baseUrl) => baseUrl + routePath);
    }

    const baseUrls = this.getEngineBaseUrls(engine);
    return baseUrls.map((baseUrl) => baseUrl + route);
  }
}
