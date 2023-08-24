<h1 align="center"> Web CLI</h1>

Configurable CLI for making web searches from a terminal. Allows to use different browsers, browser profiles, search engines and websites via the `web` command.

## Installation <a name="installation"></a>

Install the package globally:

```
$ npm i -g @lexjs/web-cli
```

After installing, the `web` command becomes globally available and is ready to use without any initial configuration.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Query Options](#query-options)
  - [Options Usage](#query-options-usage)
  - [Options Placement](#query-options-placement)
  - [Options Details](#query-options-details)
    - [open](#query-option-open)
    - [profile](#query-option-profile)
    - [search](#query-option-search)
    - [route](#query-option-route)
    - [private](#query-option-private)
    - [query](#query-option-query)
    - [http](#query-option-http)
    - [split](#query-option-split)
- [Configuration](#configuration)
  - [Browsers Configuration](#browsers-configuration)
  - [Engines Configuration](#engines-configuration)
- [Custom Options](#custom-options)

## Basic Usage <a name="usage"></a>

Type a search query in your terminal using the `web` command:

```
$ web my search query from a terminal
```

The above will perform a search query _"my search query from a terminal"_ using the default browser of your OS and Google as the default search engine. You can change these defaults, as well as add new browsers and engines in the application's configuration (see [_Browsers Configuration_](#browsers-configuration) and [_Engines Configuration_](#engines-configuration) for details).

## Query Options <a name="query-options"></a>

You can use the following options to control how the search query is performed:

| Option                       | Alias                         | Description                                     | Requires a Value             | Requires Config                      |
| ---------------------------- | ----------------------------- | ----------------------------------------------- | ---------------------------- | ------------------------------------ |
| [`open`](#option-open)       | <div align="center">`o`</div> | _Browser app to open_                           | <div align="center">✅</div> | <div align="center">❌</div>         |
| [`profile`](#option-profile) | <div align="center">`p`</div> | _Browser profile to use_                        | <div align="center">✅</div> | <div align="center">_browsers_</div> |
| [`search`](#option-search)   | <div align="center">`s`</div> | _Search the provided engine / website_          | <div align="center">✅</div> | <div align="center">_engines_</div>  |
| [`route`](#option-route)     | <div align="center">`r`</div> | _Query engine routes_                           | <div align="center">✅</div> | <div align="center">❌</div>         |
| [`private`](#option-private) | <div align="center">`i`</div> | _Use private / incognito mode_                  | <div align="center">❌</div> | <div align="center">❌</div>         |
| [`query`](#option-query)     | <div align="center">`q`</div> | _Query provided URLs as search values_          | <div align="center">❌</div> | <div align="center">❌</div>         |
| [`http`](#option-http)       |                               | _Use the HTTP (non-secure) protocol_            | <div align="center">❌</div> | <div align="center">❌</div>         |
| [`split`](#option-split)     |                               | _Split each value into a separate search query_ | <div align="center">❌</div> | <div align="center">❌</div>         |

> **_Note:_**  
> Some options work only when the _browsers_ or _engines_ configuration is set up (e.g. `profile` and `search`), while others do not require it but their usage can be customized if such configuration is present (e.g. `open` and `route`). Please refer to each option as well as [_Browsers Configuration_](#browsers-configuration) and [_Engines Configuration_](#engines-configuration) for more details.

Options that do not require a value are called **_flags_**. When using browsers and engines configurations, you also get access to **_custom flags_** based on the keys and aliases of browsers, browser profiles, and engines in those configs (see [_Custom Options_](#custom-options)).

---

### Options Usage <a name="query-options-usage"></a>

**_Basic Usage_**  
To use an option in a query, prefix it by a double dash (`--`):

```
$ web --example
```

To use an option's single-letter alias, prefix it by a single dash (`-`):

```
$ web -a
```

If a value follows an option and that option:

- **_requires a value_**, then the value is "assigned" to it:

```
$ web --open chrome nodejs docs
```

> Here, "chrome" is the value of `open`, while "nodejs docs" are used to build a search query string.

- **_is a flag_**, then the value becomes part of the search query string and nothing is assigned to the flag itself:

```
$ web --private typescript docs
```

> The value "typescript" is used for the search query string along with "docs".

> **_Note:_**  
> Technically, you _can_ assign values to flags. These values are `true` and `false` because, internally, flags are `boolean`s. Using a flag in the command automatically sets its value to `true`. Therefore, make sure to not accidentally place one of them after a flag option if you do not intend to set its value.

&nbsp;
**_Combining Short Aliases_**  
Short aliases can be combined together with a single `-`, as long as their combination is valid:

```
$ web -abc
```

Combining short aliases effectively does the following:

```
$ web -a -b -c
```

> **_Use Caution!_**  
> Since some options require a value, combining their short aliases can result in invalid queries. It is recommended to combine only the flag options.

---

### Options Placement <a name="query-options-placement"></a>

Options can be placed anywhere in the query:

```
$ web --open firefox sample search --private query from --search duckduckgo a terminal
```

> Normally, you would place your options where they visually make sense (such as the begging or the end of the command) or as you need them when you construct your query. This example is just for illustration.

The above command will do the following:

- construct a search query using
  - values **_"sample search query from a terminal"_**
  - **_DuckDuckGo_** search engine (`--search duckduckgo`)
- open the constructed query in a new **_Firefox_** tab (`--open firefox`)
- in **_private mode_** (`--private`)

> This example assumes that Firefox is installed on the machine and DuckDuckGo is added to the engines configuration.

---

### Options Details <a name="query-options-details"></a>

#### `--open`&nbsp;&nbsp;&nbsp;`-o` <a name="query-option-open"></a>

✅ Requires a value.  
❌ Configuration is not required, but can be used.

> **Description:** Opens the browser app that the option's value refers to, as long as the browser is installed.

To open a specific browser, use the option followed by the browser name:

```
$ web --open firefox my search query from a terminal
```

The above command will attempt to open Firefox with the search query `my search query from a terminal`.

**_Configuration_**

To use a browser alias (long or short) as the option's value, you need to set up **_browsers_** configuration (see [Browsers Configuraion](#browsers-configuration))

---

#### `--profile`&nbsp;&nbsp;&nbsp;`-p` <a name="query-option-profile"></a>

> _Attempts to open the browser profile provided as the option's value._

✅ Requires a value.  
✅ Requires browsers configuration.

## Configuration <a name="configuration"></a>

### Browsers Configuration <a name="browsers-configuration"></a>

### Engines Configuration <a name="engines-configuration"></a>

## Custom Options <a name="custom-options"></a>

When you set up browsers and engines configurations, certain keys and values from these configs automatically become _flags_. You can use these custom flags instead of providing values to `open`, `profile`, and `search` options (_as long as they do not conflict with regular option and alias names [listed above](#query-options)_).

For example, let's say we have the following **_browsers config_**:

```json
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
