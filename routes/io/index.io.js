const gameHandler = require("./handlers/gameHandler");

module.exports = (server) => {
    const io = require('socket.io')(server);

    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
    
        if (!token) {
            socket.close();
        }
    
        // create a new instance of player based on playerId
        socket.user = new Player();
    
        console.log("Token: ", token);
    
        next();
    });
    
    io.on('connection', async (socket) => {
        try {
            await gameHandler(io, socket);
        } catch (err) {
            console.log(err);
        }
    });

    return io;
}