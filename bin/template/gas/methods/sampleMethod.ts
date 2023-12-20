import {hGas} from 'ham-vue-gas'
import {GasMethodInterface} from '@C/gasMethodInterface'
import {SampleRepository} from '@G/repository/sampleRepository'

export const sampleMethod: hGas.GasMethodsType<GasMethodInterface> = {
    async insertData(args){
        const repo = new SampleRepository()
        repo.insert({text: args})
        return repo.getAll().map(it => it.text)
    }
}