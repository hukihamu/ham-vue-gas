type NonEmptyArray<T> = [T, ...T[]]
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