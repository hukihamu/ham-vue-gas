import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
 * gasInit実行時に必須
 */
class Config {
    constructor(commonConfigKeys, gasConfigKeys, vueConfigKeys) {
        var _a, _b, _c, _d;
        this.commonConfigKeys = commonConfigKeys;
        this.gasConfigKeys = gasConfigKeys;
        this.vueConfigKeys = vueConfigKeys;
        this.cache = {};
        // cache生成
        if (globalThis.PropertiesService) {
            // gas
            let config = {};
            config['debug'] = (_a = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _a !== void 0 ? _a : undefined;
            for (const key of this.commonConfigKeys) {
                if (key === '')
                    continue;
                config[key] = (_b = PropertiesService.getScriptProperties().getProperty(key)) !== null && _b !== void 0 ? _b : undefined;
            }
            for (const key of this.gasConfigKeys) {
                if (key === '')
                    continue;
                config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
            }
            this.cache = config;
        }
        else {
            // vue
            const content = (_d = document.getElementById('vue-config')) === null || _d === void 0 ? void 0 : _d.textContent;
            if (content) {
                this.cache = JSON.parse(content);
            }
        }
    }
    /**
     * vueサイドでのみ利用可能
     */
    getVueConfig(key) {
        var _a;
        const cacheResult = this.cache[key];
        if (cacheResult !== undefined) {
            return cacheResult;
        }
        const content = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent;
        if (!content) {
            consoleLog.error('VueConfigが見つかりません');
            return undefined;
        }
        if (Object.keys(JSON.parse(content)).every(it => it !== key))
            consoleLog.warn(`key"${key}" のconfigが見つかりません`);
        return JSON.parse(content)[key];
    }
    /**
     * gasサイドでのみ利用可能
     */
    getGasConfig(key) {
        var _a;
        const cacheResult = this.cache[key];
        if (cacheResult !== undefined) {
            return cacheResult;
        }
        if (PropertiesService.getScriptProperties().getKeys().every(it => it !== key))
            consoleLog.warn(`key"${key}" のconfigが見つかりません`);
        return (_a = PropertiesService.getScriptProperties().getProperty(key)) !== null && _a !== void 0 ? _a : undefined;
    }
    /**
     * すべてのVueConfigを取得(gasサイドでのみ利用可能)
     */
    getAllVueConfig() {
        var _a, _b, _c;
        let config = {};
        config['debug'] = (_a = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _a !== void 0 ? _a : undefined;
        for (const key of this.commonConfigKeys) {
            if (key === '')
                continue;
            config[key] = (_b = PropertiesService.getScriptProperties().getProperty(key)) !== null && _b !== void 0 ? _b : undefined;
        }
        for (const key of this.vueConfigKeys) {
            if (key === '')
                continue;
            config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
        }
        return config;
    }
}
/**
 * Vue・Gas共に利用可能なLog出力
 */
const consoleLog = {
    info(label, ...data) {
        console.info(label, ...data);
    },
    debug(label, ...data) {
        console.log(label, ...data);
    },
    warn(label, ...data) {
        console.warn(label, ...data);
    },
    error(label, ...data) {
        console.error(label, ...data);
    },
};

var common = /*#__PURE__*/Object.freeze({
    __proto__: null,
    Config: Config,
    consoleLog: consoleLog
});

/**
 * Vue側entryファイルで実行する関数<br>
 *
 * @param app Componentか、Routingを設定可能
 * @param option プラグイン追加、Vueで最初に起動するscript、マウントコンテナを設定可能
 */
function initVue(app, option = {}) {
    var _a;
    consoleLog.debug = (label, data) => {
        var _a, _b;
        const content = (_b = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
        if (JSON.parse(content)['debug'] === 'true')
            console.log(label, data);
    };
    let appElement;
    if ('length' in app) {
        // router
        const router = createRouter({
            history: createWebHistory(),
            routes: app
        });
        appElement = createApp(rootComponent(router, option.vueMainScript, option.vueMainTemplate)).use(router);
    }
    else {
        appElement = createApp(app);
    }
    appElement = option.usePlugin ? option.usePlugin(appElement) : appElement;
    appElement.mount((_a = option.mountContainer) !== null && _a !== void 0 ? _a : '#app');
}
/**
 * Vue側からGasで作成したコントローラを呼び出すクラス<br>
 * Gas側で作成したGasMethodInterfaceをgenerics宣言する
 */
class GasClient {
    /**
     * GasMethodの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
     * GasMethodInterfaceを宣言すれば、コード補完で作成している名前が確認できる
     * @param name GasMethod名
     * @param args GasMethod引数
     */
    send(name, args) {
        return new Promise((resolve, reject) => {
            const run = google.script.run
                .withSuccessHandler(it => typeof it === 'string' ? resolve(JSON.parse(it)) : reject(it.e))
                .withFailureHandler(error => reject(error))[name];
            if (run) {
                run(args);
            }
            else {
                reject(`not found GasMethod: ${name} \nset "useGasMethod"`);
            }
        });
    }
}
function rootComponent(router, main, template = '<router-view />') {
    return {
        setup(_, context) {
            const userCodeAppPanel = router.beforeEach(route => {
                userCodeAppPanel();
                return route.fullPath !== '/userCodeAppPanel';
            });
            router.afterEach(route => {
                window.google.script.history.replace(undefined, route.query, route.path);
            });
            window.google.script.url.getLocation(location => {
                const path = location.hash ? location.hash : '/';
                const query = location.parameter;
                router.replace({ path, query }).then();
            });
            if (main)
                return main(context);
        },
        template
    };
}

var vue = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GasClient: GasClient,
    initVue: initVue
});

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

/**
 * Gas側entryファイルで実行する関数<br>
 * @param config インスタンス化したhCommon.Configを入力
 * @param option htmlファイル名を変更したり、htmlを変更する際に利用
 */
function initGas(config, option = {}) {
    consoleLog.debug = (label, data) => {
        if (config.getGasConfig('debug') === 'true')
            console.log(label, data);
    };
    global.doGet = () => {
        var _a;
        const gasHtml = HtmlService.createHtmlOutputFromFile((_a = option.htmlFileName) !== null && _a !== void 0 ? _a : 'index');
        gasHtml.setContent(gasHtml.getContent().replace('<body>', `<body><script type='application/json' id="vue-config">${JSON.stringify(config.getAllVueConfig())}</script>`));
        return option.editHtmlOutput ? option.editHtmlOutput(gasHtml) : gasHtml;
    };
}
/**
 * Gasで実行される関数を登録する<br>
 * 変数"global[{Method名}]"に代入することで、gasに適用される(globalでないと利用できない)<br>
 * 名前の重複は不可(あとから入れた関数に上書きされる)<br>
 * globalへ代入前に"wrapperMethod"を利用する<br>
 * GasMethodInterfaceをGenerics宣言すると、コード補完される
 */
function useGasMethod(gasMethod, initGlobal) {
    function wrapperMethod(name) {
        return (args) => __awaiter(this, void 0, void 0, function* () {
            let returnValue;
            if (PropertiesService.getScriptProperties().getProperty('debug') === 'true') {
                console.log('arg: ', args);
                returnValue = yield gasMethod[name](args);
                console.log('return: ', returnValue);
            }
            else {
                returnValue = yield gasMethod[name](args);
            }
            return JSON.stringify(returnValue);
        });
    }
    initGlobal(global, wrapperMethod);
}

var gas = /*#__PURE__*/Object.freeze({
    __proto__: null,
    initGas: initGas,
    useGasMethod: useGasMethod
});

export { common as hCommon, gas as hGas, vue as hVue };
