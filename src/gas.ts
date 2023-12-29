import * as hCommon from '@/common'
export * from '@/spreadsheet'
export * from '@/notion'
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
                                                                              option: ArgsOption = {}) {
    hCommon.consoleLog.debug = (label: string, data: any) => {
        if (config.getGasConfig('debug') === 'true') console.log(label, data)
    }
    global.doGet = () => {
        const gasHtml = HtmlService.createHtmlOutputFromFile(option.htmlFileName ?? 'index')
        gasHtml.setContent(gasHtml.getContent().replace('<body>', `<body><script type='application/json' id="vue-config">${JSON.stringify(config.getAllVueConfig())}</script>`))
        return option.editHtmlOutput ? option.editHtmlOutput(gasHtml) : gasHtml
    }
}

declare let global: { [name: string]: unknown }
type WrapperMethod<C extends hCommon.BaseGasMethodInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string | {e: any}>

/**
 * Gasで実行される関数を登録する<br>
 * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
 * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
 * globalへ代入前に"wrapperMethod"を利用する<br>
 * GasMethodInterfaceをGenerics宣言すると、コード補完される
 */
export function useGasMethod<C extends hCommon.BaseGasMethodInterface>(gasMethod: GasMethodsTypeRequired<C>, initGlobal: (
    global: {[K in keyof C]: WrapperMethod<C, K>},
    wrapperMethod: <K extends keyof C>(name: K)=> WrapperMethod<C,K>)=>void) {

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
}

/**
 * ScriptPropertiesのCountUrlFetchAppにUrlFetchAppを何回実行したかカウントする
 * 無料アカウントなら20000回まで
 * ※fetchのみラッパー済み
 */
export function wrapperUrlFetchApp(urlFetchApp: GoogleAppsScript.URL_Fetch.UrlFetchApp): GoogleAppsScript.URL_Fetch.UrlFetchApp {
    return {
        fetch: (url: string, options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {}) => {
            const counter = JSON.parse(PropertiesService.getScriptProperties().getProperty('CountUrlFetchApp') ?? '{count: 0, date: null}')
            const nowDate = new Date().toLocaleDateString('en-US')
            if (counter.date === nowDate) {
                counter.count++
            } else {
                counter.count = 1
                counter.date = nowDate
            }
            PropertiesService.getScriptProperties().setProperty('CountUrlFetchApp', JSON.stringify(counter))
            return urlFetchApp.fetch(url, options)
        },
        fetchAll: urlFetchApp.fetchAll,
        getRequest: urlFetchApp.getRequest
    }
}