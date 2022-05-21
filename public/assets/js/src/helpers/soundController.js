import { playSound, sounds } from "../core/sounds.js";

//for playing theme music without user interaction + repeatings
let theme = document.querySelector("#bgMusic");
let continueButton = document.querySelector(".continueBtn");

window.addEventListener('mouseover', event => {
  theme.play();

  //to remove the gray bar at the bottom of iphone XR countdown overlay
  let bottomRow = document.querySelector(".bottom-row");
  continueButton.addEventListener("click", function () {
    if (window.innerHeight <= "450") {
      bottomRow.style.backgroundColor = "#ffdc4b";
    }

    setTimeout(() => {
      bottomRow.style.backgroundColor = ""
    }, 1500);

  })
});
theme.addEventListener('ended', function () {
  this.currentTime = 0;
  this.play();
}, false);


let fork = document.querySelector("#attack-image");
fork.onclick = function () {
  playSound(sounds.forkChecked);

  fork.classList.add("animate__pulse", "animate__faster");
  fork.addEventListener('animationend', () => {
    fork.classList.remove("animate__pulse");
  })

  let mv_placeholders = document.querySelectorAll("div.mv-placeholder");
  mv_placeholders.forEach((item) => {
    item.classList.add("animate__tada", "animate__slow");
  })
}

let shield = document.querySelector("#shield-image");
shield.onclick = function () {

  playSound(sounds.shieldClicked);
  shield.classList.add("animate__pulse", "animate__faster");

  let mv_placeholders = document.querySelectorAll("div.mv-placeholder");
  mv_placeholders.forEach((item) => {
    item.classList.add("animate__tada", "animate__slow");
  })

  shield.addEventListener('animationend', () => {
    shield.classList.remove("animate__pulse");
  });
}

let opponentShield = document.querySelector(".opponent-counter-box > img");
opponentShield.onclick = function () {
  playSound(sounds.denyTheClick);
}

let opponentFork = document.querySelector("div:nth-child(2) > div.col-sm-2.asset-padding.opponent-counter-box");
opponentFork.onclick = function () {
  playSound(sounds.denyTheClick);
}

let movePlaceholderHead = document.querySelector(".mv-placeholder.head");
movePlaceholderHead.onclick = function () {
  playSound(sounds.putInTheTally);
}

let movePlaceholderBody = document.querySelector(".mv-placeholder.body");
movePlaceholderBody.onclick = function () {
  playSound(sounds.putInTheTally);
}

let movePlaceholderLegs = document.querySelector(".mv-placeholder.legs");
movePlaceholderLegs.onclick = function () {
  playSound(sounds.putInTheTally);
}

let doneButton = document.querySelector(".done");
doneButton.onclick = function () {
  playSound(sounds.doneChecked);
}

// changing mute to unmuted svg and viceversa
let muteBtn = document.querySelector(".mute");
muteBtn.onclick = () => {
  if (muteBtn.style.backgroundImage === 'url("/assets/img/GUI-controls/MainControls/Mute.svg")') {
    muteBtn.style.backgroundImage = 'url("/assets/img/GUI-controls/MainControls/Unmute.svg")';
  } else {
    muteBtn.style.backgroundImage = 'url("/assets/img/GUI-controls/MainControls/Mute.svg")';
  }
}