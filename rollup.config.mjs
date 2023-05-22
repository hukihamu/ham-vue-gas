import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'VueGas'
  },
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
  ]
}