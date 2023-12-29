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
program.version(manifest ? manifest.packageJson.version : 'unknown', '-V, --version', 'output the current version')
program.name('ham-vue-gas').usage('<command> [options]').description(`ham-vue-gas - The Apps Script + Vue(router)`)
const spinner = ora()
const stopSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
  }
}

program.command('build')
  .description('build vue-gas')
  .option('-a, --appsscript <file>', `appsscript.json file. default: ./src/public/appsscript.json`, './src/public/appsscript.json')
  .option('-h, --html <file>', `html file. default: ./src/public/index.html`, './src/public/index.html')
  .option('-t, --tsconfig <file>', 'tsconfig.json file. default: ./tsconfig.json', './tsconfig.json')
  .option('-g, --gas <file>', 'server side main file. default: ./src/gas/index.ts', './src/gas/index.ts')
  .option('-v, --vue <file>', 'client side main file. default: ./src/vue/index.ts', './src/vue/index.ts')
  .option('-o, --output <directory>', 'build file output directory. default: ./dist', './dist')
  .option('-w, --watch', 'build watch', false)
  .option('-s, --sourcemap', 'inline source map', false)
  .option('-d, --development', 'webpack development mode', false)
  .option('-vo, --vueonly', 'webpack build vue only', false)
  .option('-go, --gasonly', 'webpack build gas only', false)
  .action(function () {
    const rootPath = path.join(__dirname, '../../../')

    const a = path.join(rootPath, this.opts().appsscript).replaceAll('\\', '\\\\')
    const h = path.join(rootPath, this.opts().html).replaceAll('\\', '\\\\')
    const t = path.join(rootPath, this.opts().tsconfig).replaceAll('\\', '\\\\')
    const g = path.join(rootPath, this.opts().gas).replaceAll('\\', '\\\\')
    const v = path.join(rootPath, this.opts().vue).replaceAll('\\', '\\\\')
    const o = path.join(rootPath, this.opts().output).replaceAll('\\', '\\\\')
    const w = this.opts().watch
    const s = this.opts().sourcemap
    const d = this.opts().development
    const vo = this.opts().vueonly
    const go = this.opts().gasonly
    // 設定値存在確認
    if (!fs.existsSync(a)) throw `nou found appsscript.json. path:${a}`
    if (!fs.existsSync(h)) throw `nou found html. path:${h}`
    if (!fs.existsSync(t)) throw `nou found tsconfig.json. path:${t}`
    if (!fs.existsSync(g)) throw `nou found gas main file. path:${g}`
    // vueはなくても動作させる
    const existsVueFile = fs.existsSync(v)

    // 毎回ファイルを作成してwebpackに読み込ませてみる
    const gasWebpackConfig = fs.readFileSync(path.join(__dirname, 'config/webpack.config.gas.js'), {encoding: 'utf8'})
      .replace('${g}', g)
      .replace('${o}', o)
      .replace('${t}', t)
      .replace('${s}', s ? `module.exports.devtool = 'inline-source-map'` : '')
      .replace('${d}', d ? 'development' : 'production')
    const vueWebpackConfig = fs.readFileSync(path.join(__dirname, 'config/webpack.config.vue.js'), {encoding: 'utf8'})
      .replace('${v}', v)
      .replace('${o}', o)
      .replace('${t}', t)
      .replace('${h}', h.replaceAll('\\', '\\\\'))
      .replace('${a}', a.replaceAll('\\', '\\\\'))
      .replace('${s}', s ? `module.exports.devtool = 'inline-source-map'` : '')
      .replace('${d}', d ? 'development' : 'production')
    // ファイル作成
    const tempDirPath = path.join(__dirname, 'temp')
    if (!fs.existsSync(tempDirPath)) fs.mkdirSync(tempDirPath)
    const vueConfigPath = path.join(tempDirPath, 'webpack.config.vue.js')
    const gasConfigPath = path.join(tempDirPath, 'webpack.config.gas.js')
    if (existsVueFile) fs.writeFileSync(vueConfigPath, vueWebpackConfig)
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
    if (!vo) {
      if (existsVueFile) {
        if (w) {
          const watchPath = path.join(v, '..')
          console.info('watch' ,watchPath)
          fs.watch(watchPath, () => {
            exec(`npx webpack --config ${vueConfigPath}`, execResult)
          })
        } else {
          exec(`npx webpack --config ${vueConfigPath}`, execResult)
        }
      }
    }
    if (!go) {
      if (w) {
        const watchPath = path.join(g, '..')
        console.info('watch' ,watchPath)
        fs.watch(watchPath, () => {
          exec(`npx webpack --config ${gasConfigPath}`, execResult)
        })
      } else {
        exec(`npx webpack --config ${gasConfigPath}`, execResult)
      }
    }
  })


