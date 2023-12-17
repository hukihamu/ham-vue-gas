const Path = require('path')
const GasWebpackPlugin = require('gas-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: '${d}',
  entry: {
    gas: '${g}',
  },
  output: {
    filename: 'gas.js',
    path: '${o}',
    environment: {
      arrowFunction: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [
      new TsconfigPathsPlugin({configFile: '${t}'})
    ],
    extensions: ['.ts'],
  },
  plugins: [new GasWebpackPlugin()],
  devtool: '${s}',
}