<h1 align="center">Web Search Module</h1>

# Usage <a name="usage"></a>

```javascript
import WebSearch from "@lexjs/web-search";

// create a webSearch instance
const ws = new WebSearch({ ...options });

// perform web queries
ws.open();

// log opened URLs
ws.urls.forEach((url) => {
  console.log(url);
});
```

# Options

The following types are exported from `@lexjs/web-search/Options`

```typescript
interface QueryOptions {
  keywords?: string | number | (string | number)[];
  browser?: Browser | Browser[] | null;
  engine?: Engine | Engine[] | null;
  defaultEngine?: Engine | null;
  route?: string | string[];
  address?: string | string[];
  incognito?: boolean;
  split?: boolean;
  http?: boolean;
}

interface Engine {
  name: string;
  url: string;
  query?: string;
  routes?: {
    [route: string]: string;
  };
  delimiter?: string;
}

interface Browser {
  name: string;
  profileDirectory?: string | string[];
}
```