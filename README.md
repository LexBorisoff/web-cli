<h1 align="center"> Web CLI</h1>

Configurable CLI application for making web searches from a terminal. Allows to use different browsers, browser profiles, search engines and websites via the `web` command.

## Installation <a name="installation"></a>

Install the package globally:

```
$ npm i -g @lexjs/web
```

After the successful installation, you will get access to the `web` command which is ready to use without any initial configuration.

## Basic Usage <a name="usage"></a>

Type a search query in your terminal using the `web` command followed by your actual query:

```
$ web my search query from a terminal
```

The above will perform a search query using the default browser of your OS and the default search engine - Google, which is hard-coded in the application. You can change these defaults, as well as add new browsers and engines in the application's config files (see [*Browsers Configuration*](#browsers-config) and [*Engines Configuration*](#engines-config) for details).

## Query Options <a name="query-options"></a>

You can use the following options to control how the search query is handled:

| Option | Value Required | Description | Requires Config |
|--|--|--|--|
|[`open`](#option-open)|<div align="center">✔️</div>|*Browser to open*|<div align="center">❌</div>
|[`profile`](#option-profile)|<div align="center">✔️</div>|*Browser profile to use*|<div align="center">*browsers*</div>
|[`search`](#option-search)|<div align="center">✔️</div>|*Search the provided engine / website*|<div align="center">*engines*</div>
|[`query`](#option-query)|<div align="center">❌</div>|*Query without visiting the provided URL(s)*|<div align="center">❌</div>
|[`incognito`](#option-incognito)|<div align="center">❌</div>|*Use incognito / private mode*|<div align="center">❌</div>
|[`route`](#option-route)|<div align="center">❌</div>|*Access a specified route*|<div align="center">*engines*</div>
|[`package`](#option-package)|<div align="center">❌</div>|*Query packages / libraries*|<div align="center">*engines*</div>
|[`http`](#option-http)|<div align="center">❌</div>|*Use the HTTP protocol*|<div align="center">❌</div>
|[`split`](#option-split)|<div align="center">❌</div>|*Split each value into a separate search query*|<div align="center">❌</div>

Options that do not require a value are called ***flags***.

> ***Note:***
> Some options only work when browsers or engines configuration is set up. Please refer to each option as well [*Browsers Configuration*](#browsers-config) and [*Engines Configuration*](#engines-config) for more information.

---

### Options Usage

To use an option in a query, prefix it with `--`

```
--open
--profile
--search
--query
--incognito
--route
--package
--http
--split
```

If an option has a short alias, it is prefixed with `-`

```
-o
-p
-s
-q
-i
-r
```

Additionally, short aliases can be combined together with a single `-`, as long as their combination is valid:

```
-qi
```

> ***Use Caution!***
> Since some options require a value, combining their short aliases can result in invalid queries. It is recommended to combine only the flag options.

### Options placement

Options can be placed anywhere in the query:

```
$ web --open firefox my search --incognito query from --search duckduckgo a terminal
```

The above example will attempt to open ***Firefox*** (`--open firefox`) in a ***private tab*** (`--incognito`) with the search query ***"my search query from a terminal"*** using ***DuckDuckGo*** (`--search duckduckgo`) as the search engine *(assuming Firefox is installed on the machine and DuckDuckGo is added to engines configuration)*.

Search queries are constructed from values that do not belong to non-flag options.

---

### `--open`&nbsp;&nbsp;&nbsp;`-o` <a name="option-open"></a>

> *Attempts to open the browser provided as the option's value.*

✔️ Requires a value.
❌ Does not require configuration files.

To open a specific browser, use the option anywhere in the command followed by the browser name:

```
$ web --open firefox my search query from a terminal
```

> The supplied browser name must correctly refer to a browser app that's installed on the machine.

The above examples will attempt to open Firefox with the search query `my search query from a terminal` using the default search engine.

---

### `--profile`&nbsp;&nbsp;&nbsp;`-p` <a name="option-profile"></a>

> *Attempts to open the browser profile provided as the option's value.*

✔️ Requires a value.
✔️ Requires browsers configuration.

## Configuration <a name="configuration"></a>

### Browsers Configuration <a name="browsers-config"></a>

### Engines Configuration <a name="engines-config"></a>

## Custom Options <a name="custom-options"></a>