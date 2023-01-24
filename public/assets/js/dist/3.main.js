"use strict";
(self["webpackChunktactical_people"] = self["webpackChunktactical_people"] || []).push([[3],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var myTimerCounter = document.querySelector('span.time-nums');
var _counter = /*#__PURE__*/new WeakMap();
var Timer = /*#__PURE__*/function () {
  function Timer(element) {
    _classCallCheck(this, Timer);
    _classPrivateFieldInitSpec(this, _counter, {
      writable: true,
      value: 30
    });
    _defineProperty(this, "counterRange", [0, 30]);
    _defineProperty(this, "element", void 0);
    _defineProperty(this, "interval", void 0);
    this.element = element;
    this.element.innerHTML = this.counter;
  }
  _createClass(Timer, [{
    key: "counter",
    get: function get() {
      return _classPrivateFieldGet(this, _counter);
    },
    set: function set(intendedResult) {
      if (intendedResult > this.counterRange[1]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[1]);
      } else if (intendedResult < this.counterRange[0]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[0]);
      } else {
        _classPrivateFieldSet(this, _counter, intendedResult);
      }
      this.element.innerHTML = "".concat(this.counter);
    }
  }, {
    key: "startCounter",
    value: function startCounter() {
      var _this = this;
      this.interval = setInterval( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.counter--;
              if (!(_this.counter === 0)) {
                _context.next = 6;
                break;
              }
              _context.next = 4;
              return _helpers_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentGame.currentRound.donePressed();
            case 4:
              _context.next = 7;
              break;
            case 6:
              if (_this.counter === 10) {
                // change timer background to red at 10 seconds
                document.querySelector(".timer-counter").classList.remove("blue");
                document.querySelector(".timer-counter").classList.add("red");
              }
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })), 1000);
    }
  }, {
    key: "resetCounter",
    value: function resetCounter() {
      this.counter = 30;
      clearInterval(this.interval);
    }
  }, {
    key: "pauseCounter",
    value: function pauseCounter() {
      clearInterval(this.interval);
    }
  }]);
  return Timer;
}();
_defineProperty(Timer, "all", {
  'myTimer': new Timer(myTimerCounter)
});
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timer);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _components_Pigeons_Sunglasses_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _components_Play_BackHomeButton_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23);
/* harmony import */ var _Players_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(24);
/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(25);
/* harmony import */ var _Round_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(27);
/* harmony import */ var _core_sounds_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(70);
/* harmony import */ var _storage_gameCache_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(72);
/* harmony import */ var _auth_Auth_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(3);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// Components










// Helpers




// Core and utils



