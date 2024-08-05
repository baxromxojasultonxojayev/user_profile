const path = require("path");

module.exports = {
  entry: "./src/index.tsx", // Ensure this points to your TypeScript entry file
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          "style-loader", // Injects styles into DOM
          "css-loader", // Turns CSS into CommonJS
          "sass-loader", // Compiles Sass to CSS
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      // Additional rules can go here (e.g., for JavaScript, images, etc.)
    ],
  },
  // Additional configurations such as plugins, mode, etc., can be added here
};
