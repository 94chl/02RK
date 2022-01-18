const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlPlugIn = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Webpack = require("webpack");

module.exports = {
  resolve: {
    // 확장자 생략
    extensions: [".vue", ".js"],
    // 경로 별칭 설정
    alias: {
      "~": path.resolve(__dirname, "src"),
      //여러개 사용가능
      "@": path.resolve(__dirname, "src"),
    },
  },
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
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
        // loader가 여러개일때는 순서가 중요. 뒤에서 앞으로 구동
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
  ],
  devServer: {
    // port: 8080
    historyApiFallback: true,
  },
  experiments: {
    topLevelAwait: true,
  },
};