var Game = /*#__PURE__*/function () {
  function Game(gameId) {
    var gameMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "offline";
    _classCallCheck(this, Game);
    _defineProperty(this, "gameId", void 0);
    _defineProperty(this, "gameResultEnum", ['loss', 'win', 'draw']);
    _defineProperty(this, "currentRound", new _Round_js__WEBPACK_IMPORTED_MODULE_11__["default"]());
    _defineProperty(this, "gameModes", ["online", "offline"]);
    _defineProperty(this, "gameMode", "offline");
    _defineProperty(this, "endResult", null);
    _defineProperty(this, "gameFinished", "false");
    this.gameId = gameId;
    this.gameMode = gameMode;
    Game.currentGame = this;
  }
  _createClass(Game, [{
    key: "initiateOnline",
    value: function initiateOnline(playerMe, playerOpponent, gameComplete, timeLeft) {
      // Player 1 (Me)
      var myUsername = _auth_Auth_js__WEBPACK_IMPORTED_MODULE_14__["default"].displayName;
      var myAmmoInventories = playerMe.ammoInventories;
      var myLives = playerMe.lives.lives;
      var myMoveHistory = playerMe.moveHistory;

      // Player 2 (Opponent)
      var opponentUsername = playerOpponent.username;
      var opponentAmmoInventories = playerOpponent.ammoInventories;
      var opponentLives = playerOpponent.lives.lives;
      var opponentMoveHistory = playerOpponent.moveHistory;
      var movesHistories = [];
      for (var i = 0; i < myMoveHistory.length; i++) {
        movesHistories.push({
          player1: myMoveHistory[i],
          player2: opponentMoveHistory[i]
        });
      }

      // Initiating the players.
      _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player1 = new _Player_js__WEBPACK_IMPORTED_MODULE_10__["default"](myUsername, {
        'blocks': _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all["block-left"],
        'attacks': _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all["attack-left"]
      });
      _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player2 = new _Player_js__WEBPACK_IMPORTED_MODULE_10__["default"](opponentUsername, {
        'blocks': _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all.opponentBlock,
        'attacks': _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all.opponentAttack
      });
      var leftUsernameBox = document.querySelector('div.my-username-div span.username-span');
      var introBannerUsernameSpan = document.querySelector('div.intro-page p.character span');
      if (leftUsernameBox) {
        leftUsernameBox.innerHTML = myUsername;
      }
      if (introBannerUsernameSpan) {
        introBannerUsernameSpan.innerHTML = myUsername;
      }

      // Initiating the tallies.
      _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all = {
        'player1': new _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"](document.querySelector('table.tally.my-tally'), _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player1),
        'player2': new _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"](document.querySelector('table.tally.opponent-tally'), _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player2)
      };
      _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player1.currentTallyColumnNumber = 2;
      _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player2.currentTallyColumnNumber = 1;
      if (movesHistories.length > 0) {
        this.currentRound.fillTheTalliesWithMoveHistory(movesHistories);
      }

      // Set the current round number
      this.currentRound.currentRoundNumber = myMoveHistory.length + 1;
      for (var _i = 0; _i < _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myLife.counterRange[1] - myLives; _i++) {
        _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myLife.decreaseCounter();
      }
      for (var _i2 = 0; _i2 < _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.opponentLife.counterRange[1] - opponentLives; _i2++) {
        _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.opponentLife.decreaseCounter();
      }

      // Sync the ammo inventories
      if (myAmmoInventories) {
        _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player1.ammoInventory.blocks.counter = myAmmoInventories.blockCount;
        _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player1.ammoInventory.attacks.counter = myAmmoInventories.attackCount;
      }
      if (opponentAmmoInventories) {
        _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player2.ammoInventory.blocks.counter = opponentAmmoInventories.blockCount;
        _Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player2.ammoInventory.attacks.counter = opponentAmmoInventories.attackCount;
      }
      if (this.currentRound.currentRoundNumber !== 1 || timeLeft) {
        _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_5__["default"].all.myTimer.counter = Math.floor(timeLeft / 1000);
      }
    }
  }, {
    key: "gameOverDueToOpponentDisconnection",
    value: function () {
      var _gameOverDueToOpponentDisconnection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_8__["default"].hide();
              _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_6__["default"].show();
              // Show the back to Home button
              _components_Play_BackHomeButton_js__WEBPACK_IMPORTED_MODULE_7__["default"].show();
              _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateTitle('victory');

              // you get sunglasses
              _components_Pigeons_Sunglasses_js__WEBPACK_IMPORTED_MODULE_2__["default"].left.activate();

              // game win sound effect
              _context.next = 7;
              return (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.sounds.winGame);
            case 7:
              // document.querySelector("#winGame").play()

              this.gameFinished = "true";
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function gameOverDueToOpponentDisconnection() {
        return _gameOverDueToOpponentDisconnection.apply(this, arguments);
      }
      return gameOverDueToOpponentDisconnection;
    }()
  }, {
    key: "gameOver",
    value: function () {
      var _gameOver = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var gameResult, bgMusic, fork, shield, opponentShield, opponentFork;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // results tied to clicking the done button, results show faster than animation though
              // connect result calculation here
              // resultOverlay.classList.add('victory');
              gameResult = this.calculateGameResults();
              console.log('game result', gameResult); // debug

              _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_6__["default"].show();
              // Show the back to Home button
              _components_Play_BackHomeButton_js__WEBPACK_IMPORTED_MODULE_7__["default"].show();
              if (!(gameResult === 'win')) {
                _context2.next = 11;
                break;
              }
              _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateTitle('victory');

              // you get sunglasses
              _components_Pigeons_Sunglasses_js__WEBPACK_IMPORTED_MODULE_2__["default"].left.activate();

              // game win sound effect
              _context2.next = 9;
              return (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.sounds.winGame);
            case 9:
              _context2.next = 31;
              break;
            case 11:
              if (!(gameResult === 'loss')) {
                _context2.next = 28;
                break;
              }
              _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateTitle('defeat');

              // opponent gets sunglasses
              _components_Pigeons_Sunglasses_js__WEBPACK_IMPORTED_MODULE_2__["default"].right.activate();

              //game lose sound effect
              bgMusic = document.querySelector("#bgMusic");
              bgMusic.src = "";
              fork = document.querySelector("#attack-image");
              fork.onclick = function () {};
              shield = document.querySelector("#shield-image");
              shield.onclick = function () {};
              opponentShield = document.querySelector(".opponent-counter-box > img");
              opponentShield.onclick = function () {};
              opponentFork = document.querySelector("div:nth-child(2) > div.col-sm-2.asset-padding.opponent-counter-box");
              opponentFork.onclick = function () {};
              _context2.next = 26;
              return (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.sounds.loseGame);
            case 26:
              _context2.next = 31;
              break;
            case 28:
              _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_3__["default"].updateTitle('draw');
              _context2.next = 31;
              return (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_12__.sounds.drawGame);
            case 31:
              this.gameFinished = "true";
            case 32:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function gameOver() {
        return _gameOver.apply(this, arguments);
      }
      return gameOver;
    }()
  }, {
    key: "calculateGameResults",
    value: function calculateGameResults() {
      console.log('calculating game results...');
      if (_components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myLife.counter > _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.opponentLife.counter) {
        return this.gameResultEnum[1]; // win
      } else if (_components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myLife.counter < _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.opponentLife.counter) {
        return this.gameResultEnum[0]; // loss
      }

      // if there's a draw, one can win by inventory counts
      var leftPlayerTotalInventory = _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getTotalInventory(_Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player1);
      var rightPlayerTotalInventory = _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].getTotalInventory(_Players_js__WEBPACK_IMPORTED_MODULE_9__["default"].all.player2);
      if (leftPlayerTotalInventory > rightPlayerTotalInventory) {
        return this.gameResultEnum[1]; // win
      } else if (leftPlayerTotalInventory < rightPlayerTotalInventory) {
        return this.gameResultEnum[0]; // loss
      }

      // if lives and inventories are exactly equal,
      return this.gameResultEnum[2]; // draw
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      // check if online or offline, if online, redirect to index
      if (this.gameMode === "online") {
        // return location.href = "/";
      }
      return location.reload();
    }
  }], [{
    key: "findByGameFromCache",
    value: function findByGameFromCache() {
      var _gameCache$fetch = _storage_gameCache_js__WEBPACK_IMPORTED_MODULE_13__["default"].fetch(),
        playerMe = _gameCache$fetch.playerMe,
        playerOpponent = _gameCache$fetch.playerOpponent,
        gameStatus = _gameCache$fetch.gameStatus;

      // Check if cache data is corrupted
      if (!playerMe || !playerOpponent || gameStatus) {
        return null;
      }
      return {
        playerMe: playerMe,
        playerOpponent: playerOpponent,
        gameStatus: gameStatus
      };
    }
  }]);
  return Game;
}();
_defineProperty(Game, "currentGame", void 0);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var myLifeNodes = document.querySelectorAll('div.myHealthBar div.heart');
var opponentLifeNodes = document.querySelectorAll('div.opponentHealthBar div.heart');
var _counter = /*#__PURE__*/new WeakMap();
var Life = /*#__PURE__*/function () {
  function Life(lifeNodeList) {
    _classCallCheck(this, Life);
    _classPrivateFieldInitSpec(this, _counter, {
      writable: true,
      value: void 0
    });
    _defineProperty(this, "counterRange", [0, 3]);
    _defineProperty(this, "lifeNodeList", void 0);
    this.lifeNodeList = lifeNodeList;
    this.counter = this.counterRange[1];
  }
  _createClass(Life, [{
    key: "counter",
    get: function get() {
      return _classPrivateFieldGet(this, _counter);
    },
    set: function set(intendedResult) {
      if (intendedResult > this.counterRange[1]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[1]);
      } else if (intendedResult < this.counterRange[0]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[0]);
      } else {
        _classPrivateFieldSet(this, _counter, intendedResult);
      }
    }
  }, {
    key: "increaseCounter",
    value: function increaseCounter() {
      this.counter++;
    }
  }, {
    key: "decreaseCounter",
    value: function decreaseCounter() {
      this.counter--;
      for (var index = this.lifeNodeList.length - 1; index >= 0; index--) {
        if (this.lifeNodeList[index].classList.contains('heart-filled')) {
          this.lifeNodeList[index].classList.remove('heart-filled');
          this.lifeNodeList[index].classList.add('heart-empty');
          break;
        }
      }
    }
  }, {
    key: "resetCounter",
    value: function resetCounter() {
      this.counter = 3;
      for (var index = this.lifeNodeList.length - 1; index >= 0; index--) {
        if (this.lifeNodeList[index].classList.contains('heart-empty')) {
          this.lifeNodeList[index].classList.remove('heart-empty');
          this.lifeNodeList[index].classList.add('heart-filled');
        }
      }
    }
  }]);
  return Life;
}();
_defineProperty(Life, "all", {
  'myLife': new Life(myLifeNodes),
  'opponentLife': new Life(opponentLifeNodes)
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Life);

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var myBlockCounter = document.querySelector('span.my-block-counter');
var myAttackCounter = document.querySelector('span.my-attack-counter');
var opponentBlockCounter = document.querySelector('span.opponent-block-counter');
var opponentAttackCounter = document.querySelector('span.opponent-attack-counter');
var _counter = /*#__PURE__*/new WeakMap();
var AmmoInventory = /*#__PURE__*/function () {
  function AmmoInventory(type, element) {
    _classCallCheck(this, AmmoInventory);
    _classPrivateFieldInitSpec(this, _counter, {
      writable: true,
      value: 4
    });
    _defineProperty(this, "type", void 0);
    _defineProperty(this, "counterRange", [0, 4]);
    _defineProperty(this, "element", void 0);
    this.type = type;
    this.element = element;
    this.element.innerHTML = "X".concat(this.counter);
  }
  _createClass(AmmoInventory, [{
    key: "counter",
    get: function get() {
      return _classPrivateFieldGet(this, _counter);
    },
    set: function set(intendedResult) {
      if (intendedResult > this.counterRange[1]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[1]);
      } else if (intendedResult < this.counterRange[0]) {
        _classPrivateFieldSet(this, _counter, this.counterRange[0]);
      } else {
        _classPrivateFieldSet(this, _counter, intendedResult);
      }
      this.element.innerHTML = "X".concat(this.counter);
    }
  }, {
    key: "increaseCounter",
    value: function increaseCounter() {
      this.counter++;
    }
  }, {
    key: "decreaseCounter",
    value: function decreaseCounter() {
      this.counter--;
    }
  }, {
    key: "resetCounter",
    value: function resetCounter() {
      this.counter = 4;
    }
  }], [{
    key: "getTotalInventory",
    value: function getTotalInventory(player) {
      var playerAmmo = player.ammoInventory;
      return playerAmmo.blocks.counter + playerAmmo.attacks.counter;
    }
  }]);
  return AmmoInventory;
}();
_defineProperty(AmmoInventory, "all", {
  'block-left': new AmmoInventory('block', myBlockCounter),
  'attack-left': new AmmoInventory('attack', myAttackCounter),
  'opponentBlock': new AmmoInventory('block', opponentBlockCounter),
  'opponentAttack': new AmmoInventory('attack', opponentAttackCounter)
});
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AmmoInventory);

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Sunglasses = /*#__PURE__*/function () {
  function Sunglasses(element) {
    _classCallCheck(this, Sunglasses);
    _defineProperty(this, "element", void 0);
    this.element = element;
  }
  _createClass(Sunglasses, [{
    key: "activate",
    value: function activate() {
      this.element.classList.remove("d-none");
      this.element.classList.add("animate__backInDown", "animate__slow");
    }
  }]);
  return Sunglasses;
}();
_defineProperty(Sunglasses, "left", void 0);
_defineProperty(Sunglasses, "right", void 0);
(function () {
  Sunglasses.left = new Sunglasses(document.querySelector(".sunglasses-left"));
  Sunglasses.right = new Sunglasses(document.querySelector(".sunglasses-right"));
})();
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Sunglasses);

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ResultOverlay = /*#__PURE__*/function () {
  function ResultOverlay() {
    _classCallCheck(this, ResultOverlay);
  }
  _createClass(ResultOverlay, null, [{
    key: "updateTitle",
    value: function updateTitle(title) {
      this.element.classList.add(title);
    }
  }]);
  return ResultOverlay;
}();
_defineProperty(ResultOverlay, "element", document.querySelector(".result-banner"));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ResultOverlay);

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Tally = /*#__PURE__*/function () {
  function Tally(tallyElement, player) {
    _classCallCheck(this, Tally);
    _defineProperty(this, "tallyElement", void 0);
    _defineProperty(this, "player", void 0);
    _defineProperty(this, "currentTallyColumnNumber", _helpers_Game_js__WEBPACK_IMPORTED_MODULE_0__["default"].currentGame.currentRound.currentRoundNumber);
    this.tallyElement = tallyElement;
    this.player = player;
  }
  _createClass(Tally, [{
    key: "fillMoves",
    value: function fillMoves() {
      var playerMove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.player.moves.toJSON();
      var tallyColumn = this.tallyElement.querySelectorAll("td:nth-child(".concat(this.currentTallyColumnNumber, ")"));
      tallyColumn.forEach(function (td, index) {
        var moveComponent = Object.values(playerMove)[index];
        if (moveComponent === 'attack') {
          td.classList.add('cell-attacked');
        } else if (moveComponent === 'block') {
          td.classList.add('cell-blocked');
        }
      });
    }
  }, {
    key: "fillColumnDefeat",
    value: function fillColumnDefeat() {
      var tallyColumn = this.tallyElement.querySelectorAll("td:nth-child(".concat(this.currentTallyColumnNumber, ")"));
      tallyColumn.forEach(function (td) {
        // don't fill the roundPoints row; filling it looks ugly
        if (td.classList.contains('roundPoints')) {
          return;
        }
        td.classList.add('round-defeat');
      });
      this.currentTallyColumnNumber++;
    }
  }, {
    key: "fillColumnVictory",
    value: function fillColumnVictory() {
      var tallyColumn = this.tallyElement.querySelectorAll("td:nth-child(".concat(this.currentTallyColumnNumber, ")"));
      tallyColumn.forEach(function (td) {
        // don't fill the roundPoints row; filling it looks ugly
        if (td.classList.contains('roundPoints')) {
          return;
        }
        td.classList.add('round-won');
      });
      this.currentTallyColumnNumber++;
    }
  }, {
    key: "fillColumnDraw",
    value: function fillColumnDraw() {
      var tallyColumn = this.tallyElement.querySelectorAll("td:nth-child(".concat(this.currentTallyColumnNumber, ")"));
      tallyColumn.forEach(function (td) {
        // don't fill the roundPoints row; filling it looks ugly
        if (td.classList.contains('roundPoints')) {
          return;
        }
        td.classList.add('round-draw');
      });
      this.currentTallyColumnNumber++;
    }
  }]);
  return Tally;
}();
_defineProperty(Tally, "all", {});
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tally);

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var ReplayButton = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  show: function show() {
    if (this.DOMElement) {
      this.DOMElement.classList.add('replay-in-animation');
      this.DOMElement.classList.remove('replay-out-animation');
      this.DOMElement.classList.remove('d-none');
    }
  },
  hide: function hide() {
    this.DOMElement.classList.add('d-none');
  }
});
ReplayButton.DOMElement = document.querySelector('.play-again');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReplayButton);

