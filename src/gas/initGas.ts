import {consoleLog} from '@/common/consoleLog'
import {Config} from '@/common/config'
import {SSRepository} from '@/gas/spreadsheetDB'

export function initGas<C extends string, G extends string, V extends string>(
    config: Config<C, G, V>,
    htmlFileName: string = 'index',
    editHtmlOutput: (output:  GoogleAppsScript.HTML.HtmlOutput) =>  GoogleAppsScript.HTML.HtmlOutput
        = (output) => output): InitGasOptions{
    consoleLog.debug = (label: string, data: any)=> {
        if (config.getGasConfig('debug') === 'true') console.log(label, data)
    }
    global.doGet = () => {
        const gasHtml = HtmlService.createHtmlOutputFromFile(htmlFileName)
        gasHtml.setContent(gasHtml.getContent().replace('<body>', `<body><script type='application/json' id="vue-config">${JSON.stringify(config.getAllVueConfig())}</script>`))
        return editHtmlOutput(gasHtml)
    }
    return initGasOption
}
type WrapperController<C extends BaseControllerInterface, K extends keyof C> = (args: C[K]['at']) => Promise<string>
function wrapperController<C extends BaseControllerInterface, K extends keyof C>(controller: ControllerType<C>, name: K): WrapperController<C, K> {
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
            consoleLog.error('Controller error:', e)
            throw e
        }
    }
}
const initGasOption: InitGasOptions = {
    useController<C extends BaseControllerInterface>(initGlobal: (
        global: {[K in keyof C]: WrapperController<C, K>},
        wrapperController: <C extends BaseControllerInterface, K extends keyof C>(controller: ControllerType<C>, name: K)=> WrapperController<C,K>)=>void): InitGasOptions {
        initGlobal(global as any, wrapperController)
        return initGasOption
    },
    useSpreadsheetDB(...repositoryList): InitGasOptions {
        for (const repository of repositoryList) {
            try {
                new repository().initTable()
            }catch (e) {
                consoleLog.error('init spreadsheet error', e)
            }
        }
        return initGasOption
    }
}

interface InitGasOptions {
    useController<C extends { [name: string]: any }>(initGlobal: (
        global: {[K in keyof C]: WrapperController<C, K>},
        wrapperController: <C extends BaseControllerInterface, K extends keyof C>(controller: ControllerType<C>, name: K)=> WrapperController<C,K>)=>void): InitGasOptions
    useSpreadsheetDB (...repositoryList: { new (): SSRepository<any> }[]): InitGasOptions,
}