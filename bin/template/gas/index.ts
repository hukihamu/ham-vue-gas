import {hGas} from 'ham-vue-gas'
import {config} from '@C/config'
import {sampleMethod} from '@G/methods/sampleMethod'
import {SampleRepository} from '@G/repository/sampleRepository'

hGas.initGas(config,
    {
        editHtmlOutput: output => output.addMetaTag('viewport', 'width=device-width, initial-scale=1')
    })
hGas.useGasMethod(sampleMethod, (global, wrapperMethod) => {
    global.insertData = wrapperMethod('insertData')
})
hGas.useSpreadsheetDB((global, initTables, clearCacheTable) => {
    global.initTables = initTables
    global.clearCacheTable = clearCacheTable
}, SampleRepository,)