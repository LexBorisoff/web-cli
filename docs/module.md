<h1 align="center">Web Search Module</h1>

# Usage <a name="usage"></a>

```javascript
import WebSearch from "@lexjs/web-search";

// create a webSearch instance
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
