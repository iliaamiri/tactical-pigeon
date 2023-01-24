/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_router_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _core_init_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _auth_Auth_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);


// Importing the init.js and calling the function BEFORE EVERYTHING.

(0,_core_init_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

// Check for authentication

await _auth_Auth_js__WEBPACK_IMPORTED_MODULE_2__["default"].authenticate();
await __webpack_require__.e(/* import() */ 1).then(__webpack_require__.t.bind(__webpack_require__, 11, 23));
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/', 'home');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/signup', 'signup');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/userHome', 'userHome');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/mapselection', 'mapSelection');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/profile', 'userProfile');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/customizePigeon', 'customizePigeon');
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/play', 'playOffline');

// This route should be the last one for the /play routes
_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].assign('/play/:gameId', 'playOnline');
console.log(_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].chosenPath);
await __webpack_require__(10)("./".concat(_core_router_js__WEBPACK_IMPORTED_MODULE_0__["default"].chosenPath, ".js"));
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var currentPath = function currentPath() {
  var path = window.location.pathname;
  path = path.replace("?", "");
  if (path.length > 1 && path[path.length - 1] === "/") {
    path = path.substring(0, path.length - 1);
  }
  return path;
};
var router = {
  chosenPath: null,
  assign: function assign(path, filePath) {
    if (this.chosenPath !== null) {
      return;
    }
    var currPath = currentPath().split("/");
    currPath.shift();
    var targetPath = path.split("/");
    targetPath.shift();
    if (currPath.length < 1) {
      return;
    }
    for (var index in currPath) {
      var pathSegment = currPath[index];
      var targetPathSegment = targetPath[index];
      if (pathSegment !== targetPathSegment) {
        if (!targetPathSegment) {
          return;
        }
        if (!targetPathSegment.includes(":")) {
          return;
        }
      }
    }
    this.chosenPath = filePath;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * This single module is an initiation function which contains infrastructure additional that we will need later on
 * in our application.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  /**
   * This prototype function allows you to push animations to an element without having to worry about removing the
   * previous one. It will handle that for you (well, most of the time).
   *
   * @param animation : Object { className: "css-animation-class" } -> this is the css animation class you wanna push to this element.
   * @param timeoutDuration : number in milliseconds -> this is how much you want to wait before removing the previous existing animation class.
   */
  // HTMLElement.prototype.pushAnimation = function (animation, timeoutDuration = 2000) {
  //     let previousAnimationClassName = this.dataset.previousAnimationClassName;
  //     let pendingAnimationClassName = animation.className;
  //     this.classList.add(pendingAnimationClassName);
  //     setTimeout(() => {
  //         if (previousAnimationClassName)
  //             this.classList.remove(previousAnimationClassName);
  //
  //         this.dataset.previousAnimationClassName = pendingAnimationClassName;
  //     }, timeoutDuration);
  // }

  HTMLElement.prototype.pushAnimationLibrary = function () {
    var _this$classList,
      _this = this;
    for (var _len = arguments.length, animations = new Array(_len), _key = 0; _key < _len; _key++) {
      animations[_key] = arguments[_key];
    }
    (_this$classList = this.classList).add.apply(_this$classList, animations);
    this.addEventListener('animationend', function () {
      var _this$classList2;
      (_this$classList2 = _this.classList).remove.apply(_this$classList2, animations);
    });
  };

  /**
   * Disables/Enabling clicking on an element.
   * Why did I made a new file and did this?
   *  Well, to answer the first questions: I don't wanna scroll in index.js until my finger dies.
   *  And for the second question: doesn't it look nice? -> element.disableClick() ! or element.enableClick() !
   */
  HTMLElement.prototype.disableClick = function () {
    this.classList.add('currently-not-clickable');
  };
  HTMLElement.prototype.enableClick = function () {
    this.classList.remove('currently-not-clickable');
  };

  /**
   * Allowing a NodeList (array-like DOM data structure) to use shift method of as if it was an array.
   */
  NodeList.prototype.shift = function () {
    return Array.from(this).shift;
  };
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _storage_authCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _storage_userCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _storage_guestInfoCache_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var Auth = {
  isLoggedIn: false,
  isLoggedInAsGuest: false,
  jwtToken: null,
  username: null,
  email: null,
  displayName: null,
  authenticate: function authenticate() {
    var _this = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var apiResponse, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return axios.post('/api/auth/authenticate');
          case 3:
            apiResponse = _context.sent;
            result = apiResponse.data; // If the user is NOT logged in, clear all the cache related to the user (auth token and user information).
            if (result.status) {
              _context.next = 8;
              break;
            }
            _this._forgetAllYouHave();
            return _context.abrupt("return", false);
          case 8:
            // If the user is logged in, save the user information to the cache.
            // And remember that the user is logged in.
            _this.isLoggedIn = true;
            _this.isLoggedInAsGuest = _this._isUsernameInGuestIdFormat(result.username);
            _this.username = result.username;
            if (_this.isLoggedInAsGuest) {
              _this._rememberTheGuest();
            } else {
              _this._rememberTheTrackedUser();
            }
            _this.jwtToken = _storage_authCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].fetchJWT();
            return _context.abrupt("return", true);
          case 16:
            _context.prev = 16;
            _context.t0 = _context["catch"](0);
            // Unexpected error.
            console.error(_context.t0);
          case 19:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 16]]);
    }))();
  },
  login: function login(givenEmail, givenPassword) {
    var _this2 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var logInResponse, authResult;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return axios.post("/api/auth/login", {
              givenEmail: givenEmail,
              givenPassword: givenPassword
            });
          case 3:
            logInResponse = _context2.sent;
            authResult = logInResponse.data;
            if (authResult.status) {
              _context2.next = 7;
              break;
            }
            return _context2.abrupt("return", false);
          case 7:
            _this2._cacheTrackedUserReceivedPayload(authResult.username, authResult.tokenValue, givenEmail);

            // Remember that the user is logged in.
            _this2.isLoggedIn = true;
            return _context2.abrupt("return", true);
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            // Unexpected error.
            console.error(_context2.t0);
            return _context2.abrupt("return", false);
          case 16:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 12]]);
    }))();
  },
  loginAsGuest: function loginAsGuest() {
    var _arguments = arguments,
      _this3 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var displayName, apiResponse, authResult, tokenValue, guestId, errMessage;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            displayName = _arguments.length > 0 && _arguments[0] !== undefined ? _arguments[0] : "Guest";
            _context3.prev = 1;
            _context3.next = 4;
            return axios.post("/api/auth/letMeIn");
          case 4:
            apiResponse = _context3.sent;
            authResult = apiResponse.data;
            if (authResult.status) {
              _context3.next = 9;
              break;
            }
            console.log(authResult); // debug
            return _context3.abrupt("return", false);
          case 9:
            tokenValue = authResult.tokenValue;
            guestId = authResult.guestId;
            _this3.isLoggedIn = true;
            _this3.isLoggedInAsGuest = true;
            _this3.username = guestId;
            _this3.displayName = displayName;
            _this3._rememberTheGuest(displayName);
            _this3.jwtToken = tokenValue;
            _storage_authCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveJWT(tokenValue);
            return _context3.abrupt("return", true);
          case 21:
            _context3.prev = 21;
            _context3.t0 = _context3["catch"](1);
            // Unexpected error.
            console.error(_context3.t0);
            errMessage = _context3.t0.message;
            if (!(errMessage === "ALREADY_AUTHENTICATED")) {
              _context3.next = 28;
              break;
            }
            console.log("Already logged in as a guest. This code should not be reached. Either the code is wrong or the client" + "is intentionally trying to log in as a guest when it is already logged in as a guest.");
            return _context3.abrupt("return", true);
          case 28:
            return _context3.abrupt("return", false);
          case 29:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[1, 21]]);
    }))();
  },
  signUp: function signUp(givenEmail, givenPassword, givenDisplayName) {
    var _this4 = this;
    return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var signUpResponse, signUpResult, errMessage;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return axios.post("/api/auth/signup", {
              givenEmail: givenEmail,
              givenPassword: givenPassword,
              givenDisplayName: givenDisplayName
            });
          case 3:
            signUpResponse = _context4.sent;
            signUpResult = signUpResponse.data;
            if (signUpResult.status) {
              _context4.next = 7;
              break;
            }
            return _context4.abrupt("return", signUpResult);
          case 7:
            _this4._cacheTrackedUserReceivedPayload(signUpResult.username, signUpResponse.tokenValue, givenEmail);

            // Remember that the user is logged in.
            _this4.isLoggedIn = true;
            return _context4.abrupt("return", true);
          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            errMessage = _context4.t0.message;
            console.log(errMessage);
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 12]]);
    }))();
  },
  _cacheTrackedUserReceivedPayload: function _cacheTrackedUserReceivedPayload(receivedUsername, receivedTokenValue, email) {
    // Cache the JWT token.
    if (receivedTokenValue) {
      this.jwtToken = receivedTokenValue;
      _storage_authCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].saveJWT(receivedTokenValue);
    }

    // Remember the user's information.
    this.username = receivedUsername;
    this._rememberTheTrackedUser(email);
  },
  _rememberTheGuest: function _rememberTheGuest() {
    var displayName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Guest";
    var foundGuestInfo = _storage_guestInfoCache_js__WEBPACK_IMPORTED_MODULE_2__["default"].getGuestInfo();
    if (foundGuestInfo) {
      this.displayName = foundGuestInfo.displayName;
    } else {
      this.displayName = displayName;
    }
  },
  _rememberTheTrackedUser: function _rememberTheTrackedUser(email) {
    this.email = email;
    this.displayName = this.username;

    // Save the user info to the cache
    _storage_userCache_js__WEBPACK_IMPORTED_MODULE_1__["default"].saveUserInfo({
      username: this.username,
      email: this.email
    });
  },
  _forgetAllYouHave: function _forgetAllYouHave() {
    _storage_authCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].clearJWT();
    _storage_userCache_js__WEBPACK_IMPORTED_MODULE_1__["default"].clearUserInfo();
    _storage_guestInfoCache_js__WEBPACK_IMPORTED_MODULE_2__["default"].clearGuestInfo();
  },
  _isUsernameInGuestIdFormat: function _isUsernameInGuestIdFormat(username) {
    // Check if the username is in the format of a guestId. (e.g. guest_123456789)
    if (!username || typeof username !== 'string') {
      return false;
    }
    return username.substring(0, 6) === 'guest_';
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Auth);

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);


