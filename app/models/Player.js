const Player = {
    playerId, // int (db primary key auto increment)
    username, // string 

    ammoInventory, //$ref: AmmoInventory

    life, // $ref: Life
};

module.exports = Player;