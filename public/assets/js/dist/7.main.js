"use strict";
(self["webpackChunktactical_people"] = self["webpackChunktactical_people"] || []).push([[7],{

/***/ 73:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "backgroundsCssClassNames": () => (/* binding */ backgroundsCssClassNames)
/* harmony export */ });
var backgroundsCssClassNames = {
  'street': "default-background",
  'playground': "playground-background",
  'pigeon-nights': "night-night-background"
};

/***/ }),

/***/ 76:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_Backgrounds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73);
/* harmony import */ var _core_sounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
/* harmony import */ var _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);



var availableMaps = Object.keys(_helpers_Backgrounds_js__WEBPACK_IMPORTED_MODULE_0__.backgroundsCssClassNames);
var selectedMap;
document.querySelector('div.select-done-button').addEventListener('click', function (event) {
  var selectedMapDiv = document.querySelector('div.card.highlight');
  selectedMap = selectedMapDiv.dataset.mapName;
  if (!selectedMap) {
    console.log("No map name is set"); // debug
    return;
  }
  if (!availableMaps.includes(selectedMap)) {
    console.log("Invalid map name"); // debug
    return;
  }
  _helpers_Cookie_js__WEBPACK_IMPORTED_MODULE_2__["default"].set("selectedMap", selectedMap);
  setTimeout(function () {
    location.href = "/userHome";
  }, 300);
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_1__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_1__.sounds.buttonClick);
});
document.querySelector("div.back-button").addEventListener("click", function (event) {
  setTimeout(function () {
    location.href = "/userHome";
  }, 300);
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_1__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_1__.sounds.softClick);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selectedMap);

/***/ })

}]);