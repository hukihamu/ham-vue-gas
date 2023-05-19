import {initGas} from '@/gas/initGas'
import {Config} from '@/common/config'
import {consoleLog} from '@/common/consoleLog'
import {SSRepository} from '@/gas/spreadsheetDB'
import {initRouter, initVue} from '@/vue/initVue'
import {GasClient} from '@/vue/gasClient'

export default {
    Config,
    consoleLog,
    initGas,
    SSRepository,
    initVue,
    GasClient,
    initRouter
}