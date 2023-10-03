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
    this.setURLs();
  }

  private get withKeywords(): boolean {
    return this.keywords.some((keyword) => !urlPattern.test(keyword));
  }

  private get withURLsOnly(): boolean {
    return (
      this.keywords.length > 0 &&
      this.keywords.every((keyword) => urlPattern.test(keyword))
    );
  }

  private _bareEngines: string[] = [];

  private setURLs(): void {
    const { engine, address } = this.options;
    const urls: string[] = [];

    let engineList: Engine[] = [];
    if (engine != null) {
      engineList = Array.isArray(engine) ? engine : [engine];
    }

    // address
    if (address != null) {
      if (Array.isArray(address)) {
        address
          .filter((a) => a !== "")
          .forEach((a) => {
            urls.push(...this.handlePort(a));
          });
      } else if (address != null && address !== "") {
        urls.push(...this.handlePort(address));
      }
    }

    if (engine != null || this.withKeywords || this.withURLsOnly) {
      if (engineList.length > 0) {
        engineList.forEach((currentEngine) => {
          urls.push(...this.create(currentEngine));
        });
      } else {
        urls.push(...this.create());
      }
    }

    this.urls = this.handleProtocol(urls);
  }

  /**
   * Returns a list of constructed URLs based on the engine
   *
   * @param engine
   * if not provided, the default engine is used
   */
  private create(engineOption?: Engine | null): string[] {
    // URL
    if (this.withURLsOnly) {
      const urlArgs = this.keywords.filter((keyword) =>
        urlPattern.test(keyword)
      );

      // search engine query with URLs as part of the search query
      if (engineOption != null) {
        return this.searchQuery(engineOption, urlArgs);
      }

      // full URLs based on the provided URL args
      return urlArgs.reduce<string[]>((list, website) => {
        list.push(...this.handlePort(website));
        return list;
      }, []);
    }

    const engine = engineOption ?? this.defaultEngine ?? defaultEngine;

    // route
    if (this.route != null) {
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
  private handlePort(baseURL: string): string[] {
    const pattern = /:(\d{1,5})/;
    const noSlashURL = removeTrailingSlash(baseURL);
    const noProtocolURL = removeProtocol(noSlashURL);

    function hasPort(): boolean {
      return pattern.test(baseURL);
    }

    function addPort(port: number): string {
      // provided URL includes a port
      const matches = noProtocolURL.match(pattern);
      if (matches != null) {
        const [, urlPort] = matches;

        // remove the port from the string if it does not match
        const index = noProtocolURL.indexOf(":");
        if (urlPort !== port.toString() && index >= 0) {
          const noPortURL = noProtocolURL.substring(0, index);
          // 1 is to account for the length of ":"
          const afterPort = noProtocolURL.substring(index + 1 + urlPort.length);
          return `${noPortURL}:${port}${afterPort}`;
        }

        // return the provided URL if port matches what's in the string
        return noProtocolURL;
      }

      // provided URL does not include a port
      const slashIndex = noProtocolURL.indexOf("/");
      const hostName =
        slashIndex > 0 ? noProtocolURL.substring(0, slashIndex) : noProtocolURL;
      const pathName =
        slashIndex > 0 ? noProtocolURL.substring(slashIndex) : "";

      return `${hostName}:${port}${pathName}`;
    }

    if (this.port != null) {
      if (Array.isArray(this.port)) {
        const list = this.port.map((port) => addPort(port));
        return hasPort() && !list.includes(noProtocolURL)
          ? [noProtocolURL, ...list]
          : list;
      }

      const url = addPort(this.port);
      return hasPort() && noProtocolURL !== url ? [noProtocolURL, url] : [url];
    }

    return [noProtocolURL];
  }

  /**
   * Returns a list of provided URLs with the protocol
   */
  private handleProtocol(urls: string[]): string[] {
    const protocol = `http${this.http === true ? "" : "s"}://`;
    function href(fullURL: string): string {
      return new URL(fullURL).href;
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
        const engineBaseURLs = this.getEngineBaseURLs(engine);
        urls.push(...engineBaseURLs);

        if (values.length > 0) {
          this.addBareEngine(engine.name);
        }
      } else {
        values.forEach((value) => {
          const engineQueryURLs = this.getEngineQueryURLs(
            engine,
            value.toString()
          );
          urls.push(...engineQueryURLs);
        });
      }

      return urls;
    }

    const delimiter = engine.delimiter ?? " ";
    return this.getEngineQueryURLs(engine, values.join(delimiter));
  }

  /**
   * Returns engine route URLs
   *
   * @param value
   * if provided, it is added to the URL after a forward-slash
   */
  private engineRouteQuery(engine: Engine, value?: string): string[] {
    const createRoute = (route: string): string[] => {
      const engineRoutes = this.getEngineRouteURLs(engine, route);
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
  private getEngineBaseURLs(engine: Engine): string[] {
    return this.handlePort(engine.url).map((url) => addTrailingSlash(url));
  }

  /**
   * Returns a list of URLs that can be used to query
   * the provided engine by adding the search values
   */
  private getEngineQueryURLs(engine: Engine, queryValues: string): string[] {
    const baseURLs = this.getEngineBaseURLs(engine);

    if (engine.query != null) {
      const queryString = removeLeadingSlash(engine.query);
      return baseURLs.map((url) => url + queryString + queryValues);
    }

    this.addBareEngine(engine.name);
    return baseURLs;
  }

  /**
   * Returns a list of route URLs for the provided engine
   *
   * @param route
   * if it refers to a route in the engine's object, then the URL is built
   * using the object's route value, otherwise the argument itself is used
   * to create the URL
   */
  private getEngineRouteURLs(engine: Engine, route: string): string[] {
    const found = Object.entries(engine.routes ?? {}).find(
      ([key]) => key === route
    );

    if (found != null) {
      const [, routePath] = found;
      const baseURLs = this.getEngineBaseURLs(engine);
      return baseURLs.map((baseURL) => baseURL + routePath);
    }

    const baseURLs = this.getEngineBaseURLs(engine);
    return baseURLs.map((baseURL) => baseURL + route);
  }
}
