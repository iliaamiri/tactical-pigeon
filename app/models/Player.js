const Player = {
    playerId, // int (db primary key auto increment)
    username, // string 
    ammoInventory, //$ref: AmmoInventory

    life, // $ref: Life

    toJSON: function() {
        return {
            playerId: this.playerId,
            username: this.username,
            ammoInventory: this.ammoInventory,
            life: this.life,
        };
    },
};

module.exports = Player;