/***/ }),
/* 21 */,
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var BackHomeButton = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  show: function show() {
    if (this.DOMElement) {
      this.DOMElement.classList.add('replay-in-animation');
      this.DOMElement.classList.remove('replay-out-animation');
      this.DOMElement.classList.remove('d-none');
    }
  },
  hide: function hide() {
    this.DOMElement.classList.add('d-none');
  }
});
BackHomeButton.DOMElement = document.querySelector('.back-home');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BackHomeButton);

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var DoneButton = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  click: function click() {
    this.hide();
    // disabling buttons for a moment
    this.DOMElement.disableClick(); // disabling done button
  },
  hide: function hide() {
    // hide the done (fight!) button
    this.DOMElement.classList.add('d-none');
  },
  reset: function reset() {
    this.DOMElement.classList.remove('d-none'); // show
    this.DOMElement.enableClick(); // enabling done button
  }
});

DoneButton.DOMElement = document.querySelector('.done');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DoneButton);

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// A Class of all players as static
var Players = /*#__PURE__*/_createClass(function Players() {
  _classCallCheck(this, Players);
});
_defineProperty(Players, "all", {});
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Players);

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _RoundMove_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var Player = /*#__PURE__*/function () {
  // username of the player : String

  // Set of moves of the player : RoundMove

  function Player(username, ammoInventory) {
    _classCallCheck(this, Player);
    _defineProperty(this, "username", void 0);
    _defineProperty(this, "moves", new _RoundMove_js__WEBPACK_IMPORTED_MODULE_0__["default"]());
    _defineProperty(this, "ammoInventory", {
      'blocks': null,
      // : Inventory
      'attacks': null // : Inventory
    });

    this.username = username;
    this.ammoInventory = ammoInventory;
  }

  /**
   * Resets all the moves of the player. Makes it ready for next rounds
   */
  _createClass(Player, [{
    key: "resetMoves",
    value: function resetMoves() {
      this.moves = new _RoundMove_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
  }]);
  return Player;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
var _head = /*#__PURE__*/new WeakMap();
var _body = /*#__PURE__*/new WeakMap();
var _legs = /*#__PURE__*/new WeakMap();
/*
* Move instances (objects) for every round -> RoundMove
* */
var RoundMove = /*#__PURE__*/function () {
  function RoundMove() {
    _classCallCheck(this, RoundMove);
    _classPrivateFieldInitSpec(this, _head, {
      writable: true,
      value: RoundMove.moveTypeEnum[2]
    });
    _classPrivateFieldInitSpec(this, _body, {
      writable: true,
      value: RoundMove.moveTypeEnum[2]
    });
    _classPrivateFieldInitSpec(this, _legs, {
      writable: true,
      value: RoundMove.moveTypeEnum[2]
    });
  }
  _createClass(RoundMove, [{
    key: "head",
    get:
    // Will be gotten safely using the below getter
    function get() {
      return _classPrivateFieldGet(this, _head);
    }

    // Will be set safely using the below setter
    ,
    set: function set(moveType) {
      _classPrivateFieldSet(this, _head, RoundMove.getValidMoveType(moveType));
    }

    // The body body-part property. Has a default of 'none'.
  }, {
    key: "body",
    get:
    // Will be gotten safely using the below getter
    function get() {
      return _classPrivateFieldGet(this, _body);
    }

    // Will be set safely using the below setter
    ,
    set: function set(moveType) {
      _classPrivateFieldSet(this, _body, RoundMove.getValidMoveType(moveType));
    }

    // The legs body-part property. Has a default of 'none'.
  }, {
    key: "legs",
    get:
    // Will be gotten safely using the below getter
    function get() {
      return _classPrivateFieldGet(this, _legs);
    }

    // Will be set safely using the below setter
    ,
    set: function set(moveType) {
      _classPrivateFieldSet(this, _legs, RoundMove.getValidMoveType(moveType));
    }

    // The selected move type. Will be used in the whole application
  }, {
    key: "toJSON",
    value:
    // Converts the properties to a JSON object to be used in other places of the application without errors.
    function toJSON() {
      return {
        head: this.head,
        body: this.body,
        legs: this.legs
      };
    }
  }], [{
    key: "selectedMoveType",
    get:
    // Will be gotten safely using the below getter
    function get() {
      return _classStaticPrivateFieldSpecGet(this, RoundMove, _selectedMoveType);
    }

    // Will be set safely using the below setter
    ,
    set: function set(moveType) {
      _classStaticPrivateFieldSpecSet(this, RoundMove, _selectedMoveType, RoundMove.getValidMoveType(moveType));
    }

    // Gets the valid move type, safely.
  }, {
    key: "getValidMoveType",
    value: function getValidMoveType(moveType) {
      //console.log('movetype enum', RoundMove.moveTypeEnum);
      //console.log('index of movetype', RoundMove.moveTypeEnum.indexOf(moveType));
      return RoundMove.moveTypeEnum.indexOf(moveType) > -1 ? moveType : 'none';
    }
  }]);
  return RoundMove;
}();
_defineProperty(RoundMove, "moveTypeEnum", ['attack', 'block', 'none']);
_defineProperty(RoundMove, "bodyPartsEnum", ['head', 'body', 'legs']);
var _selectedMoveType = {
  writable: true,
  value: null
};
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoundMove);

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _components_Inventories_AmmoIcon_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* harmony import */ var _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19);
/* harmony import */ var _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(23);
/* harmony import */ var _components_Tallies_RoundPoints_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
/* harmony import */ var _components_Play_BackHomeButton_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(22);
/* harmony import */ var _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(20);
/* harmony import */ var _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31);
/* harmony import */ var _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34);
/* harmony import */ var _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(35);
/* harmony import */ var _Game_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(14);
/* harmony import */ var _Players_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(24);
/* harmony import */ var _RoundMove_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(26);
/* harmony import */ var _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(15);
/* harmony import */ var _restingMode_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(36);
/* harmony import */ var _utils_wait_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(37);
/* harmony import */ var _io_client_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(38);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
// Components












