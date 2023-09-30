import type { QueryOptions, Browser, Engine } from "./main.js";

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
