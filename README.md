<h1 align="center"> Web CLI</h1>

Web CLI is a configurable Node.js application for making web searches from a terminal. It allows using different browsers, browser profiles, search engines and websites via the `web` command.

## Installation <a name="installation"></a>

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready to use without any initial setup.

To check the installed version, use the `--version` (`-v`) option:

<pre><code>web <em>--version</em></code></pre>

## Table of Contents <a name="installation"></a>

* [Basic Usage](#basic-usage)
* [Query Options](#query-options)
  * [Value Options](#value-options)
    * [browser](#option-browser)
    * [profile](#option-profile)
    * [engine](#option-engine)
    * [route](#option-route)
  * [Flag options](#flag-options)
    * [incognito](#option-incognito)
    * [keyword](#option-keyword)
    * [split](#option-split)
    * [http](#option-http)
  * [Options Placement](#options-placement)
* [Configuration](#configuration-setup)
  * [Browsers Configuration](#browsers-configuration)
  * [Engines Configuration](#engines-configuration)
* [Custom Flags](#custom-flags)

## Basic Usage <a name="basic-usage"></a>

<pre><code>web this is an example search query</code></pre>

The above creates a web query using the provided ***values*** as a *search term* and opens the query in a new browser tab.

Since we are not supplying any [options](#query-options) to the command in this example, it uses the **default search engine** to construct the query and opens your operating system's **default browser**.

After installing the CLI, you get a set of initial search engines that you can use, with Google being the default. You can change these defaults, as well as add new browsers and engines in the app's configuration (see [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration)).

## Query Options <a name="query-options"></a>

Query options give you control over the web queries by overriding the app's defaults.

To use an option in the command, prefix it with a double dash `--`

<pre><code>web <em>--option</em></code></pre>

An option's short (1-letter) alias is prefixed by a single dash `-`

<pre><code>web <em>-x</em></code></pre>

If an option [requires a value](#value-options), provide it in one of the following ways *(short aliases can also be used)*

<pre><code>web <em>--option=value</em></code></pre>
<pre><code>web <em>--option value</em></code></pre>

> The assignment syntax (`--option=value`) is preferred, especially when building larger web queries with many search term keywords. This will help avoid any confusion between what is an option's value and what is an actual keyword.

Short aliases can be combined together with a single `-` as long as their combination is valid:

<pre><code>web <em>-xyz</em></code></pre>

Which is effectively:

<pre><code>web <em>-x</em> <em>-y</em> <em>-z</em></code></pre>

> ***Use Caution!***  
> Combining short aliases of multiple [value options](#value-options) will result in invalid queries when such combinations are followed by a value. It is recommended to combine only the [flag options](#flag-options) with no more than 1 value option placed at the very end of the combination (if the value option is placed in the middle, it won't get assigned the value).


#### *Value Options* <a name="value-options"></a>

The following are built-in value options:

| Option | Alias | Description | Config Type |
|-|:-:|-|:-:|
|[`browser`](#option-browser)|[`b`](#option-browser)|*The browser app to open*|*browsers*|
|[`profile`](#option-profile)|[`p`](#option-profile)|*The browser profile to use*|*browsers*&nbsp;⚙️|
|[`engine`](#option-engine)|[`e`](#option-engine)|*The search engine (or website) to query*|*engines*|
|[`route`](#option-route)|[`r`](#option-route)|*The engine's route to open or query*|*engines*|

> The ⚙️ symbol indicates that setting up config is required.

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
> Flag options can be assigned values `true` and `false`. This is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to "***true***" but the option will still accept a boolean value that's placed  after it. Therefore, make sure to not accidentally assign "***true***" or "***false***" to a flag if you do not intend it. Doing so will result in your web query missing the keyword "***true***" or "***false***" from the search term.

With browsers and engines configuration set up, you can also use ***custom flags*** which are created from the keys and aliases of *browsers*, *browser profiles*, and *engines* in the config files. Custom flags simplify your web queries by being a convenient substitute for value options (see [*Custom Flags*](#custom-flags) for more details).

#### *Options Placement* <a name="options-placement"></a>

Options can be placed anywhere in the command

<pre><code>web <em>--browser=firefox</em> this is <em>--incognito</em> an example <em>--engine=duckduckgo</em> search query</code></pre>


<pre><code>web <em>-b=firefox</em> this is <em>-i</em> an example <em>-e=duckduckgo</em> search query</code></pre>

> Normally, you would place your options where they make sense visually (such as the beginning or the end of the command) or as you need them when you construct your query.

The above command will do the following:

* construct a search query using
  * values ***"this is an example search query"***
  * ***DuckDuckGo*** search engine (`--engine=duckduckgo`)
* open the constructed query in a new ***Firefox*** tab (`--browser=firefox`)
* in ***incognito / private mode*** (`--incognito`)

---

### `--browser`&nbsp;&nbsp;`-b` The browser app to open <a name="option-browser"></a>

✅ Requires a value.  
❌ Configuration is not required but can be used.

#### ***Description***

Specifies in which browser app the new tab should be opened.

#### ***Usage***

<pre><code>web <em>--browser=value</em></code></pre>

`value` refers to the browser name, or the browser's key or alias in the ***browsers*** config.

#### ***Requirements***
* The requested browser must be installed on the machine.

#### ***Configuration***

To use browser aliases as the option's value, set up [browsers configuration](#browsers-configuration)


---

### `--profile`&nbsp;&nbsp;`-p` The browser profile to use <a name="option-profile"></a>

✅ Requires a value.  
✅ Requires configuration.

#### ***Description***

Specifies what browser profile should be used when opening a new browser tab.

#### ***Usage***

<pre><code>web <em>--profile=value</em></code></pre>

`value` refers to the profile's key or alias in the ***browsers*** config.

> If the `profile` option is supplied to the command without the `browser` option, the program will search the provided profile value (key or alias) in the config's ***default browser***.

#### ***Requirements***

* The browser app must support profiles.
* The profile must be set up in the config file.

#### ***Configuration***

To use the option, set up profiles in [browsers configuration](#browsers-configuration)

---

### `--engine`&nbsp;&nbsp;`-e` The search engine (or website) to query <a name="option-engine"></a>

✅ Requires a value.  
❌ Does not require ***initial*** configuration.

#### ***Description***

Specifies what search engine or website to query.

#### ***Usage***

<pre><code>web <em>--engine=value</em></code></pre>

`value` refers to the engine's key or alias in the ***engines*** config.

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
