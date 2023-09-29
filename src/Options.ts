import type { QueryOptions, Browser, Engine, Keyword } from "./main.js";

export default class Options {
  protected options: QueryOptions;

  constructor(options: QueryOptions) {
    this.options = options;
  }

  protected get keywords(): Keyword[] {
    return this.options.keywords ?? [];
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
