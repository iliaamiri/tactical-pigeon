module.exports = (req, res, next) => {
  // reading the cookie
  // throw new Error("You're not authenticated. Please Login");

  // verify the value of the cookie and make sure it is valid (Token.verify())
  // throw new Error("You're not authenticated. Please Login");

  next();
}