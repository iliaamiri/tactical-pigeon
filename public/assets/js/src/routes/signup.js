import { playSound, sounds } from "../core/sounds.js";
import Auth from "../auth/Auth.js";

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
    if (Auth.isLoggedIn && !Auth.isLoggedInAsGuest) {
      console.error("User is already logged in as a tracked user. This code should not be reached. Please contact the developer.");
      return;
    }

    let signUpResult = await Auth.signUp(emailInput.value, usernameInput.value, passwordInput.value);
    if (!signUpResult.status) {
      if (signUpResult.error === "EMAIL_ALREADY_EXISTS") {
        document.querySelector(".signup-error-exists").classList.remove("d-none");
      } else {
        document.querySelector(".signup-error").classList.remove("d-none");
      }
      playSound(sounds.loseRound);
      return;
    }

    setTimeout(() => {
      location.href = '/userHome';
    }, 1050);
    playSound(sounds.doneChecked);
  }

  /* ---- Index Page Link ---- */
  if (target.tagName === "P" && target.classList.contains('index-link')) {
    location.href = '/';
  }
});
