import {App, Component, createApp} from 'vue'
import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'
import {hCommon} from '@/common'
import {SetupContext} from '@vue/runtime-core'

type ArgsOption = {
    usePlugin?: (app: App<Element>) => App<Element>
    mountContainer?: string
    vueMainScript?: (context: SetupContext) => {}
}
export namespace hVue{
    /**
     * Vue側entryファイルで実行する関数<br>
     *
     * @param app Componentか、Routingを設定可能
     * @param option プラグイン追加、Vueで最初に起動するscript、マウントコンテナを設定可能
     */
    export function initVue(app: Component | RouteRecordRaw[],
                            option: ArgsOption = {}) {
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
            appElement = createApp(rootComponent(router, option.vueMainScript)).use(router)
        } else {
            appElement = createApp(app)
        }
        (option.usePlugin ? option.usePlugin(appElement) : appElement).mount(option.mountContainer ?? '#app')
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
        send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']): Promise<C[N]['rt']>{
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

function rootComponent(router: Router, main: ArgsOption['vueMainScript']): Component{
    return {
        setup(_, context){
            router.afterEach(route => {
                window.google.script.history.replace(undefined, route.query, route.path)
            })
            window.google.script.url.getLocation(location => {
                const path = location.hash ? location.hash : '/'
                const query = location.parameter
                router.replace({ path, query }).then()
            })
            if (main) main(context)
        },
        template: '<router-view />'
    }
}
