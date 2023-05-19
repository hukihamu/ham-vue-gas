import {consoleLog} from '@/common/consoleLog'
import { createApp , App, Component } from 'vue'
import { useRouter } from 'vue-router'


export function initVue(app: Component, useFunc: (app: App<Element>) => App<Element> = (app) => app, mountContainer: string = '#root') {
    consoleLog.debug = (label: string, data: any) => {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        if (JSON.parse(content)['debug'] === 'true') console.log(label, data)
    }
    useFunc(createApp(app)).mount(mountContainer)
}

/**
 * RouterとGasのURLを紐づけします
 */
export function initRouter() {
    const router = useRouter()
    router.afterEach(route => {
        window.google.script.history.replace(undefined, route.query, route.path)
    })
    window.google.script.url.getLocation(location => {
        const path = location.hash ? location.hash : '/'
        const query = location.parameter
        router.replace({ path, query })
    })
}