import {consoleLog} from '@/common/consoleLog'
import { createApp, App , defineComponent} from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory, Router } from 'vue-router'

export let router: Router
export function initVue(routes: RouteRecordRaw[], useApp: (app: App<Element>) => App<Element> = (app) => app, mountContainer: string = '#app') {
    router = createRouter({
        history: createWebHistory(),
        routes,
    })
    consoleLog.debug = (label: string, data: any) => {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        if (JSON.parse(content)['debug'] === 'true') console.log(label, data)
    }
    // router.afterEach(route => {
    //     window.google.script.history.replace(undefined, route.query, route.path)
    // })
    // window.google.script.url.getLocation(location => {
    //     const path = location.hash ? location.hash : '/'
    //     const query = location.parameter
    //     router.replace({ path, query })
    // })
    const app = defineComponent({
        name: 'App',
        setup(){

        },
        template: `<div><router-view></router-view></div>`,
    })
    useApp(createApp(app).use(router)).mount(mountContainer)
}