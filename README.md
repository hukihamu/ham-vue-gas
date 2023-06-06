# ham-vue-gas
## 使い方
1. `"ham-vue-gas": "git+https://github.com/hukihamu/ham-vue-gas.git"`
2. `ham-vue-gas init`を実行(サンプルが生成)
3. `ham-vue-gas build`を実行でビルド(デフォでdistファイルが生成)
4. `clasp push`でupload(事前にログインは必須login)  
`-w`で自動プッシュ

## メモ
- configはgasのスクリプト プロパティに設定
- gas環境のルーティングはハッシュ`#/`がパス
- SpreadsheetのDB化時、rowは生きている間一意を担保するが、delete後の担保はされない(rowの再利用をするため)

## TODO
- [ ] 使い方
- [ ] テスト
- [ ] サンプル作成
- [ ] たまにrouterを取得できない問題
- ローカルで実行できるようなgasMock
  - [ ] spreadsheetのmock