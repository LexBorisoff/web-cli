const tsconfig = `{
  "compilerOptions": {
    "target": "ES2015",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "declaration": false,
    "isolatedModules": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true
  }
}
`;

const eslintrc = `module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  plugins: ["import", "prettier", "@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: [".eslintrc.cjs"],
  rules: {
    eqeqeq: ["error", "smart"],
    "prefer-const": "warn",
    "object-shorthand": "error",
    "no-use-before-define": "error",
    "consistent-return": "error",
    "no-else-return": ["error", { allowElseIf: false }],

    // typescript
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        ignoreRestSiblings: true,
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
        leadingUnderscore: "allowSingleOrDouble",
        trailingUnderscore: "forbid",
      },
      {
        selector: "enumMember",
        format: ["PascalCase"],
      },
    ],

    // import rules
    "import/no-unresolved": "error",
    "import/no-cycle": "error",
    "import/no-duplicates": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "" },
      { blankLine: "always", prev: "", next: "*" },
      { blankLine: "any", prev: "", next: "" },
    ],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
      },
    ],
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
};
`;

const enginesConfig = `
import { defineEngines } from "@lexjs/web-cli/config";

defineEngines((engine) => ({
	google: engine("google.com", {
		search: "search?q=",
	}),
	github: engine("github.com", {
		search: "search?q=",
		resources: {
			tabs: {
				repos: "?tab=repositories",
				stars: "?tab=stars",
			},
		},
	}),
	mdn: engine("developer.mozilla.org", {
		name: "MDN",
		search: "search?q=",
	}),
	npm: engine("npmjs.com", {
		name: "npm",
		search: "search?q=",
	}),
	youtube: engine("youtube.com", {
		name: "YouTube",
		search: "results?search_query=",
	}),
}));
`;

const browsersConfig = `
import { defineBrowsers } from "@lexjs/web-cli/config";

defineBrowsers((browser) => ({
  chrome: browser("chrome"),
}));
`;

const gitignore = `# Build
dist
node_modules
`;

export const fileContents = {
  tsconfig,
  eslintrc,
  browsersConfig,
  enginesConfig,
  gitignore,
};
