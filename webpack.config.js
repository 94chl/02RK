const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlPlugIn = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Webpack = require("webpack");

module.exports = (_, argv) => {
  const { mode } = argv;
  const isDev = mode === "development";

  return {
    resolve: {
      extensions: [".vue", ".js"],
      alias: {
        "~": path.resolve(__dirname, "src"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    entry: "./src/main.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: isDev ? "/" : "./",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader",
        },
        {
          test: /\.s?css$/,
          use: [
            "vue-style-loader",
            "css-loader",
            {
              loader: "sass-loader",
              options: {
                additionalData: `@import "./src/scss/variables.scss";`,
              },
            },
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "images/[name].[contenthash].[ext]",
              esModule: false,
              publicPath: "./",
            },
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlPlugIn({
        template: "./src/index.html",
        favicon: "./static/favicon.ico",
      }),
      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
      new Webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true,
        __VUE_PROD_DEVTOOLS__: true,
      }),
      new Webpack.EnvironmentPlugin({
        NODE_ENV: "development",
      }),
    ],
    devServer: {
      historyApiFallback: true,
    },
    experiments: {
      topLevelAwait: true,
    },
  };
};
