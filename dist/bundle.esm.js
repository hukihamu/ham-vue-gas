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
 * スプレッドシートをテーブルとしてCRUD操作を行う<br>
 * 本abstract classをextendsして作成する<br>
 * extendsしたクラスをgasInit().useSpreadsheetDBに入力すると利用可能となる<br>
 * extendsしたクラスをインスタンス化して利用する
 */
class SSRepository {
    constructor() {
        /**
         * テーブル作成(アップデート)時、初期にInsertされるデータ
         * @protected
         */
        this.initData = [];
        /**
         * トランザクションタイプ(LockService参照) default: user
         */
        this.lockType = 'user';
        /**
         * トランザクションロック開放を待つ時間(ミリ秒)
         */
        this.lockWaitMSec = 10000;
    }
    importSheet() {
        var _a;
        const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
        return (_a = spreadsheet.getSheetByName(this.tableName)) !== null && _a !== void 0 ? _a : undefined;
    }
    get sheet() {
        if (!this._sheet) {
            this._sheet = this.importSheet();
            if (this._sheet) {
                if (this.checkRequiredUpdate(this._sheet)) {
                    throw `not updated Sheet "${this.tableName}" gas editor run "initTables"`;
                }
                else {
                    return this._sheet;
                }
            }
            throw `not found Sheet "${this.tableName}" gas editor run "initTables"`;
        }
        else {
            return this._sheet;
        }
    }
    checkRequiredUpdate(sheet) {
        return sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion;
    }
    createTable(sheet) {
        // DataRangeが1行より多い場合、データはあると判断
        if (sheet.getDataRange().getValues().length > 1) {
            const oldVersion = sheet.getRange(1, 1, 1, 1).getValue();
            const oldSheet = sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId));
            const oldName = sheet.getName() + ' version:' + oldVersion;
            oldSheet.setName(oldName);
            sheet.clear();
        }
        // バージョン情報をセット
        sheet.getRange(1, 1, 1, 1).setValue(SSRepository.TABLE_VERSION_LABEL + this.tableVersion);
        //ヘッダーをセット
        sheet.getRange(1, 2, 1, this.columnOrder.length).setValues([this.columnOrder]);
        //初期データをインサート
        for (const e of this.initData) {
            this.insert(e);
        }
    }
    toStringList(entity) {
        var _a;
        const result = [];
        result.push(SSRepository.ROW_FUNCTION);
        for (const key of this.columnOrder) {
            const value = (_a = entity[key]) !== null && _a !== void 0 ? _a : '';
            result.push(JSON.stringify(value));
        }
        return result;
    }
    toEntity(stringList) {
        var _a;
        const entity = {
            row: stringList[0],
        };
        for (let i = 1; i < stringList.length; i++) {
            const key = this.columnOrder[i - 1];
            entity[key] = JSON.parse((_a = stringList[i]) !== null && _a !== void 0 ? _a : '');
        }
        return entity;
    }
    getRowRange(rowNumber) {
        return this.sheet.getRange(rowNumber, 1, 1, this.columnOrder.length + 1);
    }
    onLock(runningInLock) {
        if (this.lockType === 'none')
            return runningInLock();
        const lock = this.lockType === 'user' ? LockService.getUserLock() : LockService.getScriptLock();
        try {
            lock.waitLock(this.lockWaitMSec);
            const result = runningInLock();
            SpreadsheetApp.flush();
            return result;
        }
        finally {
            lock.releaseLock();
        }
    }
    /**
     * gas console上で動作させるinitTables()で利用される
     */
    initTable() {
        // シートがない場合生成する必要がある
        const spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
        const sheet = spreadsheet.getSheetByName(this.tableName);
        this._sheet = sheet ? sheet : spreadsheet.insertSheet().setName(this.tableName);
        if (this.checkRequiredUpdate(this._sheet)) {
            this.createTable(this._sheet);
        }
    }
    /**
     * 挿入処理
     * @param entity 挿入するデータ。rowの有無は任意(利用せず、新規rowが付与される)
     * @return 挿入したデータのrow
     */
    insert(entity) {
        return this.onLock(() => {
            var _a;
            CacheService.getScriptCache().remove(this.tableName);
            let insertRowNumber = -1;
            const values = this.sheet.getDataRange().getValues();
            for (let i = 1; i < values.length; i++) {
                if (((_a = values[i]) !== null && _a !== void 0 ? _a : [])[0] === SSRepository.DELETE_LABEL) {
                    insertRowNumber = i + 1;
                    break;
                }
            }
            const insertData = this.toStringList(entity);
            if (insertRowNumber === -1) {
                // 最後尾に挿入
                this.sheet.appendRow(insertData);
                return values.length + 1;
            }
            else {
                // 削除行に挿入
                this.getRowRange(insertRowNumber).setValues([insertData]);
                return insertRowNumber;
            }
        });
    }
    /**
     * 全件取得(フィルターなどはJSで実施)
     */
    getAll() {
        const cache = CacheService.getScriptCache().get(this.tableName);
        let values;
        if (cache) {
            values = JSON.parse(cache);
        }
        else {
            values = this.onLock(() => {
                const lastRow = this.sheet.getLastRow();
                if (lastRow <= 1) {
                    // 0件の場合は取得しない
                    return [];
                }
                const values = this.sheet.getRange(2, 1, this.sheet.getLastRow() - 1, this.columnOrder.length + 1).getValues();
                CacheService.getScriptCache().put(this.tableName, JSON.stringify(values), 21600);
                return values;
            });
        }
        const entities = [];
        for (const value of values) {
            if (!value[0])
                break;
            if (value[0] === SSRepository.DELETE_LABEL)
                continue;
            entities.push(this.toEntity(value));
        }
        return entities;
    }
    /**
     * １件取得
     * @param row 取得するrow(rowは自動で付与され、不定一意)
     */
    getByRow(row) {
        const cache = CacheService.getScriptCache().get(this.tableName);
        let stringList = [];
        if (cache) {
            stringList = JSON.parse(cache)[row - 2];
        }
        else {
            this.onLock(() => {
                var _a;
                stringList = (_a = this.getRowRange(row).getValues()[0]) !== null && _a !== void 0 ? _a : [];
            });
        }
        return this.toEntity(stringList);
    }
    /**
     * 更新処理(上書きなため、部分変更不可)
     * @param entity 変更するデータ(row 必須)
     */
    update(entity) {
        this.onLock(() => {
            CacheService.getScriptCache().remove(this.tableName);
            this.getRowRange(entity.row).setValues([this.toStringList(entity)]);
        });
    }
    /**
     * 削除処理
     * @param row 削除するrow(rowは自動で付与され、不定一意)
     */
    delete(row) {
        this.onLock(() => {
            CacheService.getScriptCache().remove(this.tableName);
            const range = this.getRowRange(row);
            range.clear();
            const d = new Array(this.columnOrder.length + 1);
            d[0] = SSRepository.DELETE_LABEL;
            range.setValues([d]);
        });
    }
}
SSRepository.TABLE_VERSION_LABEL = 'ver:';
SSRepository.DELETE_LABEL = 'DELETE';
SSRepository.ROW_FUNCTION = '=row()';
/**
 * SpreadsheetをDBとして利用する<br>
 * 作成したRepositoryを登録する
 */
function useSpreadsheetDB(initGlobal, ...repositoryList) {
    const initTables = () => {
        for (const repository of repositoryList) {
            try {
                consoleLog.info('create instances');
                const r = new repository();
                const name = r['tableName'];
                consoleLog.info('start', name);
                r.initTable();
                consoleLog.info('success', name);
            }
            catch (e) {
                consoleLog.error('init spreadsheet error', e);
            }
        }
    };
    const clearCacheTable = () => {
        for (const repository of repositoryList) {
            try {
                consoleLog.info('cache clear');
                const r = new repository();
                const name = r['tableName'];
                consoleLog.info('start', name);
                CacheService.getScriptCache().remove(name);
                consoleLog.info('success', name);
            }
            catch (e) {
                consoleLog.error('clear cache table error', e);
            }
        }
    };
    initGlobal(global, initTables, clearCacheTable);
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
    SSRepository: SSRepository,
    initGas: initGas,
    useGasMethod: useGasMethod,
    useSpreadsheetDB: useSpreadsheetDB
});

export { common as hCommon, gas as hGas, vue as hVue };
