<h1 align="center"> Web CLI</h1>

Web CLI is a configurable node.js application for making web searches from a terminal. It allows using different browsers, browser profiles, search engines and websites via the `web` command.


## Installation <a name="installation"></a>

Install the package globally:

```bash
$ npm i -g @lexjs/web-cli
```

```bash
npm i -g @lexjs/web-cli
```

<pre>
	<code style="color:red;">
		npm i -g @lexjs/web-cli
	</code>
</pre>

After installing, the `web` command becomes globally available and is ready to use without any initial setup.

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
		* [query](#option-query)
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

```sh
$ web this is an example web query
```

```sh
web this is an example web query
```

The above example creates a web query using the provided **values** as a *search term* and opens the query in a new browser tab. Since we are not supplying any [options](#query-options) to the command, it uses the **default search engine** to construct the query and opens your operating system's **default browser**.

After installing the CLI, you get a set of initial search engines that you can use, with Google being the default. You can change these defaults, as well as add new browsers and engines, in the app's configuration (see [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration)).

## Query Options <a name="query-options"></a>

Use the following options to control how the web query is performed:

| Option | Alias | Description |  Requires a Value | Config Type |
|-|:-:|-|:-:|:-:|
|[`browser`](#option-browser)|`b`|*The browser app to open*|✅ yes |*browsers*|
|[`profile`](#option-profile)|`p`|*The browser profile to use*|✅ yes|*browsers* ⚙️|
|[`engine`](#option-engine)|`e`|*The search engine (or website) to query*|✅ yes|*engines*|
|[`route`](#option-route)|`r`|*The engine's route to go to*|✅ yes|*engines*|
|[`incognito`](#option-incognito)|`i`|*Open in incognito / private mode*|❌ no|-|
|[`query`](#option-query)|`q`|*Query URL values as a search term*|❌ no|-|
|[`split`](#option-split)|`s`|*Split all values into separate search queries*|❌ no|-|
|[`http`](#option-http)||*Use the HTTP (non-secure) protocol*|❌ no|-|

Options that do not require a value are called ***flags***. When using browsers and engines configurations, you also get access to ***custom flags*** based on the keys and aliases of *browsers*, *browser profiles*, and *engines* in those configs (see [*Custom Options*](#custom-options)).

The ⚙️ symbol indicates a required config. Almost all options work without any configuration but some of them can be customized or enhanced if such config is set up. Please refer to each option as well as [*Browsers Configuration*](#browsers-configuration) and [*Engines Configuration*](#engines-configuration) for more details.

---

### Options Usage <a name="options-usage"></a>

To use an option in a query, prefix it with a double dash (`--`):
```
$ web --example
```

An option's short (1-letter) alias is prefixed by a single dash (`-`):
```
$ web -a
```

#### *Options and values* <a name="options-and-values"></a>

If a value follows an option and that option:

* ***requires a value***, then the value is "assigned" to the option:

```
$ web --browser chrome nodejs docs
```

> Here, "chrome" is the value of `browser`, while "nodejs docs" are used as a search term.

* ***is a flag***, then the value becomes part of the search term and nothing is assigned to the flag itself:

```
$ web --incognito typescript docs
```

> The value "typescript", along with "docs", is used as a search term.

> ***Caveat***  
> You can still assign a value `true` or `false` to a flag - this is because, internally, flags are `boolean`s. Using a flag option in the command automatically sets its value to `true` but the option will still accept a boolean value that's placed immediately after it. Therefore, make sure to not accidentally assign *"true"* or *"false"* to a flag if you do not intend it. Doing so will result in your web query missing the word *"true"* or *"false"* that could be part of the search term.


#### *Combining Short Aliases* <a name="combining-short-aliases"></a>

Short aliases can be combined together with a single `-` as long as their combination is valid:

```
$ web -abc
```

which effectively does the following:

```
$ web -a -b -c
```

> ***Use Caution!***  
> Since certain options require a value, combining their short aliases can result in invalid queries if such combinations are followed by values. It is recommended to combine only the flag options.

#### *Options Placement* <a name="options-placement"></a>

Options can be placed anywhere in the command:

```
$ web --browser firefox this is --incognito an example --engine duckduckgo web query
```

Using short aliases:

```
$ web -b firefox this is -i an example -e duckduckgo web query
```

> Normally, you would place your options where they visually make sense (such as the beginning or the end of the command) or as you need them when you construct your query.

The above command will do the following:

* construct a search query using
  * values ***"this is an example web query"***
  * ***DuckDuckGo*** search engine (`--engine duckduckgo`)
* open the constructed query in a new ***Firefox*** tab (`--browser firefox`)
* in ***incognito / private mode*** (`--incognito`)

---

### Value Options <a name="value-options"></a>

### `--browser`&nbsp;&nbsp;`-b` <a name="option-browser"></a>

✅ Requires a value.  
❌ Configuration is not required, but can be used.

#### ***Description***

Indicates what browser app to open. The program will attempt to open a new tab in the browser that the option's value refers to. The requested browser app must be installed on the machine.

#### ***Usage***

To open your web query in a specific browser, use the option followed by the browser name:

```
$ web --browser edge this is an example web query
```

```
$ web -b edge this is an example web query
```

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
