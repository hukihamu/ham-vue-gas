# vue-gas
## TODO
- [x] vue+html結合実装
- [x] gas側のwebpackも
- [x] binが使えるように
- [ ] bundleの分類わけ
- バグ修正
  - [x] globalえらー問題
  - [ ] vue routerが機能しない問題

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