var roundTitle = document.querySelector('div.round-title');
var Countdown = document.querySelector('div.countdown');

// Helpers






// Cores and Utils


var _currentRoundNumber = /*#__PURE__*/new WeakMap();
var Round = /*#__PURE__*/function () {
  function Round() {
    _classCallCheck(this, Round);
    _classPrivateFieldInitSpec(this, _currentRoundNumber, {
      writable: true,
      value: 1
    });
    _defineProperty(this, "counterRange", [1, 5]);
  }
  _createClass(Round, [{
    key: "currentRoundNumber",
    get: function get() {
      return _classPrivateFieldGet(this, _currentRoundNumber);
    },
    set: function set(intendedResult) {
      if (intendedResult > this.counterRange[1]) {
        _classPrivateFieldSet(this, _currentRoundNumber, this.counterRange[1]);
      } else if (intendedResult < this.counterRange[0]) {
        _classPrivateFieldSet(this, _currentRoundNumber, this.counterRange[0]);
      } else {
        _classPrivateFieldSet(this, _currentRoundNumber, intendedResult);
      }
    }
  }, {
    key: "nextRound",
    value: function nextRound() {}
  }, {
    key: "updateRoundTitle",
    value: function updateRoundTitle() {
      roundTitle.innerHTML = "<span>Round ".concat(this.currentRoundNumber, "</span>");
      roundTitle.classList.add("animate__bounceInDown");
    }
  }, {
    key: "increaseCounter",
    value: function increaseCounter() {
      this.currentRoundNumber++;
    }
  }, {
    key: "decreaseCounter",
    value: function decreaseCounter() {
      this.currentRoundNumber--;
    }
  }, {
    key: "resetCounter",
    value: function resetCounter() {
      this.currentRoundNumber = 1;
    }
  }, {
    key: "donePressed",
    value: function () {
      var _donePressed = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this = this;
        var myTally, opponentTally, opponentMove, _yield$Promise, receivedOpponentMoves, gameComplete, playerMoves, index, myMoveComponent, opponentMoveComponent, roundResult, leftPlayerTotalInventory, rightPlayerTotalInventory;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"].click();
              Object.values(_components_Inventories_AmmoIcon_js__WEBPACK_IMPORTED_MODULE_2__["default"].all).map(function (ammoIconComponent) {
                return ammoIconComponent.iconElement.disableClick();
              }); // disabling inventory ammo images/buttons.

              Object.values(_components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"].all).map(function (movePlaceholderComponent) {
                return movePlaceholderComponent.target.disableClick();
              }); // disabling the move placeholders

              // Reset the timer counter to be ready for the next round
              _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_3__["default"].all.myTimer.resetCounter();
              myTally = _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player1;
              opponentTally = _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player2;
              if (!(playMode === "online")) {
                _context2.next = 16;
                break;
              }
              _context2.next = 9;
              return new Promise(function (resolve, reject) {
                // web socket emit "game:round:submitMove" with payload: gameId
                _io_client_js__WEBPACK_IMPORTED_MODULE_18__.socket.emit("game:round:submitMove", {
                  gameId: gameId,
                  move: _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player1.moves.toJSON()
                });

                // Custom error
                _io_client_js__WEBPACK_IMPORTED_MODULE_18__.socket.on(":error", function (err) {
                  console.log("App Error: ", err);
                });

                // console.log(opponentMove); // debug
                if (!opponentMove) {
                  _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_9__["default"].show("Waiting for opponent");
                }
                document.addEventListener('opponentMoveReady', function (event) {
                  // Destructure all the fetched data.
                  var _event$detail = event.detail,
                    opponentMoves = _event$detail.opponentMoves,
                    gameComplete = _event$detail.gameComplete;

                  // console.log('opponentmoveready event listener', event); // debug

                  _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_9__["default"].hide();

                  // Save the game to the localStorage
                  // TODO: update opponentMove and MoveHistory on LocalStorage

                  resolve({
                    receivedOpponentMoves: opponentMoves,
                    gameComplete: gameComplete
                  });
                });
              });
            case 9:
              _yield$Promise = _context2.sent;
              receivedOpponentMoves = _yield$Promise.receivedOpponentMoves;
              gameComplete = _yield$Promise.gameComplete;
              // Setting the opponent's move to its instance.
              opponentMove = receivedOpponentMoves;
              Object.keys(opponentMove).map(function (bodyPart) {
                var move = opponentMove[bodyPart];
                _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player2.moves[bodyPart] = opponentMove[bodyPart];
                if (move === "attack") {
                  _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player2.ammoInventory.attacks.counter--;
                }
                if (move === "block") {
                  _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player2.ammoInventory.blocks.counter--;
                }
              });
              _context2.next = 17;
              break;
            case 16:
              // Generating the Bot player's moves.
              opponentMove = _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player2.generateRandomMoves();
            case 17:
              // console.log("Opponent Moves: ", opponentMove); // debug

              // Fill my tally columns with my moves
              myTally.fillMoves();

              // Fill opponent's tally columns with their moves
              opponentTally.fillMoves();

              // Calculate players moves at each column AND gather them inside an array.
              playerMoves = [];
              for (index = 0; index < 3; index++) {
                myMoveComponent = Object.values(_Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player1.moves.toJSON())[index];
                opponentMoveComponent = Object.values(opponentMove)[index];
                playerMoves.push(this.singleCompare(myMoveComponent, opponentMoveComponent));
              }
              if (playerMoves.includes(1)) {
                // Decrease opponent life
                _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.opponentLife.decreaseCounter();
              }
              if (playerMoves.includes(2)) {
                // Decrease my life
                _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.myLife.decreaseCounter();
              }

              // Calculate the result of this round
              roundResult = this.tripletCompare(playerMoves); // Aftermath
              if (roundResult === 1) {
                // Player 1 won ; Player 2 lost
                myTally.fillColumnVictory();
                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderRoundWinning();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderRoundLosing();
                }, 600);
                setTimeout(function () {
                  document.querySelector("#winRound").play();
                }, 750);
                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderNormalPhase();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderNormalPhase();
                }, 1440);
                opponentTally.fillColumnDefeat();

                // Decrease opponent life
                /* Life.all.opponentLife.decreaseCounter(); */

                //winning round popup

                _components_Tallies_RoundPoints_js__WEBPACK_IMPORTED_MODULE_6__["default"].exhibit("win", "+1");
              } else if (roundResult === 2) {
                // Player 1 lost ; Player 2 won

                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderRoundLosing();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderRoundWinning();
                }, 600);
                myTally.fillColumnDefeat();
                setTimeout(function () {
                  document.querySelector("#loseRound").play();
                }, 700);
                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderNormalPhase();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderNormalPhase();
                }, 1440);
                opponentTally.fillColumnVictory();

                // Decrease my life
                /* Life.all.myLife.decreaseCounter(); */

                //losing round popup
                _components_Tallies_RoundPoints_js__WEBPACK_IMPORTED_MODULE_6__["default"].exhibit("lose", "-1");
              } else {
                // Draw
                myTally.fillColumnDraw();
                opponentTally.fillColumnDraw();
                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderRoundDraw();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderRoundDraw();
                }, 650);
                setTimeout(function () {
                  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].renderNormalPhase();
                  _components_Pigeons_RightPigeon_js__WEBPACK_IMPORTED_MODULE_11__["default"].renderNormalPhase();
                }, 1500);
                _components_Tallies_RoundPoints_js__WEBPACK_IMPORTED_MODULE_6__["default"].exhibit("draw", "draw!");
              }
              roundTitle.classList.remove("animate__bounceInDown");
              (0,_restingMode_js__WEBPACK_IMPORTED_MODULE_16__["default"])();

              // console.log('life.all', Life.all); // debug
              leftPlayerTotalInventory = _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all["attack-left"].counter + _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all["block-left"].counter;
              rightPlayerTotalInventory = _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all.opponentAttack.counter + _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all.opponentBlock.counter; // change back timer background to blue on new round
              document.querySelector(".timer-counter").classList.remove("red");
              document.querySelector(".timer-counter").classList.add("blue");
              if (!(
              // EITHER:
              this.currentRoundNumber === this.counterRange[1] // If this was the last round
              || _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.myLife.counter === 0 // If player1 has 0 lives
              || _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.opponentLife.counter === 0 // If player2 has 0 lives
              || leftPlayerTotalInventory + rightPlayerTotalInventory === 0 // if both players have 0 inventory
              ||
              // OR:
              _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.myLife.counter !== _components_Inventories_Life_js__WEBPACK_IMPORTED_MODULE_15__["default"].all.opponentLife.counter // lives are unequal
              && _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all["attack-left"].counter === 0 // and there are no forks left...
              && _components_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_1__["default"].all.opponentAttack.counter === 0 // ... for both players
              )) {
                _context2.next = 41;
                break;
              }
              _context2.next = 34;
              return _Game_js__WEBPACK_IMPORTED_MODULE_12__["default"].currentGame.gameOver();
            case 34:
              // Play again button
              _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_8__["default"].show();

              // Show the back to Home button
              _components_Play_BackHomeButton_js__WEBPACK_IMPORTED_MODULE_7__["default"].show();
              _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"].hide();
              document.querySelector('div.moves-placeholder').classList.add('d-none');
              this.resetCounter();
              _context2.next = 42;
              break;
            case 41:
              setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
                return _regeneratorRuntime().wrap(function _callee$(_context) {
                  while (1) switch (_context.prev = _context.next) {
                    case 0:
                      document.querySelector("div.countdown-overlay").classList.remove("d-none");
                      _context.next = 3;
                      return _this.roundCountdown();
                    case 3:
                      document.querySelector("div.countdown-overlay").classList.add("d-none");
                      _this.increaseCounter();
                      setTimeout(function () {
                        _this.clearBoardForNewRound();
                      }, 800);
                    case 6:
                    case "end":
                      return _context.stop();
                  }
                }, _callee);
              })), 1600);
            case 42:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function donePressed() {
        return _donePressed.apply(this, arguments);
      }
      return donePressed;
    }() // simple timeout between rounds, no extra animations
  }, {
    key: "clearBoardForNewRound",
    value: function clearBoardForNewRound() {
      // Resetting/Re-initializing the MovePlaceholders
      _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"].resetAll();
      _Players_js__WEBPACK_IMPORTED_MODULE_13__["default"].all.player1.resetMoves();
      _RoundMove_js__WEBPACK_IMPORTED_MODULE_14__["default"].selectedMoveType = 'none';
      _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"].hide();
      document.querySelector('div.moves-placeholder').classList.remove('d-none');
      document.querySelectorAll('div.mv-placeholder').forEach(function (element) {
        element.classList.remove('filled-block');
        element.classList.remove('filled-attack');
      });
      document.querySelectorAll('.pop-out-animation').forEach(function (element) {
        element.classList.add('pop-in-animation');
        element.classList.remove('pop-out-animation');
      });
      _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].enterMovePickingMode();
      this.updateRoundTitle();
      document.querySelectorAll('.hide-animation').forEach(function (element) {
        element.classList.add('show-animation');
        element.classList.remove('hide-animation');
      });

      // Start timer
      _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_3__["default"].all.myTimer.startCounter();

      // Enabling everything back for the next new round
      _components_DoneButton_js__WEBPACK_IMPORTED_MODULE_5__["default"].reset();
      Object.values(_components_Inventories_AmmoIcon_js__WEBPACK_IMPORTED_MODULE_2__["default"].all).map(function (ammoIconComponent) {
        return ammoIconComponent.iconElement.enableClick();
      }); // enabling inventory ammo images/buttons.

      Object.values(_components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_0__["default"].all).map(function (movePlaceholderComponent) {
        return movePlaceholderComponent.target.enableClick();
      }); // enabling the move placeholders
    }
  }, {
    key: "roundCountdown",
    value: function () {
      var _roundCountdown = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var _i, _arr, item, _i2, _arr2, _item;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _i = 0, _arr = ['ready', 'set', 'go'];
            case 1:
              if (!(_i < _arr.length)) {
                _context3.next = 9;
                break;
              }
              item = _arr[_i];
              Countdown.classList.add(item);
              _context3.next = 6;
              return (0,_utils_wait_js__WEBPACK_IMPORTED_MODULE_17__["default"])(500);
            case 6:
              _i++;
              _context3.next = 1;
              break;
            case 9:
              for (_i2 = 0, _arr2 = ['ready', 'set', 'go']; _i2 < _arr2.length; _i2++) {
                _item = _arr2[_i2];
                Countdown.classList.remove(_item);
              }
            case 10:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function roundCountdown() {
        return _roundCountdown.apply(this, arguments);
      }
      return roundCountdown;
    }()
  }, {
    key: "fillTheTalliesWithMoveHistory",
    value: function fillTheTalliesWithMoveHistory(moveHistory) {
      // console.log("move history ", moveHistory); // debug

      var player1Tally = _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player1;
      var player2Tally = _components_Tallies_Tally_js__WEBPACK_IMPORTED_MODULE_4__["default"].all.player2;
      for (var i = 0; i < moveHistory.length; i++) {
        var roundMoves = moveHistory[i];
        var player1Moves = roundMoves.player1;
        var player2Moves = roundMoves.player2;

        // Fill my tally columns with my moves
        player1Tally.fillMoves(player1Moves);

        // Fill opponent's tally columns with their moves
        player2Tally.fillMoves(player2Moves);

        // Calculate players moves at each column AND gather them inside an array.
        var playerMoves = [];
        for (var index = 0; index < 3; index++) {
          var player1MoveComponent = Object.values(player1Moves)[index];
          var player2MoveComponent = Object.values(player2Moves)[index];
          playerMoves.push(this.singleCompare(player1MoveComponent, player2MoveComponent));
        }

        // Calculate the result of this round
        var roundResult = this.tripletCompare(playerMoves);

        // Aftermath
        if (roundResult === 1) {
          // Player 1 won ; Player 2 lost
          player1Tally.fillColumnVictory();
          player2Tally.fillColumnDefeat();
        } else if (roundResult === 2) {
          // Player 1 lost ; Player 2 won
          player1Tally.fillColumnDefeat();
          player2Tally.fillColumnVictory();
        } else {
          // Draw
          player1Tally.fillColumnDraw();
          player2Tally.fillColumnDraw();
        }
      }
    }
  }, {
    key: "singleCompare",
    value: function singleCompare(move1, move2) {
      if (move1 === 'attack' && move2 === 'none') {
        return 1;
      } else if (move1 === 'none' && move2 === 'attack') {
        return 2;
      } else {
        return 0;
      }
    }
  }, {
    key: "tripletCompare",
    value: function tripletCompare(moves) {
      var ones = moves.filter(function (number) {
        return number === 1;
      }).length;
      var twos = moves.filter(function (number) {
        return number === 2;
      }).length;
      if (ones > twos) {
        return 1;
      } else if (ones < twos) {
        return 2;
      } else {
        return 0;
      }
    }
  }]);
  return Round;
}();
_defineProperty(Round, "tdCounter", 0);
_defineProperty(Round, "all", {});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Round);

