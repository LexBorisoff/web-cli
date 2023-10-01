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

export interface QueryOptions {
  keywords?: string | number | (string | number)[];
  browser?: Browser | Browser[] | null;
  engine?: Engine | Engine[] | null;
  defaultEngine?: Engine | null;
  route?: string | string[];
  address?: string | string[];
  port?: number | number[];
  incognito?: boolean;
  split?: boolean;
  http?: boolean;
}

export default class Options {
  protected options: QueryOptions;

  constructor(options: QueryOptions) {
    this.options = options;
  }

  protected get keywords(): string[] {
    const { keywords } = this.options;
    if (keywords == null) {
      return [];
    }

    if (typeof keywords === "string") {
      return keywords.split(" ");
    }

    if (typeof keywords === "number") {
      return [keywords.toString()];
    }

    return keywords.map((keyword) => keyword.toString());
  }

  protected get browser(): Browser | Browser[] | null | undefined {
    return this.options.browser;
  }

  protected get engine(): Engine | Engine[] | null | undefined {
    return this.options.engine;
  }

  protected get defaultEngine(): Engine | undefined | null {
    return this.options.defaultEngine;
  }

  protected get route(): string | string[] | undefined {
    return this.options.route;
  }

  protected get address(): string | string[] | undefined {
    return this.options.address;
  }

  protected get port(): number | number[] | undefined {
    const { port: portOption } = this.options;
    const list = Array.isArray(portOption) ? portOption : [portOption];

    const ports = list.filter(
      (port): port is number =>
        port != null && typeof port === "number" && !Number.isNaN(port)
    );

    if (ports.length === 0) {
      return undefined;
    }

    if (ports.length === 1) {
      return ports[0];
    }

    return ports;
  }

  protected get incognito(): boolean {
    return this.options.incognito ?? false;
  }

  protected get split(): boolean {
    return this.options.split ?? false;
  }

  protected get http(): boolean {
    return this.options.http ?? false;
  }
}
