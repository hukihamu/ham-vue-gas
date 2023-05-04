import {consoleLog} from '@/common/consoleLog'
import { createApp, App , defineComponent} from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory, Router } from 'vue-router'

let router: Router
export function initVue(routes: RouteRecordRaw[], mountName: string, useApp: (app: App<Element>) => App<Element> = (app) => app) {
    router = createRouter({
        history: createWebHistory(),
        routes,
    })
    consoleLog.debug = (label: string, data: any) => {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        if (JSON.parse(content)['debug'] === 'true') console.log(label, data)
    }
    useApp(createApp(app).use(router)).mount(mountName)
}

const app = defineComponent({
    name: 'App',
    template: `<router-view />`,
    setup(){
        router.afterEach(route => {
            window.google.script.history.replace(undefined, route.query, route.path)
        })
        window.google.script.url.getLocation(location => {
            const path = location.hash ? location.hash : '/'
            const query = location.parameter
            router.replace({ path, query })
        })
    }
})