/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _helpers_Players_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }



var _bodyPartType = /*#__PURE__*/new WeakMap();
var _moveType = /*#__PURE__*/new WeakMap();
var MovePlaceholder = /*#__PURE__*/function () {
  // The placeholder body-type. It can be either of these three: `head`, `body`, `legs`.

  // The move type that the user selected. This value is 'none' by default. It will be changed later for every instance.

  // The move the user placed on a particular placeholder. This value is 'none' by default and will be changed later.

  // The DOM element corresponding to either the `head`, `body`, or `legs` placeholders.

  function MovePlaceholder(bodyPartType) {
    _classCallCheck(this, MovePlaceholder);
    _defineProperty(this, "checked", false);
    _classPrivateFieldInitSpec(this, _bodyPartType, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _moveType, {
      writable: true,
      value: 'none'
    });
    _defineProperty(this, "movePlaced", 'none');
    _defineProperty(this, "target", void 0);
    // Here, at the very beginning of initializing this, we tell the instance to recognize the DOM element.
    this.target = document.querySelector("div.mv-placeholder.".concat(bodyPartType));
    this.bodyPartType = bodyPartType;
  }
  _createClass(MovePlaceholder, [{
    key: "bodyPartType",
    get: function get() {
      return _classPrivateFieldGet(this, _bodyPartType);
    },
    set: function set(newBodyPartType) {
      _classPrivateFieldSet(this, _bodyPartType, newBodyPartType);
      this.changeMove(this.movePlaced);
    }
  }, {
    key: "moveType",
    get: function get() {
      return _classPrivateFieldGet(this, _moveType);
    },
    set: function set(newMoveType) {
      if (_helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_1__["default"].moveTypeEnum.includes(newMoveType)) {
        _classPrivateFieldSet(this, _moveType, newMoveType);
      }
    }
  }, {
    key: "changeMove",
    value: function changeMove(newMove) {
      _helpers_Players_js__WEBPACK_IMPORTED_MODULE_2__["default"].all.player1.moves[this.bodyPartType] = newMove;
    }
  }, {
    key: "check",
    value: function check() {
      if (this.moveType === 'none') {
        return;
      }
      this.checked = !this.checked;
      if (this.checked) {
        /* do stuff as if it's ON */
        if (_Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_0__["default"].all["".concat(this.moveType, "-left")].counter === 0) {
          // if we have no inventory left, don't do place a move
          this.checked = !this.checked;
          _helpers_Players_js__WEBPACK_IMPORTED_MODULE_2__["default"].all.player1.moves[this.bodyPartType] = 'none';
        } else {
          this.target.classList.add("filled-".concat(this.moveType));
          this.movePlaced = this.moveType;
          this.changeMove(this.movePlaced);
          _Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_0__["default"].all["".concat(this.moveType, "-left")].decreaseCounter();
        }
      } else {
        /* do stuff as if it's OFF */
        this.target.classList.remove("filled-".concat(_helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_1__["default"].moveTypeEnum[0]), "filled-".concat(_helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_1__["default"].moveTypeEnum[1]));
        this.changeMove(null);
        if (this.movePlaced === 'attack') {
          _Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_0__["default"].all["attack-left"].increaseCounter();
        } else if (this.movePlaced === 'block') {
          _Inventories_AmmoInventory_js__WEBPACK_IMPORTED_MODULE_0__["default"].all["block-left"].increaseCounter();
        }
        this.movePlaced = null;
      }
    }

    /**
     * Resets/Re-initialize every placeholder to make it ready for the next round.
     */
  }], [{
    key: "resetAll",
    value: function resetAll() {
      MovePlaceholder.all = {
        'head': new MovePlaceholder('head'),
        'body': new MovePlaceholder('body'),
        'legs': new MovePlaceholder('legs')
      };
    }
  }]);
  return MovePlaceholder;
}();
_defineProperty(MovePlaceholder, "all", {});
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovePlaceholder);

