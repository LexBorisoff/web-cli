<h1 align="center"> Web CLI</h1>

Web CLI is a configurable Node.js application for making web searches from a terminal. It allows using different browsers, browser profiles, search engines and websites via the `web` command.

# Installation <a name="installation"></a>

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready to use without any initial setup.

To check the installed version, use the `--version` (`-v`) option:

<pre><code>web <em>--version</em></code></pre>

# Table of Contents <a name="table-of-contents"></a>

* [Basic Usage](#basic-usage)
  * [Keywords](#basic-usage-keywords)
  * [URLs](#basic-usage-urls)
* [Query Options](#query-options)
  * [Usage](#options-usage)
  * [Value options](#value-options)
  * [Flag options](#flag-options)
  * [Placement](#options-placement)
* [Built-in Options](#built-in-options)
    * [`browser`](#option-browser)
    * [`profile`](#option-profile)
    * [`engine`](#option-engine)
    * [`route`](#option-route)
    * [`incognito`](#option-incognito)
    * [`split`](#option-split)
    * [`http`](#option-http)
* [Configuration](#configuration-setup)
  * [Browsers](#browsers-configuration)
  * [Engines](#engines-configuration)
* [Custom Flags](#custom-flags)

# Basic Usage <a name="basic-usage"></a>

To perform basic web queries from the terminal, provide ***space-separated values*** to the `web` command:

<pre><code>web <em>&lt;values&gt;</em></code></pre>

The app will then construct 1 or more queries based on the type of values and open the them in the new browser tab(s).

There are 2 types of values:

1. Keywords
2. URLs

## Keywords <a name="basic-usage-keywords"></a>

When providing keywords to the command, only 1 web query is created using the values as a search term. For example:

```shell
web hello world in javascript
```

&gt; `https://google.com/search?q=hello world in javascript`

In the absence of [*query options*](#query-options), the app uses the ***default search engine*** to construct the query and the ***default browser*** to open it in:

* After installation, you get a set of initial search engines that you can use, with Google being the default.
* The operating system's default browser is used unless the browsers configuration is set up.

You can change these defaults, as well as add new browsers and engines in the app's [*configuration*](#configuration-setup).

## URLs <a name="basic-usage-urls"></a>

When providing a URL as a value, the default behavior is to access that URL directly:

```shell
web github.com
```

&gt; `https://github.com`

If multiple URLs are supplied, each URL is accessed via a separate web query:

```shell
web github.com npmjs.com developer.mozilla.org
```

&gt; `https://github.com`  
&gt; `https://npmjs.com`  
&gt; `https://developer.mozilla.org`

### *Keywords and URLs together*

If both keywords and URLs are provided, then all values are treated as search term keywords:

```shell
web most starred repos on github.com
```

&gt; `https://google.com/search?q=most starred repos on github.com`

# Query Options <a name="query-options"></a>


Query options give you control over the web queries by overriding app defaults.

## Usage <a name="options-usage"></a>


To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

An option's short (1-letter) alias is prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option requires a value ([*value options*](#value-options)), provide it in one of the following ways *(short aliases can also be used)*

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This helps avoid any confusion between what is an option's value and what is an actual keyword.

Short aliases can be combined together with a single dash `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

Which is effectively this:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> ***Use Caution!***  
> Combining short aliases of multiple [*value options*](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [*flag options*](#flag-options) with no more than 1 value option placed at the very end of the combination (if the value option is placed in the middle, it will not get assigned the value).


## Value options <a name="value-options"></a>

The following are built-in options that require a value:

| Option | Alias | Description | Config Type |
|-|:-:|-|:-:|
|[`browser`](#option-browser)|[`b`](#option-browser)|*The browser app to open*|[*browsers*](#browsers-configuration)|
|[`profile`](#option-profile)|[`p`](#option-profile)|*The browser profile to use*|[*browsers*](#browsers-configuration)&nbsp;⚙️|
|[`engine`](#option-engine)|[`e`](#option-engine)|*The search engine (or website) to query*|[*engines*](#engines-configuration)|
|[`route`](#option-route)|[`r`](#option-route)|*The engine's route to access*|[*engines*](#engines-configuration)|

> ⚙️ indicates that configuration is required.

All value options, except `profile`, work without any initial configuration but the options' usage becomes more enhanced when such config is set up. Refer to each option as well as [*browsers configuration*](#browsers-configuration) and [*engines configuration*](#engines-configuration) for more details.

## Flag options <a name="flag-options"></a>

Options that do not require a value are called ***flags***. The following are built-in flag options:

| Option | Alias | Description |
|-|:-:|-|
|[`incognito`](#option-incognito)|[`i`](#option-incognito)|*Open in incognito / private mode*|
|[`split`](#option-split)|[`s`](#option-split)|*Split values into separate web queries*|
|[`http`](#option-http)|-|*Use the HTTP (non-secure) protocol*|

> ***Caveat!***  
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to ***"true"*** but the option will still accept a boolean value that's placed  after it (even without the explicit `=` sign). Therefore, make sure to not accidentally assign ***"true"*** or ***"false"*** to a flag if you do not intend it. Doing so will result in your web query missing the keyword ***"true"*** or ***"false"*** from the search term.

With browsers and engines configuration set up, you can also use [*custom flags*](#custom-flags) which are created from the keys and aliases of *browsers*, *browser profiles*, and *engines* from the config files. Custom flags simplify your web queries by being a convenient substitute for value options.

## Placement <a name="options-placement"></a>

Options can be placed anywhere in the command

<pre><code>web <em>--browser=firefox</em> this is <em>--incognito</em> an example <em>--engine=duckduckgo</em> search query</code></pre>


<pre><code>web <em>-b=firefox</em> this is <em>-i</em> an example <em>-e=duckduckgo</em> search query</code></pre>

> Normally, you would place the options where they make sense visually (such as the beginning or the end of the command) or as you need them when you construct a query.

The above command will do the following:

* construct a web query using
  * the keywords ***"this is an example search query"***
  * the ***DuckDuckGo*** search engine (`--engine=duckduckgo`)
* open the constructed query in a new ***Firefox*** tab (`--browser=firefox`)
* in ***incognito / private mode*** (`--incognito`)

# Built-in Options <a name="built-in-options"></a>

## `--browser`&nbsp;&nbsp;`-b` <a name="option-browser"></a>

Specifies the browser app in which to open the new tab.

✅ Requires a value.  
⭕ Configuration is optional.

### ***Usage***

<pre><code>web <em>--browser=value</em></code></pre>

`value` refers to the browser app name, or the browser's key or alias in the ***browsers*** config.

> ***Note!***  
> The command will not prevent you from specifying a value that refers to an invalid browser or to another non-browser application on your machine. As far as the program is concerned - any value provided to the `browser` option is a possible browser app, so it will attempt to open it.

You can specify multiple browsers to open:

<pre><code>web <em>--browser=value</em> <em>--browser=value</em> ...</code></pre>

### ***Requirements***
* The requested browser must be installed on the machine.

### ***Configuration***

To use browser aliases as the option's value, set up [*browsers configuration*](#browsers-configuration).

## `--profile`&nbsp;&nbsp;`-p` <a name="option-profile"></a>

Specifies what browser profile to use when opening a new tab.

✅ Requires a value.  
✅ Requires ***browsers*** configuration.

### ***Usage***

<pre><code>web <em>--profile=value</em></code></pre>

`value` refers to the profile's key or alias in the ***browsers*** config.

> The option should be used together with the `browser` option. However, if the browser option is NOT supplied, the program will use the config's ***default browser*** to find the provided profile value (see how default values are determined in [*setting up configuration*](#configuration-setup)).
>
> ***Important!***  
> If the profile value is not found in the provided (or default) browser's config, the program will not open the query.

You can specify multiple profiles:

<pre><code>web <em>--profile=value</em> <em>--profile=value</em> ...</code></pre>

If multiple ***browser*** options are supplied, the program will attach each profile to one or more browsers that include that profile in their configs. So it is safe to supply multiple browsers and multiple profiles even if ***all profiles do not belong to each browser*** but as long as ***each profile can be matched with one or more browsers***.

For example:

<pre><code>web <em>--browser=b1</em> <em>--browser=b2</em> <em>--profile=p1</em> <em>--profile=p2</em></code></pre>

Profile `p1` might belong to browser `b1` but not to browser `b2` as long as the second profile `p2` belongs to either `b1` or `b2` or both. This is just 1 example - there could be many different scenarios like this.

> Remember, if no browser option is supplied, all profile values must belong to the default ***config*** browser (not to the operating system's default browser).

Different browsers can have the same profile keys and aliases in their configs.

### ***Requirements***

* The browser app must support profiles.
* The profile must be set up in the config file.

### ***Configuration***

To use the option, set up profiles in [*browsers configuration*](#browsers-configuration).


## `--engine`&nbsp;&nbsp;`-e` <a name="option-engine"></a>

Specifies what search engine or website to query.

✅ Requires a value.  
⭕ No ***initial*** configuration is required.

### ***Usage***

<pre><code>web <em>--engine=value</em></code></pre>

`value` refers to the engine's key or alias in the ***engines*** config.

When supplying URLs to the command, this option overrides the default behavior of accessing the URLs directly. Instead, they are treated as search term keywords for the provided engine. For example:

<pre><code>web github.com <em>--engine=google</em></code></pre>

&gt; `https://google.com/search?q=github.com`

### ***Configuration***

To use more engines and websites than the app defaults, add them to [*engines configuration*](#engines-configuration).

## `--route`&nbsp;&nbsp;`-r` <a name="option-route"></a>

Overrides the default behavior of *querying* a search engine by specifying the engine's route to access directly.

✅ Requires a value.  
⭕ Configuration is optional.

### ***Usage***

#### 1. Without command values

<pre><code>web <em>--route=value</em></code></pre>

`value` refers to the engine's route to access.

> The option should be used together with the `engine` option. However, if the engine option is NOT supplied, the program will use the config's ***default engine*** to build the query (see how default values are determined in [*setting up configuration*](#configuration-setup)).

For example, the following command adds "teapot" to the engine's URL to access the route directly instead of searching it as a keyword.

<pre><code>web <em>--engine=google</em> <em>--route=teapot</em></code></pre>

&gt; `https://google.com/teapot`

#### 2. With command values

When supplying values to the command, each value is used in a separate web query as a URL path segment after the provided route.

For example, the following creates 3 distinct web queries:

<pre><code>web <em>--engine=npm</em> <em>--route=package</em> lodash axios express</code></pre>

&gt; `https://npmjs.com/package/lodash`  
&gt; `https://npmjs.com/package/axios`  
&gt; `https://npmjs.com/package/express`

### ***Configuration***

The option's value can be a key from an engine's `routes` property in [*engines configuration*](#engines-configuration). When this config property is set up, the program will search it first to find the provided value among the property's keys. If it is not there, then the supplied value itself is used to build the web query.

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

<pre><code>web <em>--engine=github</em> <em>--route=repos</em></code></pre>

&gt; `https://github.com/username?tab=repositories`

## `--incognito`&nbsp;&nbsp;`-i` <a name="option-incognito"></a>

Opens web queries in a private / incognito mode.

🚩 Flag option - no value is required.  
❌ No configuration.

### ***Usage***

<pre><code>web <em>--incognito</em></code></pre>

## `--split`&nbsp;&nbsp;`-s` <a name="option-split"></a>

Splits provided values into separate web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

### ***Usage***

<pre><code>web <em>--engine=mdn</em> Object Symbol class <em>--split</em></code></pre>

&gt; `https://developer.mozilla.org/search?q=Object`  
&gt; `https://developer.mozilla.org/search?q=Symbol`  
&gt; `https://developer.mozilla.org/search?q=class`

## `--http` <a name="option-http"></a>

Uses the HTTP (non-secure) protocol when constructing the web queries.

🚩 Flag option - no value is required.  
❌ No configuration.

### ***Usage***

The default behavior is to always use the HTTPS (secure) protocol when building web queries. But sometimes this might not be convenient, especially when trying to access a URL, such as your project website, that does not have a secure certificate. In such cases, using the option overrides this default.

<pre><code>web example.com <em>--http</em></code></pre>

&gt; `http://example.com`

# Configuration <a name="configuration-setup"></a>

Setting up configuration allows to enhance some of the [built-in options](#built-in-options) as well as to use [custom flags](#custom-flags).

Both browsers and engines configurations are in the JSON format. To open a corresponding config file, use the `config` option which accepts one of the values: `browsers` or `engines`:

<pre><code>web <em>--config=browsers</em></code></pre>

<pre><code>web <em>--config=engines</em></code></pre>

The files will open in the OS default application for editing JSON. Optionally, you can supply 1 or more space-separated apps to open the config files in:

<pre><code>web <em>--config=browsers</em> code</code></pre>

<pre><code>web <em>--config=engines</em> notepad++</code></pre>

Modifying each config requires you to follow their accepted data structures explained below.

## Browsers <a name="browsers-configuration"></a>

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
> ***Note!***  
> Setting up browsers configuration does not limit you to using only the browsers in the config. You can still supply other browser values to the `browser` option, but using custom flags is only available after setting up the config.

* `<browser_key>`: a string representing the browser app that is supplied to the `browser` option.
* `isDefault`: *optional* - accepts a boolean value indicating if the browser should be used as default. ***If not present, then the first browser object in the config file is used as default***. If multiple browser objects have this property, then the first one with it will be used as default.
* `alias`: *optional* - accepts a string or array of strings that can be used instead of `<browser_key>`.
* `profiles`: *optional* - accepts an object that represents browser profiles:
  * `<profile_key>`: a string representing the browser profile that is supplied to the `profile` option.
  * `directory`: *required* - accepts a string representing the profile's exact directory name (NOT the full path, just the folder name). Different operating systems have different ways of storing user's browser profile data - please search how to find such folder on your OS, if you are not sure.
  * `alias`: *optional* - accepts a string or array of strings that can be used instead of `<profile_key>`.

### *TypeScript reference representing the above JSON data*

```typescript
interface Browsers {
  [browserKey: string]: {
    isDefault?: boolean;
    alias?: string | string[];
    profiles?: Profiles
  }
}

interface Profiles {
  [profileKey: string]: {
    directory: string;
    isDefault?: boolean;
    alias?: string | string[];
  }
}
```

### *Example browsers config*

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
    "alias": ["f", "ff", "fox"],
  }
}
```

## Engines <a name="engines-configuration"></a>

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

* `<engine_key>`: a string representing the search engine or website that is supplied to the `engine` option.
* `name`: *required* - accepts a string representing the name of the search engine / website.
* `url`: *required* - accepts a string of the engine's base URL ***without the protocol*** and ***without the query string***. For example, in a URL like this: `https://google.com/search?q=whatever` - supply only `google.com`.
* `query`: *optional* - accepts a string representing the search engine's query string. Following the example above: `https://google.com/search?q=whatever` - the query string is `search?q=` which sits between the engine's base url and the search keywords. To find an engine's query string, go to its URL then type anything in its search box and hit enter. You will find that most websites and search engines have their own query string that you can grab. If not, then that engine cannot be used for searching with the query string.
* `delimiter`: *optional* - accepts a string (normally a single character) representing the delimiter between search term keywords. Sometimes you will find that search engines modify the search query URL by replacing the space with another character, such as a `+` sign. If you find that the engine has a different delimiter, then provide it here. ***The default delimiter is the space character***.
* `isDefault`: *optional* - accepts a boolean value indicating if the engine should be used as default. ***If not present, then the first engine object in the config file is used as default***. If multiple engine objects have this property, then the first one with it will be used as default.
* `alias`: *optional* - accepts a string or array of strings that can be used instead of `<engine_key>`.
* `routes`: *optional* - accepts an object that represents engine routes:
  * `<route_key>`: a string representing the route that is supplied to the `route` option. It accepts a string value of the route's actual segment of the URL. Think of the `<route_key>` as an alias for the route. For example, in a routes key-value pair like this: `"repos": "username?tab=repositories"` - the `repos` is what's provided to the `route` option, while the `username?tab=repositories` is what's actually used to build the web query URL.

### *TypeScript reference representing the above JSON data*

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
  }
}

interface Routes {
  [routeKey: string]: string;
}
```

### *Example engines config*

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
  },
}
```

# Custom Flags <a name="custom-flags"></a>

When browsers and engines config files are set up, certain keys and values automatically become *flags*. You can use these custom flags as substitutes for `browser`, `profile`, and `engine` options.

For example, the following command with value options

<pre><code>web <em>--browser=chrome --profile=dev --engine=mdn</em></code></pre>

can be re-written using custom flags:

<pre><code>web <em>--chrome --dev --mdn</em></code></pre>

> If a custom flag conflicts with a [*query option*](#query-options) or its alias, the query option takes precedence and you must use the value option in that case.

## How custom flags are created

The following config items are used to create custom flags:

||keys|alias values|
|-|:-:|:-:|
|browser|✅|✅|
|profile|✅|✅|
|engine|✅|✅|

### *Browsers config*

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
    "alias": ["f", "ff", "fox"],
  }
}
```
These items from the above config can be used as custom flags:

||keys|alias values
|-|:-:|:-:|
|browser|`chrome` `edge` `firefox`|`c` `f` `ff` `fox`|
|profile|`dev` `personal` `school`|`d`, `study`|

💡 Notice that the browser alias `e`, as well as profile aliases `p` and `s` cannot be used as custom flags because they conflict with aliases of `engine`, `profile` and `split` options.

### *Engines config*

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

|keys|alias values
|:-:|:-:|
|`google` `duckduckgo` `youtube` `mdn`|`g` `duck` `ddg` `y` `yt` `m`|

💡 Notice that the engine alias `r` cannot be used as a custom flag because it conflicts with the alias of the `route` option.
