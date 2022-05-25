// Components
import SearchingText from "../components/Home/SearchingText.js";
import SearchingForOpponent from "../components/Home/SearchingForOpponent.js";
import Cookie from "../helpers/Cookie.js";

const usernameInput = document.querySelector('input.usernameInput');
const playButton = document.querySelector('button.play');
const startBtn = document.querySelector('div.startBtn');
const titleEnterName = document.querySelector("div.start p.title-enter-name");
const iosToggleInput = document.querySelector("div.toggleWrapper input.mobileToggle.mobileToggle");
const blueClouds = document.querySelector(".loading-clouds-noBK-overlay");

// Socket
import Token from "../io/auth/Token.js";
import clientSocketConnect from '../io/client.js';

// Reloads page if accessed from cache
window.addEventListener("pageshow", function (event) {
  let historyTraversal = event.persisted;
  if (historyTraversal) {
    window.location.reload();
  }
});

//changing map button appearance according to map selection
let selectedMap = Cookie.get("selectedMap");
let mapButton = document.querySelector("div.map-selection-button");
console.log(selectedMap);
if (selectedMap === "playground") {
  mapButton.style.backgroundImage = 'url("/assets/img/backgrounds/SVG/playground-button.svg")';
} else if(selectedMap === "pigeon-nights") {
  mapButton.style.backgroundImage = 'url("/assets/img/backgrounds/SVG/night-button.svg")';
} else if(selectedMap === "street"){
  mapButton.style.backgroundImage ='url("/assets/img/backgrounds/SVG/street-button.svg")';
} 

// Fetch guestId (if exists)
Token.fetchCachedGuestId();

if (Token.fetchCachedUsernameOnly()) {
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
      blueClouds.classList.add("d-none");
      startBtn.classList.remove("pressed");
      SearchingText.DOMElement.style.display = "none";
    }
  }

  /* ---- Map Selection Button ---- */
  if (target.tagName === "DIV" && target.classList.contains("map-selection-button")) {
    location.href = "/play/map/selection";
  }
});

// Start Button Hover
startBtn.addEventListener('mouseover', event => event.target.classList.add("hover"));
startBtn.addEventListener('mouseout', event => event.target.classList.remove('hover'));

// Start Button Click Listener
startBtn.addEventListener('click', async function (event) {
  let target = this;
  console.log("start hit")

  // If the button was already pressed, don't continue anymore.
  if (target.classList.contains('pressed')) {
    return;
  }

  let audio = new Audio("/assets/music/SuccessAttack.mp3");
  await audio.play();

  // Get username and verify that it is not empty
  const playerUsername = usernameInput.value;
  if (playerUsername.length < 1) {
    usernameInput.focus();
    titleEnterName.classList.add("error-alert");
    return;
  }

  // Make it pressed
  target.classList.remove('unpressed');
  target.classList.add('pressed');

  if (target.classList.contains("playOnlineBtn")) { // Play Online
    usernameInput.disabled = true;

    try {
      const authResponse = await axios.post("/api/auth/letMeIn", {
        givenUsername: playerUsername,
        givenGuestId: Token.guestId
      });

      const authResult = authResponse.data;
      if (!authResult.status) {
        // console.log(authResult); // debug
        throw new Error(authResult.error);
      }

      const tokenValue = authResult.tokenValue;
      const guestId = authResult.guestId;

      Token.save(tokenValue);
      Token.saveUsername(playerUsername);
      Token.saveGuest(guestId);
    } catch (error) {
      let errMessage = error.message;

      switch (errMessage) {
        case "ALREADY_AUTHENTICATED":
          console.log("Already Authenticated");
          break;
        default:
          // Revert everything back if the user couldn't be authenticated by axios request.
          SearchingText.DOMElement.style.display = "none";
          usernameInput.disabled = false;
          target.classList.remove("pressed");
          target.classList.add('unpressed');
          break;
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
  } else { // Play Offline
    Token.saveUsername(playerUsername);

    let tID = setTimeout(function () {
      window.location.href = document.location.href + "play";
      window.clearTimeout(tID);		// clear time out.
    }, 1350);
  }
});

// Play Button Hover
playButton.addEventListener('mouseover', event => event.target.classList.add("hover"));
playButton.addEventListener('mouseout', event => event.target.classList.remove('hover'));