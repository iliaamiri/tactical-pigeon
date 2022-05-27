import Cookie from "../helpers/Cookie.js";
import Token from "../io/auth/Token.js";
import { playSound, sounds } from "../core/sounds.js";

const emailInput = document.querySelector('input.emailInput');
const usernameInput = document.querySelector('input.usernameInput');
const passwordInput = document.querySelector('input.passwordInput');

// Reloads page if accessed from cache
window.addEventListener("pageshow", function (event) {
  let historyTraversal = event.persisted;
  if (historyTraversal) {
    window.location.reload();
  }
});

document.querySelector("body").addEventListener('click', async function (event) {
  let target = event.target;

  /* ---- Sign Up Button ---- */
  if (target.tagName === "BUTTON" && target.classList.contains("sign-up-button")) {
    try {

      const signUpResponse = await axios.post("/api/auth/signup", {
        givenEmail: emailInput.value,
        givenUsername: usernameInput.value,
        givenPassword: passwordInput.value
      });

      //console.log('signUpResponse', signUpResponse);

      const authResult = signUpResponse.data;
      //console.log('signup authResult:', authResult);
      if (!authResult.status) {
        // console.log(authResult); // debug
        // document.querySelector(".signup-error-exists").classList.remove("d-none")
        throw new Error(authResult.error);
      }

      Cookie.destroy('JWT');
      Cookie.destroy('email');
      Cookie.destroy('user');
      Cookie.destroy('guestId');

      const tokenValue = authResult.tokenValue;
      const username = authResult.username;

      Token.save(tokenValue);
      Token.saveEmailAndUsername(emailInput.value, username);
      setTimeout(() => {
        location.href = '/userHome';
      }, 1050);
      playSound(sounds.doneChecked);
    } catch (error) {
      let errMessage = error.message;
      console.log(errMessage);
      document.querySelector(".signup-error").classList.remove("d-none");
      playSound(sounds.loseRound);
    }
  }

  /* ---- Index Page Link ---- */
  if (target.tagName === "P" && target.classList.contains('index-link')) {
    location.href = '/';
  }
});