program.command('init')
  .description('init vue-gas')
  .action(function () {
    const rootPath = path.join(__dirname, '../../../')

    // 直下
    fs.cpSync(path.join(__dirname, 'template/tsconfig.json'), path.join(rootPath, 'tsconfig.json'))
    fs.cpSync(path.join(__dirname, 'template/.clasp.json'), path.join(rootPath, '.clasp.json'))

    // src
    if (!fs.existsSync(path.join(rootPath, 'src'))) fs.mkdirSync(path.join(rootPath, 'src'))

    //public
    if (!fs.existsSync(path.join(rootPath, 'src', 'public'))) fs.mkdirSync(path.join(rootPath, 'src', 'public'))
    fs.cpSync(path.join(__dirname, 'template/public/index.html'), path.join(rootPath, 'src', 'public', 'index.html'))
    fs.cpSync(path.join(__dirname, 'template/public/appsscript.json'), path.join(rootPath, 'src', 'public', 'appsscript.json'))

    // common
    if (!fs.existsSync(path.join(rootPath, 'src', 'common'))) fs.mkdirSync(path.join(rootPath, 'src', 'common'))
    fs.cpSync(path.join(__dirname, 'template/common/config.ts'), path.join(rootPath, 'src', 'common', 'config.ts'))
    fs.cpSync(path.join(__dirname, 'template/common/gasMethodInterface.ts'), path.join(rootPath, 'src', 'common', 'gasMethodInterface.ts'))

    // vue
    if (!fs.existsSync(path.join(rootPath, 'src', 'vue'))) fs.mkdirSync(path.join(rootPath, 'src', 'vue'))
    fs.cpSync(path.join(__dirname, 'template/vue/index.ts'), path.join(rootPath, 'src', 'vue', 'index.ts'))

    fs.cpSync(path.join(__dirname, 'template/vue/main.vue'), path.join(rootPath, 'src', 'vue', 'main.vue'))
    fs.cpSync(path.join(__dirname, 'template/vue/vue.d.ts'), path.join(rootPath, 'src', 'vue', 'vue.d.ts'))

    // gas
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas'))
    fs.cpSync(path.join(__dirname, 'template/gas/index.ts'), path.join(rootPath, 'src', 'gas', 'index.ts'))
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'methods'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'methods'))
    fs.cpSync(path.join(__dirname, 'template/gas/methods/sampleMethod.ts'), path.join(rootPath, 'src', 'gas', 'methods', 'sampleMethod.ts'), )
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'entity'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'entity'))
    fs.cpSync(path.join(__dirname, 'template/gas/entity/sampleEntity.ts'), path.join(rootPath, 'src', 'gas', 'entity', 'sampleEntity.ts'))
    if (!fs.existsSync(path.join(rootPath, 'src', 'gas', 'repository'))) fs.mkdirSync(path.join(rootPath, 'src', 'gas', 'repository'))
    fs.cpSync(path.join(__dirname, 'template/gas/repository/sampleRepository.ts'), path.join(rootPath, 'src', 'gas', 'repository', 'sampleRepository.ts'))
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
            // const p = path.join(rootPath, options.properties).replaceAll('\\', '\\\\')
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
            // noinspection HtmlRequiredTitleElement
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