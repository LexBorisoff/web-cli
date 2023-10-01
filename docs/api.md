<h1 align="center">Web Search API</h1>

This API works behind the CLI application. Please get familiar with CLI documentation first as it explains every API option in detail.

* [Installation](#installation)
* [Usage](#usage)
* [Options](#options)
* [URLs](#urls)

# Installation <a name="installation"></a>

Install the library locally in your project:

<pre><code>npm i @lexjs/web-search</code></pre>

# Usage <a name="usage"></a>

Web Search is a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c.js) and does not provide CommonJS exports, which means it cannot be `require`'d. Your project must be ESM or get converted to ESM if it currently uses CommonJS.

```javascript
import WebSearch from "@lexjs/web-search";

// create a webSearch instance
const ws = new WebSearch({ ...options });

// perform web queries
ws.open();

// log opened URLs
ws.urls.forEach((url) => {
  console.log(url);
});
```

# Options <a name="options"></a>

The `WebSearch` constructor must be supplied an "options" object of the `QueryOptions` type:

```typescript
interface QueryOptions {
  keywords?: string | number | (string | number)[];
  browser?:
    | string
    | string[]
    | Browser
    | Browser[]
    | (string | Browser)[]
    | null;
  engine?: Engine | Engine[] | null;
  defaultEngine?: Engine | null;
  route?: string | string[];
  address?: string | string[];
  incognito?: boolean;
  split?: boolean;
  http?: boolean;
}

interface Engine {
  name: string;
  url: string;
  query?: string;
  routes?: {
    [route: string]: string;
  };
  delimiter?: string;
}

interface Browser {
  name: string;
  profileDirectory?: string | string[];
}
```

These types can be imported from `@lexjs/web-search/Options`

```typescript
import type {
  QueryOptions,
  Browser,
  Engine
} from "@lexjs/web-search/Options";

const options: QueryOptions = {
  // option props
};

const browser: Browser = {
  // browser props
}

const browser: Engine = {
  // engine props
}

```


## `keywords`

Refer to [keywords & URLs](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#basic-usage) in CLI docs.

## `browser`

Refer to [browser option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-browser) and [browsers configuration](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#browsers-configuration) in CLI docs.

Supplying a `Browser` object instead of a string is useful when a certain browser profile needs to be opened.

```typescript
interface Browser {
  name: string;
  profileDirectory?: string | string[];
}
```

> A `profileDirectory` string represents the profile's exact directory name (NOT the full path, just the folder name). Different operating systems have different ways of storing user's browser profile data - please search how to find such folder on your OS, if you are not sure.

## `engine`

Refer to [engine option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-engine) and [engines configuration](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#engines-configuration) in CLI docs.

```typescript
interface Engine {
  name: string;
  url: string;
  query?: string;
  routes?: {
    [route: string]: string;
  };
  delimiter?: string;
}
```

## `defaultEngine`

Specifies the default engine to be used for querying. This property is handy when the engines are unknown at the time of instantiating the `WebSearch` object (e.g. when values are provided from the CLI arguments based on the engines pre-configured data) or when building a CLI application that has a config with the default engine that you want to preserve.

## `route`

Refer to [route option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-route) and [engines configuration](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#engines-configuration) in CLI docs.

> ⚠️ This option must be supplied with the engine option.

## `address`

Refer to [address option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-address) in CLI docs.

## `incognito`

Refer to [incognito option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-incognito) in CLI docs.

## `split`

Refer to [split option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-split) in CLI docs.

## `http`

Refer to [http option](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md#option-http) in CLI docs.

# URLs

In its implementation, the `WebSearch` class extends a class called`URLs` which is exported from `@lexjs/web-search/URLs` and can also be used on its own but without the ability to open browser queries. The `URLs` provides the following instance properties that can be accessed on a `WebSearch` object due to inheritance:

* `urls` - a list of created URLs based on the provided options.
* `bareEngines` - a list of provided engines that do not have a `query` property. This list only gets populated when the `keywords` property was provided meaning that an engine could not be queried properly ***and*** the `route` option was not supplied (in which case a URL would be built using the `route` value instead of `query`).

```typescript
const ws = new WebSearch({ ...options });

const { urls, bareEngines } = ws;

// ... log urls and bareEngines ...
```