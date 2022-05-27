// Components
import SearchingText from "../components/Home/SearchingText.js";
import SearchingForOpponent from "../components/Home/SearchingForOpponent.js";
import Cookie from "../helpers/Cookie.js";

// Socket
import Token from "../io/auth/Token.js";
import clientSocketConnect, { socket } from '../io/client.js';

// Reloads page if accessed from cache
window.addEventListener("pageshow", function (event) {
  let historyTraversal = event.persisted;
  if (historyTraversal) {
    window.location.reload();
  }
});

document.querySelector("body").addEventListener('click', async function (event) {
  let target = event.target;
  console.log('click target:', target);
  if (target.classList.contains("playOnlineBtn")) { // Play Online
    // usernameInput.disabled = true;

    try {
      const authResponse = await axios.post("/api/auth/letMeIn", {
        // givenUsername: playerUsername,
        givenGuestId: Token.guestId
      });

      const authResult = authResponse.data;
      if (!authResult.status) {
        console.log(authResult); // debug
        throw new Error(authResult.error);
      }

      const tokenValue = authResult.tokenValue;
      const email = authResult.email;
      const guestId = authResult.guestId;

      Token.save(tokenValue);
      Token.saveEmailAndUsername(email, guestId); //
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
          // usernameInput.disabled = false;
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
  } else if (target.classList.contains("playOfflineBtn")) { // Play Offline
    console.log('play offline hit');
    try {
      const authResponse = await axios.post("/api/auth/letMeIn", {
        // givenUsername: playerUsername,
        givenGuestId: Token.guestId
      });

      const authResult = authResponse.data;
      console.log('authResult', authResult);
      if (!authResult.status) {
        console.log(authResult); // debug
        throw new Error(authResult.error);
      }

      const tokenValue = authResult.tokenValue;
      const guestId = authResult.guestId;

      Token.save(tokenValue);
      Token.saveEmailAndUsername(null, guestId); //
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
          // usernameInput.disabled = false;
          target.classList.remove("pressed");
          target.classList.add('unpressed');
          break;
      }
    }

    const playerUsername = Token.guestId;
    Token.saveEmailAndUsername(null, playerUsername);
    console.log('window.location.href', window.location.href);
    let tID = setTimeout(function () {
      window.location.href = "/play";
      window.clearTimeout(tID);		// clear time out.
    }, 1350);
  }
});