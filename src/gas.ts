import {hCommon} from '@/common'

export namespace hGas {
    /**
     * Controller実装に利用する
     */
    export type ControllerType<C extends hCommon.BaseControllerInterface> = {
        [K in keyof C]: (args?: C[K]['at']) => Promise<C[K]['rt']>
    }
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

    /**
     * Gas側entryファイルで実行する関数<br>
     * @param config インスタンス化したhCommon.Configを入力
     * @param htmlFileName htmlファイル名を設定 default: index
     * @param editHtmlOutput gasの機能で、htmlオブジェクトを編集したい際に利用(title変更など)
     */
    export function initGas<C extends string, G extends string, V extends string>(
        config: hCommon.Config<C, G, V>,
        htmlFileName: string = 'index',
        editHtmlOutput: (output:  GoogleAppsScript.HTML.HtmlOutput) =>  GoogleAppsScript.HTML.HtmlOutput
            = (output) => output): InitGasOptions{
        hCommon.consoleLog.debug = (label: string, data: any)=> {
            if (config.getGasConfig('debug') === 'true') console.log(label, data)
        };
        global.doGet = () => {
            const gasHtml = HtmlService.createHtmlOutputFromFile(htmlFileName)
            gasHtml.setContent(gasHtml.getContent().replace('<body>', `<body><script type='application/json' id="vue-config">${JSON.stringify(config.getAllVueConfig())}</script>`))
            return editHtmlOutput(gasHtml)
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
        private get sheet(): GoogleAppsScript.Spreadsheet.Sheet{
            const throwText = () => {
                throw 'not found GoogleAppsScript.Spreadsheet.Sheet'
            }
            return this._sheet ?? throwText()
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
        protected abstract readonly columnList: (keyof InitEntity<E>)[]
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

        private checkVersionUpdated(): boolean {
            return this.sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion
        }

        private createTable(): void {
            // DataRangeが1行より多い場合、データはあると判断
            if (this.sheet.getDataRange().getValues().length > 1) {
                const oldVersion = this.sheet.getRange(1, 1, 1, 1).getValue()
                const oldSheet = this.sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId))
                const oldName = this.sheet.getName() + ' version:' + oldVersion
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

        /**
         * gasInit().useSpreadsheetDBで利用される
         */
        initTable(): void {
            const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId)
            const sheet = spreadsheet.getSheetByName(this.tableName)
            this._sheet = sheet ? sheet : spreadsheet.insertSheet().setName(this.tableName)

            if (this.checkVersionUpdated()) {
                this.createTable()
            }
        }

        /**
         * 挿入処理
         * @param entity 挿入するデータ。rowの有無は任意(利用せず、新規rowが付与される)
         */
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

        /**
         * 全件取得(フィルターなどはJSで実施)
         */
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

        /**
         * １件取得
         * @param row 取得するrow(rowは自動で付与され、不定一意)
         */
        getByRow(row: number): E {
            return this.onLock(() => {
                const stringList = this.getRowRange(row).getValues()[0] ?? []
                return this.toEntity(stringList)
            })
        }

        /**
         * 更新処理(上書きなため、部分変更不可)
         * @param entity 変更するデータ(row 必須)
         */
        update(entity: E): void {
            this.onLock(() => {
                this.getRowRange(entity.row).setValues([this.toStringList(entity)])
            })
        }

        /**
         * 削除処理
         * @param row 削除するrow(rowは自動で付与され、不定一意)
         */
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
}

type LockType = 'user' | 'script' | 'none'
declare let global: { [name: string]: unknown }
type WrapperController<C extends hCommon.BaseControllerInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string>

interface InitGasOptions {
    /**
     * Controllerを登録する<br>
     * 変数"global[{Controller名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
     * globalへ代入前に"wrapperController"を利用する
     */
    useController<C extends { [name: string]: any }>(initGlobal: (
        global: {[K in keyof C]: WrapperController<C, K>},
        wrapperController: <C extends hCommon.BaseControllerInterface, K extends keyof C>(controller: hGas.ControllerType<C>, name: K)=> WrapperController<C,K>)=>void): InitGasOptions
    /**
     * SpreadsheetをDBとして利用する<br>
     * 作成したRepositoryを登録する
     */
    useSpreadsheetDB (...repositoryList: { new (): hGas.SSRepository<any> }[]): InitGasOptions,
}

function wrapperController<C extends hCommon.BaseControllerInterface, K extends keyof C>(controller: hGas.ControllerType<C>, name: K): WrapperController<C, K> {
    return async (args: any) => {
        try {
            let returnValue
            if (PropertiesService.getScriptProperties().getProperty('debug') === 'true') {
                console.log('arg: ', args)
                returnValue = await controller[name](args)
                console.log('return: ', returnValue)
            } else {
                returnValue = await controller[name](args)
            }
            return JSON.stringify(returnValue)
        } catch (e) {
            hCommon.consoleLog.error('Controller error:', e)
            throw e
        }
    }
}
/**
 * gas側の機能拡張
 */
const initGasOption: InitGasOptions = {
    useController<C extends hCommon.BaseControllerInterface>(initGlobal: (
        global: {[K in keyof C]: WrapperController<C, K>},
        wrapperController: <C extends hCommon.BaseControllerInterface, K extends keyof C>(controller: hGas.ControllerType<C>, name: K)=> WrapperController<C,K>)=>void): InitGasOptions {
        initGlobal(global as any, wrapperController)
        return initGasOption
    },
    useSpreadsheetDB(...repositoryList): InitGasOptions {
        for (const repository of repositoryList) {
            try {
                new repository().initTable()
            }catch (e) {
                hCommon.consoleLog.error('init spreadsheet error', e)
            }
        }
        return initGasOption
    }
}

