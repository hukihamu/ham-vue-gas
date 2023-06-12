import {hCommon} from '@/common'
import consoleLog = hCommon.consoleLog

export namespace hGas {
    /**
     * GasMethod実装に利用する(全メソッド必須)
     */
    export type GasMethodsTypeRequired<C extends hCommon.BaseGasMethodInterface> = {
        [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>
    }
    /**
     * GasMethod実装に利用する(任意の複数メソッド)
     */
    export type GasMethodsType<C extends hCommon.BaseGasMethodInterface> = Partial<{
        [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>
    }>
    /**
     * GasMethod実装に利用する(1メソッドのみ)
     */
    export type GasMethodType<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args?: C[K]['at']) => Promise<C[K]['rt']>
    /**
     * SSRepositoryのinitData、columnListの宣言に使用
     */
    export type InitEntity<E extends SSEntity> = Omit<E, 'row'>
    /**
     * スプレッドシートに格納するデータオブジェクトを定義
     */
    export type SSEntity = {
        row: number
    }
    type ArgsOption = {
        htmlFileName?: string
        editHtmlOutput?: (output: GoogleAppsScript.HTML.HtmlOutput) => GoogleAppsScript.HTML.HtmlOutput
    }
    /**
     * Gas側entryファイルで実行する関数<br>
     * @param config インスタンス化したhCommon.Configを入力
     * @param option htmlファイル名を変更したり、htmlを変更する際に利用
     */
    export function initGas<C extends string, G extends string, V extends string>(config: hCommon.Config<C, G, V>,
                                                                                  option: ArgsOption = {}): InitGasOptions {
        hCommon.consoleLog.debug = (label: string, data: any) => {
            if (config.getGasConfig('debug') === 'true') console.log(label, data)
        }
        global.doGet = () => {
            const gasHtml = HtmlService.createHtmlOutputFromFile(option.htmlFileName ?? 'index')
            gasHtml.setContent(gasHtml.getContent().replace('<body>', `<body><script type='application/json' id="vue-config">${JSON.stringify(config.getAllVueConfig())}</script>`))
            return option.editHtmlOutput ? option.editHtmlOutput(gasHtml) : gasHtml
        }
        return initGasOption
    }

    /**
     * スプレッドシートをテーブルとしてCRUD操作を行う<br>
     * 本abstract classをextendsして作成する<br>
     * extendsしたクラスをgasInit().useSpreadsheetDBに入力すると利用可能となる<br>
     * extendsしたクラスをインスタンス化して利用する
     */
    export abstract class SSRepository<E extends SSEntity> {

        private _sheet: GoogleAppsScript.Spreadsheet.Sheet | undefined
        private importSheet(): GoogleAppsScript.Spreadsheet.Sheet | undefined{
            const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId)
            return spreadsheet.getSheetByName(this.tableName) ?? undefined
        }

        private get sheet(): GoogleAppsScript.Spreadsheet.Sheet{
            if (!this._sheet) {
                this._sheet = this.importSheet()
                if (this._sheet) {
                    if (this.checkRequiredUpdate(this._sheet)){
                        throw `not updated Sheet "${this.tableName}" gas editor run "initTables"`
                    } else {
                        return this._sheet
                    }
                }
                throw `not found Sheet "${this.tableName}" gas editor run "initTables"`
            } else {
                return this._sheet
            }
        }
        private static readonly TABLE_VERSION_LABEL = 'ver:'
        private static readonly DELETE_LABEL = 'DELETE'
        private static readonly ROW_FUNCTION = '=row()'

        /**
         * テーブルバージョン<br>
         * 変更を行うと、旧テーブルをバックアップし、新しくテーブル生成を行う<br>
         * columnList、initData、Entity変更時にバージョンを上げる
         * @protected
         */
        protected abstract readonly tableVersion: number
        /**
         * スプレッドシートに保存する際のカラム順を決める
         * @protected
         */
        protected abstract readonly columnOrder: (keyof InitEntity<E>)[]
        /**
         * テーブル作成(アップデート)時、初期にInsertされるデータ
         * @protected
         */
        protected readonly initData: InitEntity<E>[] = []
        /**
         * データ格納に利用するスプレッドシートID(d/{スプレッドシートID}/edit)
         * @protected
         */
        protected abstract readonly spreadsheetId: string
        /**
         * テーブル名(シート名)
         * @protected
         */
        protected abstract readonly tableName: string
        /**
         * トランザクションタイプ(LockService参照) default: user
         */
        lockType: LockType = 'user'
        /**
         * トランザクションロック開放を待つ時間(ミリ秒)
         */
        lockWaitMSec: number = 10000



        private checkRequiredUpdate(sheet: GoogleAppsScript.Spreadsheet.Sheet): boolean {
            return sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion
        }

        private createTable(sheet: GoogleAppsScript.Spreadsheet.Sheet): void {
            // DataRangeが1行より多い場合、データはあると判断
            if (sheet.getDataRange().getValues().length > 1) {
                const oldVersion = sheet.getRange(1, 1, 1, 1).getValue()
                const oldSheet = sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId))
                const oldName = sheet.getName() + ' version:' + oldVersion
                oldSheet.setName(oldName)
                sheet.clear()
            }
            // バージョン情報をセット
            sheet.getRange(1, 1, 1, 1).setValue(SSRepository.TABLE_VERSION_LABEL + this.tableVersion)
            //ヘッダーをセット
            sheet.getRange(1, 2, 1, this.columnOrder.length).setValues([this.columnOrder])
            //初期データをインサート
            for (const e of this.initData) {
                this.insert(e)
            }
        }

        private toStringList(entity: E | InitEntity<E>): string[] {
            const result: string[] = []
            result.push(SSRepository.ROW_FUNCTION)
            for (const key of this.columnOrder) {
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
                const key = this.columnOrder[i - 1]
                entity[key] = JSON.parse(stringList[i] ?? '')
            }
            return entity as E
        }

        private getRowRange(rowNumber: number): GoogleAppsScript.Spreadsheet.Range {
            return this.sheet.getRange(rowNumber, 1, 1, this.columnOrder.length + 1)
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

        /**
         * gas console上で動作させるinitTables()で利用される
         */
        initTable(): void {
            // シートがない場合生成する必要がある
            const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId)
            const sheet = spreadsheet.getSheetByName(this.tableName)
            this._sheet = sheet ? sheet : spreadsheet.insertSheet().setName(this.tableName)
            CacheService.getScriptCache().remove(this.tableName)

            if (this.checkRequiredUpdate(this._sheet)) {
                this.createTable(this._sheet)
            }
        }

        /**
         * 挿入処理
         * @param entity 挿入するデータ。rowの有無は任意(利用せず、新規rowが付与される)
         */
        insert(entity: E | InitEntity<E>): void {
            this.onLock(() => {
                CacheService.getScriptCache().remove(this.tableName)
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

        /**
         * 全件取得(フィルターなどはJSで実施)
         */
        getAll(): E[] {
            const cache = CacheService.getScriptCache().get(this.tableName)
            let values: any[][] = []
            if (cache){
                values = JSON.parse(cache)
            } else {
                values = this.onLock(() => {
                    const lastRow = this.sheet.getLastRow()
                    if (lastRow <= 1) {
                        // 0件の場合は取得しない
                        return []
                    }
                    const values = this.sheet.getRange(2, 1, this.sheet.getLastRow() - 1, this.columnOrder.length + 1).getValues()
                    CacheService.getScriptCache().put(this.tableName, JSON.stringify(values), 21600)
                    return values
                })
            }
            const entities: E[] = []
            for (const value of values) {
                if (!value[0]) break
                if (value[0] === SSRepository.DELETE_LABEL) continue
                entities.push(this.toEntity(value))
            }
            return entities
        }

        /**
         * １件取得
         * @param row 取得するrow(rowは自動で付与され、不定一意)
         */
        getByRow(row: number): E {
            const cache = CacheService.getScriptCache().get(this.tableName)
            let stringList = []
            if (cache){
                stringList = JSON.parse(cache)[row - 2]
            } else {
                this.onLock(() => {
                    stringList = this.getRowRange(row).getValues()[0] ?? []
                })
            }
            return this.toEntity(stringList)
        }

        /**
         * 更新処理(上書きなため、部分変更不可)
         * @param entity 変更するデータ(row 必須)
         */
        update(entity: E): void {
            this.onLock(() => {
                CacheService.getScriptCache().remove(this.tableName)
                this.getRowRange(entity.row).setValues([this.toStringList(entity)])
            })
        }

        /**
         * 削除処理
         * @param row 削除するrow(rowは自動で付与され、不定一意)
         */
        delete(row: number): void {
            this.onLock(() => {
                CacheService.getScriptCache().remove(this.tableName)
                const range = this.getRowRange(row)
                range.clear()
                const d = new Array(this.columnOrder.length + 1)
                d[0] = SSRepository.DELETE_LABEL
                range.setValues([d])
            })
        }
    }
}

type LockType = 'user' | 'script' | 'none'
declare let global: { [name: string]: unknown }
type WrapperMethod<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string>

interface InitGasOptions {
    /**
     * Gasで実行される関数を登録する<br>
     * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
     * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
     * globalへ代入前に"wrapperMethod"を利用する<br>
     * GasMethodInterfaceをGenerics宣言すると、コード補完される
     */
    useGasMethod<C extends { [name: string]: any }>(gasMethod: hGas.GasMethodsTypeRequired<C>, initGlobal: (
        global: {[K in keyof C]: WrapperMethod<C, K>},
        wrapperMethod: <K extends keyof C>(name: K)=> WrapperMethod<C,K>)=>void): InitGasOptions
    /**
     * SpreadsheetをDBとして利用する<br>
     * 作成したRepositoryを登録する
     */
    useSpreadsheetDB (...repositoryList: { new (): hGas.SSRepository<any> }[]): InitGasOptions,
}

/**
 * gas側の機能拡張
 */
const initGasOption: InitGasOptions = {
    useGasMethod<C extends hCommon.BaseGasMethodInterface>(gasMethod: hGas.GasMethodsTypeRequired<C>, initGlobal: (
        global: {[K in keyof C]: WrapperMethod<C, K>},
        wrapperMethod: <K extends keyof C>(name: K)=> WrapperMethod<C,K>)=>void): InitGasOptions {

        function wrapperMethod<K extends keyof C>(name: K): WrapperMethod<C, K> {
            return async (args: any) => {
                try {
                    let returnValue
                    if (PropertiesService.getScriptProperties().getProperty('debug') === 'true') {
                        console.log('arg: ', args)
                        returnValue = await gasMethod[name](args)
                        console.log('return: ', returnValue)
                    } else {
                        returnValue = await gasMethod[name](args)
                    }
                    return JSON.stringify(returnValue)
                } catch (e) {
                    hCommon.consoleLog.error('GasMethod error:', e)
                    throw e
                }
            }
        }

        initGlobal(global as any, wrapperMethod)
        return initGasOption
    },
    useSpreadsheetDB(...repositoryList): InitGasOptions {
        global.initTables = () => {
            for (const repository of repositoryList) {
                try {
                    consoleLog.info('create instances')
                    const r = new repository()
                    const name = r['tableName']
                    consoleLog.info('start', name)
                    r.initTable()
                    consoleLog.info('success', name)
                }catch (e) {
                    hCommon.consoleLog.error('init spreadsheet error', e)
                }
            }
        }
        global.clearCacheTable = () => {
            for (const repository of repositoryList) {
                try {
                    consoleLog.info('cache clear')
                    const r = new repository()
                    const name = r['tableName']
                    consoleLog.info('start', name)
                    CacheService.getScriptCache().remove(name)
                    consoleLog.info('success', name)
                }catch (e) {
                    hCommon.consoleLog.error('clear cache table error', e)
                }
            }
        }
        return initGasOption
    }
}

