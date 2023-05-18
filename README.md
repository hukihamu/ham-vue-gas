# vue-gas
## TODO
- [ ] bundleの分類わけ
- バグ修正
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