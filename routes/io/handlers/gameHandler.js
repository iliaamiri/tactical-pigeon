module.exports = (io, socket) => {
    soclet.on("game:searchForOpponent", searchForOpponent);
    socket.on("game:end", end);
}