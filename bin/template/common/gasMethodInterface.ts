import {hCommon} from 'ham-vue-gas'

export interface GasMethodInterface extends hCommon.BaseGasMethodInterface {
    insertData: {
        at: string
        rt: string[]
    }
}