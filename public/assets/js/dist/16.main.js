"use strict";
(self["webpackChunktactical_people"] = self["webpackChunktactical_people"] || []).push([[16],{

/***/ 86:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _core_sounds_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70);


//for playing theme music without user interaction + repeatings
var theme = document.querySelector("#bgMusic");
var continueButton = document.querySelector(".continueBtn");
window.addEventListener('mouseover', function (event) {
  theme.play();

  //to remove the gray bar at the bottom of iphone XR countdown overlay
  var bottomRow = document.querySelector(".bottom-row");
  continueButton.addEventListener("click", function () {
    if (window.innerHeight <= "450") {
      bottomRow.style.backgroundColor = "#ffdc4b";
    }
    setTimeout(function () {
      bottomRow.style.backgroundColor = "";
    }, 1500);
  });
});
theme.addEventListener('ended', function () {
  this.currentTime = 0;
  this.play();
}, false);
var fork = document.querySelector("#attack-image");
fork.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.forkChecked);
  fork.classList.add("animate__pulse", "animate__faster");
  fork.addEventListener('animationend', function () {
    fork.classList.remove("animate__pulse");
  });
  var mv_placeholders = document.querySelectorAll("div.mv-placeholder");
  mv_placeholders.forEach(function (item) {
    item.classList.add("animate__tada", "animate__slow");
  });
};
var shield = document.querySelector("#shield-image");
shield.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.shieldClicked);
  shield.classList.add("animate__pulse", "animate__faster");
  var mv_placeholders = document.querySelectorAll("div.mv-placeholder");
  mv_placeholders.forEach(function (item) {
    item.classList.add("animate__tada", "animate__slow");
  });
  shield.addEventListener('animationend', function () {
    shield.classList.remove("animate__pulse");
  });
};
var opponentShield = document.querySelector(".opponent-counter-box > img");
opponentShield.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.denyTheClick);
};
var opponentFork = document.querySelector("div:nth-child(2) > div.col-sm-2.asset-padding.opponent-counter-box");
opponentFork.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.denyTheClick);
};
var movePlaceholderHead = document.querySelector(".mv-placeholder.head");
movePlaceholderHead.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.putInTheTally);
};
var movePlaceholderBody = document.querySelector(".mv-placeholder.body");
movePlaceholderBody.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.putInTheTally);
};
var movePlaceholderLegs = document.querySelector(".mv-placeholder.legs");
movePlaceholderLegs.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.putInTheTally);
};
var doneButton = document.querySelector(".done");
doneButton.onclick = function () {
  (0,_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.playSound)(_core_sounds_js__WEBPACK_IMPORTED_MODULE_0__.sounds.doneChecked);
};

// changing mute to unmuted svg and viceversa
var muteBtn = document.querySelector(".mute");
muteBtn.onclick = function () {
  if (muteBtn.style.backgroundImage === 'url("/assets/img/GUI-controls/MainControls/Mute.svg")') {
    muteBtn.style.backgroundImage = 'url("/assets/img/GUI-controls/MainControls/Unmute.svg")';
  } else {
    muteBtn.style.backgroundImage = 'url("/assets/img/GUI-controls/MainControls/Mute.svg")';
  }
};

/***/ })

}]);