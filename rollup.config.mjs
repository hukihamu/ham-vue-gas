import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'
import * as path from 'path'
import { fileURLToPath } from 'url'
import {dts} from 'rollup-plugin-dts'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs'
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm'
    },
    {
      file: 'dist/bundle.d.ts',
      format: 'es'
    },
  ],
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      configFile: path.resolve(__dirname, ".babelrc.js"),
    }),
    dts(),
  ]
}