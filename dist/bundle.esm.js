import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

/**
 * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
 * gasInit実行時に必須
 */
class Config {
    constructor(commonConfigKeys, gasConfigKeys, vueConfigKeys) {
        var _a, _b, _c, _d, _e;
        this.commonConfigKeys = commonConfigKeys;
        this.gasConfigKeys = gasConfigKeys;
        this.vueConfigKeys = vueConfigKeys;
        this.cache = {};
        // cache生成
        if (globalThis.PropertiesService) {
            // gas
            let config = {};
            config['debug'] = (_a = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _a !== void 0 ? _a : undefined;
            config['CountUrlFetchApp'] = (_b = PropertiesService.getScriptProperties().getProperty('CountUrlFetchApp')) !== null && _b !== void 0 ? _b : '{count: 0, date: null}';
            for (const key of this.commonConfigKeys) {
                if (key === '')
                    continue;
                config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
            }
            for (const key of this.gasConfigKeys) {
                if (key === '')
                    continue;
                config[key] = (_d = PropertiesService.getScriptProperties().getProperty(key)) !== null && _d !== void 0 ? _d : undefined;
            }
            this.cache = config;
        }
        else {
            // vue
            const content = (_e = document.getElementById('vue-config')) === null || _e === void 0 ? void 0 : _e.textContent;
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
        const spreadsheet = this.spreadSheetApp.openById(this.spreadsheetId);
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
            const oldSheet = sheet.copyTo(this.spreadSheetApp.openById(this.spreadsheetId));
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
            this.spreadSheetApp.flush();
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
        const spreadsheet = this.spreadSheetApp.openById(this.spreadsheetId);
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
        let values;
        values = this.onLock(() => {
            const lastRow = this.sheet.getLastRow();
            if (lastRow <= 1) {
                // 0件の場合は取得しない
                return [];
            }
            return this.sheet.getRange(2, 1, this.sheet.getLastRow() - 1, this.columnOrder.length + 1).getValues();
        });
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
        let stringList = [];
        this.onLock(() => {
            var _a;
            stringList = (_a = this.getRowRange(row).getValues()[0]) !== null && _a !== void 0 ? _a : [];
        });
        return this.toEntity(stringList);
    }
    /**
     * 更新処理(上書きなため、部分変更不可)
     * @param entity 変更するデータ(row 必須)
     */
    update(entity) {
        this.onLock(() => {
            this.getRowRange(entity.row).setValues([this.toStringList(entity)]);
        });
    }
    /**
     * 削除処理
     * @param row 削除するrow(rowは自動で付与され、不定一意)
     */
    delete(row) {
        this.onLock(() => {
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
    initGlobal(global, initTables);
}

class NotionClient {
    constructor(urlFetchApp, authToken) {
        this._apiBaseUrl = 'https://api.notion.com/v1';
        this._urlFetchApp = urlFetchApp;
        this._authToken = authToken;
    }
    static createToken() {
        // TODO GAS Oauth2を利用する
        return '';
    }
    createHeaders() {
        return {
            Authorization: `Bearer ${this._authToken}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        };
    }
    fetch(path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this._apiBaseUrl + path;
            consoleLog.debug(url, options.payload);
            let resp = this._urlFetchApp.fetch(url, options);
            if (resp.getResponseCode() === 429) {
                yield new Promise((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 2000);
                });
                resp = this._urlFetchApp.fetch(url, options);
            }
            if (resp.getResponseCode() === 200) {
                return JSON.parse(resp.getContentText());
            }
            throw resp.getContentText();
        });
    }
    get blocks() {
        return {
            append() { },
            get() { },
            list() { },
            update() { },
            delete() { },
        };
    }
    get pages() {
        return {
            create: (body) => __awaiter(this, void 0, void 0, function* () {
                return this.fetch('/pages', {
                    headers: this.createHeaders(),
                    method: 'post',
                    payload: JSON.stringify(body),
                    muteHttpExceptions: true,
                });
            }),
            get() { },
            getProperty() { },
            updateProperty: (pageId, body) => __awaiter(this, void 0, void 0, function* () {
                return this.fetch(`/pages/${pageId}`, {
                    headers: this.createHeaders(),
                    method: 'patch',
                    payload: JSON.stringify(body),
                    muteHttpExceptions: true,
                });
            }),
            archive() { },
        };
    }
    get databases() {
        return {
            create() {
            },
            query: (databaseId, body = {}) => __awaiter(this, void 0, void 0, function* () {
                let cursor = undefined;
                let result = [];
                while (true) {
                    const payload = Object.assign(body, { start_cursor: cursor });
                    const resp = yield this.fetch(`/databases/${databaseId}/query`, {
                        headers: this.createHeaders(),
                        method: 'post',
                        payload: JSON.stringify(payload),
                        muteHttpExceptions: true,
                    });
                    result = result.concat(resp.results);
                    if (resp.has_more) {
                        cursor = resp.next_cursor;
                    }
                    else {
                        return result;
                    }
                }
            }),
            get() {
            },
            update() {
            },
            updateProperty() {
            },
        };
    }
    get users() {
        return {
            get() { },
            list() { },
            getBot() { },
        };
    }
    get comments() {
        return {
            create() { },
            get() { },
        };
    }
    get search() {
        return {
            searchByTitle() { },
        };
    }
}

function ssCache(spreadSheetApp, spreadsheetId) {
    const spreadsheet = spreadSheetApp.openById(spreadsheetId);
    const tempSheet = spreadsheet.getSheetByName('cache');
    const sheet = tempSheet ? tempSheet : spreadsheet.insertSheet().setName('cache');
    return {
        get: (rowNumber) => {
            const table = sheet.getRange(rowNumber, 1, 1, sheet.getLastColumn()).getValues();
            let text = '';
            for (const row of table) {
                for (const col of row) {
                    if (col) {
                        text += col.toString();
                    }
                    else {
                        break;
                    }
                }
            }
            return JSON.parse(text);
        },
        set: (rowNumber, data) => {
            // ※1セル50000文字制限のため、余裕を持って45000
            let json = JSON.stringify(data);
            const chunks = [];
            while (json.length > 0) {
                chunks.push(json.substring(0, 45000));
                json = json.substring(45000);
            }
            const range = sheet.getRange(rowNumber, 1, 1, chunks.length);
            range.setValues([chunks]);
        }
    };
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
/**
 * ScriptPropertiesのCountUrlFetchAppにUrlFetchAppを何回実行したかカウントする
 * 無料アカウントなら20000回まで
 * ※fetchのみラッパー済み
 */
function wrapperUrlFetchApp(urlFetchApp) {
    return {
        fetch: (url, options = {}) => {
            var _a;
            const counter = JSON.parse((_a = PropertiesService.getScriptProperties().getProperty('CountUrlFetchApp')) !== null && _a !== void 0 ? _a : '{count: 0, date: null}');
            const nowDate = new Date().toLocaleDateString('en-US');
            if (counter.date === nowDate) {
                counter.count++;
            }
            else {
                counter.count = 1;
                counter.date = nowDate;
            }
            PropertiesService.getScriptProperties().setProperty('CountUrlFetchApp', JSON.stringify(counter));
            return urlFetchApp.fetch(url, options);
        },
        fetchAll: urlFetchApp.fetchAll,
        getRequest: urlFetchApp.getRequest
    };
}

var gas = /*#__PURE__*/Object.freeze({
    __proto__: null,
    NotionClient: NotionClient,
    SSRepository: SSRepository,
    initGas: initGas,
    ssCache: ssCache,
    useGasMethod: useGasMethod,
    useSpreadsheetDB: useSpreadsheetDB,
    wrapperUrlFetchApp: wrapperUrlFetchApp
});

export { common as hCommon, gas as hGas, vue as hVue };
