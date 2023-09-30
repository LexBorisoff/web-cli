<h1 align="center"> Web Search</h1>

ESM library and a Node.js CLI application (`web`) for making browser web queries. Allows using different browsers, browser profiles, search engines and websites.

# Module

```javascript
import WebSearch from "@lexjs/web-search";

// create a WebSearch instance
const ws = new WebSearch({
  keywords: ["array.slice", "array.splice"],
  engine: {
    name: "MDN",
    url: "developer.mozilla.org",
    query: "search?q="
  },
  browser: "chrome",
});

// perform web queries
ws.open();

// log opened URLs
ws.urls.forEach((url) => {
  console.log(url);
});
```

### [Module documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/module.md)


# CLI

Install the package globally:

<pre><code>npm i <em>-g</em> @lexjs/web-search</code></pre>

After installing, the `web` command is ready to use without any initial setup.

<pre><code>web <em>--browser=chrome</em> difference between array.splice and array.slice</code></pre>

To check the installed version, use the `--version` option:

<pre><code>web <em>--version</em></code></pre>

### [CLI documentation](https://github.com/LexBorisoff/web-search/blob/master/docs/cli.md)
