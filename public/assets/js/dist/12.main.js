"use strict";
(self["webpackChunktactical_people"] = self["webpackChunktactical_people"] || []).push([[12],{

/***/ 82:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _helpers_changeRoundTitle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(79);
/* harmony import */ var _helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
/* harmony import */ var _helpers_roundCountdown_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(80);
/* harmony import */ var _io_client_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(38);
/* harmony import */ var _components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(20);
/* harmony import */ var _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(18);
/* harmony import */ var _core_sounds_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(70);
/* harmony import */ var _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(34);
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
// Components


var loadingCloudsOverlay = document.querySelector('div.loading-clouds-overlay');
var countdownOverlayComponent = document.querySelector("div.countdown-overlay");
var pigeon = document.querySelector('div.pigeons-container img.pigeon-left');
var pickMoveOverlay = document.querySelector('div.move-picker-overlay');

// Helpers




// Core and utils






console.log("Hit playOnline.js");
var socket;
try {
  socket = await (0,_io_client_js__WEBPACK_IMPORTED_MODULE_5__["default"])();
  socket.on('connect_error', function (err) {
    var message = err.message;
    console.log(message); // debug
    if (message === "AUTHENTICATION_FAILED") {
      alert("Authentication Failed. Please try again.");
      location.href = "/";
      return;
    }
  });
} catch (err) {
  console.log(err);
}

// Instantiate the Game. gameId comes from play.ejs
var game = new _helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__["default"](gameId, "online");

// Loading the game (Exhibition)
_components_Play_ReplayButton_js__WEBPACK_IMPORTED_MODULE_6__["default"].hide(); // Hide the play again button
loadingCloudsOverlay.classList.remove("d-none"); // show the loading clouds overlay

await new Promise(function (resolve, reject) {
  console.log("hitting HERE"); // debug
  // Check if there are caches to load from
  var cachedGameFound = _helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__["default"].findByGameFromCache();
  if (!cachedGameFound) {
    // If not, fetch information from the server.
    // web socket emit "game:fetch" with payload: gameId
    socket.emit("game:fetch", gameId);
    document.addEventListener('gameFetchedReady', function (event) {
      // Destructure all the fetched data.
      var _event$detail = event.detail,
        playerMe = _event$detail.playerMe,
        playerOpponent = _event$detail.playerOpponent,
        gameComplete = _event$detail.gameComplete,
        timeLeft = _event$detail.timeLeft;
      console.log(event); // debug

      // Make sure everything is ready.
      new Promise(function (resolve, reject) {
        // Check if this is the beginning of the game
        if (playerMe.moveHistory.length === 0) {
          socket.emit("game:iamready", gameId);
          document.addEventListener('wonOpponentLeftBeforeGameStarted', /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    console.log("Opponent left, you won even before the game started"); // debug

                    _components_ResultOverlay_js__WEBPACK_IMPORTED_MODULE_8__["default"].updateTitle('victory');

                    // game win sound effect
                    _context.next = 4;
                    return (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_9__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_9__.sounds.winGame);
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x) {
              return _ref.apply(this, arguments);
            };
          }());
          document.addEventListener('opponentReadyToo', function (event) {
            resolve();
          });
        } else {
          resolve();
        }
      }).then(function () {
        // Save the game to the localStorage
        // LocalStorageCache.saveGame(playerMe, playerOpponent, gameComplete);

        // initiate everything from the beginning
        game.initiateOnline(playerMe, playerOpponent, gameComplete, timeLeft);
        resolve(event);
      });
    });
  } else {
    var playerMe = cachedGameFound.playerMe,
      playerOpponent = cachedGameFound.playerOpponent,
      gameComplete = cachedGameFound.gameComplete,
      timeLeft = cachedGameFound.timeLeft;
    game.initiateOnline(playerMe, playerOpponent, gameComplete, timeLeft);
  }
});

// Initiating the move placeholders.
_components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"].all = {
  'head': new _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"]('head'),
  'body': new _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"]('body'),
  'legs': new _components_Play_MovePlaceholder_js__WEBPACK_IMPORTED_MODULE_1__["default"]('legs')
};
loadingCloudsOverlay.classList.add("d-none"); // hide the loading clouds overlay

countdownOverlayComponent.classList.remove("d-none");
countdownOverlayComponent.classList.add("opaque");
await (0,_helpers_roundCountdown_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
(0,_helpers_changeRoundTitle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__["default"].currentGame.currentRound.currentRoundNumber);

// First round start timer
_components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myTimer.startCounter();
countdownOverlayComponent.classList.add("d-none");
countdownOverlayComponent.classList.remove("opaque");
pickMoveOverlay.classList.add('show-animation');
pigeon.classList.add('picking-move-animation');
document.querySelector('.moves-placeholder').classList.add('pop-in-animation');
document.querySelector('.done').classList.add('pop-in-animation');
document.addEventListener('opponentDisconnected', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(event) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_7__["default"].show("Opponent is reconnecting", true, true);
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());
document.addEventListener('opponentReconnected', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(event) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_7__["default"].showTemporarily("Opponent Reconnected", false);
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x3) {
    return _ref3.apply(this, arguments);
  };
}());
document.addEventListener('wonOpponentLeft', /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(event) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _components_Multiplayer_WaitSign_js__WEBPACK_IMPORTED_MODULE_7__["default"].showTemporarily("Opponent Left, You Won.", false);
          _components_Pigeons_LeftPigeon_js__WEBPACK_IMPORTED_MODULE_10__["default"].exitMovePickingMode();
          pickMoveOverlay.classList.add('hide-animation');
          pickMoveOverlay.classList.remove('show-animation');
          document.querySelector('div.moves-placeholder').classList.add('d-none');

          // Finish and evaluate the game
          _context4.next = 7;
          return _helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__["default"].currentGame.gameOverDueToOpponentDisconnection();
        case 7:
          _components_Play_Timer_js__WEBPACK_IMPORTED_MODULE_0__["default"].all.myTimer.resetCounter();
          _helpers_Game_js__WEBPACK_IMPORTED_MODULE_3__["default"].currentGame.currentRound.resetCounter();
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function (_x4) {
    return _ref4.apply(this, arguments);
  };
}());
await __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(__webpack_require__, 12));
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ })

}]);