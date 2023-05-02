import {consoleLog} from '@/common/consoleLog'
import {Config} from '@/common/config'
import {SSRepository} from '@/gas/spreadsheetDB'
import {Controller} from '@/gas/controller'

export function initGas<C extends string, G extends string, V extends string>(
    htmlFileName: string,
    config: Config<C, G, V>,
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
type WrapperController = (args: any) => Promise<any>
function initController(controller: Controller<any>): WrapperController {
    return async (args: any) => {
        try {
            let returnValue
            if (PropertiesService.getScriptProperties().getProperty('debug') === 'true') {
                console.log('arg: ', args)
                returnValue = await controller.run(args)
                console.log('return: ', returnValue)
            } else {
                returnValue = await controller.run(args)
            }
            return JSON.stringify(returnValue)
        } catch (e) {
            consoleLog.error('Controllerエラー:', e)
            throw e
        }
    }
}
const initGasOption: InitGasOptions = {
    useController<K extends BaseControllerType>(initGlobal: (
        global: {[key in keyof K]: WrapperController},
        wrapperController: (controller: Controller<any>)=> WrapperController)=>void): InitGasOptions {
        initGlobal(global as any, initController)
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
    useController<K extends { [name: string]: any }>(initGlobal: (
        global: {[key in keyof K]: WrapperController},
        wrapperController: (controller: Controller<any>)=> WrapperController)=>void): InitGasOptions
    useSpreadsheetDB (...repositoryList: { new (): SSRepository<any> }[]): InitGasOptions,
}