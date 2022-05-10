const jwt = require("jsonwebtoken");
const configs = include("config/app.config");

const Tokens = include("app/repos/Tokens");
const Players = include("app/repos/Players");

const Player = include("app/models/Player");

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
            foundPlayer.initOnlinePlayer(decodedData.playerId, decodedData.username);
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