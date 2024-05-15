<h1 align="center">Web CLI</h1>

CLI for making web search queries from a shell.

# Documentation

Read full documentation [here](https://github.com/LexBorisoff/web-cli#readme).

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

The CLI will then construct 1 or more queries based on the type of values and open them in a new browser tab.

There are 2 types of values:

1. Keywords
2. URLs

## Keywords

When providing keywords, only 1 web query is created using the values as a search term:

```bash
web hello world
```

&gt; `https://google.com/search?q=hello%20world`

In the absence of [_options_](#options), CLI uses the **_default search engine_** to construct the query and opens it in the **_default browser_**:

- After installation, there is a set of initial search engines that you can use (default - Google).
- The operating system's default browser is used to open the web queries.

You can change these defaults and add new engines and browsers by setting up and running a [_config project_](#configuration).

### _Initial search engines_

| Search Engine |    Option Value     |
| ------------- | :-----------------: |
| Google        |      `google`       |
| DuckDuckGo    | `duckduckgo` `duck` |
| MDN           |        `mdn`        |
| YouTube       |      `youtube`      |
| NPM           |        `npm`        |

The option value can be either supplied to the [`--engine`](#engine) option or used as a [_custom flag_](#custom-flags).

## URLs

When providing a URL value, the default behavior is to open it directly:

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
