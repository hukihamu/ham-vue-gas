const fs = require("fs");



if (fs.existsSync('./dist/es/dts')){
  fs.rmdirSync('./dist/es/dts', {recursive: true})
}

const output = [];
const dir =  "./src/@types/"
const files = fs.readdirSync(dir);
for (const item of files){
  output.push(fs.readFileSync(`${dir}/${item}`, 'utf8'))
}

if (output.length) {
  output.push(fs.readFileSync("./dist/bundle.d.ts"))
  fs.writeFileSync("./dist/bundle.d.ts",output.join("\n"));
}
