#!/usr/bin/env node

import {program} from 'commander'
import loudRejection from 'loud-rejection'
import path, {dirname} from 'path'
import {readPackageUpSync} from 'read-pkg-up'
import {fileURLToPath} from 'url'
import ora from 'ora'
import {exec} from 'child_process'
import fs from 'fs'
import http from "http"

const __dirname = dirname(fileURLToPath(import.meta.url)) // /bin

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
  .option('-a, --appsscript <file>', `appsscript.json file. default: ./src/public/appsscript.json`)
  .option('-h, --html <file>', `html file. default: ./src/public/index.html`)
  .option('-t, --tsconfig <file>', 'tsconfig.json file. default: ./tsconfig.json')
  .option('-g, --gas <file>', 'server side main file. default: ./src/gas/index.ts')
  .option('-v, --vue <file>', 'client side main file. default: ./src/vue/index.ts')
  .option('-o, --output <directory>', 'build file output directory. default: ./dist')
  .option('-w, --watch', 'build watch')
  .action((_, options) => {
    const rootPath = path.join(__dirname, '../../../')

    const a = path.join(rootPath, options.appsscript ?? './src/public/appsscript.json').replaceAll('\\', '\\\\')
    const h = path.join(rootPath, options.html ?? './src/public/index.html').replaceAll('\\', '\\\\')
    const t = path.join(rootPath, options.tsconfig ?? './tsconfig.json').replaceAll('\\', '\\\\')
    const g = path.join(rootPath, options.gas ?? './src/gas/index.ts').replaceAll('\\', '\\\\')
    const v = path.join(rootPath, options.vue ?? './src/vue/index.ts').replaceAll('\\', '\\\\')
    const o = path.join(rootPath, options.output ?? './dist').replaceAll('\\', '\\\\')
    const w = options.watch ?? false
    // 設定値存在確認
    if (!fs.existsSync(a)) throw `nou found appsscript.json. path:${a}`
    if (!fs.existsSync(h)) throw `nou found html. path:${h}`
    if (!fs.existsSync(t)) throw `nou found tsconfig.json. path:${t}`
    if (!fs.existsSync(g)) throw `nou found gas main file. path:${g}`
    if (!fs.existsSync(v)) throw `nou found vue main file. path:${v}`

    // 毎回ファイルを作成してwebpackに読み込ませてみる
    const gasWebpackConfig = `
      const Path = require('path')
      const GasWebpackPlugin = require('gas-webpack-plugin')
      const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

      module.exports = {mode: 'production',entry: {gas: '${g}',},output: {filename: 'gas.js',path: '${o}',environment: {arrowFunction: false,},},module: {rules: [{test: /\\.ts$/,loader: 'ts-loader',exclude: /node_modules/,},],},resolve: {plugins: [new TsconfigPathsPlugin({ configFile: '${t}' })],extensions: ['.ts'],},plugins: [new GasWebpackPlugin()],}`
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
      module.exports = {mode: 'production',entry: {vue: '${v}'},output: {filename: 'vue.js',path: '${o}'},module: {rules: [{test: /\\.ts$/,loader: 'ts-loader',options: {appendTsSuffixTo: [/\\.vue$/]}},{test: /\\.vue$/,loader: 'vue-loader',options: {extractCSS: true}},{test: /\\.css$/,use: [MiniCssExtractPlugin.loader,'css-loader']},{test: /\\.s([ca])ss$/,use: ['style-loader','css-loader',{loader: 'sass-loader',options: {implementation: require('sass')}}]}]},optimization: {minimize: true,minimizer: [\`...\`,new CssMinimizerPlugin({minimizerOptions: {preset: ["default",{discardComments: { removeAll: true },},]}})]},resolve: {plugins: [new TsconfigPathsPlugin({ configFile: '${t}' })],extensions: ['.ts', '.vue', '.js']},plugins: [new HtmlWebpackPlugin({template: '${h.replaceAll('\\', '\\\\')}',inject: 'body',minify: {removeComments: true,collapseWhitespace: true}}),new VueLoaderPlugin(),new VuetifyPlugin({ autoImport: true }),new MiniCssExtractPlugin({ filename: 'vue.css' }),new HtmlInlineScriptWebpackPlugin(),new HtmlInlineCssWebpackPlugin(),new CopyWebpackPlugin({patterns: [{ from: Path.resolve(__dirname, '${a.replaceAll('\\', '\\\\')}'), to: '' }]}),new CleanWebpackPlugin({protectWebpackAssets: false,cleanOnceBeforeBuildPatterns: ['!gas.js'],cleanAfterEveryBuildPatterns: ['vue.js.LICENSE.txt','gas.js.LICENSE.txt']})]}`
    // ファイル作成
    const tempDirPath = path.join(__dirname, 'temp')
    if (!fs.existsSync(tempDirPath)) fs.mkdirSync(tempDirPath)
    const vueConfigPath = path.join(tempDirPath, 'webpack.config.vue.js')
    const gasConfigPath = path.join(tempDirPath, 'webpack.config.gas.js')
    fs.writeFileSync(vueConfigPath, vueWebpackConfig)
    fs.writeFileSync(gasConfigPath, gasWebpackConfig)
    // webpack 実行
    const execResult = (error, stdout, stderr) => {
      if (stdout) {
        console.log('stdout: ', stdout);
      }
      if (stderr) {
        console.warn('stderr: ', stderr);
      }
      if (error !== null) {
        console.error('Exec error: ', error);
      }
    }
    exec(`npx webpack --config ${vueConfigPath} ${w ? '-w': ''}`, execResult)
    exec(`npx webpack --config ${gasConfigPath} ${w ? '-w': ''}`, execResult)
  })


program.command('init')
  .description('init vue-gas')
  .action(() => {
    const rootPath = path.join(__dirname, '../../../')

    // 直下
    fs.writeFileSync(path.join(rootPath, 'tsconfig.json'),`{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@C/*": ["src/common/*"],
      "@G/*": ["src/gas/*"],
      "@V/*": ["src/vue/*"]
    },
    "removeComments": false,
    "esModuleInterop": true,
    "experimentalDecorators": true
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules"
  ]
}`)
    fs.writeFileSync(path.join(rootPath, '.clasp.json'),`{
  "scriptId": "TODO",
  "rootDir": "dist"
}`)

    // src
    if (!fs.existsSync(path.join(rootPath, 'src'))) fs.mkdirSync(path.join(rootPath, 'src'))

    //public
    if (!fs.existsSync(path.join(rootPath, 'src', 'public'))) fs.mkdirSync(path.join(rootPath, 'src', 'public'))
    fs.writeFileSync(path.join(rootPath, 'src', 'public', 'index.html'),`<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
</head>
<body>
<div id="app"></div>
</body>
</html>`)
    fs.writeFileSync(path.join(rootPath, 'src', 'public', 'appsscript.json'),`{
  "timeZone": "Asia/Tokyo",
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_ACCESSING",
    "access": "MYSELF"
  }
}`)

    // common
    if (!fs.existsSync(path.join(rootPath, 'src', 'common'))) fs.mkdirSync(path.join(rootPath, 'src', 'common'))
    fs.writeFileSync(path.join(rootPath, 'src', 'common', 'config.ts'), `import {hCommon} from 'ham-vue-gas'
import Config = hCommon.Config

export const config = new Config(['debug'], ['spreadsheetId'], [''])`)
    fs.writeFileSync(path.join(rootPath, 'src', 'common', 'controllerInterface.ts'), `import {hCommon} from 'ham-vue-gas'
import BaseControllerInterface = hCommon.BaseControllerInterface

export interface ControllerInterface extends BaseControllerInterface {
    insertData: {
        at: string
        rt: string[]
    }
}`)

    // vue
    if (!fs.existsSync(path.join(rootPath, 'src', 'vue'))) fs.mkdirSync(path.join(rootPath, 'src', 'vue'))
    fs.writeFileSync(path.join(rootPath, 'src', 'vue', 'index.ts'), `import {hVue} from 'ham-vue-gas'
import initVue = hVue.initVue
import Index from '@V/index.vue'
import GasClient = hVue.GasClient
import {ControllerInterface} from '@C/controllerInterface'

initVue([{
    path: '/',
    component: Index
}], )


export const gasClient = new GasClient<ControllerInterface>() `)
    fs.writeFileSync(path.join(rootPath, 'src', 'vue', 'index.vue'), `<script setup lang="ts">
import {gasClient} from '@V/index'
import {ref} from 'vue'

const inputText = ref('')
const dateList = ref<string[]>([])
function onClickInput(){
  gasClient.send('insertData', inputText.value).then(it => {
    dateList.value = it
    inputText.value = ''
  })
}
</script>

<template>
  <h1>Welcome HamVueGas</h1>
  <div>
    <input v-model="inputText"><button @click="onClickInput">Input</button>
  </div>
  <div v-for="text in dateList">
    <span>{{text}}</span>
  </div>
</template>`)
    fs.writeFileSync(path.join(rootPath, 'src', 'vue', 'vue.d.ts'),`declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}`)

    // gas
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas'))
    fs.writeFileSync(path.join(rootPath, 'src', 'gas', 'index.ts'), `import {hGas} from 'ham-vue-gas'
import initGas = hGas.initGas
import {config} from '@C/config'
import sampleController from '@G/controller/sampleController'
import {SampleRepository} from '@G/repository/sampleRepository'

initGas(config, )
    .useController(sampleController, (global, wrapperController) => {
        global.insertData = wrapperController('insertData')
    })
    .useSpreadsheetDB(SampleRepository,)`)
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'controller'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'controller'))
    fs.writeFileSync(path.join(rootPath, 'src', 'gas', 'controller', 'sampleController.ts'), `import {hGas} from 'ham-vue-gas'
import ControllerType = hGas.ControllerType
import {ControllerInterface} from '@C/controllerInterface'
import {SampleRepository} from '@G/repository/sampleRepository'

export default {
    async insertData(args){
        const repo = new SampleRepository()
        repo.insert({text: args})
        return repo.getAll().map(it => it.text)
    }
} as ControllerType<ControllerInterface>`)
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'entity'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'entity'))
    fs.writeFileSync(path.join(rootPath, 'src', 'gas', 'entity', 'sampleEntity.ts'), `import {hGas} from 'ham-vue-gas'
import SSEntity = hGas.SSEntity

export interface SampleEntity extends SSEntity {
    text: string
}`)
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'repository'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'repository'))
    fs.writeFileSync(path.join(rootPath, 'src', 'gas', 'repository', 'sampleRepository.ts'), `import {hGas} from 'ham-vue-gas'
import SSRepository = hGas.SSRepository
import {SampleEntity} from '@G/entity/sampleEntity'
import {config} from '@C/config'

export class SampleRepository extends SSRepository<SampleEntity> {
    protected readonly columnOrder: (keyof hGas.InitEntity<SampleEntity>)[] = ['text']
    protected readonly spreadsheetId: string = config.getGasConfig('spreadsheetId')
    protected readonly tableName: string = 'SampleTable'
    protected readonly tableVersion: number = 1
}`)
  })

