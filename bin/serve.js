const http = require('http')
const handler = require('serve-handler')
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '../')

const serve = http.createServer((req, res) => {

  let vueMock = fs.readFileSync(path.join(root, 'mock/vueMock.js')).toString()
  const json = fs.readFileSync(path.join(root, 'mock/properties.json')).toString()
  vueMock = vueMock.replace('{/**/}', json)
  let gasMock = fs.readFileSync(path.join(root, 'mock/gasMock.js')).toString()
  gasMock = gasMock.replace('{/**/}', json)
  let gas = fs.readFileSync(path.join(root, 'dist/gas.js'))
  let html = fs.readFileSync(path.join(root, 'dist/index.html')).toString()
  html = html.replace('<head>', `<head><script>${gasMock}</script><script>${gas}</script><script>${vueMock}</script>`)
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.write(html)
  res.end()
})
serve.listen(3000)

// TODO doGetの初期処理
// TODO 細かいmock漏れつぶし
