
export function ssCache(spreadSheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp, spreadsheetId: string) {
    const spreadsheet = spreadSheetApp.openById(spreadsheetId)
    const tempSheet = spreadsheet.getSheetByName('cache')
    const sheet = tempSheet ? tempSheet : spreadsheet.insertSheet().setName('cache')
    return {
        get: (rowNumber: number) => {
            const table = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues()
            let text = ''
            for (const row of table) {
                for (const col of row) {
                    if (col) {
                        text += col.toString()
                    } else {
                        break
                    }
                }
            }
            return JSON.parse(text)
        },
        set: (rowNumber: number, data: any) => {
            // ※1セル50000文字制限のため、余裕を持って45000
            let json = JSON.stringify(data)
            const chunks = []
            while (json.length > 0) {
                chunks.push(json.substring(0, 45000))
                json = json.substring(45000)
            }
            const range = sheet.getRange(rowNumber, 1, 1, chunks.length)
            range.setValues([chunks])
        }
    }
}