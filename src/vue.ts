import {App, Component, createApp, SetupContext} from 'vue'
import {createRouter, createWebHistory, Router, RouteRecordRaw} from 'vue-router'
import * as hCommon from '@/common'

type ArgsOption = {
    usePlugin?: (app: App<Element>) => App<Element>
    mountContainer?: string
    vueMainScript?: (context: SetupContext) => any
    vueMainTemplate?: string
}
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
        appElement = createApp(rootComponent(router, option.vueMainScript, option.vueMainTemplate)).use(router)
    } else {
        appElement = createApp(app)
    }
    appElement = option.usePlugin ? option.usePlugin(appElement) : appElement
    appElement.mount(option.mountContainer ?? '#app')
}

/**
 * Vue側からGasで作成したコントローラを呼び出すクラス<br>
 * Gas側で作成したGasMethodInterfaceをgenerics宣言する
 */
export class GasClient <C extends hCommon.BaseGasMethodInterface>{
    /**
     * GasMethodの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
     * GasMethodInterfaceを宣言すれば、コード補完で作成している名前が確認できる
     * @param name GasMethod名
     * @param args GasMethod引数
     */
    send<N extends keyof C>(name: Exclude<N, ''>, args?: C[N]['at']): Promise<C[N]['rt']>{
        return new Promise((resolve, reject) => {
            const run = google.script.run
                .withSuccessHandler(it => typeof it === 'string' ? resolve(JSON.parse(it)) : reject(it.e))
                .withFailureHandler(error => reject(error))[name as string]
            if (run) {
                run(args)
            } else {
                reject(`not found GasMethod: ${name as string} \nset "useGasMethod"`)
            }
        })
    }
}

function rootComponent(router: Router, main: ArgsOption['vueMainScript'], template: string = '<router-view />'): Component{
    return {
        setup(_, context){
            const userCodeAppPanel = router.beforeEach(route => {
                userCodeAppPanel()
                return route.fullPath !== '/userCodeAppPanel'
            })
            router.afterEach(route => {
                window.google.script.history.replace(undefined, route.query, route.path)
            })
            window.google.script.url.getLocation(location => {
                const path = location.hash ? location.hash : '/'
                const query = location.parameter
                router.replace({ path, query }).then()
            })
            if (main) return main(context)
        },
        template
    }
}
