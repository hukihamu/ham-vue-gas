(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('vue-router')) :
    typeof define === 'function' && define.amd ? define(['vue', 'vue-router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueGas = factory(global.vue, global.vueRouter));
})(this, (function (vue, vueRouter) { 'use strict';

    var hCommon;
    (function (hCommon) {
        /**
         * Gasの機能「スクリプトプロパティ」をConfigとして利用する<br>
         * gasInit実行時に必須
         */
        var Config = /** @class */ (function () {
            function Config(commonConfigKeys, gasConfigKeys, vueConfigKeys) {
                var _a, _b, _c, _d;
                this.commonConfigKeys = commonConfigKeys;
                this.gasConfigKeys = gasConfigKeys;
                this.vueConfigKeys = vueConfigKeys;
                this.cache = {};
                // cache生成
                if (document) {
                    // vue
                    var content = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent;
                    if (content) {
                        this.cache = JSON.parse(content);
                    }
                }
                else {
                    // gas
                    var config = {};
                    config['debug'] = (_b = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _b !== void 0 ? _b : undefined;
                    for (var _i = 0, _e = this.commonConfigKeys; _i < _e.length; _i++) {
                        var key = _e[_i];
                        if (key === '')
                            continue;
                        config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
                    }
                    for (var _f = 0, _g = this.gasConfigKeys; _f < _g.length; _f++) {
                        var key = _g[_f];
                        if (key === '')
                            continue;
                        config[key] = (_d = PropertiesService.getScriptProperties().getProperty(key)) !== null && _d !== void 0 ? _d : undefined;
                    }
                    this.cache = config;
                }
            }
            /**
             * vueサイドでのみ利用可能
             */
            Config.prototype.getVueConfig = function (key) {
                var _a;
                var cacheResult = this.cache[key];
                if (cacheResult !== undefined) {
                    return cacheResult;
                }
                var content = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent;
                if (!content) {
                    hCommon.consoleLog.error('VueConfigが見つかりません');
                    return undefined;
                }
                if (Object.keys(JSON.parse(content)).every(function (it) { return it !== key; }))
                    hCommon.consoleLog.warn("key\"".concat(key, "\" \u306Econfig\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"));
                return JSON.parse(content)[key];
            };
            /**
             * gasサイドでのみ利用可能
             */
            Config.prototype.getGasConfig = function (key) {
                var _a;
                var cacheResult = this.cache[key];
                if (cacheResult !== undefined) {
                    return cacheResult;
                }
                if (PropertiesService.getScriptProperties().getKeys().every(function (it) { return it !== key; }))
                    hCommon.consoleLog.warn("key\"".concat(key, "\" \u306Econfig\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"));
                return (_a = PropertiesService.getScriptProperties().getProperty(key)) !== null && _a !== void 0 ? _a : undefined;
            };
            /**
             * すべてのVueConfigを取得(gasサイドでのみ利用可能)
             */
            Config.prototype.getAllVueConfig = function () {
                var _a, _b, _c;
                var config = {};
                config['debug'] = (_a = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _a !== void 0 ? _a : undefined;
                for (var _i = 0, _d = this.commonConfigKeys; _i < _d.length; _i++) {
                    var key = _d[_i];
                    if (key === '')
                        continue;
                    config[key] = (_b = PropertiesService.getScriptProperties().getProperty(key)) !== null && _b !== void 0 ? _b : undefined;
                }
                for (var _e = 0, _f = this.vueConfigKeys; _e < _f.length; _e++) {
                    var key = _f[_e];
                    if (key === '')
                        continue;
                    config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
                }
                return config;
            };
            return Config;
        }());
        hCommon.Config = Config;
        /**
         * Vue・Gas共に利用可能なLog出力
         */
        hCommon.consoleLog = {
            info: function (label, data) {
                console.info(label, data);
            },
            debug: function (label, data) {
                console.log(label, data);
            },
            warn: function (label, data) {
                console.warn(label, data);
            },
            error: function (label, data) {
                console.error(label, data);
            },
        };
    })(hCommon || (hCommon = {}));

    var hVue;
    (function (hVue) {
        /**
         * Vue側entryファイルで実行する関数<br>
         *
         * @param app Componentか、Routingを設定可能
         * @param useFunc Vueに追加するプラグインを登録するFunction. example: app => app.use(vuetify). default: app => app
         * @param mountContainer マウントするエレメント default: #app
         */
        function initVue(app, useFunc, mountContainer) {
            if (useFunc === void 0) { useFunc = function (app) { return app; }; }
            if (mountContainer === void 0) { mountContainer = '#app'; }
            hCommon.consoleLog.debug = function (label, data) {
                var _a, _b;
                var content = (_b = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
                if (JSON.parse(content)['debug'] === 'true')
                    console.log(label, data);
            };
            var appElement;
            if ('length' in app) {
                // router
                var router = vueRouter.createRouter({
                    history: vueRouter.createWebHistory(),
                    routes: app
                });
                appElement = vue.createApp(rootComponent(router)).use(router);
            }
            else {
                appElement = vue.createApp(app);
            }
            useFunc(appElement).mount(mountContainer);
        }
        hVue.initVue = initVue;
        /**
         * Vue側からGasで作成したコントローラを呼び出すクラス<br>
         * Gas側で作成したControllerInterfaceをgenerics宣言する
         */
        var GasClient = /** @class */ (function () {
            function GasClient() {
            }
            /**
             * Controllerの名前と引数を渡すと、Gasで処理をされ結果がPromiseで返却される<br>
             * ControllerInterfaceを宣言すれば、コード補完で作成している名前が確認できる
             * @param name Controller名
             * @param args Controller引数
             */
            GasClient.prototype.send = function (name, args) {
                return new Promise(function (resolve, reject) {
                    var run = google.script.run
                        .withSuccessHandler(function (it) { return resolve(JSON.parse(it)); })
                        .withFailureHandler(function (error) { return reject(error); })[name];
                    if (run) {
                        run(args);
                    }
                    else {
                        reject("not found controller: ".concat(name));
                    }
                });
            };
            return GasClient;
        }());
        hVue.GasClient = GasClient;
    })(hVue || (hVue = {}));
    function rootComponent(router) {
        return {
            setup: function () {
                router.afterEach(function (route) {
                    window.google.script.history.replace(undefined, route.query, route.path);
                });
                window.google.script.url.getLocation(function (location) {
                    var path = location.hash ? location.hash : '/';
                    var query = location.parameter;
                    router.replace({ path: path, query: query });
                });
            },
            template: '<router-view />'
        };
    }

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
    function __generator(thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g;
      return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
      }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    }

    var hGas;
    (function (hGas) {
        /**
         * Gas側entryファイルで実行する関数<br>
         * @param config インスタンス化したhCommon.Configを入力
         * @param htmlFileName htmlファイル名を設定 default: index
         * @param editHtmlOutput gasの機能で、htmlオブジェクトを編集したい際に利用(title変更など)
         */
        function initGas(config, htmlFileName, editHtmlOutput) {
            if (htmlFileName === void 0) { htmlFileName = 'index'; }
            if (editHtmlOutput === void 0) { editHtmlOutput = function (output) { return output; }; }
            hCommon.consoleLog.debug = function (label, data) {
                if (config.getGasConfig('debug') === 'true')
                    console.log(label, data);
            };
            global.doGet = function () {
                var gasHtml = HtmlService.createHtmlOutputFromFile(htmlFileName);
                gasHtml.setContent(gasHtml.getContent().replace('<body>', "<body><script type='application/json' id=\"vue-config\">".concat(JSON.stringify(config.getAllVueConfig()), "</script>")));
                return editHtmlOutput(gasHtml);
            };
            return initGasOption;
        }
        hGas.initGas = initGas;
        /**
         * スプレッドシートをテーブルとしてCRUD操作を行う<br>
         * 本abstract classをextendsして作成する<br>
         * extendsしたクラスをgasInit().useSpreadsheetDBに入力すると利用可能となる<br>
         * extendsしたクラスをインスタンス化して利用する
         */
        var SSRepository = /** @class */ (function () {
            function SSRepository() {
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
            SSRepository.prototype.importSheet = function () {
                var _a;
                var spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
                return (_a = spreadsheet.getSheetByName(this.tableName)) !== null && _a !== void 0 ? _a : undefined;
            };
            Object.defineProperty(SSRepository.prototype, "sheet", {
                get: function () {
                    var _a;
                    var throwText = function () {
                        throw 'not found GoogleAppsScript.Spreadsheet.Sheet';
                    };
                    if (!this._sheet) {
                        this._sheet = this.importSheet();
                    }
                    return (_a = this._sheet) !== null && _a !== void 0 ? _a : throwText();
                },
                enumerable: false,
                configurable: true
            });
            SSRepository.prototype.checkVersionUpdated = function () {
                return this.sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion;
            };
            SSRepository.prototype.createTable = function () {
                // DataRangeが1行より多い場合、データはあると判断
                if (this.sheet.getDataRange().getValues().length > 1) {
                    var oldVersion = this.sheet.getRange(1, 1, 1, 1).getValue();
                    var oldSheet = this.sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId));
                    var oldName = this.sheet.getName() + ' version:' + oldVersion;
                    oldSheet.setName(oldName);
                    this.sheet.clear();
                }
                // バージョン情報をセット
                this.sheet.getRange(1, 1, 1, 1).setValue(SSRepository.TABLE_VERSION_LABEL + this.tableVersion);
                //ヘッダーをセット
                this.sheet.getRange(1, 2, 1, this.columnOrder.length).setValues([this.columnOrder]);
                //初期データをインサート
                for (var _i = 0, _a = this.initData; _i < _a.length; _i++) {
                    var e = _a[_i];
                    this.insert(e);
                }
            };
            SSRepository.prototype.toStringList = function (entity) {
                var _a;
                var result = [];
                result.push(SSRepository.ROW_FUNCTION);
                for (var _i = 0, _b = this.columnOrder; _i < _b.length; _i++) {
                    var key = _b[_i];
                    var value = (_a = entity[key]) !== null && _a !== void 0 ? _a : '';
                    result.push(JSON.stringify(value));
                }
                return result;
            };
            SSRepository.prototype.toEntity = function (stringList) {
                var _a;
                var entity = {
                    row: stringList[0],
                };
                for (var i = 1; i < stringList.length; i++) {
                    var key = this.columnOrder[i - 1];
                    entity[key] = JSON.parse((_a = stringList[i]) !== null && _a !== void 0 ? _a : '');
                }
                return entity;
            };
            SSRepository.prototype.getRowRange = function (rowNumber) {
                return this.sheet.getRange(rowNumber, 1, 1, this.columnOrder.length + 1);
            };
            SSRepository.prototype.onLock = function (runningInLock) {
                if (this.lockType === 'none')
                    return runningInLock();
                var lock = this.lockType === 'user' ? LockService.getUserLock() : LockService.getScriptLock();
                try {
                    lock.waitLock(this.lockWaitMSec);
                    var result = runningInLock();
                    SpreadsheetApp.flush();
                    return result;
                }
                finally {
                    lock.releaseLock();
                }
            };
            /**
             * gasInit().useSpreadsheetDBで利用される
             */
            SSRepository.prototype.initTable = function () {
                var spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
                var sheet = spreadsheet.getSheetByName(this.tableName);
                this._sheet = sheet ? sheet : spreadsheet.insertSheet().setName(this.tableName);
                if (this.checkVersionUpdated()) {
                    this.createTable();
                }
            };
            /**
             * 挿入処理
             * @param entity 挿入するデータ。rowの有無は任意(利用せず、新規rowが付与される)
             */
            SSRepository.prototype.insert = function (entity) {
                var _this = this;
                this.onLock(function () {
                    var _a;
                    var insertRowNumber = -1;
                    var values = _this.sheet.getDataRange().getValues();
                    for (var i = 1; i < values.length; i++) {
                        if (((_a = values[i]) !== null && _a !== void 0 ? _a : [])[0] === SSRepository.DELETE_LABEL) {
                            insertRowNumber = i + 1;
                            break;
                        }
                    }
                    var insertData = _this.toStringList(entity);
                    if (insertRowNumber === -1) {
                        // 最後尾に挿入
                        _this.sheet.appendRow(insertData);
                    }
                    else {
                        // 削除行に挿入
                        _this.getRowRange(insertRowNumber).setValues([insertData]);
                    }
                });
            };
            /**
             * 全件取得(フィルターなどはJSで実施)
             */
            SSRepository.prototype.getAll = function () {
                var _this = this;
                return this.onLock(function () {
                    var values = _this.sheet.getRange(2, 1, _this.sheet.getLastRow() - 1, _this.columnOrder.length + 1).getValues();
                    var entities = [];
                    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                        var value = values_1[_i];
                        if (!value[0])
                            break;
                        if (value[0] === SSRepository.DELETE_LABEL)
                            continue;
                        entities.push(_this.toEntity(value));
                    }
                    return entities;
                });
            };
            /**
             * １件取得
             * @param row 取得するrow(rowは自動で付与され、不定一意)
             */
            SSRepository.prototype.getByRow = function (row) {
                var _this = this;
                return this.onLock(function () {
                    var _a;
                    var stringList = (_a = _this.getRowRange(row).getValues()[0]) !== null && _a !== void 0 ? _a : [];
                    return _this.toEntity(stringList);
                });
            };
            /**
             * 更新処理(上書きなため、部分変更不可)
             * @param entity 変更するデータ(row 必須)
             */
            SSRepository.prototype.update = function (entity) {
                var _this = this;
                this.onLock(function () {
                    _this.getRowRange(entity.row).setValues([_this.toStringList(entity)]);
                });
            };
            /**
             * 削除処理
             * @param row 削除するrow(rowは自動で付与され、不定一意)
             */
            SSRepository.prototype.delete = function (row) {
                var _this = this;
                this.onLock(function () {
                    var range = _this.getRowRange(row);
                    range.clear();
                    var d = new Array(_this.columnOrder.length + 1);
                    d[0] = SSRepository.DELETE_LABEL;
                    range.setValues([d]);
                });
            };
            SSRepository.TABLE_VERSION_LABEL = 'ver:';
            SSRepository.DELETE_LABEL = 'DELETE';
            SSRepository.ROW_FUNCTION = '=row()';
            return SSRepository;
        }());
        hGas.SSRepository = SSRepository;
    })(hGas || (hGas = {}));
    /**
     * gas側の機能拡張
     */
    var initGasOption = {
        useController: function (controller, initGlobal) {
            function wrapperController(name) {
                var _this = this;
                return function (args) { return __awaiter(_this, void 0, void 0, function () {
                    var returnValue, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 5, , 6]);
                                returnValue = void 0;
                                if (!(PropertiesService.getScriptProperties().getProperty('debug') === 'true')) return [3 /*break*/, 2];
                                console.log('arg: ', args);
                                return [4 /*yield*/, controller[name](args)];
                            case 1:
                                returnValue = _a.sent();
                                console.log('return: ', returnValue);
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, controller[name](args)];
                            case 3:
                                returnValue = _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/, JSON.stringify(returnValue)];
                            case 5:
                                e_1 = _a.sent();
                                hCommon.consoleLog.error('Controller error:', e_1);
                                throw e_1;
                            case 6: return [2 /*return*/];
                        }
                    });
                }); };
            }
            initGlobal(global, wrapperController);
            return initGasOption;
        },
        useSpreadsheetDB: function () {
            var repositoryList = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                repositoryList[_i] = arguments[_i];
            }
            for (var _a = 0, repositoryList_1 = repositoryList; _a < repositoryList_1.length; _a++) {
                var repository = repositoryList_1[_a];
                try {
                    new repository().initTable();
                }
                catch (e) {
                    hCommon.consoleLog.error('init spreadsheet error', e);
                }
            }
            return initGasOption;
        }
    };

    var main = {
        hVue: hVue,
        hCommon: hCommon,
        hGas: hGas
    };

    return main;

}));
