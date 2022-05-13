// Components
const usernameInput = document.querySelector('input.usernameInput');
const playButton = document.querySelector('button.play');
const startBtn = document.querySelector('div.startBtn');
const titleEnterName = document.querySelector("div.start p.title-enter-name");
export const searchingText = document.querySelector('span.online-text-searching');
const iosToggleInput = document.querySelector("div.toggleWrapper input.mobileToggle.mobileToggle");

// Intervals
export let searchingForOpponentAnimation;

import Token from "../io/auth/Token.js";
import clientSocketConnect from '../io/client.js';

if (Token.isAuthenticated()) {
  titleEnterName.innerHTML = `Welcome back, ${Token.username}`;
  usernameInput.value = Token.username;
  usernameInput.disabled = true;
}

// General Click Event Listener
document.querySelector("body").addEventListener('click', event => {
  let target = event.target;

  /* ---- Mobile Toggle ---- */
  if ((target.tagName === "LABEL" && target.classList.contains("toggleLabel")) ||
    (target.tagName === "DIV" && target.classList.contains("mobileToggle"))) {

    iosToggleInput.checked = !iosToggleInput.checked;
    if (iosToggleInput.checked) {
      startBtn.classList.add("playOnlineBtn");
    } else {
      startBtn.classList.remove("playOnlineBtn");
    }
  }

});

// Start Button Hover
startBtn.addEventListener('mouseover', event => event.target.classList.add("hover"));
startBtn.addEventListener('mouseout', event => event.target.classList.remove('hover'));

// Start Button Click Listener
startBtn.addEventListener('click', async event => {
  let target = event.target;
  target.classList.add("pressed")

  let audio = new Audio("/assets/music/SuccessAttack.mp3");
  await audio.play();

  if (target.classList.contains("playOnlineBtn")) { // Play Online
    target.classList.add("pressed");

    const playerUsername = usernameInput.value;
    if (playerUsername.length < 1) {
      usernameInput.focus();
      titleEnterName.classList.add("error-alert");
      return;
    }

    usernameInput.disabled = true;

    try {
      const authResponse = await axios.post("/api/auth/letMeIn", {
        givenUsername: playerUsername
      });

      const authResult = authResponse.data;
      if (!authResult.status) {
        console.log(authResult);
        throw new Error(authResult.error);
      }

      const tokenValue = authResult.tokenValue;

      Token.save(tokenValue, playerUsername);

      const socket = await clientSocketConnect();

      searchingText.style.display = "block";
      let searchingTextDots = 0;
      let dots = "...";
      searchingForOpponentAnimation = setInterval(() => {
        searchingText.innerHTML = `Finding an opponent${dots.substring(0, searchingTextDots % 4)}`;
        searchingTextDots++;
      }, 700);

      socket.on('connect_error', err => {
        let message = err.message;
        console.log(message);
        if (message === "AUTHENTICATION_FAILED") {
          location.href = "/";
          return;
        }

        clearInterval(searchingForOpponentAnimation);
        searchingText.innerHTML = err.userErrorMssage ?? "Something wrong happened!";

      });

      socket.emit("game:searchForOpponent");
    } catch (error) {
      console.log(error);

      // Revert everything back if the user couldn't be authenticated by axios request.
      searchingText.style.display = "none";
      usernameInput.disabled = false;
      target.classList.remove("pressed");
    }
  } else { // Play Offline
    let tID = setTimeout(function () {
      window.location.href = document.location.href + "play";
      window.clearTimeout(tID);		// clear time out.
    }, 1350);
  }

  playButton.classList.remove("unpressed");
  playButton.classList.add("pressed");
});

// Play Button Hover
playButton.addEventListener('mouseover', event => event.target.classList.add("hover"));
playButton.addEventListener('mouseout', event => event.target.classList.remove('hover'));