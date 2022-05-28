// Components
import SearchingText from "../components/Home/SearchingText.js";
import SearchingForOpponent from "../components/Home/SearchingForOpponent.js";
import {playSound, sounds} from "../core/sounds.js";

const startBtn = document.querySelector('div.startBtn');
const titleEnterName = document.querySelector("p.title-enter-name");
const iosToggleInput = document.querySelector("input.mobileToggle");
const blueClouds = document.querySelector(".loading-clouds-noBK-overlay");
const emailInput = document.querySelector('input.emailInput');
const passwordInput = document.querySelector('input.passwordInput');
// const logInButton = document.querySelector('button.log-in-button');
// let loginOptions = document.querySelectorAll(".start span");
const playWrapper = document.querySelector('.play-wrapper');
const loginInputs = document.querySelector('.login-inputs');
const usernameSpan = document.querySelector('span.username');
const usernameInput = document.querySelector('input.usernameInput');

// Socket
import clientSocketConnect, {socket} from '../io/client.js';

import Auth from "../auth/Auth.js";

// Reloads page if accessed from cache
window.addEventListener("pageshow", function (event) {
  let historyTraversal = event.persisted;
  if (historyTraversal) {
    window.location.reload();
  }
});

if (Auth.isLoggedIn) {
  document.querySelector('.loggedIn-as-guest-title').classList.remove('d-none');
  // TODO: This should redirect us to the profile page if we have a good token

  // titleEnterName.innerHTML = `Welcome back, ${Token.username}`;
  // usernameInput.value = Token.username;
  // usernameInput.disabled = true;
}

// General Click Event Listener
document.querySelector("body").addEventListener('click', async function (event) {
  let target = event.target;
  console.log('click target:', target);

  /* ---- Mobile Toggle ---- */
  if ((target.tagName === "LABEL" && target.classList.contains("toggleLabel"))
    || (target.tagName === "DIV" && target.classList.contains("mobileToggle"))
  ) {
    iosToggleInput.checked = !iosToggleInput.checked;

    if (iosToggleInput.checked) {
      loginInputs.classList.add('d-none');
      startBtn.classList.add("d-none");

      // usernameSpan.classList.remove('d-none');
      playWrapper.classList.remove('d-none');

      titleEnterName.classList.add('d-none');

    } else {
      loginInputs.classList.remove('d-none');
      startBtn.classList.remove("d-none");
      // usernameSpan.classList.add('d-none');
      playWrapper.classList.add('d-none');

      titleEnterName.classList.remove('d-none');

    }
  }
  /* ---- Sign Up Link ---- */
  if (target.tagName === "P" && target.classList.contains('sign-up-link')) {
    location.href = '/signup';
  }
});

/* ---- Log In Button ---- */
startBtn.addEventListener('click', async function (event) {
  try {
    console.log('login button hit');

    if (Auth.isLoggedIn && !Auth.isLoggedInAsGuest) {
      console.log('already logged in');
      return;
    }

    const successfulLogin = await Auth.login(emailInput.value, passwordInput.value);

    if (successfulLogin) {
      setTimeout(() => {
        location.href = '/userHome';
      }, 1050);
      playSound(sounds.doneChecked);
    }

  } catch (error) {
    playSound(sounds.loseRound);
    let errMessage = error.message;
    console.log(errMessage);
    document.querySelector(".login-error").classList.remove("d-none")
  }
})

// Start Button Hover
startBtn.addEventListener('mouseover', event => event.target.classList.add("hover"));
startBtn.addEventListener('mouseout', event => event.target.classList.remove('hover'));

// Offline Button Click Listener
playWrapper.addEventListener('click', async function (event) {
  let target = event.target;
  console.log("play container hit. target:", target);

  // If the button was already pressed, don't continue anymore.
  // if (target.classList.contains('pressed')) {
  //   return;
  // }

  // Get username and verify that it is not empty
  /* const playerUsername = usernameInput.value;
  if (playerUsername.length < 1) {
    console.log('username too short!');
    usernameInput.focus();
    titleEnterName.classList.add("error-alert");
    return;
  } */

  // Make it pressed
  // target.classList.remove('unpressed');
  // target.classList.add('pressed');

  if (target.classList.contains("playOnlineBtn")) { // Play Online
    // usernameInput.disabled = true;

    if (!Auth.isLoggedIn) {
      // let successfulLoginAsGuest = await Auth.loginAsGuest(usernameInput.value);
      let successfulLoginAsGuest = await Auth.loginAsGuest();

      if (!successfulLoginAsGuest) {
        // Revert everything back if the user couldn't be authenticated by axios request.
        SearchingText.DOMElement.style.display = "none";
        // usernameInput.disabled = false;
        target.classList.remove("pressed");
        target.classList.add('unpressed');
        return;
      }
    }

    // Connect to the web socket.
    const socket = await clientSocketConnect();

    // Show the "Finding an opponent" text block and start animating it for searching
    SearchingText.show();
    SearchingForOpponent.animate();

    // Show blue clouds
    blueClouds.classList.remove("d-none");
    blueClouds.classList.add("animate__fadeIn");

    // Handle any socket connection error.
    socket.on('connect_error', socketError => {
      console.log(socketError); // debug

      let errMessage = socketError.errMessage;
      let userErrorMessage = socketError.userErrorMessage ?? "Something wrong happened!";

      if (errMessage === "AUTHENTICATION_FAILED") {
        location.href = "/";
        return;
      }
      switch (errMessage) {
        case "AUTHENTICATION_FAILED":
          location.href = "/";
          return;
        case "PLAYER_ALREADY_IN_MATCH_QUEUE":
          console.log("Player is already in the match queue"); // debug TODO: let the user know as well.
          return;
        default:
          console.log("Unhandled: ", errMessage);
          break;
      }

      SearchingForOpponent.clearAnimation();
      SearchingText.DOMElement.innerHTML = userErrorMessage;

    });

    socket.emit("game:searchForOpponent");
  } else if (target.classList.contains("playOfflineBtn")) { // Play Offline
    console.log('play offline hit');

    if (!Auth.isLoggedIn) {
      let successfulLoginAsGuest = await Auth.loginAsGuest();

      if (!successfulLoginAsGuest) {
        alert("Couldn't log in as guest! Please Report this bug to the devs");

        // Revert everything back if the user couldn't be authenticated by axios request.
        SearchingText.DOMElement.style.display = "none";
        // usernameInput.disabled = false;
        target.classList.remove("pressed");
        target.classList.add('unpressed');
        return;
      }
    }

    console.log('window.location.href', window.location.href);
    let tID = setTimeout(function () {
      window.location.href = "/play";
      window.clearTimeout(tID);		// clear time out.
    }, 1350);
  }
});
