const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.tsx", // Ensure this points to your TypeScript entry file
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"], // Include TypeScript extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Test for .ts and .tsx files
        exclude: /node_modules/,
        use: "ts-loader", // Use ts-loader to handle TypeScript files
      },
      {
        test: /\.(js|jsx)$/, // Test for .js and .jsx files
        exclude: /node_modules/,
        use: "babel-loader", // Use babel-loader for JS/JSX files (if needed)
      },
      {
        test: /\.css$/, // Rule for CSS files
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Translates CSS into CommonJS modules
        ],
      },
      {
        test: /\.scss$/, // Rule for SCSS files
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Translates CSS into CommonJS modules
          "sass-loader", // Compiles Sass to CSS
        ],
      },
    ],
  },
};
