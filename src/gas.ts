import * as hCommon from '@/common'
import consoleLog = hCommon.consoleLog
import {SSRepository} from '@/spreadsheet'
export * from '@/spreadsheet'
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

declare let global: { [name: string]: unknown }
type WrapperMethod<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string | {e: any}>

interface InitGasOptions {
    /**
     * Gasで実行される関数を登録する<br>
     * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
     * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
     * globalへ代入前に"wrapperMethod"を利用する<br>
     * GasMethodInterfaceをGenerics宣言すると、コード補完される
     */
    useGasMethod<C extends { [name: string]: any }>(gasMethod: GasMethodsTypeRequired<C>, initGlobal: (
        global: {[K in keyof C]: WrapperMethod<C, K>},
        wrapperMethod: <K extends keyof C>(name: K)=> WrapperMethod<C,K>)=>void): InitGasOptions
    /**
     * SpreadsheetをDBとして利用する<br>
     * 作成したRepositoryを登録する
     */
    useSpreadsheetDB (...repositoryList: { new (): SSRepository<any> }[]): InitGasOptions,
}

/**
 * gas側の機能拡張
 */
const initGasOption: InitGasOptions = {
    /**
     * Gasで実行される関数を登録する<br>
     * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
     * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
     * globalへ代入前に"wrapperMethod"を利用する<br>
     * GasMethodInterfaceをGenerics宣言すると、コード補完される
     */
    useGasMethod<C extends hCommon.BaseGasMethodInterface>(gasMethod: GasMethodsTypeRequired<C>, initGlobal: (
        global: {[K in keyof C]: WrapperMethod<C, K>},
        wrapperMethod: <K extends keyof C>(name: K)=> WrapperMethod<C,K>)=>void): InitGasOptions {

        function wrapperMethod<K extends keyof C>(name: K): WrapperMethod<C, K> {
            return async (args: any) => {
                let returnValue
                if (PropertiesService.getScriptProperties().getProperty('debug') === 'true') {
                    console.log('arg: ', args)
                    returnValue = await gasMethod[name](args)
                    console.log('return: ', returnValue)
                } else {
                    returnValue = await gasMethod[name](args)
                }
                return JSON.stringify(returnValue)
            }
        }

        initGlobal(global as any, wrapperMethod)
        return initGasOption
    },
    /**
     * SpreadsheetをDBとして利用する<br>
     * 作成したRepositoryを登録する
     */
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
    },
}

