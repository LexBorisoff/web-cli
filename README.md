<h1 align="center"> Web CLI</h1>

Web CLI is a configurable Node.js application for making web searches from a terminal. It allows using different browsers, browser profiles, search engines and websites via the `web` command.

## Installation <a name="installation"></a>

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready to use without any initial setup.

To check the installed version, use the `--version` (`-v`) option:

<pre><code>web <em>--version</em></code></pre>

## Table of Contents <a name="table-of-contents"></a>

* [Basic Usage](#basic-usage)
* [Query Options](#query-options)
  * [Options Overview](#options-overview)
    * [Usage](#options-usage)
    * [Value Options](#value-options)
    * [Flag options](#flag-options)
    * [Options Placement](#options-placement)
  * [Options Details](#options-details)
    * [browser](#option-browser)
    * [profile](#option-profile)
    * [engine](#option-engine)
    * [route](#option-route)
    * [incognito](#option-incognito)
    * [keyword](#option-keyword)
    * [split](#option-split)
    * [http](#option-http)
* [Configuration](#configuration-setup)
  * [the `--config` option](#config-option)
  * [Setting Up Configuration](#setting-up-configuration)
    * [Browsers](#browsers-configuration)
    * [Engines](#engines-configuration)
* [Custom Flags](#custom-flags)

## Basic Usage <a name="basic-usage"></a>

```
web <values>
```

The above creates a web query using the provided *space-separated* ***values*** as a search term and opens the query in a new browser tab.

When not supplying any [options](#query-options) to the command, the app uses the ***default search engine*** to construct the query and the ***default browser*** to open the query in.

* After installation, you get a set of initial search engines that you can use, with Google being the default.
* If browsers configuration is not set up, the operating system's default browser is used.

You can change these defaults, as well as add new browsers and engines in the app's config files (see [*Setting Up Configuration*](#setting-up-configuration)).

## Query Options <a name="query-options"></a>

### Options Overview <a name="options-overview"></a>

Query options give you control over the web queries by overriding the app's defaults.

#### *Usage* <a name="options-usage"></a>


To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

An option's short (1-letter) alias is prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option requires a value ([value options](#value-options)), provide it in one of the following ways *(short aliases can also be used)*

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This will help avoid any confusion between what is an option's value and what's an actual keyword.

Short aliases can be combined together with a single dash `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

Which is effectively this:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> ***Use Caution!***  
> Combining short aliases of multiple [value options](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [flag options](#flag-options) with no more than 1 value option placed at the very end of the combination (if the value option is placed in the middle, it will not get assigned the value).

#### *Value Options* <a name="value-options"></a>

The following are built-in options that require a value when supplying them to the command:

| Option | Alias | Description | Config Type |
|-|:-:|-|:-:|
|[`browser`](#option-browser)|[`b`](#option-browser)|*The browser app to open*|[*browsers*](#browsers-configuration)|
|[`profile`](#option-profile)|[`p`](#option-profile)|*The browser profile to use*|[*browsers*](#browsers-configuration)&nbsp;⚙️|
|[`engine`](#option-engine)|[`e`](#option-engine)|*The search engine (or website) to query*|[*engines*](#engines-configuration)|
|[`route`](#option-route)|[`r`](#option-route)|*The engine's route to open or query*|[*engines*](#engines-configuration)|

> ⚙️ indicates that configuration is required.

All value options, except `profile`, work without any initial configuration but, when such config is set up, the options' usage becomes more enhanced. Refer to each option as well as [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration) for more details.

#### *Flag Options* <a name="flag-options"></a>

Options that do not require a value are called ***flags***. The following are built-in flag options:

| Option | Alias | Description |
|-|:-:|-|
|[`incognito`](#option-incognito)|[`i`](#option-incognito)|*Open in incognito / private mode*|
|[`keyword`](#option-keyword)|[`k`](#option-keyword)|*Treat all values as keywords for the web query*|
|[`split`](#option-split)|[`s`](#option-split)|*Split values into separate web queries*|
|[`http`](#option-http)|-|*Use the HTTP (non-secure) protocol*|

> ***Caveat!***  
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to ***"true"*** but the option will still accept a boolean value that's placed  after it (even without the explicit `=`). Therefore, make sure to not accidentally assign ***"true"*** or ***"false"*** to a flag if you do not intend it. Doing so will result in your web query missing the keyword ***"true"*** or ***"false"*** from the search term.

With browsers and engines configuration set up, you can also use ***custom flags*** which are created from the keys and aliases of *browsers*, *browser profiles*, and *engines* from the config files. Custom flags simplify your web queries by being a convenient substitute for value options (see [*Custom Flags*](#custom-flags) for more details).

#### *Options Placement* <a name="options-placement"></a>

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

---

### Options Details

### `--browser`&nbsp;&nbsp;`-b` The browser app to open <a name="option-browser"></a>

✅ Requires a value.  
❌ Configuration is optional.

#### ***Description***

Specifies in which browser app to open the new tab.

#### ***Usage***

<pre><code>web <em>--browser=value</em></code></pre>

`value` refers to the browser app name, or the browser's key or alias in the ***browsers*** config.

> ***Note!***  
> The program will not prevent you from specifying a value that refers to an invalid browser or to another non-browser application on your machine. If the value refers to an app that's installed, the program will attempt to open it as it does not differentiate between which apps are browsers and which ones are not.

You can specify multiple browsers:

<pre><code>web <em>--browser=value</em> <em>--browser=value</em> ...</code></pre>

#### ***Requirements***
* The requested browser must be installed on the machine.

#### ***Configuration***

To use browser aliases as the option's value, set up [browsers configuration](#browsers-configuration).


---

### `--profile`&nbsp;&nbsp;`-p` The browser profile to use <a name="option-profile"></a>

✅ Requires a value.  
✅ Requires configuration.

#### ***Description***

Specifies what browser profile to use when opening a new tab.

#### ***Usage***

<pre><code>web <em>--profile=value</em></code></pre>

`value` refers to the profile's key or alias in the ***browsers*** config.

> The option should be used together with the `browser` option. If the browser option is NOT supplied, the program will search the provided profile value (key or alias) in the config's ***default browser***.

> If the profile value is not matched in the provided browser's config, the program will not open the query.

You can specify multiple profiles:

<pre><code>web <em>--profile=value</em> <em>--profile=value</em> ...</code></pre>

If multiple ***browser*** options are supplied, the program will match the profile values to the browsers that include them in the config. So it is safe to provide multiple profiles and multiple browsers even if ***all profiles do not belong to each individual browser*** but as long as ***each individual profile can be matched with some or all of the provided browsers***.

For example:

<pre><code>web <em>--browser=b1</em> <em>--browser=b2</em> <em>--profile=p1</em> <em>--profile=p2</em></code></pre>

Profile `p1` might belong to browser `b1` but not to browser `b2` as long as the second provided profile `p2` belongs to either `b1` or `b2` (or even both). This is just 1 example - there could be many different scenarios like this.

Remember, if no browser option is supplied, all profile values must belong to the default config browser (see how the default values are determined in [Setting Up Configuration](#setting-up-configuration)).

Different browsers can have the same profile keys and aliases in the config.

#### ***Requirements***

* The browser app must support profiles.
* The profile must be set up in the config file.

#### ***Configuration***

To use the option, set up profiles in [browsers configuration](#browsers-configuration).

---

### `--engine`&nbsp;&nbsp;`-e` The search engine (or website) to query <a name="option-engine"></a>

✅ Requires a value.  
❌ No ***initial*** configuration is required.

#### ***Description***

Specifies what search engine or website to query.

#### ***Usage***

<pre><code>web <em>--engine=value</em></code></pre>

`value` refers to the engine's key or alias in the ***engines*** config.

#### ***Configuration***

To use more engines and websites, add them to [engines configuration](#engines-configuration).

---

### `--route`&nbsp;&nbsp;`-r` The engine's route to open or query <a name="option-route"></a>

---

### `--incognito`&nbsp;&nbsp;`-i` Open in incognito / private mode <a name="option-incognito"></a>

---

### `--keyword`&nbsp;&nbsp;`-k` Treat all values as keywords for the web query <a name="option-keyword"></a>

---

### `--split`&nbsp;&nbsp;`-s` Split values into separate web queries <a name="option-split"></a>

---

### `--http` Use the HTTP (non-secure) protocol <a name="option-http"></a>

---

## Configuration <a name="configuration-setup"></a>

### Browsers Configuration <a name="browsers-configuration"></a>

### Engines Configuration <a name="engines-configuration"></a>

## Custom Flags <a name="custom-flags"></a>

When you set up browsers and engines config files, certain keys and values automatically become *flags*. You can use these custom flags as a substitute for `browser`, `profile`, and `engine` options.

For example, the following command with value options

<pre><code>web <em>--browser=chrome --profile=dev --engine=mdn</em></code></pre>

can be re-written by using custom flags:

<pre><code>web <em>--chrome --dev --mdn</em></code></pre>

... assuming the Chrome profile "***dev***" and the engine "***mdn***" are set up.

> If a custom flag conflicts with a query option or alias [listed above](#query-options), the query option takes precedence and you must use the value option in that case.

#### *How Custom Flags Are Created*

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
