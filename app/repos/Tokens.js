const jwt = require("jsonwebtoken");
const config = require("../../config/app.config");

const Token = require("../models/Token");

const { DateTime } = require("luxon");

const Tokens = {
    all: new Map(), //: Map<jwtToken, Token>

    create(playerId, username, expiresIn = DateTime.now().plus({ day: 1 })) {
        const newJwtToken = jwt.sign({
            playerId,
            username,
            createdAt: Date.now()
        },
            config.JWT_RSA_PRIVATE_KEY,
            {
                algorithm: 'RS256',
                expiresIn: expiresIn.valueOf()
            }
        );

        const newTokenObj = Object.create(Token);

        this.all.set(newJwtToken, newTokenObj);

        return newJwtToken;
    },

    revoke(jwtToken) {
        this.all.delete(jwtToken);
    }
};

module.exports = Tokens;