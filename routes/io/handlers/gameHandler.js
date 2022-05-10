module.exports = async (io, socket) => {
    socket.on("game:searchForOpponent", searchForOpponent);
    socket.on("game:end", end);
}