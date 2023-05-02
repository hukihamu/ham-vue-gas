const Path = require('path')
const GasWebpackPlugin = require('gas-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    gas: Path.join(__dirname, 'src/gas/', 'main.ts'),
  },
  output: {
    filename: 'gas.js',
    path: Path.join(__dirname, 'dist'),
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
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.ts'],
  },
  plugins: [new GasWebpackPlugin()],
}
