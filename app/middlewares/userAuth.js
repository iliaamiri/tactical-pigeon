const Tokens = require("../repos/Tokens");
const Players = require("../repos/Players");

const Player = require("../models/Player");

module.exports = (socket, next) => {
    const jwtToken = socket.handshake.auth.token;

    if (!jwtToke) {
        socket.close();
        return;
    }
    
    const foundTokenObj = Tokens.all.get(jwtToken);

    if (!foundTokenObj) {
        socket.close();
        return;
    }

    let foundPlayer = Players.find(foundTokenObj.playerId);

    if (!foundPlayer) {
        foundPlayer = Object.create(Player);
        
    }

    socket.user = foundPlayer;

    console.log("Token: ", jwtToken);

    next();
};