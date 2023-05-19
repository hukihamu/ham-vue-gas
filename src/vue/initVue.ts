import {consoleLog} from '@/common/consoleLog'
import { createApp , App, Component } from 'vue'
import { RouteRecordRaw, Router, createRouter, createWebHistory } from 'vue-router'


export function initVue(app: Component | RouteRecordRaw[], useFunc: (app: App<Element>) => App<Element> = (app) => app, mountContainer: string = '#app') {
    consoleLog.debug = (label: string, data: any) => {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        if (JSON.parse(content)['debug'] === 'true') console.log(label, data)
    }
    let appElement: App<Element>
    if ('length' in app) {
        // router
        const router = createRouter({
            history: createWebHistory(),
            routes: app as RouteRecordRaw[]
        })
        appElement = createApp(rootComponent(router)).use(router)
    } else {
        appElement = createApp(app)
    }
    useFunc(appElement).mount(mountContainer)
}

function rootComponent(router: Router): Component{
    return {
        setup(){
            router.afterEach(route => {
                window.google.script.history.replace(undefined, route.query, route.path)
            })
            window.google.script.url.getLocation(location => {
                const path = location.hash ? location.hash : '/'
                const query = location.parameter
                router.replace({ path, query })
            })
        },
        template: '<router-view />'
    }
}