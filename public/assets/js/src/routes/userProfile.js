// Auth
import Token from "../io/auth/Token.js";

// Fetch username from cookie
let username = Token.fetchCachedUsernameOnly();

const gamesPlayed = document.querySelector('.games-played');
const gamesWon = document.querySelector('.games-won');
const winRatio = document.querySelector('.win-ratio');

console.log('username', username);




document.querySelector(".back-btn").addEventListener("click", async event => {
  location.href = "/";
});

document.querySelector('.username').innerHTML = username;

(async function getUserInfo() {
  let userInfo = await axios.get("/api/profile/getUserData");
  console.log('userInfo:', userInfo.data);
  let ratio = 0;
  if (parseInt(userInfo.data.games_played) !== 0) {
    ratio = Math.round((userInfo.data.games_won / userInfo.data.games_played) * 100);
  }
  gamesPlayed.innerHTML = userInfo.data.games_played;
  gamesWon.innerHTML = userInfo.data.games_won;
  winRatio.innerHTML = `${ratio}%`;
})();

