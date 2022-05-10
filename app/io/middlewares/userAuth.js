const jwt = require("jsonwebtoken");
const configs = require("../../config/app.config");

const Tokens = require("../repos/Tokens");
const Players = require("../repos/Players");

const Player = require("../models/Player");

module.exports = (socket, next) => {
    const jwtToken = socket.handshake.auth.token;

    if (!jwtToken) {
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
        try {
            let decodedData = jwt.verify(jwtToken, configs.JWT_RSA_PUBLIC_KEY, { algorithm: "RS256" });
            foundPlayer.playerId = decodedData.playerId;
            foundPlayer.username = decodedData.username;
            Players.add(foundPlayer);
        } catch(err) {
            socket.close();
            return;
        }
    }

    socket.user = foundPlayer;

    console.log("Token: ", jwtToken);

    next();
};