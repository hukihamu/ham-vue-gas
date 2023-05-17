#!/usr/bin/env node
import { program } from 'commander'
import loudRejection from 'loud-rejection'
import { dirname } from 'path'
import { readPackageUpSync } from 'read-pkg-up'
import { fileURLToPath } from 'url'
import ora from 'ora'

const __dirname = dirname(fileURLToPath(import.meta.url))

loudRejection()
const manifest = readPackageUpSync({ cwd: __dirname })
program.storeOptionsAsProperties(false)
program.version(manifest ? manifest.packageJson.version : 'unknown', '-v, --version', 'output the current version')
program.name('ham-vue-gas').usage('<command> [options]').description(`ham-vue-gas - The Apps Script + Vue(router)`)
const spinner = ora() // new Spinner()
const stopSpinner = () => {
  if (spinner.isSpinning) {
    spinner.stop()
  }
}

program.command('build')
  .description('build vue-gas')
  .option('-p, --public <dirctory>', 'Directory containing file (.html, appsscript.json). default: ./public')
  .option('-g, --gas <file>', 'server side main file. default: ./src/gas/index.ts|js')
  .option('-v, --vue <file>', 'client side main file. default: ./src/vue/index.ts|js')
  .option('-w, --watch <dirctory>', 'build watch.')
  .action((arg, options) => {
      const p = options.public ?? 'public'
      const g = options.gas ?? /src\/gas\/index\.[tj]s/
      const v = options.vue ?? /src\/vue\/index\.[tj]s/
      const w = options.watch
      console.log('p', p)
      console.log('g', g)
      console.log('v', v)
      console.log('w', w)
      // TODO
  })


const [_bin, _sourcePath, ...args] = process.argv;
// Defaults to help if commands are not provided
if (args.length === 0) {
    program.outputHelp();
}
(async () => {
    try {
        // User input is provided from the process' arguments
        await program.parseAsync(process.argv);
        stopSpinner();
    }
    catch (error) {
        spinner.stop();
        if (error instanceof Error) {
            process.exitCode = 1;
            console.error(error.message);
        }
        else {
            process.exitCode = 1;
            console.error('Unknown error', error);
        }
    }
    spinner.clear();
})();