/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var player1_shield = document.querySelector('img.my-shield');
var player1_attack = document.querySelector('img.my-attack');
var AmmoIcon = /*#__PURE__*/function () {
  // Img tag element in DOM

  // Ammo is either attack or block

  function AmmoIcon(type, iconElement) {
    _classCallCheck(this, AmmoIcon);
    _defineProperty(this, "iconElement", void 0);
    _defineProperty(this, "type", void 0);
    this.iconElement = iconElement;
    this.type = type;
  }

  /**
   * Do stuff and DOM manipulation after user clicked on this ammo icon
   */
  _createClass(AmmoIcon, [{
    key: "click",
    value: function click() {
      _helpers_RoundMove_js__WEBPACK_IMPORTED_MODULE_0__["default"].selectedMoveType = this.type;
      // turn this button to clicked (activated)

      // this should be turned into a css class. because the src might differ everytime
      this.iconElement.setAttribute("src", "/assets/img/GUI-controls/MainControls/PressedShield.png");
    }

    /**
     * Do DOM manipulation to make it un-pressed this.
     */
  }, {
    key: "unClick",
    value: function unClick() {
      // turn this back to the static version

      // this should be turned into a css class. because the src might differ everytime
      this.iconElement.setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");
    }
  }]);
  return AmmoIcon;
}();
_defineProperty(AmmoIcon, "all", {
  'player1_shield': new AmmoIcon("block", player1_shield),
  'player1_attack': new AmmoIcon("attack", player1_attack)
});
setInterval(function () {
  var myShield = AmmoIcon.all.player1_shield.iconElement;
  myShield.pushAnimationLibrary("animate__pulse", "animate__faster");
  setTimeout(function () {
    var myAttack = AmmoIcon.all.player1_attack.iconElement;
    myAttack.pushAnimationLibrary("animate__pulse", "animate__faster");
  }, 500);
}, 2500);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AmmoIcon);

