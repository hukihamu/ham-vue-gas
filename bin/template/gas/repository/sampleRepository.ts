import {hGas} from 'ham-vue-gas'
import {SampleEntity} from '@G/entity/sampleEntity'
import {config} from '@C/config'

export class SampleRepository extends hGas.SSRepository<SampleEntity> {
    protected readonly columnOrder: (keyof hGas.InitEntity<SampleEntity>)[] = ['text']
    protected readonly spreadsheetId: string = config.getGasConfig('spreadsheetId')
    protected readonly tableName: string = 'SampleTable'
    protected readonly tableVersion: number = 1
    protected readonly spreadSheetApp: GoogleAppsScript.Spreadsheet.SpreadsheetApp = SpreadsheetApp
}