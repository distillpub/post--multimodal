var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    index: './src/main.js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.html', '.npy'],
  },
  output: {
    path: __dirname + '/public',
    filename: '[name].bundle.js',
    chunkFilename: '[name].[id].js',
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(html|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            [
              '@babel/plugin-proposal-class-properties',
              {
                loose: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                [
                  '@babel/plugin-proposal-class-properties',
                  {
                    loose: true,
                  },
                ],
              ],
            },
          },
          '@mdx-js/loader',
        ],
      },
      {
        test: /\.css$/i,
        use: ['to-string-loader', 'css-loader'],
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        loader: 'svelte-loader',
      },
      {
        test: /\.(npy|npc)$/,
        exclude: /node_modules/,
        loader: 'numpy-loader',
        options: {
          outputPath: 'data/',
        },
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-inline-loader',
        options: {
          removeSVGTagAttrs: true,
          removingTagAttrs: ['font-family'],
        },
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.ejs',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new CopyWebpackPlugin([{ from: 'static/' }]),
  ],
  devServer: {
    historyApiFallback: true,
    overlay: true,
    stats: 'minimal',
    contentBase: __dirname + '/public',
  },
  devtool: 'inline-source-map',
}
