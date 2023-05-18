# vue-gas
## TODO
- [x] vue+html結合実装
- [x] gas側のwebpackも
- [x] binが使えるように
- バグ修正
  - globalえらー問題

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