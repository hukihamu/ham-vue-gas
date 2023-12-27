# ham-vue-gas
## 使い方
1. `"ham-vue-gas": "git+https://github.com/hukihamu/ham-vue-gas.git"`
2. `ham-vue-gas init`を実行(サンプルが生成)
3. `ham-vue-gas build`を実行でビルド(デフォでdistファイルが生成)
4. `clasp push`でupload(事前にログインは必須)  
`-w`で自動プッシュ

## メモ
- 動作保証
  - vue: 3.2.47
  - vuetify: 3.2.0
  - vuex: 4.1.0
- 各モジュールは以下に格納
  - hVue: クライアント系
  - hGas: サーバ系
  - hCommon: クライアント・サーバ共通系
- configはgasのスクリプト プロパティに設定
- gas環境のルーティングはハッシュ`#/`がパス
- SpreadsheetのDB化時、rowは生きている間一意を担保するが、delete後の担保はされない(rowの再利用をするため)
- `submit`を利用するとエラー
  - `submit.prevent`で`return false`とする

## コマンド
- init
- build
  - `-a, --appsscript <file>`, 'appsscript.json file. default: ./src/public/appsscript.json', './src/public/appsscript.json'
  - `-h, --html <file>`, 'html file. default: ./src/public/index.html', './src/public/index.html'
  - `-t, --tsconfig <file>`, 'tsconfig.json file. default: ./tsconfig.json', './tsconfig.json'
  - `-g, --gas <file>`, 'server side main file. default: ./src/gas/gas.ts', './src/gas/gas.ts'
  - `-v, --vue <file>`, 'client side main file. default: ./src/vue/gas.ts', './src/vue/gas.ts'
  - `-o, --output <directory>`, 'build file output directory. default: ./dist', './dist'
  - `-w, --watch`, 'build watch', false
  - `-s, --sourcemap`, 'inline source map', false
  - `-d, --development`, 'webpack development mode', false
  - `-vo, --vueonly`, 'webpack build vue only', false
  - `-go, --gasonly`, 'webpack build gas only', false
## TODO
- [ ] 使い方
- [ ] テスト
- [ ] サンプル作成
- [ ] github package
- notion対応 
- ローカルで実行できるようなgasMock
  - [ ] spreadsheetのmock