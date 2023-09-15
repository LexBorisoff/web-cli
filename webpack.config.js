const path = require("path");
const ShebangPlugin = require("webpack-shebang-plugin");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./lib/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [new ShebangPlugin()],
};
