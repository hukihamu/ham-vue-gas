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
const sheet = {
  setName(){},
  getRange(){
    return range
  },
  getDataRange(){
    return range
  }
}
const range = {
  getValue(){
    return ''
  },
  getValues(){
    return []
  },
  setValue(){},
  setValues(){}

}
const spreadsheet = {
  getSheetByName(){
    return sheet
  },
  insertSheet(){

  }
}
window.SpreadsheetApp = {
  openById(){
    return spreadsheet
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