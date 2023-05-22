
export namespace hCommon {
    /**
     * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
     * gasInit実行時に必須
     */
    export class Config<C extends string, G extends string, V extends string> {
        constructor(private commonConfigKeys: NonEmptyArray<C>, private gasConfigKeys: NonEmptyArray<G>, private vueConfigKeys: NonEmptyArray<V>) {}

        /**
         * vueサイドでのみ利用可能
         */
        getVueConfig(key: Exclude<(V | C | 'debug'), ''>): string | undefined {
            const content = document.getElementById('vue-config')?.textContent
            if (!content) {
                consoleLog.debug('vue config', `key: ${key}, content undefined`)
                return undefined
            }
            const value = JSON.parse(content)[key]
            consoleLog.debug('vue config', `key: ${key}, value: ${value}`)
            return value
        }
        /**
         * gasサイドでのみ利用可能
         */
        getGasConfig(key: Exclude<(G | C | 'debug'), ''>): string | undefined {
            const value = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
            consoleLog.debug('gas config', `key: ${key}, value: ${value}`)
            return value
        }

        /**
         * すべてのVueConfigを取得(gasサイドでのみ利用可能)
         */
        getAllVueConfig(): {[key in Exclude<(V | C), ''>]: string | undefined } {
            let config: {[key: string]: string | undefined} = { }
            config['debug'] = PropertiesService.getScriptProperties().getProperty('debug') ?? undefined
            for (const key of this.commonConfigKeys) {
                if (key === '') continue
                config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
            }
            for (const key of this.vueConfigKeys) {
                if (key === '') continue
                config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
            }
            consoleLog.debug('vue config all', config)
            return config as {[key in (V | C)]: string | undefined}
        }
        /**
         * すべてのGasConfigを取得(gasサイドでのみ利用可能)
         */
        getAllGasConfig(): {[key in Exclude<(G | C), ''>]: string | undefined } {
            let config: {[key: string]: string | undefined} = { }
            config['debug'] = PropertiesService.getScriptProperties().getProperty('debug') ?? undefined
            for (const key of this.commonConfigKeys) {
                if (key === '') continue
                config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
            }
            for (const key of this.gasConfigKeys) {
                if (key === '') continue
                config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
            }
            return config as {[key in (G | C)]: string | undefined}
        }
    }

    /**
     * Vue・Gas共に利用可能なLog出力
     */
    export const consoleLog = {
        info(label: string, data: any){
            console.info(label, data)
        },
        debug(label: string, data: any){
            console.log(label, data)
        },
        warn(label: string, data: any){
            console.warn(label, data)
        },
        error(label: string, data: any){
            console.error(label, data)
        },
    }
    /**
     * Controllerの定義に利用<br>
     * Interfaceにextendsを行う<br>
     * 構成: {Controller名: {at: 引数型, rt: 戻り値型}}
     */
    export type BaseControllerInterface = {
        [name: string]: {
            at: unknown
            rt: unknown
        }
    }
}
type NonEmptyArray<T> = [T, ...T[]]