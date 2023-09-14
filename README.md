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

## TODO
- [ ] 使い方
- [ ] テスト
- [ ] サンプル作成
- ローカルで実行できるようなgasMock
  - [ ] spreadsheetのmock