program.command('serve')
    .description('run mock server')
    .option('-p, --properties <file>', `gas script properties json mock.`)
    .option('-o, --output <directory>', 'build file output directory. default: ./dist')
    .action((_, options) => {
        const rootPath = path.join(__dirname, '../../../')
        const o = path.join(rootPath, options.output ?? './dist').replaceAll('\\', '\\\\')
        let json = '{}'
        if (options.properties) {
            const p = path.join(rootPath, options.properties).replaceAll('\\', '\\\\')
            json = fs.readFileSync(path.join(__dirname, 'properties.json')).toString()
        }


        if (!fs.existsSync(path.join(o, 'gas.js'))) throw `nou found gas build file. path:${o}`
        if (!fs.existsSync(path.join(o, 'index.html'))) throw `nou found vue build file. path:${o}`

        const serve = http.createServer((req, res) => {
            let vueMock = fs.readFileSync(path.join(__dirname, 'vueMock.js')).toString()
            vueMock = vueMock.replace('{/**/}', json)
            let gasMock = fs.readFileSync(path.join(__dirname, 'gasMock.js')).toString()
            gasMock = gasMock.replace('{/**/}', json)
            let gas = fs.readFileSync(path.join(o, 'gas.js'))
            let html = fs.readFileSync(path.join(o, 'index.html')).toString()
            html = html.replace('<head>', `<head><script>${gasMock}</script><script>${gas}</script><script>${vueMock}</script>`)
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(html)
            res.end()
        })
        serve.listen(3000)
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