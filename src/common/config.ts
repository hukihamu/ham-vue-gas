export class Config<C extends string, G extends string, V extends string> {
    constructor(private commonConfigKeys: C[], private gasConfigKeys: G[], private vueConfigKeys: V[]) {}

    /**
     * vueサイドでのみ利用可能
     */
    getVueConfig(key: (keyof V | keyof C | 'debug')): string | undefined {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        return JSON.parse(content)[key]
    }
    /**
     * gasサイドでのみ利用可能
     */
    getGasConfig(key: (keyof G | keyof C | 'debug')): string | undefined {
        return PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
    }
    getAllVueConfig(): {[key in (keyof V | keyof C)]: string | undefined } {
        let config: {[key: string]: string | undefined} = { }
        for (const key of this.commonConfigKeys) {
            config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
        }
        for (const key of this.vueConfigKeys) {
            config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
        }
        return config as {[key in (keyof V | keyof C)]: string | undefined}
    }
    getAllGasConfig(): {[key in (keyof G | keyof C)]: string | undefined } {
        let config: {[key: string]: string | undefined} = { }
        for (const key of this.commonConfigKeys) {
            config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
        }
        for (const key of this.gasConfigKeys) {
            config[key] = PropertiesService.getScriptProperties().getProperty(key as string) ?? undefined
        }
        return config as {[key in (keyof G | keyof C)]: string | undefined}
    }
}