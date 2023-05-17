#!/usr/bin/env node

import {program} from 'commander'
import loudRejection from 'loud-rejection'
import {dirname} from 'path'
import {readPackageUpSync} from 'read-pkg-up'
import {fileURLToPath} from 'url'
import ora from 'ora'
import {spawn} from 'child_process'
import fs from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

loudRejection()
const manifest = readPackageUpSync({cwd: __dirname})
program.storeOptionsAsProperties(false)
program.version(manifest ? manifest.packageJson.version : 'unknown', '-v, --version', 'output the current version')
program.name('ham-vue-gas').usage('<command> [options]').description(`ham-vue-gas - The Apps Script + Vue(router)`)
const spinner = ora()
const stopSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
  }
}

program.command('build')
  .description('build vue-gas')
  .option('-a, --appsscript <file>', `appsscript.json file. default: ${__dirname}/bin/appsscript.json`)
  .option('-h, --html <file>', `html file. default: ${__dirname}/bin/index.html`)
  .option('-t, --tsconfig <file>', 'tsconfig.json file. default: ./tsconfig.json')
  .option('-g, --gas <file>', 'server side main file. default: ./src/gas/index.ts')
  .option('-v, --vue <file>', 'client side main file. default: ./src/vue/index.ts')
  .action((_, options) => {
    const a = options.appsscript ?? '${__dirname}/bin/appsscript.json'
    const h = options.html ?? `${__dirname}/bin/index.html`
    const t = options.tsconfig ?? './tsconfig.json'
    const g = options.gas ?? 'src/gas/index.ts'
    const v = options.vue ?? 'src/vue/index.ts'
    const w = options.watch
    console.log(__dirname)
    // TODO 毎回ファイルを作成してwebpackに読み込ませてみる
    const gasWebpackConfig = `
      const Path = require('path')
      const GasWebpackPlugin = require('gas-webpack-plugin')
      const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

      module.exports = {mode: 'production',entry: {gas: '${g}',},output: {filename: 'gas.js',path: Path.join(__dirname, 'dist'),environment: {arrowFunction: false,},},module: {rules: [{test: /\\.ts$/,loader: 'ts-loader',exclude: /node_modules/,},],},resolve: {plugins: [new TsconfigPathsPlugin({ configFile: '${t}' })],extensions: ['.ts'],},plugins: [new GasWebpackPlugin()],}`
    const vueWebpackConfig = `
      const Path = require('path')
      const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
      const { VueLoaderPlugin } = require('vue-loader')
      const CopyWebpackPlugin = require('copy-webpack-plugin')
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin')
      const HtmlInlineCssWebpackPlugin = require('html-inline-css-webpack-plugin').default
      const MiniCssExtractPlugin = require('mini-css-extract-plugin')
      const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
      const { CleanWebpackPlugin } = require('clean-webpack-plugin')
      const { VuetifyPlugin } = require('webpack-plugin-vuetify')
      module.exports = {mode: 'production',entry: {vue: '${v}'},output: {filename: 'vue.js',path: Path.join(__dirname, 'dist')},module: {rules: [{test: /\\.ts$/,loader: 'ts-loader',options: {appendTsSuffixTo: [/\\.vue$/]}},{test: /\\.vue$/,loader: 'vue-loader',options: {extractCSS: true}},{test: /\\.css$/,use: [MiniCssExtractPlugin.loader,'css-loader']},{test: /\\.s([ca])ss$/,use: ['style-loader','css-loader',{loader: 'sass-loader',options: {implementation: require('sass')}}]}]},optimization: {minimize: true,minimizer: [\`...\`,new CssMinimizerPlugin({minimizerOptions: {preset: ["default",{discardComments: { removeAll: true },},]}})]},resolve: {plugins: [new TsconfigPathsPlugin({ configFile: '${t}' })],extensions: ['.ts', '.vue', '.js']},plugins: [new HtmlWebpackPlugin({template: '${h}',inject: 'body',minify: {removeComments: true,collapseWhitespace: true}}),new VueLoaderPlugin(),new VuetifyPlugin({ autoImport: true }),new MiniCssExtractPlugin({ filename: 'vue.css' }),new HtmlInlineScriptWebpackPlugin(),new HtmlInlineCssWebpackPlugin(),new CopyWebpackPlugin({patterns: [{ from: Path.resolve(__dirname, '${a}'), to: '' }]}),new CleanWebpackPlugin({protectWebpackAssets: false,cleanOnceBeforeBuildPatterns: ['!gas.js'],cleanAfterEveryBuildPatterns: ['vue.js.LICENSE.txt']})]}`
    // TODO ファイル作成

    // webpack 実行
    // spawn('npx', ['webpack', '--config', `"${__dirname}/bin/webpack.config.vue.js"`])
    // spawn('npx', ['webpack', '--config', `"${__dirname}/bin/webpack.config.gas.js"`])
  })

const [_bin, _sourcePath, ...args] = process.argv
// Defaults to help if commands are not provided
if (args.length === 0) {
  program.outputHelp()
}
(async () => {
  try {
    // User input is provided from the process' arguments
    await program.parseAsync(process.argv)
    stopSpinner()
  } catch (error) {
    spinner.stop()
    if (error instanceof Error) {
      process.exitCode = 1
      console.error(error.message)
    } else {
      process.exitCode = 1
      console.error('Unknown error', error)
    }
  }
  spinner.clear()
})()