const properties = {/**/}

window.PropertiesService = {
  getScriptProperties(){
    return {
      getProperty(key){
        return properties[key]
      },
      getKeys(){
        return Object.keys(properties)
      }
    }
  }
}
const mockSpreadsheet = []
const sheet = {
  name: '',
  data: [],
  setName(it){
    this.name = it
  },
  getName(){
    return this.name
  },
  getRange(x, y, width, height){
    const temp = {}
    Object.assign(temp, range)
    // TODO
    return temp
  },
  getDataRange(){
    return range
  },
  copyTo(it) {

  },
  clear(){

  },
  appendRow(it){

  },
  getLastRow(){

  }
}
const range = {
  getValue(){
    return ''
  },
  getValues(){
    return []
  },
  setValue(it){},
  setValues(it){},
  clear(){}
}
const spreadsheet = {
  getSheetByName(it){
    return mockSpreadsheet.filter(it => it.getName() === it)
  },
  insertSheet(){
    const temp = {}
    Object.assign(temp, sheet)
    mockSpreadsheet.push(temp)
    return temp
  }
}
window.SpreadsheetApp = {
  openById(){
    return spreadsheet
  },
  flush(){

  }
}
window.Session = {
  getActiveUser(){
    return {
      getEmail(){
        return "mock@example.com"
      }
    }
  }
}
window.LockService = {

}


window.HtmlService = {
  createHtmlOutputFromFile(){
    return {
      setContent(it){
        const div = document.createElement('div')
        div.innerHTML = it.replace('<body>', '')
        document.body.appendChild(div.children[0])
      },
      getContent(){
        return '<body>'
      },
      setTitle(it){
        document.title = it
      }
    }
  }
}