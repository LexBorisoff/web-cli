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
* [Query Options](#query-options)
  * [Usage](#option-using)
  * [Value options](#value-options)
  * [Flag options](#flag-options)
  * [Placement](#option-placement)
* [Configuration](#configuration-setup)
  * [Browsers](#browsers-configuration)
  * [Engines](#engines-configuration)
* [Built-in Options](#built-in-options)
    * [`config`](#option-config)
    * [`browser`](#browser-option)
    * [`profile`](#profile-option)
    * [`engine`](#engine-option)
    * [`route`](#route-option)
    * [`incognito`](#incognito-option)
    * [`keyword`](#keyword-option)
    * [`split`](#split-option)
    * [`http`](#http-option)
* [Custom Options](#custom-options)

# Basic Usage <a name="basic-usage"></a>

<pre><code>web <em>&lt;values&gt;</em></code></pre>

Replace *&lt;values&gt;* with space-separated search term keywords to create a web query. The app will then open the query in a new browser tab.

When not supplying any [query options](#query-options) to the command, the app uses the ***default search engine*** to construct the query and the ***default browser*** to open it in:

* After installation, you get a set of initial search engines that you can use, with Google being the default.
* The operating system's default browser is used until the browsers configuration is set up.

You can change these defaults, as well as add new browsers and engines in the app's config files (see [*Configuration*](#configuration-setup)).


# Query Options <a name="query-options"></a>


Query options give you control over the web queries by overriding program defaults.

## Usage <a name="option-usage"></a>


To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

An option's short (1-letter) alias is prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option requires a value ([value options](#value-options)), provide it in one of the following ways *(short aliases can also be used)*

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This helps avoid any confusion between what is an option's value and what is an actual keyword.

Short aliases can be combined together with a single dash `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

Which is effectively this:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> ***Use Caution!***  
> Combining short aliases of multiple [value options](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [flag options](#flag-options) with no more than 1 value option placed at the very end of the combination (if the value option is placed in the middle, it will not get assigned the value).


## Value Options <a name="value-options"></a>

The following are built-in options that require a value:

| Option | Alias | Description | Config Type |
|-|:-:|-|:-:|
|[`browser`](#option-browser)|[`b`](#option-browser)|*The browser app to open*|[*browsers*](#browsers-configuration)|
|[`profile`](#option-profile)|[`p`](#option-profile)|*The browser profile to use*|[*browsers*](#browsers-configuration)&nbsp;⚙️|
|[`engine`](#option-engine)|[`e`](#option-engine)|*The search engine (or website) to query*|[*engines*](#engines-configuration)|
|[`route`](#option-route)|[`r`](#option-route)|*The engine's route to access*|[*engines*](#engines-configuration)|

> ⚙️ indicates that configuration is required.

All value options, except `profile`, work without any initial configuration but the options' usage becomes more enhanced when such config is set up. Refer to each option as well as [*browsers configuration*](#browsers-configuration) and [*engines configuration*](#engines-configuration) for more details.

## Flag Options <a name="flag-options"></a>

Options that do not require a value are called ***flags***. The following are built-in flag options:

| Option | Alias | Description |
|-|:-:|-|
|[`incognito`](#option-incognito)|[`i`](#option-incognito)|*Open in incognito / private mode*|
|[`keyword`](#option-keyword)|[`k`](#option-keyword)|*Treat all values as keywords for the web query*|
|[`split`](#option-split)|[`s`](#option-split)|*Split values into separate web queries*|
|[`http`](#option-http)|-|*Use the HTTP (non-secure) protocol*|

> ***Caveat!***  
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to ***"true"*** but the option will still accept a boolean value that's placed  after it (even without the explicit `=` sign). Therefore, make sure to not accidentally assign ***"true"*** or ***"false"*** to a flag if you do not intend it. Doing so will result in your web query missing the keyword ***"true"*** or ***"false"*** from the search term.

With browsers and engines configuration set up, you can also use [***custom flags***](#custom-flags) which are created from the keys and aliases of *browsers*, *browser profiles*, and *engines* from the config files. Custom flags simplify your web queries by being a convenient substitute for value options.

## Placement <a name="option-placement"></a>

Options can be placed anywhere in the command

<pre><code>web <em>--browser=firefox</em> this is <em>--incognito</em> an example <em>--engine=duckduckgo</em> search query</code></pre>


<pre><code>web <em>-b=firefox</em> this is <em>-i</em> an example <em>-e=duckduckgo</em> search query</code></pre>

> Normally, you would place your options where they make sense visually (such as the beginning or the end of the command) or as you need them when you construct your query.

The above command will do the following:

* construct a web query using
  * the values ***"this is an example search query"***
  * the ***DuckDuckGo*** search engine (`--engine=duckduckgo`)
* open the constructed query in a new ***Firefox*** tab (`--browser=firefox`)
* in ***incognito / private mode*** (`--incognito`)

# Configuration <a name="configuration-setup"></a>

## Browsers Configuration <a name="browsers-configuration"></a>

## Engines Configuration <a name="engines-configuration"></a>

# Built-in Options <a name="built-in-options"></a>

* [`config`](#config-option)
* [`browser`](#browser-option)
* [`profile`](#profile-option)
* [`engine`](#engine-option)
* [`route`](#route-option)
* [`incognito`](#incognito-option)
* [`keyword`](#keyword-option)
* [`split`](#split-option)
* [`http`](#http-option)

## `--browser`&nbsp;&nbsp;`-b` The browser app to open <a name="browser-option"></a>

✅ Requires a value.  
⭕ Configuration is optional.

### ***Description***

Specifies the browser app in which to open the new tab.

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

To use browser aliases as the option's value, set up [browsers configuration](#browsers-configuration).


## `--profile`&nbsp;&nbsp;`-p` The browser profile to use <a name="profile-option"></a>

✅ Requires a value.  
✅ Requires ***browsers*** configuration.

### ***Description***

Specifies what browser profile to use when opening a new tab.

### ***Usage***

<pre><code>web <em>--profile=value</em></code></pre>

`value` refers to the profile's key or alias in the ***browsers*** config.

> The option should be used together with the `browser` option. However, if the browser option is NOT supplied, the program will use the config's ***default browser*** to find the provided profile value (see how default values are determined in [setting up configuration](#configuration-setup)).
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

To use the option, set up profiles in [browsers configuration](#browsers-configuration).


## `--engine`&nbsp;&nbsp;`-e` The search engine (or website) to query <a name="engine-option"></a>

✅ Requires a value.  
⭕ No ***initial*** configuration is required.

### ***Description***

Specifies what search engine or website to query.

### ***Usage***

<pre><code>web <em>--engine=value</em></code></pre>

`value` refers to the engine's key or alias in the ***engines*** config.

### ***Configuration***

To use more engines and websites than the app defaults provide, add them to [engines configuration](#engines-configuration).

## `--route`&nbsp;&nbsp;`-r` The engine's route to access <a name="route-option"></a>

✅ Requires a value.  
⭕ Configuration is optional.

### ***Description***

Overrides the default behavior of *querying* a search engine by specifying the engine's route to access directly.


### ***Usage***

#### 1. Without command values

<pre><code>web <em>--route=value</em></code></pre>

`value` refers to the engine's route to access.

> The option should be used together with the `engine` option. However, if the engine option is NOT supplied, the program will use the config's ***default engine*** to build the query (see how default values are determined in [setting up configuration](#configuration-setup)).

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

The option's value can be a key from an engine's `routes` property in [engines configuration](#engines-configuration). If this config property is set up, the program will search it first to find the provided value among the property's keys. If it cannot be found, then the supplied value itself is used to build the query.

Setting the `routes` property can be useful when frequently accessing an engine's route that can be long to type in the command or hard to remember the full path of.

## `--incognito`&nbsp;&nbsp;`-i` Open in incognito / private mode <a name="incognito-option"></a>

## `--keyword`&nbsp;&nbsp;`-k` Treat all values as keywords for the web query <a name="keyword-option"></a>

## `--split`&nbsp;&nbsp;`-s` Split values into separate web queries <a name="split-option"></a>

## `--http` Use the HTTP (non-secure) protocol <a name="http-option"></a>

# Custom Options <a name="custom-options"></a>

When you set up browsers and engines config files, certain keys and values automatically become *flags*. You can use these custom flags as a substitute for `browser`, `profile`, and `engine` options.

For example, the following command with value options

<pre><code>web <em>--browser=chrome --profile=dev --engine=mdn</em></code></pre>

can be re-written by using custom flags:

<pre><code>web <em>--chrome --dev --mdn</em></code></pre>

... assuming the Chrome profile "***dev***" and the engine "***mdn***" are set up.

> If a custom flag conflicts with a query option or alias [listed above](#query-options), the query option takes precedence and you must use the value option in that case.

### *How Custom Flags Are Created*

Let's say we have the following ***browsers config***:
```js
{
  "chrome": {
    "alias": "c",
    "profiles:" {
      "dev": {
        "directory": "Profile 1",
        "alias": ["d"]
      },
      "personal": {
        "directory": "Profile 2",
        "alias": ["p"]
      }
    }
  },
  "edge": {
    "alias": "e",
    "profiles:" {
      "dev": {
        "directory": "Profile 1",
        "alias": ["d"]
      },
      "personal": {
        "directory": "Profile 2",
        "alias": ["p"]
      }
    }
  },
  "firefox": {
    "alias": ["f", "ff", "fox"],
  }
}
```
