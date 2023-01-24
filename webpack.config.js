const path = require("path");

module.exports = {
  entry: './public/assets/js/src/index.js',
  output: {
    path: path.resolve(__dirname, "./public/assets/js/dist/"),
    filename: 'main.js'
  },
  mode: process.env?.APP_MODE || 'none',
  // mode: "production",
  experiments: {
    topLevelAwait: true,
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"], // ensure compatibility with older browsers
            plugins: ["@babel/plugin-transform-object-assign"], // ensure compatibility with IE 11
          },
        },
      },
      {
        test: /\.js$/,
        loader: "webpack-remove-debug", // remove "debug" package
      },
    ],
  },
};