
const handHandler = require("./app/handlers/handHandler");

module.exports = (server) => {
    const io = require('socket.io')(server);

    return io;
}