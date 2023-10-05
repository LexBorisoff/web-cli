<h1 align="center">Web Search</h1>

Web Search is a Node.js package for making browser web queries. It allows using different browsers, browser profiles, search engines and websites through a configurable [CLI application](#cli-usage) or as a [JavaScript API](#api-usage).

# CLI <a name="cli-usage"></a>

To use the CLI, install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-search</code></pre>

After installing, the `web` command is ready to use without any initial setup.

<pre><code>web hello world</code></pre>

&gt; `https://google.com/search?q=hello world`

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>

Visit [CLI documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md) for more details.

# API <a name="api-usage"></a>

To use the library programmatically, install it locally in your project:

<pre><code>npm i @lexjs/web-search</code></pre>

Web Search is pure ESM and does not provide CommonJS exports.

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

Visit [API Documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/api.md) for more details.
