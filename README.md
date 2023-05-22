# ham-vue-gas
## 使い方
1. `"ham-vue-gas": "git+https://github.com/hukihamu/ham-vue-gas.git"`
2. `tsconfig.json`を作成、baseUrlを設定
3. `.clasp.json`を作成
4. `src/gas/index.ts`と`src/vue/index.ts`を作成(それぞれのmainファイルとなる)
5. それぞれのindexで`init(Gas|Vue)`を記述
6. vueを利用時、エラーとなるため`vue.d.ts`を作成
7. `ham-vue-gas build`を実行でビルド(デフォでdistファイルが生成)
8. `clasp push`でupload(事前にログインは必須login)

- configはgasのスクリプト プロパティに設定
- gasのURL`?`がquery、`#/`がパス

## TODO
- [x] bundleの分類わけ
- [x] コメント
- [ ] 使い方
- [ ] build時のvueをCDN化
- [ ] テスト
- [ ] サンプル作成
- [ ] テンプレを作成するコマンド
- [ ] ローカルで実行できるようなgasMock

- npm-watchを使ってもらう
```json:.clasp.json
{
  "scriptId": "TODO",
  "rootDir": "dist"
}
```


```typescript vue.d.ts
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
```