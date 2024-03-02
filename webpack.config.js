const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/app.js',
  mode: "development",
  // mode: "production",
  output: {
    publicPath: "/",
    filename: 'assets/js/main.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: "assets/img/[name][hash][ext]",
    clean: true,
  },
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    // untuk menulis hasil serve ke disk
    // devMiddleware: {
    //     writeToDisk: true,
    // },
    hot: true,
    historyApiFallback: true,
    liveReload: true,
  },
  plugins: [new HtmlWebpackPlugin({
    template: "./index.html",
    filename: "index.html",
    //base untuk resolve mime type error
    // base: "/"
  }),
  new MiniCssExtractPlugin({
    filename: "assets/css/main.css"
  })],
  module: {
        rules: [
        {
            test: /\.(?:js|jsx|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            options: {
                presets: [
                ['@babel/preset-env', { targets: "defaults" }],
                ["@babel/preset-react", {
                    runtime: "automatic",
                }]
                ]
            }
            }
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                      ["postcss-preset-env", {} ],
                      ["tailwindcss", {
                        content: [
                          "./index.html",
                          "./src/components/**/*.{js,ts,jsx,tsx}",
                        ],
                        theme: {},
                        plugins: [],
                      } 
                    ],
                  ],
                },
              },
            },
          ],
        },
        // {
        //   test: /\.html$/i,
        //   loader: "html-loader",
        // },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        ]
    }
}