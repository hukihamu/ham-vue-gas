import {initGas} from '@/gas/initGas'
import {Config} from '@/common/config'
import {consoleLog} from '@/common/consoleLog'
import {SSRepository} from '@/gas/spreadsheetDB'
import {initVue} from '@/vue/initVue'
import {GasClient} from '@/vue/gasClient'

export default {
    common: {
        Config,
        consoleLog
    },
    gas: {
        initGas,
        SSRepository
    },
    vue: {
        initVue,
        GasClient
    }
}