/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _helpers_Round_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }


// Helpers

var RoundPoints = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  exhibit: function exhibit(roundResult, pointText) {
    this.roundResult = roundResult;
    this.pointText = pointText;
    this.curtainsUp();
    this.curtainsClose();
  },
  curtainsUp: function curtainsUp() {
    var _this = this;
    setTimeout(function () {
      var span = document.createElement("span");
      span.innerHTML = _this.pointText;
      span = _this.decorateSpan(span);
      var roundPoints = document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(".concat(_helpers_Round_js__WEBPACK_IMPORTED_MODULE_1__["default"].tdCounter + 2, ")"));
      roundPoints.appendChild(span);
      _helpers_Round_js__WEBPACK_IMPORTED_MODULE_1__["default"].tdCounter++;
    }, 350);
  },
  curtainsClose: function curtainsClose() {
    setTimeout(function () {
      document.querySelector("span.roundResult").remove();
    }, 1500);
  },
  decorateSpan: function decorateSpan(span) {
    switch (this.roundResult) {
      case "win":
        span.classList.add("roundResult", "roundWin");
        break;
      case "lose":
        span.classList.add("roundResult", "roundLose");
        break;
      case "draw":
        span.style.fontSize = "1.4vw";
        span.style.webkitTextStrokeWidth = "0.1vw";
        span.classList.add("roundResult", "roundDraw");
        break;
      default:
        break;
    }
    return span;
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RoundPoints);

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _Home_SearchingText_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
/* harmony import */ var _Home_SearchingForOpponent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



