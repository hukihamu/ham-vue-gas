import {consoleLog} from '@/common/consoleLog'
import { createApp , App, Component } from 'vue'
import { RouteRecordRaw, createRouter, createWebHistory, useRouter } from 'vue-router'


export function initVue(routes: RouteRecordRaw[],  useFunc: (app: App<Element>) => App<Element> = (app) => app, mountContainer: string = '#root') {
    const router = createRouter({
        history: createWebHistory(),
        routes,
    })
    consoleLog.debug = (label: string, data: any) => {
        const content = document.getElementById('vue-config')?.textContent ?? ''
        if (JSON.parse(content)['debug'] === 'true') console.log(label, data)
    }
    const vueApp = createApp(createRoot())
    vueApp.use(router)
    useFunc(vueApp)
    vueApp.mount(mountContainer)
}

function createRoot(): Component {
    return {
        name: "Root",
        setup() {
            const router = useRouter()
            router.afterEach(route => {
                window.google.script.history.replace(undefined, route.query, route.path)
            })
            window.google.script.url.getLocation(location => {
                const path = location.hash ? location.hash : '/'
                const query = location.parameter
                router.replace({ path, query })
            })
        },
        template: '<router-view></router-view>'
    }
}