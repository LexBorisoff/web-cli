<h1 align="center">Web CLI</h1>

CLI for making web search queries from a shell.

- [Installation](#installation)
- [Usage](#usage)
  - [Keywords](#keywords)
  - [URLs](#urls)
- [Options](#options)
  - [Usage](#usage)
  - [Value options](#value-options)
  - [Flag options](#flag-options)
  - [Placement](#placement)
- [Configuration](#configuration)
- [Built-in Options](#built-in-options)
  - [`browser`](#browser)
  - [`profile`](#profile)
  - [`engine`](#engine)
  - [`query`](#query)
  - [`resource`](#resource)
  - [`port`](#port)
  - [`incognito`](#incognito)
  - [`split`](#split)
  - [`http`](#http)
  - [`test`](#test)
- [Configuration](#configuration)
  - [Browsers](#browsers)
  - [Engines](#engines)
- [Custom Flags](#custom-flags)

# Installation

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready for use without any setup.

```bash
web hello world
```

&gt; `https://google.com/search?q=hello%20world`

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>

To get help with command options, use the `--help` option:

<pre><code>web <em>--help</em></code></pre>

# Usage

To perform basic web queries, provide **_space-separated values_**

<pre><code>web <em>&lt;values&gt;</em></code></pre>

The CLI will then construct 1 or more queries based on the type of values and open them in the new browser tab(s).

There are 2 types of values:

1. Keywords
2. URLs

## Keywords

When providing keywords, only 1 web query is created using the values as a search term:

```bash
web hello world
```

&gt; `https://google.com/search?q=hello%20world`

In the absence of [_options_](#options), the CLI uses the **_default search engine_** to construct the query and opens it in the **_default browser_**:

- After installation, there is a set of initial search engines that you can use (default is Google).
- The operating system's default browser is used to open the web queries.

You can change these defaults and add new engines and browsers by setting up and running a [_config project_](#configuration-setup).

### _Initial search engines_

| Search Engine |    Option Value     |
| ------------- | :-----------------: |
| Google        |      `google`       |
| DuckDuckGo    | `duckduckgo` `duck` |
| MDN           |        `mdn`        |
| YouTube       |      `youtube`      |
| NPM           |        `npm`        |

The option value can be either supplied to the [`engine`](#engine) option or used as a [_custom flag_](#custom-flags).

## URLs

When providing a URL as a value, the default behavior is to access that URL directly:

```bash
web github.com
```

&gt; `https://github.com`

If multiple URLs are provided, each URL creates a separate web query:

```bash
web github.com npmjs.com developer.mozilla.org
```

&gt; `https://github.com`  
&gt; `https://npmjs.com`  
&gt; `https://developer.mozilla.org`

### _Keywords and URLs together_

If both keywords and URLs are provided, then all values are treated as search term keywords:

```bash
web most starred repos on github.com
```

&gt; `https://google.com/search?q=most%20starred%20repos%20on%20github.com`

# Options

Options give you control over web queries by overriding the CLI's defaults.

## Usage

To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

1-letter options (like an option's aliases, for example) are prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option requires a value ([_value options_](#value-options)), provide it in one of the following ways:

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> **_Note_**  
> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This helps avoid any confusion between what is an option's value and what is an actual keyword.

1-letter options can be combined together with a single dash `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

which is equivalent to:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> **_Caution!_**  
> Combining 1-letter aliases of multiple [_value options_](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [_flag options_](#flag-options), which can be built-in or custom. If you want to add a 1-letter value option, it must be placed at the very end of the combination. If the value option is placed in the middle, the value will not get assigned to it.

## Value options

The following are built-in options that require a value:

| Option                  |      Alias       | Description                            |
| ----------------------- | :--------------: | -------------------------------------- |
| [`browser`](#browser)   | [`b`](#browser)  | _Browser app to open_                  |
| [`profile`](#profile)   | [`p`](#profile)  | _Browser profile to use_               |
| [`engine`](#engine)     |  [`e`](#engine)  | _Search engine (or website) to query_  |
| [`query`](#query)       |  [`q`](#query)   | _Engine's query to use for searchhing_ |
| [`resource`](#resource) | [`r`](#resource) | _Engine's resource to access_          |
| [`port`](#port)         |   [`:`](#port)   | _Port number to add to the URL_        |

All value options work without any initial configuration but each option's usage can be enhanced by setting up the config. Refer to each option as well as [_engines configuration_](#engines-configuration) and [_browsers configuration_](#browsers-configuration) for more details.

## Flag options

Options that do not require a value are called **_flags_**. The following are built-in flag options:

| Option                    |       Alias       | Description                                       |
| ------------------------- | :---------------: | ------------------------------------------------- |
| [`incognito`](#incognito) | [`i`](#incognito) | _Open in incognito / private mode_                |
| [`split`](#split)         |        ❌         | _Split values into separate web queries_          |
| [`http`](#http)           |        ❌         | _Use the HTTP (non-secure) protocol_              |
| [`test`](#test)           |   [`t`](#test)    | _Display the output without opening browser tabs_ |

> **_Caveat!_**  
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to **_"true"_** but the option will still accept a boolean value that's placed after it (even without the explicit `=` sign). Therefore, make sure to not accidentally assign **_"true"_** or **_"false"_** to a flag if you do not intend it. Doing so will result in your web query missing the keyword **_"true"_** or **_"false"_** from the search term.

With browsers and engines configuration set up, you can also use [_custom flags_](#custom-flags) which are created from the keys and aliases of _browsers_, _browser profiles_, and _engines_ from the generated config file. Custom flags simplify your web queries by being a convenient substitute for value options.

## Placement

Options can be placed anywhere in the command

<pre><code>web <em>--browser=firefox</em> this is <em>--incognito</em> an example <em>--engine=duckduckgo</em> search query</code></pre>

<pre><code>web <em>-b=firefox</em> this is <em>-i</em> an example <em>-e=duckduckgo</em> search query</code></pre>

> **_Note_**  
> Normally, you would place the options where they make sense visually such as at the start or the end of the command. This example just shows you that their placement does not impact the constructed query.

The above command will do the following:

- construct a web query using
  - the keywords **_"this is an example search query"_**
  - the **_DuckDuckGo_** search engine (`--engine=duckduckgo`)
- open the constructed query in a new **_Firefox_** tab (`--browser=firefox`)
- in **_incognito / private mode_** (`--incognito`)

# Configuration

Creating configuration allows you to customize the usage of Web CLI and enhance many of the built-in options. Before learning about these options, it is beneficial to know how to create and generate your own custom config.

## Creating a config project

Web CLI allows you to create a config by scaffolding a TypeScript project and then running it with an npm script defined in the project's `package.json`. Even if you are not familiar with TypeScript, you should be able to quickly grasp and navigate around the created application.

First, run the following command in the directory where you want to create the project.

<pre><code>web <em>--config</em></code></pre>

On its first run, you won't have an existing config so it will give you only 2 options:

- `Engines` to show the initial engines
- `New config` to crete a new config project

As was mentioned earlier, you get access to a set of initial search engines after installing the package. You can see these engines by selecting the first option.

What we need, however, is to select the second option in order to create a new config directory. Once selected, the CLI will:

- prompt you to type a name for the directory to be created
- initialize and scaffold the project

## Editing the config project

After the scaffolding process is complete, you can navigate to the created directory and open it in your IDE. You can also push it to a remote git repository such as Github to keep your config in sync on different machines.

There are two initial files in the `src` folder that you can customize:

- `engines.ts`
- `browsers.ts`

Both of these files import a function called `defineConfig` from `@lexjs/web-cli/config`.

```typescript
// src/engines.ts
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ engine }) => ({
  google: engine("google.com", {
    search: "search?q=",
  }),
  // ... other engines
}));
```

```typescript
// src/browsers.ts
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  // the browser you entered during initialization, e.g.
  chrome: browser("chrome"),
}));
```

You can add more engines and browsers, as well as edit or remove them as you need by extending the initial code.

Also, since this is a regular TypeScript project, you are free to organize it however you want and use other libraries. Just remember to:

- call the `defineConfig` function that defines the engines and/or browsers, and
- correctly generate the config file (described in the next section)

### **_defining config_**

`defineConfig` accepts a callback that

- passes an object with `engine` and `browser` functions in its parameter
- returns an object with defined engines and/or browsers

```typescript
// not exact representation
type DefineConfigCallback = ({
  engine: CreateEngineFn;
  browser: CreateBrowserFn;
}) => Record<string, Engine | Browser>;
```

### **_Engines Configuration_**

To create an engine, use the `engine` function from the callback's parameter and assign it to a property of the callback's return object:

```typescript
defineConfig(({ engine }) => ({
  google: engine("google.com", {
    search: "search?q=",
  }),
}));
```

> The property key is important because it can be used as a value for the `--engine` option and also as a custom flag. So make sure to create meaningful property keys.

The `engine` function is of type `CreateEngineFn`:

```typescript
// not exact representation
type CreateEngineFn = (baseUrl: string, config?: Config) => Engine;
```

When defining an engine, you must provide the base URL string as the first parameter and, optionally, a config object as the second parameter.

The optional config parameter has the following shape:

```typescript
interface Config {
  search?: string | SearchObject;
  resources?: ResourceObject;
  alias?: string | string[];
  delimiter?: string;
  isDefault?: boolean;
}

interface SearchObject {
  [key: string]: string | StringObject;
  main: string;
}

interface ResourceObject {
  [key: string]: string | StringObject;
}

interface StringObject {
  [key: string]: string | StringObject;
}
```

Let's dive into each available option:

1. **_`search`_** - defines how the search engine should be queried.

The value of this option can be one of the following:

- a string such as `search?q=` or `?q=`

```typescript
defineConfig(({ engine }) => ({
  example: engine("example.com", {
    search: "search?q=",
  }),
}));
```

- an object with:
  - at least 1 property called `main` of type string
  - other optional properties with string or nested object values (the values of the last nested properties must be strings), e.g.

```typescript
defineConfig(({ engine }) => ({
  example: engine("example.com", {
    search: {
      main: "search?q=",
      foo: {
        bar: "foobar?q=",
        baz: {
          deep: "foobaz?q=",
        },
      },
    },
  }),
}));
```

Defining the `search` config as an object allows you to provide its keys as values to the [`--search` built-in option](#search) instead of typing the actual whole string. For example:

<pre><code>web <em>--search=main</em></code></pre>
<pre><code>web <em>--search=bar</em></code></pre>
<pre><code>web <em>--search=deep</em></code></pre>

> ⚠️ Using the keys `foo` and `baz` is not valid because they do not point to a string value!

2. **_`resources`_**

defines what routes can be accessed on the engine.

3.  **_`alias`_**

a string or array of strings that provide alias names for the engine.

4. **_`delimeter`_**

defines how the search keywords should be delimited when building search URLs.

5. **_`isDefault`_**

defines whether the engine should be used as a default.

## Generating the config file

In order to start using the engines and browsers defined in the previous step, you must generate a **_config file_**. What Web CLI uses to customize its behavior is not the config project itself but rather the config file that gets generated based on the project.

To generate the config file, run the following command from the root directory of the project:

<pre><code>npm run config</code></pre>

You can notice that this is just a simple npm script defined in `package.json` which consists of two other commands that you can run individually:

<pre><code>npm run config:engines</code></pre>

<pre><code>npm run config:browsers</code></pre>

Both commands execute their respective files (`src/engines.ts` and `src/browsers.ts`) to set the config engines and browsers.

> Again, you can customize this behavior as long as you execute a file that calls `defineConfig`.

Please note that only 1 config file gets generated even if you call `defineConfig` multiple times from different files. The location of the generated file depends on your OS:

- Windows - `~/AppData/Roaming/@lexjs/web-cli.config.json`
- Linux - `~/.config/@lexjs/web-cli.config.json`
- Darwin (MacOS) - `~/Library/Application Support/@lexjs/web-cli.config.json`
- other - `~/@lexjs/web-cli.config.json`

# Built-in Options

## `browser`

Specifies the browser app to open.

✅ Requires a value.  
⚙️ Allows configuration.

### _Options_

`--browser` `-b`

### _Usage_

<pre><code>web <em>--browser=value</em></code></pre>

`value` is one of the following:

- #### _Browser app name, e.g. `chrome`, `firefox`, `brave`, `edge`, etc._

<pre><code>web <em>--browser=chrome</em></code></pre>

- #### _Browser key or alias in the config, like `chrome`, `firefox`, `c`, `f`, or `ff`:_

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    alias: "c",
  }),
  firefox: browser({
    alias: ["f", "ff"],
  }),
}));
```

<pre><code>web <em>--browser=ff</em></code></pre>

> **_Note!_**  
> The command will not prevent you from specifying a value that refers to an invalid browser or to another non-browser application on your machine. As far as the program is concerned - any value provided to the `browser` option is a possible browser app, so it will attempt to open it.

#### **_Multiple browsers_**

You can specify multiple browsers:

<pre><code>web <em>--browser=value</em> <em>--browser=value</em> ...</code></pre>

### _Configuration_

Setting up [_browsers configuration_](#browsers-configuration) allows using

- browser aliases as the option's value
- browser keys and aliases as custom flags

## `profile`

Specifies what browser profile to use when opening a new browser tab.

✅ Requires a value.  
⚙️ Allows configuration.

The option works only if the browser application supports profiles functionality. Otherwise, it will have no effect on the opened web query.

### _Options_

`--profile` `-p`

### _Usage_

This option depends on the `browser` option or generated config.

- If the `browser` option is not provided, the CLI will use the config's **_default browser_** (see how it is determined in [_browsers configuration_](#browsers-configuration)).
- If the `browser` option is not provided and there is no browser config, the query will not be opened.

<pre><code>web <em>--profile=value</em></code></pre>

`value` is one of the following:

- #### _Profile directory name, e.g._

<pre><code>web <em>--profile="Profile 1"</em></code></pre>

> For this scenario to work, make sure that you either provide the `--browser` option or create config, for example:

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser(),
}));
```

- #### _Property key in the `profiles` object of the browser config, like `dev` or `personal`:_

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    profiles: {
      dev: "Profile 1",
      personal: "Profile 2",
    },
  }),
}));
```

<pre><code>web <em>--profile=personal</em></code></pre>

- #### _Value of a profile's `alias` property, like `d`, `main`, `p`, or `second`:_

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ browser }) => ({
  chrome: browser({
    profiles: {
      dev: {
        directory: "Profile 1",
        alias: ["d", "main"],
      },
      personal: {
        directory: "Profile 2",
        alias: ["p", "second"],
      },
    },
  }),
}));
```

<pre><code>web <em>--profile=p</em></code></pre>

#### **_Multiple profiles_**

You can specify multiple profiles:

<pre><code>web <em>--profile=value</em> <em>--profile=value</em> ...</code></pre>

### _Configuration_

Setting up [_browsers configuration_](#browsers-configuration) allows using

- profile keys and aliases as the option's value
- profile keys as custom flags

## `engine`

Specifies what search engine or website to query.

✅ Requires a value.  
⚙️ Allows configuration.

### _Options_

`--engine` `-e`

### _Usage_

<pre><code>web <em>--engine=value</em></code></pre>

`value` is one of the following:

- #### _Engine key or alias in the config, like `google`, `npm`, `duck`, or `duckduckgo`:_

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ engine }) => ({
  google: engine("google.com", {
    search: "search?q=",
  }),
  npm: engine("npmjs.com", {
    search: "search?q=",
  }),
  duck: engine("duckduckgo.com", {
    search: "?q=",
    delimiter: "+",
    alias: ["duckduckgo"],
  }),
}));
```

<pre><code>web @lexjs/web-cli <em>--engine=npm</em></code></pre>

&gt; `https://npmjs.com/search?q=@lexjs/web-cli`

When supplying URL values to the command, this option overrides the default behavior of accessing the URLs directly. Instead, they are treated as search term keywords for the provided engine. For example:

<pre><code>web github.com <em>--engine=google</em></code></pre>

&gt; `https://google.com/search?q=github.com`

- #### _An arbitrary URL string like `google.com/search?q=` or `example.com`_

<pre><code>web @lexjs/web-cli <em>--engine=npmjs.com/search?q=</em></code></pre>

&gt; `https://npmjs.com/search?q=@lexjs/web-cli`

> Non-URL values are not allowed.

When using the option with an arbitrary URL, it behaves in the same way as any other engine from the config, meaning that you can use other options such as `--search`, `--resource`, `--port`, `--split`, or `--http`.

Note that since a URL value is a basic string, the CLI will simply append it with whatever keywords are supplied. If the URL has no query string that ends with an equals sign (`=`), the values will be added after a forward-slash (`/`), e.g.

<pre><code>web hello world <em>--engine=example.com</em></code></pre>

&gt; `https://example.com/hello%20world`

### _Configuration_

To define more engines and websites than the app defaults, add them to [_engines configuration_](#engines-configuration).

## `search`

Specifies what "search path" to use for querying the provided engine. This search path is a URL segment that is appended to the search engine's base URL and allows to **_search_** that engine with the provided keywords. There could be multiple ways to search a single engine, for example via `search?q=` or `images?q=`, and this option allows you to indicate which one you want to use.

### _Options_

`--search` `-s`

### _Usage_

This option must be used with the `--engine` option and keywords.

<pre><code>web <em>--search=value</em> <em>--engine=value</em> &lt;keywords&gt;</code></pre>

If keywords are not provided, only the base URL will be opened (i.e. the search `value` is not added).

`value` is one of the following:

- #### _URL segment string like `search?q=` or `?q=`_

<pre><code>web hello world <em>--search=?q=</em> <em>--engine=duckduckgo.com</em></code></pre>

&gt; `https://duckduckgo.com/?q=hello%20world`

- #### _Search key in the engine's "search" config, like `main`, `images`, `bar`, or `deep`:_

```typescript
import { defineConfig } from "@lexjs/web-cli/config";

defineConfig(({ engine }) => ({
  example: engine("example.com", {
    search: {
      main: "search?q=",
      images: "images?q=",
      foo: {
        bar: "foobar?q=",
        baz: {
          deep: 'foobaz?q=",
        },
      },
    },
  }),
}));
```

> ⚠️ Note that using the keys `foo` and `baz` is not valid because they do not point to a string value!

## `resource`

Overrides the default behavior of _querying_ a search engine by specifying the engine's route to access directly.

✅ Requires a value.  
⭕ Configuration is optional.

### _Options_

`--resource` `-r`

### _Usage_

The option must be used together with the `engine` option. If the engine is NOT supplied, the validation will fail and the web query will not be performed.

#### 1. Without command values

<pre><code>web <em>--resource=value</em></code></pre>

`value` refers to the engine's route to access.

For example, the following command adds "teapot" to the engine's URL to access the route directly instead of searching it as a keyword.

<pre><code>web <em>--engine=google</em> <em>--resource=teapot</em></code></pre>

&gt; `https://google.com/teapot`

#### 2. With command values

When supplying values to the command, each value is used in a separate web query as a URL path segment after the provided route.

For example, the following creates 3 distinct web queries:

<pre><code>web <em>--engine=npm</em> <em>--resource=package</em> lodash axios express</code></pre>

&gt; `https://npmjs.com/package/lodash`  
&gt; `https://npmjs.com/package/axios`  
&gt; `https://npmjs.com/package/express`

### _Configuration_

The option's value can be a key from an engine's `routes` property in [_engines configuration_](#engines-configuration). When this config property is set up, the program will search it first to find the provided value among the property's keys. If it is not there, then the supplied value itself is used to build the web query.

Setting up the `routes` property can be useful when frequently accessing an engine's route that can be long to type or hard to remember the full path of.

For example, with the following GitHub engine config

```json
"github": {
  "name": "GitHub",
  "url": "github.com",
  "query": "search?q=",
  "routes": {
    "repos": "username?tab=repositories",
    "stars": "username?tab=stars"
  }
}
```

we can use `repos` and `stars` as a value of the `route` option:

<pre><code>web <em>--engine=github</em> <em>--resource=repos</em></code></pre>

&gt; `https://github.com/username?tab=repositories`

## `--port` `-:`

Adds the provided port number to the URL.

✅ Requires a number value.  
❌ No configuration.

### _Usage_

<pre><code>web example.com <em>--port=3000</em></code></pre>

&gt; `https://example.com:3000/`

If multiple ports are supplied, each one will create a separate query:

<pre><code>web example.com <em>-: 3000 -: 5000</em></code></pre>

&gt; `https://example.com:3000/`  
&gt; `https://example.com:5000/`

The program recognizes if an engine or a URL already includes a port and checks if it matches the option's value when building the final list of URLs:

<pre><code>web example.com:3000/api/users <em>-: 3000 -: 5000</em></code></pre>

&gt; `https://example.com:3000/api/users`  
&gt; `https://example.com:5000/api/users`

## `--incognito` `-i`

Opens web queries in a private / incognito mode.

🚩 Flag option - no value is required.  
❌ No configuration.

### _Usage_

<pre><code>web <em>--incognito</em></code></pre>

## `--split`

Splits provided values into separate web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

### _Usage_

<pre><code>web <em>--engine=mdn</em> Object Symbol class <em>--split</em></code></pre>

&gt; `https://developer.mozilla.org/search?q=Object`  
&gt; `https://developer.mozilla.org/search?q=Symbol`  
&gt; `https://developer.mozilla.org/search?q=class`

## `--http`

Uses the HTTP (non-secure) protocol when constructing the web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

## `--test`

Prevents opening browser tabs and only displays the output.

🚩 Flag option - no value is required.  
❌ No configuration.

### _Usage_

<pre><code>web [values] [options] <em>--test</em></code></pre>

# Configuration

To see where the config files are stored on your machine, use the `config` option without a value.

<pre><code>web <em>--config</em></code></pre>

&gt; `path/to/config/files`

To open a desired config file, use the `config` option with the `browsers` or `engines` value:

<pre><code>web <em>--config=browsers</em></code></pre>

<pre><code>web <em>--config=engines</em></code></pre>

Both browsers and engines configurations are in the JSON format, so the files will open in the OS default application for editing JSON.

> **_Note!_**  
> When using this option with a value **AND** the corresponding config file does not exist, the program will create it. In the case of engines config, the newly created file will be populated with [initial search engines](#initial-search-engines). You have the option to change these initial engines (e.g. adding aliases or deleting an engine entirely from the config file).

The option can be used more than once (to open both files at the same time, for example):

<pre><code>web <em>--config=browsers</em> <em>--config=engines</em></code></pre>

Optionally, you can supply 1 or more space-separated apps that should open the config files:

<pre><code>web <em>--config=browsers</em> code</code></pre>

<pre><code>web <em>--config=engines</em> notepad++</code></pre>

> The apps should be installed on your machine.

Modifying each config requires you to follow their accepted data structures explained below.

## Browsers

Browsers configuration is a JSON file containing an object with browsers data. The following describes a browser object inside the JSON config file.

```json
{
  "<browser_key>": {
    "isDefault": "boolean",
    "alias": "string_or_array_of_strings",
    "profiles": {
      "<profile_key>": {
        "directory": "string",
        "isDefault": "boolean",
        "alias": "string_or_array_of_strings"
      }
    }
  }
}
```

> You can add as many browser objects to the config file as you have browsers on your machine. Each browser object is separated by a comma, and trailing commas are not allowed in a JSON file.
>
> **_Note!_**  
> Setting up browsers configuration does not limit you to using only the browsers in the config. You can still supply other browser values to the `browser` option, but using custom flags is only available after setting up the config.

- `<browser_key>`: a string representing the browser app that is supplied to the `browser` option.
- `isDefault`: _optional_ - accepts a boolean value indicating if the browser should be used as default. **_If not present, then the first browser object in the config file is used as default_**. If multiple browser objects have this property (which should be avoided), then the first one with it will be used as default.
- `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<browser_key>`.
- `profiles`: _optional_ - accepts an object that represents browser profiles:
  - `<profile_key>`: a string representing the browser profile that is supplied to the `profile` option.
  - `directory`: _required_ - accepts a string representing the profile's exact directory name (NOT the full path, just the folder name). Different operating systems have different ways of storing user's browser profile data - please search how to find such folder on your OS, if you are not sure.
  - `isDefault`: _optional_ - accepts a boolean value indicating if the browser's profile should be used as default. **_If not present, then the first profile object within the browser is used as default_**. If multiple profile objects inside the browser have this property (which should be avoided), then the first one with it will be used as default.
  - `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<profile_key>`.

### _TypeScript representation of the above JSON data_

```typescript
interface Browsers {
  [browserKey: string]: {
    isDefault?: boolean;
    alias?: string | string[];
    profiles?: Profiles;
  };
}

interface Profiles {
  [profileKey: string]: {
    directory: string;
    isDefault?: boolean;
    alias?: string | string[];
  };
}
```

### _Example browsers config_

```json
{
  "chrome": {
    "alias": "c",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "personal": {
        "directory": "Profile 2",
        "alias": "p"
      }
    }
  },
  "edge": {
    "alias": "e",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "school": {
        "directory": "Profile 2",
        "alias": ["s", "study"]
      }
    }
  },
  "firefox": {
    "alias": ["f", "ff", "fox"]
  }
}
```

## Engines

Engines configuration is a JSON file containing an object with engines data. The following describes an engine object inside the JSON config file.

```json
{
  "<engine_key>": {
    "name": "string",
    "url": "string",
    "query": "string",
    "delimiter": "string",
    "isDefault": "boolean",
    "alias": "string_or_array_of_strings",
    "routes": {
      "<route_key>": "string"
    }
  }
}
```

> You can add as many engine objects to the config file as you'd like to use. Each engine object is separated by a comma, and trailing commas are not allowed in a JSON file.

- `<engine_key>`: a string representing the search engine or website that is supplied to the `engine` option.
- `name`: _required_ - accepts a string representing the name of the search engine / website.
- `url`: _required_ - accepts a string of the engine's base URL **_without the protocol_** and **_without the query string_**. For example, in a URL like this: `https://google.com/search?q=whatever` - supply only `google.com`.
- `query`: _optional_ - accepts a string representing the search engine's query string. Following the example above: `https://google.com/search?q=whatever` - the query string is `search?q=` which sits between the engine's base url and the search keywords. To find an engine's query string, go to its URL then type anything in its search box and hit enter. You will find that most websites and search engines have their own query string that you can grab. If not, then that engine cannot be used for searching with the query string.
- `delimiter`: _optional_ - accepts a string (normally a single character) representing the delimiter between search term keywords. Sometimes you will find that search engines modify the search query URL by replacing the space with another character, such as a `+` sign. If you find that the engine has a different delimiter, then provide it here. **_The default delimiter is the space character_**.
- `isDefault`: _optional_ - accepts a boolean value indicating if the engine should be used as default. **_If not present, then the first engine object in the config file is used as default_**. If multiple engine objects have this property (which should be avoided), then the first one with it will be used as default.
- `alias`: _optional_ - accepts a string or array of strings that can be used instead of `<engine_key>`.
- `routes`: _optional_ - accepts an object that represents engine routes:
  - `<route_key>`: a string representing the route that is supplied to the `route` option. It accepts a string value of the route's actual segment of the URL. Think of the `<route_key>` as an alias for the route. For example, in a routes key-value pair like this: `"repos": "username?tab=repositories"` - the `repos` is what's provided to the `route` option, while the `username?tab=repositories` is what's actually used to build the web query URL.

### _TypeScript representation of the above JSON data_

```typescript
interface Engines {
  [engineKey: string]: {
    name: string;
    url: string;
    query?: string;
    delimiter?: string;
    isDefault?: boolean;
    alias?: string | string[];
    routes?: Routes;
  };
}

interface Routes {
  [routeKey: string]: string;
}
```

### _Example engines config_

```json
{
  "google": {
    "name": "Google",
    "url": "google.com",
    "query": "search?q="
  },
  "duckduckgo": {
    "name": "DuckDuckGo",
    "url": "duckduckgo.com",
    "query": "?q=",
    "delimiter": "+",
    "alias": ["duck", "ddg"]
  },
  "youtube": {
    "name": "YouTube",
    "url": "youtube.com",
    "query": "results?search_query=",
    "delimiter": "+",
    "alias": ["y", "yt"]
  },
  "mdn": {
    "name": "MDN",
    "url": "developer.mozilla.org",
    "query": "search?q=",
    "alias": "m"
  },
  "github": {
    "name": "Github",
    "url": "github.com",
    "query": "search?q=",
    "alias": ["git", "gh"],
    "routes": {
      "repos": "username?tab=repositories",
      "stars": "username?tab=stars"
    }
  }
}
```

# Custom Flags

When browsers and engines config files are set up, certain keys and alias values automatically become _flags_. You can use these custom flags as substitutes for `browser`, `profile`, and `engine` options.

For example, the following command with value options

<pre><code>web <em>--browser=chrome --profile=dev --engine=mdn</em></code></pre>

can be re-written using custom flags:

<pre><code>web <em>--chrome --dev --mdn</em></code></pre>

> If a custom flag conflicts with an [_option_](#options) or its alias, the query option takes precedence.

## How custom flags are created

The following config items are used to create custom flags:

|         | keys | alias values | 1-letter alias values |
| ------- | :--: | :----------: | :-------------------: |
| browser |  ✅  |      ✅      |          ✅           |
| profile |  ✅  |      ✅      |          ❌           |
| engine  |  ✅  |      ✅      |          ✅           |

### _Browsers config_

Let's say we have the following browsers config:

```json
{
  "chrome": {
    "alias": "c",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "personal": {
        "directory": "Profile 2",
        "alias": "p"
      }
    }
  },
  "edge": {
    "alias": "e",
    "profiles": {
      "dev": {
        "directory": "Profile 1",
        "alias": "d"
      },
      "school": {
        "directory": "Profile 2",
        "alias": ["s", "study"]
      }
    }
  },
  "firefox": {
    "alias": ["f", "ff", "fox"]
  }
}
```

These items from the above config can be used as custom flags:

|         |           keys            |    alias values    |
| ------- | :-----------------------: | :----------------: |
| browser | `chrome` `edge` `firefox` | `c` `f` `ff` `fox` |
| profile | `dev` `personal` `school` |      `study`       |

💡 Notice that the browser alias `e` cannot be used as a custom flag because it conflicts with the alias of the `engine` option.

### _Engines config_

Here's an example of an engines config:

```json
{
  "google": {
    "name": "Google",
    "url": "google.com",
    "query": "search?q=",
    "alias": "g"
  },
  "duckduckgo": {
    "name": "DuckDuckGo",
    "url": "duckduckgo.com",
    "query": "?q=",
    "delimiter": "+",
    "alias": ["duck", "ddg"]
  },
  "youtube": {
    "name": "YouTube",
    "url": "youtube.com",
    "query": "results?search_query=",
    "delimiter": "+",
    "alias": ["y", "yt"]
  },
  "mdn": {
    "name": "MDN",
    "url": "developer.mozilla.org",
    "query": "search?q=",
    "alias": "m"
  },
  "reddit": {
    "name": "Reddit",
    "url": "reddit.com",
    "query": "search?q=",
    "alias": "r"
  }
}
```

The following items from the above config can be used as custom flags:

|                 keys                  |         alias values          |
| :-----------------------------------: | :---------------------------: |
| `google` `duckduckgo` `youtube` `mdn` | `g` `duck` `ddg` `y` `yt` `m` |

💡 Notice that the engine alias `r` cannot be used as a custom flag because it conflicts with the alias of the `route` option.
