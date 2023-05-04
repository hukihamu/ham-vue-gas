import { program } from 'commander'

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