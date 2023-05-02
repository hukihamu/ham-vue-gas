import {initGas} from '@/gas/initGas'
import {Config} from '@/common/config'
import {consoleLog} from '@/common/consoleLog'
import {SSRepository} from '@/gas/spreadsheetDB'
import {initVue} from '@/vue/initVue'
import {GasClient} from '@/vue/gasClient'
import {Controller} from '@/gas/controller'

export default {
    common: {
        Config,
        consoleLog
    },
    gas: {
        initGas,
        SSRepository,
        Controller
    },
    vue: {
        initVue,
        GasClient
    }
}