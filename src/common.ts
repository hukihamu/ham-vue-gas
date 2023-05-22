
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
            if (!content) return undefined
            return JSON.parse(content)[key]
        }
        /**
         * gasサイドでのみ利用可能
         */
        getGasConfig(key: Exclude<(G | C | 'debug'), ''>): string | undefined {
            return PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
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
     * Interfaceにextendsを行う
     */
    export type BaseControllerInterface = {
        [name: string]: {
            at: unknown
            rt: unknown
        }
    }
}
type NonEmptyArray<T> = [T, ...T[]]