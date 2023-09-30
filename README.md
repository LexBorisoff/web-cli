<h1 align="center"> Web Search</h1>

Web Search is a Node.js library and a CLI application (`web`) for making browser web queries. It allows using different browsers, browser profiles, search engines and websites.

# Installation

To use the package as a library, install it locally in your project:

<pre><code>npm i @lexjs/web-search</code></pre>

# Usage

```javascript
import WebSearch from "@lexjs/web-search";

// create a WebSearch instance
const ws = new WebSearch({ ...options });

// open web queries
ws.open();

// log created URLs
ws.urls.forEach((url) => {
  console.log(url);
});
```

### [Documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/module.md)

# CLI

To use the CLI, install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-search</code></pre>

After installing, the `web` command is ready to use without any initial setup.

<pre><code>web <em>--browser=chrome</em> difference between array.splice and array.slice</code></pre>

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>

### [CLI documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md)
