(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.VueGas = factory());
})(this, (function () { 'use strict';

  function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
      var _s,
        _e,
        _x,
        _r,
        _arr = [],
        _n = !0,
        _d = !1;
      try {
        if (_x = (_i = _i.call(arr)).next, 0 === i) {
          if (Object(_i) !== _i) return;
          _n = !1;
        } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
      } catch (err) {
        _d = !0, _e = err;
      } finally {
        try {
          if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
  }
  function _regeneratorRuntime() {
    _regeneratorRuntime = function () {
      return exports;
    };
    var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      defineProperty = Object.defineProperty || function (obj, key, desc) {
        obj[key] = desc.value;
      },
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
      return Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), obj[key];
    }
    try {
      define({}, "");
    } catch (err) {
      define = function (obj, key, value) {
        return obj[key] = value;
      };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
      return defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context)
      }), generator;
    }
    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }
    exports.wrap = wrap;
    var ContinueSentinel = {};
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }
    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);
        if ("throw" !== record.type) {
          var result = record.arg,
            value = result.value;
          return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          }) : PromiseImpl.resolve(value).then(function (unwrapped) {
            result.value = unwrapped, resolve(result);
          }, function (error) {
            return invoke("throw", error, resolve, reject);
          });
        }
        reject(record.arg);
      }
      var previousPromise;
      defineProperty(this, "_invoke", {
        value: function (method, arg) {
          function callInvokeWithMethodAndArg() {
            return new PromiseImpl(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }
          return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
      });
    }
    function makeInvokeMethod(innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");
        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }
        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;
          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);
            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }
          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);
          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }
          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }
    function maybeInvokeDelegate(delegate, context) {
      var methodName = context.method,
        method = delegate.iterator[methodName];
      if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
      var record = tryCatch(method, delegate.iterator, context.arg);
      if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
      var info = record.arg;
      return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
    }
    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };
      1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal", delete record.arg, entry.completion = record;
    }
    function Context(tryLocsList) {
      this.tryEntries = [{
        tryLoc: "root"
      }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
    }
    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];
        if (iteratorMethod) return iteratorMethod.call(iterable);
        if ("function" == typeof iterable.next) return iterable;
        if (!isNaN(iterable.length)) {
          var i = -1,
            next = function next() {
              for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
              return next.value = undefined, next.done = !0, next;
            };
          return next.next = next;
        }
      }
      return {
        next: doneResult
      };
    }
    function doneResult() {
      return {
        value: undefined,
        done: !0
      };
    }
    return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0
    }), defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0
    }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
    }, exports.mark = function (genFun) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
    }, exports.awrap = function (arg) {
      return {
        __await: arg
      };
    }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
      return this;
    }), define(Gp, "toString", function () {
      return "[object Generator]";
    }), exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return keys.reverse(), function next() {
        for (; keys.length;) {
          var key = keys.pop();
          if (key in object) return next.value = key, next.done = !1, next;
        }
        return next.done = !0, next;
      };
    }, exports.values = values, Context.prototype = {
      constructor: Context,
      reset: function (skipTempReset) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      },
      stop: function () {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function (exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally) throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function (type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
      },
      complete: function (record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
      },
      finish: function (finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
        }
      },
      catch: function (tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function (iterable, resultName, nextLoc) {
        return this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
      }
    }, exports;
  }
  function _typeof(obj) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
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

  var _PatchFlagNames, _slotFlagsText;
  /**
   * Make a map and return a function for checking if a key
   * is in that map.
   * IMPORTANT: all calls of this function must be prefixed with
   * \/\*#\_\_PURE\_\_\*\/
   * So that rollup can tree-shake them if necessary.
   */
  function makeMap(str, expectsLowerCase) {
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
      map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) {
      return !!map[val.toLowerCase()];
    } : function (val) {
      return !!map[val];
    };
  }

  /**
   * dev only flag -> name mapping
   */
  (_PatchFlagNames = {}, _defineProperty(_PatchFlagNames, 1 /* PatchFlags.TEXT */, "TEXT"), _defineProperty(_PatchFlagNames, 2 /* PatchFlags.CLASS */, "CLASS"), _defineProperty(_PatchFlagNames, 4 /* PatchFlags.STYLE */, "STYLE"), _defineProperty(_PatchFlagNames, 8 /* PatchFlags.PROPS */, "PROPS"), _defineProperty(_PatchFlagNames, 16 /* PatchFlags.FULL_PROPS */, "FULL_PROPS"), _defineProperty(_PatchFlagNames, 32 /* PatchFlags.HYDRATE_EVENTS */, "HYDRATE_EVENTS"), _defineProperty(_PatchFlagNames, 64 /* PatchFlags.STABLE_FRAGMENT */, "STABLE_FRAGMENT"), _defineProperty(_PatchFlagNames, 128 /* PatchFlags.KEYED_FRAGMENT */, "KEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 256 /* PatchFlags.UNKEYED_FRAGMENT */, "UNKEYED_FRAGMENT"), _defineProperty(_PatchFlagNames, 512 /* PatchFlags.NEED_PATCH */, "NEED_PATCH"), _defineProperty(_PatchFlagNames, 1024 /* PatchFlags.DYNAMIC_SLOTS */, "DYNAMIC_SLOTS"), _defineProperty(_PatchFlagNames, 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */, "DEV_ROOT_FRAGMENT"), _defineProperty(_PatchFlagNames, -1 /* PatchFlags.HOISTED */, "HOISTED"), _defineProperty(_PatchFlagNames, -2 /* PatchFlags.BAIL */, "BAIL"), _PatchFlagNames);

  /**
   * Dev only
   */
  (_slotFlagsText = {}, _defineProperty(_slotFlagsText, 1 /* SlotFlags.STABLE */, 'STABLE'), _defineProperty(_slotFlagsText, 2 /* SlotFlags.DYNAMIC */, 'DYNAMIC'), _defineProperty(_slotFlagsText, 3 /* SlotFlags.FORWARDED */, 'FORWARDED'), _slotFlagsText);
  function normalizeStyle(value) {
    if (isArray$1(value)) {
      var res = {};
      for (var i = 0; i < value.length; i++) {
        var item = value[i];
        var normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
        if (normalized) {
          for (var key in normalized) {
            res[key] = normalized[key];
          }
        }
      }
      return res;
    } else if (isString(value)) {
      return value;
    } else if (isObject(value)) {
      return value;
    }
  }
  var listDelimiterRE = /;(?![^(]*\))/g;
  var propertyDelimiterRE = /:([^]+)/;
  var styleCommentRE = /\/\*[\s\S]*?\*\//g;
  function parseStringStyle(cssText) {
    var ret = {};
    cssText.replace(styleCommentRE, '').split(listDelimiterRE).forEach(function (item) {
      if (item) {
        var tmp = item.split(propertyDelimiterRE);
        tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
      }
    });
    return ret;
  }
  function normalizeClass(value) {
    var res = '';
    if (isString(value)) {
      res = value;
    } else if (isArray$1(value)) {
      for (var i = 0; i < value.length; i++) {
        var normalized = normalizeClass(value[i]);
        if (normalized) {
          res += normalized + ' ';
        }
      }
    } else if (isObject(value)) {
      for (var name in value) {
        if (value[name]) {
          res += name + ' ';
        }
      }
    }
    return res.trim();
  }

  // These tag configs are shared between compiler-dom and runtime-dom, so they
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element
  var HTML_TAGS = 'html,body,base,head,link,meta,style,title,address,article,aside,footer,' + 'header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,' + 'figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,' + 'data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,' + 'time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,' + 'canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,' + 'th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,' + 'option,output,progress,select,textarea,details,dialog,menu,' + 'summary,template,blockquote,iframe,tfoot';
  // https://developer.mozilla.org/en-US/docs/Web/SVG/Element
  var SVG_TAGS = 'svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,' + 'defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,' + 'feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,' + 'feDistantLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,' + 'feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,' + 'fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,' + 'foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,' + 'mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,' + 'polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,' + 'text,textPath,title,tspan,unknown,use,view';
  /**
   * Compiler only.
   * Do NOT use in runtime code paths unless behind `(process.env.NODE_ENV !== 'production')` flag.
   */
  var isHTMLTag = /*#__PURE__*/makeMap(HTML_TAGS);
  /**
   * Compiler only.
   * Do NOT use in runtime code paths unless behind `(process.env.NODE_ENV !== 'production')` flag.
   */
  var isSVGTag = /*#__PURE__*/makeMap(SVG_TAGS);

  /**
   * On the client we only need to offer special cases for boolean attributes that
   * have different names from their corresponding dom properties:
   * - itemscope -> N/A
   * - allowfullscreen -> allowFullscreen
   * - formnovalidate -> formNoValidate
   * - ismap -> isMap
   * - nomodule -> noModule
   * - novalidate -> noValidate
   * - readonly -> readOnly
   */
  var specialBooleanAttrs = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly";
  var isSpecialBooleanAttr = /*#__PURE__*/makeMap(specialBooleanAttrs);
  /**
   * Boolean attributes should be included if the value is truthy or ''.
   * e.g. `<select multiple>` compiles to `{ multiple: '' }`
   */
  function includeBooleanAttr(value) {
    return !!value || value === '';
  }
  var EMPTY_OBJ = process.env.NODE_ENV !== 'production' ? Object.freeze({}) : {};
  var EMPTY_ARR = process.env.NODE_ENV !== 'production' ? Object.freeze([]) : [];
  var NOOP = function NOOP() {};
  /**
   * Always return false.
   */
  var NO = function NO() {
    return false;
  };
  var onRE = /^on[^a-z]/;
  var isOn = function isOn(key) {
    return onRE.test(key);
  };
  var isModelListener = function isModelListener(key) {
    return key.startsWith('onUpdate:');
  };
  var extend = Object.assign;
  var remove = function remove(arr, el) {
    var i = arr.indexOf(el);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };
  var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var hasOwn = function hasOwn(val, key) {
    return hasOwnProperty$1.call(val, key);
  };
  var isArray$1 = Array.isArray;
  var isMap = function isMap(val) {
    return toTypeString(val) === '[object Map]';
  };
  var isSet = function isSet(val) {
    return toTypeString(val) === '[object Set]';
  };
  var isFunction = function isFunction(val) {
    return typeof val === 'function';
  };
  var isString = function isString(val) {
    return typeof val === 'string';
  };
  var isSymbol = function isSymbol(val) {
    return _typeof(val) === 'symbol';
  };
  var isObject = function isObject(val) {
    return val !== null && _typeof(val) === 'object';
  };
  var isPromise = function isPromise(val) {
    return isObject(val) && isFunction(val.then) && isFunction(val["catch"]);
  };
  var objectToString = Object.prototype.toString;
  var toTypeString = function toTypeString(value) {
    return objectToString.call(value);
  };
  var toRawType = function toRawType(value) {
    // extract "RawType" from strings like "[object RawType]"
    return toTypeString(value).slice(8, -1);
  };
  var isPlainObject = function isPlainObject(val) {
    return toTypeString(val) === '[object Object]';
  };
  var isIntegerKey = function isIntegerKey(key) {
    return isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key;
  };
  var isReservedProp = /*#__PURE__*/makeMap(
  // the leading comma is intentional so empty string "" is also included
  ',key,ref,ref_for,ref_key,' + 'onVnodeBeforeMount,onVnodeMounted,' + 'onVnodeBeforeUpdate,onVnodeUpdated,' + 'onVnodeBeforeUnmount,onVnodeUnmounted');
  var isBuiltInDirective = /*#__PURE__*/makeMap('bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo');
  var cacheStringFunction = function cacheStringFunction(fn) {
    var cache = Object.create(null);
    return function (str) {
      var hit = cache[str];
      return hit || (cache[str] = fn(str));
    };
  };
  var camelizeRE = /-(\w)/g;
  /**
   * @private
   */
  var camelize = cacheStringFunction(function (str) {
    return str.replace(camelizeRE, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
  });
  var hyphenateRE = /\B([A-Z])/g;
  /**
   * @private
   */
  var hyphenate = cacheStringFunction(function (str) {
    return str.replace(hyphenateRE, '-$1').toLowerCase();
  });
  /**
   * @private
   */
  var capitalize = cacheStringFunction(function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  });
  /**
   * @private
   */
  var toHandlerKey = cacheStringFunction(function (str) {
    return str ? "on".concat(capitalize(str)) : "";
  });
  // compare whether a value has changed, accounting for NaN.
  var hasChanged = function hasChanged(value, oldValue) {
    return !Object.is(value, oldValue);
  };
  var invokeArrayFns = function invokeArrayFns(fns, arg) {
    for (var i = 0; i < fns.length; i++) {
      fns[i](arg);
    }
  };
  var def = function def(obj, key, value) {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: false,
      value: value
    });
  };
  /**
   * "123-foo" will be parsed to 123
   * This is used for the .number modifier in v-model
   */
  var looseToNumber = function looseToNumber(val) {
    var n = parseFloat(val);
    return isNaN(n) ? val : n;
  };
  var _globalThis;
  var getGlobalThis = function getGlobalThis() {
    return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
  };

  function warn$2(msg) {
    var _console;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key2 = 1; _key2 < _len; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    (_console = console).warn.apply(_console, ["[Vue warn] ".concat(msg)].concat(args));
  }
  var activeEffectScope;
  var EffectScope = /*#__PURE__*/function () {
    function EffectScope() {
      var detached = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      _classCallCheck(this, EffectScope);
      this.detached = detached;
      /**
       * @internal
       */
      this._active = true;
      /**
       * @internal
       */
      this.effects = [];
      /**
       * @internal
       */
      this.cleanups = [];
      this.parent = activeEffectScope;
      if (!detached && activeEffectScope) {
        this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
      }
    }
    _createClass(EffectScope, [{
      key: "active",
      get: function get() {
        return this._active;
      }
    }, {
      key: "run",
      value: function run(fn) {
        if (this._active) {
          var currentEffectScope = activeEffectScope;
          try {
            activeEffectScope = this;
            return fn();
          } finally {
            activeEffectScope = currentEffectScope;
          }
        } else if (process.env.NODE_ENV !== 'production') {
          warn$2("cannot run an inactive effect scope.");
        }
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
    }, {
      key: "on",
      value: function on() {
        activeEffectScope = this;
      }
      /**
       * This should only be called on non-detached scopes
       * @internal
       */
    }, {
      key: "off",
      value: function off() {
        activeEffectScope = this.parent;
      }
    }, {
      key: "stop",
      value: function stop(fromParent) {
        if (this._active) {
          var i, l;
          for (i = 0, l = this.effects.length; i < l; i++) {
            this.effects[i].stop();
          }
          for (i = 0, l = this.cleanups.length; i < l; i++) {
            this.cleanups[i]();
          }
          if (this.scopes) {
            for (i = 0, l = this.scopes.length; i < l; i++) {
              this.scopes[i].stop(true);
            }
          }
          // nested scope, dereference from parent to avoid memory leaks
          if (!this.detached && this.parent && !fromParent) {
            // optimized O(1) removal
            var last = this.parent.scopes.pop();
            if (last && last !== this) {
              this.parent.scopes[this.index] = last;
              last.index = this.index;
            }
          }
          this.parent = undefined;
          this._active = false;
        }
      }
    }]);
    return EffectScope;
  }();
  function recordEffectScope(effect) {
    var scope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : activeEffectScope;
    if (scope && scope.active) {
      scope.effects.push(effect);
    }
  }
  function getCurrentScope() {
    return activeEffectScope;
  }
  var createDep = function createDep(effects) {
    var dep = new Set(effects);
    dep.w = 0;
    dep.n = 0;
    return dep;
  };
  var wasTracked = function wasTracked(dep) {
    return (dep.w & trackOpBit) > 0;
  };
  var newTracked = function newTracked(dep) {
    return (dep.n & trackOpBit) > 0;
  };
  var initDepMarkers = function initDepMarkers(_ref) {
    var deps = _ref.deps;
    if (deps.length) {
      for (var i = 0; i < deps.length; i++) {
        deps[i].w |= trackOpBit; // set was tracked
      }
    }
  };

  var finalizeDepMarkers = function finalizeDepMarkers(effect) {
    var deps = effect.deps;
    if (deps.length) {
      var ptr = 0;
      for (var i = 0; i < deps.length; i++) {
        var dep = deps[i];
        if (wasTracked(dep) && !newTracked(dep)) {
          dep["delete"](effect);
        } else {
          deps[ptr++] = dep;
        }
        // clear bits
        dep.w &= ~trackOpBit;
        dep.n &= ~trackOpBit;
      }
      deps.length = ptr;
    }
  };
  var targetMap = new WeakMap();
  // The number of effects currently being tracked recursively.
  var effectTrackDepth = 0;
  var trackOpBit = 1;
  /**
   * The bitwise track markers support at most 30 levels of recursion.
   * This value is chosen to enable modern JS engines to use a SMI on all platforms.
   * When recursion depth is greater, fall back to using a full cleanup.
   */
  var maxMarkerBits = 30;
  var activeEffect;
  var ITERATE_KEY = Symbol(process.env.NODE_ENV !== 'production' ? 'iterate' : '');
  var MAP_KEY_ITERATE_KEY = Symbol(process.env.NODE_ENV !== 'production' ? 'Map key iterate' : '');
  var ReactiveEffect = /*#__PURE__*/function () {
    function ReactiveEffect(fn) {
      var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var scope = arguments.length > 2 ? arguments[2] : undefined;
      _classCallCheck(this, ReactiveEffect);
      this.fn = fn;
      this.scheduler = scheduler;
      this.active = true;
      this.deps = [];
      this.parent = undefined;
      recordEffectScope(this, scope);
    }
    _createClass(ReactiveEffect, [{
      key: "run",
      value: function run() {
        if (!this.active) {
          return this.fn();
        }
        var parent = activeEffect;
        var lastShouldTrack = shouldTrack;
        while (parent) {
          if (parent === this) {
            return;
          }
          parent = parent.parent;
        }
        try {
          this.parent = activeEffect;
          activeEffect = this;
          shouldTrack = true;
          trackOpBit = 1 << ++effectTrackDepth;
          if (effectTrackDepth <= maxMarkerBits) {
            initDepMarkers(this);
          } else {
            cleanupEffect(this);
          }
          return this.fn();
        } finally {
          if (effectTrackDepth <= maxMarkerBits) {
            finalizeDepMarkers(this);
          }
          trackOpBit = 1 << --effectTrackDepth;
          activeEffect = this.parent;
          shouldTrack = lastShouldTrack;
          this.parent = undefined;
          if (this.deferStop) {
            this.stop();
          }
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        // stopped while running itself - defer the cleanup
        if (activeEffect === this) {
          this.deferStop = true;
        } else if (this.active) {
          cleanupEffect(this);
          if (this.onStop) {
            this.onStop();
          }
          this.active = false;
        }
      }
    }]);
    return ReactiveEffect;
  }();
  function cleanupEffect(effect) {
    var deps = effect.deps;
    if (deps.length) {
      for (var i = 0; i < deps.length; i++) {
        deps[i]["delete"](effect);
      }
      deps.length = 0;
    }
  }
  var shouldTrack = true;
  var trackStack = [];
  function pauseTracking() {
    trackStack.push(shouldTrack);
    shouldTrack = false;
  }
  function resetTracking() {
    var last = trackStack.pop();
    shouldTrack = last === undefined ? true : last;
  }
  function track(target, type, key) {
    if (shouldTrack && activeEffect) {
      var depsMap = targetMap.get(target);
      if (!depsMap) {
        targetMap.set(target, depsMap = new Map());
      }
      var dep = depsMap.get(key);
      if (!dep) {
        depsMap.set(key, dep = createDep());
      }
      var eventInfo = process.env.NODE_ENV !== 'production' ? {
        effect: activeEffect,
        target: target,
        type: type,
        key: key
      } : undefined;
      trackEffects(dep, eventInfo);
    }
  }
  function trackEffects(dep, debuggerEventExtraInfo) {
    var shouldTrack = false;
    if (effectTrackDepth <= maxMarkerBits) {
      if (!newTracked(dep)) {
        dep.n |= trackOpBit; // set newly tracked
        shouldTrack = !wasTracked(dep);
      }
    } else {
      // Full cleanup mode.
      shouldTrack = !dep.has(activeEffect);
    }
    if (shouldTrack) {
      dep.add(activeEffect);
      activeEffect.deps.push(dep);
      if (process.env.NODE_ENV !== 'production' && activeEffect.onTrack) {
        activeEffect.onTrack(Object.assign({
          effect: activeEffect
        }, debuggerEventExtraInfo));
      }
    }
  }
  function trigger(target, type, key, newValue, oldValue, oldTarget) {
    var depsMap = targetMap.get(target);
    if (!depsMap) {
      // never been tracked
      return;
    }
    var deps = [];
    if (type === "clear" /* TriggerOpTypes.CLEAR */) {
      // collection being cleared
      // trigger all effects for target
      deps = _toConsumableArray(depsMap.values());
    } else if (key === 'length' && isArray$1(target)) {
      var newLength = Number(newValue);
      depsMap.forEach(function (dep, key) {
        if (key === 'length' || key >= newLength) {
          deps.push(dep);
        }
      });
    } else {
      // schedule runs for SET | ADD | DELETE
      if (key !== void 0) {
        deps.push(depsMap.get(key));
      }
      // also run for iteration key on ADD | DELETE | Map.SET
      switch (type) {
        case "add" /* TriggerOpTypes.ADD */:
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          } else if (isIntegerKey(key)) {
            // new index added to array -> length changes
            deps.push(depsMap.get('length'));
          }
          break;
        case "delete" /* TriggerOpTypes.DELETE */:
          if (!isArray$1(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
            if (isMap(target)) {
              deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
            }
          }
          break;
        case "set" /* TriggerOpTypes.SET */:
          if (isMap(target)) {
            deps.push(depsMap.get(ITERATE_KEY));
          }
          break;
      }
    }
    var eventInfo = process.env.NODE_ENV !== 'production' ? {
      target: target,
      type: type,
      key: key,
      newValue: newValue,
      oldValue: oldValue,
      oldTarget: oldTarget
    } : undefined;
    if (deps.length === 1) {
      if (deps[0]) {
        if (process.env.NODE_ENV !== 'production') {
          triggerEffects(deps[0], eventInfo);
        } else {
          triggerEffects(deps[0]);
        }
      }
    } else {
      var effects = [];
      var _iterator = _createForOfIteratorHelper(deps),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dep = _step.value;
          if (dep) {
            effects.push.apply(effects, _toConsumableArray(dep));
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      if (process.env.NODE_ENV !== 'production') {
        triggerEffects(createDep(effects), eventInfo);
      } else {
        triggerEffects(createDep(effects));
      }
    }
  }
  function triggerEffects(dep, debuggerEventExtraInfo) {
    // spread into array for stabilization
    var effects = isArray$1(dep) ? dep : _toConsumableArray(dep);
    var _iterator2 = _createForOfIteratorHelper(effects),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var _effect2 = _step2.value;
        if (_effect2.computed) {
          triggerEffect(_effect2, debuggerEventExtraInfo);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var _iterator3 = _createForOfIteratorHelper(effects),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _effect3 = _step3.value;
        if (!_effect3.computed) {
          triggerEffect(_effect3, debuggerEventExtraInfo);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function triggerEffect(effect, debuggerEventExtraInfo) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (process.env.NODE_ENV !== 'production' && effect.onTrigger) {
        effect.onTrigger(extend({
          effect: effect
        }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
  var isNonTrackableKeys = /*#__PURE__*/makeMap("__proto__,__v_isRef,__isVue");
  var builtInSymbols = new Set( /*#__PURE__*/
  Object.getOwnPropertyNames(Symbol)
  // ios10.x Object.getOwnPropertyNames(Symbol) can enumerate 'arguments' and 'caller'
  // but accessing them on Symbol leads to TypeError because Symbol is a strict mode
  // function
  .filter(function (key) {
    return key !== 'arguments' && key !== 'caller';
  }).map(function (key) {
    return Symbol[key];
  }).filter(isSymbol));
  var get$1 = /*#__PURE__*/createGetter();
  var shallowGet = /*#__PURE__*/createGetter(false, true);
  var readonlyGet = /*#__PURE__*/createGetter(true);
  var shallowReadonlyGet = /*#__PURE__*/createGetter(true, true);
  var arrayInstrumentations = /*#__PURE__*/createArrayInstrumentations();
  function createArrayInstrumentations() {
    var instrumentations = {};
    ['includes', 'indexOf', 'lastIndexOf'].forEach(function (key) {
      instrumentations[key] = function () {
        var arr = toRaw(this);
        for (var i = 0, l = this.length; i < l; i++) {
          track(arr, "get" /* TrackOpTypes.GET */, i + '');
        }
        // we run the method using the original args first (which may be reactive)
        for (var _len2 = arguments.length, args = new Array(_len2), _key3 = 0; _key3 < _len2; _key3++) {
          args[_key3] = arguments[_key3];
        }
        var res = arr[key].apply(arr, args);
        if (res === -1 || res === false) {
          // if that didn't work, run it again using raw values.
          return arr[key].apply(arr, _toConsumableArray(args.map(toRaw)));
        } else {
          return res;
        }
      };
    });
    ['push', 'pop', 'shift', 'unshift', 'splice'].forEach(function (key) {
      instrumentations[key] = function () {
        pauseTracking();
        for (var _len3 = arguments.length, args = new Array(_len3), _key4 = 0; _key4 < _len3; _key4++) {
          args[_key4] = arguments[_key4];
        }
        var res = toRaw(this)[key].apply(this, args);
        resetTracking();
        return res;
      };
    });
    return instrumentations;
  }
  function hasOwnProperty(key) {
    var obj = toRaw(this);
    track(obj, "has" /* TrackOpTypes.HAS */, key);
    return obj.hasOwnProperty(key);
  }
  function createGetter() {
    var isReadonly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var shallow = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return function get(target, key, receiver) {
      if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
        return !isReadonly;
      } else if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
        return isReadonly;
      } else if (key === "__v_isShallow" /* ReactiveFlags.IS_SHALLOW */) {
        return shallow;
      } else if (key === "__v_raw" /* ReactiveFlags.RAW */ && receiver === (isReadonly ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
        return target;
      }
      var targetIsArray = isArray$1(target);
      if (!isReadonly) {
        if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
          return Reflect.get(arrayInstrumentations, key, receiver);
        }
        if (key === 'hasOwnProperty') {
          return hasOwnProperty;
        }
      }
      var res = Reflect.get(target, key, receiver);
      if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
        return res;
      }
      if (!isReadonly) {
        track(target, "get" /* TrackOpTypes.GET */, key);
      }
      if (shallow) {
        return res;
      }
      if (isRef(res)) {
        // ref unwrapping - skip unwrap for Array + integer key.
        return targetIsArray && isIntegerKey(key) ? res : res.value;
      }
      if (isObject(res)) {
        // Convert returned value into a proxy as well. we do the isObject check
        // here to avoid invalid value warning. Also need to lazy access readonly
        // and reactive here to avoid circular dependency.
        return isReadonly ? readonly(res) : reactive(res);
      }
      return res;
    };
  }
  var set$1 = /*#__PURE__*/createSetter();
  var shallowSet = /*#__PURE__*/createSetter(true);
  function createSetter() {
    var shallow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    return function set(target, key, value, receiver) {
      var oldValue = target[key];
      if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
        return false;
      }
      if (!shallow) {
        if (!isShallow$1(value) && !isReadonly(value)) {
          oldValue = toRaw(oldValue);
          value = toRaw(value);
        }
        if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
          oldValue.value = value;
          return true;
        }
      }
      var hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
      var result = Reflect.set(target, key, value, receiver);
      // don't trigger if target is something up in the prototype chain of original
      if (target === toRaw(receiver)) {
        if (!hadKey) {
          trigger(target, "add" /* TriggerOpTypes.ADD */, key, value);
        } else if (hasChanged(value, oldValue)) {
          trigger(target, "set" /* TriggerOpTypes.SET */, key, value, oldValue);
        }
      }
      return result;
    };
  }
  function deleteProperty(target, key) {
    var hadKey = hasOwn(target, key);
    var oldValue = target[key];
    var result = Reflect.deleteProperty(target, key);
    if (result && hadKey) {
      trigger(target, "delete" /* TriggerOpTypes.DELETE */, key, undefined, oldValue);
    }
    return result;
  }
  function has$1(target, key) {
    var result = Reflect.has(target, key);
    if (!isSymbol(key) || !builtInSymbols.has(key)) {
      track(target, "has" /* TrackOpTypes.HAS */, key);
    }
    return result;
  }
  function ownKeys(target) {
    track(target, "iterate" /* TrackOpTypes.ITERATE */, isArray$1(target) ? 'length' : ITERATE_KEY);
    return Reflect.ownKeys(target);
  }
  var mutableHandlers = {
    get: get$1,
    set: set$1,
    deleteProperty: deleteProperty,
    has: has$1,
    ownKeys: ownKeys
  };
  var readonlyHandlers = {
    get: readonlyGet,
    set: function set(target, key) {
      if (process.env.NODE_ENV !== 'production') {
        warn$2("Set operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }
      return true;
    },
    deleteProperty: function deleteProperty(target, key) {
      if (process.env.NODE_ENV !== 'production') {
        warn$2("Delete operation on key \"".concat(String(key), "\" failed: target is readonly."), target);
      }
      return true;
    }
  };
  var shallowReactiveHandlers = /*#__PURE__*/extend({}, mutableHandlers, {
    get: shallowGet,
    set: shallowSet
  });
  // Props handlers are special in the sense that it should not unwrap top-level
  // refs (in order to allow refs to be explicitly passed down), but should
  // retain the reactivity of the normal readonly object.
  var shallowReadonlyHandlers = /*#__PURE__*/extend({}, readonlyHandlers, {
    get: shallowReadonlyGet
  });
  var toShallow = function toShallow(value) {
    return value;
  };
  var getProto = function getProto(v) {
    return Reflect.getPrototypeOf(v);
  };
  function _get(target, key) {
    var isReadonly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var isShallow = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    // #1772: readonly(reactive(Map)) should return readonly + reactive version
    // of the value
    target = target["__v_raw" /* ReactiveFlags.RAW */];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);
    if (!isReadonly) {
      if (key !== rawKey) {
        track(rawTarget, "get" /* TrackOpTypes.GET */, key);
      }
      track(rawTarget, "get" /* TrackOpTypes.GET */, rawKey);
    }
    var _getProto = getProto(rawTarget),
      has = _getProto.has;
    var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
    if (has.call(rawTarget, key)) {
      return wrap(target.get(key));
    } else if (has.call(rawTarget, rawKey)) {
      return wrap(target.get(rawKey));
    } else if (target !== rawTarget) {
      // #3602 readonly(reactive(Map))
      // ensure that the nested reactive `Map` can do tracking for itself
      target.get(key);
    }
  }
  function _has(key) {
    var isReadonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var target = this["__v_raw" /* ReactiveFlags.RAW */];
    var rawTarget = toRaw(target);
    var rawKey = toRaw(key);
    if (!isReadonly) {
      if (key !== rawKey) {
        track(rawTarget, "has" /* TrackOpTypes.HAS */, key);
      }
      track(rawTarget, "has" /* TrackOpTypes.HAS */, rawKey);
    }
    return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
  }
  function size(target) {
    var isReadonly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    target = target["__v_raw" /* ReactiveFlags.RAW */];
    !isReadonly && track(toRaw(target), "iterate" /* TrackOpTypes.ITERATE */, ITERATE_KEY);
    return Reflect.get(target, 'size', target);
  }
  function add(value) {
    value = toRaw(value);
    var target = toRaw(this);
    var proto = getProto(target);
    var hadKey = proto.has.call(target, value);
    if (!hadKey) {
      target.add(value);
      trigger(target, "add" /* TriggerOpTypes.ADD */, value, value);
    }
    return this;
  }
  function set(key, value) {
    value = toRaw(value);
    var target = toRaw(this);
    var _getProto2 = getProto(target),
      has = _getProto2.has,
      get = _getProto2.get;
    var hadKey = has.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has.call(target, key);
    } else if (process.env.NODE_ENV !== 'production') {
      checkIdentityKeys(target, has, key);
    }
    var oldValue = get.call(target, key);
    target.set(key, value);
    if (!hadKey) {
      trigger(target, "add" /* TriggerOpTypes.ADD */, key, value);
    } else if (hasChanged(value, oldValue)) {
      trigger(target, "set" /* TriggerOpTypes.SET */, key, value, oldValue);
    }
    return this;
  }
  function deleteEntry(key) {
    var target = toRaw(this);
    var _getProto3 = getProto(target),
      has = _getProto3.has,
      get = _getProto3.get;
    var hadKey = has.call(target, key);
    if (!hadKey) {
      key = toRaw(key);
      hadKey = has.call(target, key);
    } else if (process.env.NODE_ENV !== 'production') {
      checkIdentityKeys(target, has, key);
    }
    var oldValue = get ? get.call(target, key) : undefined;
    // forward the operation before queueing reactions
    var result = target["delete"](key);
    if (hadKey) {
      trigger(target, "delete" /* TriggerOpTypes.DELETE */, key, undefined, oldValue);
    }
    return result;
  }
  function clear() {
    var target = toRaw(this);
    var hadItems = target.size !== 0;
    var oldTarget = process.env.NODE_ENV !== 'production' ? isMap(target) ? new Map(target) : new Set(target) : undefined;
    // forward the operation before queueing reactions
    var result = target.clear();
    if (hadItems) {
      trigger(target, "clear" /* TriggerOpTypes.CLEAR */, undefined, undefined, oldTarget);
    }
    return result;
  }
  function createForEach(isReadonly, isShallow) {
    return function forEach(callback, thisArg) {
      var observed = this;
      var target = observed["__v_raw" /* ReactiveFlags.RAW */];
      var rawTarget = toRaw(target);
      var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate" /* TrackOpTypes.ITERATE */, ITERATE_KEY);
      return target.forEach(function (value, key) {
        // important: make sure the callback is
        // 1. invoked with the reactive map as `this` and 3rd arg
        // 2. the value received should be a corresponding reactive/readonly.
        return callback.call(thisArg, wrap(value), wrap(key), observed);
      });
    };
  }
  function createIterableMethod(method, isReadonly, isShallow) {
    return function () {
      var target = this["__v_raw" /* ReactiveFlags.RAW */];
      var rawTarget = toRaw(target);
      var targetIsMap = isMap(rawTarget);
      var isPair = method === 'entries' || method === Symbol.iterator && targetIsMap;
      var isKeyOnly = method === 'keys' && targetIsMap;
      var innerIterator = target[method].apply(target, arguments);
      var wrap = isShallow ? toShallow : isReadonly ? toReadonly : toReactive;
      !isReadonly && track(rawTarget, "iterate" /* TrackOpTypes.ITERATE */, isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
      // return a wrapped iterator which returns observed versions of the
      // values emitted from the real iterator
      return _defineProperty({
        // iterator protocol
        next: function next() {
          var _innerIterator$next = innerIterator.next(),
            value = _innerIterator$next.value,
            done = _innerIterator$next.done;
          return done ? {
            value: value,
            done: done
          } : {
            value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
            done: done
          };
        }
      }, Symbol.iterator, function () {
        return this;
      });
    };
  }
  function createReadonlyMethod(type) {
    return function () {
      if (process.env.NODE_ENV !== 'production') {
        var key = (arguments.length <= 0 ? undefined : arguments[0]) ? "on key \"".concat(arguments.length <= 0 ? undefined : arguments[0], "\" ") : "";
        console.warn("".concat(capitalize(type), " operation ").concat(key, "failed: target is readonly."), toRaw(this));
      }
      return type === "delete" /* TriggerOpTypes.DELETE */ ? false : this;
    };
  }
  function createInstrumentations() {
    var mutableInstrumentations = {
      get: function get(key) {
        return _get(this, key);
      },
      get size() {
        return size(this);
      },
      has: _has,
      add: add,
      set: set,
      "delete": deleteEntry,
      clear: clear,
      forEach: createForEach(false, false)
    };
    var shallowInstrumentations = {
      get: function get(key) {
        return _get(this, key, false, true);
      },
      get size() {
        return size(this);
      },
      has: _has,
      add: add,
      set: set,
      "delete": deleteEntry,
      clear: clear,
      forEach: createForEach(false, true)
    };
    var readonlyInstrumentations = {
      get: function get(key) {
        return _get(this, key, true);
      },
      get size() {
        return size(this, true);
      },
      has: function has(key) {
        return _has.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
      set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
      "delete": createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */),
      clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
      forEach: createForEach(true, false)
    };
    var shallowReadonlyInstrumentations = {
      get: function get(key) {
        return _get(this, key, true, true);
      },
      get size() {
        return size(this, true);
      },
      has: function has(key) {
        return _has.call(this, key, true);
      },
      add: createReadonlyMethod("add" /* TriggerOpTypes.ADD */),
      set: createReadonlyMethod("set" /* TriggerOpTypes.SET */),
      "delete": createReadonlyMethod("delete" /* TriggerOpTypes.DELETE */),
      clear: createReadonlyMethod("clear" /* TriggerOpTypes.CLEAR */),
      forEach: createForEach(true, true)
    };
    var iteratorMethods = ['keys', 'values', 'entries', Symbol.iterator];
    iteratorMethods.forEach(function (method) {
      mutableInstrumentations[method] = createIterableMethod(method, false, false);
      readonlyInstrumentations[method] = createIterableMethod(method, true, false);
      shallowInstrumentations[method] = createIterableMethod(method, false, true);
      shallowReadonlyInstrumentations[method] = createIterableMethod(method, true, true);
    });
    return [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations];
  }
  var _createInstrumentatio = /* #__PURE__*/createInstrumentations(),
    _createInstrumentatio2 = _slicedToArray(_createInstrumentatio, 4),
    mutableInstrumentations = _createInstrumentatio2[0],
    readonlyInstrumentations = _createInstrumentatio2[1],
    shallowInstrumentations = _createInstrumentatio2[2],
    shallowReadonlyInstrumentations = _createInstrumentatio2[3];
  function createInstrumentationGetter(isReadonly, shallow) {
    var instrumentations = shallow ? isReadonly ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly ? readonlyInstrumentations : mutableInstrumentations;
    return function (target, key, receiver) {
      if (key === "__v_isReactive" /* ReactiveFlags.IS_REACTIVE */) {
        return !isReadonly;
      } else if (key === "__v_isReadonly" /* ReactiveFlags.IS_READONLY */) {
        return isReadonly;
      } else if (key === "__v_raw" /* ReactiveFlags.RAW */) {
        return target;
      }
      return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
    };
  }
  var mutableCollectionHandlers = {
    get: /*#__PURE__*/createInstrumentationGetter(false, false)
  };
  var shallowCollectionHandlers = {
    get: /*#__PURE__*/createInstrumentationGetter(false, true)
  };
  var readonlyCollectionHandlers = {
    get: /*#__PURE__*/createInstrumentationGetter(true, false)
  };
  var shallowReadonlyCollectionHandlers = {
    get: /*#__PURE__*/createInstrumentationGetter(true, true)
  };
  function checkIdentityKeys(target, has, key) {
    var rawKey = toRaw(key);
    if (rawKey !== key && has.call(target, rawKey)) {
      var type = toRawType(target);
      console.warn("Reactive ".concat(type, " contains both the raw and reactive ") + "versions of the same object".concat(type === "Map" ? " as keys" : "", ", ") + "which can lead to inconsistencies. " + "Avoid differentiating between the raw and reactive versions " + "of an object and only use the reactive version if possible.");
    }
  }
  var reactiveMap = new WeakMap();
  var shallowReactiveMap = new WeakMap();
  var readonlyMap = new WeakMap();
  var shallowReadonlyMap = new WeakMap();
  function targetTypeMap(rawType) {
    switch (rawType) {
      case 'Object':
      case 'Array':
        return 1 /* TargetType.COMMON */;
      case 'Map':
      case 'Set':
      case 'WeakMap':
      case 'WeakSet':
        return 2 /* TargetType.COLLECTION */;
      default:
        return 0 /* TargetType.INVALID */;
    }
  }

  function getTargetType(value) {
    return value["__v_skip" /* ReactiveFlags.SKIP */] || !Object.isExtensible(value) ? 0 /* TargetType.INVALID */ : targetTypeMap(toRawType(value));
  }
  function reactive(target) {
    // if trying to observe a readonly proxy, return the readonly version.
    if (isReadonly(target)) {
      return target;
    }
    return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
  }
  /**
   * Return a shallowly-reactive copy of the original object, where only the root
   * level properties are reactive. It also does not auto-unwrap refs (even at the
   * root level).
   */
  function shallowReactive(target) {
    return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
  }
  /**
   * Creates a readonly copy of the original object. Note the returned copy is not
   * made reactive, but `readonly` can be called on an already reactive object.
   */
  function readonly(target) {
    return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
  }
  /**
   * Returns a reactive-copy of the original object, where only the root level
   * properties are readonly, and does NOT unwrap refs nor recursively convert
   * returned properties.
   * This is used for creating the props proxy object for stateful components.
   */
  function shallowReadonly(target) {
    return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
  }
  function createReactiveObject(target, isReadonly, baseHandlers, collectionHandlers, proxyMap) {
    if (!isObject(target)) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn("value cannot be made reactive: ".concat(String(target)));
      }
      return target;
    }
    // target is already a Proxy, return it.
    // exception: calling readonly() on a reactive object
    if (target["__v_raw" /* ReactiveFlags.RAW */] && !(isReadonly && target["__v_isReactive" /* ReactiveFlags.IS_REACTIVE */])) {
      return target;
    }
    // target already has corresponding Proxy
    var existingProxy = proxyMap.get(target);
    if (existingProxy) {
      return existingProxy;
    }
    // only specific value types can be observed.
    var targetType = getTargetType(target);
    if (targetType === 0 /* TargetType.INVALID */) {
      return target;
    }
    var proxy = new Proxy(target, targetType === 2 /* TargetType.COLLECTION */ ? collectionHandlers : baseHandlers);
    proxyMap.set(target, proxy);
    return proxy;
  }
  function isReactive(value) {
    if (isReadonly(value)) {
      return isReactive(value["__v_raw" /* ReactiveFlags.RAW */]);
    }

    return !!(value && value["__v_isReactive" /* ReactiveFlags.IS_REACTIVE */]);
  }

  function isReadonly(value) {
    return !!(value && value["__v_isReadonly" /* ReactiveFlags.IS_READONLY */]);
  }

  function isShallow$1(value) {
    return !!(value && value["__v_isShallow" /* ReactiveFlags.IS_SHALLOW */]);
  }

  function isProxy(value) {
    return isReactive(value) || isReadonly(value);
  }
  function toRaw(observed) {
    var raw = observed && observed["__v_raw" /* ReactiveFlags.RAW */];
    return raw ? toRaw(raw) : observed;
  }
  function markRaw(value) {
    def(value, "__v_skip" /* ReactiveFlags.SKIP */, true);
    return value;
  }
  var toReactive = function toReactive(value) {
    return isObject(value) ? reactive(value) : value;
  };
  var toReadonly = function toReadonly(value) {
    return isObject(value) ? readonly(value) : value;
  };
  function trackRefValue(ref) {
    if (shouldTrack && activeEffect) {
      ref = toRaw(ref);
      if (process.env.NODE_ENV !== 'production') {
        trackEffects(ref.dep || (ref.dep = createDep()), {
          target: ref,
          type: "get" /* TrackOpTypes.GET */,
          key: 'value'
        });
      } else {
        trackEffects(ref.dep || (ref.dep = createDep()));
      }
    }
  }
  function triggerRefValue(ref, newVal) {
    ref = toRaw(ref);
    var dep = ref.dep;
    if (dep) {
      if (process.env.NODE_ENV !== 'production') {
        triggerEffects(dep, {
          target: ref,
          type: "set" /* TriggerOpTypes.SET */,
          key: 'value',
          newValue: newVal
        });
      } else {
        triggerEffects(dep);
      }
    }
  }
  function isRef(r) {
    return !!(r && r.__v_isRef === true);
  }
  function ref(value) {
    return createRef(value, false);
  }
  function shallowRef(value) {
    return createRef(value, true);
  }
  function createRef(rawValue, shallow) {
    if (isRef(rawValue)) {
      return rawValue;
    }
    return new RefImpl(rawValue, shallow);
  }
  var RefImpl = /*#__PURE__*/function () {
    function RefImpl(value, __v_isShallow) {
      _classCallCheck(this, RefImpl);
      this.__v_isShallow = __v_isShallow;
      this.dep = undefined;
      this.__v_isRef = true;
      this._rawValue = __v_isShallow ? value : toRaw(value);
      this._value = __v_isShallow ? value : toReactive(value);
    }
    _createClass(RefImpl, [{
      key: "value",
      get: function get() {
        trackRefValue(this);
        return this._value;
      },
      set: function set(newVal) {
        var useDirectValue = this.__v_isShallow || isShallow$1(newVal) || isReadonly(newVal);
        newVal = useDirectValue ? newVal : toRaw(newVal);
        if (hasChanged(newVal, this._rawValue)) {
          this._rawValue = newVal;
          this._value = useDirectValue ? newVal : toReactive(newVal);
          triggerRefValue(this, newVal);
        }
      }
    }]);
    return RefImpl;
  }();
  function unref(ref) {
    return isRef(ref) ? ref.value : ref;
  }
  var shallowUnwrapHandlers = {
    get: function get(target, key, receiver) {
      return unref(Reflect.get(target, key, receiver));
    },
    set: function set(target, key, value, receiver) {
      var oldValue = target[key];
      if (isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      } else {
        return Reflect.set(target, key, value, receiver);
      }
    }
  };
  function proxyRefs(objectWithRefs) {
    return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
  }
  var _a$1;
  var ComputedRefImpl = /*#__PURE__*/function () {
    function ComputedRefImpl(getter, _setter, isReadonly, isSSR) {
      var _this2 = this;
      _classCallCheck(this, ComputedRefImpl);
      this._setter = _setter;
      this.dep = undefined;
      this.__v_isRef = true;
      this[_a$1] = false;
      this._dirty = true;
      this.effect = new ReactiveEffect(getter, function () {
        if (!_this2._dirty) {
          _this2._dirty = true;
          triggerRefValue(_this2);
        }
      });
      this.effect.computed = this;
      this.effect.active = this._cacheable = !isSSR;
      this["__v_isReadonly" /* ReactiveFlags.IS_READONLY */] = isReadonly;
    }
    _createClass(ComputedRefImpl, [{
      key: "value",
      get: function get() {
        // the computed ref may get wrapped by other proxies e.g. readonly() #3376
        var self = toRaw(this);
        trackRefValue(self);
        if (self._dirty || !self._cacheable) {
          self._dirty = false;
          self._value = self.effect.run();
        }
        return self._value;
      },
      set: function set(newValue) {
        this._setter(newValue);
      }
    }]);
    return ComputedRefImpl;
  }();
  _a$1 = "__v_isReadonly" /* ReactiveFlags.IS_READONLY */;
  function computed$1(getterOrOptions, debugOptions) {
    var isSSR = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var getter;
    var setter;
    var onlyGetter = isFunction(getterOrOptions);
    if (onlyGetter) {
      getter = getterOrOptions;
      setter = process.env.NODE_ENV !== 'production' ? function () {
        console.warn('Write operation failed: computed value is readonly');
      } : NOOP;
    } else {
      getter = getterOrOptions.get;
      setter = getterOrOptions.set;
    }
    var cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
    if (process.env.NODE_ENV !== 'production' && debugOptions && !isSSR) {
      cRef.effect.onTrack = debugOptions.onTrack;
      cRef.effect.onTrigger = debugOptions.onTrigger;
    }
    return cRef;
  }

  var _ErrorTypeStrings;
  var stack = [];
  function pushWarningContext(vnode) {
    stack.push(vnode);
  }
  function popWarningContext() {
    stack.pop();
  }
  function warn$1(msg) {
    if (!(process.env.NODE_ENV !== 'production')) return;
    // avoid props formatting or warn handler tracking deps that might be mutated
    // during patch, leading to infinite recursion.
    pauseTracking();
    var instance = stack.length ? stack[stack.length - 1].component : null;
    var appWarnHandler = instance && instance.appContext.config.warnHandler;
    var trace = getComponentTrace();
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    if (appWarnHandler) {
      callWithErrorHandling(appWarnHandler, instance, 11 /* ErrorCodes.APP_WARN_HANDLER */, [msg + args.join(''), instance && instance.proxy, trace.map(function (_ref) {
        var vnode = _ref.vnode;
        return "at <".concat(formatComponentName(instance, vnode.type), ">");
      }).join('\n'), trace]);
    } else {
      var _console;
      var warnArgs = ["[Vue warn]: ".concat(msg)].concat(args);
      /* istanbul ignore if */
      if (trace.length &&
      // avoid spamming console during tests
      !false) {
        warnArgs.push.apply(warnArgs, ["\n"].concat(_toConsumableArray(formatTrace(trace))));
      }
      (_console = console).warn.apply(_console, _toConsumableArray(warnArgs));
    }
    resetTracking();
  }
  function getComponentTrace() {
    var currentVNode = stack[stack.length - 1];
    if (!currentVNode) {
      return [];
    }
    // we can't just use the stack because it will be incomplete during updates
    // that did not start from the root. Re-construct the parent chain using
    // instance parent pointers.
    var normalizedStack = [];
    while (currentVNode) {
      var last = normalizedStack[0];
      if (last && last.vnode === currentVNode) {
        last.recurseCount++;
      } else {
        normalizedStack.push({
          vnode: currentVNode,
          recurseCount: 0
        });
      }
      var parentInstance = currentVNode.component && currentVNode.component.parent;
      currentVNode = parentInstance && parentInstance.vnode;
    }
    return normalizedStack;
  }
  /* istanbul ignore next */
  function formatTrace(trace) {
    var logs = [];
    trace.forEach(function (entry, i) {
      logs.push.apply(logs, _toConsumableArray(i === 0 ? [] : ["\n"]).concat(_toConsumableArray(formatTraceEntry(entry))));
    });
    return logs;
  }
  function formatTraceEntry(_ref2) {
    var vnode = _ref2.vnode,
      recurseCount = _ref2.recurseCount;
    var postfix = recurseCount > 0 ? "... (".concat(recurseCount, " recursive calls)") : "";
    var isRoot = vnode.component ? vnode.component.parent == null : false;
    var open = " at <".concat(formatComponentName(vnode.component, vnode.type, isRoot));
    var close = ">" + postfix;
    return vnode.props ? [open].concat(_toConsumableArray(formatProps(vnode.props)), [close]) : [open + close];
  }
  /* istanbul ignore next */
  function formatProps(props) {
    var res = [];
    var keys = Object.keys(props);
    keys.slice(0, 3).forEach(function (key) {
      res.push.apply(res, _toConsumableArray(formatProp(key, props[key])));
    });
    if (keys.length > 3) {
      res.push(" ...");
    }
    return res;
  }
  /* istanbul ignore next */
  function formatProp(key, value, raw) {
    if (isString(value)) {
      value = JSON.stringify(value);
      return raw ? value : ["".concat(key, "=").concat(value)];
    } else if (typeof value === 'number' || typeof value === 'boolean' || value == null) {
      return raw ? value : ["".concat(key, "=").concat(value)];
    } else if (isRef(value)) {
      value = formatProp(key, toRaw(value.value), true);
      return raw ? value : ["".concat(key, "=Ref<"), value, ">"];
    } else if (isFunction(value)) {
      return ["".concat(key, "=fn").concat(value.name ? "<".concat(value.name, ">") : "")];
    } else {
      value = toRaw(value);
      return raw ? value : ["".concat(key, "="), value];
    }
  }
  var ErrorTypeStrings = (_ErrorTypeStrings = {}, _defineProperty(_ErrorTypeStrings, "sp" /* LifecycleHooks.SERVER_PREFETCH */, 'serverPrefetch hook'), _defineProperty(_ErrorTypeStrings, "bc" /* LifecycleHooks.BEFORE_CREATE */, 'beforeCreate hook'), _defineProperty(_ErrorTypeStrings, "c" /* LifecycleHooks.CREATED */, 'created hook'), _defineProperty(_ErrorTypeStrings, "bm" /* LifecycleHooks.BEFORE_MOUNT */, 'beforeMount hook'), _defineProperty(_ErrorTypeStrings, "m" /* LifecycleHooks.MOUNTED */, 'mounted hook'), _defineProperty(_ErrorTypeStrings, "bu" /* LifecycleHooks.BEFORE_UPDATE */, 'beforeUpdate hook'), _defineProperty(_ErrorTypeStrings, "u" /* LifecycleHooks.UPDATED */, 'updated'), _defineProperty(_ErrorTypeStrings, "bum" /* LifecycleHooks.BEFORE_UNMOUNT */, 'beforeUnmount hook'), _defineProperty(_ErrorTypeStrings, "um" /* LifecycleHooks.UNMOUNTED */, 'unmounted hook'), _defineProperty(_ErrorTypeStrings, "a" /* LifecycleHooks.ACTIVATED */, 'activated hook'), _defineProperty(_ErrorTypeStrings, "da" /* LifecycleHooks.DEACTIVATED */, 'deactivated hook'), _defineProperty(_ErrorTypeStrings, "ec" /* LifecycleHooks.ERROR_CAPTURED */, 'errorCaptured hook'), _defineProperty(_ErrorTypeStrings, "rtc" /* LifecycleHooks.RENDER_TRACKED */, 'renderTracked hook'), _defineProperty(_ErrorTypeStrings, "rtg" /* LifecycleHooks.RENDER_TRIGGERED */, 'renderTriggered hook'), _defineProperty(_ErrorTypeStrings, 0 /* ErrorCodes.SETUP_FUNCTION */, 'setup function'), _defineProperty(_ErrorTypeStrings, 1 /* ErrorCodes.RENDER_FUNCTION */, 'render function'), _defineProperty(_ErrorTypeStrings, 2 /* ErrorCodes.WATCH_GETTER */, 'watcher getter'), _defineProperty(_ErrorTypeStrings, 3 /* ErrorCodes.WATCH_CALLBACK */, 'watcher callback'), _defineProperty(_ErrorTypeStrings, 4 /* ErrorCodes.WATCH_CLEANUP */, 'watcher cleanup function'), _defineProperty(_ErrorTypeStrings, 5 /* ErrorCodes.NATIVE_EVENT_HANDLER */, 'native event handler'), _defineProperty(_ErrorTypeStrings, 6 /* ErrorCodes.COMPONENT_EVENT_HANDLER */, 'component event handler'), _defineProperty(_ErrorTypeStrings, 7 /* ErrorCodes.VNODE_HOOK */, 'vnode hook'), _defineProperty(_ErrorTypeStrings, 8 /* ErrorCodes.DIRECTIVE_HOOK */, 'directive hook'), _defineProperty(_ErrorTypeStrings, 9 /* ErrorCodes.TRANSITION_HOOK */, 'transition hook'), _defineProperty(_ErrorTypeStrings, 10 /* ErrorCodes.APP_ERROR_HANDLER */, 'app errorHandler'), _defineProperty(_ErrorTypeStrings, 11 /* ErrorCodes.APP_WARN_HANDLER */, 'app warnHandler'), _defineProperty(_ErrorTypeStrings, 12 /* ErrorCodes.FUNCTION_REF */, 'ref function'), _defineProperty(_ErrorTypeStrings, 13 /* ErrorCodes.ASYNC_COMPONENT_LOADER */, 'async component loader'), _defineProperty(_ErrorTypeStrings, 14 /* ErrorCodes.SCHEDULER */, 'scheduler flush. This is likely a Vue internals bug. ' + 'Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core'), _ErrorTypeStrings);
  function callWithErrorHandling(fn, instance, type, args) {
    var res;
    try {
      res = args ? fn.apply(void 0, _toConsumableArray(args)) : fn();
    } catch (err) {
      handleError(err, instance, type);
    }
    return res;
  }
  function callWithAsyncErrorHandling(fn, instance, type, args) {
    if (isFunction(fn)) {
      var res = callWithErrorHandling(fn, instance, type, args);
      if (res && isPromise(res)) {
        res["catch"](function (err) {
          handleError(err, instance, type);
        });
      }
      return res;
    }
    var values = [];
    for (var i = 0; i < fn.length; i++) {
      values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
    }
    return values;
  }
  function handleError(err, instance, type) {
    var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var contextVNode = instance ? instance.vnode : null;
    if (instance) {
      var cur = instance.parent;
      // the exposed instance is the render proxy to keep it consistent with 2.x
      var exposedInstance = instance.proxy;
      // in production the hook receives only the error code
      var errorInfo = process.env.NODE_ENV !== 'production' ? ErrorTypeStrings[type] : type;
      while (cur) {
        var errorCapturedHooks = cur.ec;
        if (errorCapturedHooks) {
          for (var i = 0; i < errorCapturedHooks.length; i++) {
            if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
              return;
            }
          }
        }
        cur = cur.parent;
      }
      // app-level handling
      var appErrorHandler = instance.appContext.config.errorHandler;
      if (appErrorHandler) {
        callWithErrorHandling(appErrorHandler, null, 10 /* ErrorCodes.APP_ERROR_HANDLER */, [err, exposedInstance, errorInfo]);
        return;
      }
    }
    logError(err, type, contextVNode, throwInDev);
  }
  function logError(err, type, contextVNode) {
    var throwInDev = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    if (process.env.NODE_ENV !== 'production') {
      var info = ErrorTypeStrings[type];
      if (contextVNode) {
        pushWarningContext(contextVNode);
      }
      warn$1("Unhandled error".concat(info ? " during execution of ".concat(info) : ""));
      if (contextVNode) {
        popWarningContext();
      }
      // crash in dev by default so it's more noticeable
      if (throwInDev) {
        throw err;
      } else {
        console.error(err);
      }
    } else {
      // recover in prod to reduce the impact on end-user
      console.error(err);
    }
  }
  var isFlushing = false;
  var isFlushPending = false;
  var queue = [];
  var flushIndex = 0;
  var pendingPostFlushCbs = [];
  var activePostFlushCbs = null;
  var postFlushIndex = 0;
  var resolvedPromise = /*#__PURE__*/Promise.resolve();
  var currentFlushPromise = null;
  var RECURSION_LIMIT = 100;
  function nextTick(fn) {
    var p = currentFlushPromise || resolvedPromise;
    return fn ? p.then(this ? fn.bind(this) : fn) : p;
  }
  // #2768
  // Use binary-search to find a suitable position in the queue,
  // so that the queue maintains the increasing order of job's id,
  // which can prevent the job from being skipped and also can avoid repeated patching.
  function findInsertionIndex(id) {
    // the start index should be `flushIndex + 1`
    var start = flushIndex + 1;
    var end = queue.length;
    while (start < end) {
      var middle = start + end >>> 1;
      var middleJobId = getId(queue[middle]);
      middleJobId < id ? start = middle + 1 : end = middle;
    }
    return start;
  }
  function queueJob(job) {
    // the dedupe search uses the startIndex argument of Array.includes()
    // by default the search index includes the current job that is being run
    // so it cannot recursively trigger itself again.
    // if the job is a watch() callback, the search will start with a +1 index to
    // allow it recursively trigger itself - it is the user's responsibility to
    // ensure it doesn't end up in an infinite loop.
    if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
      if (job.id == null) {
        queue.push(job);
      } else {
        queue.splice(findInsertionIndex(job.id), 0, job);
      }
      queueFlush();
    }
  }
  function queueFlush() {
    if (!isFlushing && !isFlushPending) {
      isFlushPending = true;
      currentFlushPromise = resolvedPromise.then(flushJobs);
    }
  }
  function invalidateJob(job) {
    var i = queue.indexOf(job);
    if (i > flushIndex) {
      queue.splice(i, 1);
    }
  }
  function queuePostFlushCb(cb) {
    if (!isArray$1(cb)) {
      if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
        pendingPostFlushCbs.push(cb);
      }
    } else {
      // if cb is an array, it is a component lifecycle hook which can only be
      // triggered by a job, which is already deduped in the main queue, so
      // we can skip duplicate check here to improve perf
      pendingPostFlushCbs.push.apply(pendingPostFlushCbs, _toConsumableArray(cb));
    }
    queueFlush();
  }
  function flushPreFlushCbs(seen) {
    var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : isFlushing ? flushIndex + 1 : 0;
    if (process.env.NODE_ENV !== 'production') {
      seen = seen || new Map();
    }
    for (; i < queue.length; i++) {
      var cb = queue[i];
      if (cb && cb.pre) {
        if (process.env.NODE_ENV !== 'production' && checkRecursiveUpdates(seen, cb)) {
          continue;
        }
        queue.splice(i, 1);
        i--;
        cb();
      }
    }
  }
  function flushPostFlushCbs(seen) {
    if (pendingPostFlushCbs.length) {
      var deduped = _toConsumableArray(new Set(pendingPostFlushCbs));
      pendingPostFlushCbs.length = 0;
      // #1947 already has active queue, nested flushPostFlushCbs call
      if (activePostFlushCbs) {
        var _activePostFlushCbs;
        (_activePostFlushCbs = activePostFlushCbs).push.apply(_activePostFlushCbs, _toConsumableArray(deduped));
        return;
      }
      activePostFlushCbs = deduped;
      if (process.env.NODE_ENV !== 'production') {
        seen = seen || new Map();
      }
      activePostFlushCbs.sort(function (a, b) {
        return getId(a) - getId(b);
      });
      for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
        if (process.env.NODE_ENV !== 'production' && checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
          continue;
        }
        activePostFlushCbs[postFlushIndex]();
      }
      activePostFlushCbs = null;
      postFlushIndex = 0;
    }
  }
  var getId = function getId(job) {
    return job.id == null ? Infinity : job.id;
  };
  var comparator = function comparator(a, b) {
    var diff = getId(a) - getId(b);
    if (diff === 0) {
      if (a.pre && !b.pre) return -1;
      if (b.pre && !a.pre) return 1;
    }
    return diff;
  };
  function flushJobs(seen) {
    isFlushPending = false;
    isFlushing = true;
    if (process.env.NODE_ENV !== 'production') {
      seen = seen || new Map();
    }
    // Sort queue before flush.
    // This ensures that:
    // 1. Components are updated from parent to child. (because parent is always
    //    created before the child so its render effect will have smaller
    //    priority number)
    // 2. If a component is unmounted during a parent component's update,
    //    its update can be skipped.
    queue.sort(comparator);
    // conditional usage of checkRecursiveUpdate must be determined out of
    // try ... catch block since Rollup by default de-optimizes treeshaking
    // inside try-catch. This can leave all warning code unshaked. Although
    // they would get eventually shaken by a minifier like terser, some minifiers
    // would fail to do that (e.g. https://github.com/evanw/esbuild/issues/1610)
    var check = process.env.NODE_ENV !== 'production' ? function (job) {
      return checkRecursiveUpdates(seen, job);
    } : NOOP;
    try {
      for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
        var job = queue[flushIndex];
        if (job && job.active !== false) {
          if (process.env.NODE_ENV !== 'production' && check(job)) {
            continue;
          }
          // console.log(`running:`, job.id)
          callWithErrorHandling(job, null, 14 /* ErrorCodes.SCHEDULER */);
        }
      }
    } finally {
      flushIndex = 0;
      queue.length = 0;
      flushPostFlushCbs(seen);
      isFlushing = false;
      currentFlushPromise = null;
      // some postFlushCb queued jobs!
      // keep flushing until it drains.
      if (queue.length || pendingPostFlushCbs.length) {
        flushJobs(seen);
      }
    }
  }
  function checkRecursiveUpdates(seen, fn) {
    if (!seen.has(fn)) {
      seen.set(fn, 1);
    } else {
      var count = seen.get(fn);
      if (count > RECURSION_LIMIT) {
        var instance = fn.ownerInstance;
        var componentName = instance && getComponentName(instance.type);
        warn$1("Maximum recursive updates exceeded".concat(componentName ? " in component <".concat(componentName, ">") : "", ". ") + "This means you have a reactive effect that is mutating its own " + "dependencies and thus recursively triggering itself. Possible sources " + "include component template, render function, updated hook or " + "watcher source function.");
        return true;
      } else {
        seen.set(fn, count + 1);
      }
    }
  }

  /* eslint-disable no-restricted-globals */
  var isHmrUpdating = false;
  var hmrDirtyComponents = new Set();
  // Expose the HMR runtime on the global object
  // This makes it entirely tree-shakable without polluting the exports and makes
  // it easier to be used in toolings like vue-loader
  // Note: for a component to be eligible for HMR it also needs the __hmrId option
  // to be set so that its instances can be registered / removed.
  if (process.env.NODE_ENV !== 'production') {
    getGlobalThis().__VUE_HMR_RUNTIME__ = {
      createRecord: tryWrap(createRecord),
      rerender: tryWrap(rerender),
      reload: tryWrap(reload)
    };
  }
  var map = new Map();
  function registerHMR(instance) {
    var id = instance.type.__hmrId;
    var record = map.get(id);
    if (!record) {
      createRecord(id, instance.type);
      record = map.get(id);
    }
    record.instances.add(instance);
  }
  function unregisterHMR(instance) {
    map.get(instance.type.__hmrId).instances["delete"](instance);
  }
  function createRecord(id, initialDef) {
    if (map.has(id)) {
      return false;
    }
    map.set(id, {
      initialDef: normalizeClassComponent(initialDef),
      instances: new Set()
    });
    return true;
  }
  function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }
  function rerender(id, newRender) {
    var record = map.get(id);
    if (!record) {
      return;
    }
    // update initial record (for not-yet-rendered component)
    record.initialDef.render = newRender;
    _toConsumableArray(record.instances).forEach(function (instance) {
      if (newRender) {
        instance.render = newRender;
        normalizeClassComponent(instance.type).render = newRender;
      }
      instance.renderCache = [];
      // this flag forces child components with slot content to update
      isHmrUpdating = true;
      instance.update();
      isHmrUpdating = false;
    });
  }
  function reload(id, newComp) {
    var record = map.get(id);
    if (!record) return;
    newComp = normalizeClassComponent(newComp);
    // update initial def (for not-yet-rendered components)
    updateComponentDef(record.initialDef, newComp);
    // create a snapshot which avoids the set being mutated during updates
    var instances = _toConsumableArray(record.instances);
    var _iterator = _createForOfIteratorHelper(instances),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var instance = _step.value;
        var oldComp = normalizeClassComponent(instance.type);
        if (!hmrDirtyComponents.has(oldComp)) {
          // 1. Update existing comp definition to match new one
          if (oldComp !== record.initialDef) {
            updateComponentDef(oldComp, newComp);
          }
          // 2. mark definition dirty. This forces the renderer to replace the
          // component on patch.
          hmrDirtyComponents.add(oldComp);
        }
        // 3. invalidate options resolution cache
        instance.appContext.optionsCache["delete"](instance.type);
        // 4. actually update
        if (instance.ceReload) {
          // custom element
          hmrDirtyComponents.add(oldComp);
          instance.ceReload(newComp.styles);
          hmrDirtyComponents["delete"](oldComp);
        } else if (instance.parent) {
          // 4. Force the parent instance to re-render. This will cause all updated
          // components to be unmounted and re-mounted. Queue the update so that we
          // don't end up forcing the same parent to re-render multiple times.
          queueJob(instance.parent.update);
        } else if (instance.appContext.reload) {
          // root instance mounted via createApp() has a reload method
          instance.appContext.reload();
        } else if (typeof window !== 'undefined') {
          // root instance inside tree created via raw render(). Force reload.
          window.location.reload();
        } else {
          console.warn('[HMR] Root or manually mounted instance modified. Full reload required.');
        }
      }
      // 5. make sure to cleanup dirty hmr components after update
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    queuePostFlushCb(function () {
      var _iterator2 = _createForOfIteratorHelper(instances),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var instance = _step2.value;
          hmrDirtyComponents["delete"](normalizeClassComponent(instance.type));
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    });
  }
  function updateComponentDef(oldComp, newComp) {
    extend(oldComp, newComp);
    for (var key in oldComp) {
      if (key !== '__file' && !(key in newComp)) {
        delete oldComp[key];
      }
    }
  }
  function tryWrap(fn) {
    return function (id, arg) {
      try {
        return fn(id, arg);
      } catch (e) {
        console.error(e);
        console.warn("[HMR] Something went wrong during Vue component hot-reload. " + "Full reload required.");
      }
    };
  }
  var devtools;
  var buffer = [];
  var devtoolsNotInstalled = false;
  function emit$1(event) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      args[_key2 - 1] = arguments[_key2];
    }
    if (devtools) {
      var _devtools;
      (_devtools = devtools).emit.apply(_devtools, [event].concat(args));
    } else if (!devtoolsNotInstalled) {
      buffer.push({
        event: event,
        args: args
      });
    }
  }
  function setDevtoolsHook(hook, target) {
    var _a, _b;
    devtools = hook;
    if (devtools) {
      devtools.enabled = true;
      buffer.forEach(function (_ref3) {
        var _devtools2;
        var event = _ref3.event,
          args = _ref3.args;
        return (_devtools2 = devtools).emit.apply(_devtools2, [event].concat(_toConsumableArray(args)));
      });
      buffer = [];
    } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== 'undefined' &&
    // some envs mock window but not fully
    window.HTMLElement &&
    // also exclude jsdom
    !((_b = (_a = window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent) === null || _b === void 0 ? void 0 : _b.includes('jsdom'))) {
      var replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
      replay.push(function (newHook) {
        setDevtoolsHook(newHook, target);
      });
      // clear buffer after 3s - the user probably doesn't have devtools installed
      // at all, and keeping the buffer will cause memory leaks (#4738)
      setTimeout(function () {
        if (!devtools) {
          target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
          devtoolsNotInstalled = true;
          buffer = [];
        }
      }, 3000);
    } else {
      // non-browser env, assume not installed
      devtoolsNotInstalled = true;
      buffer = [];
    }
  }
  function devtoolsInitApp(app, version) {
    emit$1("app:init" /* DevtoolsHooks.APP_INIT */, app, version, {
      Fragment: Fragment,
      Text: Text,
      Comment: Comment,
      Static: Static
    });
  }
  function devtoolsUnmountApp(app) {
    emit$1("app:unmount" /* DevtoolsHooks.APP_UNMOUNT */, app);
  }
  var devtoolsComponentAdded = /*#__PURE__*/createDevtoolsComponentHook("component:added" /* DevtoolsHooks.COMPONENT_ADDED */);
  var devtoolsComponentUpdated = /*#__PURE__*/createDevtoolsComponentHook("component:updated" /* DevtoolsHooks.COMPONENT_UPDATED */);
  var _devtoolsComponentRemoved = /*#__PURE__*/createDevtoolsComponentHook("component:removed" /* DevtoolsHooks.COMPONENT_REMOVED */);
  var devtoolsComponentRemoved = function devtoolsComponentRemoved(component) {
    if (devtools && typeof devtools.cleanupBuffer === 'function' &&
    // remove the component if it wasn't buffered
    !devtools.cleanupBuffer(component)) {
      _devtoolsComponentRemoved(component);
    }
  };
  function createDevtoolsComponentHook(hook) {
    return function (component) {
      emit$1(hook, component.appContext.app, component.uid, component.parent ? component.parent.uid : undefined, component);
    };
  }
  var devtoolsPerfStart = /*#__PURE__*/createDevtoolsPerformanceHook("perf:start" /* DevtoolsHooks.PERFORMANCE_START */);
  var devtoolsPerfEnd = /*#__PURE__*/createDevtoolsPerformanceHook("perf:end" /* DevtoolsHooks.PERFORMANCE_END */);
  function createDevtoolsPerformanceHook(hook) {
    return function (component, type, time) {
      emit$1(hook, component.appContext.app, component.uid, component, type, time);
    };
  }
  function devtoolsComponentEmit(component, event, params) {
    emit$1("component:emit" /* DevtoolsHooks.COMPONENT_EMIT */, component.appContext.app, component, event, params);
  }
  function emit(instance, event) {
    if (instance.isUnmounted) return;
    var props = instance.vnode.props || EMPTY_OBJ;
    for (var _len3 = arguments.length, rawArgs = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      rawArgs[_key3 - 2] = arguments[_key3];
    }
    if (process.env.NODE_ENV !== 'production') {
      var emitsOptions = instance.emitsOptions,
        _instance$propsOption = _slicedToArray(instance.propsOptions, 1),
        propsOptions = _instance$propsOption[0];
      if (emitsOptions) {
        if (!(event in emitsOptions) && !false) {
          if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
            warn$1("Component emitted event \"".concat(event, "\" but it is neither declared in ") + "the emits option nor as an \"".concat(toHandlerKey(event), "\" prop."));
          }
        } else {
          var validator = emitsOptions[event];
          if (isFunction(validator)) {
            var isValid = validator.apply(void 0, rawArgs);
            if (!isValid) {
              warn$1("Invalid event arguments: event validation failed for event \"".concat(event, "\"."));
            }
          }
        }
      }
    }
    var args = rawArgs;
    var isModelListener = event.startsWith('update:');
    // for v-model update:xxx events, apply modifiers on args
    var modelArg = isModelListener && event.slice(7);
    if (modelArg && modelArg in props) {
      var modifiersKey = "".concat(modelArg === 'modelValue' ? 'model' : modelArg, "Modifiers");
      var _ref4 = props[modifiersKey] || EMPTY_OBJ,
        number = _ref4.number,
        trim = _ref4.trim;
      if (trim) {
        args = rawArgs.map(function (a) {
          return isString(a) ? a.trim() : a;
        });
      }
      if (number) {
        args = rawArgs.map(looseToNumber);
      }
    }
    if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
      devtoolsComponentEmit(instance, event, args);
    }
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
        warn$1("Event \"".concat(lowerCaseEvent, "\" is emitted in component ") + "".concat(formatComponentName(instance, instance.type), " but the handler is registered for \"").concat(event, "\". ") + "Note that HTML attributes are case-insensitive and you cannot use " + "v-on to listen to camelCase events when using in-DOM templates. " + "You should probably use \"".concat(hyphenate(event), "\" instead of \"").concat(event, "\"."));
      }
    }
    var handlerName;
    var handler = props[handlerName = toHandlerKey(event)] ||
    // also try camelCase event handler (#2249)
    props[handlerName = toHandlerKey(camelize(event))];
    // for v-model update:xxx events, also trigger kebab-case equivalent
    // for props passed via kebab-case
    if (!handler && isModelListener) {
      handler = props[handlerName = toHandlerKey(hyphenate(event))];
    }
    if (handler) {
      callWithAsyncErrorHandling(handler, instance, 6 /* ErrorCodes.COMPONENT_EVENT_HANDLER */, args);
    }
    var onceHandler = props[handlerName + "Once"];
    if (onceHandler) {
      if (!instance.emitted) {
        instance.emitted = {};
      } else if (instance.emitted[handlerName]) {
        return;
      }
      instance.emitted[handlerName] = true;
      callWithAsyncErrorHandling(onceHandler, instance, 6 /* ErrorCodes.COMPONENT_EVENT_HANDLER */, args);
    }
  }
  function normalizeEmitsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var cache = appContext.emitsCache;
    var cached = cache.get(comp);
    if (cached !== undefined) {
      return cached;
    }
    var raw = comp.emits;
    var normalized = {};
    // apply mixin/extends props
    var hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
      var extendEmits = function extendEmits(raw) {
        var normalizedFromExtend = normalizeEmitsOptions(raw, appContext, true);
        if (normalizedFromExtend) {
          hasExtends = true;
          extend(normalized, normalizedFromExtend);
        }
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendEmits);
      }
      if (comp["extends"]) {
        extendEmits(comp["extends"]);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendEmits);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, null);
      }
      return null;
    }
    if (isArray$1(raw)) {
      raw.forEach(function (key) {
        return normalized[key] = null;
      });
    } else {
      extend(normalized, raw);
    }
    if (isObject(comp)) {
      cache.set(comp, normalized);
    }
    return normalized;
  }
  // Check if an incoming prop key is a declared emit event listener.
  // e.g. With `emits: { click: null }`, props named `onClick` and `onclick` are
  // both considered matched listeners.
  function isEmitListener(options, key) {
    if (!options || !isOn(key)) {
      return false;
    }
    key = key.slice(2).replace(/Once$/, '');
    return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
  }

  /**
   * mark the current rendering instance for asset resolution (e.g.
   * resolveComponent, resolveDirective) during render
   */
  var currentRenderingInstance = null;
  var currentScopeId = null;
  /**
   * Note: rendering calls maybe nested. The function returns the parent rendering
   * instance if present, which should be restored after the render is done:
   *
   * ```js
   * const prev = setCurrentRenderingInstance(i)
   * // ...render
   * setCurrentRenderingInstance(prev)
   * ```
   */
  function setCurrentRenderingInstance(instance) {
    var prev = currentRenderingInstance;
    currentRenderingInstance = instance;
    currentScopeId = instance && instance.type.__scopeId || null;
    return prev;
  }
  /**
   * Wrap a slot function to memoize current rendering instance
   * @private compiler helper
   */
  function withCtx(fn) {
    var ctx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentRenderingInstance;
    if (!ctx) return fn;
    // already normalized
    if (fn._n) {
      return fn;
    }
    var renderFnWithContext = function renderFnWithContext() {
      // If a user calls a compiled slot inside a template expression (#1745), it
      // can mess up block tracking, so by default we disable block tracking and
      // force bail out when invoking a compiled slot (indicated by the ._d flag).
      // This isn't necessary if rendering a compiled `<slot>`, so we flip the
      // ._d flag off when invoking the wrapped fn inside `renderSlot`.
      if (renderFnWithContext._d) {
        setBlockTracking(-1);
      }
      var prevInstance = setCurrentRenderingInstance(ctx);
      var res;
      try {
        res = fn.apply(void 0, arguments);
      } finally {
        setCurrentRenderingInstance(prevInstance);
        if (renderFnWithContext._d) {
          setBlockTracking(1);
        }
      }
      if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
        devtoolsComponentUpdated(ctx);
      }
      return res;
    };
    // mark normalized to avoid duplicated wrapping
    renderFnWithContext._n = true;
    // mark this as compiled by default
    // this is used in vnode.ts -> normalizeChildren() to set the slot
    // rendering flag.
    renderFnWithContext._c = true;
    // disable block tracking by default
    renderFnWithContext._d = true;
    return renderFnWithContext;
  }

  /**
   * dev only flag to track whether $attrs was used during render.
   * If $attrs was used during render then the warning for failed attrs
   * fallthrough can be suppressed.
   */
  var accessedAttrs = false;
  function markAttrsAccessed() {
    accessedAttrs = true;
  }
  function renderComponentRoot(instance) {
    var Component = instance.type,
      vnode = instance.vnode,
      proxy = instance.proxy,
      withProxy = instance.withProxy,
      props = instance.props,
      _instance$propsOption2 = _slicedToArray(instance.propsOptions, 1),
      propsOptions = _instance$propsOption2[0],
      slots = instance.slots,
      attrs = instance.attrs,
      emit = instance.emit,
      render = instance.render,
      renderCache = instance.renderCache,
      data = instance.data,
      setupState = instance.setupState,
      ctx = instance.ctx,
      inheritAttrs = instance.inheritAttrs;
    var result;
    var fallthroughAttrs;
    var prev = setCurrentRenderingInstance(instance);
    if (process.env.NODE_ENV !== 'production') {
      accessedAttrs = false;
    }
    try {
      if (vnode.shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */) {
        // withProxy is a proxy with a different `has` trap only for
        // runtime-compiled render functions using `with` block.
        var proxyToUse = withProxy || proxy;
        result = normalizeVNode(render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx));
        fallthroughAttrs = attrs;
      } else {
        // functional
        var _render = Component;
        // in dev, mark attrs accessed if optional props (attrs === props)
        if (process.env.NODE_ENV !== 'production' && attrs === props) {
          markAttrsAccessed();
        }
        result = normalizeVNode(_render.length > 1 ? _render(props, process.env.NODE_ENV !== 'production' ? {
          get attrs() {
            markAttrsAccessed();
            return attrs;
          },
          slots: slots,
          emit: emit
        } : {
          attrs: attrs,
          slots: slots,
          emit: emit
        }) : _render(props, null /* we know it doesn't need it */));
        fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
      }
    } catch (err) {
      handleError(err, instance, 1 /* ErrorCodes.RENDER_FUNCTION */);
      result = createVNode(Comment);
    }
    // attr merging
    // in dev mode, comments are preserved, and it's possible for a template
    // to have comments along side the root element which makes it a fragment
    var root = result;
    var setRoot = undefined;
    if (process.env.NODE_ENV !== 'production' && result.patchFlag > 0 && result.patchFlag & 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */) {
      var _getChildRoot = getChildRoot(result);
      var _getChildRoot2 = _slicedToArray(_getChildRoot, 2);
      root = _getChildRoot2[0];
      setRoot = _getChildRoot2[1];
    }
    if (fallthroughAttrs && inheritAttrs !== false) {
      var keys = Object.keys(fallthroughAttrs);
      var _root = root,
        shapeFlag = _root.shapeFlag;
      if (keys.length) {
        if (shapeFlag & (1 /* ShapeFlags.ELEMENT */ | 6 /* ShapeFlags.COMPONENT */)) {
          if (propsOptions && keys.some(isModelListener)) {
            // If a v-model listener (onUpdate:xxx) has a corresponding declared
            // prop, it indicates this component expects to handle v-model and
            // it should not fallthrough.
            // related: #1543, #1643, #1989
            fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
          }
          root = cloneVNode(root, fallthroughAttrs);
        } else if (process.env.NODE_ENV !== 'production' && !accessedAttrs && root.type !== Comment) {
          var allAttrs = Object.keys(attrs);
          var eventAttrs = [];
          var extraAttrs = [];
          for (var i = 0, l = allAttrs.length; i < l; i++) {
            var key = allAttrs[i];
            if (isOn(key)) {
              // ignore v-model handlers when they fail to fallthrough
              if (!isModelListener(key)) {
                // remove `on`, lowercase first letter to reflect event casing
                // accurately
                eventAttrs.push(key[2].toLowerCase() + key.slice(3));
              }
            } else {
              extraAttrs.push(key);
            }
          }
          if (extraAttrs.length) {
            warn$1("Extraneous non-props attributes (" + "".concat(extraAttrs.join(', '), ") ") + "were passed to component but could not be automatically inherited " + "because component renders fragment or text root nodes.");
          }
          if (eventAttrs.length) {
            warn$1("Extraneous non-emits event listeners (" + "".concat(eventAttrs.join(', '), ") ") + "were passed to component but could not be automatically inherited " + "because component renders fragment or text root nodes. " + "If the listener is intended to be a component custom event listener only, " + "declare it using the \"emits\" option.");
          }
        }
      }
    }
    // inherit directives
    if (vnode.dirs) {
      if (process.env.NODE_ENV !== 'production' && !isElementRoot(root)) {
        warn$1("Runtime directive used on component with non-element root node. " + "The directives will not function as intended.");
      }
      // clone before mutating since the root may be a hoisted vnode
      root = cloneVNode(root);
      root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
    }
    // inherit transition data
    if (vnode.transition) {
      if (process.env.NODE_ENV !== 'production' && !isElementRoot(root)) {
        warn$1("Component inside <Transition> renders non-element root node " + "that cannot be animated.");
      }
      root.transition = vnode.transition;
    }
    if (process.env.NODE_ENV !== 'production' && setRoot) {
      setRoot(root);
    } else {
      result = root;
    }
    setCurrentRenderingInstance(prev);
    return result;
  }
  /**
   * dev only
   * In dev mode, template root level comments are rendered, which turns the
   * template into a fragment root, but we need to locate the single element
   * root for attrs and scope id processing.
   */
  var getChildRoot = function getChildRoot(vnode) {
    var rawChildren = vnode.children;
    var dynamicChildren = vnode.dynamicChildren;
    var childRoot = filterSingleRoot(rawChildren);
    if (!childRoot) {
      return [vnode, undefined];
    }
    var index = rawChildren.indexOf(childRoot);
    var dynamicIndex = dynamicChildren ? dynamicChildren.indexOf(childRoot) : -1;
    var setRoot = function setRoot(updatedRoot) {
      rawChildren[index] = updatedRoot;
      if (dynamicChildren) {
        if (dynamicIndex > -1) {
          dynamicChildren[dynamicIndex] = updatedRoot;
        } else if (updatedRoot.patchFlag > 0) {
          vnode.dynamicChildren = [].concat(_toConsumableArray(dynamicChildren), [updatedRoot]);
        }
      }
    };
    return [normalizeVNode(childRoot), setRoot];
  };
  function filterSingleRoot(children) {
    var singleRoot;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (isVNode(child)) {
        // ignore user comment
        if (child.type !== Comment || child.children === 'v-if') {
          if (singleRoot) {
            // has more than 1 non-comment child, return now
            return;
          } else {
            singleRoot = child;
          }
        }
      } else {
        return;
      }
    }
    return singleRoot;
  }
  var getFunctionalFallthrough = function getFunctionalFallthrough(attrs) {
    var res;
    for (var key in attrs) {
      if (key === 'class' || key === 'style' || isOn(key)) {
        (res || (res = {}))[key] = attrs[key];
      }
    }
    return res;
  };
  var filterModelListeners = function filterModelListeners(attrs, props) {
    var res = {};
    for (var key in attrs) {
      if (!isModelListener(key) || !(key.slice(9) in props)) {
        res[key] = attrs[key];
      }
    }
    return res;
  };
  var isElementRoot = function isElementRoot(vnode) {
    return vnode.shapeFlag & (6 /* ShapeFlags.COMPONENT */ | 1 /* ShapeFlags.ELEMENT */) || vnode.type === Comment // potential v-if branch switch
    ;
  };

  function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
    var prevProps = prevVNode.props,
      prevChildren = prevVNode.children,
      component = prevVNode.component;
    var nextProps = nextVNode.props,
      nextChildren = nextVNode.children,
      patchFlag = nextVNode.patchFlag;
    var emits = component.emitsOptions;
    // Parent component's render function was hot-updated. Since this may have
    // caused the child component's slots content to have changed, we need to
    // force the child to update as well.
    if (process.env.NODE_ENV !== 'production' && (prevChildren || nextChildren) && isHmrUpdating) {
      return true;
    }
    // force child update for runtime directive or transition on component vnode.
    if (nextVNode.dirs || nextVNode.transition) {
      return true;
    }
    if (optimized && patchFlag >= 0) {
      if (patchFlag & 1024 /* PatchFlags.DYNAMIC_SLOTS */) {
        // slot content that references values that might have changed,
        // e.g. in a v-for
        return true;
      }
      if (patchFlag & 16 /* PatchFlags.FULL_PROPS */) {
        if (!prevProps) {
          return !!nextProps;
        }
        // presence of this flag indicates props are always non-null
        return hasPropsChanged(prevProps, nextProps, emits);
      } else if (patchFlag & 8 /* PatchFlags.PROPS */) {
        var dynamicProps = nextVNode.dynamicProps;
        for (var i = 0; i < dynamicProps.length; i++) {
          var key = dynamicProps[i];
          if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
            return true;
          }
        }
      }
    } else {
      // this path is only taken by manually written render functions
      // so presence of any children leads to a forced update
      if (prevChildren || nextChildren) {
        if (!nextChildren || !nextChildren.$stable) {
          return true;
        }
      }
      if (prevProps === nextProps) {
        return false;
      }
      if (!prevProps) {
        return !!nextProps;
      }
      if (!nextProps) {
        return true;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    }
    return false;
  }
  function hasPropsChanged(prevProps, nextProps, emitsOptions) {
    var nextKeys = Object.keys(nextProps);
    if (nextKeys.length !== Object.keys(prevProps).length) {
      return true;
    }
    for (var i = 0; i < nextKeys.length; i++) {
      var key = nextKeys[i];
      if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
        return true;
      }
    }
    return false;
  }
  function updateHOCHostEl(_ref5, el // HostNode
  ) {
    var vnode = _ref5.vnode,
      parent = _ref5.parent;
    while (parent && parent.subTree === vnode) {
      (vnode = parent.vnode).el = el;
      parent = parent.parent;
    }
  }
  var isSuspense = function isSuspense(type) {
    return type.__isSuspense;
  };
  function queueEffectWithSuspense(fn, suspense) {
    if (suspense && suspense.pendingBranch) {
      if (isArray$1(fn)) {
        var _suspense$effects;
        (_suspense$effects = suspense.effects).push.apply(_suspense$effects, _toConsumableArray(fn));
      } else {
        suspense.effects.push(fn);
      }
    } else {
      queuePostFlushCb(fn);
    }
  }
  function provide(key, value) {
    if (!currentInstance) {
      if (process.env.NODE_ENV !== 'production') {
        warn$1("provide() can only be used inside setup().");
      }
    } else {
      var provides = currentInstance.provides;
      // by default an instance inherits its parent's provides object
      // but when it needs to provide values of its own, it creates its
      // own provides object using parent provides object as prototype.
      // this way in `inject` we can simply look up injections from direct
      // parent and let the prototype chain do the work.
      var parentProvides = currentInstance.parent && currentInstance.parent.provides;
      if (parentProvides === provides) {
        provides = currentInstance.provides = Object.create(parentProvides);
      }
      // TS doesn't allow symbol as index type
      provides[key] = value;
    }
  }
  function inject(key, defaultValue) {
    var treatDefaultAsFactory = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // fallback to `currentRenderingInstance` so that this can be called in
    // a functional component
    var instance = currentInstance || currentRenderingInstance;
    if (instance) {
      // #2400
      // to support `app.use` plugins,
      // fallback to appContext's `provides` if the instance is at root
      var provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
      if (provides && key in provides) {
        // TS doesn't allow symbol as index type
        return provides[key];
      } else if (arguments.length > 1) {
        return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
      } else if (process.env.NODE_ENV !== 'production') {
        warn$1("injection \"".concat(String(key), "\" not found."));
      }
    } else if (process.env.NODE_ENV !== 'production') {
      warn$1("inject() can only be used inside setup() or functional components.");
    }
  }

  // Simple effect.
  function watchEffect(effect, options) {
    return doWatch(effect, null, options);
  }
  // initial value for watchers to trigger on undefined initial values
  var INITIAL_WATCHER_VALUE = {};
  // implementation
  function watch(source, cb, options) {
    if (process.env.NODE_ENV !== 'production' && !isFunction(cb)) {
      warn$1("`watch(fn, options?)` signature has been moved to a separate API. " + "Use `watchEffect(fn, options?)` instead. `watch` now only " + "supports `watch(source, cb, options?) signature.");
    }
    return doWatch(source, cb, options);
  }
  function doWatch(source, cb) {
    var _ref7 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJ,
      immediate = _ref7.immediate,
      deep = _ref7.deep,
      flush = _ref7.flush,
      onTrack = _ref7.onTrack,
      onTrigger = _ref7.onTrigger;
    if (process.env.NODE_ENV !== 'production' && !cb) {
      if (immediate !== undefined) {
        warn$1("watch() \"immediate\" option is only respected when using the " + "watch(source, callback, options?) signature.");
      }
      if (deep !== undefined) {
        warn$1("watch() \"deep\" option is only respected when using the " + "watch(source, callback, options?) signature.");
      }
    }
    var warnInvalidSource = function warnInvalidSource(s) {
      warn$1("Invalid watch source: ", s, "A watch source can only be a getter/effect function, a ref, " + "a reactive object, or an array of these types.");
    };
    var instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
    // const instance = currentInstance
    var getter;
    var forceTrigger = false;
    var isMultiSource = false;
    if (isRef(source)) {
      getter = function getter() {
        return source.value;
      };
      forceTrigger = isShallow$1(source);
    } else if (isReactive(source)) {
      getter = function getter() {
        return source;
      };
      deep = true;
    } else if (isArray$1(source)) {
      isMultiSource = true;
      forceTrigger = source.some(function (s) {
        return isReactive(s) || isShallow$1(s);
      });
      getter = function getter() {
        return source.map(function (s) {
          if (isRef(s)) {
            return s.value;
          } else if (isReactive(s)) {
            return traverse(s);
          } else if (isFunction(s)) {
            return callWithErrorHandling(s, instance, 2 /* ErrorCodes.WATCH_GETTER */);
          } else {
            process.env.NODE_ENV !== 'production' && warnInvalidSource(s);
          }
        });
      };
    } else if (isFunction(source)) {
      if (cb) {
        // getter with cb
        getter = function getter() {
          return callWithErrorHandling(source, instance, 2 /* ErrorCodes.WATCH_GETTER */);
        };
      } else {
        // no cb -> simple effect
        getter = function getter() {
          if (instance && instance.isUnmounted) {
            return;
          }
          if (cleanup) {
            cleanup();
          }
          return callWithAsyncErrorHandling(source, instance, 3 /* ErrorCodes.WATCH_CALLBACK */, [onCleanup]);
        };
      }
    } else {
      getter = NOOP;
      process.env.NODE_ENV !== 'production' && warnInvalidSource(source);
    }
    if (cb && deep) {
      var baseGetter = getter;
      getter = function getter() {
        return traverse(baseGetter());
      };
    }
    var cleanup;
    var onCleanup = function onCleanup(fn) {
      cleanup = effect.onStop = function () {
        callWithErrorHandling(fn, instance, 4 /* ErrorCodes.WATCH_CLEANUP */);
      };
    };
    // in SSR there is no need to setup an actual effect, and it should be noop
    // unless it's eager or sync flush
    var ssrCleanup;
    if (isInSSRComponentSetup) {
      // we will also not call the invalidate callback (+ runner is not set up)
      onCleanup = NOOP;
      if (!cb) {
        getter();
      } else if (immediate) {
        callWithAsyncErrorHandling(cb, instance, 3 /* ErrorCodes.WATCH_CALLBACK */, [getter(), isMultiSource ? [] : undefined, onCleanup]);
      }
      if (flush === 'sync') {
        var ctx = useSSRContext();
        ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
      } else {
        return NOOP;
      }
    }
    var oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
    var job = function job() {
      if (!effect.active) {
        return;
      }
      if (cb) {
        // watch(source, cb)
        var newValue = effect.run();
        if (deep || forceTrigger || (isMultiSource ? newValue.some(function (v, i) {
          return hasChanged(v, oldValue[i]);
        }) : hasChanged(newValue, oldValue)) || false) {
          // cleanup before running cb again
          if (cleanup) {
            cleanup();
          }
          callWithAsyncErrorHandling(cb, instance, 3 /* ErrorCodes.WATCH_CALLBACK */, [newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? undefined : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue, onCleanup]);
          oldValue = newValue;
        }
      } else {
        // watchEffect
        effect.run();
      }
    };
    // important: mark the job as a watcher callback so that scheduler knows
    // it is allowed to self-trigger (#1727)
    job.allowRecurse = !!cb;
    var scheduler;
    if (flush === 'sync') {
      scheduler = job; // the scheduler function gets called directly
    } else if (flush === 'post') {
      scheduler = function scheduler() {
        return queuePostRenderEffect(job, instance && instance.suspense);
      };
    } else {
      // default: 'pre'
      job.pre = true;
      if (instance) job.id = instance.uid;
      scheduler = function scheduler() {
        return queueJob(job);
      };
    }
    var effect = new ReactiveEffect(getter, scheduler);
    if (process.env.NODE_ENV !== 'production') {
      effect.onTrack = onTrack;
      effect.onTrigger = onTrigger;
    }
    // initial run
    if (cb) {
      if (immediate) {
        job();
      } else {
        oldValue = effect.run();
      }
    } else if (flush === 'post') {
      queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
    } else {
      effect.run();
    }
    var unwatch = function unwatch() {
      effect.stop();
      if (instance && instance.scope) {
        remove(instance.scope.effects, effect);
      }
    };
    if (ssrCleanup) ssrCleanup.push(unwatch);
    return unwatch;
  }
  // this.$watch
  function instanceWatch(source, value, options) {
    var publicThis = this.proxy;
    var getter = isString(source) ? source.includes('.') ? createPathGetter(publicThis, source) : function () {
      return publicThis[source];
    } : source.bind(publicThis, publicThis);
    var cb;
    if (isFunction(value)) {
      cb = value;
    } else {
      cb = value.handler;
      options = value;
    }
    var cur = currentInstance;
    setCurrentInstance(this);
    var res = doWatch(getter, cb.bind(publicThis), options);
    if (cur) {
      setCurrentInstance(cur);
    } else {
      unsetCurrentInstance();
    }
    return res;
  }
  function createPathGetter(ctx, path) {
    var segments = path.split('.');
    return function () {
      var cur = ctx;
      for (var i = 0; i < segments.length && cur; i++) {
        cur = cur[segments[i]];
      }
      return cur;
    };
  }
  function traverse(value, seen) {
    if (!isObject(value) || value["__v_skip" /* ReactiveFlags.SKIP */]) {
      return value;
    }
    seen = seen || new Set();
    if (seen.has(value)) {
      return value;
    }
    seen.add(value);
    if (isRef(value)) {
      traverse(value.value, seen);
    } else if (isArray$1(value)) {
      for (var i = 0; i < value.length; i++) {
        traverse(value[i], seen);
      }
    } else if (isSet(value) || isMap(value)) {
      value.forEach(function (v) {
        traverse(v, seen);
      });
    } else if (isPlainObject(value)) {
      for (var key in value) {
        traverse(value[key], seen);
      }
    }
    return value;
  }

  // implementation, close to no-op
  function defineComponent(options) {
    return isFunction(options) ? {
      setup: options,
      name: options.name
    } : options;
  }
  var isAsyncWrapper = function isAsyncWrapper(i) {
    return !!i.type.__asyncLoader;
  };
  var isKeepAlive = function isKeepAlive(vnode) {
    return vnode.type.__isKeepAlive;
  };
  function onActivated(hook, target) {
    registerKeepAliveHook(hook, "a" /* LifecycleHooks.ACTIVATED */, target);
  }
  function onDeactivated(hook, target) {
    registerKeepAliveHook(hook, "da" /* LifecycleHooks.DEACTIVATED */, target);
  }
  function registerKeepAliveHook(hook, type) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
    // cache the deactivate branch check wrapper for injected hooks so the same
    // hook can be properly deduped by the scheduler. "__wdc" stands for "with
    // deactivation check".
    var wrappedHook = hook.__wdc || (hook.__wdc = function () {
      // only fire the hook if the target instance is NOT in a deactivated branch.
      var current = target;
      while (current) {
        if (current.isDeactivated) {
          return;
        }
        current = current.parent;
      }
      return hook();
    });
    injectHook(type, wrappedHook, target);
    // In addition to registering it on the target instance, we walk up the parent
    // chain and register it on all ancestor instances that are keep-alive roots.
    // This avoids the need to walk the entire component tree when invoking these
    // hooks, and more importantly, avoids the need to track child components in
    // arrays.
    if (target) {
      var current = target.parent;
      while (current && current.parent) {
        if (isKeepAlive(current.parent.vnode)) {
          injectToKeepAliveRoot(wrappedHook, type, target, current);
        }
        current = current.parent;
      }
    }
  }
  function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
    // injectHook wraps the original for error handling, so make sure to remove
    // the wrapped version.
    var injected = injectHook(type, hook, keepAliveRoot, true /* prepend */);
    onUnmounted(function () {
      remove(keepAliveRoot[type], injected);
    }, target);
  }
  function injectHook(type, hook) {
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentInstance;
    var prepend = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (target) {
      var hooks = target[type] || (target[type] = []);
      // cache the error handling wrapper for injected hooks so the same hook
      // can be properly deduped by the scheduler. "__weh" stands for "with error
      // handling".
      var wrappedHook = hook.__weh || (hook.__weh = function () {
        if (target.isUnmounted) {
          return;
        }
        // disable tracking inside all lifecycle hooks
        // since they can potentially be called inside effects.
        pauseTracking();
        // Set currentInstance during hook invocation.
        // This assumes the hook does not synchronously trigger other hooks, which
        // can only be false when the user does something really funky.
        setCurrentInstance(target);
        for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }
        var res = callWithAsyncErrorHandling(hook, target, type, args);
        unsetCurrentInstance();
        resetTracking();
        return res;
      });
      if (prepend) {
        hooks.unshift(wrappedHook);
      } else {
        hooks.push(wrappedHook);
      }
      return wrappedHook;
    } else if (process.env.NODE_ENV !== 'production') {
      var apiName = toHandlerKey(ErrorTypeStrings[type].replace(/ hook$/, ''));
      warn$1("".concat(apiName, " is called when there is no active component instance to be ") + "associated with. " + "Lifecycle injection APIs can only be used during execution of setup()." + (" If you are using async setup(), make sure to register lifecycle " + "hooks before the first await statement."));
    }
  }
  var createHook = function createHook(lifecycle) {
    return function (hook) {
      var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
      return (
        // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
        (!isInSSRComponentSetup || lifecycle === "sp" /* LifecycleHooks.SERVER_PREFETCH */) && injectHook(lifecycle, function () {
          return hook.apply(void 0, arguments);
        }, target)
      );
    };
  };
  var onBeforeMount = createHook("bm" /* LifecycleHooks.BEFORE_MOUNT */);
  var onMounted = createHook("m" /* LifecycleHooks.MOUNTED */);
  var onBeforeUpdate = createHook("bu" /* LifecycleHooks.BEFORE_UPDATE */);
  var onUpdated = createHook("u" /* LifecycleHooks.UPDATED */);
  var onBeforeUnmount = createHook("bum" /* LifecycleHooks.BEFORE_UNMOUNT */);
  var onUnmounted = createHook("um" /* LifecycleHooks.UNMOUNTED */);
  var onServerPrefetch = createHook("sp" /* LifecycleHooks.SERVER_PREFETCH */);
  var onRenderTriggered = createHook("rtg" /* LifecycleHooks.RENDER_TRIGGERED */);
  var onRenderTracked = createHook("rtc" /* LifecycleHooks.RENDER_TRACKED */);
  function onErrorCaptured(hook) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : currentInstance;
    injectHook("ec" /* LifecycleHooks.ERROR_CAPTURED */, hook, target);
  }

  /**
  Runtime helper for applying directives to a vnode. Example usage:

  const comp = resolveComponent('comp')
  const foo = resolveDirective('foo')
  const bar = resolveDirective('bar')

  return withDirectives(h(comp), [
    [foo, this.x],
    [bar, this.y]
  ])
  */
  function validateDirectiveName(name) {
    if (isBuiltInDirective(name)) {
      warn$1('Do not use built-in directive ids as custom directive id: ' + name);
    }
  }
  function invokeDirectiveHook(vnode, prevVNode, instance, name) {
    var bindings = vnode.dirs;
    var oldBindings = prevVNode && prevVNode.dirs;
    for (var i = 0; i < bindings.length; i++) {
      var binding = bindings[i];
      if (oldBindings) {
        binding.oldValue = oldBindings[i].value;
      }
      var hook = binding.dir[name];
      if (hook) {
        // disable tracking inside all lifecycle hooks
        // since they can potentially be called inside effects.
        pauseTracking();
        callWithAsyncErrorHandling(hook, instance, 8 /* ErrorCodes.DIRECTIVE_HOOK */, [vnode.el, binding, vnode, prevVNode]);
        resetTracking();
      }
    }
  }
  var NULL_DYNAMIC_COMPONENT = Symbol();

  /**
   * #2437 In Vue 3, functional components do not have a public instance proxy but
   * they exist in the internal parent chain. For code that relies on traversing
   * public $parent chains, skip functional ones and go to the parent instead.
   */
  var getPublicInstance = function getPublicInstance(i) {
    if (!i) return null;
    if (isStatefulComponent(i)) return getExposeProxy(i) || i.proxy;
    return getPublicInstance(i.parent);
  };
  var publicPropertiesMap =
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /*#__PURE__*/
  extend(Object.create(null), {
    $: function $(i) {
      return i;
    },
    $el: function $el(i) {
      return i.vnode.el;
    },
    $data: function $data(i) {
      return i.data;
    },
    $props: function $props(i) {
      return process.env.NODE_ENV !== 'production' ? shallowReadonly(i.props) : i.props;
    },
    $attrs: function $attrs(i) {
      return process.env.NODE_ENV !== 'production' ? shallowReadonly(i.attrs) : i.attrs;
    },
    $slots: function $slots(i) {
      return process.env.NODE_ENV !== 'production' ? shallowReadonly(i.slots) : i.slots;
    },
    $refs: function $refs(i) {
      return process.env.NODE_ENV !== 'production' ? shallowReadonly(i.refs) : i.refs;
    },
    $parent: function $parent(i) {
      return getPublicInstance(i.parent);
    },
    $root: function $root(i) {
      return getPublicInstance(i.root);
    },
    $emit: function $emit(i) {
      return i.emit;
    },
    $options: function $options(i) {
      return __VUE_OPTIONS_API__ ? resolveMergedOptions(i) : i.type;
    },
    $forceUpdate: function $forceUpdate(i) {
      return i.f || (i.f = function () {
        return queueJob(i.update);
      });
    },
    $nextTick: function $nextTick(i) {
      return i.n || (i.n = nextTick.bind(i.proxy));
    },
    $watch: function $watch(i) {
      return __VUE_OPTIONS_API__ ? instanceWatch.bind(i) : NOOP;
    }
  });
  var isReservedPrefix = function isReservedPrefix(key) {
    return key === '_' || key === '$';
  };
  var hasSetupBinding = function hasSetupBinding(state, key) {
    return state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
  };
  var PublicInstanceProxyHandlers = {
    get: function get(_ref12, key) {
      var instance = _ref12._;
      var ctx = instance.ctx,
        setupState = instance.setupState,
        data = instance.data,
        props = instance.props,
        accessCache = instance.accessCache,
        type = instance.type,
        appContext = instance.appContext;
      // for internal formatters to know that this is a Vue instance
      if (process.env.NODE_ENV !== 'production' && key === '__isVue') {
        return true;
      }
      // data / props / ctx
      // This getter gets called for every property access on the render context
      // during render and is a major hotspot. The most expensive part of this
      // is the multiple hasOwn() calls. It's much faster to do a simple property
      // access on a plain object, so we use an accessCache object (with null
      // prototype) to memoize what access type a key corresponds to.
      var normalizedProps;
      if (key[0] !== '$') {
        var n = accessCache[key];
        if (n !== undefined) {
          switch (n) {
            case 1 /* AccessTypes.SETUP */:
              return setupState[key];
            case 2 /* AccessTypes.DATA */:
              return data[key];
            case 4 /* AccessTypes.CONTEXT */:
              return ctx[key];
            case 3 /* AccessTypes.PROPS */:
              return props[key];
            // default: just fallthrough
          }
        } else if (hasSetupBinding(setupState, key)) {
          accessCache[key] = 1 /* AccessTypes.SETUP */;
          return setupState[key];
        } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
          accessCache[key] = 2 /* AccessTypes.DATA */;
          return data[key];
        } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
          accessCache[key] = 3 /* AccessTypes.PROPS */;
          return props[key];
        } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
          accessCache[key] = 4 /* AccessTypes.CONTEXT */;
          return ctx[key];
        } else if (!__VUE_OPTIONS_API__ || shouldCacheAccess) {
          accessCache[key] = 0 /* AccessTypes.OTHER */;
        }
      }

      var publicGetter = publicPropertiesMap[key];
      var cssModule, globalProperties;
      // public $xxx properties
      if (publicGetter) {
        if (key === '$attrs') {
          track(instance, "get" /* TrackOpTypes.GET */, key);
          process.env.NODE_ENV !== 'production' && markAttrsAccessed();
        }
        return publicGetter(instance);
      } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
        return cssModule;
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        // user may set custom properties to `this` that start with `$`
        accessCache[key] = 4 /* AccessTypes.CONTEXT */;
        return ctx[key];
      } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
        {
          return globalProperties[key];
        }
      } else if (process.env.NODE_ENV !== 'production' && currentRenderingInstance && (!isString(key) ||
      // #1091 avoid internal isRef/isVNode checks on component instance leading
      // to infinite warning loop
      key.indexOf('__v') !== 0)) {
        if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
          warn$1("Property ".concat(JSON.stringify(key), " must be accessed via $data because it starts with a reserved ") + "character (\"$\" or \"_\") and is not proxied on the render context.");
        } else if (instance === currentRenderingInstance) {
          warn$1("Property ".concat(JSON.stringify(key), " was accessed during render ") + "but is not defined on instance.");
        }
      }
    },
    set: function set(_ref13, key, value) {
      var instance = _ref13._;
      var data = instance.data,
        setupState = instance.setupState,
        ctx = instance.ctx;
      if (hasSetupBinding(setupState, key)) {
        setupState[key] = value;
        return true;
      } else if (process.env.NODE_ENV !== 'production' && setupState.__isScriptSetup && hasOwn(setupState, key)) {
        warn$1("Cannot mutate <script setup> binding \"".concat(key, "\" from Options API."));
        return false;
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        data[key] = value;
        return true;
      } else if (hasOwn(instance.props, key)) {
        process.env.NODE_ENV !== 'production' && warn$1("Attempting to mutate prop \"".concat(key, "\". Props are readonly."));
        return false;
      }
      if (key[0] === '$' && key.slice(1) in instance) {
        process.env.NODE_ENV !== 'production' && warn$1("Attempting to mutate public property \"".concat(key, "\". ") + "Properties starting with $ are reserved and readonly.");
        return false;
      } else {
        if (process.env.NODE_ENV !== 'production' && key in instance.appContext.config.globalProperties) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            value: value
          });
        } else {
          ctx[key] = value;
        }
      }
      return true;
    },
    has: function has(_ref14, key) {
      var _ref14$_ = _ref14._,
        data = _ref14$_.data,
        setupState = _ref14$_.setupState,
        accessCache = _ref14$_.accessCache,
        ctx = _ref14$_.ctx,
        appContext = _ref14$_.appContext,
        propsOptions = _ref14$_.propsOptions;
      var normalizedProps;
      return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
    },
    defineProperty: function defineProperty(target, key, descriptor) {
      if (descriptor.get != null) {
        // invalidate key cache of a getter based property #5417
        target._.accessCache[key] = 0;
      } else if (hasOwn(descriptor, 'value')) {
        this.set(target, key, descriptor.value, null);
      }
      return Reflect.defineProperty(target, key, descriptor);
    }
  };
  if (process.env.NODE_ENV !== 'production' && !false) {
    PublicInstanceProxyHandlers.ownKeys = function (target) {
      warn$1("Avoid app logic that relies on enumerating keys on a component instance. " + "The keys will be empty in production mode to avoid performance overhead.");
      return Reflect.ownKeys(target);
    };
  }
  // dev only
  // In dev mode, the proxy target exposes the same properties as seen on `this`
  // for easier console inspection. In prod mode it will be an empty object so
  // these properties definitions can be skipped.
  function createDevRenderContext(instance) {
    var target = {};
    // expose internal instance for proxy handlers
    Object.defineProperty(target, "_", {
      configurable: true,
      enumerable: false,
      get: function get() {
        return instance;
      }
    });
    // expose public properties
    Object.keys(publicPropertiesMap).forEach(function (key) {
      Object.defineProperty(target, key, {
        configurable: true,
        enumerable: false,
        get: function get() {
          return publicPropertiesMap[key](instance);
        },
        // intercepted by the proxy so no need for implementation,
        // but needed to prevent set errors
        set: NOOP
      });
    });
    return target;
  }
  // dev only
  function exposePropsOnRenderContext(instance) {
    var ctx = instance.ctx,
      _instance$propsOption3 = _slicedToArray(instance.propsOptions, 1),
      propsOptions = _instance$propsOption3[0];
    if (propsOptions) {
      Object.keys(propsOptions).forEach(function (key) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return instance.props[key];
          },
          set: NOOP
        });
      });
    }
  }
  // dev only
  function exposeSetupStateOnRenderContext(instance) {
    var ctx = instance.ctx,
      setupState = instance.setupState;
    Object.keys(toRaw(setupState)).forEach(function (key) {
      if (!setupState.__isScriptSetup) {
        if (isReservedPrefix(key[0])) {
          warn$1("setup() return property ".concat(JSON.stringify(key), " should not start with \"$\" or \"_\" ") + "which are reserved prefixes for Vue internals.");
          return;
        }
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return setupState[key];
          },
          set: NOOP
        });
      }
    });
  }
  function createDuplicateChecker() {
    var cache = Object.create(null);
    return function (type, key) {
      if (cache[key]) {
        warn$1("".concat(type, " property \"").concat(key, "\" is already defined in ").concat(cache[key], "."));
      } else {
        cache[key] = type;
      }
    };
  }
  var shouldCacheAccess = true;
  function applyOptions(instance) {
    var options = resolveMergedOptions(instance);
    var publicThis = instance.proxy;
    var ctx = instance.ctx;
    // do not cache property access on public proxy during state initialization
    shouldCacheAccess = false;
    // call beforeCreate first before accessing other options since
    // the hook may mutate resolved options (#2791)
    if (options.beforeCreate) {
      callHook(options.beforeCreate, instance, "bc" /* LifecycleHooks.BEFORE_CREATE */);
    }

    var dataOptions = options.data,
      computedOptions = options.computed,
      methods = options.methods,
      watchOptions = options.watch,
      provideOptions = options.provide,
      injectOptions = options.inject,
      created = options.created,
      beforeMount = options.beforeMount,
      mounted = options.mounted,
      beforeUpdate = options.beforeUpdate,
      updated = options.updated,
      activated = options.activated,
      deactivated = options.deactivated;
      options.beforeDestroy;
      var beforeUnmount = options.beforeUnmount;
      options.destroyed;
      var unmounted = options.unmounted,
      render = options.render,
      renderTracked = options.renderTracked,
      renderTriggered = options.renderTriggered,
      errorCaptured = options.errorCaptured,
      serverPrefetch = options.serverPrefetch,
      expose = options.expose,
      inheritAttrs = options.inheritAttrs,
      components = options.components,
      directives = options.directives;
      options.filters;
    var checkDuplicateProperties = process.env.NODE_ENV !== 'production' ? createDuplicateChecker() : null;
    if (process.env.NODE_ENV !== 'production') {
      var _instance$propsOption4 = _slicedToArray(instance.propsOptions, 1),
        propsOptions = _instance$propsOption4[0];
      if (propsOptions) {
        for (var key in propsOptions) {
          checkDuplicateProperties("Props" /* OptionTypes.PROPS */, key);
        }
      }
    }
    // options initialization order (to be consistent with Vue 2):
    // - props (already done outside of this function)
    // - inject
    // - methods
    // - data (deferred since it relies on `this` access)
    // - computed
    // - watch (deferred since it relies on `this` access)
    if (injectOptions) {
      resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
    }
    if (methods) {
      for (var _key5 in methods) {
        var methodHandler = methods[_key5];
        if (isFunction(methodHandler)) {
          // In dev mode, we use the `createRenderContext` function to define
          // methods to the proxy target, and those are read-only but
          // reconfigurable, so it needs to be redefined here
          if (process.env.NODE_ENV !== 'production') {
            Object.defineProperty(ctx, _key5, {
              value: methodHandler.bind(publicThis),
              configurable: true,
              enumerable: true,
              writable: true
            });
          } else {
            ctx[_key5] = methodHandler.bind(publicThis);
          }
          if (process.env.NODE_ENV !== 'production') {
            checkDuplicateProperties("Methods" /* OptionTypes.METHODS */, _key5);
          }
        } else if (process.env.NODE_ENV !== 'production') {
          warn$1("Method \"".concat(_key5, "\" has type \"").concat(_typeof(methodHandler), "\" in the component definition. ") + "Did you reference the function correctly?");
        }
      }
    }
    if (dataOptions) {
      if (process.env.NODE_ENV !== 'production' && !isFunction(dataOptions)) {
        warn$1("The data option must be a function. " + "Plain object usage is no longer supported.");
      }
      var data = dataOptions.call(publicThis, publicThis);
      if (process.env.NODE_ENV !== 'production' && isPromise(data)) {
        warn$1("data() returned a Promise - note data() cannot be async; If you " + "intend to perform data fetching before component renders, use " + "async setup() + <Suspense>.");
      }
      if (!isObject(data)) {
        process.env.NODE_ENV !== 'production' && warn$1("data() should return an object.");
      } else {
        instance.data = reactive(data);
        if (process.env.NODE_ENV !== 'production') {
          var _loop2 = function _loop2(_key6) {
            checkDuplicateProperties("Data" /* OptionTypes.DATA */, _key6);
            // expose data on ctx during dev
            if (!isReservedPrefix(_key6[0])) {
              Object.defineProperty(ctx, _key6, {
                configurable: true,
                enumerable: true,
                get: function get() {
                  return data[_key6];
                },
                set: NOOP
              });
            }
          };
          for (var _key6 in data) {
            _loop2(_key6);
          }
        }
      }
    }
    // state initialization complete at this point - start caching access
    shouldCacheAccess = true;
    if (computedOptions) {
      var _loop3 = function _loop3(_key7) {
        var opt = computedOptions[_key7];
        var get = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
        if (process.env.NODE_ENV !== 'production' && get === NOOP) {
          warn$1("Computed property \"".concat(_key7, "\" has no getter."));
        }
        var set = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : process.env.NODE_ENV !== 'production' ? function () {
          warn$1("Write operation failed: computed property \"".concat(_key7, "\" is readonly."));
        } : NOOP;
        var c = computed({
          get: get,
          set: set
        });
        Object.defineProperty(ctx, _key7, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return c.value;
          },
          set: function set(v) {
            return c.value = v;
          }
        });
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateProperties("Computed" /* OptionTypes.COMPUTED */, _key7);
        }
      };
      for (var _key7 in computedOptions) {
        _loop3(_key7);
      }
    }
    if (watchOptions) {
      for (var _key8 in watchOptions) {
        createWatcher(watchOptions[_key8], ctx, publicThis, _key8);
      }
    }
    if (provideOptions) {
      var provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach(function (key) {
        provide(key, provides[key]);
      });
    }
    if (created) {
      callHook(created, instance, "c" /* LifecycleHooks.CREATED */);
    }

    function registerLifecycleHook(register, hook) {
      if (isArray$1(hook)) {
        hook.forEach(function (_hook) {
          return register(_hook.bind(publicThis));
        });
      } else if (hook) {
        register(hook.bind(publicThis));
      }
    }
    registerLifecycleHook(onBeforeMount, beforeMount);
    registerLifecycleHook(onMounted, mounted);
    registerLifecycleHook(onBeforeUpdate, beforeUpdate);
    registerLifecycleHook(onUpdated, updated);
    registerLifecycleHook(onActivated, activated);
    registerLifecycleHook(onDeactivated, deactivated);
    registerLifecycleHook(onErrorCaptured, errorCaptured);
    registerLifecycleHook(onRenderTracked, renderTracked);
    registerLifecycleHook(onRenderTriggered, renderTriggered);
    registerLifecycleHook(onBeforeUnmount, beforeUnmount);
    registerLifecycleHook(onUnmounted, unmounted);
    registerLifecycleHook(onServerPrefetch, serverPrefetch);
    if (isArray$1(expose)) {
      if (expose.length) {
        var exposed = instance.exposed || (instance.exposed = {});
        expose.forEach(function (key) {
          Object.defineProperty(exposed, key, {
            get: function get() {
              return publicThis[key];
            },
            set: function set(val) {
              return publicThis[key] = val;
            }
          });
        });
      } else if (!instance.exposed) {
        instance.exposed = {};
      }
    }
    // options that are handled when creating the instance but also need to be
    // applied from mixins
    if (render && instance.render === NOOP) {
      instance.render = render;
    }
    if (inheritAttrs != null) {
      instance.inheritAttrs = inheritAttrs;
    }
    // asset options.
    if (components) instance.components = components;
    if (directives) instance.directives = directives;
  }
  function resolveInjections(injectOptions, ctx) {
    var checkDuplicateProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : NOOP;
    var unwrapRef = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    if (isArray$1(injectOptions)) {
      injectOptions = normalizeInject(injectOptions);
    }
    var _loop4 = function _loop4() {
      var opt = injectOptions[key];
      var injected;
      if (isObject(opt)) {
        if ('default' in opt) {
          injected = inject(opt.from || key, opt["default"], true /* treat default function as factory */);
        } else {
          injected = inject(opt.from || key);
        }
      } else {
        injected = inject(opt);
      }
      if (isRef(injected)) {
        // TODO remove the check in 3.3
        if (unwrapRef) {
          Object.defineProperty(ctx, key, {
            enumerable: true,
            configurable: true,
            get: function get() {
              return injected.value;
            },
            set: function set(v) {
              return injected.value = v;
            }
          });
        } else {
          if (process.env.NODE_ENV !== 'production') {
            warn$1("injected property \"".concat(key, "\" is a ref and will be auto-unwrapped ") + "and no longer needs `.value` in the next minor release. " + "To opt-in to the new behavior now, " + "set `app.config.unwrapInjectedRef = true` (this config is " + "temporary and will not be needed in the future.)");
          }
          ctx[key] = injected;
        }
      } else {
        ctx[key] = injected;
      }
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateProperties("Inject" /* OptionTypes.INJECT */, key);
      }
    };
    for (var key in injectOptions) {
      _loop4();
    }
  }
  function callHook(hook, instance, type) {
    callWithAsyncErrorHandling(isArray$1(hook) ? hook.map(function (h) {
      return h.bind(instance.proxy);
    }) : hook.bind(instance.proxy), instance, type);
  }
  function createWatcher(raw, ctx, publicThis, key) {
    var getter = key.includes('.') ? createPathGetter(publicThis, key) : function () {
      return publicThis[key];
    };
    if (isString(raw)) {
      var handler = ctx[raw];
      if (isFunction(handler)) {
        watch(getter, handler);
      } else if (process.env.NODE_ENV !== 'production') {
        warn$1("Invalid watch handler specified by key \"".concat(raw, "\""), handler);
      }
    } else if (isFunction(raw)) {
      watch(getter, raw.bind(publicThis));
    } else if (isObject(raw)) {
      if (isArray$1(raw)) {
        raw.forEach(function (r) {
          return createWatcher(r, ctx, publicThis, key);
        });
      } else {
        var _handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
        if (isFunction(_handler)) {
          watch(getter, _handler, raw);
        } else if (process.env.NODE_ENV !== 'production') {
          warn$1("Invalid watch handler specified by key \"".concat(raw.handler, "\""), _handler);
        }
      }
    } else if (process.env.NODE_ENV !== 'production') {
      warn$1("Invalid watch option: \"".concat(key, "\""), raw);
    }
  }
  /**
   * Resolve merged options and cache it on the component.
   * This is done only once per-component since the merging does not involve
   * instances.
   */
  function resolveMergedOptions(instance) {
    var base = instance.type;
    var mixins = base.mixins,
      extendsOptions = base["extends"];
    var _instance$appContext = instance.appContext,
      globalMixins = _instance$appContext.mixins,
      cache = _instance$appContext.optionsCache,
      optionMergeStrategies = _instance$appContext.config.optionMergeStrategies;
    var cached = cache.get(base);
    var resolved;
    if (cached) {
      resolved = cached;
    } else if (!globalMixins.length && !mixins && !extendsOptions) {
      {
        resolved = base;
      }
    } else {
      resolved = {};
      if (globalMixins.length) {
        globalMixins.forEach(function (m) {
          return mergeOptions$1(resolved, m, optionMergeStrategies, true);
        });
      }
      mergeOptions$1(resolved, base, optionMergeStrategies);
    }
    if (isObject(base)) {
      cache.set(base, resolved);
    }
    return resolved;
  }
  function mergeOptions$1(to, from, strats) {
    var asMixin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var mixins = from.mixins,
      extendsOptions = from["extends"];
    if (extendsOptions) {
      mergeOptions$1(to, extendsOptions, strats, true);
    }
    if (mixins) {
      mixins.forEach(function (m) {
        return mergeOptions$1(to, m, strats, true);
      });
    }
    for (var key in from) {
      if (asMixin && key === 'expose') {
        process.env.NODE_ENV !== 'production' && warn$1("\"expose\" option is ignored when declared in mixins or extends. " + "It should only be declared in the base component itself.");
      } else {
        var strat = internalOptionMergeStrats[key] || strats && strats[key];
        to[key] = strat ? strat(to[key], from[key]) : from[key];
      }
    }
    return to;
  }
  var internalOptionMergeStrats = {
    data: mergeDataFn,
    props: mergeObjectOptions,
    emits: mergeObjectOptions,
    // objects
    methods: mergeObjectOptions,
    computed: mergeObjectOptions,
    // lifecycle
    beforeCreate: mergeAsArray,
    created: mergeAsArray,
    beforeMount: mergeAsArray,
    mounted: mergeAsArray,
    beforeUpdate: mergeAsArray,
    updated: mergeAsArray,
    beforeDestroy: mergeAsArray,
    beforeUnmount: mergeAsArray,
    destroyed: mergeAsArray,
    unmounted: mergeAsArray,
    activated: mergeAsArray,
    deactivated: mergeAsArray,
    errorCaptured: mergeAsArray,
    serverPrefetch: mergeAsArray,
    // assets
    components: mergeObjectOptions,
    directives: mergeObjectOptions,
    // watch
    watch: mergeWatchOptions,
    // provide / inject
    provide: mergeDataFn,
    inject: mergeInject
  };
  function mergeDataFn(to, from) {
    if (!from) {
      return to;
    }
    if (!to) {
      return from;
    }
    return function mergedDataFn() {
      return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
    };
  }
  function mergeInject(to, from) {
    return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
  }
  function normalizeInject(raw) {
    if (isArray$1(raw)) {
      var res = {};
      for (var i = 0; i < raw.length; i++) {
        res[raw[i]] = raw[i];
      }
      return res;
    }
    return raw;
  }
  function mergeAsArray(to, from) {
    return to ? _toConsumableArray(new Set([].concat(to, from))) : from;
  }
  function mergeObjectOptions(to, from) {
    return to ? extend(extend(Object.create(null), to), from) : from;
  }
  function mergeWatchOptions(to, from) {
    if (!to) return from;
    if (!from) return to;
    var merged = extend(Object.create(null), to);
    for (var key in from) {
      merged[key] = mergeAsArray(to[key], from[key]);
    }
    return merged;
  }
  function initProps(instance, rawProps, isStateful) {
    var isSSR = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var props = {};
    var attrs = {};
    def(attrs, InternalObjectKey, 1);
    instance.propsDefaults = Object.create(null);
    setFullProps(instance, rawProps, props, attrs);
    // ensure all declared prop keys are present
    for (var key in instance.propsOptions[0]) {
      if (!(key in props)) {
        props[key] = undefined;
      }
    }
    // validation
    if (process.env.NODE_ENV !== 'production') {
      validateProps(rawProps || {}, props, instance);
    }
    if (isStateful) {
      // stateful
      instance.props = isSSR ? props : shallowReactive(props);
    } else {
      if (!instance.type.props) {
        // functional w/ optional props, props === attrs
        instance.props = attrs;
      } else {
        // functional w/ declared props
        instance.props = props;
      }
    }
    instance.attrs = attrs;
  }
  function isInHmrContext(instance) {
    while (instance) {
      if (instance.type.__hmrId) return true;
      instance = instance.parent;
    }
  }
  function updateProps(instance, rawProps, rawPrevProps, optimized) {
    var props = instance.props,
      attrs = instance.attrs,
      patchFlag = instance.vnode.patchFlag;
    var rawCurrentProps = toRaw(props);
    var _instance$propsOption5 = _slicedToArray(instance.propsOptions, 1),
      options = _instance$propsOption5[0];
    var hasAttrsChanged = false;
    if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !(process.env.NODE_ENV !== 'production' && isInHmrContext(instance)) && (optimized || patchFlag > 0) && !(patchFlag & 16 /* PatchFlags.FULL_PROPS */)) {
      if (patchFlag & 8 /* PatchFlags.PROPS */) {
        // Compiler-generated props & no keys change, just set the updated
        // the props.
        var propsToUpdate = instance.vnode.dynamicProps;
        for (var i = 0; i < propsToUpdate.length; i++) {
          var key = propsToUpdate[i];
          // skip if the prop key is a declared emit event listener
          if (isEmitListener(instance.emitsOptions, key)) {
            continue;
          }
          // PROPS flag guarantees rawProps to be non-null
          var value = rawProps[key];
          if (options) {
            // attr / props separation was done on init and will be consistent
            // in this code path, so just check if attrs have it.
            if (hasOwn(attrs, key)) {
              if (value !== attrs[key]) {
                attrs[key] = value;
                hasAttrsChanged = true;
              }
            } else {
              var camelizedKey = camelize(key);
              props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false /* isAbsent */);
            }
          } else {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          }
        }
      }
    } else {
      // full props update.
      if (setFullProps(instance, rawProps, props, attrs)) {
        hasAttrsChanged = true;
      }
      // in case of dynamic props, check if we need to delete keys from
      // the props object
      var kebabKey;
      for (var _key9 in rawCurrentProps) {
        if (!rawProps ||
        // for camelCase
        !hasOwn(rawProps, _key9) && (
        // it's possible the original props was passed in as kebab-case
        // and converted to camelCase (#955)
        (kebabKey = hyphenate(_key9)) === _key9 || !hasOwn(rawProps, kebabKey))) {
          if (options) {
            if (rawPrevProps && (
            // for camelCase
            rawPrevProps[_key9] !== undefined ||
            // for kebab-case
            rawPrevProps[kebabKey] !== undefined)) {
              props[_key9] = resolvePropValue(options, rawCurrentProps, _key9, undefined, instance, true /* isAbsent */);
            }
          } else {
            delete props[_key9];
          }
        }
      }
      // in the case of functional component w/o props declaration, props and
      // attrs point to the same object so it should already have been updated.
      if (attrs !== rawCurrentProps) {
        for (var _key10 in attrs) {
          if (!rawProps || !hasOwn(rawProps, _key10) && !false) {
            delete attrs[_key10];
            hasAttrsChanged = true;
          }
        }
      }
    }
    // trigger updates for $attrs in case it's used in component slots
    if (hasAttrsChanged) {
      trigger(instance, "set" /* TriggerOpTypes.SET */, '$attrs');
    }
    if (process.env.NODE_ENV !== 'production') {
      validateProps(rawProps || {}, props, instance);
    }
  }
  function setFullProps(instance, rawProps, props, attrs) {
    var _instance$propsOption6 = _slicedToArray(instance.propsOptions, 2),
      options = _instance$propsOption6[0],
      needCastKeys = _instance$propsOption6[1];
    var hasAttrsChanged = false;
    var rawCastValues;
    if (rawProps) {
      for (var key in rawProps) {
        // key, ref are reserved and never passed down
        if (isReservedProp(key)) {
          continue;
        }
        var value = rawProps[key];
        // prop option names are camelized during normalization, so to support
        // kebab -> camel conversion here we need to camelize the key.
        var camelKey = void 0;
        if (options && hasOwn(options, camelKey = camelize(key))) {
          if (!needCastKeys || !needCastKeys.includes(camelKey)) {
            props[camelKey] = value;
          } else {
            (rawCastValues || (rawCastValues = {}))[camelKey] = value;
          }
        } else if (!isEmitListener(instance.emitsOptions, key)) {
          if (!(key in attrs) || value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
    if (needCastKeys) {
      var rawCurrentProps = toRaw(props);
      var castValues = rawCastValues || EMPTY_OBJ;
      for (var i = 0; i < needCastKeys.length; i++) {
        var _key11 = needCastKeys[i];
        props[_key11] = resolvePropValue(options, rawCurrentProps, _key11, castValues[_key11], instance, !hasOwn(castValues, _key11));
      }
    }
    return hasAttrsChanged;
  }
  function resolvePropValue(options, props, key, value, instance, isAbsent) {
    var opt = options[key];
    if (opt != null) {
      var hasDefault = hasOwn(opt, 'default');
      // default values
      if (hasDefault && value === undefined) {
        var defaultValue = opt["default"];
        if (opt.type !== Function && isFunction(defaultValue)) {
          var propsDefaults = instance.propsDefaults;
          if (key in propsDefaults) {
            value = propsDefaults[key];
          } else {
            setCurrentInstance(instance);
            value = propsDefaults[key] = defaultValue.call(null, props);
            unsetCurrentInstance();
          }
        } else {
          value = defaultValue;
        }
      }
      // boolean casting
      if (opt[0 /* BooleanFlags.shouldCast */]) {
        if (isAbsent && !hasDefault) {
          value = false;
        } else if (opt[1 /* BooleanFlags.shouldCastTrue */] && (value === '' || value === hyphenate(key))) {
          value = true;
        }
      }
    }
    return value;
  }
  function normalizePropsOptions(comp, appContext) {
    var asMixin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var cache = appContext.propsCache;
    var cached = cache.get(comp);
    if (cached) {
      return cached;
    }
    var raw = comp.props;
    var normalized = {};
    var needCastKeys = [];
    // apply mixin/extends props
    var hasExtends = false;
    if (__VUE_OPTIONS_API__ && !isFunction(comp)) {
      var extendProps = function extendProps(raw) {
        hasExtends = true;
        var _normalizePropsOption = normalizePropsOptions(raw, appContext, true),
          _normalizePropsOption2 = _slicedToArray(_normalizePropsOption, 2),
          props = _normalizePropsOption2[0],
          keys = _normalizePropsOption2[1];
        extend(normalized, props);
        if (keys) needCastKeys.push.apply(needCastKeys, _toConsumableArray(keys));
      };
      if (!asMixin && appContext.mixins.length) {
        appContext.mixins.forEach(extendProps);
      }
      if (comp["extends"]) {
        extendProps(comp["extends"]);
      }
      if (comp.mixins) {
        comp.mixins.forEach(extendProps);
      }
    }
    if (!raw && !hasExtends) {
      if (isObject(comp)) {
        cache.set(comp, EMPTY_ARR);
      }
      return EMPTY_ARR;
    }
    if (isArray$1(raw)) {
      for (var i = 0; i < raw.length; i++) {
        if (process.env.NODE_ENV !== 'production' && !isString(raw[i])) {
          warn$1("props must be strings when using array syntax.", raw[i]);
        }
        var normalizedKey = camelize(raw[i]);
        if (validatePropName(normalizedKey)) {
          normalized[normalizedKey] = EMPTY_OBJ;
        }
      }
    } else if (raw) {
      if (process.env.NODE_ENV !== 'production' && !isObject(raw)) {
        warn$1("invalid props options", raw);
      }
      for (var key in raw) {
        var _normalizedKey = camelize(key);
        if (validatePropName(_normalizedKey)) {
          var opt = raw[key];
          var prop = normalized[_normalizedKey] = isArray$1(opt) || isFunction(opt) ? {
            type: opt
          } : Object.assign({}, opt);
          if (prop) {
            var booleanIndex = getTypeIndex(Boolean, prop.type);
            var stringIndex = getTypeIndex(String, prop.type);
            prop[0 /* BooleanFlags.shouldCast */] = booleanIndex > -1;
            prop[1 /* BooleanFlags.shouldCastTrue */] = stringIndex < 0 || booleanIndex < stringIndex;
            // if the prop needs boolean casting or default value
            if (booleanIndex > -1 || hasOwn(prop, 'default')) {
              needCastKeys.push(_normalizedKey);
            }
          }
        }
      }
    }
    var res = [normalized, needCastKeys];
    if (isObject(comp)) {
      cache.set(comp, res);
    }
    return res;
  }
  function validatePropName(key) {
    if (key[0] !== '$') {
      return true;
    } else if (process.env.NODE_ENV !== 'production') {
      warn$1("Invalid prop name: \"".concat(key, "\" is a reserved property."));
    }
    return false;
  }
  // use function string name to check type constructors
  // so that it works across vms / iframes.
  function getType(ctor) {
    var match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
    return match ? match[2] : ctor === null ? 'null' : '';
  }
  function isSameType(a, b) {
    return getType(a) === getType(b);
  }
  function getTypeIndex(type, expectedTypes) {
    if (isArray$1(expectedTypes)) {
      return expectedTypes.findIndex(function (t) {
        return isSameType(t, type);
      });
    } else if (isFunction(expectedTypes)) {
      return isSameType(expectedTypes, type) ? 0 : -1;
    }
    return -1;
  }
  /**
   * dev only
   */
  function validateProps(rawProps, props, instance) {
    var resolvedValues = toRaw(props);
    var options = instance.propsOptions[0];
    for (var key in options) {
      var opt = options[key];
      if (opt == null) continue;
      validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
    }
  }
  /**
   * dev only
   */
  function validateProp(name, value, prop, isAbsent) {
    var type = prop.type,
      required = prop.required,
      validator = prop.validator;
    // required!
    if (required && isAbsent) {
      warn$1('Missing required prop: "' + name + '"');
      return;
    }
    // missing but optional
    if (value == null && !prop.required) {
      return;
    }
    // type check
    if (type != null && type !== true) {
      var isValid = false;
      var types = isArray$1(type) ? type : [type];
      var expectedTypes = [];
      // value is valid as long as one of the specified types match
      for (var i = 0; i < types.length && !isValid; i++) {
        var _assertType = assertType(value, types[i]),
          valid = _assertType.valid,
          expectedType = _assertType.expectedType;
        expectedTypes.push(expectedType || '');
        isValid = valid;
      }
      if (!isValid) {
        warn$1(getInvalidTypeMessage(name, value, expectedTypes));
        return;
      }
    }
    // custom validator
    if (validator && !validator(value)) {
      warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
    }
  }
  var isSimpleType = /*#__PURE__*/makeMap('String,Number,Boolean,Function,Symbol,BigInt');
  /**
   * dev only
   */
  function assertType(value, type) {
    var valid;
    var expectedType = getType(type);
    if (isSimpleType(expectedType)) {
      var t = _typeof(value);
      valid = t === expectedType.toLowerCase();
      // for primitive wrapper objects
      if (!valid && t === 'object') {
        valid = value instanceof type;
      }
    } else if (expectedType === 'Object') {
      valid = isObject(value);
    } else if (expectedType === 'Array') {
      valid = isArray$1(value);
    } else if (expectedType === 'null') {
      valid = value === null;
    } else {
      valid = value instanceof type;
    }
    return {
      valid: valid,
      expectedType: expectedType
    };
  }
  /**
   * dev only
   */
  function getInvalidTypeMessage(name, value, expectedTypes) {
    var message = "Invalid prop: type check failed for prop \"".concat(name, "\".") + " Expected ".concat(expectedTypes.map(capitalize).join(' | '));
    var expectedType = expectedTypes[0];
    var receivedType = toRawType(value);
    var expectedValue = styleValue(value, expectedType);
    var receivedValue = styleValue(value, receivedType);
    // check if we need to specify expected value
    if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
      message += " with value ".concat(expectedValue);
    }
    message += ", got ".concat(receivedType, " ");
    // check if we need to specify received value
    if (isExplicable(receivedType)) {
      message += "with value ".concat(receivedValue, ".");
    }
    return message;
  }
  /**
   * dev only
   */
  function styleValue(value, type) {
    if (type === 'String') {
      return "\"".concat(value, "\"");
    } else if (type === 'Number') {
      return "".concat(Number(value));
    } else {
      return "".concat(value);
    }
  }
  /**
   * dev only
   */
  function isExplicable(type) {
    var explicitTypes = ['string', 'number', 'boolean'];
    return explicitTypes.some(function (elem) {
      return type.toLowerCase() === elem;
    });
  }
  /**
   * dev only
   */
  function isBoolean() {
    for (var _len5 = arguments.length, args = new Array(_len5), _key12 = 0; _key12 < _len5; _key12++) {
      args[_key12] = arguments[_key12];
    }
    return args.some(function (elem) {
      return elem.toLowerCase() === 'boolean';
    });
  }
  var isInternalKey = function isInternalKey(key) {
    return key[0] === '_' || key === '$stable';
  };
  var normalizeSlotValue = function normalizeSlotValue(value) {
    return isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
  };
  var normalizeSlot$1 = function normalizeSlot(key, rawSlot, ctx) {
    if (rawSlot._n) {
      // already normalized - #5353
      return rawSlot;
    }
    var normalized = withCtx(function () {
      if (process.env.NODE_ENV !== 'production' && currentInstance) {
        warn$1("Slot \"".concat(key, "\" invoked outside of the render function: ") + "this will not track dependencies used in the slot. " + "Invoke the slot function inside the render function instead.");
      }
      return normalizeSlotValue(rawSlot.apply(void 0, arguments));
    }, ctx);
    normalized._c = false;
    return normalized;
  };
  var normalizeObjectSlots = function normalizeObjectSlots(rawSlots, slots, instance) {
    var ctx = rawSlots._ctx;
    var _loop5 = function _loop5() {
      if (isInternalKey(key)) return "continue";
      var value = rawSlots[key];
      if (isFunction(value)) {
        slots[key] = normalizeSlot$1(key, value, ctx);
      } else if (value != null) {
        if (process.env.NODE_ENV !== 'production' && !false) {
          warn$1("Non-function value encountered for slot \"".concat(key, "\". ") + "Prefer function slots for better performance.");
        }
        var normalized = normalizeSlotValue(value);
        slots[key] = function () {
          return normalized;
        };
      }
    };
    for (var key in rawSlots) {
      var _ret = _loop5();
      if (_ret === "continue") continue;
    }
  };
  var normalizeVNodeSlots = function normalizeVNodeSlots(instance, children) {
    if (process.env.NODE_ENV !== 'production' && !isKeepAlive(instance.vnode) && !false) {
      warn$1("Non-function value encountered for default slot. " + "Prefer function slots for better performance.");
    }
    var normalized = normalizeSlotValue(children);
    instance.slots["default"] = function () {
      return normalized;
    };
  };
  var initSlots = function initSlots(instance, children) {
    if (instance.vnode.shapeFlag & 32 /* ShapeFlags.SLOTS_CHILDREN */) {
      var type = children._;
      if (type) {
        // users can get the shallow readonly version of the slots object through `this.$slots`,
        // we should avoid the proxy object polluting the slots of the internal instance
        instance.slots = toRaw(children);
        // make compiler marker non-enumerable
        def(children, '_', type);
      } else {
        normalizeObjectSlots(children, instance.slots = {});
      }
    } else {
      instance.slots = {};
      if (children) {
        normalizeVNodeSlots(instance, children);
      }
    }
    def(instance.slots, InternalObjectKey, 1);
  };
  var updateSlots = function updateSlots(instance, children, optimized) {
    var vnode = instance.vnode,
      slots = instance.slots;
    var needDeletionCheck = true;
    var deletionComparisonTarget = EMPTY_OBJ;
    if (vnode.shapeFlag & 32 /* ShapeFlags.SLOTS_CHILDREN */) {
      var type = children._;
      if (type) {
        // compiled slots.
        if (process.env.NODE_ENV !== 'production' && isHmrUpdating) {
          // Parent was HMR updated so slot content may have changed.
          // force update slots and mark instance for hmr as well
          extend(slots, children);
        } else if (optimized && type === 1 /* SlotFlags.STABLE */) {
          // compiled AND stable.
          // no need to update, and skip stale slots removal.
          needDeletionCheck = false;
        } else {
          // compiled but dynamic (v-if/v-for on slots) - update slots, but skip
          // normalization.
          extend(slots, children);
          // #2893
          // when rendering the optimized slots by manually written render function,
          // we need to delete the `slots._` flag if necessary to make subsequent updates reliable,
          // i.e. let the `renderSlot` create the bailed Fragment
          if (!optimized && type === 1 /* SlotFlags.STABLE */) {
            delete slots._;
          }
        }
      } else {
        needDeletionCheck = !children.$stable;
        normalizeObjectSlots(children, slots);
      }
      deletionComparisonTarget = children;
    } else if (children) {
      // non slot object children (direct value) passed to a component
      normalizeVNodeSlots(instance, children);
      deletionComparisonTarget = {
        "default": 1
      };
    }
    // delete stale slots
    if (needDeletionCheck) {
      for (var key in slots) {
        if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
          delete slots[key];
        }
      }
    }
  };
  function createAppContext() {
    return {
      app: null,
      config: {
        isNativeTag: NO,
        performance: false,
        globalProperties: {},
        optionMergeStrategies: {},
        errorHandler: undefined,
        warnHandler: undefined,
        compilerOptions: {}
      },
      mixins: [],
      components: {},
      directives: {},
      provides: Object.create(null),
      optionsCache: new WeakMap(),
      propsCache: new WeakMap(),
      emitsCache: new WeakMap()
    };
  }
  var uid$1 = 0;
  function createAppAPI(render, hydrate) {
    return function createApp(rootComponent) {
      var rootProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!isFunction(rootComponent)) {
        rootComponent = Object.assign({}, rootComponent);
      }
      if (rootProps != null && !isObject(rootProps)) {
        process.env.NODE_ENV !== 'production' && warn$1("root props passed to app.mount() must be an object.");
        rootProps = null;
      }
      var context = createAppContext();
      var installedPlugins = new Set();
      var isMounted = false;
      var app = context.app = {
        _uid: uid$1++,
        _component: rootComponent,
        _props: rootProps,
        _container: null,
        _context: context,
        _instance: null,
        version: version,
        get config() {
          return context.config;
        },
        set config(v) {
          if (process.env.NODE_ENV !== 'production') {
            warn$1("app.config cannot be replaced. Modify individual options instead.");
          }
        },
        use: function use(plugin) {
          for (var _len6 = arguments.length, options = new Array(_len6 > 1 ? _len6 - 1 : 0), _key13 = 1; _key13 < _len6; _key13++) {
            options[_key13 - 1] = arguments[_key13];
          }
          if (installedPlugins.has(plugin)) {
            process.env.NODE_ENV !== 'production' && warn$1("Plugin has already been applied to target app.");
          } else if (plugin && isFunction(plugin.install)) {
            installedPlugins.add(plugin);
            plugin.install.apply(plugin, [app].concat(options));
          } else if (isFunction(plugin)) {
            installedPlugins.add(plugin);
            plugin.apply(void 0, [app].concat(options));
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1("A plugin must either be a function or an object with an \"install\" " + "function.");
          }
          return app;
        },
        mixin: function mixin(_mixin) {
          if (__VUE_OPTIONS_API__) {
            if (!context.mixins.includes(_mixin)) {
              context.mixins.push(_mixin);
            } else if (process.env.NODE_ENV !== 'production') {
              warn$1('Mixin has already been applied to target app' + (_mixin.name ? ": ".concat(_mixin.name) : ''));
            }
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1('Mixins are only available in builds supporting Options API');
          }
          return app;
        },
        component: function component(name, _component) {
          if (process.env.NODE_ENV !== 'production') {
            validateComponentName(name, context.config);
          }
          if (!_component) {
            return context.components[name];
          }
          if (process.env.NODE_ENV !== 'production' && context.components[name]) {
            warn$1("Component \"".concat(name, "\" has already been registered in target app."));
          }
          context.components[name] = _component;
          return app;
        },
        directive: function directive(name, _directive) {
          if (process.env.NODE_ENV !== 'production') {
            validateDirectiveName(name);
          }
          if (!_directive) {
            return context.directives[name];
          }
          if (process.env.NODE_ENV !== 'production' && context.directives[name]) {
            warn$1("Directive \"".concat(name, "\" has already been registered in target app."));
          }
          context.directives[name] = _directive;
          return app;
        },
        mount: function mount(rootContainer, isHydrate, isSVG) {
          if (!isMounted) {
            // #5571
            if (process.env.NODE_ENV !== 'production' && rootContainer.__vue_app__) {
              warn$1("There is already an app instance mounted on the host container.\n" + " If you want to mount another app on the same host container," + " you need to unmount the previous app by calling `app.unmount()` first.");
            }
            var vnode = createVNode(rootComponent, rootProps);
            // store app context on the root VNode.
            // this will be set on the root instance on initial mount.
            vnode.appContext = context;
            // HMR root reload
            if (process.env.NODE_ENV !== 'production') {
              context.reload = function () {
                render(cloneVNode(vnode), rootContainer, isSVG);
              };
            }
            if (isHydrate && hydrate) {
              hydrate(vnode, rootContainer);
            } else {
              render(vnode, rootContainer, isSVG);
            }
            isMounted = true;
            app._container = rootContainer;
            rootContainer.__vue_app__ = app;
            if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
              app._instance = vnode.component;
              devtoolsInitApp(app, version);
            }
            return getExposeProxy(vnode.component) || vnode.component.proxy;
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1("App has already been mounted.\n" + "If you want to remount the same app, move your app creation logic " + "into a factory function and create fresh app instances for each " + "mount - e.g. `const createMyApp = () => createApp(App)`");
          }
        },
        unmount: function unmount() {
          if (isMounted) {
            render(null, app._container);
            if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
              app._instance = null;
              devtoolsUnmountApp(app);
            }
            delete app._container.__vue_app__;
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1("Cannot unmount an app that is not mounted.");
          }
        },
        provide: function provide(key, value) {
          if (process.env.NODE_ENV !== 'production' && key in context.provides) {
            warn$1("App already provides property with key \"".concat(String(key), "\". ") + "It will be overwritten with the new value.");
          }
          context.provides[key] = value;
          return app;
        }
      };
      return app;
    };
  }

  /**
   * Function for handling a template ref
   */
  function setRef(rawRef, oldRawRef, parentSuspense, vnode) {
    var isUnmount = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    if (isArray$1(rawRef)) {
      rawRef.forEach(function (r, i) {
        return setRef(r, oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount);
      });
      return;
    }
    if (isAsyncWrapper(vnode) && !isUnmount) {
      // when mounting async components, nothing needs to be done,
      // because the template ref is forwarded to inner component
      return;
    }
    var refValue = vnode.shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */ ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
    var value = isUnmount ? null : refValue;
    var owner = rawRef.i,
      ref = rawRef.r;
    if (process.env.NODE_ENV !== 'production' && !owner) {
      warn$1("Missing ref owner context. ref cannot be used on hoisted vnodes. " + "A vnode with ref must be created inside the render function.");
      return;
    }
    var oldRef = oldRawRef && oldRawRef.r;
    var refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
    var setupState = owner.setupState;
    // dynamic ref changed. unset old ref
    if (oldRef != null && oldRef !== ref) {
      if (isString(oldRef)) {
        refs[oldRef] = null;
        if (hasOwn(setupState, oldRef)) {
          setupState[oldRef] = null;
        }
      } else if (isRef(oldRef)) {
        oldRef.value = null;
      }
    }
    if (isFunction(ref)) {
      callWithErrorHandling(ref, owner, 12 /* ErrorCodes.FUNCTION_REF */, [value, refs]);
    } else {
      var _isString = isString(ref);
      var _isRef = isRef(ref);
      if (_isString || _isRef) {
        var doSet = function doSet() {
          if (rawRef.f) {
            var existing = _isString ? hasOwn(setupState, ref) ? setupState[ref] : refs[ref] : ref.value;
            if (isUnmount) {
              isArray$1(existing) && remove(existing, refValue);
            } else {
              if (!isArray$1(existing)) {
                if (_isString) {
                  refs[ref] = [refValue];
                  if (hasOwn(setupState, ref)) {
                    setupState[ref] = refs[ref];
                  }
                } else {
                  ref.value = [refValue];
                  if (rawRef.k) refs[rawRef.k] = ref.value;
                }
              } else if (!existing.includes(refValue)) {
                existing.push(refValue);
              }
            }
          } else if (_isString) {
            refs[ref] = value;
            if (hasOwn(setupState, ref)) {
              setupState[ref] = value;
            }
          } else if (_isRef) {
            ref.value = value;
            if (rawRef.k) refs[rawRef.k] = value;
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1('Invalid template ref type:', ref, "(".concat(_typeof(ref), ")"));
          }
        };
        if (value) {
          doSet.id = -1;
          queuePostRenderEffect(doSet, parentSuspense);
        } else {
          doSet();
        }
      } else if (process.env.NODE_ENV !== 'production') {
        warn$1('Invalid template ref type:', ref, "(".concat(_typeof(ref), ")"));
      }
    }
  }

  /* eslint-disable no-restricted-globals */
  var supported$1;
  var perf$1;
  function startMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      perf$1.mark("vue-".concat(type, "-").concat(instance.uid));
    }
    if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
      devtoolsPerfStart(instance, type, isSupported() ? perf$1.now() : Date.now());
    }
  }
  function endMeasure(instance, type) {
    if (instance.appContext.config.performance && isSupported()) {
      var startTag = "vue-".concat(type, "-").concat(instance.uid);
      var endTag = startTag + ":end";
      perf$1.mark(endTag);
      perf$1.measure("<".concat(formatComponentName(instance, instance.type), "> ").concat(type), startTag, endTag);
      perf$1.clearMarks(startTag);
      perf$1.clearMarks(endTag);
    }
    if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
      devtoolsPerfEnd(instance, type, isSupported() ? perf$1.now() : Date.now());
    }
  }
  function isSupported() {
    if (supported$1 !== undefined) {
      return supported$1;
    }
    if (typeof window !== 'undefined' && window.performance) {
      supported$1 = true;
      perf$1 = window.performance;
    } else {
      supported$1 = false;
    }
    return supported$1;
  }

  /**
   * This is only called in esm-bundler builds.
   * It is called when a renderer is created, in `baseCreateRenderer` so that
   * importing runtime-core is side-effects free.
   *
   * istanbul-ignore-next
   */
  function initFeatureFlags() {
    var needWarn = [];
    if (typeof __VUE_OPTIONS_API__ !== 'boolean') {
      process.env.NODE_ENV !== 'production' && needWarn.push("__VUE_OPTIONS_API__");
      getGlobalThis().__VUE_OPTIONS_API__ = true;
    }
    if (typeof __VUE_PROD_DEVTOOLS__ !== 'boolean') {
      process.env.NODE_ENV !== 'production' && needWarn.push("__VUE_PROD_DEVTOOLS__");
      getGlobalThis().__VUE_PROD_DEVTOOLS__ = false;
    }
    if (process.env.NODE_ENV !== 'production' && needWarn.length) {
      var multi = needWarn.length > 1;
      console.warn("Feature flag".concat(multi ? "s" : "", " ").concat(needWarn.join(', '), " ").concat(multi ? "are" : "is", " not explicitly defined. You are running the esm-bundler build of Vue, ") + "which expects these compile-time feature flags to be globally injected " + "via the bundler config in order to get better tree-shaking in the " + "production bundle.\n\n" + "For more details, see https://link.vuejs.org/feature-flags.");
    }
  }
  var queuePostRenderEffect = queueEffectWithSuspense;
  /**
   * The createRenderer function accepts two generic arguments:
   * HostNode and HostElement, corresponding to Node and Element types in the
   * host environment. For example, for runtime-dom, HostNode would be the DOM
   * `Node` interface and HostElement would be the DOM `Element` interface.
   *
   * Custom renderers can pass in the platform specific types like this:
   *
   * ``` js
   * const { render, createApp } = createRenderer<Node, Element>({
   *   patchProp,
   *   ...nodeOps
   * })
   * ```
   */
  function createRenderer(options) {
    return baseCreateRenderer(options);
  }
  // implementation
  function baseCreateRenderer(options, createHydrationFns) {
    // compile-time feature flags check
    {
      initFeatureFlags();
    }
    var target = getGlobalThis();
    target.__VUE__ = true;
    if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
      setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
    }
    var hostInsert = options.insert,
      hostRemove = options.remove,
      hostPatchProp = options.patchProp,
      hostCreateElement = options.createElement,
      hostCreateText = options.createText,
      hostCreateComment = options.createComment,
      hostSetText = options.setText,
      hostSetElementText = options.setElementText,
      hostParentNode = options.parentNode,
      hostNextSibling = options.nextSibling,
      _options$setScopeId = options.setScopeId,
      hostSetScopeId = _options$setScopeId === void 0 ? NOOP : _options$setScopeId,
      hostInsertStaticContent = options.insertStaticContent;
    // Note: functions inside this closure should use `const xxx = () => {}`
    // style in order to prevent being inlined by minifiers.
    var patch = function patch(n1, n2, container) {
      var anchor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      var parentComponent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var parentSuspense = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
      var isSVG = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var slotScopeIds = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var optimized = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : process.env.NODE_ENV !== 'production' && isHmrUpdating ? false : !!n2.dynamicChildren;
      if (n1 === n2) {
        return;
      }
      // patching & not same type, unmount old tree
      if (n1 && !isSameVNodeType(n1, n2)) {
        anchor = getNextHostNode(n1);
        unmount(n1, parentComponent, parentSuspense, true);
        n1 = null;
      }
      if (n2.patchFlag === -2 /* PatchFlags.BAIL */) {
        optimized = false;
        n2.dynamicChildren = null;
      }
      var type = n2.type,
        ref = n2.ref,
        shapeFlag = n2.shapeFlag;
      switch (type) {
        case Text:
          processText(n1, n2, container, anchor);
          break;
        case Comment:
          processCommentNode(n1, n2, container, anchor);
          break;
        case Static:
          if (n1 == null) {
            mountStaticNode(n2, container, anchor, isSVG);
          } else if (process.env.NODE_ENV !== 'production') {
            patchStaticNode(n1, n2, container, isSVG);
          }
          break;
        case Fragment:
          processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          break;
        default:
          if (shapeFlag & 1 /* ShapeFlags.ELEMENT */) {
            processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
            processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (shapeFlag & 64 /* ShapeFlags.TELEPORT */) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (shapeFlag & 128 /* ShapeFlags.SUSPENSE */) {
            type.process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals);
          } else if (process.env.NODE_ENV !== 'production') {
            warn$1('Invalid VNode type:', type, "(".concat(_typeof(type), ")"));
          }
      }
      // set ref
      if (ref != null && parentComponent) {
        setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
      }
    };
    var processText = function processText(n1, n2, container, anchor) {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
      } else {
        var el = n2.el = n1.el;
        if (n2.children !== n1.children) {
          hostSetText(el, n2.children);
        }
      }
    };
    var processCommentNode = function processCommentNode(n1, n2, container, anchor) {
      if (n1 == null) {
        hostInsert(n2.el = hostCreateComment(n2.children || ''), container, anchor);
      } else {
        // there's no support for dynamic comments
        n2.el = n1.el;
      }
    };
    var mountStaticNode = function mountStaticNode(n2, container, anchor, isSVG) {
      var _hostInsertStaticCont = hostInsertStaticContent(n2.children, container, anchor, isSVG, n2.el, n2.anchor);
      var _hostInsertStaticCont2 = _slicedToArray(_hostInsertStaticCont, 2);
      n2.el = _hostInsertStaticCont2[0];
      n2.anchor = _hostInsertStaticCont2[1];
    };
    /**
     * Dev / HMR only
     */
    var patchStaticNode = function patchStaticNode(n1, n2, container, isSVG) {
      // static nodes are only patched during dev for HMR
      if (n2.children !== n1.children) {
        var anchor = hostNextSibling(n1.anchor);
        // remove existing
        removeStaticNode(n1);
        var _hostInsertStaticCont3 = hostInsertStaticContent(n2.children, container, anchor, isSVG);
        var _hostInsertStaticCont4 = _slicedToArray(_hostInsertStaticCont3, 2);
        n2.el = _hostInsertStaticCont4[0];
        n2.anchor = _hostInsertStaticCont4[1];
      } else {
        n2.el = n1.el;
        n2.anchor = n1.anchor;
      }
    };
    var moveStaticNode = function moveStaticNode(_ref15, container, nextSibling) {
      var el = _ref15.el,
        anchor = _ref15.anchor;
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostInsert(el, container, nextSibling);
        el = next;
      }
      hostInsert(anchor, container, nextSibling);
    };
    var removeStaticNode = function removeStaticNode(_ref16) {
      var el = _ref16.el,
        anchor = _ref16.anchor;
      var next;
      while (el && el !== anchor) {
        next = hostNextSibling(el);
        hostRemove(el);
        el = next;
      }
      hostRemove(anchor);
    };
    var processElement = function processElement(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      isSVG = isSVG || n2.type === 'svg';
      if (n1 == null) {
        mountElement(n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    var mountElement = function mountElement(vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      var el;
      var vnodeHook;
      var type = vnode.type,
        props = vnode.props,
        shapeFlag = vnode.shapeFlag,
        transition = vnode.transition,
        dirs = vnode.dirs;
      el = vnode.el = hostCreateElement(vnode.type, isSVG, props && props.is, props);
      // mount children first, since some props may rely on child content
      // being already rendered, e.g. `<select value>`
      if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
        hostSetElementText(el, vnode.children);
      } else if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
        mountChildren(vnode.children, el, null, parentComponent, parentSuspense, isSVG && type !== 'foreignObject', slotScopeIds, optimized);
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'created');
      }
      // scopeId
      setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
      // props
      if (props) {
        for (var key in props) {
          if (key !== 'value' && !isReservedProp(key)) {
            hostPatchProp(el, key, null, props[key], isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        /**
         * Special case for setting value on DOM elements:
         * - it can be order-sensitive (e.g. should be set *after* min/max, #2325, #4024)
         * - it needs to be forced (#1471)
         * #2353 proposes adding another renderer option to configure this, but
         * the properties affects are so finite it is worth special casing it
         * here to reduce the complexity. (Special casing it also should not
         * affect non-DOM renderers)
         */
        if ('value' in props) {
          hostPatchProp(el, 'value', null, props.value);
        }
        if (vnodeHook = props.onVnodeBeforeMount) {
          invokeVNodeHook(vnodeHook, parentComponent, vnode);
        }
      }
      if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
        Object.defineProperty(el, '__vnode', {
          value: vnode,
          enumerable: false
        });
        Object.defineProperty(el, '__vueParentComponent', {
          value: parentComponent,
          enumerable: false
        });
      }
      if (dirs) {
        invokeDirectiveHook(vnode, null, parentComponent, 'beforeMount');
      }
      // #1583 For inside suspense + suspense not resolved case, enter hook should call when suspense resolved
      // #1689 For inside suspense + suspense resolved case, just call it
      var needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
      if (needCallTransitionHooks) {
        transition.beforeEnter(el);
      }
      hostInsert(el, container, anchor);
      if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) {
        queuePostRenderEffect(function () {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          needCallTransitionHooks && transition.enter(el);
          dirs && invokeDirectiveHook(vnode, null, parentComponent, 'mounted');
        }, parentSuspense);
      }
    };
    var setScopeId = function setScopeId(el, vnode, scopeId, slotScopeIds, parentComponent) {
      if (scopeId) {
        hostSetScopeId(el, scopeId);
      }
      if (slotScopeIds) {
        for (var i = 0; i < slotScopeIds.length; i++) {
          hostSetScopeId(el, slotScopeIds[i]);
        }
      }
      if (parentComponent) {
        var subTree = parentComponent.subTree;
        if (process.env.NODE_ENV !== 'production' && subTree.patchFlag > 0 && subTree.patchFlag & 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */) {
          subTree = filterSingleRoot(subTree.children) || subTree;
        }
        if (vnode === subTree) {
          var parentVNode = parentComponent.vnode;
          setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
        }
      }
    };
    var mountChildren = function mountChildren(children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      var start = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;
      for (var i = start; i < children.length; i++) {
        var child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
        patch(null, child, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
    };
    var patchElement = function patchElement(n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      var el = n2.el = n1.el;
      var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren,
        dirs = n2.dirs;
      // #1426 take the old vnode's patch flag into account since user may clone a
      // compiler-generated vnode, which de-opts to FULL_PROPS
      patchFlag |= n1.patchFlag & 16 /* PatchFlags.FULL_PROPS */;
      var oldProps = n1.props || EMPTY_OBJ;
      var newProps = n2.props || EMPTY_OBJ;
      var vnodeHook;
      // disable recurse in beforeUpdate hooks
      parentComponent && toggleRecurse(parentComponent, false);
      if (vnodeHook = newProps.onVnodeBeforeUpdate) {
        invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
      }
      if (dirs) {
        invokeDirectiveHook(n2, n1, parentComponent, 'beforeUpdate');
      }
      parentComponent && toggleRecurse(parentComponent, true);
      if (process.env.NODE_ENV !== 'production' && isHmrUpdating) {
        // HMR updated, force full diff
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      var areChildrenSVG = isSVG && n2.type !== 'foreignObject';
      if (dynamicChildren) {
        patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds);
        if (process.env.NODE_ENV !== 'production' && parentComponent && parentComponent.type.__hmrId) {
          traverseStaticChildren(n1, n2);
        }
      } else if (!optimized) {
        // full diff
        patchChildren(n1, n2, el, null, parentComponent, parentSuspense, areChildrenSVG, slotScopeIds, false);
      }
      if (patchFlag > 0) {
        // the presence of a patchFlag means this element's render code was
        // generated by the compiler and can take the fast path.
        // in this path old node and new node are guaranteed to have the same shape
        // (i.e. at the exact same position in the source template)
        if (patchFlag & 16 /* PatchFlags.FULL_PROPS */) {
          // element props contain dynamic keys, full diff needed
          patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
        } else {
          // class
          // this flag is matched when the element has dynamic class bindings.
          if (patchFlag & 2 /* PatchFlags.CLASS */) {
            if (oldProps["class"] !== newProps["class"]) {
              hostPatchProp(el, 'class', null, newProps["class"], isSVG);
            }
          }
          // style
          // this flag is matched when the element has dynamic style bindings
          if (patchFlag & 4 /* PatchFlags.STYLE */) {
            hostPatchProp(el, 'style', oldProps.style, newProps.style, isSVG);
          }
          // props
          // This flag is matched when the element has dynamic prop/attr bindings
          // other than class and style. The keys of dynamic prop/attrs are saved for
          // faster iteration.
          // Note dynamic keys like :[foo]="bar" will cause this optimization to
          // bail out and go through a full diff because we need to unset the old key
          if (patchFlag & 8 /* PatchFlags.PROPS */) {
            // if the flag is present then dynamicProps must be non-null
            var propsToUpdate = n2.dynamicProps;
            for (var i = 0; i < propsToUpdate.length; i++) {
              var key = propsToUpdate[i];
              var prev = oldProps[key];
              var next = newProps[key];
              // #1471 force patch value
              if (next !== prev || key === 'value') {
                hostPatchProp(el, key, prev, next, isSVG, n1.children, parentComponent, parentSuspense, unmountChildren);
              }
            }
          }
        }
        // text
        // This flag is matched when the element has only dynamic text children.
        if (patchFlag & 1 /* PatchFlags.TEXT */) {
          if (n1.children !== n2.children) {
            hostSetElementText(el, n2.children);
          }
        }
      } else if (!optimized && dynamicChildren == null) {
        // unoptimized, full diff
        patchProps(el, n2, oldProps, newProps, parentComponent, parentSuspense, isSVG);
      }
      if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
        queuePostRenderEffect(function () {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
          dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated');
        }, parentSuspense);
      }
    };
    // The fast path for blocks.
    var patchBlockChildren = function patchBlockChildren(oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) {
      for (var i = 0; i < newChildren.length; i++) {
        var oldVNode = oldChildren[i];
        var newVNode = newChildren[i];
        // Determine the container (parent element) for the patch.
        var container =
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        oldVNode.el && (
        // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        oldVNode.type === Fragment ||
        // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !isSameVNodeType(oldVNode, newVNode) ||
        // - In the case of a component, it could contain anything.
        oldVNode.shapeFlag & (6 /* ShapeFlags.COMPONENT */ | 64 /* ShapeFlags.TELEPORT */)) ? hostParentNode(oldVNode.el) :
        // In other cases, the parent container is not actually used so we
        // just pass the block element here to avoid a DOM parentNode call.
        fallbackContainer;
        patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, true);
      }
    };
    var patchProps = function patchProps(el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) {
      if (oldProps !== newProps) {
        if (oldProps !== EMPTY_OBJ) {
          for (var key in oldProps) {
            if (!isReservedProp(key) && !(key in newProps)) {
              hostPatchProp(el, key, oldProps[key], null, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
            }
          }
        }
        for (var _key14 in newProps) {
          // empty string is not valid prop
          if (isReservedProp(_key14)) continue;
          var next = newProps[_key14];
          var prev = oldProps[_key14];
          // defer patching value
          if (next !== prev && _key14 !== 'value') {
            hostPatchProp(el, _key14, prev, next, isSVG, vnode.children, parentComponent, parentSuspense, unmountChildren);
          }
        }
        if ('value' in newProps) {
          hostPatchProp(el, 'value', oldProps.value, newProps.value);
        }
      }
    };
    var processFragment = function processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      var fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText('');
      var fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText('');
      var patchFlag = n2.patchFlag,
        dynamicChildren = n2.dynamicChildren,
        fragmentSlotScopeIds = n2.slotScopeIds;
      if (process.env.NODE_ENV !== 'production' && (
      // #5523 dev root fragment may inherit directives
      isHmrUpdating || patchFlag & 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */)) {
        // HMR updated / Dev root fragment (w/ comments), force full diff
        patchFlag = 0;
        optimized = false;
        dynamicChildren = null;
      }
      // check if this is a slot fragment with :slotted scope ids
      if (fragmentSlotScopeIds) {
        slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
      }
      if (n1 == null) {
        hostInsert(fragmentStartAnchor, container, anchor);
        hostInsert(fragmentEndAnchor, container, anchor);
        // a fragment can only have array children
        // since they are either generated by the compiler, or implicitly created
        // from arrays.
        mountChildren(n2.children, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      } else {
        if (patchFlag > 0 && patchFlag & 64 /* PatchFlags.STABLE_FRAGMENT */ && dynamicChildren &&
        // #2715 the previous fragment could've been a BAILed one as a result
        // of renderSlot() with no valid children
        n1.dynamicChildren) {
          // a stable fragment (template root or <template v-for>) doesn't need to
          // patch children order, but it may contain dynamicChildren.
          patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, isSVG, slotScopeIds);
          if (process.env.NODE_ENV !== 'production' && parentComponent && parentComponent.type.__hmrId) {
            traverseStaticChildren(n1, n2);
          } else if (
          // #2080 if the stable fragment has a key, it's a <template v-for> that may
          //  get moved around. Make sure all root level vnodes inherit el.
          // #2134 or if it's a component root, it may also get moved around
          // as the component is being moved.
          n2.key != null || parentComponent && n2 === parentComponent.subTree) {
            traverseStaticChildren(n1, n2, true /* shallow */);
          }
        } else {
          // keyed / unkeyed, or manual fragments.
          // for keyed & unkeyed, since they are compiler generated from v-for,
          // each child is guaranteed to be a block so the fragment will never
          // have dynamicChildren.
          patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        }
      }
    };
    var processComponent = function processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      n2.slotScopeIds = slotScopeIds;
      if (n1 == null) {
        if (n2.shapeFlag & 512 /* ShapeFlags.COMPONENT_KEPT_ALIVE */) {
          parentComponent.ctx.activate(n2, container, anchor, isSVG, optimized);
        } else {
          mountComponent(n2, container, anchor, parentComponent, parentSuspense, isSVG, optimized);
        }
      } else {
        updateComponent(n1, n2, optimized);
      }
    };
    var mountComponent = function mountComponent(initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) {
      var instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
      if (process.env.NODE_ENV !== 'production' && instance.type.__hmrId) {
        registerHMR(instance);
      }
      if (process.env.NODE_ENV !== 'production') {
        pushWarningContext(initialVNode);
        startMeasure(instance, "mount");
      }
      // inject renderer internals for keepAlive
      if (isKeepAlive(initialVNode)) {
        instance.ctx.renderer = internals;
      }
      // resolve props and slots for setup context
      {
        if (process.env.NODE_ENV !== 'production') {
          startMeasure(instance, "init");
        }
        setupComponent(instance);
        if (process.env.NODE_ENV !== 'production') {
          endMeasure(instance, "init");
        }
      }
      // setup() is async. This component relies on async logic to be resolved
      // before proceeding
      if (instance.asyncDep) {
        parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
        // Give it a placeholder if this is not hydration
        // TODO handle self-defined fallback
        if (!initialVNode.el) {
          var placeholder = instance.subTree = createVNode(Comment);
          processCommentNode(null, placeholder, container, anchor);
        }
        return;
      }
      setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
      if (process.env.NODE_ENV !== 'production') {
        popWarningContext();
        endMeasure(instance, "mount");
      }
    };
    var updateComponent = function updateComponent(n1, n2, optimized) {
      var instance = n2.component = n1.component;
      if (shouldUpdateComponent(n1, n2, optimized)) {
        if (instance.asyncDep && !instance.asyncResolved) {
          // async & still pending - just update props and slots
          // since the component's reactive effect for render isn't set-up yet
          if (process.env.NODE_ENV !== 'production') {
            pushWarningContext(n2);
          }
          updateComponentPreRender(instance, n2, optimized);
          if (process.env.NODE_ENV !== 'production') {
            popWarningContext();
          }
          return;
        } else {
          // normal update
          instance.next = n2;
          // in case the child component is also queued, remove it to avoid
          // double updating the same child component in the same flush.
          invalidateJob(instance.update);
          // instance.update is the reactive effect.
          instance.update();
        }
      } else {
        // no update needed. just copy over properties
        n2.el = n1.el;
        instance.vnode = n2;
      }
    };
    var setupRenderEffect = function setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) {
      var componentUpdateFn = function componentUpdateFn() {
        if (!instance.isMounted) {
          var vnodeHook;
          var _initialVNode = initialVNode,
            el = _initialVNode.el,
            props = _initialVNode.props;
          var bm = instance.bm,
            m = instance.m,
            parent = instance.parent;
          var isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
          toggleRecurse(instance, false);
          // beforeMount hook
          if (bm) {
            invokeArrayFns(bm);
          }
          // onVnodeBeforeMount
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) {
            invokeVNodeHook(vnodeHook, parent, initialVNode);
          }
          toggleRecurse(instance, true);
          if (el && hydrateNode) {
            // vnode has adopted host node - perform hydration instead of mount.
            var hydrateSubTree = function hydrateSubTree() {
              if (process.env.NODE_ENV !== 'production') {
                startMeasure(instance, "render");
              }
              instance.subTree = renderComponentRoot(instance);
              if (process.env.NODE_ENV !== 'production') {
                endMeasure(instance, "render");
              }
              if (process.env.NODE_ENV !== 'production') {
                startMeasure(instance, "hydrate");
              }
              hydrateNode(el, instance.subTree, instance, parentSuspense, null);
              if (process.env.NODE_ENV !== 'production') {
                endMeasure(instance, "hydrate");
              }
            };
            if (isAsyncWrapperVNode) {
              initialVNode.type.__asyncLoader().then(
              // note: we are moving the render call into an async callback,
              // which means it won't track dependencies - but it's ok because
              // a server-rendered async wrapper is already in resolved state
              // and it will never need to change.
              function () {
                return !instance.isUnmounted && hydrateSubTree();
              });
            } else {
              hydrateSubTree();
            }
          } else {
            if (process.env.NODE_ENV !== 'production') {
              startMeasure(instance, "render");
            }
            var subTree = instance.subTree = renderComponentRoot(instance);
            if (process.env.NODE_ENV !== 'production') {
              endMeasure(instance, "render");
            }
            if (process.env.NODE_ENV !== 'production') {
              startMeasure(instance, "patch");
            }
            patch(null, subTree, container, anchor, instance, parentSuspense, isSVG);
            if (process.env.NODE_ENV !== 'production') {
              endMeasure(instance, "patch");
            }
            initialVNode.el = subTree.el;
          }
          // mounted hook
          if (m) {
            queuePostRenderEffect(m, parentSuspense);
          }
          // onVnodeMounted
          if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
            var scopedInitialVNode = initialVNode;
            queuePostRenderEffect(function () {
              return invokeVNodeHook(vnodeHook, parent, scopedInitialVNode);
            }, parentSuspense);
          }
          // activated hook for keep-alive roots.
          // #1742 activated hook must be accessed after first render
          // since the hook may be injected by a child keep-alive
          if (initialVNode.shapeFlag & 256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE */ || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE */) {
            instance.a && queuePostRenderEffect(instance.a, parentSuspense);
          }
          instance.isMounted = true;
          if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
            devtoolsComponentAdded(instance);
          }
          // #2458: deference mount-only object parameters to prevent memleaks
          initialVNode = container = anchor = null;
        } else {
          // updateComponent
          // This is triggered by mutation of component's own state (next: null)
          // OR parent calling processComponent (next: VNode)
          var next = instance.next,
            bu = instance.bu,
            u = instance.u,
            _parent = instance.parent,
            vnode = instance.vnode;
          var originNext = next;
          var _vnodeHook;
          if (process.env.NODE_ENV !== 'production') {
            pushWarningContext(next || instance.vnode);
          }
          // Disallow component effect recursion during pre-lifecycle hooks.
          toggleRecurse(instance, false);
          if (next) {
            next.el = vnode.el;
            updateComponentPreRender(instance, next, optimized);
          } else {
            next = vnode;
          }
          // beforeUpdate hook
          if (bu) {
            invokeArrayFns(bu);
          }
          // onVnodeBeforeUpdate
          if (_vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
            invokeVNodeHook(_vnodeHook, _parent, next, vnode);
          }
          toggleRecurse(instance, true);
          // render
          if (process.env.NODE_ENV !== 'production') {
            startMeasure(instance, "render");
          }
          var nextTree = renderComponentRoot(instance);
          if (process.env.NODE_ENV !== 'production') {
            endMeasure(instance, "render");
          }
          var prevTree = instance.subTree;
          instance.subTree = nextTree;
          if (process.env.NODE_ENV !== 'production') {
            startMeasure(instance, "patch");
          }
          patch(prevTree, nextTree,
          // parent may have changed if it's in a teleport
          hostParentNode(prevTree.el),
          // anchor may have changed if it's in a fragment
          getNextHostNode(prevTree), instance, parentSuspense, isSVG);
          if (process.env.NODE_ENV !== 'production') {
            endMeasure(instance, "patch");
          }
          next.el = nextTree.el;
          if (originNext === null) {
            // self-triggered update. In case of HOC, update parent component
            // vnode el. HOC is indicated by parent instance's subTree pointing
            // to child component's vnode
            updateHOCHostEl(instance, nextTree.el);
          }
          // updated hook
          if (u) {
            queuePostRenderEffect(u, parentSuspense);
          }
          // onVnodeUpdated
          if (_vnodeHook = next.props && next.props.onVnodeUpdated) {
            queuePostRenderEffect(function () {
              return invokeVNodeHook(_vnodeHook, _parent, next, vnode);
            }, parentSuspense);
          }
          if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
            devtoolsComponentUpdated(instance);
          }
          if (process.env.NODE_ENV !== 'production') {
            popWarningContext();
          }
        }
      };
      // create reactive effect for rendering
      var effect = instance.effect = new ReactiveEffect(componentUpdateFn, function () {
        return queueJob(update);
      }, instance.scope // track it in component's effect scope
      );

      var update = instance.update = function () {
        return effect.run();
      };
      update.id = instance.uid;
      // allowRecurse
      // #1801, #2043 component render effects should allow recursive updates
      toggleRecurse(instance, true);
      if (process.env.NODE_ENV !== 'production') {
        effect.onTrack = instance.rtc ? function (e) {
          return invokeArrayFns(instance.rtc, e);
        } : void 0;
        effect.onTrigger = instance.rtg ? function (e) {
          return invokeArrayFns(instance.rtg, e);
        } : void 0;
        update.ownerInstance = instance;
      }
      update();
    };
    var updateComponentPreRender = function updateComponentPreRender(instance, nextVNode, optimized) {
      nextVNode.component = instance;
      var prevProps = instance.vnode.props;
      instance.vnode = nextVNode;
      instance.next = null;
      updateProps(instance, nextVNode.props, prevProps, optimized);
      updateSlots(instance, nextVNode.children, optimized);
      pauseTracking();
      // props update may have triggered pre-flush watchers.
      // flush them before the render update.
      flushPreFlushCbs();
      resetTracking();
    };
    var patchChildren = function patchChildren(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds) {
      var optimized = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
      var c1 = n1 && n1.children;
      var prevShapeFlag = n1 ? n1.shapeFlag : 0;
      var c2 = n2.children;
      var patchFlag = n2.patchFlag,
        shapeFlag = n2.shapeFlag;
      // fast path
      if (patchFlag > 0) {
        if (patchFlag & 128 /* PatchFlags.KEYED_FRAGMENT */) {
          // this could be either fully-keyed or mixed (some keyed some not)
          // presence of patchFlag means children are guaranteed to be arrays
          patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        } else if (patchFlag & 256 /* PatchFlags.UNKEYED_FRAGMENT */) {
          // unkeyed
          patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          return;
        }
      }
      // children has 3 possibilities: text, array or no children.
      if (shapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
        // text children fast path
        if (prevShapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
          unmountChildren(c1, parentComponent, parentSuspense);
        }
        if (c2 !== c1) {
          hostSetElementText(container, c2);
        }
      } else {
        if (prevShapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
          // prev children was array
          if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
            // two arrays, cannot assume anything, do full diff
            patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else {
            // no new children, just unmount old
            unmountChildren(c1, parentComponent, parentSuspense, true);
          }
        } else {
          // prev children was text OR null
          // new children is array OR null
          if (prevShapeFlag & 8 /* ShapeFlags.TEXT_CHILDREN */) {
            hostSetElementText(container, '');
          }
          // mount new if array
          if (shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
            mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          }
        }
      }
    };
    var patchUnkeyedChildren = function patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      c1 = c1 || EMPTY_ARR;
      c2 = c2 || EMPTY_ARR;
      var oldLength = c1.length;
      var newLength = c2.length;
      var commonLength = Math.min(oldLength, newLength);
      var i;
      for (i = 0; i < commonLength; i++) {
        var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
      }
      if (oldLength > newLength) {
        // remove old
        unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
      } else {
        // mount new
        mountChildren(c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, commonLength);
      }
    };
    // can be all-keyed or mixed
    var patchKeyedChildren = function patchKeyedChildren(c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) {
      var i = 0;
      var l2 = c2.length;
      var e1 = c1.length - 1; // prev ending index
      var e2 = l2 - 1; // next ending index
      // 1. sync from start
      // (a b) c
      // (a b) d e
      while (i <= e1 && i <= e2) {
        var n1 = c1[i];
        var n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (isSameVNodeType(n1, n2)) {
          patch(n1, n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        i++;
      }
      // 2. sync from end
      // a (b c)
      // d e (b c)
      while (i <= e1 && i <= e2) {
        var _n = c1[e1];
        var _n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
        if (isSameVNodeType(_n, _n2)) {
          patch(_n, _n2, container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
        } else {
          break;
        }
        e1--;
        e2--;
      }
      // 3. common sequence + mount
      // (a b)
      // (a b) c
      // i = 2, e1 = 1, e2 = 2
      // (a b)
      // c (a b)
      // i = 0, e1 = -1, e2 = 0
      if (i > e1) {
        if (i <= e2) {
          var nextPos = e2 + 1;
          var anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
          while (i <= e2) {
            patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            i++;
          }
        }
      }
      // 4. common sequence + unmount
      // (a b) c
      // (a b)
      // i = 2, e1 = 2, e2 = 1
      // a (b c)
      // (b c)
      // i = 0, e1 = 0, e2 = -1
      else if (i > e2) {
        while (i <= e1) {
          unmount(c1[i], parentComponent, parentSuspense, true);
          i++;
        }
      }
      // 5. unknown sequence
      // [i ... e1 + 1]: a b [c d e] f g
      // [i ... e2 + 1]: a b [e d c h] f g
      // i = 2, e1 = 4, e2 = 5
      else {
        var s1 = i; // prev starting index
        var s2 = i; // next starting index
        // 5.1 build key:index map for newChildren
        var keyToNewIndexMap = new Map();
        for (i = s2; i <= e2; i++) {
          var nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
          if (nextChild.key != null) {
            if (process.env.NODE_ENV !== 'production' && keyToNewIndexMap.has(nextChild.key)) {
              warn$1("Duplicate keys found during update:", JSON.stringify(nextChild.key), "Make sure keys are unique.");
            }
            keyToNewIndexMap.set(nextChild.key, i);
          }
        }
        // 5.2 loop through old children left to be patched and try to patch
        // matching nodes & remove nodes that are no longer present
        var j;
        var patched = 0;
        var toBePatched = e2 - s2 + 1;
        var moved = false;
        // used to track whether any node has moved
        var maxNewIndexSoFar = 0;
        // works as Map<newIndex, oldIndex>
        // Note that oldIndex is offset by +1
        // and oldIndex = 0 is a special value indicating the new node has
        // no corresponding old node.
        // used for determining longest stable subsequence
        var newIndexToOldIndexMap = new Array(toBePatched);
        for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
        for (i = s1; i <= e1; i++) {
          var prevChild = c1[i];
          if (patched >= toBePatched) {
            // all new children have been patched so this can only be a removal
            unmount(prevChild, parentComponent, parentSuspense, true);
            continue;
          }
          var newIndex = void 0;
          if (prevChild.key != null) {
            newIndex = keyToNewIndexMap.get(prevChild.key);
          } else {
            // key-less node, try to locate a key-less node of the same type
            for (j = s2; j <= e2; j++) {
              if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
                newIndex = j;
                break;
              }
            }
          }
          if (newIndex === undefined) {
            unmount(prevChild, parentComponent, parentSuspense, true);
          } else {
            newIndexToOldIndexMap[newIndex - s2] = i + 1;
            if (newIndex >= maxNewIndexSoFar) {
              maxNewIndexSoFar = newIndex;
            } else {
              moved = true;
            }
            patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
            patched++;
          }
        }
        // 5.3 move and mount
        // generate longest stable subsequence only when nodes have moved
        var increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
        j = increasingNewIndexSequence.length - 1;
        // looping backwards so that we can use last patched node as anchor
        for (i = toBePatched - 1; i >= 0; i--) {
          var nextIndex = s2 + i;
          var _nextChild = c2[nextIndex];
          var _anchor2 = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
          if (newIndexToOldIndexMap[i] === 0) {
            // mount new
            patch(null, _nextChild, container, _anchor2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized);
          } else if (moved) {
            // move if:
            // There is no stable subsequence (e.g. a reverse)
            // OR current node is not among the stable sequence
            if (j < 0 || i !== increasingNewIndexSequence[j]) {
              move(_nextChild, container, _anchor2, 2 /* MoveType.REORDER */);
            } else {
              j--;
            }
          }
        }
      }
    };
    var move = function move(vnode, container, anchor, moveType) {
      var parentSuspense = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var el = vnode.el,
        type = vnode.type,
        transition = vnode.transition,
        children = vnode.children,
        shapeFlag = vnode.shapeFlag;
      if (shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
        move(vnode.component.subTree, container, anchor, moveType);
        return;
      }
      if (shapeFlag & 128 /* ShapeFlags.SUSPENSE */) {
        vnode.suspense.move(container, anchor, moveType);
        return;
      }
      if (shapeFlag & 64 /* ShapeFlags.TELEPORT */) {
        type.move(vnode, container, anchor, internals);
        return;
      }
      if (type === Fragment) {
        hostInsert(el, container, anchor);
        for (var i = 0; i < children.length; i++) {
          move(children[i], container, anchor, moveType);
        }
        hostInsert(vnode.anchor, container, anchor);
        return;
      }
      if (type === Static) {
        moveStaticNode(vnode, container, anchor);
        return;
      }
      // single nodes
      var needTransition = moveType !== 2 /* MoveType.REORDER */ && shapeFlag & 1 /* ShapeFlags.ELEMENT */ && transition;
      if (needTransition) {
        if (moveType === 0 /* MoveType.ENTER */) {
          transition.beforeEnter(el);
          hostInsert(el, container, anchor);
          queuePostRenderEffect(function () {
            return transition.enter(el);
          }, parentSuspense);
        } else {
          var leave = transition.leave,
            delayLeave = transition.delayLeave,
            afterLeave = transition.afterLeave;
          var _remove = function _remove() {
            return hostInsert(el, container, anchor);
          };
          var performLeave = function performLeave() {
            leave(el, function () {
              _remove();
              afterLeave && afterLeave();
            });
          };
          if (delayLeave) {
            delayLeave(el, _remove, performLeave);
          } else {
            performLeave();
          }
        }
      } else {
        hostInsert(el, container, anchor);
      }
    };
    var unmount = function unmount(vnode, parentComponent, parentSuspense) {
      var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var optimized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var type = vnode.type,
        props = vnode.props,
        ref = vnode.ref,
        children = vnode.children,
        dynamicChildren = vnode.dynamicChildren,
        shapeFlag = vnode.shapeFlag,
        patchFlag = vnode.patchFlag,
        dirs = vnode.dirs;
      // unset ref
      if (ref != null) {
        setRef(ref, null, parentSuspense, vnode, true);
      }
      if (shapeFlag & 256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE */) {
        parentComponent.ctx.deactivate(vnode);
        return;
      }
      var shouldInvokeDirs = shapeFlag & 1 /* ShapeFlags.ELEMENT */ && dirs;
      var shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
      var vnodeHook;
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
      if (shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
        unmountComponent(vnode.component, parentSuspense, doRemove);
      } else {
        if (shapeFlag & 128 /* ShapeFlags.SUSPENSE */) {
          vnode.suspense.unmount(parentSuspense, doRemove);
          return;
        }
        if (shouldInvokeDirs) {
          invokeDirectiveHook(vnode, null, parentComponent, 'beforeUnmount');
        }
        if (shapeFlag & 64 /* ShapeFlags.TELEPORT */) {
          vnode.type.remove(vnode, parentComponent, parentSuspense, optimized, internals, doRemove);
        } else if (dynamicChildren && (
        // #1153: fast path should not be taken for non-stable (v-for) fragments
        type !== Fragment || patchFlag > 0 && patchFlag & 64 /* PatchFlags.STABLE_FRAGMENT */)) {
          // fast path for block nodes: only need to unmount dynamic children.
          unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
        } else if (type === Fragment && patchFlag & (128 /* PatchFlags.KEYED_FRAGMENT */ | 256 /* PatchFlags.UNKEYED_FRAGMENT */) || !optimized && shapeFlag & 16 /* ShapeFlags.ARRAY_CHILDREN */) {
          unmountChildren(children, parentComponent, parentSuspense);
        }
        if (doRemove) {
          remove(vnode);
        }
      }
      if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs) {
        queuePostRenderEffect(function () {
          vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
          shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, 'unmounted');
        }, parentSuspense);
      }
    };
    var remove = function remove(vnode) {
      var type = vnode.type,
        el = vnode.el,
        anchor = vnode.anchor,
        transition = vnode.transition;
      if (type === Fragment) {
        if (process.env.NODE_ENV !== 'production' && vnode.patchFlag > 0 && vnode.patchFlag & 2048 /* PatchFlags.DEV_ROOT_FRAGMENT */ && transition && !transition.persisted) {
          vnode.children.forEach(function (child) {
            if (child.type === Comment) {
              hostRemove(child.el);
            } else {
              remove(child);
            }
          });
        } else {
          removeFragment(el, anchor);
        }
        return;
      }
      if (type === Static) {
        removeStaticNode(vnode);
        return;
      }
      var performRemove = function performRemove() {
        hostRemove(el);
        if (transition && !transition.persisted && transition.afterLeave) {
          transition.afterLeave();
        }
      };
      if (vnode.shapeFlag & 1 /* ShapeFlags.ELEMENT */ && transition && !transition.persisted) {
        var leave = transition.leave,
          delayLeave = transition.delayLeave;
        var performLeave = function performLeave() {
          return leave(el, performRemove);
        };
        if (delayLeave) {
          delayLeave(vnode.el, performRemove, performLeave);
        } else {
          performLeave();
        }
      } else {
        performRemove();
      }
    };
    var removeFragment = function removeFragment(cur, end) {
      // For fragments, directly remove all contained DOM nodes.
      // (fragment child nodes cannot have transition)
      var next;
      while (cur !== end) {
        next = hostNextSibling(cur);
        hostRemove(cur);
        cur = next;
      }
      hostRemove(end);
    };
    var unmountComponent = function unmountComponent(instance, parentSuspense, doRemove) {
      if (process.env.NODE_ENV !== 'production' && instance.type.__hmrId) {
        unregisterHMR(instance);
      }
      var bum = instance.bum,
        scope = instance.scope,
        update = instance.update,
        subTree = instance.subTree,
        um = instance.um;
      // beforeUnmount hook
      if (bum) {
        invokeArrayFns(bum);
      }
      // stop effects in component scope
      scope.stop();
      // update may be null if a component is unmounted before its async
      // setup has resolved.
      if (update) {
        // so that scheduler will no longer invoke it
        update.active = false;
        unmount(subTree, instance, parentSuspense, doRemove);
      }
      // unmounted hook
      if (um) {
        queuePostRenderEffect(um, parentSuspense);
      }
      queuePostRenderEffect(function () {
        instance.isUnmounted = true;
      }, parentSuspense);
      // A component with async dep inside a pending suspense is unmounted before
      // its async dep resolves. This should remove the dep from the suspense, and
      // cause the suspense to resolve immediately if that was the last dep.
      if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
        parentSuspense.deps--;
        if (parentSuspense.deps === 0) {
          parentSuspense.resolve();
        }
      }
      if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
        devtoolsComponentRemoved(instance);
      }
    };
    var unmountChildren = function unmountChildren(children, parentComponent, parentSuspense) {
      var doRemove = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var optimized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var start = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      for (var i = start; i < children.length; i++) {
        unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
      }
    };
    var getNextHostNode = function getNextHostNode(vnode) {
      if (vnode.shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
        return getNextHostNode(vnode.component.subTree);
      }
      if (vnode.shapeFlag & 128 /* ShapeFlags.SUSPENSE */) {
        return vnode.suspense.next();
      }
      return hostNextSibling(vnode.anchor || vnode.el);
    };
    var render = function render(vnode, container, isSVG) {
      if (vnode == null) {
        if (container._vnode) {
          unmount(container._vnode, null, null, true);
        }
      } else {
        patch(container._vnode || null, vnode, container, null, null, null, isSVG);
      }
      flushPreFlushCbs();
      flushPostFlushCbs();
      container._vnode = vnode;
    };
    var internals = {
      p: patch,
      um: unmount,
      m: move,
      r: remove,
      mt: mountComponent,
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      n: getNextHostNode,
      o: options
    };
    var hydrate;
    var hydrateNode;
    if (createHydrationFns) {
      var _createHydrationFns = createHydrationFns(internals);
      var _createHydrationFns2 = _slicedToArray(_createHydrationFns, 2);
      hydrate = _createHydrationFns2[0];
      hydrateNode = _createHydrationFns2[1];
    }
    return {
      render: render,
      hydrate: hydrate,
      createApp: createAppAPI(render, hydrate)
    };
  }
  function toggleRecurse(_ref17, allowed) {
    var effect = _ref17.effect,
      update = _ref17.update;
    effect.allowRecurse = update.allowRecurse = allowed;
  }
  /**
   * #1156
   * When a component is HMR-enabled, we need to make sure that all static nodes
   * inside a block also inherit the DOM element from the previous tree so that
   * HMR updates (which are full updates) can retrieve the element for patching.
   *
   * #2080
   * Inside keyed `template` fragment static children, if a fragment is moved,
   * the children will always be moved. Therefore, in order to ensure correct move
   * position, el should be inherited from previous nodes.
   */
  function traverseStaticChildren(n1, n2) {
    var shallow = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var ch1 = n1.children;
    var ch2 = n2.children;
    if (isArray$1(ch1) && isArray$1(ch2)) {
      for (var i = 0; i < ch1.length; i++) {
        // this is only called in the optimized path so array children are
        // guaranteed to be vnodes
        var c1 = ch1[i];
        var c2 = ch2[i];
        if (c2.shapeFlag & 1 /* ShapeFlags.ELEMENT */ && !c2.dynamicChildren) {
          if (c2.patchFlag <= 0 || c2.patchFlag === 32 /* PatchFlags.HYDRATE_EVENTS */) {
            c2 = ch2[i] = cloneIfMounted(ch2[i]);
            c2.el = c1.el;
          }
          if (!shallow) traverseStaticChildren(c1, c2);
        }
        // #6852 also inherit for text nodes
        if (c2.type === Text) {
          c2.el = c1.el;
        }
        // also inherit for comment nodes, but not placeholders (e.g. v-if which
        // would have received .el during block patch)
        if (process.env.NODE_ENV !== 'production' && c2.type === Comment && !c2.el) {
          c2.el = c1.el;
        }
      }
    }
  }
  // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
  function getSequence(arr) {
    var p = arr.slice();
    var result = [0];
    var i, j, u, v, c;
    var len = arr.length;
    for (i = 0; i < len; i++) {
      var arrI = arr[i];
      if (arrI !== 0) {
        j = result[result.length - 1];
        if (arr[j] < arrI) {
          p[i] = j;
          result.push(i);
          continue;
        }
        u = 0;
        v = result.length - 1;
        while (u < v) {
          c = u + v >> 1;
          if (arr[result[c]] < arrI) {
            u = c + 1;
          } else {
            v = c;
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1];
          }
          result[u] = i;
        }
      }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
      result[u] = v;
      v = p[v];
    }
    return result;
  }
  var isTeleport = function isTeleport(type) {
    return type.__isTeleport;
  };
  var Fragment = Symbol(process.env.NODE_ENV !== 'production' ? 'Fragment' : undefined);
  var Text = Symbol(process.env.NODE_ENV !== 'production' ? 'Text' : undefined);
  var Comment = Symbol(process.env.NODE_ENV !== 'production' ? 'Comment' : undefined);
  var Static = Symbol(process.env.NODE_ENV !== 'production' ? 'Static' : undefined);
  var currentBlock = null;
  // Whether we should be tracking dynamic child nodes inside a block.
  // Only tracks when this value is > 0
  // We are not using a simple boolean because this value may need to be
  // incremented/decremented by nested usage of v-once (see below)
  var isBlockTreeEnabled = 1;
  /**
   * Block tracking sometimes needs to be disabled, for example during the
   * creation of a tree that needs to be cached by v-once. The compiler generates
   * code like this:
   *
   * ``` js
   * _cache[1] || (
   *   setBlockTracking(-1),
   *   _cache[1] = createVNode(...),
   *   setBlockTracking(1),
   *   _cache[1]
   * )
   * ```
   *
   * @private
   */
  function setBlockTracking(value) {
    isBlockTreeEnabled += value;
  }

  function isVNode(value) {
    return value ? value.__v_isVNode === true : false;
  }
  function isSameVNodeType(n1, n2) {
    if (process.env.NODE_ENV !== 'production' && n2.shapeFlag & 6 /* ShapeFlags.COMPONENT */ && hmrDirtyComponents.has(n2.type)) {
      // #7042, ensure the vnode being unmounted during HMR
      // bitwise operations to remove keep alive flags
      n1.shapeFlag &= ~256 /* ShapeFlags.COMPONENT_SHOULD_KEEP_ALIVE */;
      n2.shapeFlag &= ~512 /* ShapeFlags.COMPONENT_KEPT_ALIVE */;
      // HMR only: if the component has been hot-updated, force a reload.
      return false;
    }
    return n1.type === n2.type && n1.key === n2.key;
  }
  var createVNodeWithArgsTransform = function createVNodeWithArgsTransform() {
    for (var _len7 = arguments.length, args = new Array(_len7), _key15 = 0; _key15 < _len7; _key15++) {
      args[_key15] = arguments[_key15];
    }
    return _createVNode.apply(void 0, _toConsumableArray(args));
  };
  var InternalObjectKey = "__vInternal";
  var normalizeKey = function normalizeKey(_ref21) {
    var key = _ref21.key;
    return key != null ? key : null;
  };
  var normalizeRef = function normalizeRef(_ref22) {
    var ref = _ref22.ref,
      ref_key = _ref22.ref_key,
      ref_for = _ref22.ref_for;
    return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? {
      i: currentRenderingInstance,
      r: ref,
      k: ref_key,
      f: !!ref_for
    } : ref : null;
  };
  function createBaseVNode(type) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var shapeFlag = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : type === Fragment ? 0 : 1;
    var isBlockNode = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var needFullChildrenNormalization = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;
    var vnode = {
      __v_isVNode: true,
      __v_skip: true,
      type: type,
      props: props,
      key: props && normalizeKey(props),
      ref: props && normalizeRef(props),
      scopeId: currentScopeId,
      slotScopeIds: null,
      children: children,
      component: null,
      suspense: null,
      ssContent: null,
      ssFallback: null,
      dirs: null,
      transition: null,
      el: null,
      anchor: null,
      target: null,
      targetAnchor: null,
      staticCount: 0,
      shapeFlag: shapeFlag,
      patchFlag: patchFlag,
      dynamicProps: dynamicProps,
      dynamicChildren: null,
      appContext: null,
      ctx: currentRenderingInstance
    };
    if (needFullChildrenNormalization) {
      normalizeChildren(vnode, children);
      // normalize suspense children
      if (shapeFlag & 128 /* ShapeFlags.SUSPENSE */) {
        type.normalize(vnode);
      }
    } else if (children) {
      // compiled element vnode - if children is passed, only possible types are
      // string or Array.
      vnode.shapeFlag |= isString(children) ? 8 /* ShapeFlags.TEXT_CHILDREN */ : 16 /* ShapeFlags.ARRAY_CHILDREN */;
    }
    // validate key
    if (process.env.NODE_ENV !== 'production' && vnode.key !== vnode.key) {
      warn$1("VNode created with invalid key (NaN). VNode type:", vnode.type);
    }
    // track vnode for block tree
    if (isBlockTreeEnabled > 0 &&
    // avoid a block node from tracking itself
    !isBlockNode &&
    // has current parent block
    currentBlock && (
    // presence of a patch flag indicates this node needs patching on updates.
    // component nodes also should always be patched, because even if the
    // component doesn't need to update, it needs to persist the instance on to
    // the next vnode so that it can be properly unmounted later.
    vnode.patchFlag > 0 || shapeFlag & 6 /* ShapeFlags.COMPONENT */) &&
    // the EVENTS flag is only for hydration and if it is the only flag, the
    // vnode should not be considered dynamic due to handler caching.
    vnode.patchFlag !== 32 /* PatchFlags.HYDRATE_EVENTS */) {
      currentBlock.push(vnode);
    }
    return vnode;
  }
  var createVNode = process.env.NODE_ENV !== 'production' ? createVNodeWithArgsTransform : _createVNode;
  function _createVNode(type) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var patchFlag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var dynamicProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var isBlockNode = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    if (!type || type === NULL_DYNAMIC_COMPONENT) {
      if (process.env.NODE_ENV !== 'production' && !type) {
        warn$1("Invalid vnode type when creating vnode: ".concat(type, "."));
      }
      type = Comment;
    }
    if (isVNode(type)) {
      // createVNode receiving an existing vnode. This happens in cases like
      // <component :is="vnode"/>
      // #2078 make sure to merge refs during the clone instead of overwriting it
      var cloned = cloneVNode(type, props, true /* mergeRef: true */);
      if (children) {
        normalizeChildren(cloned, children);
      }
      if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
        if (cloned.shapeFlag & 6 /* ShapeFlags.COMPONENT */) {
          currentBlock[currentBlock.indexOf(type)] = cloned;
        } else {
          currentBlock.push(cloned);
        }
      }
      cloned.patchFlag |= -2 /* PatchFlags.BAIL */;
      return cloned;
    }
    // class component normalization.
    if (isClassComponent(type)) {
      type = type.__vccOpts;
    }
    // class & style normalization.
    if (props) {
      // for reactive or proxy objects, we need to clone it to enable mutation.
      props = guardReactiveProps(props);
      var _props = props,
        klass = _props["class"],
        style = _props.style;
      if (klass && !isString(klass)) {
        props["class"] = normalizeClass(klass);
      }
      if (isObject(style)) {
        // reactive state objects need to be cloned since they are likely to be
        // mutated
        if (isProxy(style) && !isArray$1(style)) {
          style = extend({}, style);
        }
        props.style = normalizeStyle(style);
      }
    }
    // encode the vnode type information into a bitmap
    var shapeFlag = isString(type) ? 1 /* ShapeFlags.ELEMENT */ : isSuspense(type) ? 128 /* ShapeFlags.SUSPENSE */ : isTeleport(type) ? 64 /* ShapeFlags.TELEPORT */ : isObject(type) ? 4 /* ShapeFlags.STATEFUL_COMPONENT */ : isFunction(type) ? 2 /* ShapeFlags.FUNCTIONAL_COMPONENT */ : 0;
    if (process.env.NODE_ENV !== 'production' && shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */ && isProxy(type)) {
      type = toRaw(type);
      warn$1("Vue received a Component which was made a reactive object. This can " + "lead to unnecessary performance overhead, and should be avoided by " + "marking the component with `markRaw` or using `shallowRef` " + "instead of `ref`.", "\nComponent that was made reactive: ", type);
    }
    return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
  }
  function guardReactiveProps(props) {
    if (!props) return null;
    return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
  }
  function cloneVNode(vnode, extraProps) {
    var mergeRef = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    // This is intentionally NOT using spread or extend to avoid the runtime
    // key enumeration cost.
    var props = vnode.props,
      ref = vnode.ref,
      patchFlag = vnode.patchFlag,
      children = vnode.children;
    var mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
    var cloned = {
      __v_isVNode: true,
      __v_skip: true,
      type: vnode.type,
      props: mergedProps,
      key: mergedProps && normalizeKey(mergedProps),
      ref: extraProps && extraProps.ref ?
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      mergeRef && ref ? isArray$1(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
      scopeId: vnode.scopeId,
      slotScopeIds: vnode.slotScopeIds,
      children: process.env.NODE_ENV !== 'production' && patchFlag === -1 /* PatchFlags.HOISTED */ && isArray$1(children) ? children.map(deepCloneVNode) : children,
      target: vnode.target,
      targetAnchor: vnode.targetAnchor,
      staticCount: vnode.staticCount,
      shapeFlag: vnode.shapeFlag,
      // if the vnode is cloned with extra props, we can no longer assume its
      // existing patch flag to be reliable and need to add the FULL_PROPS flag.
      // note: preserve flag for fragments since they use the flag for children
      // fast paths only.
      patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 // hoisted node
      ? 16 /* PatchFlags.FULL_PROPS */ : patchFlag | 16 /* PatchFlags.FULL_PROPS */ : patchFlag,
      dynamicProps: vnode.dynamicProps,
      dynamicChildren: vnode.dynamicChildren,
      appContext: vnode.appContext,
      dirs: vnode.dirs,
      transition: vnode.transition,
      // These should technically only be non-null on mounted VNodes. However,
      // they *should* be copied for kept-alive vnodes. So we just always copy
      // them since them being non-null during a mount doesn't affect the logic as
      // they will simply be overwritten.
      component: vnode.component,
      suspense: vnode.suspense,
      ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
      ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
      el: vnode.el,
      anchor: vnode.anchor,
      ctx: vnode.ctx,
      ce: vnode.ce
    };
    return cloned;
  }
  /**
   * Dev only, for HMR of hoisted vnodes reused in v-for
   * https://github.com/vitejs/vite/issues/2022
   */
  function deepCloneVNode(vnode) {
    var cloned = cloneVNode(vnode);
    if (isArray$1(vnode.children)) {
      cloned.children = vnode.children.map(deepCloneVNode);
    }
    return cloned;
  }
  /**
   * @private
   */
  function createTextVNode() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
    var flag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return createVNode(Text, null, text, flag);
  }
  function normalizeVNode(child) {
    if (child == null || typeof child === 'boolean') {
      // empty placeholder
      return createVNode(Comment);
    } else if (isArray$1(child)) {
      // fragment
      return createVNode(Fragment, null,
      // #3666, avoid reference pollution when reusing vnode
      child.slice());
    } else if (_typeof(child) === 'object') {
      // already vnode, this should be the most common since compiled templates
      // always produce all-vnode children arrays
      return cloneIfMounted(child);
    } else {
      // strings and numbers
      return createVNode(Text, null, String(child));
    }
  }
  // optimized normalization for template-compiled render fns
  function cloneIfMounted(child) {
    return child.el === null && child.patchFlag !== -1 /* PatchFlags.HOISTED */ || child.memo ? child : cloneVNode(child);
  }
  function normalizeChildren(vnode, children) {
    var type = 0;
    var shapeFlag = vnode.shapeFlag;
    if (children == null) {
      children = null;
    } else if (isArray$1(children)) {
      type = 16 /* ShapeFlags.ARRAY_CHILDREN */;
    } else if (_typeof(children) === 'object') {
      if (shapeFlag & (1 /* ShapeFlags.ELEMENT */ | 64 /* ShapeFlags.TELEPORT */)) {
        // Normalize slot to plain children for plain element and Teleport
        var slot = children["default"];
        if (slot) {
          // _c marker is added by withCtx() indicating this is a compiled slot
          slot._c && (slot._d = false);
          normalizeChildren(vnode, slot());
          slot._c && (slot._d = true);
        }
        return;
      } else {
        type = 32 /* ShapeFlags.SLOTS_CHILDREN */;
        var slotFlag = children._;
        if (!slotFlag && !(InternalObjectKey in children)) {
          children._ctx = currentRenderingInstance;
        } else if (slotFlag === 3 /* SlotFlags.FORWARDED */ && currentRenderingInstance) {
          // a child component receives forwarded slots from the parent.
          // its slot type is determined by its parent's slot type.
          if (currentRenderingInstance.slots._ === 1 /* SlotFlags.STABLE */) {
            children._ = 1 /* SlotFlags.STABLE */;
          } else {
            children._ = 2 /* SlotFlags.DYNAMIC */;
            vnode.patchFlag |= 1024 /* PatchFlags.DYNAMIC_SLOTS */;
          }
        }
      }
    } else if (isFunction(children)) {
      children = {
        "default": children,
        _ctx: currentRenderingInstance
      };
      type = 32 /* ShapeFlags.SLOTS_CHILDREN */;
    } else {
      children = String(children);
      // force teleport children to array so it can be moved around
      if (shapeFlag & 64 /* ShapeFlags.TELEPORT */) {
        type = 16 /* ShapeFlags.ARRAY_CHILDREN */;
        children = [createTextVNode(children)];
      } else {
        type = 8 /* ShapeFlags.TEXT_CHILDREN */;
      }
    }

    vnode.children = children;
    vnode.shapeFlag |= type;
  }
  function mergeProps() {
    var ret = {};
    for (var i = 0; i < arguments.length; i++) {
      var toMerge = i < 0 || arguments.length <= i ? undefined : arguments[i];
      for (var key in toMerge) {
        if (key === 'class') {
          if (ret["class"] !== toMerge["class"]) {
            ret["class"] = normalizeClass([ret["class"], toMerge["class"]]);
          }
        } else if (key === 'style') {
          ret.style = normalizeStyle([ret.style, toMerge.style]);
        } else if (isOn(key)) {
          var existing = ret[key];
          var incoming = toMerge[key];
          if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
            ret[key] = existing ? [].concat(existing, incoming) : incoming;
          }
        } else if (key !== '') {
          ret[key] = toMerge[key];
        }
      }
    }
    return ret;
  }
  function invokeVNodeHook(hook, instance, vnode) {
    var prevVNode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    callWithAsyncErrorHandling(hook, instance, 7 /* ErrorCodes.VNODE_HOOK */, [vnode, prevVNode]);
  }
  var emptyAppContext = createAppContext();
  var uid = 0;
  function createComponentInstance(vnode, parent, suspense) {
    var type = vnode.type;
    // inherit parent app context - or - if root, adopt from root vnode
    var appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
    var instance = {
      uid: uid++,
      vnode: vnode,
      type: type,
      parent: parent,
      appContext: appContext,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new EffectScope(true /* detached */),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: parent ? parent.provides : Object.create(appContext.provides),
      accessCache: null,
      renderCache: [],
      // local resolved assets
      components: null,
      directives: null,
      // resolved props and emits options
      propsOptions: normalizePropsOptions(type, appContext),
      emitsOptions: normalizeEmitsOptions(type, appContext),
      // emit
      emit: null,
      emitted: null,
      // props default value
      propsDefaults: EMPTY_OBJ,
      // inheritAttrs
      inheritAttrs: type.inheritAttrs,
      // state
      ctx: EMPTY_OBJ,
      data: EMPTY_OBJ,
      props: EMPTY_OBJ,
      attrs: EMPTY_OBJ,
      slots: EMPTY_OBJ,
      refs: EMPTY_OBJ,
      setupState: EMPTY_OBJ,
      setupContext: null,
      // suspense related
      suspense: suspense,
      suspenseId: suspense ? suspense.pendingId : 0,
      asyncDep: null,
      asyncResolved: false,
      // lifecycle hooks
      // not using enums here because it results in computed properties
      isMounted: false,
      isUnmounted: false,
      isDeactivated: false,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null
    };
    if (process.env.NODE_ENV !== 'production') {
      instance.ctx = createDevRenderContext(instance);
    } else {
      instance.ctx = {
        _: instance
      };
    }
    instance.root = parent ? parent.root : instance;
    instance.emit = emit.bind(null, instance);
    // apply custom element special handling
    if (vnode.ce) {
      vnode.ce(instance);
    }
    return instance;
  }
  var currentInstance = null;
  var getCurrentInstance = function getCurrentInstance() {
    return currentInstance || currentRenderingInstance;
  };
  var setCurrentInstance = function setCurrentInstance(instance) {
    currentInstance = instance;
    instance.scope.on();
  };
  var unsetCurrentInstance = function unsetCurrentInstance() {
    currentInstance && currentInstance.scope.off();
    currentInstance = null;
  };
  var isBuiltInTag = /*#__PURE__*/makeMap('slot,component');
  function validateComponentName(name, config) {
    var appIsNativeTag = config.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
      warn$1('Do not use built-in or reserved HTML elements as component id: ' + name);
    }
  }
  function isStatefulComponent(instance) {
    return instance.vnode.shapeFlag & 4 /* ShapeFlags.STATEFUL_COMPONENT */;
  }

  var isInSSRComponentSetup = false;
  function setupComponent(instance) {
    var isSSR = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    isInSSRComponentSetup = isSSR;
    var _instance$vnode = instance.vnode,
      props = _instance$vnode.props,
      children = _instance$vnode.children;
    var isStateful = isStatefulComponent(instance);
    initProps(instance, props, isStateful, isSSR);
    initSlots(instance, children);
    var setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
    isInSSRComponentSetup = false;
    return setupResult;
  }
  function setupStatefulComponent(instance, isSSR) {
    var _a;
    var Component = instance.type;
    if (process.env.NODE_ENV !== 'production') {
      if (Component.name) {
        validateComponentName(Component.name, instance.appContext.config);
      }
      if (Component.components) {
        var names = Object.keys(Component.components);
        for (var i = 0; i < names.length; i++) {
          validateComponentName(names[i], instance.appContext.config);
        }
      }
      if (Component.directives) {
        var _names = Object.keys(Component.directives);
        for (var _i4 = 0; _i4 < _names.length; _i4++) {
          validateDirectiveName(_names[_i4]);
        }
      }
      if (Component.compilerOptions && isRuntimeOnly()) {
        warn$1("\"compilerOptions\" is only supported when using a build of Vue that " + "includes the runtime compiler. Since you are using a runtime-only " + "build, the options should be passed via your build tool config instead.");
      }
    }
    // 0. create render proxy property access cache
    instance.accessCache = Object.create(null);
    // 1. create public instance / render proxy
    // also mark it raw so it's never observed
    instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
    if (process.env.NODE_ENV !== 'production') {
      exposePropsOnRenderContext(instance);
    }
    // 2. call setup()
    var setup = Component.setup;
    if (setup) {
      var setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
      setCurrentInstance(instance);
      pauseTracking();
      var setupResult = callWithErrorHandling(setup, instance, 0 /* ErrorCodes.SETUP_FUNCTION */, [process.env.NODE_ENV !== 'production' ? shallowReadonly(instance.props) : instance.props, setupContext]);
      resetTracking();
      unsetCurrentInstance();
      if (isPromise(setupResult)) {
        setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
        if (isSSR) {
          // return the promise so server-renderer can wait on it
          return setupResult.then(function (resolvedResult) {
            handleSetupResult(instance, resolvedResult, isSSR);
          })["catch"](function (e) {
            handleError(e, instance, 0 /* ErrorCodes.SETUP_FUNCTION */);
          });
        } else {
          // async setup returned Promise.
          // bail here and wait for re-entry.
          instance.asyncDep = setupResult;
          if (process.env.NODE_ENV !== 'production' && !instance.suspense) {
            var name = (_a = Component.name) !== null && _a !== void 0 ? _a : 'Anonymous';
            warn$1("Component <".concat(name, ">: setup function returned a promise, but no ") + "<Suspense> boundary was found in the parent component tree. " + "A component with async setup() must be nested in a <Suspense> " + "in order to be rendered.");
          }
        }
      } else {
        handleSetupResult(instance, setupResult, isSSR);
      }
    } else {
      finishComponentSetup(instance, isSSR);
    }
  }
  function handleSetupResult(instance, setupResult, isSSR) {
    if (isFunction(setupResult)) {
      // setup returned an inline render function
      if (instance.type.__ssrInlineRender) {
        // when the function's name is `ssrRender` (compiled by SFC inline mode),
        // set it as ssrRender instead.
        instance.ssrRender = setupResult;
      } else {
        instance.render = setupResult;
      }
    } else if (isObject(setupResult)) {
      if (process.env.NODE_ENV !== 'production' && isVNode(setupResult)) {
        warn$1("setup() should not return VNodes directly - " + "return a render function instead.");
      }
      // setup returned bindings.
      // assuming a render function compiled from template is present.
      if (process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) {
        instance.devtoolsRawSetupState = setupResult;
      }
      instance.setupState = proxyRefs(setupResult);
      if (process.env.NODE_ENV !== 'production') {
        exposeSetupStateOnRenderContext(instance);
      }
    } else if (process.env.NODE_ENV !== 'production' && setupResult !== undefined) {
      warn$1("setup() should return an object. Received: ".concat(setupResult === null ? 'null' : _typeof(setupResult)));
    }
    finishComponentSetup(instance, isSSR);
  }
  var compile;
  // dev only
  var isRuntimeOnly = function isRuntimeOnly() {
    return !compile;
  };
  function finishComponentSetup(instance, isSSR, skipOptions) {
    var Component = instance.type;
    // template / render function normalization
    // could be already set when returned from setup()
    if (!instance.render) {
      // only do on-the-fly compile if not in SSR - SSR on-the-fly compilation
      // is done by server-renderer
      if (!isSSR && compile && !Component.render) {
        var template = Component.template || resolveMergedOptions(instance).template;
        if (template) {
          if (process.env.NODE_ENV !== 'production') {
            startMeasure(instance, "compile");
          }
          var _instance$appContext$ = instance.appContext.config,
            isCustomElement = _instance$appContext$.isCustomElement,
            compilerOptions = _instance$appContext$.compilerOptions;
          var delimiters = Component.delimiters,
            componentCompilerOptions = Component.compilerOptions;
          var finalCompilerOptions = extend(extend({
            isCustomElement: isCustomElement,
            delimiters: delimiters
          }, compilerOptions), componentCompilerOptions);
          Component.render = compile(template, finalCompilerOptions);
          if (process.env.NODE_ENV !== 'production') {
            endMeasure(instance, "compile");
          }
        }
      }
      instance.render = Component.render || NOOP;
    }
    // support for 2.x options
    if (__VUE_OPTIONS_API__ && !false) {
      setCurrentInstance(instance);
      pauseTracking();
      applyOptions(instance);
      resetTracking();
      unsetCurrentInstance();
    }
    // warn missing template/render
    // the runtime compilation of template in SSR is done by server-render
    if (process.env.NODE_ENV !== 'production' && !Component.render && instance.render === NOOP && !isSSR) {
      /* istanbul ignore if */
      if (Component.template) {
        warn$1("Component provided template option but " + "runtime compilation is not supported in this build of Vue." + " Configure your bundler to alias \"vue\" to \"vue/dist/vue.esm-bundler.js\"." /* should not happen */);
      } else {
        warn$1("Component is missing template or render function.");
      }
    }
  }
  function createAttrsProxy(instance) {
    return new Proxy(instance.attrs, process.env.NODE_ENV !== 'production' ? {
      get: function get(target, key) {
        markAttrsAccessed();
        track(instance, "get" /* TrackOpTypes.GET */, '$attrs');
        return target[key];
      },
      set: function set() {
        warn$1("setupContext.attrs is readonly.");
        return false;
      },
      deleteProperty: function deleteProperty() {
        warn$1("setupContext.attrs is readonly.");
        return false;
      }
    } : {
      get: function get(target, key) {
        track(instance, "get" /* TrackOpTypes.GET */, '$attrs');
        return target[key];
      }
    });
  }
  function createSetupContext(instance) {
    var expose = function expose(exposed) {
      if (process.env.NODE_ENV !== 'production') {
        if (instance.exposed) {
          warn$1("expose() should be called only once per setup().");
        }
        if (exposed != null) {
          var exposedType = _typeof(exposed);
          if (exposedType === 'object') {
            if (isArray$1(exposed)) {
              exposedType = 'array';
            } else if (isRef(exposed)) {
              exposedType = 'ref';
            }
          }
          if (exposedType !== 'object') {
            warn$1("expose() should be passed a plain object, received ".concat(exposedType, "."));
          }
        }
      }
      instance.exposed = exposed || {};
    };
    var attrs;
    if (process.env.NODE_ENV !== 'production') {
      // We use getters in dev in case libs like test-utils overwrite instance
      // properties (overwrites should not be done in prod)
      return Object.freeze({
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        get slots() {
          return shallowReadonly(instance.slots);
        },
        get emit() {
          return function (event) {
            for (var _len8 = arguments.length, args = new Array(_len8 > 1 ? _len8 - 1 : 0), _key16 = 1; _key16 < _len8; _key16++) {
              args[_key16 - 1] = arguments[_key16];
            }
            return instance.emit.apply(instance, [event].concat(args));
          };
        },
        expose: expose
      });
    } else {
      return {
        get attrs() {
          return attrs || (attrs = createAttrsProxy(instance));
        },
        slots: instance.slots,
        emit: instance.emit,
        expose: expose
      };
    }
  }
  function getExposeProxy(instance) {
    if (instance.exposed) {
      return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
        get: function get(target, key) {
          if (key in target) {
            return target[key];
          } else if (key in publicPropertiesMap) {
            return publicPropertiesMap[key](instance);
          }
        },
        has: function has(target, key) {
          return key in target || key in publicPropertiesMap;
        }
      }));
    }
  }
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function classify(str) {
    return str.replace(classifyRE, function (c) {
      return c.toUpperCase();
    }).replace(/[-_]/g, '');
  };
  function getComponentName(Component) {
    var includeInferred = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
  }
  /* istanbul ignore next */
  function formatComponentName(instance, Component) {
    var isRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var name = getComponentName(Component);
    if (!name && Component.__file) {
      var match = Component.__file.match(/([^/\\]+)\.\w+$/);
      if (match) {
        name = match[1];
      }
    }
    if (!name && instance && instance.parent) {
      // try to infer the name based on reverse resolution
      var inferFromRegistry = function inferFromRegistry(registry) {
        for (var key in registry) {
          if (registry[key] === Component) {
            return key;
          }
        }
      };
      name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
    }
    return name ? classify(name) : isRoot ? "App" : "Anonymous";
  }
  function isClassComponent(value) {
    return isFunction(value) && '__vccOpts' in value;
  }
  var computed = function computed(getterOrOptions, debugOptions) {
    // @ts-ignore
    return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
  };

  // Actual implementation
  function h(type, propsOrChildren, children) {
    var l = arguments.length;
    if (l === 2) {
      if (isObject(propsOrChildren) && !isArray$1(propsOrChildren)) {
        // single vnode without props
        if (isVNode(propsOrChildren)) {
          return createVNode(type, null, [propsOrChildren]);
        }
        // props without children
        return createVNode(type, propsOrChildren);
      } else {
        // omit props
        return createVNode(type, null, propsOrChildren);
      }
    } else {
      if (l > 3) {
        children = Array.prototype.slice.call(arguments, 2);
      } else if (l === 3 && isVNode(children)) {
        children = [children];
      }
      return createVNode(type, propsOrChildren, children);
    }
  }
  var ssrContextKey = Symbol(process.env.NODE_ENV !== 'production' ? "ssrContext" : "");
  var useSSRContext = function useSSRContext() {
    {
      var ctx = inject(ssrContextKey);
      if (!ctx) {
        process.env.NODE_ENV !== 'production' && warn$1("Server rendering context not provided. Make sure to only call " + "useSSRContext() conditionally in the server build.");
      }
      return ctx;
    }
  };
  function isShallow(value) {
    return !!(value && value["__v_isShallow" /* ReactiveFlags.IS_SHALLOW */]);
  }

  function initCustomFormatter() {
    /* eslint-disable no-restricted-globals */
    if (!(process.env.NODE_ENV !== 'production') || typeof window === 'undefined') {
      return;
    }
    var vueStyle = {
      style: 'color:#3ba776'
    };
    var numberStyle = {
      style: 'color:#0b1bc9'
    };
    var stringStyle = {
      style: 'color:#b62e24'
    };
    var keywordStyle = {
      style: 'color:#9d288c'
    };
    // custom formatter for Chrome
    // https://www.mattzeunert.com/2016/02/19/custom-chrome-devtools-object-formatters.html
    var formatter = {
      header: function header(obj) {
        // TODO also format ComponentPublicInstance & ctx.slots/attrs in setup
        if (!isObject(obj)) {
          return null;
        }
        if (obj.__isVue) {
          return ['div', vueStyle, "VueInstance"];
        } else if (isRef(obj)) {
          return ['div', {}, ['span', vueStyle, genRefFlag(obj)], '<', formatValue(obj.value), ">"];
        } else if (isReactive(obj)) {
          return ['div', {}, ['span', vueStyle, isShallow(obj) ? 'ShallowReactive' : 'Reactive'], '<', formatValue(obj), ">".concat(isReadonly(obj) ? " (readonly)" : "")];
        } else if (isReadonly(obj)) {
          return ['div', {}, ['span', vueStyle, isShallow(obj) ? 'ShallowReadonly' : 'Readonly'], '<', formatValue(obj), '>'];
        }
        return null;
      },
      hasBody: function hasBody(obj) {
        return obj && obj.__isVue;
      },
      body: function body(obj) {
        if (obj && obj.__isVue) {
          return ['div', {}].concat(_toConsumableArray(formatInstance(obj.$)));
        }
      }
    };
    function formatInstance(instance) {
      var blocks = [];
      if (instance.type.props && instance.props) {
        blocks.push(createInstanceBlock('props', toRaw(instance.props)));
      }
      if (instance.setupState !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock('setup', instance.setupState));
      }
      if (instance.data !== EMPTY_OBJ) {
        blocks.push(createInstanceBlock('data', toRaw(instance.data)));
      }
      var computed = extractKeys(instance, 'computed');
      if (computed) {
        blocks.push(createInstanceBlock('computed', computed));
      }
      var injected = extractKeys(instance, 'inject');
      if (injected) {
        blocks.push(createInstanceBlock('injected', injected));
      }
      blocks.push(['div', {}, ['span', {
        style: keywordStyle.style + ';opacity:0.66'
      }, '$ (internal): '], ['object', {
        object: instance
      }]]);
      return blocks;
    }
    function createInstanceBlock(type, target) {
      target = extend({}, target);
      if (!Object.keys(target).length) {
        return ['span', {}];
      }
      return ['div', {
        style: 'line-height:1.25em;margin-bottom:0.6em'
      }, ['div', {
        style: 'color:#476582'
      }, type], ['div', {
        style: 'padding-left:1.25em'
      }].concat(_toConsumableArray(Object.keys(target).map(function (key) {
        return ['div', {}, ['span', keywordStyle, key + ': '], formatValue(target[key], false)];
      })))];
    }
    function formatValue(v) {
      var asRaw = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (typeof v === 'number') {
        return ['span', numberStyle, v];
      } else if (typeof v === 'string') {
        return ['span', stringStyle, JSON.stringify(v)];
      } else if (typeof v === 'boolean') {
        return ['span', keywordStyle, v];
      } else if (isObject(v)) {
        return ['object', {
          object: asRaw ? toRaw(v) : v
        }];
      } else {
        return ['span', stringStyle, String(v)];
      }
    }
    function extractKeys(instance, type) {
      var Comp = instance.type;
      if (isFunction(Comp)) {
        return;
      }
      var extracted = {};
      for (var key in instance.ctx) {
        if (isKeyOfType(Comp, key, type)) {
          extracted[key] = instance.ctx[key];
        }
      }
      return extracted;
    }
    function isKeyOfType(Comp, key, type) {
      var opts = Comp[type];
      if (isArray$1(opts) && opts.includes(key) || isObject(opts) && key in opts) {
        return true;
      }
      if (Comp["extends"] && isKeyOfType(Comp["extends"], key, type)) {
        return true;
      }
      if (Comp.mixins && Comp.mixins.some(function (m) {
        return isKeyOfType(m, key, type);
      })) {
        return true;
      }
    }
    function genRefFlag(v) {
      if (isShallow(v)) {
        return "ShallowRef";
      }
      if (v.effect) {
        return "ComputedRef";
      }
      return "Ref";
    }
    if (window.devtoolsFormatters) {
      window.devtoolsFormatters.push(formatter);
    } else {
      window.devtoolsFormatters = [formatter];
    }
  }

  // Core API ------------------------------------------------------------------
  var version = "3.2.47";

  var svgNS = 'http://www.w3.org/2000/svg';
  var doc = typeof document !== 'undefined' ? document : null;
  var templateContainer = doc && /*#__PURE__*/doc.createElement('template');
  var nodeOps = {
    insert: function insert(child, parent, anchor) {
      parent.insertBefore(child, anchor || null);
    },
    remove: function remove(child) {
      var parent = child.parentNode;
      if (parent) {
        parent.removeChild(child);
      }
    },
    createElement: function createElement(tag, isSVG, is, props) {
      var el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? {
        is: is
      } : undefined);
      if (tag === 'select' && props && props.multiple != null) {
        el.setAttribute('multiple', props.multiple);
      }
      return el;
    },
    createText: function createText(text) {
      return doc.createTextNode(text);
    },
    createComment: function createComment(text) {
      return doc.createComment(text);
    },
    setText: function setText(node, text) {
      node.nodeValue = text;
    },
    setElementText: function setElementText(el, text) {
      el.textContent = text;
    },
    parentNode: function parentNode(node) {
      return node.parentNode;
    },
    nextSibling: function nextSibling(node) {
      return node.nextSibling;
    },
    querySelector: function querySelector(selector) {
      return doc.querySelector(selector);
    },
    setScopeId: function setScopeId(el, id) {
      el.setAttribute(id, '');
    },
    // __UNSAFE__
    // Reason: innerHTML.
    // Static content here can only come from compiled templates.
    // As long as the user only uses trusted templates, this is safe.
    insertStaticContent: function insertStaticContent(content, parent, anchor, isSVG, start, end) {
      // <parent> before | first ... last | anchor </parent>
      var before = anchor ? anchor.previousSibling : parent.lastChild;
      // #5308 can only take cached path if:
      // - has a single root node
      // - nextSibling info is still available
      if (start && (start === end || start.nextSibling)) {
        // cached
        while (true) {
          parent.insertBefore(start.cloneNode(true), anchor);
          if (start === end || !(start = start.nextSibling)) break;
        }
      } else {
        // fresh insert
        templateContainer.innerHTML = isSVG ? "<svg>".concat(content, "</svg>") : content;
        var template = templateContainer.content;
        if (isSVG) {
          // remove outer svg wrapper
          var wrapper = template.firstChild;
          while (wrapper.firstChild) {
            template.appendChild(wrapper.firstChild);
          }
          template.removeChild(wrapper);
        }
        parent.insertBefore(template, anchor);
      }
      return [
      // first
      before ? before.nextSibling : parent.firstChild,
      // last
      anchor ? anchor.previousSibling : parent.lastChild];
    }
  };

  // compiler should normalize class + :class bindings on the same element
  // into a single binding ['staticClass', dynamic]
  function patchClass(el, value, isSVG) {
    // directly setting className should be faster than setAttribute in theory
    // if this is an element during a transition, take the temporary transition
    // classes into account.
    var transitionClasses = el._vtc;
    if (transitionClasses) {
      value = (value ? [value].concat(_toConsumableArray(transitionClasses)) : _toConsumableArray(transitionClasses)).join(' ');
    }
    if (value == null) {
      el.removeAttribute('class');
    } else if (isSVG) {
      el.setAttribute('class', value);
    } else {
      el.className = value;
    }
  }
  function patchStyle(el, prev, next) {
    var style = el.style;
    var isCssString = isString(next);
    if (next && !isCssString) {
      if (prev && !isString(prev)) {
        for (var key in prev) {
          if (next[key] == null) {
            setStyle(style, key, '');
          }
        }
      }
      for (var _key in next) {
        setStyle(style, _key, next[_key]);
      }
    } else {
      var currentDisplay = style.display;
      if (isCssString) {
        if (prev !== next) {
          style.cssText = next;
        }
      } else if (prev) {
        el.removeAttribute('style');
      }
      // indicates that the `display` of the element is controlled by `v-show`,
      // so we always keep the current `display` value regardless of the `style`
      // value, thus handing over control to `v-show`.
      if ('_vod' in el) {
        style.display = currentDisplay;
      }
    }
  }
  var semicolonRE = /[^\\];\s*$/;
  var importantRE = /\s*!important$/;
  function setStyle(style, name, val) {
    if (isArray$1(val)) {
      val.forEach(function (v) {
        return setStyle(style, name, v);
      });
    } else {
      if (val == null) val = '';
      if (process.env.NODE_ENV !== 'production') {
        if (semicolonRE.test(val)) {
          warn$1("Unexpected semicolon at the end of '".concat(name, "' style value: '").concat(val, "'"));
        }
      }
      if (name.startsWith('--')) {
        // custom property definition
        style.setProperty(name, val);
      } else {
        var prefixed = autoPrefix(style, name);
        if (importantRE.test(val)) {
          // !important
          style.setProperty(hyphenate(prefixed), val.replace(importantRE, ''), 'important');
        } else {
          style[prefixed] = val;
        }
      }
    }
  }
  var prefixes = ['Webkit', 'Moz', 'ms'];
  var prefixCache = {};
  function autoPrefix(style, rawName) {
    var cached = prefixCache[rawName];
    if (cached) {
      return cached;
    }
    var name = camelize(rawName);
    if (name !== 'filter' && name in style) {
      return prefixCache[rawName] = name;
    }
    name = capitalize(name);
    for (var i = 0; i < prefixes.length; i++) {
      var prefixed = prefixes[i] + name;
      if (prefixed in style) {
        return prefixCache[rawName] = prefixed;
      }
    }
    return rawName;
  }
  var xlinkNS = 'http://www.w3.org/1999/xlink';
  function patchAttr(el, key, value, isSVG, instance) {
    if (isSVG && key.startsWith('xlink:')) {
      if (value == null) {
        el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
      } else {
        el.setAttributeNS(xlinkNS, key, value);
      }
    } else {
      // note we are only checking boolean attributes that don't have a
      // corresponding dom prop of the same name here.
      var isBoolean = isSpecialBooleanAttr(key);
      if (value == null || isBoolean && !includeBooleanAttr(value)) {
        el.removeAttribute(key);
      } else {
        el.setAttribute(key, isBoolean ? '' : value);
      }
    }
  }

  // __UNSAFE__
  // functions. The user is responsible for using them with only trusted content.
  function patchDOMProp(el, key, value,
  // the following args are passed only due to potential innerHTML/textContent
  // overriding existing VNodes, in which case the old tree must be properly
  // unmounted.
  prevChildren, parentComponent, parentSuspense, unmountChildren) {
    if (key === 'innerHTML' || key === 'textContent') {
      if (prevChildren) {
        unmountChildren(prevChildren, parentComponent, parentSuspense);
      }
      el[key] = value == null ? '' : value;
      return;
    }
    if (key === 'value' && el.tagName !== 'PROGRESS' &&
    // custom elements may use _value internally
    !el.tagName.includes('-')) {
      // store value as _value as well since
      // non-string values will be stringified.
      el._value = value;
      var newValue = value == null ? '' : value;
      if (el.value !== newValue ||
      // #4956: always set for OPTION elements because its value falls back to
      // textContent if no value attribute is present. And setting .value for
      // OPTION has no side effect
      el.tagName === 'OPTION') {
        el.value = newValue;
      }
      if (value == null) {
        el.removeAttribute(key);
      }
      return;
    }
    var needRemove = false;
    if (value === '' || value == null) {
      var type = _typeof(el[key]);
      if (type === 'boolean') {
        // e.g. <select multiple> compiles to { multiple: '' }
        value = includeBooleanAttr(value);
      } else if (value == null && type === 'string') {
        // e.g. <div :id="null">
        value = '';
        needRemove = true;
      } else if (type === 'number') {
        // e.g. <img :width="null">
        value = 0;
        needRemove = true;
      }
    }
    // some properties perform value validation and throw,
    // some properties has getter, no setter, will error in 'use strict'
    // eg. <select :type="null"></select> <select :willValidate="null"></select>
    try {
      el[key] = value;
    } catch (e) {
      // do not warn if value is auto-coerced from nullish values
      if (process.env.NODE_ENV !== 'production' && !needRemove) {
        warn$1("Failed setting prop \"".concat(key, "\" on <").concat(el.tagName.toLowerCase(), ">: ") + "value ".concat(value, " is invalid."), e);
      }
    }
    needRemove && el.removeAttribute(key);
  }
  function addEventListener(el, event, handler, options) {
    el.addEventListener(event, handler, options);
  }
  function removeEventListener(el, event, handler, options) {
    el.removeEventListener(event, handler, options);
  }
  function patchEvent(el, rawName, prevValue, nextValue) {
    var instance = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    // vei = vue event invokers
    var invokers = el._vei || (el._vei = {});
    var existingInvoker = invokers[rawName];
    if (nextValue && existingInvoker) {
      // patch
      existingInvoker.value = nextValue;
    } else {
      var _parseName = parseName(rawName),
        _parseName2 = _slicedToArray(_parseName, 2),
        name = _parseName2[0],
        options = _parseName2[1];
      if (nextValue) {
        // add
        var invoker = invokers[rawName] = createInvoker(nextValue, instance);
        addEventListener(el, name, invoker, options);
      } else if (existingInvoker) {
        // remove
        removeEventListener(el, name, existingInvoker, options);
        invokers[rawName] = undefined;
      }
    }
  }
  var optionsModifierRE = /(?:Once|Passive|Capture)$/;
  function parseName(name) {
    var options;
    if (optionsModifierRE.test(name)) {
      options = {};
      var m;
      while (m = name.match(optionsModifierRE)) {
        name = name.slice(0, name.length - m[0].length);
        options[m[0].toLowerCase()] = true;
      }
    }
    var event = name[2] === ':' ? name.slice(3) : hyphenate(name.slice(2));
    return [event, options];
  }
  // To avoid the overhead of repeatedly calling Date.now(), we cache
  // and use the same timestamp for all event listeners attached in the same tick.
  var cachedNow = 0;
  var p = /*#__PURE__*/Promise.resolve();
  var getNow = function getNow() {
    return cachedNow || (p.then(function () {
      return cachedNow = 0;
    }), cachedNow = Date.now());
  };
  function createInvoker(initialValue, instance) {
    var invoker = function invoker(e) {
      // async edge case vuejs/vue#6566
      // inner click event triggers patch, event handler
      // attached to outer element during patch, and triggered again. This
      // happens because browsers fire microtask ticks between event propagation.
      // this no longer happens for templates in Vue 3, but could still be
      // theoretically possible for hand-written render functions.
      // the solution: we save the timestamp when a handler is attached,
      // and also attach the timestamp to any event that was handled by vue
      // for the first time (to avoid inconsistent event timestamp implementations
      // or events fired from iframes, e.g. #2513)
      // The handler would only fire if the event passed to it was fired
      // AFTER it was attached.
      if (!e._vts) {
        e._vts = Date.now();
      } else if (e._vts <= invoker.attached) {
        return;
      }
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e, invoker.value), instance, 5 /* ErrorCodes.NATIVE_EVENT_HANDLER */, [e]);
    };
    invoker.value = initialValue;
    invoker.attached = getNow();
    return invoker;
  }
  function patchStopImmediatePropagation(e, value) {
    if (isArray$1(value)) {
      var originalStop = e.stopImmediatePropagation;
      e.stopImmediatePropagation = function () {
        originalStop.call(e);
        e._stopped = true;
      };
      return value.map(function (fn) {
        return function (e) {
          return !e._stopped && fn && fn(e);
        };
      });
    } else {
      return value;
    }
  }
  var nativeOnRE = /^on[a-z]/;
  var patchProp = function patchProp(el, key, prevValue, nextValue) {
    var isSVG = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var prevChildren = arguments.length > 5 ? arguments[5] : undefined;
    var parentComponent = arguments.length > 6 ? arguments[6] : undefined;
    var parentSuspense = arguments.length > 7 ? arguments[7] : undefined;
    var unmountChildren = arguments.length > 8 ? arguments[8] : undefined;
    if (key === 'class') {
      patchClass(el, nextValue, isSVG);
    } else if (key === 'style') {
      patchStyle(el, prevValue, nextValue);
    } else if (isOn(key)) {
      // ignore v-model listeners
      if (!isModelListener(key)) {
        patchEvent(el, key, prevValue, nextValue, parentComponent);
      }
    } else if (key[0] === '.' ? (key = key.slice(1), true) : key[0] === '^' ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
      patchDOMProp(el, key, nextValue, prevChildren, parentComponent, parentSuspense, unmountChildren);
    } else {
      // special case for <input v-model type="checkbox"> with
      // :true-value & :false-value
      // store value as dom properties since non-string values will be
      // stringified.
      if (key === 'true-value') {
        el._trueValue = nextValue;
      } else if (key === 'false-value') {
        el._falseValue = nextValue;
      }
      patchAttr(el, key, nextValue, isSVG);
    }
  };
  function shouldSetAsProp(el, key, value, isSVG) {
    if (isSVG) {
      // most keys must be set as attribute on svg elements to work
      // ...except innerHTML & textContent
      if (key === 'innerHTML' || key === 'textContent') {
        return true;
      }
      // or native onclick with function values
      if (key in el && nativeOnRE.test(key) && isFunction(value)) {
        return true;
      }
      return false;
    }
    // these are enumerated attrs, however their corresponding DOM properties
    // are actually booleans - this leads to setting it with a string "false"
    // value leading it to be coerced to `true`, so we need to always treat
    // them as attributes.
    // Note that `contentEditable` doesn't have this problem: its DOM
    // property is also enumerated string values.
    if (key === 'spellcheck' || key === 'draggable' || key === 'translate') {
      return false;
    }
    // #1787, #2840 form property on form elements is readonly and must be set as
    // attribute.
    if (key === 'form') {
      return false;
    }
    // #1526 <input list> must be set as attribute
    if (key === 'list' && el.tagName === 'INPUT') {
      return false;
    }
    // #2766 <textarea type> must be set as attribute
    if (key === 'type' && el.tagName === 'TEXTAREA') {
      return false;
    }
    // native onclick with string value, must be set as attribute
    if (nativeOnRE.test(key) && isString(value)) {
      return false;
    }
    return key in el;
  }
  new WeakMap();
  new WeakMap();
  var rendererOptions = /*#__PURE__*/extend({
    patchProp: patchProp
  }, nodeOps);
  // lazy create the renderer - this makes core renderer logic tree-shakable
  // in case the user only imports reactivity utilities from Vue.
  var renderer;
  function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }
  var createApp = function createApp() {
    var _ensureRenderer2;
    var app = (_ensureRenderer2 = ensureRenderer()).createApp.apply(_ensureRenderer2, arguments);
    if (process.env.NODE_ENV !== 'production') {
      injectNativeTagCheck(app);
      injectCompilerOptionsCheck(app);
    }
    var mount = app.mount;
    app.mount = function (containerOrSelector) {
      var container = normalizeContainer(containerOrSelector);
      if (!container) return;
      var component = app._component;
      if (!isFunction(component) && !component.render && !component.template) {
        // __UNSAFE__
        // Reason: potential execution of JS expressions in in-DOM template.
        // The user must make sure the in-DOM template is trusted. If it's
        // rendered by the server, the template should not contain any user data.
        component.template = container.innerHTML;
      }
      // clear content before mounting
      container.innerHTML = '';
      var proxy = mount(container, false, container instanceof SVGElement);
      if (container instanceof Element) {
        container.removeAttribute('v-cloak');
        container.setAttribute('data-v-app', '');
      }
      return proxy;
    };
    return app;
  };
  function injectNativeTagCheck(app) {
    // Inject `isNativeTag`
    // this is used for component name validation (dev only)
    Object.defineProperty(app.config, 'isNativeTag', {
      value: function value(tag) {
        return isHTMLTag(tag) || isSVGTag(tag);
      },
      writable: false
    });
  }
  // dev only
  function injectCompilerOptionsCheck(app) {
    {
      var isCustomElement = app.config.isCustomElement;
      Object.defineProperty(app.config, 'isCustomElement', {
        get: function get() {
          return isCustomElement;
        },
        set: function set() {
          warn$1("The `isCustomElement` config option is deprecated. Use " + "`compilerOptions.isCustomElement` instead.");
        }
      });
      var compilerOptions = app.config.compilerOptions;
      var msg = "The `compilerOptions` config option is only respected when using " + "a build of Vue.js that includes the runtime compiler (aka \"full build\"). " + "Since you are using the runtime-only build, `compilerOptions` " + "must be passed to `@vue/compiler-dom` in the build setup instead.\n" + "- For vue-loader: pass it via vue-loader's `compilerOptions` loader option.\n" + "- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n" + "- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom";
      Object.defineProperty(app.config, 'compilerOptions', {
        get: function get() {
          warn$1(msg);
          return compilerOptions;
        },
        set: function set() {
          warn$1(msg);
        }
      });
    }
  }
  function normalizeContainer(container) {
    if (isString(container)) {
      var res = document.querySelector(container);
      if (process.env.NODE_ENV !== 'production' && !res) {
        warn$1("Failed to mount app: mount target selector \"".concat(container, "\" returned null."));
      }
      return res;
    }
    if (process.env.NODE_ENV !== 'production' && window.ShadowRoot && container instanceof window.ShadowRoot && container.mode === 'closed') {
      warn$1("mounting on a ShadowRoot with `{mode: \"closed\"}` may lead to unpredictable bugs");
    }
    return container;
  }

  function initDev() {
    {
      initCustomFormatter();
    }
  }

  // This entry exports the runtime only, and is built as
  if (process.env.NODE_ENV !== 'production') {
    initDev();
  }

  function getDevtoolsGlobalHook() {
    return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
    // @ts-ignore
    return typeof navigator !== 'undefined' && typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {};
  }
  var isProxyAvailable = typeof Proxy === 'function';

  var HOOK_SETUP = 'devtools-plugin:setup';
  var HOOK_PLUGIN_SETTINGS_SET = 'plugin:settings:set';

  var supported;
  var perf;
  function isPerformanceSupported() {
    var _a;
    if (supported !== undefined) {
      return supported;
    }
    if (typeof window !== 'undefined' && window.performance) {
      supported = true;
      perf = window.performance;
    } else if (typeof global !== 'undefined' && ((_a = global.perf_hooks) === null || _a === void 0 ? void 0 : _a.performance)) {
      supported = true;
      perf = global.perf_hooks.performance;
    } else {
      supported = false;
    }
    return supported;
  }
  function now() {
    return isPerformanceSupported() ? perf.now() : Date.now();
  }

  var ApiProxy = /*#__PURE__*/function () {
    function ApiProxy(plugin, hook) {
      var _this = this;
      _classCallCheck(this, ApiProxy);
      this.target = null;
      this.targetQueue = [];
      this.onQueue = [];
      this.plugin = plugin;
      this.hook = hook;
      var defaultSettings = {};
      if (plugin.settings) {
        for (var id in plugin.settings) {
          var item = plugin.settings[id];
          defaultSettings[id] = item.defaultValue;
        }
      }
      var localSettingsSaveId = "__vue-devtools-plugin-settings__".concat(plugin.id);
      var currentSettings = Object.assign({}, defaultSettings);
      try {
        var raw = localStorage.getItem(localSettingsSaveId);
        var data = JSON.parse(raw);
        Object.assign(currentSettings, data);
      } catch (e) {
        // noop
      }
      this.fallbacks = {
        getSettings: function getSettings() {
          return currentSettings;
        },
        setSettings: function setSettings(value) {
          try {
            localStorage.setItem(localSettingsSaveId, JSON.stringify(value));
          } catch (e) {
            // noop
          }
          currentSettings = value;
        },
        now: function now$1() {
          return now();
        }
      };
      if (hook) {
        hook.on(HOOK_PLUGIN_SETTINGS_SET, function (pluginId, value) {
          if (pluginId === _this.plugin.id) {
            _this.fallbacks.setSettings(value);
          }
        });
      }
      this.proxiedOn = new Proxy({}, {
        get: function get(_target, prop) {
          if (_this.target) {
            return _this.target.on[prop];
          } else {
            return function () {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              _this.onQueue.push({
                method: prop,
                args: args
              });
            };
          }
        }
      });
      this.proxiedTarget = new Proxy({}, {
        get: function get(_target, prop) {
          if (_this.target) {
            return _this.target[prop];
          } else if (prop === 'on') {
            return _this.proxiedOn;
          } else if (Object.keys(_this.fallbacks).includes(prop)) {
            return function () {
              var _this$fallbacks;
              for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
              }
              _this.targetQueue.push({
                method: prop,
                args: args,
                resolve: function resolve() {}
              });
              return (_this$fallbacks = _this.fallbacks)[prop].apply(_this$fallbacks, args);
            };
          } else {
            return function () {
              for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
              }
              return new Promise(function (resolve) {
                _this.targetQueue.push({
                  method: prop,
                  args: args,
                  resolve: resolve
                });
              });
            };
          }
        }
      });
    }
    _createClass(ApiProxy, [{
      key: "setRealTarget",
      value: function () {
        var _setRealTarget = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(target) {
          var _iterator, _step, _this$target$on, item, _iterator2, _step2, _this$target, _item;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                this.target = target;
                _iterator = _createForOfIteratorHelper(this.onQueue);
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    item = _step.value;
                    (_this$target$on = this.target.on)[item.method].apply(_this$target$on, _toConsumableArray(item.args));
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                _iterator2 = _createForOfIteratorHelper(this.targetQueue);
                _context.prev = 4;
                _iterator2.s();
              case 6:
                if ((_step2 = _iterator2.n()).done) {
                  _context.next = 15;
                  break;
                }
                _item = _step2.value;
                _context.t0 = _item;
                _context.next = 11;
                return (_this$target = this.target)[_item.method].apply(_this$target, _toConsumableArray(_item.args));
              case 11:
                _context.t1 = _context.sent;
                _context.t0.resolve.call(_context.t0, _context.t1);
              case 13:
                _context.next = 6;
                break;
              case 15:
                _context.next = 20;
                break;
              case 17:
                _context.prev = 17;
                _context.t2 = _context["catch"](4);
                _iterator2.e(_context.t2);
              case 20:
                _context.prev = 20;
                _iterator2.f();
                return _context.finish(20);
              case 23:
              case "end":
                return _context.stop();
            }
          }, _callee, this, [[4, 17, 20, 23]]);
        }));
        function setRealTarget(_x) {
          return _setRealTarget.apply(this, arguments);
        }
        return setRealTarget;
      }()
    }]);
    return ApiProxy;
  }();

  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
    var descriptor = pluginDescriptor;
    var target = getTarget();
    var hook = getDevtoolsGlobalHook();
    var enableProxy = isProxyAvailable && descriptor.enableEarlyProxy;
    if (hook && (target.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !enableProxy)) {
      hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
    } else {
      var proxy = enableProxy ? new ApiProxy(descriptor, hook) : null;
      var list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
      list.push({
        pluginDescriptor: descriptor,
        setupFn: setupFn,
        proxy: proxy
      });
      if (proxy) setupFn(proxy.proxiedTarget);
    }
  }

  var _ErrorTypeMessages;
  var isBrowser = typeof window !== 'undefined';
  function isESModule(obj) {
    return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
  }
  var assign = Object.assign;
  function applyToParams(fn, params) {
    var newParams = {};
    for (var key in params) {
      var value = params[key];
      newParams[key] = isArray(value) ? value.map(fn) : fn(value);
    }
    return newParams;
  }
  var noop = function noop() {};
  /**
   * Typesafe alternative to Array.isArray
   * https://github.com/microsoft/TypeScript/pull/48228
   */
  var isArray = Array.isArray;
  function warn(msg) {
    // avoid using ...args as it breaks in older Edge builds
    var args = Array.from(arguments).slice(1);
    console.warn.apply(console, ['[Vue Router warn]: ' + msg].concat(args));
  }
  var TRAILING_SLASH_RE = /\/$/;
  var removeTrailingSlash = function removeTrailingSlash(path) {
    return path.replace(TRAILING_SLASH_RE, '');
  };
  /**
   * Transforms a URI into a normalized history location
   *
   * @param parseQuery
   * @param location - URI to normalize
   * @param currentLocation - current absolute location. Allows resolving relative
   * paths. Must start with `/`. Defaults to `/`
   * @returns a normalized history location
   */
  function parseURL(parseQuery, location) {
    var currentLocation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '/';
    var path,
      query = {},
      searchString = '',
      hash = '';
    // Could use URL and URLSearchParams but IE 11 doesn't support it
    // TODO: move to new URL()
    var hashPos = location.indexOf('#');
    var searchPos = location.indexOf('?');
    // the hash appears before the search, so it's not part of the search string
    if (hashPos < searchPos && hashPos >= 0) {
      searchPos = -1;
    }
    if (searchPos > -1) {
      path = location.slice(0, searchPos);
      searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
      query = parseQuery(searchString);
    }
    if (hashPos > -1) {
      path = path || location.slice(0, hashPos);
      // keep the # character
      hash = location.slice(hashPos, location.length);
    }
    // no search and no query
    path = resolveRelativePath(path != null ? path : location, currentLocation);
    // empty path means a relative query or hash `?foo=f`, `#thing`
    return {
      fullPath: path + (searchString && '?') + searchString + hash,
      path: path,
      query: query,
      hash: hash
    };
  }
  /**
   * Stringifies a URL object
   *
   * @param stringifyQuery
   * @param location
   */
  function stringifyURL(stringifyQuery, location) {
    var query = location.query ? stringifyQuery(location.query) : '';
    return location.path + (query && '?') + query + (location.hash || '');
  }
  /**
   * Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
   *
   * @param pathname - location.pathname
   * @param base - base to strip off
   */
  function stripBase(pathname, base) {
    // no base or base is not found at the beginning
    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
    return pathname.slice(base.length) || '/';
  }
  /**
   * Checks if two RouteLocation are equal. This means that both locations are
   * pointing towards the same {@link RouteRecord} and that all `params`, `query`
   * parameters and `hash` are the same
   *
   * @param a - first {@link RouteLocation}
   * @param b - second {@link RouteLocation}
   */
  function isSameRouteLocation(stringifyQuery, a, b) {
    var aLastIndex = a.matched.length - 1;
    var bLastIndex = b.matched.length - 1;
    return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery(a.query) === stringifyQuery(b.query) && a.hash === b.hash;
  }
  /**
   * Check if two `RouteRecords` are equal. Takes into account aliases: they are
   * considered equal to the `RouteRecord` they are aliasing.
   *
   * @param a - first {@link RouteRecord}
   * @param b - second {@link RouteRecord}
   */
  function isSameRouteRecord(a, b) {
    // since the original record has an undefined value for aliasOf
    // but all aliases point to the original record, this will always compare
    // the original record
    return (a.aliasOf || a) === (b.aliasOf || b);
  }
  function isSameRouteLocationParams(a, b) {
    if (Object.keys(a).length !== Object.keys(b).length) return false;
    for (var key in a) {
      if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
    }
    return true;
  }
  function isSameRouteLocationParamsValue(a, b) {
    return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
  }
  /**
   * Check if two arrays are the same or if an array with one single entry is the
   * same as another primitive value. Used to check query and parameters
   *
   * @param a - array of values
   * @param b - array of values or a single value
   */
  function isEquivalentArray(a, b) {
    return isArray(b) ? a.length === b.length && a.every(function (value, i) {
      return value === b[i];
    }) : a.length === 1 && a[0] === b;
  }
  /**
   * Resolves a relative path that starts with `.`.
   *
   * @param to - path location we are resolving
   * @param from - currentLocation.path, should start with `/`
   */
  function resolveRelativePath(to, from) {
    if (to.startsWith('/')) return to;
    if (process.env.NODE_ENV !== 'production' && !from.startsWith('/')) {
      warn("Cannot resolve a relative location without an absolute path. Trying to resolve \"".concat(to, "\" from \"").concat(from, "\". It should look like \"/").concat(from, "\"."));
      return to;
    }
    if (!to) return from;
    var fromSegments = from.split('/');
    var toSegments = to.split('/');
    var position = fromSegments.length - 1;
    var toPosition;
    var segment;
    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
      segment = toSegments[toPosition];
      // we stay on the same position
      if (segment === '.') continue;
      // go up in the from array
      if (segment === '..') {
        // we can't go below zero, but we still need to increment toPosition
        if (position > 1) position--;
        // continue
      }
      // we reached a non-relative path, we stop here
      else break;
    }
    return fromSegments.slice(0, position).join('/') + '/' + toSegments
    // ensure we use at least the last element in the toSegments
    .slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join('/');
  }
  var NavigationType;
  (function (NavigationType) {
    NavigationType["pop"] = "pop";
    NavigationType["push"] = "push";
  })(NavigationType || (NavigationType = {}));
  var NavigationDirection;
  (function (NavigationDirection) {
    NavigationDirection["back"] = "back";
    NavigationDirection["forward"] = "forward";
    NavigationDirection["unknown"] = "";
  })(NavigationDirection || (NavigationDirection = {}));
  // Generic utils
  /**
   * Normalizes a base by removing any trailing slash and reading the base tag if
   * present.
   *
   * @param base - base to normalize
   */
  function normalizeBase(base) {
    if (!base) {
      if (isBrowser) {
        // respect <base> tag
        var baseEl = document.querySelector('base');
        base = baseEl && baseEl.getAttribute('href') || '/';
        // strip full URL origin
        base = base.replace(/^\w+:\/\/[^\/]+/, '');
      } else {
        base = '/';
      }
    }
    // ensure leading slash when it was removed by the regex above avoid leading
    // slash with hash because the file could be read from the disk like file://
    // and the leading slash would cause problems
    if (base[0] !== '/' && base[0] !== '#') base = '/' + base;
    // remove the trailing slash so all other method can just do `base + fullPath`
    // to build an href
    return removeTrailingSlash(base);
  }
  // remove any character before the hash
  var BEFORE_HASH_RE = /^[^#]+#/;
  function createHref(base, location) {
    return base.replace(BEFORE_HASH_RE, '#') + location;
  }
  function getElementPosition(el, offset) {
    var docRect = document.documentElement.getBoundingClientRect();
    var elRect = el.getBoundingClientRect();
    return {
      behavior: offset.behavior,
      left: elRect.left - docRect.left - (offset.left || 0),
      top: elRect.top - docRect.top - (offset.top || 0)
    };
  }
  var computeScrollPosition = function computeScrollPosition() {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    };
  };
  function scrollToPosition(position) {
    var scrollToOptions;
    if ('el' in position) {
      var positionEl = position.el;
      var isIdSelector = typeof positionEl === 'string' && positionEl.startsWith('#');
      /**
       * `id`s can accept pretty much any characters, including CSS combinators
       * like `>` or `~`. It's still possible to retrieve elements using
       * `document.getElementById('~')` but it needs to be escaped when using
       * `document.querySelector('#\\~')` for it to be valid. The only
       * requirements for `id`s are them to be unique on the page and to not be
       * empty (`id=""`). Because of that, when passing an id selector, it should
       * be properly escaped for it to work with `querySelector`. We could check
       * for the id selector to be simple (no CSS combinators `+ >~`) but that
       * would make things inconsistent since they are valid characters for an
       * `id` but would need to be escaped when using `querySelector`, breaking
       * their usage and ending up in no selector returned. Selectors need to be
       * escaped:
       *
       * - `#1-thing` becomes `#\31 -thing`
       * - `#with~symbols` becomes `#with\\~symbols`
       *
       * - More information about  the topic can be found at
       *   https://mathiasbynens.be/notes/html5-id-class.
       * - Practical example: https://mathiasbynens.be/demo/html5-id
       */
      if (process.env.NODE_ENV !== 'production' && typeof position.el === 'string') {
        if (!isIdSelector || !document.getElementById(position.el.slice(1))) {
          try {
            var foundEl = document.querySelector(position.el);
            if (isIdSelector && foundEl) {
              warn("The selector \"".concat(position.el, "\" should be passed as \"el: document.querySelector('").concat(position.el, "')\" because it starts with \"#\"."));
              // return to avoid other warnings
              return;
            }
          } catch (err) {
            warn("The selector \"".concat(position.el, "\" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape)."));
            // return to avoid other warnings
            return;
          }
        }
      }
      var el = typeof positionEl === 'string' ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
      if (!el) {
        process.env.NODE_ENV !== 'production' && warn("Couldn't find element using selector \"".concat(position.el, "\" returned by scrollBehavior."));
        return;
      }
      scrollToOptions = getElementPosition(el, position);
    } else {
      scrollToOptions = position;
    }
    if ('scrollBehavior' in document.documentElement.style) window.scrollTo(scrollToOptions);else {
      window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
    }
  }
  function getScrollKey(path, delta) {
    var position = history.state ? history.state.position - delta : -1;
    return position + path;
  }
  var scrollPositions = new Map();
  function saveScrollPosition(key, scrollPosition) {
    scrollPositions.set(key, scrollPosition);
  }
  function getSavedScrollPosition(key) {
    var scroll = scrollPositions.get(key);
    // consume it so it's not used again
    scrollPositions["delete"](key);
    return scroll;
  }
  // TODO: RFC about how to save scroll position
  /**
   * ScrollBehavior instance used by the router to compute and restore the scroll
   * position when navigating.
   */
  // export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
  //   // returns a scroll position that can be saved in history
  //   compute(): ScrollPositionEntry
  //   // can take an extended ScrollPositionEntry
  //   scroll(position: ScrollPosition): void
  // }
  // export const scrollHandler: ScrollHandler<ScrollPosition> = {
  //   compute: computeScroll,
  //   scroll: scrollToPosition,
  // }

  var createBaseLocation = function createBaseLocation() {
    return location.protocol + '//' + location.host;
  };
  /**
   * Creates a normalized history location from a window.location object
   * @param location -
   */
  function createCurrentLocation(base, location) {
    var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
    var hashPos = base.indexOf('#');
    if (hashPos > -1) {
      var slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
      var pathFromHash = hash.slice(slicePos);
      // prepend the starting slash to hash so the url starts with /#
      if (pathFromHash[0] !== '/') pathFromHash = '/' + pathFromHash;
      return stripBase(pathFromHash, '');
    }
    var path = stripBase(pathname, base);
    return path + search + hash;
  }
  function useHistoryListeners(base, historyState, currentLocation, replace) {
    var listeners = [];
    var teardowns = [];
    // TODO: should it be a stack? a Dict. Check if the popstate listener
    // can trigger twice
    var pauseState = null;
    var popStateHandler = function popStateHandler(_ref) {
      var state = _ref.state;
      var to = createCurrentLocation(base, location);
      var from = currentLocation.value;
      var fromState = historyState.value;
      var delta = 0;
      if (state) {
        currentLocation.value = to;
        historyState.value = state;
        // ignore the popstate and reset the pauseState
        if (pauseState && pauseState === from) {
          pauseState = null;
          return;
        }
        delta = fromState ? state.position - fromState.position : 0;
      } else {
        replace(to);
      }
      // console.log({ deltaFromCurrent })
      // Here we could also revert the navigation by calling history.go(-delta)
      // this listener will have to be adapted to not trigger again and to wait for the url
      // to be updated before triggering the listeners. Some kind of validation function would also
      // need to be passed to the listeners so the navigation can be accepted
      // call all listeners
      listeners.forEach(function (listener) {
        listener(currentLocation.value, from, {
          delta: delta,
          type: NavigationType.pop,
          direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
        });
      });
    };
    function pauseListeners() {
      pauseState = currentLocation.value;
    }
    function listen(callback) {
      // set up the listener and prepare teardown callbacks
      listeners.push(callback);
      var teardown = function teardown() {
        var index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
      teardowns.push(teardown);
      return teardown;
    }
    function beforeUnloadListener() {
      var _window = window,
        history = _window.history;
      if (!history.state) return;
      history.replaceState(assign({}, history.state, {
        scroll: computeScrollPosition()
      }), '');
    }
    function destroy() {
      var _iterator = _createForOfIteratorHelper(teardowns),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var teardown = _step.value;
          teardown();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      teardowns = [];
      window.removeEventListener('popstate', popStateHandler);
      window.removeEventListener('beforeunload', beforeUnloadListener);
    }
    // set up the listeners and prepare teardown callbacks
    window.addEventListener('popstate', popStateHandler);
    window.addEventListener('beforeunload', beforeUnloadListener);
    return {
      pauseListeners: pauseListeners,
      listen: listen,
      destroy: destroy
    };
  }
  /**
   * Creates a state object
   */
  function buildState(back, current, forward) {
    var replaced = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var computeScroll = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    return {
      back: back,
      current: current,
      forward: forward,
      replaced: replaced,
      position: window.history.length,
      scroll: computeScroll ? computeScrollPosition() : null
    };
  }
  function useHistoryStateNavigation(base) {
    var _window2 = window,
      history = _window2.history,
      location = _window2.location;
    // private variables
    var currentLocation = {
      value: createCurrentLocation(base, location)
    };
    var historyState = {
      value: history.state
    };
    // build current history entry as this is a fresh navigation
    if (!historyState.value) {
      changeLocation(currentLocation.value, {
        back: null,
        current: currentLocation.value,
        forward: null,
        // the length is off by one, we need to decrease it
        position: history.length - 1,
        replaced: true,
        // don't add a scroll as the user may have an anchor, and we want
        // scrollBehavior to be triggered without a saved position
        scroll: null
      }, true);
    }
    function changeLocation(to, state, replace) {
      /**
       * if a base tag is provided, and we are on a normal domain, we have to
       * respect the provided `base` attribute because pushState() will use it and
       * potentially erase anything before the `#` like at
       * https://github.com/vuejs/router/issues/685 where a base of
       * `/folder/#` but a base of `/` would erase the `/folder/` section. If
       * there is no host, the `<base>` tag makes no sense and if there isn't a
       * base tag we can just use everything after the `#`.
       */
      var hashIndex = base.indexOf('#');
      var url = hashIndex > -1 ? (location.host && document.querySelector('base') ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
      try {
        // BROWSER QUIRK
        // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
        history[replace ? 'replaceState' : 'pushState'](state, '', url);
        historyState.value = state;
      } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
          warn('Error with push/replace State', err);
        } else {
          console.error(err);
        }
        // Force the navigation, this also resets the call count
        location[replace ? 'replace' : 'assign'](url);
      }
    }
    function replace(to, data) {
      var state = assign({}, history.state, buildState(historyState.value.back,
      // keep back and forward entries but override current position
      to, historyState.value.forward, true), data, {
        position: historyState.value.position
      });
      changeLocation(to, state, true);
      currentLocation.value = to;
    }
    function push(to, data) {
      // Add to current entry the information of where we are going
      // as well as saving the current position
      var currentState = assign({},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      historyState.value, history.state, {
        forward: to,
        scroll: computeScrollPosition()
      });
      if (process.env.NODE_ENV !== 'production' && !history.state) {
        warn("history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\n" + "history.replaceState(history.state, '', url)\n\n" + "You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.");
      }
      changeLocation(currentState.current, currentState, true);
      var state = assign({}, buildState(currentLocation.value, to, null), {
        position: currentState.position + 1
      }, data);
      changeLocation(to, state, false);
      currentLocation.value = to;
    }
    return {
      location: currentLocation,
      state: historyState,
      push: push,
      replace: replace
    };
  }
  /**
   * Creates an HTML5 history. Most common history for single page applications.
   *
   * @param base -
   */
  function createWebHistory(base) {
    base = normalizeBase(base);
    var historyNavigation = useHistoryStateNavigation(base);
    var historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
    function go(delta) {
      var triggerListeners = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!triggerListeners) historyListeners.pauseListeners();
      history.go(delta);
    }
    var routerHistory = assign({
      // it's overridden right after
      location: '',
      base: base,
      go: go,
      createHref: createHref.bind(null, base)
    }, historyNavigation, historyListeners);
    Object.defineProperty(routerHistory, 'location', {
      enumerable: true,
      get: function get() {
        return historyNavigation.location.value;
      }
    });
    Object.defineProperty(routerHistory, 'state', {
      enumerable: true,
      get: function get() {
        return historyNavigation.state.value;
      }
    });
    return routerHistory;
  }
  function isRouteLocation(route) {
    return typeof route === 'string' || route && _typeof(route) === 'object';
  }
  function isRouteName(name) {
    return typeof name === 'string' || _typeof(name) === 'symbol';
  }

  /**
   * Initial route location where the router is. Can be used in navigation guards
   * to differentiate the initial navigation.
   *
   * @example
   * ```js
   * import { START_LOCATION } from 'vue-router'
   *
   * router.beforeEach((to, from) => {
   *   if (from === START_LOCATION) {
   *     // initial navigation
   *   }
   * })
   * ```
   */
  var START_LOCATION_NORMALIZED = {
    path: '/',
    name: undefined,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: undefined
  };
  var NavigationFailureSymbol = Symbol(process.env.NODE_ENV !== 'production' ? 'navigation failure' : '');
  /**
   * Enumeration with all possible types for navigation failures. Can be passed to
   * {@link isNavigationFailure} to check for specific failures.
   */
  var NavigationFailureType;
  (function (NavigationFailureType) {
    /**
     * An aborted navigation is a navigation that failed because a navigation
     * guard returned `false` or called `next(false)`
     */
    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
    /**
     * A cancelled navigation is a navigation that failed because a more recent
     * navigation finished started (not necessarily finished).
     */
    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
    /**
     * A duplicated navigation is a navigation that failed because it was
     * initiated while already being at the exact same location.
     */
    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
  })(NavigationFailureType || (NavigationFailureType = {}));
  // DEV only debug messages
  var ErrorTypeMessages = (_ErrorTypeMessages = {}, _defineProperty(_ErrorTypeMessages, 1 /* ErrorTypes.MATCHER_NOT_FOUND */, function _(_ref3) {
    var location = _ref3.location,
      currentLocation = _ref3.currentLocation;
    return "No match for\n ".concat(JSON.stringify(location)).concat(currentLocation ? '\nwhile being at\n' + JSON.stringify(currentLocation) : '');
  }), _defineProperty(_ErrorTypeMessages, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, function _(_ref4) {
    var from = _ref4.from,
      to = _ref4.to;
    return "Redirected from \"".concat(from.fullPath, "\" to \"").concat(stringifyRoute(to), "\" via a navigation guard.");
  }), _defineProperty(_ErrorTypeMessages, 4 /* ErrorTypes.NAVIGATION_ABORTED */, function _(_ref5) {
    var from = _ref5.from,
      to = _ref5.to;
    return "Navigation aborted from \"".concat(from.fullPath, "\" to \"").concat(to.fullPath, "\" via a navigation guard.");
  }), _defineProperty(_ErrorTypeMessages, 8 /* ErrorTypes.NAVIGATION_CANCELLED */, function _(_ref6) {
    var from = _ref6.from,
      to = _ref6.to;
    return "Navigation cancelled from \"".concat(from.fullPath, "\" to \"").concat(to.fullPath, "\" with a new navigation.");
  }), _defineProperty(_ErrorTypeMessages, 16 /* ErrorTypes.NAVIGATION_DUPLICATED */, function _(_ref7) {
    var from = _ref7.from;
      _ref7.to;
    return "Avoided redundant navigation to current location: \"".concat(from.fullPath, "\".");
  }), _ErrorTypeMessages);
  function createRouterError(type, params) {
    // keep full error messages in cjs versions
    if (process.env.NODE_ENV !== 'production' || !true) {
      return assign(new Error(ErrorTypeMessages[type](params)), _defineProperty({
        type: type
      }, NavigationFailureSymbol, true), params);
    } else {
      return assign(new Error(), _defineProperty({
        type: type
      }, NavigationFailureSymbol, true), params);
    }
  }
  function isNavigationFailure(error, type) {
    return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
  }
  var propertiesToLog = ['params', 'query', 'hash'];
  function stringifyRoute(to) {
    if (typeof to === 'string') return to;
    if ('path' in to) return to.path;
    var location = {};
    var _iterator2 = _createForOfIteratorHelper(propertiesToLog),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var key = _step2.value;
        if (key in to) location[key] = to[key];
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    return JSON.stringify(location, null, 2);
  }

  // default pattern for a param: non-greedy everything but /
  var BASE_PARAM_PATTERN = '[^/]+?';
  var BASE_PATH_PARSER_OPTIONS = {
    sensitive: false,
    strict: false,
    start: true,
    end: true
  };
  // Special Regex characters that must be escaped in static tokens
  var REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
  /**
   * Creates a path parser from an array of Segments (a segment is an array of Tokens)
   *
   * @param segments - array of segments returned by tokenizePath
   * @param extraOptions - optional options for the regexp
   * @returns a PathParser
   */
  function tokensToParser(segments, extraOptions) {
    var options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
    // the amount of scores is the same as the length of segments except for the root segment "/"
    var score = [];
    // the regexp as a string
    var pattern = options.start ? '^' : '';
    // extracted keys
    var keys = [];
    var _iterator3 = _createForOfIteratorHelper(segments),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var segment = _step3.value;
        // the root segment needs special treatment
        var segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
        // allow trailing slash
        if (options.strict && !segment.length) pattern += '/';
        for (var tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
          var token = segment[tokenIndex];
          // resets the score if we are inside a sub-segment /:a-other-:b
          var subSegmentScore = 40 /* PathScore.Segment */ + (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
          if (token.type === 0 /* TokenType.Static */) {
            // prepend the slash if we are starting a new segment
            if (!tokenIndex) pattern += '/';
            pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
            subSegmentScore += 40 /* PathScore.Static */;
          } else if (token.type === 1 /* TokenType.Param */) {
            var value = token.value,
              repeatable = token.repeatable,
              optional = token.optional,
              regexp = token.regexp;
            keys.push({
              name: value,
              repeatable: repeatable,
              optional: optional
            });
            var _re = regexp ? regexp : BASE_PARAM_PATTERN;
            // the user provided a custom regexp /:id(\\d+)
            if (_re !== BASE_PARAM_PATTERN) {
              subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
              // make sure the regexp is valid before using it
              try {
                new RegExp("(".concat(_re, ")"));
              } catch (err) {
                throw new Error("Invalid custom RegExp for param \"".concat(value, "\" (").concat(_re, "): ") + err.message);
              }
            }
            // when we repeat we must take care of the repeating leading slash
            var subPattern = repeatable ? "((?:".concat(_re, ")(?:/(?:").concat(_re, "))*)") : "(".concat(_re, ")");
            // prepend the slash if we are starting a new segment
            if (!tokenIndex) subPattern =
            // avoid an optional / if there are more segments e.g. /:p?-static
            // or /:p?-:p2
            optional && segment.length < 2 ? "(?:/".concat(subPattern, ")") : '/' + subPattern;
            if (optional) subPattern += '?';
            pattern += subPattern;
            subSegmentScore += 20 /* PathScore.Dynamic */;
            if (optional) subSegmentScore += -8 /* PathScore.BonusOptional */;
            if (repeatable) subSegmentScore += -20 /* PathScore.BonusRepeatable */;
            if (_re === '.*') subSegmentScore += -50 /* PathScore.BonusWildcard */;
          }

          segmentScores.push(subSegmentScore);
        }
        // an empty array like /home/ -> [[{home}], []]
        // if (!segment.length) pattern += '/'
        score.push(segmentScores);
      }
      // only apply the strict bonus to the last score
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
    if (options.strict && options.end) {
      var i = score.length - 1;
      score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
    }
    // TODO: dev only warn double trailing slash
    if (!options.strict) pattern += '/?';
    if (options.end) pattern += '$';
    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
    else if (options.strict) pattern += '(?:/|$)';
    var re = new RegExp(pattern, options.sensitive ? '' : 'i');
    function parse(path) {
      var match = path.match(re);
      var params = {};
      if (!match) return null;
      for (var _i2 = 1; _i2 < match.length; _i2++) {
        var value = match[_i2] || '';
        var key = keys[_i2 - 1];
        params[key.name] = value && key.repeatable ? value.split('/') : value;
      }
      return params;
    }
    function stringify(params) {
      var path = '';
      // for optional parameters to allow to be empty
      var avoidDuplicatedSlash = false;
      var _iterator4 = _createForOfIteratorHelper(segments),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var segment = _step4.value;
          if (!avoidDuplicatedSlash || !path.endsWith('/')) path += '/';
          avoidDuplicatedSlash = false;
          var _iterator5 = _createForOfIteratorHelper(segment),
            _step5;
          try {
            for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
              var token = _step5.value;
              if (token.type === 0 /* TokenType.Static */) {
                path += token.value;
              } else if (token.type === 1 /* TokenType.Param */) {
                var value = token.value,
                  repeatable = token.repeatable,
                  optional = token.optional;
                var param = value in params ? params[value] : '';
                if (isArray(param) && !repeatable) {
                  throw new Error("Provided param \"".concat(value, "\" is an array but it is not repeatable (* or + modifiers)"));
                }
                var text = isArray(param) ? param.join('/') : param;
                if (!text) {
                  if (optional) {
                    // if we have more than one optional param like /:a?-static we don't need to care about the optional param
                    if (segment.length < 2) {
                      // remove the last slash as we could be at the end
                      if (path.endsWith('/')) path = path.slice(0, -1);
                      // do not append a slash on the next iteration
                      else avoidDuplicatedSlash = true;
                    }
                  } else throw new Error("Missing required param \"".concat(value, "\""));
                }
                path += text;
              }
            }
          } catch (err) {
            _iterator5.e(err);
          } finally {
            _iterator5.f();
          }
        }
        // avoid empty path when we have multiple optional params
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      return path || '/';
    }
    return {
      re: re,
      score: score,
      keys: keys,
      parse: parse,
      stringify: stringify
    };
  }
  /**
   * Compares an array of numbers as used in PathParser.score and returns a
   * number. This function can be used to `sort` an array
   *
   * @param a - first array of numbers
   * @param b - second array of numbers
   * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
   * should be sorted first
   */
  function compareScoreArray(a, b) {
    var i = 0;
    while (i < a.length && i < b.length) {
      var diff = b[i] - a[i];
      // only keep going if diff === 0
      if (diff) return diff;
      i++;
    }
    // if the last subsegment was Static, the shorter segments should be sorted first
    // otherwise sort the longest segment first
    if (a.length < b.length) {
      return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */ ? -1 : 1;
    } else if (a.length > b.length) {
      return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */ ? 1 : -1;
    }
    return 0;
  }
  /**
   * Compare function that can be used with `sort` to sort an array of PathParser
   *
   * @param a - first PathParser
   * @param b - second PathParser
   * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
   */
  function comparePathParserScore(a, b) {
    var i = 0;
    var aScore = a.score;
    var bScore = b.score;
    while (i < aScore.length && i < bScore.length) {
      var comp = compareScoreArray(aScore[i], bScore[i]);
      // do not return if both are equal
      if (comp) return comp;
      i++;
    }
    if (Math.abs(bScore.length - aScore.length) === 1) {
      if (isLastScoreNegative(aScore)) return 1;
      if (isLastScoreNegative(bScore)) return -1;
    }
    // if a and b share the same score entries but b has more, sort b first
    return bScore.length - aScore.length;
    // this is the ternary version
    // return aScore.length < bScore.length
    //   ? 1
    //   : aScore.length > bScore.length
    //   ? -1
    //   : 0
  }
  /**
   * This allows detecting splats at the end of a path: /home/:id(.*)*
   *
   * @param score - score to check
   * @returns true if the last entry is negative
   */
  function isLastScoreNegative(score) {
    var last = score[score.length - 1];
    return score.length > 0 && last[last.length - 1] < 0;
  }
  var ROOT_TOKEN = {
    type: 0 /* TokenType.Static */,
    value: ''
  };
  var VALID_PARAM_RE = /[a-zA-Z0-9_]/;
  // After some profiling, the cache seems to be unnecessary because tokenizePath
  // (the slowest part of adding a route) is very fast
  // const tokenCache = new Map<string, Token[][]>()
  function tokenizePath(path) {
    if (!path) return [[]];
    if (path === '/') return [[ROOT_TOKEN]];
    if (!path.startsWith('/')) {
      throw new Error(process.env.NODE_ENV !== 'production' ? "Route paths should start with a \"/\": \"".concat(path, "\" should be \"/").concat(path, "\".") : "Invalid path \"".concat(path, "\""));
    }
    // if (tokenCache.has(path)) return tokenCache.get(path)!
    function crash(message) {
      throw new Error("ERR (".concat(state, ")/\"").concat(buffer, "\": ").concat(message));
    }
    var state = 0 /* TokenizerState.Static */;
    var previousState = state;
    var tokens = [];
    // the segment will always be valid because we get into the initial state
    // with the leading /
    var segment;
    function finalizeSegment() {
      if (segment) tokens.push(segment);
      segment = [];
    }
    // index on the path
    var i = 0;
    // char at index
    var _char;
    // buffer of the value read
    var buffer = '';
    // custom regexp for a param
    var customRe = '';
    function consumeBuffer() {
      if (!buffer) return;
      if (state === 0 /* TokenizerState.Static */) {
        segment.push({
          type: 0 /* TokenType.Static */,
          value: buffer
        });
      } else if (state === 1 /* TokenizerState.Param */ || state === 2 /* TokenizerState.ParamRegExp */ || state === 3 /* TokenizerState.ParamRegExpEnd */) {
        if (segment.length > 1 && (_char === '*' || _char === '+')) crash("A repeatable param (".concat(buffer, ") must be alone in its segment. eg: '/:ids+."));
        segment.push({
          type: 1 /* TokenType.Param */,
          value: buffer,
          regexp: customRe,
          repeatable: _char === '*' || _char === '+',
          optional: _char === '*' || _char === '?'
        });
      } else {
        crash('Invalid state to consume buffer');
      }
      buffer = '';
    }
    function addCharToBuffer() {
      buffer += _char;
    }
    while (i < path.length) {
      _char = path[i++];
      if (_char === '\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
        previousState = state;
        state = 4 /* TokenizerState.EscapeNext */;
        continue;
      }
      switch (state) {
        case 0 /* TokenizerState.Static */:
          if (_char === '/') {
            if (buffer) {
              consumeBuffer();
            }
            finalizeSegment();
          } else if (_char === ':') {
            consumeBuffer();
            state = 1 /* TokenizerState.Param */;
          } else {
            addCharToBuffer();
          }
          break;
        case 4 /* TokenizerState.EscapeNext */:
          addCharToBuffer();
          state = previousState;
          break;
        case 1 /* TokenizerState.Param */:
          if (_char === '(') {
            state = 2 /* TokenizerState.ParamRegExp */;
          } else if (VALID_PARAM_RE.test(_char)) {
            addCharToBuffer();
          } else {
            consumeBuffer();
            state = 0 /* TokenizerState.Static */;
            // go back one character if we were not modifying
            if (_char !== '*' && _char !== '?' && _char !== '+') i--;
          }
          break;
        case 2 /* TokenizerState.ParamRegExp */:
          // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
          // it already works by escaping the closing )
          // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
          // is this really something people need since you can also write
          // /prefix_:p()_suffix
          if (_char === ')') {
            // handle the escaped )
            if (customRe[customRe.length - 1] == '\\') customRe = customRe.slice(0, -1) + _char;else state = 3 /* TokenizerState.ParamRegExpEnd */;
          } else {
            customRe += _char;
          }
          break;
        case 3 /* TokenizerState.ParamRegExpEnd */:
          // same as finalizing a param
          consumeBuffer();
          state = 0 /* TokenizerState.Static */;
          // go back one character if we were not modifying
          if (_char !== '*' && _char !== '?' && _char !== '+') i--;
          customRe = '';
          break;
        default:
          crash('Unknown state');
          break;
      }
    }
    if (state === 2 /* TokenizerState.ParamRegExp */) crash("Unfinished custom RegExp for param \"".concat(buffer, "\""));
    consumeBuffer();
    finalizeSegment();
    // tokenCache.set(path, tokens)
    return tokens;
  }
  function createRouteRecordMatcher(record, parent, options) {
    var parser = tokensToParser(tokenizePath(record.path), options);
    // warn against params with the same name
    if (process.env.NODE_ENV !== 'production') {
      var existingKeys = new Set();
      var _iterator6 = _createForOfIteratorHelper(parser.keys),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var key = _step6.value;
          if (existingKeys.has(key.name)) warn("Found duplicated params with name \"".concat(key.name, "\" for path \"").concat(record.path, "\". Only the last one will be available on \"$route.params\"."));
          existingKeys.add(key.name);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
    var matcher = assign(parser, {
      record: record,
      parent: parent,
      // these needs to be populated by the parent
      children: [],
      alias: []
    });
    if (parent) {
      // both are aliases or both are not aliases
      // we don't want to mix them because the order is used when
      // passing originalRecord in Matcher.addRoute
      if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
    }
    return matcher;
  }

  /**
   * Creates a Router Matcher.
   *
   * @internal
   * @param routes - array of initial routes
   * @param globalOptions - global route options
   */
  function createRouterMatcher(routes, globalOptions) {
    // normalized ordered array of matchers
    var matchers = [];
    var matcherMap = new Map();
    globalOptions = mergeOptions({
      strict: false,
      end: true,
      sensitive: false
    }, globalOptions);
    function getRecordMatcher(name) {
      return matcherMap.get(name);
    }
    function addRoute(record, parent, originalRecord) {
      // used later on to remove by name
      var isRootAdd = !originalRecord;
      var mainNormalizedRecord = normalizeRouteRecord(record);
      if (process.env.NODE_ENV !== 'production') {
        checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent);
      }
      // we might be the child of an alias
      mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
      var options = mergeOptions(globalOptions, record);
      // generate an array of records to correctly handle aliases
      var normalizedRecords = [mainNormalizedRecord];
      if ('alias' in record) {
        var aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
        var _iterator7 = _createForOfIteratorHelper(aliases),
          _step7;
        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
            var alias = _step7.value;
            normalizedRecords.push(assign({}, mainNormalizedRecord, {
              // this allows us to hold a copy of the `components` option
              // so that async components cache is hold on the original record
              components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
              path: alias,
              // we might be the child of an alias
              aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
              // the aliases are always of the same kind as the original since they
              // are defined on the same record
            }));
          }
        } catch (err) {
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      }
      var matcher;
      var originalMatcher;
      for (var _i3 = 0, _normalizedRecords = normalizedRecords; _i3 < _normalizedRecords.length; _i3++) {
        var normalizedRecord = _normalizedRecords[_i3];
        var path = normalizedRecord.path;
        // Build up the path for nested routes if the child isn't an absolute
        // route. Only add the / delimiter if the child path isn't empty and if the
        // parent path doesn't have a trailing slash
        if (parent && path[0] !== '/') {
          var parentPath = parent.record.path;
          var connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
          normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
        }
        if (process.env.NODE_ENV !== 'production' && normalizedRecord.path === '*') {
          throw new Error('Catch all routes ("*") must now be defined using a param with a custom regexp.\n' + 'See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.');
        }
        // create the object beforehand, so it can be passed to children
        matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
        if (process.env.NODE_ENV !== 'production' && parent && path[0] === '/') checkMissingParamsInAbsolutePath(matcher, parent);
        // if we are an alias we must tell the original record that we exist,
        // so we can be removed
        if (originalRecord) {
          originalRecord.alias.push(matcher);
          if (process.env.NODE_ENV !== 'production') {
            checkSameParams(originalRecord, matcher);
          }
        } else {
          // otherwise, the first record is the original and others are aliases
          originalMatcher = originalMatcher || matcher;
          if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
          // remove the route if named and only for the top record (avoid in nested calls)
          // this works because the original record is the first one
          if (isRootAdd && record.name && !isAliasRecord(matcher)) removeRoute(record.name);
        }
        if (mainNormalizedRecord.children) {
          var children = mainNormalizedRecord.children;
          for (var i = 0; i < children.length; i++) {
            addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
          }
        }
        // if there was no original record, then the first one was not an alias and all
        // other aliases (if any) need to reference this record when adding children
        originalRecord = originalRecord || matcher;
        // TODO: add normalized records for more flexibility
        // if (parent && isAliasRecord(originalRecord)) {
        //   parent.children.push(originalRecord)
        // }
        // Avoid adding a record that doesn't display anything. This allows passing through records without a component to
        // not be reached and pass through the catch all route
        if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
          insertMatcher(matcher);
        }
      }
      return originalMatcher ? function () {
        // since other matchers are aliases, they should be removed by the original matcher
        removeRoute(originalMatcher);
      } : noop;
    }
    function removeRoute(matcherRef) {
      if (isRouteName(matcherRef)) {
        var matcher = matcherMap.get(matcherRef);
        if (matcher) {
          matcherMap["delete"](matcherRef);
          matchers.splice(matchers.indexOf(matcher), 1);
          matcher.children.forEach(removeRoute);
          matcher.alias.forEach(removeRoute);
        }
      } else {
        var index = matchers.indexOf(matcherRef);
        if (index > -1) {
          matchers.splice(index, 1);
          if (matcherRef.record.name) matcherMap["delete"](matcherRef.record.name);
          matcherRef.children.forEach(removeRoute);
          matcherRef.alias.forEach(removeRoute);
        }
      }
    }
    function getRoutes() {
      return matchers;
    }
    function insertMatcher(matcher) {
      var i = 0;
      while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (
      // Adding children with empty path should still appear before the parent
      // https://github.com/vuejs/router/issues/1124
      matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i]))) i++;
      matchers.splice(i, 0, matcher);
      // only add the original record to the name map
      if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
    }
    function resolve(location, currentLocation) {
      var matcher;
      var params = {};
      var path;
      var name;
      if ('name' in location && location.name) {
        matcher = matcherMap.get(location.name);
        if (!matcher) throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
          location: location
        });
        // warn if the user is passing invalid params so they can debug it better when they get removed
        if (process.env.NODE_ENV !== 'production') {
          var invalidParams = Object.keys(location.params || {}).filter(function (paramName) {
            return !matcher.keys.find(function (k) {
              return k.name === paramName;
            });
          });
          if (invalidParams.length) {
            warn("Discarded invalid param(s) \"".concat(invalidParams.join('", "'), "\" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details."));
          }
        }
        name = matcher.record.name;
        params = assign(
        // paramsFromLocation is a new object
        paramsFromLocation(currentLocation.params,
        // only keep params that exist in the resolved location
        // TODO: only keep optional params coming from a parent record
        matcher.keys.filter(function (k) {
          return !k.optional;
        }).map(function (k) {
          return k.name;
        })),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        location.params && paramsFromLocation(location.params, matcher.keys.map(function (k) {
          return k.name;
        })));
        // throws if cannot be stringified
        path = matcher.stringify(params);
      } else if ('path' in location) {
        // no need to resolve the path with the matcher as it was provided
        // this also allows the user to control the encoding
        path = location.path;
        if (process.env.NODE_ENV !== 'production' && !path.startsWith('/')) {
          warn("The Matcher cannot resolve relative paths but received \"".concat(path, "\". Unless you directly called `matcher.resolve(\"").concat(path, "\")`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router."));
        }
        matcher = matchers.find(function (m) {
          return m.re.test(path);
        });
        // matcher should have a value after the loop
        if (matcher) {
          // we know the matcher works because we tested the regexp
          params = matcher.parse(path);
          name = matcher.record.name;
        }
        // location is a relative path
      } else {
        // match by name or path of current route
        matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find(function (m) {
          return m.re.test(currentLocation.path);
        });
        if (!matcher) throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
          location: location,
          currentLocation: currentLocation
        });
        name = matcher.record.name;
        // since we are navigating to the same location, we don't need to pick the
        // params like when `name` is provided
        params = assign({}, currentLocation.params, location.params);
        path = matcher.stringify(params);
      }
      var matched = [];
      var parentMatcher = matcher;
      while (parentMatcher) {
        // reversed order so parents are at the beginning
        matched.unshift(parentMatcher.record);
        parentMatcher = parentMatcher.parent;
      }
      return {
        name: name,
        path: path,
        params: params,
        matched: matched,
        meta: mergeMetaFields(matched)
      };
    }
    // add initial routes
    routes.forEach(function (route) {
      return addRoute(route);
    });
    return {
      addRoute: addRoute,
      resolve: resolve,
      removeRoute: removeRoute,
      getRoutes: getRoutes,
      getRecordMatcher: getRecordMatcher
    };
  }
  function paramsFromLocation(params, keys) {
    var newParams = {};
    var _iterator8 = _createForOfIteratorHelper(keys),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var key = _step8.value;
        if (key in params) newParams[key] = params[key];
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return newParams;
  }
  /**
   * Normalizes a RouteRecordRaw. Creates a copy
   *
   * @param record
   * @returns the normalized version
   */
  function normalizeRouteRecord(record) {
    return {
      path: record.path,
      redirect: record.redirect,
      name: record.name,
      meta: record.meta || {},
      aliasOf: undefined,
      beforeEnter: record.beforeEnter,
      props: normalizeRecordProps(record),
      children: record.children || [],
      instances: {},
      leaveGuards: new Set(),
      updateGuards: new Set(),
      enterCallbacks: {},
      components: 'components' in record ? record.components || null : record.component && {
        "default": record.component
      }
    };
  }
  /**
   * Normalize the optional `props` in a record to always be an object similar to
   * components. Also accept a boolean for components.
   * @param record
   */
  function normalizeRecordProps(record) {
    var propsObject = {};
    // props does not exist on redirect records, but we can set false directly
    var props = record.props || false;
    if ('component' in record) {
      propsObject["default"] = props;
    } else {
      // NOTE: we could also allow a function to be applied to every component.
      // Would need user feedback for use cases
      for (var name in record.components) propsObject[name] = typeof props === 'boolean' ? props : props[name];
    }
    return propsObject;
  }
  /**
   * Checks if a record or any of its parent is an alias
   * @param record
   */
  function isAliasRecord(record) {
    while (record) {
      if (record.record.aliasOf) return true;
      record = record.parent;
    }
    return false;
  }
  /**
   * Merge meta fields of an array of records
   *
   * @param matched - array of matched records
   */
  function mergeMetaFields(matched) {
    return matched.reduce(function (meta, record) {
      return assign(meta, record.meta);
    }, {});
  }
  function mergeOptions(defaults, partialOptions) {
    var options = {};
    for (var key in defaults) {
      options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
    }
    return options;
  }
  function isSameParam(a, b) {
    return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
  }
  /**
   * Check if a path and its alias have the same required params
   *
   * @param a - original record
   * @param b - alias record
   */
  function checkSameParams(a, b) {
    var _iterator9 = _createForOfIteratorHelper(a.keys),
      _step9;
    try {
      for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
        var key = _step9.value;
        if (!key.optional && !b.keys.find(isSameParam.bind(null, key))) return warn("Alias \"".concat(b.record.path, "\" and the original record: \"").concat(a.record.path, "\" must have the exact same param named \"").concat(key.name, "\""));
      }
    } catch (err) {
      _iterator9.e(err);
    } finally {
      _iterator9.f();
    }
    var _iterator10 = _createForOfIteratorHelper(b.keys),
      _step10;
    try {
      for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
        var _key = _step10.value;
        if (!_key.optional && !a.keys.find(isSameParam.bind(null, _key))) return warn("Alias \"".concat(b.record.path, "\" and the original record: \"").concat(a.record.path, "\" must have the exact same param named \"").concat(_key.name, "\""));
      }
    } catch (err) {
      _iterator10.e(err);
    } finally {
      _iterator10.f();
    }
  }
  /**
   * A route with a name and a child with an empty path without a name should warn when adding the route
   *
   * @param mainNormalizedRecord - RouteRecordNormalized
   * @param parent - RouteRecordMatcher
   */
  function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
    if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
      warn("The route named \"".concat(String(parent.record.name), "\" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning."));
    }
  }
  function checkMissingParamsInAbsolutePath(record, parent) {
    var _iterator11 = _createForOfIteratorHelper(parent.keys),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var key = _step11.value;
        if (!record.keys.find(isSameParam.bind(null, key))) return warn("Absolute path \"".concat(record.record.path, "\" must have the exact same param named \"").concat(key.name, "\" as its parent \"").concat(parent.record.path, "\"."));
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
  }
  function isRecordChildOf(record, parent) {
    return parent.children.some(function (child) {
      return child === record || isRecordChildOf(record, child);
    });
  }

  /**
   * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
   * < > `
   *
   * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
   * defines some extra characters to be encoded. Most browsers do not encode them
   * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
   * also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
   * plus `-._~`. This extra safety should be applied to query by patching the
   * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
   * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
   * into a `/` if directly typed in. The _backtick_ (`````) should also be
   * encoded everywhere because some browsers like FF encode it when directly
   * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
   */
  // const EXTRA_RESERVED_RE = /[!'()*]/g
  // const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
  var HASH_RE = /#/g; // %23
  var AMPERSAND_RE = /&/g; // %26
  var SLASH_RE = /\//g; // %2F
  var EQUAL_RE = /=/g; // %3D
  var IM_RE = /\?/g; // %3F
  var PLUS_RE = /\+/g; // %2B
  /**
   * NOTE: It's not clear to me if we should encode the + symbol in queries, it
   * seems to be less flexible than not doing so and I can't find out the legacy
   * systems requiring this for regular requests like text/html. In the standard,
   * the encoding of the plus character is only mentioned for
   * application/x-www-form-urlencoded
   * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
   * leave the plus character as is in queries. To be more flexible, we allow the
   * plus character on the query, but it can also be manually encoded by the user.
   *
   * Resources:
   * - https://url.spec.whatwg.org/#urlencoded-parsing
   * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
   */
  var ENC_BRACKET_OPEN_RE = /%5B/g; // [
  var ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
  var ENC_CARET_RE = /%5E/g; // ^
  var ENC_BACKTICK_RE = /%60/g; // `
  var ENC_CURLY_OPEN_RE = /%7B/g; // {
  var ENC_PIPE_RE = /%7C/g; // |
  var ENC_CURLY_CLOSE_RE = /%7D/g; // }
  var ENC_SPACE_RE = /%20/g; // }
  /**
   * Encode characters that need to be encoded on the path, search and hash
   * sections of the URL.
   *
   * @internal
   * @param text - string to encode
   * @returns encoded string
   */
  function commonEncode(text) {
    return encodeURI('' + text).replace(ENC_PIPE_RE, '|').replace(ENC_BRACKET_OPEN_RE, '[').replace(ENC_BRACKET_CLOSE_RE, ']');
  }
  /**
   * Encode characters that need to be encoded on the hash section of the URL.
   *
   * @param text - string to encode
   * @returns encoded string
   */
  function encodeHash(text) {
    return commonEncode(text).replace(ENC_CURLY_OPEN_RE, '{').replace(ENC_CURLY_CLOSE_RE, '}').replace(ENC_CARET_RE, '^');
  }
  /**
   * Encode characters that need to be encoded query values on the query
   * section of the URL.
   *
   * @param text - string to encode
   * @returns encoded string
   */
  function encodeQueryValue(text) {
    return commonEncode(text)
    // Encode the space as +, encode the + to differentiate it from the space
    .replace(PLUS_RE, '%2B').replace(ENC_SPACE_RE, '+').replace(HASH_RE, '%23').replace(AMPERSAND_RE, '%26').replace(ENC_BACKTICK_RE, '`').replace(ENC_CURLY_OPEN_RE, '{').replace(ENC_CURLY_CLOSE_RE, '}').replace(ENC_CARET_RE, '^');
  }
  /**
   * Like `encodeQueryValue` but also encodes the `=` character.
   *
   * @param text - string to encode
   */
  function encodeQueryKey(text) {
    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
  }
  /**
   * Encode characters that need to be encoded on the path section of the URL.
   *
   * @param text - string to encode
   * @returns encoded string
   */
  function encodePath(text) {
    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
  }
  /**
   * Encode characters that need to be encoded on the path section of the URL as a
   * param. This function encodes everything {@link encodePath} does plus the
   * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
   * string instead.
   *
   * @param text - string to encode
   * @returns encoded string
   */
  function encodeParam(text) {
    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
  }
  /**
   * Decode text using `decodeURIComponent`. Returns the original text if it
   * fails.
   *
   * @param text - string to decode
   * @returns decoded string
   */
  function decode(text) {
    try {
      return decodeURIComponent('' + text);
    } catch (err) {
      process.env.NODE_ENV !== 'production' && warn("Error decoding \"".concat(text, "\". Using original value"));
    }
    return '' + text;
  }

  /**
   * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
   * version with the leading `?` and without Should work as URLSearchParams

   * @internal
   *
   * @param search - search string to parse
   * @returns a query object
   */
  function parseQuery(search) {
    var query = {};
    // avoid creating an object with an empty key and empty value
    // because of split('&')
    if (search === '' || search === '?') return query;
    var hasLeadingIM = search[0] === '?';
    var searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
    for (var i = 0; i < searchParams.length; ++i) {
      // pre decode the + into space
      var searchParam = searchParams[i].replace(PLUS_RE, ' ');
      // allow the = character
      var eqPos = searchParam.indexOf('=');
      var key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
      var value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
      if (key in query) {
        // an extra variable for ts types
        var currentValue = query[key];
        if (!isArray(currentValue)) {
          currentValue = query[key] = [currentValue];
        }
        currentValue.push(value);
      } else {
        query[key] = value;
      }
    }
    return query;
  }
  /**
   * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
   * doesn't prepend a `?`
   *
   * @internal
   *
   * @param query - query object to stringify
   * @returns string version of the query without the leading `?`
   */
  function stringifyQuery(query) {
    var search = '';
    var _loop = function _loop(key) {
      var value = query[key];
      key = encodeQueryKey(key);
      if (value == null) {
        // only null adds the value
        if (value !== undefined) {
          search += (search.length ? '&' : '') + key;
        }
        return "continue";
      }
      // keep null values
      var values = isArray(value) ? value.map(function (v) {
        return v && encodeQueryValue(v);
      }) : [value && encodeQueryValue(value)];
      values.forEach(function (value) {
        // skip undefined values in arrays as if they were not present
        // smaller code than using filter
        if (value !== undefined) {
          // only append & with non-empty search
          search += (search.length ? '&' : '') + key;
          if (value != null) search += '=' + value;
        }
      });
    };
    for (var key in query) {
      var _ret = _loop(key);
      if (_ret === "continue") continue;
    }
    return search;
  }
  /**
   * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
   * numbers into strings, removing keys with an undefined value and replacing
   * undefined with null in arrays
   *
   * @param query - query object to normalize
   * @returns a normalized query object
   */
  function normalizeQuery(query) {
    var normalizedQuery = {};
    for (var key in query) {
      var value = query[key];
      if (value !== undefined) {
        normalizedQuery[key] = isArray(value) ? value.map(function (v) {
          return v == null ? null : '' + v;
        }) : value == null ? value : '' + value;
      }
    }
    return normalizedQuery;
  }

  /**
   * RouteRecord being rendered by the closest ancestor Router View. Used for
   * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
   * Location Matched
   *
   * @internal
   */
  var matchedRouteKey = Symbol(process.env.NODE_ENV !== 'production' ? 'router view location matched' : '');
  /**
   * Allows overriding the router view depth to control which component in
   * `matched` is rendered. rvd stands for Router View Depth
   *
   * @internal
   */
  var viewDepthKey = Symbol(process.env.NODE_ENV !== 'production' ? 'router view depth' : '');
  /**
   * Allows overriding the router instance returned by `useRouter` in tests. r
   * stands for router
   *
   * @internal
   */
  var routerKey = Symbol(process.env.NODE_ENV !== 'production' ? 'router' : '');
  /**
   * Allows overriding the current route returned by `useRoute` in tests. rl
   * stands for route location
   *
   * @internal
   */
  var routeLocationKey = Symbol(process.env.NODE_ENV !== 'production' ? 'route location' : '');
  /**
   * Allows overriding the current route used by router-view. Internally this is
   * used when the `route` prop is passed.
   *
   * @internal
   */
  var routerViewLocationKey = Symbol(process.env.NODE_ENV !== 'production' ? 'router view location' : '');

  /**
   * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
   */
  function useCallbacks() {
    var handlers = [];
    function add(handler) {
      handlers.push(handler);
      return function () {
        var i = handlers.indexOf(handler);
        if (i > -1) handlers.splice(i, 1);
      };
    }
    function reset() {
      handlers = [];
    }
    return {
      add: add,
      list: function list() {
        return handlers;
      },
      reset: reset
    };
  }
  function guardToPromiseFn(guard, to, from, record, name) {
    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
    var enterCallbackArray = record && (
    // name is defined if record is because of the function overload
    record.enterCallbacks[name] = record.enterCallbacks[name] || []);
    return function () {
      return new Promise(function (resolve, reject) {
        var next = function next(valid) {
          if (valid === false) {
            reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
              from: from,
              to: to
            }));
          } else if (valid instanceof Error) {
            reject(valid);
          } else if (isRouteLocation(valid)) {
            reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
              from: to,
              to: valid
            }));
          } else {
            if (enterCallbackArray &&
            // since enterCallbackArray is truthy, both record and name also are
            record.enterCallbacks[name] === enterCallbackArray && typeof valid === 'function') {
              enterCallbackArray.push(valid);
            }
            resolve();
          }
        };
        // wrapping with Promise.resolve allows it to work with both async and sync guards
        var guardReturn = guard.call(record && record.instances[name], to, from, process.env.NODE_ENV !== 'production' ? canOnlyBeCalledOnce(next, to, from) : next);
        var guardCall = Promise.resolve(guardReturn);
        if (guard.length < 3) guardCall = guardCall.then(next);
        if (process.env.NODE_ENV !== 'production' && guard.length > 2) {
          var message = "The \"next\" callback was never called inside of ".concat(guard.name ? '"' + guard.name + '"' : '', ":\n").concat(guard.toString(), "\n. If you are returning a value instead of calling \"next\", make sure to remove the \"next\" parameter from your function.");
          if (_typeof(guardReturn) === 'object' && 'then' in guardReturn) {
            guardCall = guardCall.then(function (resolvedValue) {
              // @ts-expect-error: _called is added at canOnlyBeCalledOnce
              if (!next._called) {
                warn(message);
                return Promise.reject(new Error('Invalid navigation guard'));
              }
              return resolvedValue;
            });
          } else if (guardReturn !== undefined) {
            // @ts-expect-error: _called is added at canOnlyBeCalledOnce
            if (!next._called) {
              warn(message);
              reject(new Error('Invalid navigation guard'));
              return;
            }
          }
        }
        guardCall["catch"](function (err) {
          return reject(err);
        });
      });
    };
  }
  function canOnlyBeCalledOnce(next, to, from) {
    var called = 0;
    return function () {
      if (called++ === 1) warn("The \"next\" callback was called more than once in one navigation guard when going from \"".concat(from.fullPath, "\" to \"").concat(to.fullPath, "\". It should be called exactly one time in each navigation guard. This will fail in production."));
      // @ts-expect-error: we put it in the original one because it's easier to check
      next._called = true;
      if (called === 1) next.apply(null, arguments);
    };
  }
  function extractComponentsGuards(matched, guardType, to, from) {
    var guards = [];
    var _iterator12 = _createForOfIteratorHelper(matched),
      _step12;
    try {
      var _loop2 = function _loop2() {
        var record = _step12.value;
        if (process.env.NODE_ENV !== 'production' && !record.components && !record.children.length) {
          warn("Record with path \"".concat(record.path, "\" is either missing a \"component(s)\"") + " or \"children\" property.");
        }
        var _loop3 = function _loop3(name) {
          var rawComponent = record.components[name];
          if (process.env.NODE_ENV !== 'production') {
            if (!rawComponent || _typeof(rawComponent) !== 'object' && typeof rawComponent !== 'function') {
              warn("Component \"".concat(name, "\" in record with path \"").concat(record.path, "\" is not") + " a valid component. Received \"".concat(String(rawComponent), "\"."));
              // throw to ensure we stop here but warn to ensure the message isn't
              // missed by the user
              throw new Error('Invalid route component');
            } else if ('then' in rawComponent) {
              // warn if user wrote import('/component.vue') instead of () =>
              // import('./component.vue')
              warn("Component \"".concat(name, "\" in record with path \"").concat(record.path, "\" is a ") + "Promise instead of a function that returns a Promise. Did you " + "write \"import('./MyPage.vue')\" instead of " + "\"() => import('./MyPage.vue')\" ? This will break in " + "production if not fixed.");
              var promise = rawComponent;
              rawComponent = function rawComponent() {
                return promise;
              };
            } else if (rawComponent.__asyncLoader &&
            // warn only once per component
            !rawComponent.__warnedDefineAsync) {
              rawComponent.__warnedDefineAsync = true;
              warn("Component \"".concat(name, "\" in record with path \"").concat(record.path, "\" is defined ") + "using \"defineAsyncComponent()\". " + "Write \"() => import('./MyPage.vue')\" instead of " + "\"defineAsyncComponent(() => import('./MyPage.vue'))\".");
            }
          }
          // skip update and leave guards if the route component is not mounted
          if (guardType !== 'beforeRouteEnter' && !record.instances[name]) return "continue";
          if (isRouteComponent(rawComponent)) {
            // __vccOpts is added by vue-class-component and contain the regular options
            var options = rawComponent.__vccOpts || rawComponent;
            var guard = options[guardType];
            guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
          } else {
            // start requesting the chunk already
            var componentPromise = rawComponent();
            if (process.env.NODE_ENV !== 'production' && !('catch' in componentPromise)) {
              warn("Component \"".concat(name, "\" in record with path \"").concat(record.path, "\" is a function that does not return a Promise. If you were passing a functional component, make sure to add a \"displayName\" to the component. This will break in production if not fixed."));
              componentPromise = Promise.resolve(componentPromise);
            }
            guards.push(function () {
              return componentPromise.then(function (resolved) {
                if (!resolved) return Promise.reject(new Error("Couldn't resolve component \"".concat(name, "\" at \"").concat(record.path, "\"")));
                var resolvedComponent = isESModule(resolved) ? resolved["default"] : resolved;
                // replace the function with the resolved component
                // cannot be null or undefined because we went into the for loop
                record.components[name] = resolvedComponent;
                // __vccOpts is added by vue-class-component and contain the regular options
                var options = resolvedComponent.__vccOpts || resolvedComponent;
                var guard = options[guardType];
                return guard && guardToPromiseFn(guard, to, from, record, name)();
              });
            });
          }
        };
        for (var name in record.components) {
          var _ret2 = _loop3(name);
          if (_ret2 === "continue") continue;
        }
      };
      for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
        _loop2();
      }
    } catch (err) {
      _iterator12.e(err);
    } finally {
      _iterator12.f();
    }
    return guards;
  }
  /**
   * Allows differentiating lazy components from functional components and vue-class-component
   * @internal
   *
   * @param component
   */
  function isRouteComponent(component) {
    return _typeof(component) === 'object' || 'displayName' in component || 'props' in component || '__vccOpts' in component;
  }

  // TODO: we could allow currentRoute as a prop to expose `isActive` and
  // `isExactActive` behavior should go through an RFC
  function useLink(props) {
    var router = inject(routerKey);
    var currentRoute = inject(routeLocationKey);
    var route = computed(function () {
      return router.resolve(unref(props.to));
    });
    var activeRecordIndex = computed(function () {
      var matched = route.value.matched;
      var length = matched.length;
      var routeMatched = matched[length - 1];
      var currentMatched = currentRoute.matched;
      if (!routeMatched || !currentMatched.length) return -1;
      var index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
      if (index > -1) return index;
      // possible parent record
      var parentRecordPath = getOriginalPath(matched[length - 2]);
      return (
        // we are dealing with nested routes
        length > 1 &&
        // if the parent and matched route have the same path, this link is
        // referring to the empty child. Or we currently are on a different
        // child of the same parent
        getOriginalPath(routeMatched) === parentRecordPath &&
        // avoid comparing the child with its parent
        currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
      );
    });
    var isActive = computed(function () {
      return activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params);
    });
    var isExactActive = computed(function () {
      return activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params);
    });
    function navigate() {
      var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (guardEvent(e)) {
        return router[unref(props.replace) ? 'replace' : 'push'](unref(props.to)
        // avoid uncaught errors are they are logged anyway
        )["catch"](noop);
      }
      return Promise.resolve();
    }
    // devtools only
    if ((process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) && isBrowser) {
      var instance = getCurrentInstance();
      if (instance) {
        var linkContextDevtools = {
          route: route.value,
          isActive: isActive.value,
          isExactActive: isExactActive.value
        };
        // @ts-expect-error: this is internal
        instance.__vrl_devtools = instance.__vrl_devtools || [];
        // @ts-expect-error: this is internal
        instance.__vrl_devtools.push(linkContextDevtools);
        watchEffect(function () {
          linkContextDevtools.route = route.value;
          linkContextDevtools.isActive = isActive.value;
          linkContextDevtools.isExactActive = isExactActive.value;
        }, {
          flush: 'post'
        });
      }
    }
    /**
     * NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
     */
    return {
      route: route,
      href: computed(function () {
        return route.value.href;
      }),
      isActive: isActive,
      isExactActive: isExactActive,
      navigate: navigate
    };
  }
  var RouterLinkImpl = /*#__PURE__*/defineComponent({
    name: 'RouterLink',
    compatConfig: {
      MODE: 3
    },
    props: {
      to: {
        type: [String, Object],
        required: true
      },
      replace: Boolean,
      activeClass: String,
      // inactiveClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: {
        type: String,
        "default": 'page'
      }
    },
    useLink: useLink,
    setup: function setup(props, _ref8) {
      var slots = _ref8.slots;
      var link = reactive(useLink(props));
      var _inject = inject(routerKey),
        options = _inject.options;
      var elClass = computed(function () {
        var _ref9;
        return _ref9 = {}, _defineProperty(_ref9, getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active'), link.isActive), _defineProperty(_ref9, getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active'), link.isExactActive), _ref9;
      });
      return function () {
        var children = slots["default"] && slots["default"](link);
        return props.custom ? children : h('a', {
          'aria-current': link.isExactActive ? props.ariaCurrentValue : null,
          href: link.href,
          // this would override user added attrs but Vue will still add
          // the listener, so we end up triggering both
          onClick: link.navigate,
          "class": elClass.value
        }, children);
      };
    }
  });
  // export the public type for h/tsx inference
  // also to avoid inline import() in generated d.ts files
  /**
   * Component to render a link that triggers a navigation on click.
   */
  var RouterLink = RouterLinkImpl;
  function guardEvent(e) {
    // don't redirect with control keys
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
    // don't redirect when preventDefault called
    if (e.defaultPrevented) return;
    // don't redirect on right click
    if (e.button !== undefined && e.button !== 0) return;
    // don't redirect if `target="_blank"`
    // @ts-expect-error getAttribute does exist
    if (e.currentTarget && e.currentTarget.getAttribute) {
      // @ts-expect-error getAttribute exists
      var target = e.currentTarget.getAttribute('target');
      if (/\b_blank\b/i.test(target)) return;
    }
    // this may be a Weex event which doesn't have this method
    if (e.preventDefault) e.preventDefault();
    return true;
  }
  function includesParams(outer, inner) {
    var _loop4 = function _loop4() {
      var innerValue = inner[key];
      var outerValue = outer[key];
      if (typeof innerValue === 'string') {
        if (innerValue !== outerValue) return {
          v: false
        };
      } else {
        if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some(function (value, i) {
          return value !== outerValue[i];
        })) return {
          v: false
        };
      }
    };
    for (var key in inner) {
      var _ret3 = _loop4();
      if (_typeof(_ret3) === "object") return _ret3.v;
    }
    return true;
  }
  /**
   * Get the original path value of a record by following its aliasOf
   * @param record
   */
  function getOriginalPath(record) {
    return record ? record.aliasOf ? record.aliasOf.path : record.path : '';
  }
  /**
   * Utility class to get the active class based on defaults.
   * @param propClass
   * @param globalClass
   * @param defaultClass
   */
  var getLinkClass = function getLinkClass(propClass, globalClass, defaultClass) {
    return propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
  };
  var RouterViewImpl = /*#__PURE__*/defineComponent({
    name: 'RouterView',
    // #674 we manually inherit them
    inheritAttrs: false,
    props: {
      name: {
        type: String,
        "default": 'default'
      },
      route: Object
    },
    // Better compat for @vue/compat users
    // https://github.com/vuejs/router/issues/1315
    compatConfig: {
      MODE: 3
    },
    setup: function setup(props, _ref10) {
      var attrs = _ref10.attrs,
        slots = _ref10.slots;
      process.env.NODE_ENV !== 'production' && warnDeprecatedUsage();
      var injectedRoute = inject(routerViewLocationKey);
      var routeToDisplay = computed(function () {
        return props.route || injectedRoute.value;
      });
      var injectedDepth = inject(viewDepthKey, 0);
      // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
      // that are used to reuse the `path` property
      var depth = computed(function () {
        var initialDepth = unref(injectedDepth);
        var matched = routeToDisplay.value.matched;
        var matchedRoute;
        while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
          initialDepth++;
        }
        return initialDepth;
      });
      var matchedRouteRef = computed(function () {
        return routeToDisplay.value.matched[depth.value];
      });
      provide(viewDepthKey, computed(function () {
        return depth.value + 1;
      }));
      provide(matchedRouteKey, matchedRouteRef);
      provide(routerViewLocationKey, routeToDisplay);
      var viewRef = ref();
      // watch at the same time the component instance, the route record we are
      // rendering, and the name
      watch(function () {
        return [viewRef.value, matchedRouteRef.value, props.name];
      }, function (_ref11, _ref12) {
        var _ref13 = _slicedToArray(_ref11, 3),
          instance = _ref13[0],
          to = _ref13[1],
          name = _ref13[2];
        var _ref14 = _slicedToArray(_ref12, 3),
          oldInstance = _ref14[0],
          from = _ref14[1];
          _ref14[2];
        // copy reused instances
        if (to) {
          // this will update the instance for new instances as well as reused
          // instances when navigating to a new route
          to.instances[name] = instance;
          // the component instance is reused for a different route or name, so
          // we copy any saved update or leave guards. With async setup, the
          // mounting component will mount before the matchedRoute changes,
          // making instance === oldInstance, so we check if guards have been
          // added before. This works because we remove guards when
          // unmounting/deactivating components
          if (from && from !== to && instance && instance === oldInstance) {
            if (!to.leaveGuards.size) {
              to.leaveGuards = from.leaveGuards;
            }
            if (!to.updateGuards.size) {
              to.updateGuards = from.updateGuards;
            }
          }
        }
        // trigger beforeRouteEnter next callbacks
        if (instance && to && (
        // if there is no instance but to and from are the same this might be
        // the first visit
        !from || !isSameRouteRecord(to, from) || !oldInstance)) {
          (to.enterCallbacks[name] || []).forEach(function (callback) {
            return callback(instance);
          });
        }
      }, {
        flush: 'post'
      });
      return function () {
        var route = routeToDisplay.value;
        // we need the value at the time we render because when we unmount, we
        // navigated to a different location so the value is different
        var currentName = props.name;
        var matchedRoute = matchedRouteRef.value;
        var ViewComponent = matchedRoute && matchedRoute.components[currentName];
        if (!ViewComponent) {
          return normalizeSlot(slots["default"], {
            Component: ViewComponent,
            route: route
          });
        }
        // props from route configuration
        var routePropsOption = matchedRoute.props[currentName];
        var routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === 'function' ? routePropsOption(route) : routePropsOption : null;
        var onVnodeUnmounted = function onVnodeUnmounted(vnode) {
          // remove the instance reference to prevent leak
          if (vnode.component.isUnmounted) {
            matchedRoute.instances[currentName] = null;
          }
        };
        var component = h(ViewComponent, assign({}, routeProps, attrs, {
          onVnodeUnmounted: onVnodeUnmounted,
          ref: viewRef
        }));
        if ((process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) && isBrowser && component.ref) {
          // TODO: can display if it's an alias, its props
          var info = {
            depth: depth.value,
            name: matchedRoute.name,
            path: matchedRoute.path,
            meta: matchedRoute.meta
          };
          var internalInstances = isArray(component.ref) ? component.ref.map(function (r) {
            return r.i;
          }) : [component.ref.i];
          internalInstances.forEach(function (instance) {
            // @ts-expect-error
            instance.__vrv_devtools = info;
          });
        }
        return (
          // pass the vnode to the slot as a prop.
          // h and <component :is="..."> both accept vnodes
          normalizeSlot(slots["default"], {
            Component: component,
            route: route
          }) || component
        );
      };
    }
  });
  function normalizeSlot(slot, data) {
    if (!slot) return null;
    var slotContent = slot(data);
    return slotContent.length === 1 ? slotContent[0] : slotContent;
  }
  // export the public type for h/tsx inference
  // also to avoid inline import() in generated d.ts files
  /**
   * Component to display the current route the user is at.
   */
  var RouterView = RouterViewImpl;
  // warn against deprecated usage with <transition> & <keep-alive>
  // due to functional component being no longer eager in Vue 3
  function warnDeprecatedUsage() {
    var instance = getCurrentInstance();
    var parentName = instance.parent && instance.parent.type.name;
    if (parentName && (parentName === 'KeepAlive' || parentName.includes('Transition'))) {
      var comp = parentName === 'KeepAlive' ? 'keep-alive' : 'transition';
      warn("<router-view> can no longer be used directly inside <transition> or <keep-alive>.\n" + "Use slot props instead:\n\n" + "<router-view v-slot=\"{ Component }\">\n" + "  <".concat(comp, ">\n") + "    <component :is=\"Component\" />\n" + "  </".concat(comp, ">\n") + "</router-view>");
    }
  }

  /**
   * Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
   *
   * @param routeLocation - routeLocation to format
   * @param tooltip - optional tooltip
   * @returns a copy of the routeLocation
   */
  function formatRouteLocation(routeLocation, tooltip) {
    var copy = assign({}, routeLocation, {
      // remove variables that can contain vue instances
      matched: routeLocation.matched.map(function (matched) {
        return omit(matched, ['instances', 'children', 'aliasOf']);
      })
    });
    return {
      _custom: {
        type: null,
        readOnly: true,
        display: routeLocation.fullPath,
        tooltip: tooltip,
        value: copy
      }
    };
  }
  function formatDisplay(display) {
    return {
      _custom: {
        display: display
      }
    };
  }
  // to support multiple router instances
  var routerId = 0;
  function addDevtools(app, router, matcher) {
    // Take over router.beforeEach and afterEach
    // make sure we are not registering the devtool twice
    if (router.__hasDevtools) return;
    router.__hasDevtools = true;
    // increment to support multiple router instances
    var id = routerId++;
    setupDevtoolsPlugin({
      id: 'org.vuejs.router' + (id ? '.' + id : ''),
      label: 'Vue Router',
      packageName: 'vue-router',
      homepage: 'https://router.vuejs.org',
      logo: 'https://router.vuejs.org/logo.png',
      componentStateTypes: ['Routing'],
      app: app
    }, function (api) {
      if (typeof api.now !== 'function') {
        console.warn('[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.');
      }
      // display state added by the router
      api.on.inspectComponent(function (payload, ctx) {
        if (payload.instanceData) {
          payload.instanceData.state.push({
            type: 'Routing',
            key: '$route',
            editable: false,
            value: formatRouteLocation(router.currentRoute.value, 'Current Route')
          });
        }
      });
      // mark router-link as active and display tags on router views
      api.on.visitComponentTree(function (_ref15) {
        var node = _ref15.treeNode,
          componentInstance = _ref15.componentInstance;
        if (componentInstance.__vrv_devtools) {
          var info = componentInstance.__vrv_devtools;
          node.tags.push({
            label: (info.name ? "".concat(info.name.toString(), ": ") : '') + info.path,
            textColor: 0,
            tooltip: 'This component is rendered by &lt;router-view&gt;',
            backgroundColor: PINK_500
          });
        }
        // if multiple useLink are used
        if (isArray(componentInstance.__vrl_devtools)) {
          componentInstance.__devtoolsApi = api;
          componentInstance.__vrl_devtools.forEach(function (devtoolsData) {
            var backgroundColor = ORANGE_400;
            var tooltip = '';
            if (devtoolsData.isExactActive) {
              backgroundColor = LIME_500;
              tooltip = 'This is exactly active';
            } else if (devtoolsData.isActive) {
              backgroundColor = BLUE_600;
              tooltip = 'This link is active';
            }
            node.tags.push({
              label: devtoolsData.route.path,
              textColor: 0,
              tooltip: tooltip,
              backgroundColor: backgroundColor
            });
          });
        }
      });
      watch(router.currentRoute, function () {
        // refresh active state
        refreshRoutesView();
        api.notifyComponentUpdate();
        api.sendInspectorTree(routerInspectorId);
        api.sendInspectorState(routerInspectorId);
      });
      var navigationsLayerId = 'router:navigations:' + id;
      api.addTimelineLayer({
        id: navigationsLayerId,
        label: "Router".concat(id ? ' ' + id : '', " Navigations"),
        color: 0x40a8c4
      });
      // const errorsLayerId = 'router:errors'
      // api.addTimelineLayer({
      //   id: errorsLayerId,
      //   label: 'Router Errors',
      //   color: 0xea5455,
      // })
      router.onError(function (error, to) {
        api.addTimelineEvent({
          layerId: navigationsLayerId,
          event: {
            title: 'Error during Navigation',
            subtitle: to.fullPath,
            logType: 'error',
            time: api.now(),
            data: {
              error: error
            },
            groupId: to.meta.__navigationId
          }
        });
      });
      // attached to `meta` and used to group events
      var navigationId = 0;
      router.beforeEach(function (to, from) {
        var data = {
          guard: formatDisplay('beforeEach'),
          from: formatRouteLocation(from, 'Current Location during this navigation'),
          to: formatRouteLocation(to, 'Target location')
        };
        // Used to group navigations together, hide from devtools
        Object.defineProperty(to.meta, '__navigationId', {
          value: navigationId++
        });
        api.addTimelineEvent({
          layerId: navigationsLayerId,
          event: {
            time: api.now(),
            title: 'Start of navigation',
            subtitle: to.fullPath,
            data: data,
            groupId: to.meta.__navigationId
          }
        });
      });
      router.afterEach(function (to, from, failure) {
        var data = {
          guard: formatDisplay('afterEach')
        };
        if (failure) {
          data.failure = {
            _custom: {
              type: Error,
              readOnly: true,
              display: failure ? failure.message : '',
              tooltip: 'Navigation Failure',
              value: failure
            }
          };
          data.status = formatDisplay('❌');
        } else {
          data.status = formatDisplay('✅');
        }
        // we set here to have the right order
        data.from = formatRouteLocation(from, 'Current Location during this navigation');
        data.to = formatRouteLocation(to, 'Target location');
        api.addTimelineEvent({
          layerId: navigationsLayerId,
          event: {
            title: 'End of navigation',
            subtitle: to.fullPath,
            time: api.now(),
            data: data,
            logType: failure ? 'warning' : 'default',
            groupId: to.meta.__navigationId
          }
        });
      });
      /**
       * Inspector of Existing routes
       */
      var routerInspectorId = 'router-inspector:' + id;
      api.addInspector({
        id: routerInspectorId,
        label: 'Routes' + (id ? ' ' + id : ''),
        icon: 'book',
        treeFilterPlaceholder: 'Search routes'
      });
      function refreshRoutesView() {
        // the routes view isn't active
        if (!activeRoutesPayload) return;
        var payload = activeRoutesPayload;
        // children routes will appear as nested
        var routes = matcher.getRoutes().filter(function (route) {
          return !route.parent;
        });
        // reset match state to false
        routes.forEach(resetMatchStateOnRouteRecord);
        // apply a match state if there is a payload
        if (payload.filter) {
          routes = routes.filter(function (route) {
            return (
              // save matches state based on the payload
              isRouteMatching(route, payload.filter.toLowerCase())
            );
          });
        }
        // mark active routes
        routes.forEach(function (route) {
          return markRouteRecordActive(route, router.currentRoute.value);
        });
        payload.rootNodes = routes.map(formatRouteRecordForInspector);
      }
      var activeRoutesPayload;
      api.on.getInspectorTree(function (payload) {
        activeRoutesPayload = payload;
        if (payload.app === app && payload.inspectorId === routerInspectorId) {
          refreshRoutesView();
        }
      });
      /**
       * Display information about the currently selected route record
       */
      api.on.getInspectorState(function (payload) {
        if (payload.app === app && payload.inspectorId === routerInspectorId) {
          var routes = matcher.getRoutes();
          var route = routes.find(function (route) {
            return route.record.__vd_id === payload.nodeId;
          });
          if (route) {
            payload.state = {
              options: formatRouteRecordMatcherForStateInspector(route)
            };
          }
        }
      });
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
  }
  function modifierForKey(key) {
    if (key.optional) {
      return key.repeatable ? '*' : '?';
    } else {
      return key.repeatable ? '+' : '';
    }
  }
  function formatRouteRecordMatcherForStateInspector(route) {
    var record = route.record;
    var fields = [{
      editable: false,
      key: 'path',
      value: record.path
    }];
    if (record.name != null) {
      fields.push({
        editable: false,
        key: 'name',
        value: record.name
      });
    }
    fields.push({
      editable: false,
      key: 'regexp',
      value: route.re
    });
    if (route.keys.length) {
      fields.push({
        editable: false,
        key: 'keys',
        value: {
          _custom: {
            type: null,
            readOnly: true,
            display: route.keys.map(function (key) {
              return "".concat(key.name).concat(modifierForKey(key));
            }).join(' '),
            tooltip: 'Param keys',
            value: route.keys
          }
        }
      });
    }
    if (record.redirect != null) {
      fields.push({
        editable: false,
        key: 'redirect',
        value: record.redirect
      });
    }
    if (route.alias.length) {
      fields.push({
        editable: false,
        key: 'aliases',
        value: route.alias.map(function (alias) {
          return alias.record.path;
        })
      });
    }
    if (Object.keys(route.record.meta).length) {
      fields.push({
        editable: false,
        key: 'meta',
        value: route.record.meta
      });
    }
    fields.push({
      key: 'score',
      editable: false,
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.score.map(function (score) {
            return score.join(', ');
          }).join(' | '),
          tooltip: 'Score used to sort routes',
          value: route.score
        }
      }
    });
    return fields;
  }
  /**
   * Extracted from tailwind palette
   */
  var PINK_500 = 0xec4899;
  var BLUE_600 = 0x2563eb;
  var LIME_500 = 0x84cc16;
  var CYAN_400 = 0x22d3ee;
  var ORANGE_400 = 0xfb923c;
  // const GRAY_100 = 0xf4f4f5
  var DARK = 0x666666;
  function formatRouteRecordForInspector(route) {
    var tags = [];
    var record = route.record;
    if (record.name != null) {
      tags.push({
        label: String(record.name),
        textColor: 0,
        backgroundColor: CYAN_400
      });
    }
    if (record.aliasOf) {
      tags.push({
        label: 'alias',
        textColor: 0,
        backgroundColor: ORANGE_400
      });
    }
    if (route.__vd_match) {
      tags.push({
        label: 'matches',
        textColor: 0,
        backgroundColor: PINK_500
      });
    }
    if (route.__vd_exactActive) {
      tags.push({
        label: 'exact',
        textColor: 0,
        backgroundColor: LIME_500
      });
    }
    if (route.__vd_active) {
      tags.push({
        label: 'active',
        textColor: 0,
        backgroundColor: BLUE_600
      });
    }
    if (record.redirect) {
      tags.push({
        label: typeof record.redirect === 'string' ? "redirect: ".concat(record.redirect) : 'redirects',
        textColor: 0xffffff,
        backgroundColor: DARK
      });
    }
    // add an id to be able to select it. Using the `path` is not possible because
    // empty path children would collide with their parents
    var id = record.__vd_id;
    if (id == null) {
      id = String(routeRecordId++);
      record.__vd_id = id;
    }
    return {
      id: id,
      label: record.path,
      tags: tags,
      children: route.children.map(formatRouteRecordForInspector)
    };
  }
  //  incremental id for route records and inspector state
  var routeRecordId = 0;
  var EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
  function markRouteRecordActive(route, currentRoute) {
    // no route will be active if matched is empty
    // reset the matching state
    var isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
    route.__vd_exactActive = route.__vd_active = isExactActive;
    if (!isExactActive) {
      route.__vd_active = currentRoute.matched.some(function (match) {
        return isSameRouteRecord(match, route.record);
      });
    }
    route.children.forEach(function (childRoute) {
      return markRouteRecordActive(childRoute, currentRoute);
    });
  }
  function resetMatchStateOnRouteRecord(route) {
    route.__vd_match = false;
    route.children.forEach(resetMatchStateOnRouteRecord);
  }
  function isRouteMatching(route, filter) {
    var found = String(route.re).match(EXTRACT_REGEXP_RE);
    route.__vd_match = false;
    if (!found || found.length < 3) {
      return false;
    }
    // use a regexp without $ at the end to match nested routes better
    var nonEndingRE = new RegExp(found[1].replace(/\$$/, ''), found[2]);
    if (nonEndingRE.test(filter)) {
      // mark children as matches
      route.children.forEach(function (child) {
        return isRouteMatching(child, filter);
      });
      // exception case: `/`
      if (route.record.path !== '/' || filter === '/') {
        route.__vd_match = route.re.test(filter);
        return true;
      }
      // hide the / route
      return false;
    }
    var path = route.record.path.toLowerCase();
    var decodedPath = decode(path);
    // also allow partial matching on the path
    if (!filter.startsWith('/') && (decodedPath.includes(filter) || path.includes(filter))) return true;
    if (decodedPath.startsWith(filter) || path.startsWith(filter)) return true;
    if (route.record.name && String(route.record.name).includes(filter)) return true;
    return route.children.some(function (child) {
      return isRouteMatching(child, filter);
    });
  }
  function omit(obj, keys) {
    var ret = {};
    for (var key in obj) {
      if (!keys.includes(key)) {
        // @ts-expect-error
        ret[key] = obj[key];
      }
    }
    return ret;
  }

  /**
   * Creates a Router instance that can be used by a Vue app.
   *
   * @param options - {@link RouterOptions}
   */
  function createRouter(options) {
    var matcher = createRouterMatcher(options.routes, options);
    var parseQuery$1 = options.parseQuery || parseQuery;
    var stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
    var routerHistory = options.history;
    if (process.env.NODE_ENV !== 'production' && !routerHistory) throw new Error('Provide the "history" option when calling "createRouter()":' + ' https://next.router.vuejs.org/api/#history.');
    var beforeGuards = useCallbacks();
    var beforeResolveGuards = useCallbacks();
    var afterGuards = useCallbacks();
    var currentRoute = shallowRef(START_LOCATION_NORMALIZED);
    var pendingLocation = START_LOCATION_NORMALIZED;
    // leave the scrollRestoration if no scrollBehavior is provided
    if (isBrowser && options.scrollBehavior && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    var normalizeParams = applyToParams.bind(null, function (paramValue) {
      return '' + paramValue;
    });
    var encodeParams = applyToParams.bind(null, encodeParam);
    var decodeParams =
    // @ts-expect-error: intentionally avoid the type check
    applyToParams.bind(null, decode);
    function addRoute(parentOrRoute, route) {
      var parent;
      var record;
      if (isRouteName(parentOrRoute)) {
        parent = matcher.getRecordMatcher(parentOrRoute);
        record = route;
      } else {
        record = parentOrRoute;
      }
      return matcher.addRoute(record, parent);
    }
    function removeRoute(name) {
      var recordMatcher = matcher.getRecordMatcher(name);
      if (recordMatcher) {
        matcher.removeRoute(recordMatcher);
      } else if (process.env.NODE_ENV !== 'production') {
        warn("Cannot remove non-existent route \"".concat(String(name), "\""));
      }
    }
    function getRoutes() {
      return matcher.getRoutes().map(function (routeMatcher) {
        return routeMatcher.record;
      });
    }
    function hasRoute(name) {
      return !!matcher.getRecordMatcher(name);
    }
    function resolve(rawLocation, currentLocation) {
      // const objectLocation = routerLocationAsObject(rawLocation)
      // we create a copy to modify it later
      currentLocation = assign({}, currentLocation || currentRoute.value);
      if (typeof rawLocation === 'string') {
        var locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
        var _matchedRoute = matcher.resolve({
          path: locationNormalized.path
        }, currentLocation);
        var _href = routerHistory.createHref(locationNormalized.fullPath);
        if (process.env.NODE_ENV !== 'production') {
          if (_href.startsWith('//')) warn("Location \"".concat(rawLocation, "\" resolved to \"").concat(_href, "\". A resolved location cannot start with multiple slashes."));else if (!_matchedRoute.matched.length) {
            warn("No match found for location with path \"".concat(rawLocation, "\""));
          }
        }
        // locationNormalized is always a new object
        return assign(locationNormalized, _matchedRoute, {
          params: decodeParams(_matchedRoute.params),
          hash: decode(locationNormalized.hash),
          redirectedFrom: undefined,
          href: _href
        });
      }
      var matcherLocation;
      // path could be relative in object as well
      if ('path' in rawLocation) {
        if (process.env.NODE_ENV !== 'production' && 'params' in rawLocation && !('name' in rawLocation) &&
        // @ts-expect-error: the type is never
        Object.keys(rawLocation.params).length) {
          warn("Path \"".concat(
          // @ts-expect-error: the type is never
          rawLocation.path, "\" was passed with params but they will be ignored. Use a named route alongside params instead."));
        }
        matcherLocation = assign({}, rawLocation, {
          path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
        });
      } else {
        // remove any nullish param
        var targetParams = assign({}, rawLocation.params);
        for (var key in targetParams) {
          if (targetParams[key] == null) {
            delete targetParams[key];
          }
        }
        // pass encoded values to the matcher, so it can produce encoded path and fullPath
        matcherLocation = assign({}, rawLocation, {
          params: encodeParams(rawLocation.params)
        });
        // current location params are decoded, we need to encode them in case the
        // matcher merges the params
        currentLocation.params = encodeParams(currentLocation.params);
      }
      var matchedRoute = matcher.resolve(matcherLocation, currentLocation);
      var hash = rawLocation.hash || '';
      if (process.env.NODE_ENV !== 'production' && hash && !hash.startsWith('#')) {
        warn("A `hash` should always start with the character \"#\". Replace \"".concat(hash, "\" with \"#").concat(hash, "\"."));
      }
      // the matcher might have merged current location params, so
      // we need to run the decoding again
      matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
      var fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
        hash: encodeHash(hash),
        path: matchedRoute.path
      }));
      var href = routerHistory.createHref(fullPath);
      if (process.env.NODE_ENV !== 'production') {
        if (href.startsWith('//')) {
          warn("Location \"".concat(rawLocation, "\" resolved to \"").concat(href, "\". A resolved location cannot start with multiple slashes."));
        } else if (!matchedRoute.matched.length) {
          warn("No match found for location with path \"".concat('path' in rawLocation ? rawLocation.path : rawLocation, "\""));
        }
      }
      return assign({
        fullPath: fullPath,
        // keep the hash encoded so fullPath is effectively path + encodedQuery +
        // hash
        hash: hash,
        query:
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
      }, matchedRoute, {
        redirectedFrom: undefined,
        href: href
      });
    }
    function locationAsObject(to) {
      return typeof to === 'string' ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
    }
    function checkCanceledNavigation(to, from) {
      if (pendingLocation !== to) {
        return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
          from: from,
          to: to
        });
      }
    }
    function push(to) {
      return pushWithRedirect(to);
    }
    function replace(to) {
      return push(assign(locationAsObject(to), {
        replace: true
      }));
    }
    function handleRedirectRecord(to) {
      var lastMatched = to.matched[to.matched.length - 1];
      if (lastMatched && lastMatched.redirect) {
        var redirect = lastMatched.redirect;
        var newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
        if (typeof newTargetLocation === 'string') {
          newTargetLocation = newTargetLocation.includes('?') || newTargetLocation.includes('#') ? newTargetLocation = locationAsObject(newTargetLocation) :
          // force empty params
          {
            path: newTargetLocation
          };
          // @ts-expect-error: force empty params when a string is passed to let
          // the router parse them again
          newTargetLocation.params = {};
        }
        if (process.env.NODE_ENV !== 'production' && !('path' in newTargetLocation) && !('name' in newTargetLocation)) {
          warn("Invalid redirect found:\n".concat(JSON.stringify(newTargetLocation, null, 2), "\n when navigating to \"").concat(to.fullPath, "\". A redirect must contain a name or path. This will break in production."));
          throw new Error('Invalid redirect');
        }
        return assign({
          query: to.query,
          hash: to.hash,
          // avoid transferring params if the redirect has a path
          params: 'path' in newTargetLocation ? {} : to.params
        }, newTargetLocation);
      }
    }
    function pushWithRedirect(to, redirectedFrom) {
      var targetLocation = pendingLocation = resolve(to);
      var from = currentRoute.value;
      var data = to.state;
      var force = to.force;
      // to could be a string where `replace` is a function
      var replace = to.replace === true;
      var shouldRedirect = handleRedirectRecord(targetLocation);
      if (shouldRedirect) return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
        state: _typeof(shouldRedirect) === 'object' ? assign({}, data, shouldRedirect.state) : data,
        force: force,
        replace: replace
      }),
      // keep original redirectedFrom if it exists
      redirectedFrom || targetLocation);
      // if it was a redirect we already called `pushWithRedirect` above
      var toLocation = targetLocation;
      toLocation.redirectedFrom = redirectedFrom;
      var failure;
      if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
        failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, {
          to: toLocation,
          from: from
        });
        // trigger scroll to allow scrolling to the same anchor
        handleScroll(from, from,
        // this is a push, the only way for it to be triggered from a
        // history.listen is with a redirect, which makes it become a push
        true,
        // This cannot be the first navigation because the initial location
        // cannot be manually navigated to
        false);
      }
      return (failure ? Promise.resolve(failure) : navigate(toLocation, from))["catch"](function (error) {
        return isNavigationFailure(error) ?
        // navigation redirects still mark the router as ready
        isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */) ? error : markAsReady(error) // also returns the error
        :
        // reject any unknown error
        triggerError(error, toLocation, from);
      }).then(function (failure) {
        if (failure) {
          if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
            if (process.env.NODE_ENV !== 'production' &&
            // we are redirecting to the same location we were already at
            isSameRouteLocation(stringifyQuery$1, resolve(failure.to), toLocation) &&
            // and we have done it a couple of times
            redirectedFrom &&
            // @ts-expect-error: added only in dev
            (redirectedFrom._count = redirectedFrom._count ?
            // @ts-expect-error
            redirectedFrom._count + 1 : 1) > 10) {
              warn("Detected an infinite redirection in a navigation guard when going from \"".concat(from.fullPath, "\" to \"").concat(toLocation.fullPath, "\". Aborting to avoid a Stack Overflow. This will break in production if not fixed."));
              return Promise.reject(new Error('Infinite redirect in navigation guard'));
            }
            return pushWithRedirect(
            // keep options
            assign({
              // preserve an existing replacement but allow the redirect to override it
              replace: replace
            }, locationAsObject(failure.to), {
              state: _typeof(failure.to) === 'object' ? assign({}, data, failure.to.state) : data,
              force: force
            }),
            // preserve the original redirectedFrom if any
            redirectedFrom || toLocation);
          }
        } else {
          // if we fail we don't finalize the navigation
          failure = finalizeNavigation(toLocation, from, true, replace, data);
        }
        triggerAfterEach(toLocation, from, failure);
        return failure;
      });
    }
    /**
     * Helper to reject and skip all navigation guards if a new navigation happened
     * @param to
     * @param from
     */
    function checkCanceledNavigationAndReject(to, from) {
      var error = checkCanceledNavigation(to, from);
      return error ? Promise.reject(error) : Promise.resolve();
    }
    // TODO: refactor the whole before guards by internally using router.beforeEach
    function navigate(to, from) {
      var guards;
      var _extractChangingRecor = extractChangingRecords(to, from),
        _extractChangingRecor2 = _slicedToArray(_extractChangingRecor, 3),
        leavingRecords = _extractChangingRecor2[0],
        updatingRecords = _extractChangingRecor2[1],
        enteringRecords = _extractChangingRecor2[2];
      // all components here have been resolved once because we are leaving
      guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
      // leavingRecords is already reversed
      var _iterator13 = _createForOfIteratorHelper(leavingRecords),
        _step13;
      try {
        for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
          var record = _step13.value;
          record.leaveGuards.forEach(function (guard) {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
      } catch (err) {
        _iterator13.e(err);
      } finally {
        _iterator13.f();
      }
      var canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
      guards.push(canceledNavigationCheck);
      // run the queue of per route beforeRouteLeave guards
      return runGuardQueue(guards).then(function () {
        // check global guards beforeEach
        guards = [];
        var _iterator14 = _createForOfIteratorHelper(beforeGuards.list()),
          _step14;
        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var guard = _step14.value;
            guards.push(guardToPromiseFn(guard, to, from));
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      }).then(function () {
        // check in components beforeRouteUpdate
        guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
        var _iterator15 = _createForOfIteratorHelper(updatingRecords),
          _step15;
        try {
          for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {
            var record = _step15.value;
            record.updateGuards.forEach(function (guard) {
              guards.push(guardToPromiseFn(guard, to, from));
            });
          }
        } catch (err) {
          _iterator15.e(err);
        } finally {
          _iterator15.f();
        }
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      }).then(function () {
        // check the route beforeEnter
        guards = [];
        var _iterator16 = _createForOfIteratorHelper(to.matched),
          _step16;
        try {
          for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {
            var record = _step16.value;
            // do not trigger beforeEnter on reused views
            if (record.beforeEnter && !from.matched.includes(record)) {
              if (isArray(record.beforeEnter)) {
                var _iterator17 = _createForOfIteratorHelper(record.beforeEnter),
                  _step17;
                try {
                  for (_iterator17.s(); !(_step17 = _iterator17.n()).done;) {
                    var beforeEnter = _step17.value;
                    guards.push(guardToPromiseFn(beforeEnter, to, from));
                  }
                } catch (err) {
                  _iterator17.e(err);
                } finally {
                  _iterator17.f();
                }
              } else {
                guards.push(guardToPromiseFn(record.beforeEnter, to, from));
              }
            }
          }
        } catch (err) {
          _iterator16.e(err);
        } finally {
          _iterator16.f();
        }
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      }).then(function () {
        // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
        // clear existing enterCallbacks, these are added by extractComponentsGuards
        to.matched.forEach(function (record) {
          return record.enterCallbacks = {};
        });
        // check in-component beforeRouteEnter
        guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      }).then(function () {
        // check global guards beforeResolve
        guards = [];
        var _iterator18 = _createForOfIteratorHelper(beforeResolveGuards.list()),
          _step18;
        try {
          for (_iterator18.s(); !(_step18 = _iterator18.n()).done;) {
            var guard = _step18.value;
            guards.push(guardToPromiseFn(guard, to, from));
          }
        } catch (err) {
          _iterator18.e(err);
        } finally {
          _iterator18.f();
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      })
      // catch any navigation canceled
      ["catch"](function (err) {
        return isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */) ? err : Promise.reject(err);
      });
    }
    function triggerAfterEach(to, from, failure) {
      // navigation is confirmed, call afterGuards
      // TODO: wrap with error handlers
      var _iterator19 = _createForOfIteratorHelper(afterGuards.list()),
        _step19;
      try {
        for (_iterator19.s(); !(_step19 = _iterator19.n()).done;) {
          var guard = _step19.value;
          guard(to, from, failure);
        }
      } catch (err) {
        _iterator19.e(err);
      } finally {
        _iterator19.f();
      }
    }
    /**
     * - Cleans up any navigation guards
     * - Changes the url if necessary
     * - Calls the scrollBehavior
     */
    function finalizeNavigation(toLocation, from, isPush, replace, data) {
      // a more recent navigation took place
      var error = checkCanceledNavigation(toLocation, from);
      if (error) return error;
      // only consider as push if it's not the first navigation
      var isFirstNavigation = from === START_LOCATION_NORMALIZED;
      var state = !isBrowser ? {} : history.state;
      // change URL only if the user did a push/replace and if it's not the initial navigation because
      // it's just reflecting the url
      if (isPush) {
        // on the initial navigation, we want to reuse the scroll position from
        // history state if it exists
        if (replace || isFirstNavigation) routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));else routerHistory.push(toLocation.fullPath, data);
      }
      // accept current navigation
      currentRoute.value = toLocation;
      handleScroll(toLocation, from, isPush, isFirstNavigation);
      markAsReady();
    }
    var removeHistoryListener;
    // attach listener to history to trigger navigations
    function setupListeners() {
      // avoid setting up listeners twice due to an invalid first navigation
      if (removeHistoryListener) return;
      removeHistoryListener = routerHistory.listen(function (to, _from, info) {
        if (!router.listening) return;
        // cannot be a redirect route because it was in history
        var toLocation = resolve(to);
        // due to dynamic routing, and to hash history with manual navigation
        // (manually changing the url or calling history.hash = '#/somewhere'),
        // there could be a redirect record in history
        var shouldRedirect = handleRedirectRecord(toLocation);
        if (shouldRedirect) {
          pushWithRedirect(assign(shouldRedirect, {
            replace: true
          }), toLocation)["catch"](noop);
          return;
        }
        pendingLocation = toLocation;
        var from = currentRoute.value;
        // TODO: should be moved to web history?
        if (isBrowser) {
          saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
        }
        navigate(toLocation, from)["catch"](function (error) {
          if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
            return error;
          }
          if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
            // Here we could call if (info.delta) routerHistory.go(-info.delta,
            // false) but this is bug prone as we have no way to wait the
            // navigation to be finished before calling pushWithRedirect. Using
            // a setTimeout of 16ms seems to work but there is no guarantee for
            // it to work on every browser. So instead we do not restore the
            // history entry and trigger a new navigation as requested by the
            // navigation guard.
            // the error is already handled by router.push we just want to avoid
            // logging the error
            pushWithRedirect(error.to, toLocation
            // avoid an uncaught rejection, let push call triggerError
            ).then(function (failure) {
              // manual change in hash history #916 ending up in the URL not
              // changing, but it was changed by the manual url change, so we
              // need to manually change it ourselves
              if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */) && !info.delta && info.type === NavigationType.pop) {
                routerHistory.go(-1, false);
              }
            })["catch"](noop);
            // avoid the then branch
            return Promise.reject();
          }
          // do not restore history on unknown direction
          if (info.delta) {
            routerHistory.go(-info.delta, false);
          }
          // unrecognized error, transfer to the global handler
          return triggerError(error, toLocation, from);
        }).then(function (failure) {
          failure = failure || finalizeNavigation(
          // after navigation, all matched components are resolved
          toLocation, from, false);
          // revert the navigation
          if (failure) {
            if (info.delta &&
            // a new navigation has been triggered, so we do not want to revert, that will change the current history
            // entry while a different route is displayed
            !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
              routerHistory.go(-info.delta, false);
            } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
              // manual change in hash history #916
              // it's like a push but lacks the information of the direction
              routerHistory.go(-1, false);
            }
          }
          triggerAfterEach(toLocation, from, failure);
        })["catch"](noop);
      });
    }
    // Initialization and Errors
    var readyHandlers = useCallbacks();
    var errorHandlers = useCallbacks();
    var ready;
    /**
     * Trigger errorHandlers added via onError and throws the error as well
     *
     * @param error - error to throw
     * @param to - location we were navigating to when the error happened
     * @param from - location we were navigating from when the error happened
     * @returns the error as a rejected promise
     */
    function triggerError(error, to, from) {
      markAsReady(error);
      var list = errorHandlers.list();
      if (list.length) {
        list.forEach(function (handler) {
          return handler(error, to, from);
        });
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('uncaught error during route navigation:');
        }
        console.error(error);
      }
      return Promise.reject(error);
    }
    function isReady() {
      if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
      return new Promise(function (resolve, reject) {
        readyHandlers.add([resolve, reject]);
      });
    }
    function markAsReady(err) {
      if (!ready) {
        // still not ready if an error happened
        ready = !err;
        setupListeners();
        readyHandlers.list().forEach(function (_ref16) {
          var _ref17 = _slicedToArray(_ref16, 2),
            resolve = _ref17[0],
            reject = _ref17[1];
          return err ? reject(err) : resolve();
        });
        readyHandlers.reset();
      }
      return err;
    }
    // Scroll behavior
    function handleScroll(to, from, isPush, isFirstNavigation) {
      var scrollBehavior = options.scrollBehavior;
      if (!isBrowser || !scrollBehavior) return Promise.resolve();
      var scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
      return nextTick().then(function () {
        return scrollBehavior(to, from, scrollPosition);
      }).then(function (position) {
        return position && scrollToPosition(position);
      })["catch"](function (err) {
        return triggerError(err, to, from);
      });
    }
    var go = function go(delta) {
      return routerHistory.go(delta);
    };
    var started;
    var installedApps = new Set();
    var router = {
      currentRoute: currentRoute,
      listening: true,
      addRoute: addRoute,
      removeRoute: removeRoute,
      hasRoute: hasRoute,
      getRoutes: getRoutes,
      resolve: resolve,
      options: options,
      push: push,
      replace: replace,
      go: go,
      back: function back() {
        return go(-1);
      },
      forward: function forward() {
        return go(1);
      },
      beforeEach: beforeGuards.add,
      beforeResolve: beforeResolveGuards.add,
      afterEach: afterGuards.add,
      onError: errorHandlers.add,
      isReady: isReady,
      install: function install(app) {
        var router = this;
        app.component('RouterLink', RouterLink);
        app.component('RouterView', RouterView);
        app.config.globalProperties.$router = router;
        Object.defineProperty(app.config.globalProperties, '$route', {
          enumerable: true,
          get: function get() {
            return unref(currentRoute);
          }
        });
        // this initial navigation is only necessary on client, on server it doesn't
        // make sense because it will create an extra unnecessary navigation and could
        // lead to problems
        if (isBrowser &&
        // used for the initial navigation client side to avoid pushing
        // multiple times when the router is used in multiple apps
        !started && currentRoute.value === START_LOCATION_NORMALIZED) {
          // see above
          started = true;
          push(routerHistory.location)["catch"](function (err) {
            if (process.env.NODE_ENV !== 'production') warn('Unexpected error when starting the router:', err);
          });
        }
        var reactiveRoute = {};
        var _loop5 = function _loop5(key) {
          // @ts-expect-error: the key matches
          reactiveRoute[key] = computed(function () {
            return currentRoute.value[key];
          });
        };
        for (var key in START_LOCATION_NORMALIZED) {
          _loop5(key);
        }
        app.provide(routerKey, router);
        app.provide(routeLocationKey, reactive(reactiveRoute));
        app.provide(routerViewLocationKey, currentRoute);
        var unmountApp = app.unmount;
        installedApps.add(app);
        app.unmount = function () {
          installedApps["delete"](app);
          // the router is not attached to an app anymore
          if (installedApps.size < 1) {
            // invalidate the current navigation
            pendingLocation = START_LOCATION_NORMALIZED;
            removeHistoryListener && removeHistoryListener();
            removeHistoryListener = null;
            currentRoute.value = START_LOCATION_NORMALIZED;
            started = false;
            ready = false;
          }
          unmountApp();
        };
        // TODO: this probably needs to be updated so it can be used by vue-termui
        if ((process.env.NODE_ENV !== 'production' || __VUE_PROD_DEVTOOLS__) && isBrowser) {
          addDevtools(app, router, matcher);
        }
      }
    };
    return router;
  }
  function runGuardQueue(guards) {
    return guards.reduce(function (promise, guard) {
      return promise.then(function () {
        return guard();
      });
    }, Promise.resolve());
  }
  function extractChangingRecords(to, from) {
    var leavingRecords = [];
    var updatingRecords = [];
    var enteringRecords = [];
    var len = Math.max(from.matched.length, to.matched.length);
    var _loop6 = function _loop6() {
      var recordFrom = from.matched[i];
      if (recordFrom) {
        if (to.matched.find(function (record) {
          return isSameRouteRecord(record, recordFrom);
        })) updatingRecords.push(recordFrom);else leavingRecords.push(recordFrom);
      }
      var recordTo = to.matched[i];
      if (recordTo) {
        // the type doesn't matter because we are comparing per reference
        if (!from.matched.find(function (record) {
          return isSameRouteRecord(record, recordTo);
        })) {
          enteringRecords.push(recordTo);
        }
      }
    };
    for (var i = 0; i < len; i++) {
      _loop6();
    }
    return [leavingRecords, updatingRecords, enteringRecords];
  }

  function initVue(routes, useApp, mountContainer) {
      if (useApp === void 0) { useApp = function (app) { return app; }; }
      if (mountContainer === void 0) { mountContainer = '#app'; }
      createRouter({
          history: createWebHistory(),
          routes: routes,
      });
      consoleLog.debug = function (label, data) {
          var _a, _b;
          var content = (_b = (_a = document.getElementById('vue-config')) === null || _a === void 0 ? void 0 : _a.textContent) !== null && _b !== void 0 ? _b : '';
          if (JSON.parse(content)['debug'] === 'true')
              console.log(label, data);
      };
      useApp(createApp(app)).mount(mountContainer);
  }
  var app = defineComponent({
      name: 'App',
      setup: function () {
          console.log('app');
      },
      template: '<h2>app</h2>'
  });

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
