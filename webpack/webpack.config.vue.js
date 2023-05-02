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

module.exports = {
  mode: 'production',
  entry: {
    vue: Path.join(__dirname, 'src/vue/', 'main.ts')
  },
  output: {
    filename: 'vue.js',
    path: Path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.s([ca])ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ]
        }
      })
    ]
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
    extensions: ['.ts', '.vue', '.js']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new VueLoaderPlugin(),
    new VuetifyPlugin({ autoImport: true }),
    new MiniCssExtractPlugin({ filename: 'vue.css' }),
    new HtmlInlineScriptWebpackPlugin(),
    new HtmlInlineCssWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: Path.resolve(__dirname, 'public/appsscript.json'), to: '' }
      ]
    }),
    new CleanWebpackPlugin({
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: ['!gas.js'],
      cleanAfterEveryBuildPatterns: ['vue.js.LICENSE.txt']
    })
  ]
}
