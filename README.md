# ham-vue-gas
## 使い方
1. `"ham-vue-gas": "git+https://github.com/hukihamu/ham-vue-gas.git"`
2. `ham-vue-gas init`を実行
3. vueを利用時、エラーとなるため`vue.d.ts`を作成
4. `ham-vue-gas build`を実行でビルド(デフォでdistファイルが生成)
5. `clasp push`でupload(事前にログインは必須login)

- configはgasのスクリプト プロパティに設定
- gasのURL`?`がquery、`#/`がパス

## TODO
- [ ] 使い方
- [ ] build時のvueをCDN化
- [ ] テスト
- [ ] サンプル作成
- [ ] ローカルで実行できるようなgasMock

- npm-watchを使ってもらう