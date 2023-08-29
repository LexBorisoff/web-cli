<h1 align="center"> Web CLI</h1>

Web CLI is a configurable Node.js application for making web searches from a terminal. It allows using different browsers, browser profiles, search engines and websites via the `web` command.

## Installation <a name="installation"></a>

Install the package globally:

<pre><code><strong>npm</strong> i <em>-g</em> @lexjs/web-cli</code></pre>

After installing, the `web` command is ready to use without any initial setup.

<details open>
  <summary><strong>Table of Contents</strong></summary>

* [Basic Usage](#basic-usage)
* [Query Options](#query-options)
  * [Options Usage](#options-usage)
    * [Options and values](#options-and-values)
    * [Combining Short Aliases](#combining-short-aliases)
    * [Options Placement](#options-placement)
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
* [Configuration](#configuration)
  * [Browsers Configuration](#browsers-configuration)
  * [Engines Configuration](#engines-configuration)
* [Parsing Values](#parsing-values)
* [Custom Options](#custom-options)
* [Other Options](#other-options)

</details>

## Basic Usage <a name="basic-usage"></a>

<pre><code><strong>web</strong> this is an example web query</code></pre>

The above example creates a web query using the provided **values** as a *search term* and opens the query in a new browser tab. Since we are not supplying any [options](#query-options) to the command, it uses the **default search engine** to construct the query and opens your operating system's **default browser**.

After installing the CLI, you get a set of initial search engines that you can use, with Google being the default. You can change these defaults, as well as add new browsers and engines, in the app's configuration (see [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration)).

## Query Options <a name="query-options"></a>

Use the following options to control how the web query is performed:

#### *Value Options*

The following options require a value when they are used:

| Option | Alias | Description | Config Type |
|-|:-:|-|:-:|
|[`browser`](#option-browser)|`b`|*The browser app to open*|*browsers*|
|[`profile`](#option-profile)|`p`|*The browser profile to use*|*browsers* ⚙️|
|[`engine`](#option-engine)|`e`|*The search engine (or website) to query*|*engines*|
|[`route`](#option-route)|`r`|*The engine's route to open or query*|*engines*|

The ⚙️ symbol indicates a required config. All of these options, except `profile`, work without any configuration but can be customized or enhanced when such config is set up. Please refer to each option as well as [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration) for more details.

#### *Flag Options*

Options that do not require a value are called ***flags***. The following are built-in flag options:

| Option | Alias | Description |
|-|:-:|-|
|[`incognito`](#option-incognito)|`i`|*Open in incognito / private mode*|
|[`keyword`](#option-keyword)|`k`|*Treat URL values as search term keywords*|
|[`split`](#option-split)|`s`|*Split all values into separate search queries*|
|[`http`](#option-http)|-|*Use the HTTP (non-secure) protocol*|

When using browsers and engines configurations, you also get access to ***custom flags*** based on the keys and aliases of *browsers*, *browser profiles*, and *engines* in those configs (see [*Custom Options*](#custom-options)).

---

### Options Usage <a name="options-usage"></a>

To use an option in a query, prefix it with a double dash (`--`):

<pre><code><strong>web</strong> <em>--example</em></code></pre>

An option's short (1-letter) alias is prefixed by a single dash (`-`):

<pre><code><strong>web</strong> <em>-a</em></code></pre>

#### *Options and values* <a name="options-and-values"></a>

When using a ***value option***, the immediately subsequent value is "assigned" to it:

<pre><code><strong>web</strong> <em>--browser</em> chrome nodejs docs</code></pre>

> Here, "chrome" is the value of `browser` and "nodejs docs" are used as a search term.

When using a ***flag option***, the subsequent value becomes part of the search term and nothing is assigned to the flag itself:

<pre><code><strong>web</strong> <em>--incognito</em> nodejs docs</code></pre>

> The value "nodejs", along with "docs", is used as a search term.

> ***Caveat!***  
> You can still assign values `true` and `false` to a flag - this is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to `true` but the option will still accept a boolean value that's placed  after it. Therefore, make sure to not accidentally assign *"true"* or *"false"* to a flag if you do not intend it. Doing so will result in your web query missing the word *"true"* or *"false"* from the search term.


#### *Combining Short Aliases* <a name="combining-short-aliases"></a>

Short aliases can be combined together with a single `-` as long as their combination is valid:

<pre><code><strong>web</strong> <em>-abc</em></code></pre>

It effectively does the following:

<pre><code><strong>web</strong> <em>-a</em> <em>-b</em> <em>-c</em></code></pre>

> ***Use Caution!***  
> Since certain options require a value, combining those options' short aliases can result in invalid queries if such combinations are followed by a value. It is recommended to combine only the flag options.

#### *Options Placement* <a name="options-placement"></a>

Options can be placed anywhere in the command:

<pre><code><strong>web</strong> <em>--browser</em> firefox this is <em>--incognito</em> an example <em>--engine</em> duckduckgo web query</code></pre>

Using short aliases:

<pre><code><strong>web</strong> <em>-b</em> firefox this is <em>-i</em> an example <em>-e</em> duckduckgo web query</code></pre>

> Normally, you would place your options where they visually make sense (such as the beginning or the end of the command) or as you need them when you construct your query.

The above command will do the following:

* construct a search query using
  * values ***"this is an example web query"***
  * ***DuckDuckGo*** search engine (<code>*--engine* duckduckgo</code>)
* open the constructed query in a new ***Firefox*** tab (<code>*--browser* firefox</code>)
* in ***incognito / private mode*** (<code>*--incognito*</code>)

---

### Value Options <a name="value-options"></a>

### `--browser`&nbsp;&nbsp;`-b` <a name="option-browser"></a>

✅ Requires a value.  
❌ Configuration is not required, but can be used.

#### ***Description***

Indicates what browser app to open. The program will attempt to open a new tab in the browser that the option's value refers to. The requested browser app must be installed on the machine.

#### ***Usage***

To open your web query in a specific browser, use the option followed by the browser name:

<pre><code><strong>web</strong> <em>--browser</em> edge this is an example web query</code></pre>

<pre><code><strong>web</strong> <em>-b</em> edge this is an example web query</code></pre>

The above command will attempt to open Microsoft Edge with a query for `this is an example web query`.

#### ***Configuration***

To use a browser alias (long or short) as the option's value, set up [***Browsers*** configuration](#browsers-configuration)


### `--profile`&nbsp;&nbsp;`-p` <a name="option-profile"></a>

✅ Requires a value.  
✅ Requires browsers configuration.


#### ***Description***

Attempts to open the browser profile provided as the option's value.

#### ***Usage***

#### ***Configuration***

### `--engine`&nbsp;&nbsp;`-e` <a name="option-engine"></a>

### `--route`&nbsp;&nbsp;`-r` <a name="option-route"></a>

---

### Flag Options <a name="flag-options"></a>

### `--incognito`&nbsp;&nbsp;`-i` <a name="option-incognito"></a>

### `--query`&nbsp;&nbsp;`-q` <a name="option-query"></a>

### `--split`&nbsp;&nbsp;`-s` <a name="option-split"></a>

### `--http` <a name="option-http"></a>

---

## Configuration <a name="configuration"></a>

### Browsers Configuration <a name="browsers-configuration"></a>

### Engines Configuration <a name="engines-configuration"></a>

## Custom Options <a name="custom-options"></a>

When you set up browsers and engines configurations, certain keys and values from these configs automatically become *flags*. You can use these custom flags instead of providing values to `open`, `profile`, and `search` options (*as long as they do not conflict with regular option and alias names [listed above](#query-options)*).

For example, let's say we have the following ***browsers config***:
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

## Parsing Values <a name="parsing-values"></a>