var WaitSign = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  previousText: null,
  isShown: false,
  show: function show(text) {
    var withDots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (override && this.isShown) {
      this.hide();
    }
    this.isShown = true;
    this.DOMElement.classList.remove("d-none");
    this.DOMElement.classList.add("animate__slideInDown");
    _Home_SearchingText_js__WEBPACK_IMPORTED_MODULE_1__["default"].DOMElement.innerHTML = text;
    _Home_SearchingText_js__WEBPACK_IMPORTED_MODULE_1__["default"].show();
    if (withDots) _Home_SearchingForOpponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].animateWithDots();
  },
  hide: function hide() {
    this.DOMElement.classList.remove("animate__slideInDown");
    this.DOMElement.classList.add("d-none");
    _Home_SearchingText_js__WEBPACK_IMPORTED_MODULE_1__["default"].hide();
    this.isShown = false;
    _Home_SearchingForOpponent_js__WEBPACK_IMPORTED_MODULE_2__["default"].clearAnimation();
  },
  showTemporarily: function showTemporarily(text) {
    var _this = this;
    var withDots = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
    var previousText = this.previousText;
    if (this.isShown) {
      this.hide();
    }
    this.show(text, withDots);
    setTimeout(function () {
      _this.hide();
      if (previousText) {
        _this.show(previousText);
      }
    }, timeout);
  }
});
WaitSign.DOMElement = document.querySelector('.wait-sign');
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WaitSign);

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var LeftPigeon = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  assetFolderPath: null,
  init: function init() {
    this.DOMElement = document.querySelector('div.pigeons-container img.pigeon-left');
    if (!this.DOMElement) {
      console.error('LeftPigeon.init: no DOMElement found. Makes sure to have a div.pigeons-container in the DOM. in' + ' play.ejs');
      return;
    }
    if (mySelectedPigeon && mySelectedPigeon.assetFolderPath) {
      this.assetFolderPath = mySelectedPigeon.assetFolderPath;
      this.applyHueAngle(mySelectedPigeon.hueAngle);
    } else {
      this.assetFolderPath = "/assets/img/pigeons/pusiness_pigeon";
    }
    this.renderNormalPhase();
  },
  renderNormalPhase: function renderNormalPhase() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/right_normal.svg");
  },
  renderRoundWinning: function renderRoundWinning() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/right_hand_to_chest_alternate_1.svg");
  },
  renderRoundLosing: function renderRoundLosing() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/right_rip.svg");
  },
  renderRoundDraw: function renderRoundDraw() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/right_no_legs_normal_alternate_1.svg");
  },
  enterMovePickingMode: function enterMovePickingMode() {
    this.DOMElement.classList.add('picking-move-animation');
    this.DOMElement.classList.remove('revert-pigeon-pick-move');
  },
  exitMovePickingMode: function exitMovePickingMode() {
    this.DOMElement.classList.add('revert-pigeon-pick-move');
    this.DOMElement.classList.remove('picking-move-animation');
  },
  applyHueAngle: function applyHueAngle(hueAngle) {
    this.DOMElement.style.filter = "hue-rotate(".concat((hueAngle / 100).toFixed(2), "turn)");
  }
});

// Initiating the component
LeftPigeon.init();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LeftPigeon);

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var RightPigeon = _objectSpread(_objectSpread({}, _core_component_js__WEBPACK_IMPORTED_MODULE_0__["default"]), {}, {
  assetFolderPath: null,
  init: function init() {
    this.DOMElement = document.querySelector('div.pigeons-container img.pigeon-right');
    if (!this.DOMElement) {
      console.error('RightPigeon.init: no DOMElement found. Please check the markup. (EJS) and make sure this page' + ' has a div with class pigeons-container and an img with class pigeon-right');
      return;
    }
    if (opponentSelectedPigeon && opponentSelectedPigeon.assetFolderPath) {
      this.assetFolderPath = opponentSelectedPigeon.assetFolderPath;
      this.applyHueAngle(opponentSelectedPigeon.hueAngle);
    } else {
      this.assetFolderPath = "/assets/img/pigeons/hoodie_pigeon";
    }
    this.renderNormalPhase();
  },
  renderNormalPhase: function renderNormalPhase() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/left_normal.svg");
  },
  renderRoundWinning: function renderRoundWinning() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/left_hand_to_chest.svg");
  },
  renderRoundLosing: function renderRoundLosing() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/left_rip.svg");
  },
  renderRoundDraw: function renderRoundDraw() {
    this.DOMElement.src = "".concat(this.assetFolderPath, "/left_no_legs_normal_alternate.svg");
  },
  applyHueAngle: function applyHueAngle(hueAngle) {
    this.DOMElement.style.filter = "hue-rotate(".concat((hueAngle / 100).toFixed(2), "turn)");
  }
});

// Initiating the component
RightPigeon.init();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RightPigeon);

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(34);

function restingMode() {
  document.querySelectorAll('.show-animation').forEach(function (element) {
    // console.log('element', element); // debug
    element.classList.add('hide-animation');
    element.classList.remove('show-animation');
  });
  document.querySelectorAll('.pop-in-animation').forEach(function (element) {
    // console.log('element', element); // debug
    element.classList.add('pop-out-animation');
    element.classList.remove('pop-in-animation');
  });
  _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_0__["default"].exitMovePickingMode();
  document.getElementById("attack-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/attackfork-1.png");
  document.getElementById("shield-image").setAttribute("src", "/assets/img/GUI-controls/MainControls/vikingshield-1.png");
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (restingMode);

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ wait)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function wait(_x) {
  return _wait.apply(this, arguments);
}
function _wait() {
  _wait = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(time) {
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", new Promise(function (resolve, reject) {
            setTimeout(resolve, time);
          }));
        case 1:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _wait.apply(this, arguments);
}

/***/ }),
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

var gameCache = {
  fetch: function fetch() {
    var playerMe = _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageJSON('playerMe');
    var playerOpponent = _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageJSON('playerOpponent');
    var gameComplete = _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageJSON('gameComplete');
    return {
      playerMe: playerMe,
      playerOpponent: playerOpponent,
      gameComplete: gameComplete
    };
  },
  saveGame: function saveGame(playerMe, playerOpponent, gameComplete) {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStorageJSON('playerMe', playerMe);
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStorageJSON('playerOpponent', playerOpponent);
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStorageJSON('gameComplete', gameComplete);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameCache);

/***/ })
]]);