var authCache = {
  jwtKeyName: "JWT",
  saveJWT: function saveJWT(jwt) {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].addStorageItem(this.jwtKeyName, jwt);
    _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.jwtKeyName, jwt);
  },
  fetchJWT: function fetchJWT() {
    return _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageItem(this.jwtKeyName) || _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_1__["default"].get(this.jwtKeyName);
  },
  updateJWT: function updateJWT(jwt) {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].addStorageItem(this.jwtKeyName, jwt);
    _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_1__["default"].set(this.jwtKeyName, jwt);
  },
  clearJWT: function clearJWT() {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeStorageItem(this.jwtKeyName);
    _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_1__["default"].destroy(this.jwtKeyName);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (authCache);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var StorageCache = {
  getStorageJSON: function getStorageJSON(key) {
    var value = localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  },
  setStorageJSON: function setStorageJSON(key, value) {
    var stringifiedValue = JSON.stringify(value);
    localStorage.setItem(key, stringifiedValue);
  },
  addStorageItem: function addStorageItem(key, item) {
    localStorage.setItem(key, item);
  },
  getStorageItem: function getStorageItem(key) {
    return localStorage.getItem(key);
  },
  removeStorageItem: function removeStorageItem(key) {
    localStorage.removeItem(key);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StorageCache);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

var Cookie = {
  set: function set(cname, cvalue) {
    var exdays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + _config_js__WEBPACK_IMPORTED_MODULE_0__["default"].APP_DOMAIN;
  },
  get: function get(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  destroy: function destroy(cname) {
    this.set(cname, '', -1);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Cookie);

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var config = {
  APP_DOMAIN: window.location.hostname
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

var userCache = {
  userCacheKeyName: 'userInfo',
  saveUserInfo: function saveUserInfo(userInfo) {
    if (!userInfo || !userInfo.username || !userInfo.email) {
      return;
    }
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStorageJSON(this.userCacheKeyName, userInfo);
  },
  getUserInfo: function getUserInfo() {
    return _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageJSON(this.userCacheKeyName);
  },
  updateUserInfo: function updateUserInfo(newUserInfo) {
    this.saveUserInfo(newUserInfo);
  },
  clearUserInfo: function clearUserInfo() {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeStorageItem(this.userCacheKeyName);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (userCache);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

var guestInfoCache = {
  guestInfoCacheKeyName: 'guestInfoCache',
  saveGuestInfo: function saveGuestInfo(guestInfo) {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].setStorageJSON(this.guestInfoCacheKeyName, guestInfo);
  },
  getGuestInfo: function getGuestInfo() {
    return _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].getStorageJSON(this.guestInfoCacheKeyName);
  },
  updateGuestInfo: function updateGuestInfo(guestInfo) {
    if (!guestInfo || !guestInfo.displayName || !guestInfo.guestId) {
      return;
    }
    this.saveGuestInfo(guestInfo);
  },
  clearGuestInfo: function clearGuestInfo() {
    _StorageCache_js__WEBPACK_IMPORTED_MODULE_0__["default"].removeStorageItem(this.guestInfoCacheKeyName);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (guestInfoCache);

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./_common.js": [
		11,
		7,
		1
	],
	"./_common_play.js": [
		12,
		9,
		5,
		6,
		4,
		3,
		2
	],
	"./customizePigeon.js": [
		74,
		7,
		8
	],
	"./home.js": [
		75,
		9,
		5,
		6,
		4,
		9
	],
	"./mapSelection.js": [
		76,
		9,
		6,
		7
	],
	"./playOffline.js": [
		77,
		9,
		5,
		6,
		4,
		3,
		11,
		10
	],
	"./playOnline.js": [
		82,
		9,
		5,
		6,
		4,
		3,
		11,
		12
	],
	"./signup.js": [
		83,
		9,
		6,
		13
	],
	"./userHome.js": [
		84,
		9,
		5,
		6,
		4,
		14
	],
	"./userProfile.js": [
		85,
		9,
		6,
		15
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(2).map(__webpack_require__.e)).then(() => {
		return __webpack_require__.t(id, ids[1] | 16)
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 10;
module.exports = webpackAsyncContext;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && !queue.d) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = 1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".main.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "tactical-people:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			};
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			0: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunktactical_people"] = self["webpackChunktactical_people"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;