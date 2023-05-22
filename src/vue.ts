import {App, Component, createApp} from 'vue/dist/vue'
import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'
import {hCommon} from '@/common'

export namespace hVue{
    /**
     * Vue側entryファイルで実行する関数<br>
     *
     * @param app Componentか、Routingを設定可能
     * @param useFunc Vueに追加するプラグインを登録するFunction. example: app => app.use(vuetify). default: app => app
     * @param mountContainer マウントするエレメント default: #app
     */
    export function initVue(app: Component | RouteRecordRaw[], useFunc: (app: App<Element>) => App<Element> = (app) => app, mountContainer: string = '#app') {
        hCommon.consoleLog.debug = (label: string, data: any) => {
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

    /**
     * Vue側からGasで作成したコントローラを呼び出すクラス<br>
     * Gas側で作成したControllerInterfaceをgenerics宣言する
     */
    export class GasClient <C extends hCommon.BaseControllerInterface>{
        /**
         * Controllerの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
         * ControllerInterfaceを宣言すれば、コード補完で作成している名前が確認できる
         * @param name Controller名
         * @param args Controller引数
         */
        send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']){
            return new Promise((resolve, reject) => {
                const run = google.script.run
                    .withSuccessHandler(it => resolve(JSON.parse(it)))
                    .withFailureHandler(error => reject(error))[name as string]
                if (run) {
                    run(args)
                } else {
                    reject(`not found controller: ${name as string}`)
                }
            })
        }
    }
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
