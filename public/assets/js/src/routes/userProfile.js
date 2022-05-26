// Auth
import Token from "../io/auth/Token.js";

// Fetch username from cookie
let username = Token.fetchCachedUsernameOnly();

console.log(username)


// async function getUserInfo() {
//   const userInfo = await axios.get("/api/auth/login")
// }

document.querySelector(".back-btn").addEventListener("click", async event => {
  location.href = "/";
})
