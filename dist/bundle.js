(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('vue-router')) :
    typeof define === 'function' && define.amd ? define(['vue', 'vue-router'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueGas = factory(global.vue, global.vueRouter));
})(this, (function (vue, vueRouter) { 'use strict';

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

    var consoleLog = {
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

    function initGas(config, htmlFileName, editHtmlOutput) {
        if (htmlFileName === void 0) { htmlFileName = 'index'; }
        if (editHtmlOutput === void 0) { editHtmlOutput = function (output) { return output; }; }
        consoleLog.debug = function (label, data) {
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
    function wrapperController(controller, name) {
        var _this = this;
        return function (args) { return __awaiter(_this, void 0, void 0, function () {
            var returnValue, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        returnValue = void 0;
                        if (!(PropertiesService.getScriptProperties().getProperty('debug') === 'true')) return [3, 2];
                        console.log('arg: ', args);
                        return [4, controller[name](args)];
                    case 1:
                        returnValue = _a.sent();
                        console.log('return: ', returnValue);
                        return [3, 4];
                    case 2: return [4, controller[name](args)];
                    case 3:
                        returnValue = _a.sent();
                        _a.label = 4;
                    case 4: return [2, JSON.stringify(returnValue)];
                    case 5:
                        e_1 = _a.sent();
                        consoleLog.error('Controller error:', e_1);
                        throw e_1;
                    case 6: return [2];
                }
            });
        }); };
    }
    var initGasOption = {
        useController: function (initGlobal) {
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
                    consoleLog.error('init spreadsheet error', e);
                }
            }
            return initGasOption;
        }
    };

    var Config = (function () {
        function Config(commonConfigKeys, gasConfigKeys, vueConfigKeys) {
            this.commonConfigKeys = commonConfigKeys;
            this.gasConfigKeys = gasConfigKeys;
            this.vueConfigKeys = vueConfigKeys;
        }
        Config.prototype.getVueConfig = function (key) {
            var _a;
            var content = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent;
            if (!content)
                return undefined;
            return JSON.parse(content)[key];
        };
        Config.prototype.getGasConfig = function (key) {
            var _a;
            return (_a = PropertiesService.getScriptProperties().getProperty(key)) !== null && _a !== void 0 ? _a : undefined;
        };
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
        Config.prototype.getAllGasConfig = function () {
            var _a, _b, _c;
            var config = {};
            config['debug'] = (_a = PropertiesService.getScriptProperties().getProperty('debug')) !== null && _a !== void 0 ? _a : undefined;
            for (var _i = 0, _d = this.commonConfigKeys; _i < _d.length; _i++) {
                var key = _d[_i];
                if (key === '')
                    continue;
                config[key] = (_b = PropertiesService.getScriptProperties().getProperty(key)) !== null && _b !== void 0 ? _b : undefined;
            }
            for (var _e = 0, _f = this.gasConfigKeys; _e < _f.length; _e++) {
                var key = _f[_e];
                if (key === '')
                    continue;
                config[key] = (_c = PropertiesService.getScriptProperties().getProperty(key)) !== null && _c !== void 0 ? _c : undefined;
            }
            return config;
        };
        return Config;
    }());

    var SSRepository = (function () {
        function SSRepository() {
            this.initData = [];
            this.lockType = 'user';
            this.lockWaitMSec = 10000;
        }
        Object.defineProperty(SSRepository.prototype, "sheet", {
            get: function () {
                var _a;
                var throwText = function () {
                    throw 'not found GoogleAppsScript.Spreadsheet.Sheet';
                };
                return (_a = this._sheet) !== null && _a !== void 0 ? _a : throwText();
            },
            enumerable: false,
            configurable: true
        });
        SSRepository.prototype.checkVersionUpdated = function () {
            return this.sheet.getRange(1, 1, 1, 1).getValue() !== SSRepository.TABLE_VERSION_LABEL + this.tableVersion;
        };
        SSRepository.prototype.createTable = function () {
            if (this.sheet.getDataRange().getValues().length > 1) {
                var oldVersion = this.sheet.getRange(1, 1, 1, 1).getValue();
                var oldSheet = this.sheet.copyTo(SpreadsheetApp.openById(this.spreadsheetId));
                var oldName = this.sheet.getName() + ' webpack' + oldVersion;
                oldSheet.setName(oldName);
                this.sheet.clear();
            }
            this.sheet.getRange(1, 1, 1, 1).setValue(SSRepository.TABLE_VERSION_LABEL + this.tableVersion);
            this.sheet.getRange(1, 2, 1, this.columnList.length).setValues([this.columnList]);
            for (var _i = 0, _a = this.initData; _i < _a.length; _i++) {
                var e = _a[_i];
                this.insert(e);
            }
        };
        SSRepository.prototype.toStringList = function (entity) {
            var _a;
            var result = [];
            result.push(SSRepository.ROW_FUNCTION);
            for (var _i = 0, _b = this.columnList; _i < _b.length; _i++) {
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
                var key = this.columnList[i - 1];
                entity[key] = JSON.parse((_a = stringList[i]) !== null && _a !== void 0 ? _a : '');
            }
            return entity;
        };
        SSRepository.prototype.getRowRange = function (rowNumber) {
            return this.sheet.getRange(rowNumber, 1, 1, this.columnList.length + 1);
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
        SSRepository.prototype.initTable = function () {
            var spreadsheet = SpreadsheetApp.openById(this.spreadsheetId);
            var sheet = spreadsheet.getSheetByName(this.tableName);
            this._sheet = sheet ? sheet : spreadsheet.insertSheet().setName(this.tableName);
            if (this.checkVersionUpdated()) {
                this.createTable();
            }
        };
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
                    _this.sheet.appendRow(insertData);
                }
                else {
                    _this.getRowRange(insertRowNumber).setValues([insertData]);
                }
            });
        };
        SSRepository.prototype.getAll = function () {
            var _this = this;
            return this.onLock(function () {
                var values = _this.sheet.getRange(2, 1, _this.sheet.getLastRow() - 1, _this.columnList.length + 1).getValues();
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
        SSRepository.prototype.getByRow = function (row) {
            var _this = this;
            return this.onLock(function () {
                var _a;
                var stringList = (_a = _this.getRowRange(row).getValues()[0]) !== null && _a !== void 0 ? _a : [];
                return _this.toEntity(stringList);
            });
        };
        SSRepository.prototype.update = function (entity) {
            var _this = this;
            this.onLock(function () {
                _this.getRowRange(entity.row).setValues([_this.toStringList(entity)]);
            });
        };
        SSRepository.prototype.delete = function (row) {
            var _this = this;
            this.onLock(function () {
                var range = _this.getRowRange(row);
                range.clear();
                var d = new Array(_this.columnList.length + 1);
                d[0] = SSRepository.DELETE_LABEL;
                range.setValues([d]);
            });
        };
        SSRepository.TABLE_VERSION_LABEL = 'ver:';
        SSRepository.DELETE_LABEL = 'DELETE';
        SSRepository.ROW_FUNCTION = '=row()';
        return SSRepository;
    }());

    function initVue(app, useFunc, mountContainer) {
        if (useFunc === void 0) { useFunc = function (app) { return app; }; }
        if (mountContainer === void 0) { mountContainer = '#app'; }
        consoleLog.debug = function (label, data) {
            var _a, _b;
            var content = (_b = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
            if (JSON.parse(content)['debug'] === 'true')
                console.log(label, data);
        };
        var appComponent;
        if ('length' in app) {
            var router = vueRouter.createRouter({
                history: vueRouter.createWebHistory(),
                routes: app
            });
            appComponent = rootComponent(router);
        }
        else {
            appComponent = app;
        }
        useFunc(vue.createApp(appComponent)).mount(mountContainer);
    }
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

    var GasClient = (function () {
        function GasClient() {
        }
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

    var main = {
        Config: Config,
        consoleLog: consoleLog,
        initGas: initGas,
        SSRepository: SSRepository,
        initVue: initVue,
        GasClient: GasClient
    };

    return main;

}));
