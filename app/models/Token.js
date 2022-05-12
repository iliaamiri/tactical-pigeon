const Token = {
  playerId: null, // int | string (ref to Player)

  jwtToken: null, // string

  expiryDate: null, // string (timestamp)

  initCreate(playerId, jwtToken, expiresDate) {
    this.playerId = playerId;
    this.jwtToken = jwtToken;
    this.expiryDate = expiresDate;
  }
};

module.exports = Token;