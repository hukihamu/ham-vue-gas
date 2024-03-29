import {consoleLog} from '@/common'

export function ssCache(spreadSheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp,
                        spreadsheetId: string,
                        expirationInSeconds?: number) {
    const spreadsheet = spreadSheetApp.openById(spreadsheetId)
    const tempSheet = spreadsheet.getSheetByName('cache')
    const sheet = tempSheet ? tempSheet : spreadsheet.insertSheet().setName('cache')
    return {
        get: (rowNumber: number) => {
            const expiration = Number.parseInt(sheet.getRange(rowNumber, 1, 1, 1).getValue(), 10)
            if (!expiration) {
                consoleLog.debug(`row:${rowNumber}`, 'cacheが見つからない')
                return null
            }
            if (expirationInSeconds && (Date.now() - expiration) /1000 > expirationInSeconds) {
                consoleLog.debug(`row:${rowNumber}`, 'expirationInSecondsを過ぎている')
                return null
            }
            const table = sheet.getRange(rowNumber, 2, 1, sheet.getLastColumn()).getValues()
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
            consoleLog.debug(`row:${rowNumber}`, 'success')
            return JSON.parse(text)
        },
        set: (rowNumber: number, data: any) => {
            // ※1セル50000文字制限のため、余裕を持って45000
            let json = JSON.stringify(data)
            const chunks: any[] = [Date.now()]
            while (json.length > 0) {
                chunks.push(json.substring(0, 45000))
                json = json.substring(45000)
            }
            const range = sheet.getRange(rowNumber, 1, 1, chunks.length)
            range.setValues([chunks])
        },
        clear: (rowNumber: number) => {
            sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).clear()
        }
    }
}