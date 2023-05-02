import {InitEntity} from '@/@types/initEntity'

type LockType = 'user' | 'script' | 'none'

export abstract class SSRepository<E extends SSEntity> {
    private sheet: GoogleAppsScript.Spreadsheet.Sheet
    private static readonly TABLE_VERSION_LABEL = 'ver:'
    private static readonly DELETE_LABEL = 'DELETE'
    private static readonly ROW_FUNCTION = '=row()'
    private readonly spreadsheetId: string

    protected abstract readonly tableVersion: number
    protected abstract readonly columnList: (keyof InitEntity<E>)[]
    protected readonly initData: InitEntity<E>[] = []
    // デフォルト: user
    lockType: LockType = 'user'
    lockWaitMSec: number = 10000

    protected constructor(spreadsheetId: string, tableName: string) {
        this.spreadsheetId = spreadsheetId
        // シートの取得(作成)

        const spreadsheet = SpreadsheetApp.openById(spreadsheetId)
        const sheet = spreadsheet.getSheetByName(tableName)
        this.sheet = sheet ? sheet : spreadsheet.insertSheet().setName(tableName)
    }

    private checkVersionUpdated(): boolean {
        return this.sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion
    }

    private createTable(): void {
        // DataRangeが1行より多い場合、データはあると判断
        if (this.sheet.getDataRange().getValues().length > 1) {
            const oldVersion = this.sheet.getRange(1, 1, 1, 1).getValue()
            const oldSheet = this.sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId))
            const oldName = this.sheet.getName() + ' webpack' + oldVersion
            oldSheet.setName(oldName)
            this.sheet.clear()
        }
        // バージョン情報をセット
        this.sheet.getRange(1, 1, 1, 1).setValue(SSRepository.TABLE_VERSION_LABEL + this.tableVersion)
        //ヘッダーをセット
        this.sheet.getRange(1, 2, 1, this.columnList.length).setValues([this.columnList])
        //初期データをインサート
        for (const e of this.initData) {
            this.insert(e)
        }
    }

    private toStringList(entity: E | InitEntity<E>): string[] {
        const result: string[] = []
        result.push(SSRepository.ROW_FUNCTION)
        for (const key of this.columnList) {
            const value = entity[key] ?? ''
            result.push(JSON.stringify(value))
        }
        return result
    }

    private toEntity(stringList: string[]): E {
        const entity: any = {
            row: stringList[0],
        }

        for (let i = 1; i < stringList.length; i++) {
            const key = this.columnList[i - 1]
            entity[key] = JSON.parse(stringList[i] ?? '')
        }
        return entity as E
    }

    private getRowRange(rowNumber: number): GoogleAppsScript.Spreadsheet.Range {
        return this.sheet.getRange(rowNumber, 1, 1, this.columnList.length + 1)
    }

    private onLock<R>(runningInLock: () => R): R {
        if (this.lockType === 'none') return runningInLock()
        const lock = this.lockType === 'user' ? LockService.getUserLock() : LockService.getScriptLock()
        try {
            lock.waitLock(this.lockWaitMSec)
            const result = runningInLock()
            SpreadsheetApp.flush()
            return result
        } finally {
            lock.releaseLock()
        }
    }

    initTable(): void {
        if (this.checkVersionUpdated()) {
            this.createTable()
        }
    }

    insert(entity: E | InitEntity<E>): void {
        this.onLock(() => {
            let insertRowNumber = -1
            const values = this.sheet.getDataRange().getValues()
            for (let i = 1; i < values.length; i++) {
                if ((values[i] ?? [])[0] === SSRepository.DELETE_LABEL) {
                    insertRowNumber = i + 1
                    break
                }
            }
            const insertData = this.toStringList(entity)
            if (insertRowNumber === -1) {
                // 最後尾に挿入
                this.sheet.appendRow(insertData)
            } else {
                // 削除行に挿入
                this.getRowRange(insertRowNumber).setValues([insertData])
            }
        })
    }

    getAll(): E[] {
        return this.onLock(() => {
            const values = this.sheet.getRange(2, 1, this.sheet.getLastRow() - 1, this.columnList.length + 1).getValues()
            const entities: E[] = []
            for (const value of values) {
                if (!value[0]) break
                if (value[0] === SSRepository.DELETE_LABEL) continue
                entities.push(this.toEntity(value))
            }
            return entities
        })
    }

    getByRow(row: number): E {
        return this.onLock(() => {
            const stringList = this.getRowRange(row).getValues()[0] ?? []
            return this.toEntity(stringList)
        })
    }

    update(entity: E): void {
        this.onLock(() => {
            this.getRowRange(entity.row).setValues([this.toStringList(entity)])
        })
    }

    delete(row: number): void {
        this.onLock(() => {
            const range = this.getRowRange(row)
            range.clear()
            const d = new Array(this.columnList.length + 1)
            d[0] = SSRepository.DELETE_LABEL
            range.setValues([d])
        })
    }
}
