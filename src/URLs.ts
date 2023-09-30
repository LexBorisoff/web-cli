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

function addTrailingSlash(value: string): string {
  return trailingSlash.test(value) ? value : `${value}/`;
}

/**
 * Returns the provided engine's base URL
 * with a trailing forward slash
 */
function getEngineBaseURL(engine: Engine): string {
  return addTrailingSlash(engine.url);
}

/**
 * Returns the provided engine's URL that can be used
 * to query it by adding the search values
 */
function getEngineQueryURL(
  engine: Engine,
  queryValues: string,
  addBareEngine: (engineName: string) => void
): string {
  const baseURL = getEngineBaseURL(engine);

  if (engine.query != null) {
    const queryString = removeLeadingSlash(engine.query);
    return baseURL + queryString + queryValues;
  }

  addBareEngine(engine.name);
  return baseURL;
}

/**
 * Returns the provided engine's route URL
 *
 * @param route
 * if it refers to a route in the engine's object, then the URL is built
 * using the object's route value, otherwise the argument itself is used
 * to create the URL
 */
function getEngineRouteURL(engine: Engine, route: string): string {
  const found = Object.entries(engine.routes ?? {}).find(
    ([key]) => key === route
  );

  if (found != null) {
    const [, routePath] = found;
    return getEngineBaseURL(engine) + routePath;
  }

  return getEngineBaseURL(engine) + route;
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
            urls.push(this.getFullURL(a));
          });
      } else if (address != null && address !== "") {
        urls.push(this.getFullURL(address));
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

    this.urls = urls;
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
        list.push(this.getFullURL(website));
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
    return [this.getFullURL(engine.url)];
  }

  private addBareEngine(bareEngine: string) {
    if (!this._bareEngines.includes(bareEngine)) {
      this._bareEngines.push(bareEngine);
    }
  }

  /**
   * Returns the full URL with the protocol
   */
  private getFullURL(url: string): string {
    const protocol = `http${this.http === true ? "" : "s"}://`;
    return /^https?:\/\//is.test(url) ? url : `${protocol}${url}`;
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
        const queryURL = getEngineBaseURL(engine);
        urls.push(this.getFullURL(queryURL));

        if (values.length > 0) {
          this.addBareEngine(engine.name);
        }
      } else {
        values.forEach((value) => {
          const queryURL = getEngineQueryURL(
            engine,
            value.toString(),
            (bareEngine) => this.addBareEngine(bareEngine)
          );
          urls.push(this.getFullURL(queryURL));
        });
      }

      return urls;
    }

    const delimiter = engine.delimiter ?? " ";
    const queryURL = getEngineQueryURL(
      engine,
      values.join(delimiter),
      (bareEngine) => {
        this.addBareEngine(bareEngine);
      }
    );
    return [this.getFullURL(queryURL)];
  }

  /**
   * Returns engine route URLs
   *
   * @param value
   * if provided, it is added to the URL after a forward-slash
   */
  private engineRouteQuery(engine: Engine, value?: string): string[] {
    const createRoute = (route: string): string => {
      const engineRoute = getEngineRouteURL(engine, route);
      const routeURL =
        value != null
          ? addTrailingSlash(engineRoute) + value.toString()
          : engineRoute;

      return this.getFullURL(routeURL);
    };

    if (Array.isArray(this.route)) {
      return this.route
        .filter((route) => route !== "")
        .reduce<string[]>((list, route) => {
          list.push(createRoute(route));
          return list;
        }, []);
    }

    if (this.route != null) {
      return [createRoute(this.route)];
    }

    return [];
  }
}
